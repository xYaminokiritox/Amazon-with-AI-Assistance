import { CartItem } from '../types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export const analyzeCart = async (cartItems: CartItem[]) => {
  if (!GEMINI_API_KEY) {
    console.error('Gemini API key not found:', import.meta.env);
    throw new Error('Gemini API key not found. Please set VITE_GEMINI_API_KEY in your environment variables.');
  }

  const cartSummary = cartItems.map(item => ({
    title: item.title,
    price: item.price,
    category: item.category,
    rating: item.rating,
    quantity: item.quantity
  }));

  const prompt = `You are a professional shopping analyst. Provide a precise, data-driven analysis of the following shopping cart. Be concise, specific, and focus on actionable insights.

${JSON.stringify(cartSummary, null, 2)}

Format your response in the following structure, keeping each section brief and to the point:

Shopping Cart Analysis

Cart Overview
- Total Items: [exact number]
- Total Value: $[exact amount]
- Categories: [specific categories]

Value Assessment
- Price Analysis: [specific price comparisons]
- Value Rating: [1-10 scale with brief explanation]
- Savings Potential: [specific amount if applicable]

Quality Assessment
- Average Rating: [exact number]
- Review Analysis: [specific insights from ratings]
- Reliability Score: [1-10 scale]

Recommendations
- Top Alternatives: [specific products if better value]
- Bundle Opportunities: [specific suggestions]
- Price Optimization: [specific tips]

Final Verdict
- Overall Score: [1-10]
- Best Value Item: [specific item]
- Items to Reconsider: [specific items if any]

Keep responses precise, data-driven, and under 300 words total. Focus on specific numbers, ratings, and actionable insights.`;

  try {
    console.log('Making API call to Gemini...');
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    console.log('API Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      throw new Error(`API Error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response data:', data);
    
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format from Gemini API');
    }
    
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error analyzing cart:', error);
    throw error;
  }
};

export const geminiChat = async (userPrompt: string) => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not found. Please set VITE_GEMINI_API_KEY in your environment variables.');
  }

  const prompt = `You are a helpful shopping assistant. Always provide a helpful, actionable suggestion or recommendation in your response. Do NOT just ask questions or request more info—give a clear answer or tip, unless the user specifically asks for more. Do NOT use markdown, special characters like #, *, or excessive formatting. Respond in clear, plain, conversational text only.\n\nUser: ${userPrompt}`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} ${errorText}`);
    }
    const data = await response.json();
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format from Gemini API');
    }
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    throw error;
  }
}; 