import React, { useState } from 'react';

interface MoveInfo {
  name: string;
  origin: string;
  destination: string;
}

const WelcomeOnboarding: React.FC<{ onComplete: (info: MoveInfo) => void }> = ({ onComplete }) => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [form, setForm] = useState({ name: '', origin: '', destination: '' });

  React.useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 2000); // 2s animation
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.origin && form.destination) {
      onComplete(form);
    }
  };

  if (showAnimation) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-green-200 to-white animate-fade-in">
        <div className="text-4xl font-bold text-blue-700 mb-4 animate-bounce">Welcome to RePackr!</div>
        <div className="text-lg text-gray-700">Let's get you ready for your move...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-6 text-center">Tell us about your move</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Your Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Moving From</label>
          <input name="origin" value={form.origin} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Moving To</label>
          <input name="destination" value={form.destination} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Continue</button>
      </form>
    </div>
  );
};

export default WelcomeOnboarding;
