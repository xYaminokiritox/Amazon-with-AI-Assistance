import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { geminiChat } from '../services/aiAnalysisService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, MessageSquare, X, Send } from 'lucide-react';

const ShoppingAssistant = () => {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'Hi! I\'m your shopping assistant. I can help you with product recommendations, price comparisons, and shopping advice. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    // Generate personalized suggestions based on cart contents
    if (cart.length > 0) {
      const cartItems = cart.map(item => item.title).join(', ');
      const prompt = `Based on these items in the cart: ${cartItems}, suggest 3 relevant questions or topics the user might want to ask about. Return only the questions, one per line, without any additional text or formatting.`;
      geminiChat(prompt)
        .then(response => {
          const suggestions = response.split('\n').filter(Boolean);
          setSuggestions(suggestions);
        })
        .catch(() => {
          // Fallback suggestions if API call fails
          setSuggestions([
            'Are there any better alternatives to items in my cart?',
            'What are some complementary products I might need?',
            'Are there any current deals or discounts I should know about?'
          ]);
        });
    }
  }, [cart]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    setLoading(true);
    setError(null);
    try {
      // Add cart context to the prompt for more personalized responses
      const cartContext = cart.length > 0 
        ? `User's cart contains: ${cart.map(item => `${item.title} ($${item.price})`).join(', ')}. `
        : '';
      
      const aiReply = await geminiChat(`${cartContext}${input}`);
      setMessages(msgs => [...msgs, { from: 'ai', text: filterText(aiReply) }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { from: 'ai', text: 'Sorry, I could not process your request right now.' }]);
      setError('Failed to get response from Gemini.');
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  const filterText = (text: string) => {
    // Remove #, *, and markdown-like formatting
    return text.replace(/[\#\*\_\~\`\>\[\]\(\)]/g, '').replace(/\s{2,}/g, ' ').trim();
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 bg-amazon-primary text-white rounded-full p-3 shadow-lg z-50 hover:bg-amazon-yellow hover:text-black transition-colors"
        onClick={() => setOpen(o => !o)}
        aria-label="Open Shopping Assistant"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
      {open && (
        <div className="fixed bottom-20 right-6 w-96 bg-white rounded-xl shadow-2xl z-50 flex flex-col border border-gray-200">
          <div className="bg-amazon-primary text-white p-3 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <span className="font-bold">Shopping Assistant</span>
            </div>
            <button onClick={() => setOpen(false)} className="hover:text-gray-200">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 p-3 overflow-y-auto max-h-96 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'ai' ? 'justify-start' : 'justify-end'}`}>
                <div className={`rounded-lg px-3 py-2 max-w-[80%] ${msg.from === 'ai' ? 'bg-gray-100 text-gray-900' : 'bg-amazon-primary text-white'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-lg px-3 py-2 bg-gray-100 text-gray-500 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Assistant is typing...</span>
                </div>
              </div>
            )}
            
            {suggestions.length > 0 && !loading && (
              <div className="space-y-2">
                <div className="text-xs text-gray-500">Suggested questions:</div>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInput(suggestion);
                        handleSend();
                      }}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {error && (
              <div className="text-xs text-red-500 bg-red-50 p-2 rounded">
                {error}
              </div>
            )}
          </div>
          
          <div className="border-t p-3">
            <div className="flex gap-2">
              <input
                className="flex-1 p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amazon-primary"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !loading && handleSend()}
                placeholder="Ask me anything..."
                disabled={loading}
              />
              <Button
                onClick={handleSend}
                disabled={loading}
                className="bg-amazon-primary hover:bg-amazon-yellow text-white hover:text-black"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingAssistant; 