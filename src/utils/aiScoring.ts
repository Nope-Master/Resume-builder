import { ResumeData, ResumeScore } from '@/types/resume';

// Action words that make resumes stronger
const actionWords = [
  'achieved', 'analyzed', 'built', 'created', 'delivered', 'developed', 'designed',
  'enhanced', 'established', 'executed', 'generated', 'implemented', 'improved',
  'increased', 'launched', 'led', 'managed', 'optimized', 'organized', 'reduced',
  'resolved', 'streamlined', 'supervised', 'transformed', 'collaborated', 'coordinated',
  'facilitated', 'mentored', 'negotiated', 'pioneered', 'spearheaded', 'accelerated',
  'automated', 'consolidated', 'eliminated', 'exceeded', 'innovated', 'maximized',
  'modernized', 'restructured', 'revitalized', 'scaled', 'standardized'
];

// Common keywords by industry/role
const commonKeywords = [
  'leadership', 'teamwork', 'project management', 'communication', 'problem solving',
  'analytical', 'strategic', 'customer service', 'sales', 'marketing', 'data analysis',
  'software development', 'agile', 'scrum', 'javascript', 'python', 'react', 'node.js',
  'sql', 'aws', 'cloud computing', 'machine learning', 'artificial intelligence',
  'digital marketing', 'social media', 'content creation', 'seo', 'budgeting',
  'financial analysis', 'operations', 'supply chain', 'quality assurance', 'compliance'
];

// Check for grammar issues (simplified)
function checkGrammar(text: string): number {
  if (!text) return 0;
  
  let score = 100;
  const issues = [];
  
  // Check for common grammar issues
  if (text.includes('there job') || text.includes('there company')) {
    score -= 10;
    issues.push('Incorrect use of "there" instead of "their"');
  }
  
  if (text.includes('its\'') && text.includes('it\'s') === false) {
    score -= 5;
    issues.push('Possible incorrect apostrophe usage');
  }
  
  // Check for sentence structure
  const sentences = text.split(/[.!?]+/);
  const shortSentences = sentences.filter(s => s.trim().length > 0 && s.trim().length < 10);
  if (shortSentences.length > sentences.length * 0.3) {
    score -= 10;
    issues.push('Too many short, choppy sentences');
  }
  
  // Check for repetitive words
  const words = text.toLowerCase().split(/\s+/);
  const wordCount = {};
  words.forEach(word => {
    if (word.length > 3) {
      wordCount[word] = (wordCount[word] || 0) + 1;
    }
  });
  
  const repetitiveWords = Object.entries(wordCount).filter(([_, count]) => (count as number) > 3);
  if (repetitiveWords.length > 0) {
    score -= repetitiveWords.length * 5;
    issues.push('Repetitive word usage');
  }
  
  return Math.max(0, score);
}

// Count action words in text
function countActionWords(text: string): number {
  if (!text) return 0;
  
  const words = text.toLowerCase().split(/\s+/);
  return actionWords.filter(action => 
    words.some(word => word.includes(action))
  ).length;
}

// Count relevant keywords
function countKeywords(text: string): number {
  if (!text) return 0;
  
  const lowerText = text.toLowerCase();
  return commonKeywords.filter(keyword => 
    lowerText.includes(keyword.toLowerCase())
  ).length;
}

// Calculate completeness score
function calculateCompleteness(data: ResumeData): number {
  let score = 0;
  const maxScore = 100;
  
  // Personal info (30 points)
  const personalInfo = data.personalInfo;
  if (personalInfo.firstName && personalInfo.lastName) score += 5;
  if (personalInfo.email) score += 5;
  if (personalInfo.phone) score += 5;
  if (personalInfo.location) score += 5;
  if (personalInfo.summary && personalInfo.summary.length > 50) score += 10;
  
  // Experience (30 points)
  if (data.experience.length > 0) score += 10;
  if (data.experience.length >= 2) score += 5;
  if (data.experience.some(exp => exp.description.length > 0)) score += 10;
  if (data.experience.some(exp => exp.description.join(' ').length > 100)) score += 5;
  
  // Education (20 points)
  if (data.education.length > 0) score += 15;
  if (data.education.some(edu => edu.achievements && edu.achievements.length > 0)) score += 5;
  
  // Skills (10 points)
  if (data.skills.length >= 3) score += 5;
  if (data.skills.length >= 6) score += 5;
  
  // Additional sections (10 points)
  if (data.projects.length > 0) score += 3;
  if (data.certifications.length > 0) score += 3;
  if (data.languages.length > 0) score += 2;
  if (personalInfo.linkedin || personalInfo.github || personalInfo.website) score += 2;
  
  return Math.min(score, maxScore);
}

// Generate AI feedback
export function generateResumeScore(data: ResumeData): ResumeScore {
  const allText = [
    data.personalInfo.summary,
    ...data.experience.flatMap(exp => exp.description),
    ...data.education.flatMap(edu => edu.achievements || []),
    ...data.projects.map(proj => proj.description)
  ].join(' ');

  const completeness = calculateCompleteness(data);
  const grammar = checkGrammar(allText);
  const actionWordCount = countActionWords(allText);
  const keywordCount = countKeywords(allText);
  
  // Calculate scores
  const actionWordsScore = Math.min(100, (actionWordCount / 5) * 100);
  const keywordsScore = Math.min(100, (keywordCount / 8) * 100);
  const formatting = data.experience.length > 0 && data.education.length > 0 ? 85 : 70;
  
  const overall = Math.round((completeness * 0.3 + grammar * 0.2 + actionWordsScore * 0.2 + keywordsScore * 0.2 + formatting * 0.1));
  
  // Generate feedback
  const strengths = [];
  const improvements = [];
  const missing = [];
  
  if (completeness >= 80) strengths.push('Resume has comprehensive information');
  if (grammar >= 85) strengths.push('Good grammar and writing quality');
  if (actionWordCount >= 3) strengths.push('Good use of action words');
  if (keywordCount >= 5) strengths.push('Contains relevant industry keywords');
  
  if (completeness < 70) improvements.push('Add more details to incomplete sections');
  if (grammar < 80) improvements.push('Review grammar and sentence structure');
  if (actionWordCount < 3) improvements.push('Use more strong action words in descriptions');
  if (keywordCount < 5) improvements.push('Include more relevant industry keywords');
  
  if (!data.personalInfo.summary) missing.push('Professional summary');
  if (data.experience.length === 0) missing.push('Work experience');
  if (data.skills.length < 3) missing.push('Technical skills');
  if (data.education.length === 0) missing.push('Education information');
  if (!data.personalInfo.linkedin && !data.personalInfo.github) missing.push('Professional profiles (LinkedIn/GitHub)');
  
  return {
    overall,
    completeness,
    grammar,
    keywords: keywordsScore,
    actionWords: actionWordsScore,
    formatting,
    feedback: {
      strengths,
      improvements,
      missing
    }
  };
}