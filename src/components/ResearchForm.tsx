
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Search } from 'lucide-react';
import type { ResearchData } from '@/pages/Index';

interface ResearchFormProps {
  onSubmit: (data: ResearchData) => void;
  isLoading: boolean;
}

export const ResearchForm = ({ onSubmit, isLoading }: ResearchFormProps) => {
  const [formData, setFormData] = useState<ResearchData>({
    companyName: '',
    website: '',
    linkedinData: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.companyName && formData.website) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof ResearchData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
          <Search className="h-6 w-6 text-blue-600" />
          Company Research
        </CardTitle>
        <p className="text-gray-600 mt-2">
          Enter company details to generate comprehensive sales intelligence
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
              Company Name *
            </Label>
            <Input
              id="companyName"
              type="text"
              placeholder="e.g., Slack, HubSpot, Notion"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="text-sm font-medium text-gray-700">
              Company Website *
            </Label>
            <Input
              id="website"
              type="url"
              placeholder="https://company.com"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedinData" className="text-sm font-medium text-gray-700">
              LinkedIn Post/Update (Optional)
            </Label>
            <Textarea
              id="linkedinData"
              placeholder="Paste recent LinkedIn posts, company updates, or announcements here for additional context..."
              value={formData.linkedinData}
              onChange={(e) => handleInputChange('linkedinData', e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <p className="text-xs text-gray-500">
              Adding recent posts helps generate more timely and relevant insights
            </p>
          </div>

          <Button
            type="submit"
            disabled={!formData.companyName || !formData.website || isLoading}
            className="w-full h-12 text-base font-medium bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Researching Company...
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                Generate Research Report
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
