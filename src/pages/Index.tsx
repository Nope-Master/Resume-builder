import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { LogoWithBackgroundRemoval } from '@/components/LogoWithBackgroundRemoval';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Content overlay for readability */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>
      
      <div className="text-center max-w-4xl mx-auto relative z-10">
        {/* Logo and Title */}
        <div className="flex items-center justify-center mb-8">
          <img 
            src="/lovable-uploads/1abc0872-1fa5-4e91-ae9f-eed24e44c1fa.png" 
            alt="AnD Resume Builder"
            className="h-40 w-auto drop-shadow-2xl rounded-2xl"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(255, 165, 0, 0.3))'
            }}
          />
        </div>
        
        <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          AnD Resume Builder
        </h1>
        
        <p className="text-xl lg:text-2xl text-foreground/80 mb-8 leading-relaxed">
          Create professional resumes with AI-powered feedback, multiple templates, 
          and real-time optimization for modern job applications.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => navigate('/resume-builder')}
            size="lg"
            className="text-lg px-8 py-4 bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            Start Building Now
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;