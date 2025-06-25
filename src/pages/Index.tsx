
import React, { useState } from 'react';
import { ResearchForm } from '@/components/ResearchForm';
import { ResearchResults } from '@/components/ResearchResults';
import { Briefcase, Zap, Target } from 'lucide-react';

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
  const [isResearching, setIsResearching] = useState(false);
  const [results, setResults] = useState<ResearchResults | null>(null);

  const handleResearch = async (data: ResearchData) => {
    setIsResearching(true);
    setResults(null);
    
    try {
      // TODO: Implement Gemini API call
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock results for demonstration
      const mockResults: ResearchResults = {
        companySummary: "This company appears to be a growing tech startup in the SaaS space, focusing on digital transformation solutions for enterprise clients.",
        recentUpdates: "Recently announced Series B funding and expanded their engineering team by 40%. Launched new AI-powered features last quarter.",
        techStack: "Likely using React, Node.js, AWS infrastructure, and modern DevOps practices. Heavy focus on cloud-native technologies.",
        hiringFocus: "Actively hiring for engineering roles, particularly senior developers and DevOps engineers. Also expanding sales and customer success teams.",
        painPoints: "May be struggling with rapid scaling, user onboarding complexity, and maintaining product quality during fast growth.",
        whatfixInsight: "Whatfix could help streamline their user onboarding process and reduce support tickets by providing in-app guidance for their complex SaaS platform.",
        emailTemplate: "Hi [Name],\n\nI noticed [Company] recently secured Series B funding - congratulations! With your rapid growth and focus on user experience, I thought you might be interested in how Whatfix is helping similar SaaS companies reduce onboarding friction by 60%.\n\nWould you be open to a brief chat about how we're helping companies like yours scale their user adoption?\n\nBest regards,\n[Your name]",
        linkedinTemplate: "Congrats on the Series B! 🎉 Saw your team is scaling fast - we're helping similar SaaS companies reduce user onboarding time by 60% with in-app guidance. Worth a quick chat? 🚀"
      };
      
      setResults(mockResults);
    } catch (error) {
      console.error('Research failed:', error);
    } finally {
      setIsResearching(false);
    }
  };

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
                <p className="text-sm text-gray-500">Company intelligence in seconds</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        {!results && (
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Supercharge Your Sales Research
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Get comprehensive company insights, pain points, and personalized outreach messages 
              in seconds using AI-powered research.
            </p>
            
            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <Zap className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                <p className="text-sm text-gray-600">Complete research in under 30 seconds</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <Target className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Actionable Insights</h3>
                <p className="text-sm text-gray-600">Get specific pain points and solutions</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <Briefcase className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Ready-to-Send</h3>
                <p className="text-sm text-gray-600">Copy-paste outreach templates</p>
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
