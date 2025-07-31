import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useResume } from '@/contexts/ResumeContext';
import { Skill } from '@/types/resume';
import { Plus, X, Code } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SkillFormData extends Omit<Skill, 'id'> {}

export const SkillsForm: React.FC = () => {
  const { resumeData, addSkill, removeSkill } = useResume();
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, setValue, watch } = useForm<SkillFormData>({
    defaultValues: {
      name: '',
      level: 'Intermediate',
      category: 'Technical'
    }
  });

  const selectedLevel = watch('level');
  const selectedCategory = watch('category');

  const onSubmit = (data: SkillFormData) => {
    // Check if skill already exists
    const exists = resumeData.skills.some(
      skill => skill.name.toLowerCase() === data.name.toLowerCase()
    );

    if (exists) {
      toast({
        title: "Skill already exists",
        description: "This skill is already in your resume.",
        variant: "destructive",
      });
      return;
    }

    addSkill(data);
    toast({
      title: "Skill added",
      description: "New skill has been added to your resume.",
    });
    reset();
  };

  const handleRemove = (id: string) => {
    removeSkill(id);
    toast({
      title: "Skill removed",
      description: "Skill has been removed from your resume.",
      variant: "destructive",
    });
  };

  const skillCategories = ['Technical', 'Programming', 'Tools', 'Languages', 'Soft Skills', 'Design', 'Marketing', 'Other'];
  const skillLevels: Skill['level'][] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  // Group skills by category
  const groupedSkills = resumeData.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const getLevelColor = (level: Skill['level']) => {
    switch (level) {
      case 'Beginner': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Advanced': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Expert': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Existing Skills */}
      {Object.keys(groupedSkills).length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Code className="h-5 w-5" />
            Skills
          </h3>
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <Card key={category} className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="secondary"
                      className={`${getLevelColor(skill.level)} group relative pr-6`}
                    >
                      {skill.name} ({skill.level})
                      <button
                        onClick={() => handleRemove(skill.id)}
                        className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Form */}
      <Card className="bg-gradient-card shadow-medium">
        <CardHeader>
          <CardTitle className="text-lg">Add Skill</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Skill Name *</Label>
              <Input
                id="name"
                {...register('name', { required: true })}
                
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={selectedCategory} onValueChange={(value) => setValue('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="level">Proficiency Level *</Label>
                <Select value={selectedLevel} onValueChange={(value) => setValue('level', value as Skill['level'])}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" variant="gradient" className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </form>
        </CardContent>
      </Card>

      {resumeData.skills.length === 0 && (
        <Card className="border-dashed border-2 border-muted-foreground/25">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <Code className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No skills added yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your skills
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
