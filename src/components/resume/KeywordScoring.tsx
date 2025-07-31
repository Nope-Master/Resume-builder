import React, { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, Target, AlertCircle, CheckCircle } from 'lucide-react';

// Industry-specific keywords database
const industryKeywords = {
  'Technology': [
    'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'Kubernetes',
    'Machine Learning', 'AI', 'Data Science', 'SQL', 'MongoDB', 'Git', 'CI/CD', 'Agile',
    'Scrum', 'API', 'Microservices', 'Cloud Computing', 'DevOps', 'Full-stack'
  ],
  'Marketing': [
    'Digital Marketing', 'SEO', 'SEM', 'Social Media', 'Content Marketing', 'Email Marketing',
    'Google Analytics', 'A/B Testing', 'Lead Generation', 'Campaign Management', 'CRM',
    'Brand Strategy', 'Market Research', 'Conversion Optimization', 'PPC', 'ROI'
  ],
  'Finance': [
    'Financial Analysis', 'Excel', 'Financial Modeling', 'Budgeting', 'Forecasting',
    'Risk Management', 'Compliance', 'Audit', 'Investment Analysis', 'Portfolio Management',
    'Accounting', 'GAAP', 'Financial Reporting', 'Valuation', 'Treasury', 'Tax'
  ],
  'Healthcare': [
    'Patient Care', 'Clinical Research', 'HIPAA', 'EMR', 'Healthcare Administration',
    'Medical Coding', 'Quality Assurance', 'Regulatory Compliance', 'Evidence-based Practice',
    'Interdisciplinary', 'Patient Safety', 'Healthcare Analytics', 'Telemedicine'
  ],
  'Sales': [
    'Lead Generation', 'Account Management', 'Client Relations', 'Sales Pipeline',
    'CRM', 'Negotiation', 'Territory Management', 'Revenue Growth', 'Quota Achievement',
    'Prospecting', 'Closing', 'Customer Acquisition', 'Upselling', 'Cross-selling'
  ]
};

// Essential soft skills
const softSkills = [
  'Leadership', 'Communication', 'Problem Solving', 'Teamwork', 'Adaptability',
  'Time Management', 'Critical Thinking', 'Project Management', 'Collaboration',
  'Innovation', 'Analytical', 'Strategic Planning', 'Decision Making', 'Mentoring'
];

interface KeywordAnalysis {
  score: number;
  foundKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
  density: number;
}

export const KeywordScoring: React.FC = () => {
  const { resumeData } = useResume();
  const [selectedIndustry, setSelectedIndustry] = useState<string>('Technology');
  const [customKeywords, setCustomKeywords] = useState<string>('');

  const analyzeKeywords = (): KeywordAnalysis => {
    const allText = [
      resumeData.personalInfo.summary,
      ...resumeData.experience.flatMap(exp => exp.description),
      ...resumeData.education.flatMap(edu => edu.achievements || []),
      ...resumeData.projects.map(proj => proj.description),
      ...resumeData.skills.map(skill => skill.name),
      ...resumeData.certifications.map(cert => cert.name)
    ].join(' ').toLowerCase();

    const totalWords = allText.split(/\s+/).length;
    
    // Get relevant keywords
    const industryKeys = industryKeywords[selectedIndustry as keyof typeof industryKeywords] || [];
    const customKeys = customKeywords.split(',').map(k => k.trim()).filter(k => k);
    const allKeywords = [...industryKeys, ...softSkills, ...customKeys];

    // Find matching keywords
    const foundKeywords: string[] = [];
    const keywordCount = new Map<string, number>();

    allKeywords.forEach(keyword => {
      if (allText.includes(keyword.toLowerCase())) {
        foundKeywords.push(keyword);
        const matches = (allText.match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
        keywordCount.set(keyword, matches);
      }
    });

    const missingKeywords = allKeywords.filter(k => !foundKeywords.includes(k));
    const score = Math.min(100, (foundKeywords.length / allKeywords.length) * 100);
    const density = (Array.from(keywordCount.values()).reduce((a, b) => a + b, 0) / totalWords) * 100;

    // Generate suggestions
    const suggestions: string[] = [];
    if (score < 30) {
      suggestions.push('Add more industry-specific keywords to your experience descriptions');
      suggestions.push('Include relevant technical skills in your skills section');
    }
    if (score < 50) {
      suggestions.push('Incorporate action words that demonstrate your achievements');
      suggestions.push('Add certifications relevant to your industry');
    }
    if (density < 2) {
      suggestions.push('Increase keyword density by mentioning key terms more frequently');
    }
    if (density > 8) {
      suggestions.push('Reduce keyword stuffing - maintain natural language flow');
    }

    return {
      score: Math.round(score),
      foundKeywords,
      missingKeywords,
      suggestions,
      density: Math.round(density * 100) / 100
    };
  };

  const analysis = analyzeKeywords();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 70) return CheckCircle;
    if (score >= 40) return Target;
    return AlertCircle;
  };

  const ScoreIcon = getScoreIcon(analysis.score);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-form border-0 shadow-glass backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Keyword Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Industry Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">Target Industry</label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full p-2 border rounded-md bg-card text-foreground border-border"
            >
              {Object.keys(industryKeywords).map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>

          {/* Custom Keywords */}
          <div>
            <label className="text-sm font-medium mb-2 block">Additional Keywords (comma-separated)</label>
            <Input
              value={customKeywords}
              onChange={(e) => setCustomKeywords(e.target.value)}
              placeholder="e.g., Figma, Adobe Creative Suite, Project Management"
            />
          </div>
        </CardContent>
      </Card>

      {/* Score Overview */}
      <Card className="bg-gradient-form border-0 shadow-glass backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Keyword Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <ScoreIcon className={`h-8 w-8 ${getScoreColor(analysis.score)}`} />
            <div>
              <div className={`text-3xl font-bold ${getScoreColor(analysis.score)}`}>
                {analysis.score}%
              </div>
              <p className="text-sm text-muted-foreground">Keyword Match Score</p>
            </div>
          </div>
          
          <Progress value={analysis.score} className="mb-4" />
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Keywords Found</p>
              <p className="text-2xl font-bold text-green-600">{analysis.foundKeywords.length}</p>
            </div>
            <div>
              <p className="font-medium">Keyword Density</p>
              <p className="text-2xl font-bold text-blue-600">{analysis.density}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Found Keywords */}
      {analysis.foundKeywords.length > 0 && (
        <Card className="bg-gradient-form border-0 shadow-glass backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Found Keywords ({analysis.foundKeywords.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analysis.foundKeywords.map((keyword, index) => (
                <Badge key={index} variant="default" className="bg-green-100 text-green-800">
                  {keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Missing Keywords */}
      {analysis.missingKeywords.length > 0 && (
        <Card className="bg-gradient-form border-0 shadow-glass backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              Suggested Keywords ({analysis.missingKeywords.slice(0, 20).length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Consider adding these relevant keywords to improve your score:
            </p>
            <div className="flex flex-wrap gap-2">
              {analysis.missingKeywords.slice(0, 20).map((keyword, index) => (
                <Badge key={index} variant="outline" className="text-orange-700 border-orange-300">
                  {keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Suggestions */}
      {analysis.suggestions.length > 0 && (
        <Card className="bg-gradient-form border-0 shadow-glass backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Improvement Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  {suggestion}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};