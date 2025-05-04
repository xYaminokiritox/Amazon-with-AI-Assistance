import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Image, Upload, X } from 'lucide-react';
import { geminiChat } from '../services/aiAnalysisService';

const VisualSearch = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<string | null>(null);
  const [imageDescription, setImageDescription] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        // Ask user to describe the image
        setImageDescription('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = async () => {
    if (!image || !imageDescription.trim()) {
      setError('Please describe the image to help us find similar products');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const prompt = `You are a shopping expert. Based on this image description: "${imageDescription}", suggest similar products that would be available in an online marketplace. Focus on specific product categories, brands, and features. Be precise and avoid markdown formatting. Format your response as a list of specific product recommendations with brief descriptions.`;
      
      const aiReply = await geminiChat(prompt);
      setResults(aiReply);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze image');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setImage(null);
    setImageDescription('');
    setResults(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader className="p-3">
        <CardTitle className="text-sm text-black">Visual Search</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
            {image ? (
              <div className="relative">
                <img 
                  src={image} 
                  alt="Uploaded" 
                  className="max-h-48 rounded-lg"
                />
                <button
                  onClick={handleClear}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <Image className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">Upload an image to find similar products</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  ref={fileInputRef}
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-amazon-primary hover:bg-amazon-yellow text-white hover:text-black"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Image
                </Button>
              </>
            )}
          </div>

          {image && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Describe the image to help us find similar products:
              </label>
              <textarea
                value={imageDescription}
                onChange={(e) => setImageDescription(e.target.value)}
                placeholder="e.g., A red leather handbag with gold hardware, medium size..."
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-amazon-primary focus:border-transparent"
                rows={3}
              />
            </div>
          )}

          {image && imageDescription.trim() && (
            <Button
              onClick={handleSearch}
              disabled={loading}
              className="w-full bg-amazon-primary hover:bg-amazon-yellow text-white hover:text-black"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                'Find Similar Products'
              )}
            </Button>
          )}

          {error && (
            <div className="text-red-500 p-2 bg-red-50 rounded-md text-xs">
              <p className="font-medium">Error:</p>
              <p>{error}</p>
            </div>
          )}

          {results && (
            <div className="p-3 bg-blue-50 rounded text-xs text-blue-900 whitespace-pre-line border border-blue-100">
              <div className="font-bold mb-2">Similar Products Found:</div>
              {results}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VisualSearch; 