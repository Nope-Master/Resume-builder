import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import Index from './pages/Index';
import ResumeBuilder from './pages/ResumeBuilder';
import ResumeScore from './pages/ResumeScore';
import NotFound from './pages/NotFound';
import { Toaster } from '@/components/ui/toaster';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/resume-score" element={<ResumeScore />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>,
);