import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, Home, FileText, Info, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HeaderMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="clean-card">
          <Menu className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => navigate('/')} className="flex items-center gap-2">
          <Home className="h-4 w-4" />
          Home
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/resume-builder')} className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Resume Builder
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <Info className="h-4 w-4" />
          About
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Contact
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};