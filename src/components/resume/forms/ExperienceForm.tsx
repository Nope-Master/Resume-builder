import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useResume } from '@/contexts/ResumeContext';
import { Experience } from '@/types/resume';
import { Plus, Edit, Trash2, Building2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExperienceFormData extends Omit<Experience, 'id' | 'description'> {
  description: string;
}

export const ExperienceForm: React.FC = () => {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResume();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const { register, handleSubmit, reset, watch, setValue } = useForm<ExperienceFormData>({
    defaultValues: {
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
  });

  const isCurrentJob = watch('current');

  React.useEffect(() => {
    if (isCurrentJob) {
      setValue('endDate', '');
    }
  }, [isCurrentJob, setValue]);

  const onSubmit = (data: ExperienceFormData) => {
    const experienceData: Omit<Experience, 'id'> = {
      ...data,
      description: data.description.split('\n').filter(line => line.trim() !== '')
    };

    if (editingId) {
      updateExperience(editingId, experienceData);
      setEditingId(null);
      toast({
        title: "Experience updated",
        description: "Your work experience has been updated successfully.",
      });
    } else {
      addExperience(experienceData);
      toast({
        title: "Experience added",
        description: "New work experience has been added to your resume.",
      });
    }
    
    reset();
  };

  const handleEdit = (experience: Experience) => {
    setEditingId(experience.id);
    reset({
      ...experience,
      description: experience.description.join('\n')
    });
  };

  const handleRemove = (id: string) => {
    removeExperience(id);
    toast({
      title: "Experience removed",
      description: "Work experience has been removed from your resume.",
      variant: "destructive",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset();
  };

  return (
    <div className="space-y-6">
      {/* Existing Experience */}
      {resumeData.experience.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Work Experience
          </h3>
          {resumeData.experience.map((experience) => (
            <Card key={experience.id} className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  <div>
                    {experience.position} at {experience.company}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(experience)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemove(experience.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  {experience.location} • {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {experience.description.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Form */}
      <Card className="bg-gradient-card shadow-medium">
        <CardHeader>
          <CardTitle className="text-lg">
            {editingId ? 'Edit Experience' : 'Add Work Experience'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  {...register('company', { required: true })}
                  
                />
              </div>
              <div>
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  {...register('position', { required: true })}
                  
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                {...register('location', { required: true })}
                
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="month"
                  {...register('startDate', { required: true })}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="month"
                  {...register('endDate')}
                  disabled={isCurrentJob}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="current"
                {...register('current')}
                checked={isCurrentJob}
                onCheckedChange={(checked) => setValue('current', checked as boolean)}
              />
              <Label htmlFor="current">I currently work here</Label>
            </div>

            <div>
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                {...register('description', { required: true })}
                className="min-h-[120px] resize-y"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" variant="gradient">
                <Plus className="h-4 w-4 mr-2" />
                {editingId ? 'Update Experience' : 'Add Experience'}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={cancelEdit}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
