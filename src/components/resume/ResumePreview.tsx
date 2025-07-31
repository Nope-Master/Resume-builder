import React, { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { ATSTemplate } from './templates/ATSTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { TechTemplate } from './templates/TechTemplate';
import { GraphicTemplate } from './templates/GraphicTemplate';
import { ConsultantTemplate } from './templates/ConsultantTemplate';
import { HealthcareTemplate } from './templates/HealthcareTemplate';
import { AcademicTemplate } from './templates/AcademicTemplate';
import { MarketingTemplate } from './templates/MarketingTemplate';
import { StartupTemplate } from './templates/StartupTemplate';
import { SalesTemplate } from './templates/SalesTemplate';
import { FinanceTemplate } from './templates/FinanceTemplate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { templates } from '@/data/templates';
import { exportToPDF } from '@/utils/pdfExport';
import { Download, Palette, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ResumePreview: React.FC = () => {
  const { resumeData, setTemplate } = useResume();
  const { toast } = useToast();
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const exportToPDFHandler = async () => {
    try {
      await exportToPDF('resume-preview', `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.pdf`);
      toast({
        title: "Resume exported",
        description: "Your resume has been exported as PDF successfully.",
      });
    } catch (error) {
      toast({
        title: "Export failed", 
        description: "Failed to export PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    setTemplate(templateId);
    setTemplateDialogOpen(false);
  };

  const renderTemplate = () => {
    switch (resumeData.template) {
      case 'classic':
        return <ClassicTemplate data={resumeData} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} />;
      case 'minimal':
        return <MinimalTemplate data={resumeData} />;
      case 'ats':
        return <ATSTemplate data={resumeData} />;
      case 'executive':
        return <ExecutiveTemplate data={resumeData} />;
      case 'tech':
        return <TechTemplate data={resumeData} />;
      case 'graphic':
        return <GraphicTemplate data={resumeData} />;
      case 'consultant':
        return <ConsultantTemplate data={resumeData} />;
      case 'healthcare':
        return <HealthcareTemplate data={resumeData} />;
      case 'academic':
        return <AcademicTemplate data={resumeData} />;
      case 'marketing':
        return <MarketingTemplate data={resumeData} />;
      case 'startup':
        return <StartupTemplate data={resumeData} />;
      case 'sales':
        return <SalesTemplate data={resumeData} />;
      case 'finance':
        return <FinanceTemplate data={resumeData} />;
      case 'modern':
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };


  const isEmpty = !resumeData.personalInfo.firstName && 
                  !resumeData.personalInfo.lastName && 
                  resumeData.experience.length === 0 && 
                  resumeData.education.length === 0;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="invisible-container">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Templates Preview</h2>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <span>Last saved: {new Date().toLocaleTimeString()}</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setTemplateDialogOpen(true)}
              className="flex items-center gap-2 clean-card hover:bg-primary/10"
            >
              <Palette className="h-4 w-4" />
              Templates
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2 bg-gradient-primary hover:opacity-90">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="clean-card">
                <DropdownMenuItem onClick={exportToPDFHandler}>
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log('Export PNG')}>
                  Export as PNG
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log('Export JPG')}>
                  Export as JPG
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Template Selection Dialog */}
      <Dialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto clean-card">
          <DialogHeader>
            <DialogTitle className="text-2xl">Choose a Template</DialogTitle>
            <p className="text-muted-foreground">Select a template that best fits your style and industry</p>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`relative cursor-pointer rounded-xl p-4 hover:border-primary transition-all hover:shadow-lg clean-card ${
                  resumeData.template === template.id ? 'border-primary shadow-lg' : ''
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-background to-muted/20 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden border border-border/20">
                  {/* Enhanced Template Preview with Two-Column Layouts */}
                  <div className={`absolute inset-2 bg-background rounded shadow-sm p-1.5 text-[6px] leading-tight overflow-hidden ${
                    template.id === 'classic' ? 'font-serif' :
                    template.id === 'modern' ? 'font-sans' :
                    template.id === 'creative' ? 'font-sans' :
                    template.id === 'minimal' ? 'font-light' :
                    template.id === 'ats' ? 'font-mono' :
                    template.id === 'executive' ? 'font-serif' :
                    template.id === 'tech' ? 'font-mono' :
                    template.id === 'graphic' ? 'font-sans' : 'font-sans'
                  }`}>
                    
                    {/* Two-Column Layout for most templates */}
                    {template.id === 'classic' || template.id === 'executive' ? (
                      /* Single Column for Classic/Executive */
                      <div className="h-full flex flex-col">
                        {/* Header */}
                        <div className="text-center border-b-2 border-primary pb-1 mb-1.5">
                          <div className="font-bold text-[7px] text-primary uppercase tracking-wide">
                            {template.id === 'executive' ? 'JOHN A. SMITH' : 'John Smith'}
                          </div>
                          <div className="text-[5px] text-muted-foreground italic">
                            {template.id === 'executive' ? 'CHIEF TECHNOLOGY OFFICER' : 'Software Engineer'}
                          </div>
                          <div className="text-[5px] text-muted-foreground">
                            john@email.com | (555) 123-4567 | New York, NY
                          </div>
                        </div>
                        
                        {/* Professional Summary */}
                        <div className="mb-1.5">
                          <div className="font-semibold text-[5px] uppercase text-primary border-b border-primary/30 mb-0.5">Summary</div>
                          <div className="text-[4px] text-muted-foreground leading-tight">
                            Senior software engineer with 8+ years of experience in full-stack development...
                          </div>
                        </div>
                        
                        {/* Experience */}
                        <div className="mb-1.5">
                          <div className="font-semibold text-[5px] uppercase text-primary border-b border-primary/30 mb-0.5">Experience</div>
                          <div className="space-y-0.5">
                            <div>
                              <div className="font-medium text-[5px] text-foreground">Senior Developer • TechCorp</div>
                              <div className="text-[4px] text-muted-foreground">2020 - Present</div>
                              <div className="text-[4px] text-muted-foreground">• Led team of 5 developers</div>
                              <div className="text-[4px] text-muted-foreground">• Increased performance by 40%</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Education & Skills */}
                        <div className="space-y-1">
                          <div>
                            <div className="font-semibold text-[5px] uppercase text-primary border-b border-primary/30 mb-0.5">Education</div>
                            <div className="text-[5px] font-medium">BS Computer Science</div>
                            <div className="text-[4px] text-muted-foreground">MIT • 2016</div>
                          </div>
                          <div>
                            <div className="font-semibold text-[5px] uppercase text-primary border-b border-primary/30 mb-0.5">Skills</div>
                            <div className="flex flex-wrap gap-0.5">
                              <span className="text-[4px] bg-primary/20 text-primary px-1 py-0.5 rounded border border-primary/30">React</span>
                              <span className="text-[4px] bg-secondary/20 text-secondary px-1 py-0.5 rounded border border-secondary/30">Node.js</span>
                              <span className="text-[4px] bg-accent/20 text-accent px-1 py-0.5 rounded border border-accent/30">AWS</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Two-Column Layout for Modern, Creative, Minimal, ATS, Tech, Graphic */
                      <div className="h-full grid grid-cols-3 gap-1">
                        {/* Left Sidebar */}
                        <div className={`space-y-1 ${
                          template.id === 'modern' ? 'bg-primary/5 p-1 rounded' :
                          template.id === 'creative' ? 'bg-gradient-to-b from-accent/10 to-primary/10 p-1 rounded' :
                          template.id === 'minimal' ? 'border-r border-border pr-1' :
                          template.id === 'ats' ? 'bg-muted/20 p-1' :
                          template.id === 'tech' ? 'bg-primary/10 p-1 rounded border border-primary/20' :
                          template.id === 'graphic' ? 'bg-gradient-to-br from-primary/20 to-accent/20 p-1 rounded' :
                          'bg-muted/10 p-1'
                        }`}>
                          {/* Profile Photo Placeholder */}
                          <div className={`w-full aspect-square rounded mb-1 ${
                            template.id === 'modern' ? 'bg-primary/20' :
                            template.id === 'creative' ? 'bg-accent/30 rounded-full' :
                            template.id === 'minimal' ? 'bg-muted/40 rounded-full' :
                            template.id === 'ats' ? 'bg-muted/40' :
                            template.id === 'tech' ? 'bg-primary/30 border border-primary/40' :
                            template.id === 'graphic' ? 'bg-gradient-to-br from-primary to-accent rounded-full' :
                            'bg-muted/30'
                          } flex items-center justify-center`}>
                            <div className="text-[3px] text-muted-foreground font-bold">PHOTO</div>
                          </div>
                          
                          {/* Contact Info */}
                          <div className="space-y-0.5">
                            <div className={`font-semibold text-[4.5px] uppercase tracking-wide mb-0.5 ${
                              template.id === 'modern' ? 'text-primary' :
                              template.id === 'creative' ? 'text-accent' :
                              template.id === 'minimal' ? 'text-muted-foreground' :
                              template.id === 'ats' ? 'text-foreground' :
                              template.id === 'tech' ? 'text-primary' :
                              template.id === 'graphic' ? 'text-primary' :
                              'text-primary'
                            }`}>
                              {template.id === 'tech' ? '// CONTACT' : 'Contact'}
                            </div>
                            <div className="space-y-0.5 text-[4px] text-muted-foreground">
                              <div>john@email.com</div>
                              <div>(555) 123-4567</div>
                              <div>New York, NY</div>
                              <div>linkedin.com/in/john</div>
                            </div>
                          </div>
                          
                          {/* Skills with Progress Bars */}
                          <div className="space-y-0.5">
                            <div className={`font-semibold text-[4.5px] uppercase tracking-wide mb-0.5 ${
                              template.id === 'modern' ? 'text-primary' :
                              template.id === 'creative' ? 'text-accent' :
                              template.id === 'minimal' ? 'text-muted-foreground' :
                              template.id === 'ats' ? 'text-foreground' :
                              template.id === 'tech' ? 'text-secondary' :
                              template.id === 'graphic' ? 'text-secondary' :
                              'text-secondary'
                            }`}>
                              {template.id === 'tech' ? '// SKILLS' : 'Skills'}
                            </div>
                            <div className="space-y-0.5">
                              <div className="text-[4px] text-foreground">React.js</div>
                              <div className={`w-full h-0.5 rounded ${
                                template.id === 'modern' ? 'bg-primary/30' :
                                template.id === 'creative' ? 'bg-accent/30' :
                                template.id === 'minimal' ? 'bg-muted' :
                                template.id === 'ats' ? 'bg-muted' :
                                template.id === 'tech' ? 'bg-primary/30' :
                                template.id === 'graphic' ? 'bg-gradient-to-r from-primary to-accent' :
                                'bg-primary/30'
                              }`}>
                                <div className={`h-full w-4/5 rounded ${
                                  template.id === 'modern' ? 'bg-primary' :
                                  template.id === 'creative' ? 'bg-accent' :
                                  template.id === 'minimal' ? 'bg-foreground' :
                                  template.id === 'ats' ? 'bg-foreground' :
                                  template.id === 'tech' ? 'bg-primary' :
                                  template.id === 'graphic' ? 'bg-primary' :
                                  'bg-primary'
                                }`}></div>
                              </div>
                              <div className="text-[4px] text-foreground">Node.js</div>
                              <div className={`w-full h-0.5 rounded bg-muted`}>
                                <div className={`h-full w-3/5 rounded ${
                                  template.id === 'modern' ? 'bg-secondary' :
                                  template.id === 'creative' ? 'bg-primary' :
                                  'bg-foreground'
                                }`}></div>
                              </div>
                              <div className="text-[4px] text-foreground">AWS</div>
                              <div className={`w-full h-0.5 rounded bg-muted`}>
                                <div className={`h-full w-3/4 rounded ${
                                  template.id === 'modern' ? 'bg-accent' :
                                  'bg-foreground'
                                }`}></div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Languages */}
                          <div className="space-y-0.5">
                            <div className={`font-semibold text-[4.5px] uppercase tracking-wide mb-0.5 ${
                              template.id === 'tech' ? 'text-accent' : 'text-accent'
                            }`}>
                              {template.id === 'tech' ? '// LANG' : 'Languages'}
                            </div>
                            <div className="space-y-0.5 text-[4px]">
                              <div>English (Native)</div>
                              <div>Spanish (Fluent)</div>
                              <div>French (Basic)</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Main Content */}
                        <div className="col-span-2 space-y-1">
                          {/* Header */}
                          <div className={`pb-1 mb-1 ${
                            template.id === 'modern' ? 'border-b-2 border-gradient-primary' :
                            template.id === 'creative' ? 'bg-primary/10 p-1 rounded' :
                            template.id === 'minimal' ? 'border-b border-muted' :
                            template.id === 'ats' ? 'border-b border-border' :
                            template.id === 'tech' ? 'bg-muted/20 p-1 border border-primary/20' :
                            template.id === 'graphic' ? 'bg-gradient-to-r from-primary/20 to-accent/20 p-1 rounded' :
                            'border-b border-border/20'
                          }`}>
                            <div className={`font-bold text-[7px] mb-0.5 ${
                              template.id === 'modern' ? 'bg-gradient-primary bg-clip-text text-transparent' :
                              template.id === 'creative' ? 'text-accent' :
                              template.id === 'minimal' ? 'text-foreground' :
                              template.id === 'ats' ? 'text-foreground' :
                              template.id === 'tech' ? 'text-primary font-bold' :
                              template.id === 'graphic' ? 'text-primary' :
                              'text-primary'
                            }`}>
                              John Smith
                            </div>
                            <div className={`text-[5px] ${
                              template.id === 'modern' ? 'text-secondary font-medium' :
                              template.id === 'creative' ? 'text-primary font-medium' :
                              template.id === 'minimal' ? 'text-muted-foreground' :
                              template.id === 'ats' ? 'text-foreground' :
                              template.id === 'tech' ? 'text-accent font-mono' :
                              template.id === 'graphic' ? 'text-secondary font-medium' :
                              'text-muted-foreground'
                            }`}>
                              {template.id === 'tech' ? '>> Full Stack Developer' : 'Software Engineer'}
                            </div>
                          </div>
                          
                          {/* Professional Summary */}
                          <div className="mb-1">
                            <div className={`font-semibold text-[5px] uppercase tracking-wide mb-0.5 ${
                              template.id === 'modern' ? 'text-accent bg-accent/10 px-1 rounded' :
                              template.id === 'creative' ? 'text-secondary' :
                              template.id === 'minimal' ? 'text-muted-foreground' :
                              template.id === 'ats' ? 'text-foreground' :
                              template.id === 'tech' ? 'text-primary bg-primary/10 px-1' :
                              template.id === 'graphic' ? 'text-primary bg-primary/10 px-1 rounded' :
                              'text-accent'
                            }`}>
                              {template.id === 'tech' ? '// SUMMARY' : 'Professional Summary'}
                            </div>
                            <div className="text-[4px] text-muted-foreground leading-tight">
                              {template.id === 'tech' ? 
                                '// Senior full-stack developer with expertise in React, Node.js, and cloud architecture...' :
                                'Senior software engineer with 8+ years of experience building scalable web applications and leading development teams...'
                              }
                            </div>
                          </div>
                          
                          {/* Experience */}
                          <div className="mb-1">
                            <div className={`font-semibold text-[5px] uppercase tracking-wide mb-0.5 ${
                              template.id === 'modern' ? 'text-primary bg-primary/10 px-1 rounded' :
                              template.id === 'creative' ? 'text-accent' :
                              template.id === 'minimal' ? 'text-muted-foreground' :
                              template.id === 'ats' ? 'text-foreground' :
                              template.id === 'tech' ? 'text-secondary bg-secondary/10 px-1' :
                              template.id === 'graphic' ? 'text-secondary bg-secondary/10 px-1 rounded' :
                              'text-primary'
                            }`}>
                              {template.id === 'tech' ? '// EXPERIENCE' : 'Professional Experience'}
                            </div>
                            <div className="space-y-0.5">
                              <div>
                                <div className={`font-medium text-[5px] ${
                                  template.id === 'modern' ? 'text-primary' :
                                  template.id === 'creative' ? 'text-accent' :
                                  template.id === 'tech' ? 'text-accent font-mono' :
                                  'text-foreground'
                                }`}>
                                  {template.id === 'tech' ? 'senior_dev() • TechCorp' : 'Senior Developer • TechCorp Inc.'}
                                </div>
                                <div className="text-[4px] text-muted-foreground">2020 - Present</div>
                                <div className="text-[4px] text-muted-foreground">
                                  {template.id === 'tech' ? '// Led engineering team, architected microservices' : '• Led team of 5 developers'}
                                </div>
                                <div className="text-[4px] text-muted-foreground">
                                  {template.id === 'tech' ? '// Performance optimization: +40% efficiency' : '• Increased application performance by 40%'}
                                </div>
                                <div className="text-[4px] text-muted-foreground">
                                  {template.id === 'tech' ? '// Implemented CI/CD pipeline, reduced deployment time 60%' : '• Reduced deployment time by 60%'}
                                </div>
                              </div>
                              <div>
                                <div className={`font-medium text-[5px] ${
                                  template.id === 'tech' ? 'text-accent font-mono' : 'text-foreground'
                                }`}>
                                  {template.id === 'tech' ? 'developer() • StartupCo' : 'Full Stack Developer • StartupCo'}
                                </div>
                                <div className="text-[4px] text-muted-foreground">2018 - 2020</div>
                                <div className="text-[4px] text-muted-foreground">
                                  {template.id === 'tech' ? '// Built scalable web applications using React & Node.js' : '• Built scalable web applications'}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Education */}
                          <div className="space-y-0.5">
                            <div className={`font-semibold text-[5px] uppercase tracking-wide mb-0.5 ${
                              template.id === 'modern' ? 'text-secondary bg-secondary/10 px-1 rounded' :
                              template.id === 'creative' ? 'text-primary' :
                              template.id === 'tech' ? 'text-accent bg-accent/10 px-1' :
                              'text-accent'
                            }`}>
                              {template.id === 'tech' ? '// EDUCATION' : 'Education'}
                            </div>
                            <div>
                              <div className="text-[5px] font-medium">
                                {template.id === 'tech' ? 'BS_Computer_Science()' : 'Bachelor of Science in Computer Science'}
                              </div>
                              <div className="text-[4px] text-muted-foreground">
                                {template.id === 'tech' ? '// MIT • 2018 • GPA: 3.8' : 'Massachusetts Institute of Technology • 2018'}
                              </div>
                            </div>
                          </div>
                          
                          {/* Projects */}
                          <div className="space-y-0.5">
                            <div className={`font-semibold text-[5px] uppercase tracking-wide mb-0.5 ${
                              template.id === 'tech' ? 'text-primary bg-primary/10 px-1' : 'text-primary'
                            }`}>
                              {template.id === 'tech' ? '// PROJECTS' : 'Key Projects'}
                            </div>
                            <div className="space-y-0.5">
                              <div>
                                <div className="text-[5px] font-medium">
                                  {template.id === 'tech' ? 'ecommerce_platform.js' : 'E-commerce Platform'}
                                </div>
                                <div className="text-[4px] text-muted-foreground">
                                  {template.id === 'tech' ? '// React, Node.js, AWS • 10K+ users' : 'Built with React & Node.js, serves 10K+ users'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Template Style Indicator */}
                  <div className="absolute top-1 left-1 px-1 py-0.5 bg-primary/20 rounded text-[8px] font-medium">
                    {template.name}
                  </div>
                  
                  {/* Color indicators - clickable to change colors */}
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    {template.colors?.slice(0, 3).map((color, index) => (
                      <button
                        key={index}
                        className="w-3 h-3 rounded-full border-2 border-background hover:border-primary transition-colors cursor-pointer hover:scale-110 transform"
                        style={{ backgroundColor: color }}
                        onClick={(e) => {
                          e.stopPropagation();
                          const newColors = [...(selectedColors.length > 0 ? selectedColors : template.colors || [])];
                          // Cycle through predefined color options
                          const colorOptions = ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#6366F1'];
                          const currentIndex = colorOptions.indexOf(color);
                          const nextIndex = (currentIndex + 1) % colorOptions.length;
                          newColors[index] = colorOptions[nextIndex];
                          setSelectedColors(newColors);
                          toast({
                            title: "Color updated",
                            description: `Template color ${index + 1} changed`,
                          });
                        }}
                        title={`Click to change color ${index + 1}`}
                      />
                    )) || null}
                  </div>
                </div>
                <h3 className="font-semibold text-base mb-1">{template.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{template.description}</p>
                {resumeData.template === template.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview */}
      <div className="clean-card overflow-hidden rounded-xl">
        <div className="p-0">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
              <Eye className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                No resume data yet
              </h3>
              <p className="text-muted-foreground max-w-md">
                Start filling out your information in the form to see your resume preview here. 
                Your changes will appear in real-time.
              </p>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-background/50 to-muted/10 p-4 lg:p-8 min-h-[600px]">
              <div 
                id="resume-preview" 
                className="transform scale-75 lg:scale-90 xl:scale-100 origin-top"
                style={{ transformOrigin: 'top center' }}
              >
                {renderTemplate()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};