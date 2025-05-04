import React, { useState } from 'react';
import { geminiChat } from '../services/aiAnalysisService';

const filterText = (text: string) => {
  return text.replace(/[\#\*\_\~\`\>\[\]\(\)]/g, '').replace(/\s{2,}/g, ' ').trim();
};

const Watchlist = () => {
  const [watched, setWatched] = useState<{id: number, title: string}[]>([]);
  const [alerts, setAlerts] = useState<{[id: number]: string}>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [nextId, setNextId] = useState(1);

  const handleAdd = () => {
    const title = input.trim();
    if (!title) return;
    setWatched([...watched, { id: nextId, title }]);
    setNextId(nextId + 1);
    setInput('');
  };

  const handleRemove = (id: number) => {
    setWatched(watched.filter(item => item.id !== id));
    setAlerts(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const handleCheckAlerts = async () => {
    setLoading(true);
    setError(null);
    try {
      const newAlerts: {[id: number]: string} = {};
      for (const item of watched) {
        const prompt = `You are a shopping assistant. Search the internet for recent price hikes or discounts for the product \"${item.title}\". Summarize any recent changes or deals. Be concise, avoid markdown, #, *, and use only clear, plain text.`;
        const aiReply = await geminiChat(prompt);
        newAlerts[item.id] = filterText(aiReply);
      }
      setAlerts(newAlerts);
    } catch (err) {
      setError('Failed to get alerts from Gemini.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-md shadow-md border p-4 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
        <span className="text-lg font-bold text-yellow-800">Watchlist Alerts</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 mb-3">
        <input
          className="flex-1 p-2 text-base border border-yellow-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add product to watch..."
          disabled={loading}
        />
        <button
          onClick={handleAdd}
          disabled={loading || !input.trim()}
          className="bg-yellow-400 hover:bg-yellow-500 px-5 py-2 rounded text-base text-yellow-900 font-bold shadow-sm transition-all duration-200"
        >Add</button>
      </div>
      <button onClick={handleCheckAlerts} disabled={loading || watched.length === 0} className="mb-3 text-base h-10 bg-yellow-500 hover:bg-yellow-600 px-5 py-2 rounded text-yellow-900 font-bold w-full shadow-sm transition-all duration-200">
        {loading ? 'Checking...' : 'Check for Alerts'}
      </button>
      {error && <div className="text-base text-red-600 mb-2 font-semibold text-center">{error}</div>}
      {watched.length === 0 ? (
        <div className="text-base text-gray-500 text-center">No watched items yet.</div>
      ) : (
        <ul className="text-base space-y-2">
          {watched.map(item => (
            <li key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-yellow-50 rounded px-3 py-2 border border-yellow-100 gap-2">
              <span className="font-semibold text-yellow-900">{item.title}</span>
              <span className="text-green-700 font-medium">{alerts[item.id] || 'No recent alerts.'}</span>
              <button onClick={() => handleRemove(item.id)} className="text-base text-red-500 hover:underline font-bold mt-2 sm:mt-0">Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Watchlist; 