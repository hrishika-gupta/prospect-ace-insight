
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Copy, 
  Building2, 
  TrendingUp, 
  Code, 
  Users, 
  AlertTriangle, 
  Lightbulb, 
  Mail,
  MessageSquare,
  RotateCcw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { ResearchResults as ResearchResultsType } from '@/pages/Index';

interface ResearchResultsProps {
  results: ResearchResultsType;
  onNewResearch: () => void;
}

export const ResearchResults = ({ results, onNewResearch }: ResearchResultsProps) => {
  const { toast } = useToast();

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard`,
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const sections = [
    {
      title: "Company Summary",
      content: results.companySummary,
      icon: Building2,
      color: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
      title: "Recent Updates",
      content: results.recentUpdates,
      icon: TrendingUp,
      color: "bg-green-50 text-green-700 border-green-200"
    },
    {
      title: "Tech Stack Analysis",
      content: results.techStack,
      icon: Code,
      color: "bg-purple-50 text-purple-700 border-purple-200"
    },
    {
      title: "Hiring Focus",
      content: results.hiringFocus,
      icon: Users,
      color: "bg-indigo-50 text-indigo-700 border-indigo-200"
    },
    {
      title: "Likely Pain Points",
      content: results.painPoints,
      icon: AlertTriangle,
      color: "bg-red-50 text-red-700 border-red-200"
    },
    {
      title: "Whatfix Opportunity",
      content: results.whatfixInsight,
      icon: Lightbulb,
      color: "bg-yellow-50 text-yellow-700 border-yellow-200"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm border">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Research Complete!</h2>
          <p className="text-gray-600">Your comprehensive company intelligence report is ready</p>
        </div>
        <Button
          onClick={onNewResearch}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          New Research
        </Button>
      </div>

      {/* Research Insights Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <Card key={index} className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className={`p-2 rounded-lg ${section.color}`}>
                  <section.icon className="h-5 w-5" />
                </div>
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm leading-relaxed">{section.content}</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-3 h-8 text-xs"
                onClick={() => copyToClipboard(section.content, section.title)}
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Outreach Templates */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Email Template */}
        <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-700 border-blue-200">
                <Mail className="h-5 w-5" />
              </div>
              Email Template
              <Badge variant="secondary" className="ml-auto">Ready to Send</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                {results.emailTemplate}
              </pre>
            </div>
            <Button
              className="mt-4 w-full"
              onClick={() => copyToClipboard(results.emailTemplate, "Email template")}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Email Template
            </Button>
          </CardContent>
        </Card>

        {/* LinkedIn Template */}
        <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-700 border-blue-200">
                <MessageSquare className="h-5 w-5" />
              </div>
              LinkedIn DM
              <Badge variant="secondary" className="ml-auto">Ready to Send</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                {results.linkedinTemplate}
              </pre>
            </div>
            <Button
              className="mt-4 w-full"
              onClick={() => copyToClipboard(results.linkedinTemplate, "LinkedIn template")}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy LinkedIn Message
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
