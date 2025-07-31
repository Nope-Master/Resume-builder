import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { ProjectsForm } from './forms/ProjectsForm';
import { CertificationsForm } from './forms/CertificationsForm';
import { LanguagesForm } from './forms/LanguagesForm';
import { User, Briefcase, GraduationCap, Code, Folder, Award, Globe } from 'lucide-react';

export const ResumeForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', label: 'Personal', icon: User, component: PersonalInfoForm },
    { id: 'experience', label: 'Experience', icon: Briefcase, component: ExperienceForm },
    { id: 'education', label: 'Education', icon: GraduationCap, component: EducationForm },
    { id: 'skills', label: 'Skills', icon: Code, component: SkillsForm },
    { id: 'projects', label: 'Projects', icon: Folder, component: ProjectsForm },
    { id: 'certifications', label: 'Certifications', icon: Award, component: CertificationsForm },
    { id: 'languages', label: 'Languages', icon: Globe, component: LanguagesForm },
  ];

  return (
    <div className="space-y-6">
      {/* Main Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Fill out your information to build a professional resume
        </h1>
        <p className="text-muted-foreground text-lg">
          Complete each section to create your perfect resume
        </p>
      </div>
      
      <Card className="bg-gradient-form border-0 shadow-glass backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold">Resume Sections</CardTitle>
          <CardDescription>
            Use the tabs below to navigate between different resume sections
          </CardDescription>
        </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 mb-6">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex items-center gap-1 text-xs lg:text-sm"
                >
                  <IconComponent className="h-3 w-3 lg:h-4 lg:w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {tabs.map((tab) => {
            const FormComponent = tab.component;
            return (
              <TabsContent key={tab.id} value={tab.id} className="space-y-4">
                <FormComponent />
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
    </div>
  );
};