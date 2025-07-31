import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useResume } from '@/contexts/ResumeContext';
import { Education } from '@/types/resume';
import { Plus, Edit, Trash2, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EducationFormData extends Omit<Education, 'id' | 'achievements'> {
  achievements: string;
}

export const EducationForm: React.FC = () => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedDegree, setSelectedDegree] = useState<string>('');
  
  const { register, handleSubmit, reset, watch } = useForm<EducationFormData>({
    defaultValues: {
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      achievements: ''
    }
  });

  const watchedDegree = watch('degree');

  // School levels that don't need field of study
  const schoolLevels = ['Primary School', 'Middle School', 'High School', 'Senior Secondary'];

  const onSubmit = (data: EducationFormData) => {
    const educationData: Omit<Education, 'id'> = {
      ...data,
      achievements: data.achievements 
        ? data.achievements.split('\n').filter(line => line.trim() !== '')
        : undefined
    };

    if (editingId) {
      updateEducation(editingId, educationData);
      setEditingId(null);
      toast({
        title: "Education updated",
        description: "Your education information has been updated successfully.",
      });
    } else {
      addEducation(educationData);
      toast({
        title: "Education added",
        description: "New education entry has been added to your resume.",
      });
    }
    
    reset();
  };

  const handleEdit = (education: Education) => {
    setEditingId(education.id);
    reset({
      ...education,
      achievements: education.achievements?.join('\n') || ''
    });
  };

  const handleRemove = (id: string) => {
    removeEducation(id);
    toast({
      title: "Education removed",
      description: "Education entry has been removed from your resume.",
      variant: "destructive",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset();
  };

  return (
    <div className="space-y-6">
      {/* Existing Education */}
      {resumeData.education.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Education
          </h3>
          {resumeData.education.map((education) => (
            <Card key={education.id} className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  <div>
                    {education.degree} in {education.field}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(education)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemove(education.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  {education.institution} • {education.startDate} - {education.endDate}
                  {education.gpa && ` • GPA: ${education.gpa}`}
                </p>
                {education.achievements && education.achievements.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {education.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Form */}
      <Card className="bg-gradient-card shadow-medium">
        <CardHeader>
          <CardTitle className="text-lg">
            {editingId ? 'Edit Education' : 'Add Education'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="institution">Institution *</Label>
              <Input
                id="institution"
                {...register('institution', { required: true })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="degree">Education Level *</Label>
                <select
                  id="degree"
                  {...register('degree', { required: true })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select education level</option>
                  <optgroup label="School Education">
                    <option value="Primary School">Primary School</option>
                    <option value="Middle School">Middle School</option>
                    <option value="High School">High School</option>
                    <option value="Senior Secondary">Senior Secondary</option>
                  </optgroup>
                  <optgroup label="Higher Education">
                    <option value="Junior College">Junior College</option>
                    <option value="Associate's Degree">Associate's Degree</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="Doctoral Degree">Doctoral Degree (PhD)</option>
                    <option value="Professional Degree">Professional Degree</option>
                  </optgroup>
                  <optgroup label="Certifications">
                    <option value="Diploma">Diploma</option>
                    <option value="Certificate">Certificate Program</option>
                    <option value="Professional Certificate">Professional Certificate</option>
                  </optgroup>
                </select>
              </div>
              {!schoolLevels.includes(watchedDegree) && (
                <div>
                  <Label htmlFor="field">Field of Study *</Label>
                  <Input
                    id="field"
                    {...register('field', { required: !schoolLevels.includes(watchedDegree) })}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="month"
                  {...register('startDate', { required: true })}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="month"
                  {...register('endDate', { required: true })}
                />
              </div>
              <div>
                <Label htmlFor="gpa">GPA (Optional)</Label>
                <Input
                  id="gpa"
                  {...register('gpa')}
                  placeholder="3.8"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="achievements">Achievements & Activities (Optional)</Label>
              <Textarea
                id="achievements"
                {...register('achievements')}
                className="min-h-[100px] resize-y"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" variant="gradient">
                <Plus className="h-4 w-4 mr-2" />
                {editingId ? 'Update Education' : 'Add Education'}
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
