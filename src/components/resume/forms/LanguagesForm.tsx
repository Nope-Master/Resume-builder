import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useResume } from '@/contexts/ResumeContext';
import { Language } from '@/types/resume';
import { Plus, X, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LanguageFormData extends Omit<Language, 'id'> {}

export const LanguagesForm: React.FC = () => {
  const { resumeData, addLanguage, removeLanguage } = useResume();
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, setValue, watch } = useForm<LanguageFormData>({
    defaultValues: {
      name: '',
      proficiency: 'Conversational'
    }
  });

  const selectedProficiency = watch('proficiency');

  const onSubmit = (data: LanguageFormData) => {
    // Check if language already exists
    const exists = resumeData.languages.some(
      lang => lang.name.toLowerCase() === data.name.toLowerCase()
    );

    if (exists) {
      toast({
        title: "Language already exists",
        description: "This language is already in your resume.",
        variant: "destructive",
      });
      return;
    }

    addLanguage(data);
    toast({
      title: "Language added",
      description: "New language has been added to your resume.",
    });
    reset();
  };

  const handleRemove = (id: string) => {
    removeLanguage(id);
    toast({
      title: "Language removed",
      description: "Language has been removed from your resume.",
      variant: "destructive",
    });
  };

  const proficiencyLevels: Language['proficiency'][] = ['Basic', 'Conversational', 'Fluent', 'Native'];

  const getProficiencyColor = (proficiency: Language['proficiency']) => {
    switch (proficiency) {
      case 'Basic': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Conversational': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Fluent': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Native': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Existing Languages */}
      {resumeData.languages.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Languages
          </h3>
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2">
                {resumeData.languages.map((language) => (
                  <Badge
                    key={language.id}
                    variant="secondary"
                    className={`${getProficiencyColor(language.proficiency)} group relative pr-6`}
                  >
                    {language.name} ({language.proficiency})
                    <button
                      onClick={() => handleRemove(language.id)}
                      className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Form */}
      <Card className="bg-gradient-card shadow-medium">
        <CardHeader>
          <CardTitle className="text-lg">Add Language</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Language *</Label>
                <Input
                  id="name"
                  {...register('name', { required: true })}
                  placeholder="Spanish, French, Mandarin..."
                />
              </div>
              <div>
                <Label htmlFor="proficiency">Proficiency Level *</Label>
                <Select value={selectedProficiency} onValueChange={(value) => setValue('proficiency', value as Language['proficiency'])}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select proficiency" />
                  </SelectTrigger>
                  <SelectContent>
                    {proficiencyLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>Basic:</strong> Can understand and use familiar everyday expressions</p>
              <p><strong>Conversational:</strong> Can communicate in simple tasks and situations</p>
              <p><strong>Fluent:</strong> Can express ideas fluently and spontaneously</p>
              <p><strong>Native:</strong> Native or near-native proficiency</p>
            </div>

            <Button type="submit" variant="gradient" className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Language
            </Button>
          </form>
        </CardContent>
      </Card>

      {resumeData.languages.length === 0 && (
        <Card className="border-dashed border-2 border-muted-foreground/25">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <Globe className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No languages added yet</h3>
            <p className="text-muted-foreground mb-4">
              Add languages you speak to showcase your communication abilities
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
