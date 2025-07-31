import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useResume } from '@/contexts/ResumeContext';
import { generateResumeScore } from '@/utils/aiScoring';
import { ArrowLeft, Target, CheckCircle, AlertTriangle, XCircle, TrendingUp, Edit, Lightbulb } from 'lucide-react';

const ResumeScore: React.FC = () => {
  const navigate = useNavigate();
  const { resumeData } = useResume();
  const score = generateResumeScore(resumeData);

  const getScoreColor = (value: number) => {
    if (value >= 85) return 'score-excellent';
    if (value >= 70) return 'score-good';
    if (value >= 50) return 'score-fair';
    return 'score-poor';
  };

  const getScoreIcon = (value: number) => {
    if (value >= 85) return <CheckCircle className="h-4 w-4" />;
    if (value >= 70) return <TrendingUp className="h-4 w-4" />;
    if (value >= 50) return <AlertTriangle className="h-4 w-4" />;
    return <XCircle className="h-4 w-4" />;
  };

  const getScoreLabel = (value: number) => {
    if (value >= 85) return 'Excellent';
    if (value >= 70) return 'Good';
    if (value >= 50) return 'Fair';
    return 'Needs Work';
  };

  const scoreMetrics = [
    { label: 'Completeness', value: score.completeness, max: 40 },
    { label: 'Keywords', value: score.keywords, max: 30 },
    { label: 'Formatting', value: score.formatting, max: 20 },
    { label: 'Experience', value: Math.min(100, (resumeData.experience.length * 40)), max: 10 }
  ];

  const keywordSuggestions = {
    actionVerbs: ['achieved', 'managed', 'led', 'implemented', 'improved', 'coordinated', 'negotiated', 'increased'],
    technicalSkills: ['java/spring', 'python', 'react', 'node.js', 'php', 'sql', 'docker', 'git'],
    softSkills: ['interpersonal', 'communication', 'teamwork', 'leadership', 'problem-solving', 'analytical']
  };

  return (
    <div className="min-h-screen relative">
      {/* Content overlay to ensure readability */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/resume-builder')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Resume
          </Button>
          
          <Button
            onClick={() => navigate('/resume-builder')}
            className="flex items-center gap-2 aurora-glow"
          >
            <Edit className="h-4 w-4" />
            Improve Your Resume Now →
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            Score and Feedback
          </h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive scoring and personalized feedback for your resume
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Overall Score */}
          <Card className="glass-card aurora-glow">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold flex items-center justify-center gap-2 text-foreground">
                <Target className="h-6 w-6 text-primary" />
                Overall Resume Score
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <div className="text-6xl font-bold text-primary mb-3 flex items-center justify-center gap-3">
                  <TrendingUp className="h-12 w-12" />
                  {score.overall}%
                </div>
                <Badge 
                  variant="secondary" 
                  className={`bg-${getScoreColor(score.overall)}/10 text-${getScoreColor(score.overall)} border-${getScoreColor(score.overall)}/20 text-lg px-4 py-2`}
                >
                  {getScoreIcon(score.overall)}
                  {getScoreLabel(score.overall)}
                </Badge>
              </div>
              <Progress 
                value={score.overall} 
                className="h-4 mb-4"
              />
              <p className="text-muted-foreground">
                Your resume is performing {getScoreLabel(score.overall).toLowerCase()}. Keep improving to reach the next level!
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Score Breakdown */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Score Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {scoreMetrics.map((metric) => (
                  <div key={metric.label} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{metric.label}</span>
                      <span className="text-primary font-semibold">
                        {Math.round((metric.value / 100) * metric.max)}/{metric.max}
                      </span>
                    </div>
                    <Progress value={metric.value} className="h-3" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Improvement Suggestions */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-foreground">
                  <Lightbulb className="h-5 w-5 text-accent" />
                  Improvement Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    Add more action verbs like "achieved", "managed", "led"
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    Include quantified achievements with numbers and percentages
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    Add more relevant technical keywords for your industry
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    Expand your experience descriptions with specific accomplishments
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Keywords Guide */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Keywords Guide</CardTitle>
              <p className="text-sm text-muted-foreground">
                Use these keywords to improve your resume's impact and ATS compatibility
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Action Verbs</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Strong action verbs make your accomplishments stand out
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {keywordSuggestions.actionVerbs.map(word => (
                      <Badge key={word} variant="secondary" className="text-xs">
                        {word}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Technical Skills</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Industry-specific technical keywords relevant to your field
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {keywordSuggestions.technicalSkills.map(word => (
                      <Badge key={word} variant="secondary" className="text-xs">
                        {word}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Soft Skills</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Interpersonal and professional skills that employers value
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {keywordSuggestions.softSkills.map(word => (
                      <Badge key={word} variant="secondary" className="text-xs">
                        {word}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumeScore;