import React, { useState, useRef } from 'react';

// Puter.js Grok integration
// Assumes <script src="https://js.puter.com/v2/"></script> is loaded in index.html

const systemPrompt = `You’re a personable moving assistant. You help plan moves, remind users about packing, create checklists, suggest moving tips, and provide local mover recommendations. Be friendly and concise.`;

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your AI moving assistant.", from: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const historyRef = useRef([
    { role: 'system', content: systemPrompt }
  ]);
  const msgsEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  React.useEffect(() => {
    if (msgsEndRef.current) {
      msgsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (!q || loading) return;
    setMessages(msgs => [...msgs, { text: q, from: "user" }]);
    setInput("");
    setLoading(true);
    historyRef.current.push({ role: 'user', content: q });

    // Streaming response from Grok
    try {
      // @ts-ignore
      const resp = await window.puter.ai.chat(historyRef.current, { model: 'x-ai/grok-4', stream: true });
      let botMsg = "";
      setMessages(msgs => [...msgs, { text: "...", from: "bot" }]); // Placeholder
      let botMsgIndex = messages.length + 1;
      for await (const chunk of resp) {
        botMsg += chunk.text;
        setMessages(msgs => {
          const updated = [...msgs];
          updated[botMsgIndex] = { text: botMsg, from: "bot" };
          return updated;
        });
      }
      historyRef.current.push({ role: 'assistant', content: botMsg });
    } catch (err) {
      setMessages(msgs => [...msgs, { text: "Sorry, there was an error connecting to Grok.", from: "bot" }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000 }}>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white rounded-full shadow-lg px-4 py-2 font-semibold hover:bg-blue-700 transition"
        >
          Open AI Chatbot
        </button>
      )}
      {open && (
        <div className="bg-white shadow-lg rounded-lg w-80 p-4 border border-gray-200 relative">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-lg font-bold"
            aria-label="Close chatbot"
          >×</button>
          <div className="font-bold text-blue-600 mb-2">AI Moving Assistant</div>
          <div className="h-40 overflow-y-auto mb-2 flex flex-col gap-2">
            {messages.map((msg, i) => (
              <div key={i} className={msg.from === 'bot' ? 'text-gray-700' : 'text-right text-blue-600'}>
                {msg.text}
              </div>
            ))}
            <div ref={msgsEndRef} />
          </div>
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              className="flex-1 border border-gray-300 rounded px-2 py-1"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={loading ? "Waiting for Grok..." : "Type a message..."}
              disabled={loading}
            />
            <button type="submit" className="bg-blue-600 text-white px-3 rounded" disabled={loading}>Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
