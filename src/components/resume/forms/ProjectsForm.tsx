import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useResume } from '@/contexts/ResumeContext';
import { Project } from '@/types/resume';
import { Plus, Edit, Trash2, Folder, ExternalLink, Github } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProjectFormData {
  name: string;
  description: string;
  technologies: string;
  url?: string;
}

export const ProjectsForm: React.FC = () => {
  const { resumeData, addProject, updateProject, removeProject } = useResume();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const { register, handleSubmit, reset } = useForm<ProjectFormData>({
    defaultValues: {
      name: '',
      description: '',
      technologies: '',
      url: ''
    }
  });

  const onSubmit = (data: ProjectFormData) => {
    const projectData: Omit<Project, 'id'> = {
      ...data,
      technologies: data.technologies.split(',').map(tech => tech.trim()).filter(tech => tech !== ''),
      github: '',
      startDate: '',
      endDate: ''
    };

    if (editingId) {
      updateProject(editingId, projectData);
      setEditingId(null);
      toast({
        title: "Project updated",
        description: "Your project has been updated successfully.",
      });
    } else {
      addProject(projectData);
      toast({
        title: "Project added",
        description: "New project has been added to your resume.",
      });
    }
    
    reset();
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    reset({
      ...project,
      technologies: project.technologies.join(', ')
    });
  };

  const handleRemove = (id: string) => {
    removeProject(id);
    toast({
      title: "Project removed",
      description: "Project has been removed from your resume.",
      variant: "destructive",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset();
  };

  return (
    <div className="space-y-6">
      {/* Existing Projects */}
      {resumeData.projects.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Folder className="h-5 w-5" />
            Projects
          </h3>
          {resumeData.projects.map((project) => (
            <Card key={project.id} className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {project.name}
                    {project.url && (
                      <a
                        href={project.url}
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
                      onClick={() => handleEdit(project)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemove(project.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Form */}
      <Card className="bg-gradient-card shadow-medium">
        <CardHeader>
          <CardTitle className="text-lg">
            {editingId ? 'Edit Project' : 'Add Project'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                {...register('name', { required: true })}
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                {...register('description', { required: true })}
                className="min-h-[100px] resize-y"
              />
            </div>

            <div>
              <Label htmlFor="technologies">Technologies Used *</Label>
              <Input
                id="technologies"
                {...register('technologies', { required: true })}
              />
            </div>

            <div>
              <Label htmlFor="url">Live Demo URL</Label>
              <Input
                id="url"
                {...register('url')}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" variant="gradient">
                <Plus className="h-4 w-4 mr-2" />
                {editingId ? 'Update Project' : 'Add Project'}
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

      {resumeData.projects.length === 0 && (
        <Card className="border-dashed border-2 border-muted-foreground/25">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <Folder className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No projects added yet</h3>
            <p className="text-muted-foreground mb-4">
              Showcase your projects
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
