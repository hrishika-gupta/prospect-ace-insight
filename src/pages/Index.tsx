
import React, { useState } from 'react';
import { ResearchForm } from '@/components/ResearchForm';
import { ResearchResults } from '@/components/ResearchResults';
import { ApiKeyInput } from '@/components/ApiKeyInput';
import { GeminiResearchService } from '@/services/geminiService';
import { Briefcase, Zap, Target } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-blue-600 p-3 rounded-lg w-fit mx-auto mb-4">
              <Briefcase className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">BDR Research Tool</h1>
            <p className="text-gray-600">Strategic intelligence powered by AI</p>
          </div>
          <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BDR Research Tool</h1>
                <p className="text-sm text-gray-500">Strategic intelligence in seconds</p>
              </div>
            </div>
            <button
              onClick={() => {
                setApiKey(null);
                localStorage.removeItem('gemini_api_key');
                setResults(null);
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Change API Key
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        {!results && (
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Strategic Account Intelligence
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Generate deep, actionable insights that make you sound like you've studied 
              the company for hours, powered by advanced AI analysis.
            </p>
            
            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <Zap className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Analysis</h3>
                <p className="text-sm text-gray-600">Advanced prompting with Gemini 2.0</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <Target className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Strategic Insights</h3>
                <p className="text-sm text-gray-600">Business intelligence beyond surface facts</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <Briefcase className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Ready-to-Send</h3>
                <p className="text-sm text-gray-600">Personalized outreach templates</p>
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
