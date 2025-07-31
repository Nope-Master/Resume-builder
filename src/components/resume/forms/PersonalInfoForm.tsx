import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useResume } from '@/contexts/ResumeContext';
import { PersonalInfo } from '@/types/resume';
import { Save, Upload, X, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const PersonalInfoForm: React.FC = () => {
  const { resumeData, updatePersonalInfo } = useResume();
  const { toast } = useToast();
  const [photoPreview, setPhotoPreview] = useState<string>(resumeData.personalInfo.photo || '');
  
  const { register, handleSubmit, watch, setValue } = useForm<PersonalInfo>({
    defaultValues: resumeData.personalInfo
  });

  const watchedValues = watch();

  // Auto-save when values change
  React.useEffect(() => {
    const timer = setTimeout(() => {
      updatePersonalInfo(watchedValues);
    }, 500);

    return () => clearTimeout(timer);
  }, [watchedValues, updatePersonalInfo]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPhotoPreview(result);
        setValue('photo', result);
        updatePersonalInfo({ ...watchedValues, photo: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview('');
    setValue('photo', '');
    updatePersonalInfo({ ...watchedValues, photo: '' });
  };

  const onSubmit = (data: PersonalInfo) => {
    updatePersonalInfo(data);
    toast({
      title: "Personal information saved",
      description: "Your personal information has been updated successfully.",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Photo Upload Section */}
      <Card className="clean-card">
        <CardContent className="p-6">
          <Label className="text-base font-semibold mb-4 block">Profile Photo</Label>
          <div className="flex items-center gap-6">
            <div className="relative">
              {photoPreview ? (
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20">
                  <img 
                    src={photoPreview} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center bg-muted/20">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <Input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <Label 
                htmlFor="photo-upload" 
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                <Upload className="h-4 w-4" />
                {photoPreview ? 'Change Photo' : 'Upload Photo'}
              </Label>
              <p className="text-sm text-muted-foreground mt-2">
                Recommended: Square image, max 2MB
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            {...register('firstName', { required: true })}
            
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            {...register('lastName', { required: true })}
            
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register('email', { required: true })}
            
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            {...register('phone', { required: true })}
            
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

      <div>
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          {...register('website')}
          
        />
      </div>

      <div>
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          {...register('summary')}
          
          className="min-h-[120px] resize-y"
        />
      </div>

      <Button type="submit" className="w-full md:w-auto" variant="gradient">
        <Save className="h-4 w-4 mr-2" />
        Save Personal Information
      </Button>
    </form>
  );
};