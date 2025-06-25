
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, Eye, EyeOff, ExternalLink } from 'lucide-react';

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

export const ApiKeyInput = ({ onApiKeySubmit }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim());
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center justify-center gap-2">
          <Key className="h-5 w-5 text-blue-600" />
          API Configuration
        </CardTitle>
        <p className="text-sm text-gray-600">
          Enter your Google Gemini API key to unlock AI-powered research
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey" className="text-sm font-medium text-gray-700">
              Gemini API Key
            </Label>
            <div className="relative">
              <Input
                id="apiKey"
                type={showKey ? 'text' : 'password'}
                placeholder="AIza..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700 mb-2">
              <strong>Need an API key?</strong>
            </p>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
            >
              Get your free Gemini API key
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <Button
            type="submit"
            disabled={!apiKey.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Start Research Tool
          </Button>
        </form>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">
            <strong>Security:</strong> Your API key is stored locally and never saved on our servers.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
