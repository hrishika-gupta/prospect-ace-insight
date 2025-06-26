
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Copy, 
  Building2, 
  TrendingUp, 
  Code2, 
  Users, 
  AlertTriangle, 
  Target, 
  Mail,
  MessageSquare,
  RotateCcw,
  Sparkles
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
      title: "🏢 Company Overview",
      content: results.companySummary,
      icon: Building2,
      gradient: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "📈 Recent Events & Triggers",
      content: results.recentUpdates,
      icon: TrendingUp,
      gradient: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200"
    },
    {
      title: "⚙️ Tech Stack Analysis",
      content: results.techStack,
      icon: Code2,
      gradient: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      title: "🧑‍💼 Hiring Focus",
      content: results.hiringFocus,
      icon: Users,
      gradient: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200"
    },
    {
      title: "🚨 Pain Point Hypotheses",
      content: results.painPoints,
      icon: AlertTriangle,
      gradient: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200"
    },
    {
      title: "🎯 Whatfix Opportunity",
      content: results.whatfixInsight,
      icon: Target,
      gradient: "from-rose-500 to-rose-600",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200"
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 px-4">
      {/* Enhanced Header */}
      <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-2xl border border-slate-700">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl"></div>
        <div className="relative flex items-center justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <Sparkles className="h-8 w-8 text-blue-300" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Strategic Intelligence Complete
                </h1>
                <p className="text-slate-300 text-lg">Your comprehensive deal research is ready</p>
              </div>
            </div>
          </div>
          <Button
            onClick={onNewResearch}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm px-6 py-3"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            New Research
          </Button>
        </div>
      </div>

      {/* Research Intelligence Grid */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-800">Strategic Analysis</h2>
          <p className="text-slate-600">Deep intelligence for executive-level outreach</p>
          <Separator className="w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded" />
        </div>
        
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <Card key={index} className={`group hover:shadow-xl transition-all duration-300 border-2 ${section.borderColor} ${section.bgColor}/30 backdrop-blur-sm`}>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center gap-3">
                  <div className={`p-3 bg-gradient-to-br ${section.gradient} rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <section.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-bold text-slate-800">{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-slate-200/60">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{section.content}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200"
                  onClick={() => copyToClipboard(section.content, section.title)}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Section
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Enhanced Outreach Templates */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-800">Ready-to-Send Outreach</h2>
          <p className="text-slate-600">Personalized templates for immediate deployment</p>
          <Separator className="w-24 mx-auto bg-gradient-to-r from-emerald-500 to-blue-500 h-1 rounded" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Enhanced Email Template */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Mail className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <span className="font-bold text-slate-800">📧 Email Template</span>
                  <Badge variant="secondary" className="ml-3 bg-blue-100 text-blue-700 border-blue-300">
                    Executive Ready
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border-2 border-blue-200/50 shadow-inner">
                <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                  {results.emailTemplate}
                </pre>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => copyToClipboard(results.emailTemplate, "Email template")}
              >
                <Copy className="h-5 w-5 mr-2" />
                Copy Email Template
              </Button>
            </CardContent>
          </Card>

          {/* Enhanced LinkedIn Template */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <span className="font-bold text-slate-800">💼 LinkedIn DM</span>
                  <Badge variant="secondary" className="ml-3 bg-emerald-100 text-emerald-700 border-emerald-300">
                    Social Ready
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border-2 border-emerald-200/50 shadow-inner">
                <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                  {results.linkedinTemplate}
                </pre>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => copyToClipboard(results.linkedinTemplate, "LinkedIn template")}
              >
                <Copy className="h-5 w-5 mr-2" />
                Copy LinkedIn Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
