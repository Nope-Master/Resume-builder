import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useResume } from '@/contexts/ResumeContext';
import { Certification } from '@/types/resume';
import { Plus, Edit, Trash2, Award, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CertificationFormData {
  name: string;
  issuer: string;
}

export const CertificationsForm: React.FC = () => {
  const { resumeData, addCertification, updateCertification, removeCertification } = useResume();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const { register, handleSubmit, reset } = useForm<CertificationFormData>({
    defaultValues: {
      name: '',
      issuer: ''
    }
  });

  const onSubmit = (data: CertificationFormData) => {
    const certificationData = {
      ...data,
      date: new Date().getFullYear().toString(),
      expiryDate: '',
      credentialId: '',
      url: ''
    };

    if (editingId) {
      updateCertification(editingId, certificationData);
      setEditingId(null);
      toast({
        title: "Certification updated",
        description: "Your certification has been updated successfully.",
      });
    } else {
      addCertification(certificationData);
      toast({
        title: "Certification added",
        description: "New certification has been added to your resume.",
      });
    }
    
    reset();
  };

  const handleEdit = (certification: Certification) => {
    setEditingId(certification.id);
    reset(certification);
  };

  const handleRemove = (id: string) => {
    removeCertification(id);
    toast({
      title: "Certification removed",
      description: "Certification has been removed from your resume.",
      variant: "destructive",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset();
  };

  return (
    <div className="space-y-6">
      {/* Existing Certifications */}
      {resumeData.certifications.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Award className="h-5 w-5" />
            Certifications
          </h3>
          {resumeData.certifications.map((certification) => (
            <Card key={certification.id} className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {certification.name}
                    {certification.url && (
                      <a
                        href={certification.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-hover"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(certification)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemove(certification.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                 <p className="text-sm text-muted-foreground mb-1">
                   Issued by {certification.issuer}
                 </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Form */}
      <Card className="bg-gradient-card shadow-medium">
        <CardHeader>
          <CardTitle className="text-lg">
            {editingId ? 'Edit Certification' : 'Add Certification'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Certification Name *</Label>
              <Input
                id="name"
                {...register('name', { required: true })}
              />
            </div>

            <div>
              <Label htmlFor="issuer">Issuing Organization *</Label>
              <Input
                id="issuer"
                {...register('issuer', { required: true })}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" variant="gradient">
                <Plus className="h-4 w-4 mr-2" />
                {editingId ? 'Update Certification' : 'Add Certification'}
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

      {resumeData.certifications.length === 0 && (
        <Card className="border-dashed border-2 border-muted-foreground/25">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <Award className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No certifications added yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your professional certifications
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
