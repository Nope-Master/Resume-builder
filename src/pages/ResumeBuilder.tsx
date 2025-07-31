import React, { useState } from 'react';
import { ResumeProvider } from '@/contexts/ResumeContext';
import { ResumeForm } from '@/components/resume/ResumeForm';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { ResumeScore } from '@/components/resume/ResumeScore';
import { HeaderMenu } from '@/components/HeaderMenu';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileText, BarChart3, Eye, Menu, X, Palette } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useResume } from '@/contexts/ResumeContext';
import { templates } from '@/data/templates';
import { useToast } from '@/hooks/use-toast';

const ResumeBuilderContent: React.FC = () => {
  const [activeView, setActiveView] = useState<'form' | 'preview' | 'score'>('form');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [colorDialogOpen, setColorDialogOpen] = useState(false);
  const { resumeData, setTemplate, setCustomColors } = useResume();
  const { toast } = useToast();

  const views = [
    { id: 'form', label: 'Edit', icon: FileText, component: ResumeForm },
    { id: 'preview', label: 'Preview', icon: Eye, component: ResumePreview },
    { id: 'score', label: 'AI Score', icon: BarChart3, component: () => {
      // Navigate to score page
      return null;
    } },
  ];

  const handleScoreClick = () => {
    setActiveView('score');
  };

  const ActiveComponent = views.find(view => view.id === activeView)?.component || ResumeForm;

  const colorOptions = [
    { name: 'Blue', colors: ['#3B82F6', '#1E40AF', '#60A5FA'] },
    { name: 'Purple', colors: ['#8B5CF6', '#7C3AED', '#A855F7'] },
    { name: 'Green', colors: ['#10B981', '#059669', '#34D399'] },
    { name: 'Lime Green', colors: ['#84CC16', '#65A30D', '#A3E635'] },
    { name: 'Orange', colors: ['#F59E0B', '#D97706', '#FBBF24'] },
    { name: 'Red', colors: ['#EF4444', '#DC2626', '#F87171'] },
    { name: 'Pink', colors: ['#EC4899', '#DB2777', '#F472B6'] },
    { name: 'Yellow', colors: ['#EAB308', '#CA8A04', '#FDE047'] },
    { name: 'Teal', colors: ['#14B8A6', '#0D9488', '#5EEAD4'] },
    { name: 'Indigo', colors: ['#6366F1', '#4F46E5', '#818CF8'] },
    { name: 'Grey', colors: ['#6B7280', '#4B5563', '#9CA3AF'] },
    { name: 'Cyan', colors: ['#06B6D4', '#0891B2', '#67E8F9'] },
  ];

  const handleColorSelect = (colors: string[]) => {
    // Store the selected colors in the resume context
    setCustomColors(colors);
    setColorDialogOpen(false);
    toast({
      title: "Colors applied",
      description: `Applied new color scheme to your resume`,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur-sm border-b border-border/40 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/1abc0872-1fa5-4e91-ae9f-eed24e44c1fa.png" 
                alt="AnD Resume Builder"
                className="h-16 w-auto drop-shadow-lg rounded-xl"
                style={{
                  filter: 'drop-shadow(0 0 15px rgba(255, 165, 0, 0.3))'
                }}
              />
              <div>
                <h1 className="text-xl font-bold">AnD Resume Builder</h1>
                <p className="text-sm text-muted-foreground">Create your professional resume</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-2">
                {views.map((view) => {
                  const IconComponent = view.icon;
                  return (
                    <Button
                      key={view.id}
                      variant={activeView === view.id ? 'default' : 'ghost'}
                      onClick={() => view.id === 'score' ? handleScoreClick() : setActiveView(view.id as any)}
                      className="flex items-center gap-2"
                    >
                      <IconComponent className="h-4 w-4" />
                      {view.label}
                    </Button>
                  );
                })}
              </nav>

              {/* Header Menu */}
              <HeaderMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Tabs */}
          <div className="lg:hidden mb-6">
            <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)}>
              <TabsList className="grid w-full grid-cols-3">
                {views.map((view) => {
                  const IconComponent = view.icon;
                  return (
                    <TabsTrigger key={view.id} value={view.id} className="flex items-center gap-1">
                      <IconComponent className="h-3 w-3" />
                      <span className="hidden sm:inline">{view.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Panel - Always show form on desktop */}
            <div className={`${activeView !== 'form' ? 'hidden lg:block' : ''}`}>
              <ResumeForm />
            </div>

            {/* Right Panel - Preview/Score */}
            <div className={`${activeView === 'form' ? 'hidden lg:block' : ''}`}>
              {activeView === 'preview' ? (
                <div className="space-y-6">
                  <ResumePreview />
                  <div className="text-center space-y-4">
                    {/* Color Theme Selection Button */}
                    <Dialog open={colorDialogOpen} onOpenChange={setColorDialogOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline"
                          size="lg"
                          className="text-lg px-8 py-4 hover:bg-primary/10 border-2"
                        >
                          <Palette className="h-5 w-5 mr-2" />
                          Choose Color Theme
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto z-50 bg-background border shadow-lg">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">Choose Color Theme</DialogTitle>
                          <p className="text-muted-foreground">Select a color scheme for your resume</p>
                        </DialogHeader>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
                          {colorOptions.map((colorOption) => (
                            <div
                              key={colorOption.name}
                              className="cursor-pointer rounded-xl p-4 hover:border-primary transition-all hover:shadow-lg bg-background border-2 border-border hover:scale-105 transform"
                              onClick={() => handleColorSelect(colorOption.colors)}
                            >
                              <div className="flex flex-col items-center space-y-3">
                                {/* Color Preview */}
                                <div className="flex gap-2">
                                  {colorOption.colors.map((color, index) => (
                                    <div
                                      key={index}
                                      className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                                      style={{ backgroundColor: color }}
                                    />
                                  ))}
                                </div>
                                
                                {/* Color Name */}
                                <h3 className="font-semibold text-base text-center">{colorOption.name}</h3>
                                
                                {/* Sample Text */}
                                <div className="text-center space-y-1">
                                  <div 
                                    className="text-sm font-medium"
                                    style={{ color: colorOption.colors[0] }}
                                  >
                                    Header Text
                                  </div>
                                  <div 
                                    className="text-xs"
                                    style={{ color: colorOption.colors[1] }}
                                  >
                                    Subheading
                                  </div>
                                  <div 
                                    className="text-xs"
                                    style={{ color: colorOption.colors[2] }}
                                  >
                                    Accent Text
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    {/* Resume Score Button */}
                    <Button 
                      onClick={() => setActiveView('score')}
                      size="lg"
                      className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 py-4"
                    >
                      Check Your Resume Score and Get Feedback
                    </Button>
                  </div>
                </div>
              ) : 
               activeView === 'score' ? <ResumeScore /> : 
               <ResumePreview />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const ResumeBuilder: React.FC = () => {
  return (
    <ResumeProvider>
      <ResumeBuilderContent />
    </ResumeProvider>
  );
};

export default ResumeBuilder;