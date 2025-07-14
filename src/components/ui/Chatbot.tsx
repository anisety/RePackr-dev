import React, { useState } from 'react';

const randomResponses = [
  "Hello! How can I help you today?",
  "I'm here to assist you with your move.",
  "Let me know if you have any questions!",
  "Packing tips: Label your boxes!",
  "Did you know? Moving is easier with a checklist.",
  "I'm just a demo bot, but I love helping!"
];

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your AI assistant.", from: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { text: input, from: "user" }]);
    setTimeout(() => {
      const response = randomResponses[Math.floor(Math.random() * randomResponses.length)];
      setMessages(msgs => [...msgs, { text: response, from: "bot" }]);
    }, 500);
    setInput("");
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
          <div className="font-bold text-blue-600 mb-2">AI Chatbot</div>
          <div className="h-40 overflow-y-auto mb-2 flex flex-col gap-2">
            {messages.map((msg, i) => (
              <div key={i} className={msg.from === 'bot' ? 'text-gray-700' : 'text-right text-blue-600'}>
                {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              className="flex-1 border border-gray-300 rounded px-2 py-1"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit" className="bg-blue-600 text-white px-3 rounded">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
