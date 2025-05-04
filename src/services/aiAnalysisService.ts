import { CartItem, Product } from '../types';
import { products as allProducts } from '../data/products';

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

export const getSearchSuggestions = async (searchTerm: string): Promise<string[]> => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not found. Please set VITE_GEMINI_API_KEY in your environment variables.');
  }

  // Simple prompt for product suggestions based on search term
  const prompt = `You are a shopping assistant. Based on the search term "${searchTerm}", suggest 3 related product types or specific product ideas that the user might be interested in. Provide only the suggestions as a comma-separated list (e.g., suggestion1, suggestion2, suggestion3). Do not add any introductory text or explanations.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        // Optional: Add safety settings or generation config if needed
        // generationConfig: { temperature: 0.7, topP: 0.9, topK: 40 }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error fetching suggestions:', errorText);
      throw new Error(`API Error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini Suggestions Response:', data);

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error('Invalid response format from Gemini API for suggestions');
      return []; // Return empty array on invalid format
    }

    const suggestionsText = data.candidates[0].content.parts[0].text.trim();
    // Split the comma-separated string into an array of suggestions
    const suggestions = suggestionsText.split(',').map(s => s.trim()).filter(s => s.length > 0);
    
    return suggestions;

  } catch (error) {
    console.error('Error getting search suggestions:', error);
    // Return empty array or throw error based on desired handling
    return []; 
  }
};

// New function to get specific product recommendations based on query and product list
export const getAISpecificProductSuggestions = async (searchTerm: string): Promise<number[]> => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not found. Please set VITE_GEMINI_API_KEY in your environment variables.');
  }

  // Prepare a simplified list of products for the prompt
  const productContext = allProducts.map(p => ({
    id: p.id,
    title: p.title,
    category: p.category,
    description: p.description.substring(0, 100) + '...', // Keep description brief
    price: p.price,
    rating: p.rating.rate
  }));

  const prompt = `You are an intelligent shopping assistant analyzing a user's search query and a product catalog.
User's search query: "${searchTerm}"

Available products (subset of details):
${JSON.stringify(productContext, null, 2)}

Based *only* on the user's search query and the provided product list, identify the top 1-3 product IDs from the list that *best* match the specific requirements mentioned in the query (e.g., features like '8gb ram', product type like 'pc', color, brand, etc.).

Return *only* a comma-separated list of the matching product IDs (e.g., "1, 5, 12"). If no products strongly match the specific requirements, return an empty string. Do not add any explanation or introductory text.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        // Adjust generation config if needed for more precise ID extraction
        // generationConfig: { temperature: 0.2, topP: 0.8, topK: 10 }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error fetching specific product suggestions:', errorText);
      throw new Error(`API Error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini Specific Product Suggestions Response:', data);

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.warn('No specific product suggestions returned or invalid format from Gemini API.');
      return []; // Return empty array if no text part
    }

    const idsText = data.candidates[0].content.parts[0].text.trim();
    if (!idsText) {
      return []; // Return empty if AI returns empty string
    }

    // Parse the comma-separated string of IDs into an array of numbers
    const recommendedIds = idsText
      .split(',')
      .map(idStr => parseInt(idStr.trim(), 10))
      .filter(id => !isNaN(id) && allProducts.some(p => p.id === id)); // Ensure IDs are valid numbers and exist in our product list

    return recommendedIds;

  } catch (error) {
    console.error('Error getting specific product suggestions:', error);
    return []; // Return empty array on error
  }
};

// New function to get generally trending products from the catalog
export const getTrendingProducts = async (): Promise<number[]> => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not found. Please set VITE_GEMINI_API_KEY in your environment variables.');
  }

  // Prepare a simplified list of products for the prompt
  const productContext = allProducts.map(p => ({
    id: p.id,
    title: p.title,
    category: p.category,
    price: p.price,
    rating: p.rating.rate
    // Description might not be needed for general trending analysis
  }));

  const prompt = `You are an e-commerce trend analyst.

Available products (subset of details):
${JSON.stringify(productContext, null, 2)}

Based *only* on the provided product list, identify the top 3-5 product IDs that represent the *most popular or currently trending* items in the catalog. Consider factors like potential popularity based on category, title, and general appeal.

Return *only* a comma-separated list of the trending product IDs (e.g., "2, 8, 15, 19"). Do not add any explanation or introductory text.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        // Adjust generation config if needed for better trend identification
        // generationConfig: { temperature: 0.5, topP: 0.9, topK: 50 }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error fetching trending products:', errorText);
      throw new Error(`API Error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini Trending Products Response:', data);

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.warn('No trending products returned or invalid format from Gemini API.');
      return []; // Return empty array if no text part
    }

    const idsText = data.candidates[0].content.parts[0].text.trim();
    if (!idsText) {
      return []; // Return empty if AI returns empty string
    }

    // Parse the comma-separated string of IDs into an array of strings and validate them
    const ids = idsText.split(',') 
                     .map(idStr => idStr.trim())
                     .filter(idStr => idStr && allProducts.some(p => p.id === idStr)); // Ensure IDs are valid non-empty strings and exist in our product list

    console.log('Parsed Trending Product IDs:', ids);
    return ids;
  } catch (error) {
    console.error('Error getting trending products:', error);
    return []; // Return empty array on error
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