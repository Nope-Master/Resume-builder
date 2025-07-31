import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useResume } from '@/contexts/ResumeContext';
import { generateResumeScore } from '@/utils/aiScoring';
import { KeywordScoring } from './KeywordScoring';
import { Target, CheckCircle, AlertCircle, XCircle, TrendingUp, Search } from 'lucide-react';

export const ResumeScore: React.FC = () => {
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
    if (value >= 50) return <AlertCircle className="h-4 w-4" />;
    return <XCircle className="h-4 w-4" />;
  };

  const getScoreLabel = (value: number) => {
    if (value >= 85) return 'Excellent';
    if (value >= 70) return 'Good';
    if (value >= 50) return 'Fair';
    return 'Needs Work';
  };

  const scoreMetrics = [
    { label: 'Completeness', value: score.completeness, description: 'How complete your resume is' },
    { label: 'Grammar', value: score.grammar, description: 'Writing quality and grammar' },
    { label: 'Keywords', value: score.keywords, description: 'Industry-relevant keywords' },
    { label: 'Action Words', value: score.actionWords, description: 'Strong action verbs usage' },
    { label: 'Formatting', value: score.formatting, description: 'Professional structure' }
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="ai-score" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ai-score" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analysis
          </TabsTrigger>
          <TabsTrigger value="keyword-score" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Keywords
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="ai-score" className="space-y-6">
          {/* Overall Score */}
          <Card className="bg-gradient-form border-0 shadow-glass backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold flex items-center justify-center gap-2">
            <Target className="h-5 w-5" />
            Resume Score
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-4">
            <div className={`text-6xl font-bold text-${getScoreColor(score.overall)} mb-2`}>
              {score.overall}
            </div>
            <Badge 
              variant="secondary" 
              className={`bg-${getScoreColor(score.overall)}/10 text-${getScoreColor(score.overall)} border-${getScoreColor(score.overall)}/20`}
            >
              {getScoreIcon(score.overall)}
              {getScoreLabel(score.overall)}
            </Badge>
          </div>
          <Progress 
            value={score.overall} 
            className="h-3 mb-4"
          />
          <p className="text-sm text-muted-foreground">
            Your resume is {getScoreLabel(score.overall).toLowerCase()}. 
            {score.overall < 85 && ' Keep improving to increase your chances!'}
          </p>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="text-lg">Detailed Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {scoreMetrics.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{metric.label}</span>
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold text-${getScoreColor(metric.value)}`}>
                    {metric.value}%
                  </span>
                  <div className={`text-${getScoreColor(metric.value)}`}>
                    {getScoreIcon(metric.value)}
                  </div>
                </div>
              </div>
              <Progress value={metric.value} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Strengths */}
        {score.feedback.strengths.length > 0 && (
          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-score-excellent flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm">
                {score.feedback.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-score-excellent mt-0.5">•</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Improvements */}
        {score.feedback.improvements.length > 0 && (
          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-score-fair flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Improvements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm">
                {score.feedback.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-score-fair mt-0.5">•</span>
                    {improvement}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Missing */}
        {score.feedback.missing.length > 0 && (
          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-score-poor flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                Missing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm">
                {score.feedback.missing.map((missing, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-score-poor mt-0.5">•</span>
                    {missing}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
        </TabsContent>
        
        <TabsContent value="keyword-score">
          <KeywordScoring />
        </TabsContent>
      </Tabs>
    </div>
  );
};