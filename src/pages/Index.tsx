
import React, { useState } from 'react';
import { ResearchForm } from '@/components/ResearchForm';
import { ResearchResults } from '@/components/ResearchResults';
import { ApiKeyInput } from '@/components/ApiKeyInput';
import { GeminiResearchService } from '@/services/geminiService';
import { Zap, Target, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface ResearchData {
  companyName: string;
  website: string;
  linkedinData?: string;
}

export interface ResearchResults {
  companySummary: string;
  recentUpdates: string;
  techStack: string;
  hiringFocus: string;
  painPoints: string;
  whatfixInsight: string;
  emailTemplate: string;
  linkedinTemplate: string;
}

const Index = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isResearching, setIsResearching] = useState(false);
  const [results, setResults] = useState<ResearchResults | null>(null);
  const { toast } = useToast();

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
    toast({
      title: "API Key Configured",
      description: "You can now generate AI-powered research reports",
    });
  };

  const handleResearch = async (data: ResearchData) => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please configure your Gemini API key first",
        variant: "destructive",
      });
      return;
    }

    setIsResearching(true);
    setResults(null);
    
    try {
      const researchService = new GeminiResearchService(apiKey);
      const researchResults = await researchService.generateResearch(data);
      setResults(researchResults);
      
      toast({
        title: "Research Complete!",
        description: "Your strategic intelligence report is ready",
      });
    } catch (error) {
      console.error('Research failed:', error);
      toast({
        title: "Research Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsResearching(false);
    }
  };

  // Check for saved API key on mount
  React.useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  if (!apiKey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-4 rounded-2xl w-fit mx-auto mb-6 shadow-xl">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent mb-3">
              Deal Intel
            </h1>
            <p className="text-xl text-slate-600 font-medium">Your edge in every outreach.</p>
          </div>
          <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-3 rounded-xl shadow-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent">
                  Deal Intel
                </h1>
                <p className="text-sm text-slate-600 font-medium">Your edge in every outreach.</p>
              </div>
            </div>
            <button
              onClick={() => {
                setApiKey(null);
                localStorage.removeItem('gemini_api_key');
                setResults(null);
              }}
              className="text-sm text-slate-500 hover:text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Change API Key
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Enhanced Hero Section */}
        {!results && (
          <div className="text-center mb-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-6">
                Strategic Account Intelligence
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-12 max-w-3xl mx-auto">
                Generate deep, actionable insights that make you sound like you've studied 
                the company for hours. Powered by advanced AI analysis for executive-level personalization.
              </p>
              
              {/* Enhanced Features */}
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
                <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-3 text-lg">AI-Powered Analysis</h3>
                  <p className="text-slate-600">Advanced prompting with Gemini 2.0 for McKinsey-quality insights</p>
                </div>
                <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-3 text-lg">Strategic Intelligence</h3>
                  <p className="text-slate-600">Business intelligence beyond surface facts with quantified insights</p>
                </div>
                <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-3 text-lg">Executive-Ready Templates</h3>
                  <p className="text-slate-600">Personalized outreach templates for C-level engagement</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Research Form */}
        {!results && (
          <div className="max-w-2xl mx-auto">
            <ResearchForm onSubmit={handleResearch} isLoading={isResearching} />
          </div>
        )}

        {/* Results */}
        {results && (
          <ResearchResults 
            results={results} 
            onNewResearch={() => setResults(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default Index;
