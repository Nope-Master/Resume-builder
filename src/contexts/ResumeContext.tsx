import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { ResumeData, defaultResumeData } from '@/types/resume';

interface ResumeContextType {
  resumeData: ResumeData;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  addExperience: (experience: Omit<ResumeData['experience'][0], 'id'>) => void;
  updateExperience: (id: string, experience: Partial<ResumeData['experience'][0]>) => void;
  removeExperience: (id: string) => void;
  addEducation: (education: Omit<ResumeData['education'][0], 'id'>) => void;
  updateEducation: (id: string, education: Partial<ResumeData['education'][0]>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: Omit<ResumeData['skills'][0], 'id'>) => void;
  updateSkill: (id: string, skill: Partial<ResumeData['skills'][0]>) => void;
  removeSkill: (id: string) => void;
  addProject: (project: Omit<ResumeData['projects'][0], 'id'>) => void;
  updateProject: (id: string, project: Partial<ResumeData['projects'][0]>) => void;
  removeProject: (id: string) => void;
  addCertification: (certification: Omit<ResumeData['certifications'][0], 'id'>) => void;
  updateCertification: (id: string, certification: Partial<ResumeData['certifications'][0]>) => void;
  removeCertification: (id: string) => void;
  addLanguage: (language: Omit<ResumeData['languages'][0], 'id'>) => void;
  updateLanguage: (id: string, language: Partial<ResumeData['languages'][0]>) => void;
  removeLanguage: (id: string) => void;
  setTemplate: (template: string) => void;
  setCustomColors: (colors: string[]) => void;
  loadFromStorage: () => void;
  saveToStorage: () => void;
}

type ResumeAction = 
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<ResumeData['personalInfo']> }
  | { type: 'ADD_EXPERIENCE'; payload: ResumeData['experience'][0] }
  | { type: 'UPDATE_EXPERIENCE'; payload: { id: string; data: Partial<ResumeData['experience'][0]> } }
  | { type: 'REMOVE_EXPERIENCE'; payload: string }
  | { type: 'ADD_EDUCATION'; payload: ResumeData['education'][0] }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; data: Partial<ResumeData['education'][0]> } }
  | { type: 'REMOVE_EDUCATION'; payload: string }
  | { type: 'ADD_SKILL'; payload: ResumeData['skills'][0] }
  | { type: 'UPDATE_SKILL'; payload: { id: string; data: Partial<ResumeData['skills'][0]> } }
  | { type: 'REMOVE_SKILL'; payload: string }
  | { type: 'ADD_PROJECT'; payload: ResumeData['projects'][0] }
  | { type: 'UPDATE_PROJECT'; payload: { id: string; data: Partial<ResumeData['projects'][0]> } }
  | { type: 'REMOVE_PROJECT'; payload: string }
  | { type: 'ADD_CERTIFICATION'; payload: ResumeData['certifications'][0] }
  | { type: 'UPDATE_CERTIFICATION'; payload: { id: string; data: Partial<ResumeData['certifications'][0]> } }
  | { type: 'REMOVE_CERTIFICATION'; payload: string }
  | { type: 'ADD_LANGUAGE'; payload: ResumeData['languages'][0] }
  | { type: 'UPDATE_LANGUAGE'; payload: { id: string; data: Partial<ResumeData['languages'][0]> } }
  | { type: 'REMOVE_LANGUAGE'; payload: string }
  | { type: 'SET_TEMPLATE'; payload: string }
  | { type: 'SET_CUSTOM_COLORS'; payload: string[] }
  | { type: 'LOAD_DATA'; payload: ResumeData };

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

