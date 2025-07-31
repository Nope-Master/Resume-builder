import React, { useEffect, useState } from 'react';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';

interface LogoWithBackgroundRemovalProps {
  className?: string;
  alt?: string;
}

export const LogoWithBackgroundRemoval: React.FC<LogoWithBackgroundRemovalProps> = ({ 
  className = "", 
  alt = "AnD Resume Builder" 
}) => {
  const [processedLogoUrl, setProcessedLogoUrl] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const processLogo = async () => {
      try {
        setIsProcessing(true);
        setError("");

        // Load the original logo
        const response = await fetch("/lovable-uploads/e9d552e4-1445-4194-82dd-022d96867376.png");
        const blob = await response.blob();
        
        // Load as image element
        const imageElement = await loadImage(blob);
        
        // Remove background
        const processedBlob = await removeBackground(imageElement);
        
        // Create URL for processed image
        const url = URL.createObjectURL(processedBlob);
        setProcessedLogoUrl(url);
        
      } catch (err) {
        console.error("Error processing logo:", err);
        setError("Failed to process logo");
        // Fallback to original logo
        setProcessedLogoUrl("/lovable-uploads/e9d552e4-1445-4194-82dd-022d96867376.png");
      } finally {
        setIsProcessing(false);
      }
    };

    processLogo();

    // Cleanup function
    return () => {
      if (processedLogoUrl && processedLogoUrl.startsWith('blob:')) {
        URL.revokeObjectURL(processedLogoUrl);
      }
    };
  }, []);

  if (isProcessing) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="animate-pulse flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/20 rounded"></div>
          <div className="h-6 bg-primary/20 rounded w-32"></div>
        </div>
      </div>
    );
  }

  if (error && !processedLogoUrl) {
    return (
      <img 
        src="/lovable-uploads/e9d552e4-1445-4194-82dd-022d96867376.png" 
        alt={alt}
        className={`drop-shadow-2xl ${className}`}
      />
    );
  }

  return (
    <img 
      src={processedLogoUrl || "/lovable-uploads/e9d552e4-1445-4194-82dd-022d96867376.png"}
      alt={alt}
      className={`drop-shadow-2xl ${className}`}
      style={{
        filter: 'drop-shadow(0 0 20px rgba(255, 165, 0, 0.3))'
      }}
    />
  );
};