function resumeReducer(state: ResumeData, action: ResumeAction): ResumeData {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
        lastModified: new Date().toISOString()
      };
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        experience: [...state.experience, action.payload],
        lastModified: new Date().toISOString()
      };
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.map(exp => 
          exp.id === action.payload.id ? { ...exp, ...action.payload.data } : exp
        ),
        lastModified: new Date().toISOString()
      };
    case 'REMOVE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.filter(exp => exp.id !== action.payload),
        lastModified: new Date().toISOString()
      };
    case 'ADD_EDUCATION':
      return {
        ...state,
        education: [...state.education, action.payload],
        lastModified: new Date().toISOString()
      };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map(edu => 
          edu.id === action.payload.id ? { ...edu, ...action.payload.data } : edu
        ),
        lastModified: new Date().toISOString()
      };
    case 'REMOVE_EDUCATION':
      return {
        ...state,
        education: state.education.filter(edu => edu.id !== action.payload),
        lastModified: new Date().toISOString()
      };
    case 'ADD_SKILL':
      return {
        ...state,
        skills: [...state.skills, action.payload],
        lastModified: new Date().toISOString()
      };
    case 'UPDATE_SKILL':
      return {
        ...state,
        skills: state.skills.map(skill => 
          skill.id === action.payload.id ? { ...skill, ...action.payload.data } : skill
        ),
        lastModified: new Date().toISOString()
      };
    case 'REMOVE_SKILL':
      return {
        ...state,
        skills: state.skills.filter(skill => skill.id !== action.payload),
        lastModified: new Date().toISOString()
      };
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload],
        lastModified: new Date().toISOString()
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(project => 
          project.id === action.payload.id ? { ...project, ...action.payload.data } : project
        ),
        lastModified: new Date().toISOString()
      };
    case 'REMOVE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(project => project.id !== action.payload),
        lastModified: new Date().toISOString()
      };
    case 'ADD_CERTIFICATION':
      return {
        ...state,
        certifications: [...state.certifications, action.payload],
        lastModified: new Date().toISOString()
      };
    case 'UPDATE_CERTIFICATION':
      return {
        ...state,
        certifications: state.certifications.map(cert => 
          cert.id === action.payload.id ? { ...cert, ...action.payload.data } : cert
        ),
        lastModified: new Date().toISOString()
      };
    case 'REMOVE_CERTIFICATION':
      return {
        ...state,
        certifications: state.certifications.filter(cert => cert.id !== action.payload),
        lastModified: new Date().toISOString()
      };
    case 'ADD_LANGUAGE':
      return {
        ...state,
        languages: [...state.languages, action.payload],
        lastModified: new Date().toISOString()
      };
    case 'UPDATE_LANGUAGE':
      return {
        ...state,
        languages: state.languages.map(lang => 
          lang.id === action.payload.id ? { ...lang, ...action.payload.data } : lang
        ),
        lastModified: new Date().toISOString()
      };
    case 'REMOVE_LANGUAGE':
      return {
        ...state,
        languages: state.languages.filter(lang => lang.id !== action.payload),
        lastModified: new Date().toISOString()
      };
    case 'SET_TEMPLATE':
      return {
        ...state,
        template: action.payload,
        lastModified: new Date().toISOString()
      };
    case 'SET_CUSTOM_COLORS':
      return {
        ...state,
        customColors: action.payload,
        lastModified: new Date().toISOString()
      };
    case 'LOAD_DATA':
      return action.payload;
    default:
      return state;
  }
}

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, dispatch] = useReducer(resumeReducer, defaultResumeData);

  // Auto-save every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      saveToStorage();
    }, 10000);

    return () => clearInterval(interval);
  }, [resumeData]);

  // Load data on mount
  useEffect(() => {
    loadFromStorage();
  }, []);

  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const saveToStorage = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  };

  const loadFromStorage = () => {
    const saved = localStorage.getItem('resumeData');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        dispatch({ type: 'LOAD_DATA', payload: data });
      } catch (error) {
        console.error('Error loading resume data:', error);
      }
    }
  };

  const contextValue: ResumeContextType = {
    resumeData,
    updatePersonalInfo: (info) => dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: info }),
    addExperience: (experience) => dispatch({ 
      type: 'ADD_EXPERIENCE', 
      payload: { ...experience, id: generateId() } 
    }),
    updateExperience: (id, experience) => dispatch({ 
      type: 'UPDATE_EXPERIENCE', 
      payload: { id, data: experience } 
    }),
    removeExperience: (id) => dispatch({ type: 'REMOVE_EXPERIENCE', payload: id }),
    addEducation: (education) => dispatch({ 
      type: 'ADD_EDUCATION', 
      payload: { ...education, id: generateId() } 
    }),
    updateEducation: (id, education) => dispatch({ 
      type: 'UPDATE_EDUCATION', 
      payload: { id, data: education } 
    }),
    removeEducation: (id) => dispatch({ type: 'REMOVE_EDUCATION', payload: id }),
    addSkill: (skill) => dispatch({ 
      type: 'ADD_SKILL', 
      payload: { ...skill, id: generateId() } 
    }),
    updateSkill: (id, skill) => dispatch({ 
      type: 'UPDATE_SKILL', 
      payload: { id, data: skill } 
    }),
    removeSkill: (id) => dispatch({ type: 'REMOVE_SKILL', payload: id }),
    addProject: (project) => dispatch({ 
      type: 'ADD_PROJECT', 
      payload: { ...project, id: generateId() } 
    }),
    updateProject: (id, project) => dispatch({ 
      type: 'UPDATE_PROJECT', 
      payload: { id, data: project } 
    }),
    removeProject: (id) => dispatch({ type: 'REMOVE_PROJECT', payload: id }),
    addCertification: (certification) => dispatch({ 
      type: 'ADD_CERTIFICATION', 
      payload: { ...certification, id: generateId() } 
    }),
    updateCertification: (id, certification) => dispatch({ 
      type: 'UPDATE_CERTIFICATION', 
      payload: { id, data: certification } 
    }),
    removeCertification: (id) => dispatch({ type: 'REMOVE_CERTIFICATION', payload: id }),
    addLanguage: (language) => dispatch({ 
      type: 'ADD_LANGUAGE', 
      payload: { ...language, id: generateId() } 
    }),
    updateLanguage: (id, language) => dispatch({ 
      type: 'UPDATE_LANGUAGE', 
      payload: { id, data: language } 
    }),
    removeLanguage: (id) => dispatch({ type: 'REMOVE_LANGUAGE', payload: id }),
    setTemplate: (template) => dispatch({ type: 'SET_TEMPLATE', payload: template }),
    setCustomColors: (colors) => dispatch({ type: 'SET_CUSTOM_COLORS', payload: colors }),
    loadFromStorage,
    saveToStorage
  };

  return (
    <ResumeContext.Provider value={contextValue}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};