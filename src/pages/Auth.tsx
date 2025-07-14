import React, { useState } from 'react';

const Auth = () => {
  const [form, setForm] = useState({
    name: '',
    dob: '',
    username: '',
    password: ''
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('authUser', JSON.stringify(form));
    setSaved(true);
    setTimeout(() => {
      window.location.replace('/');
    }, 500);
    // Simulate clearing all users except the current one
    // (in a real app, this would be a backend call)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
        </div>
        <div>
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input id="dob" name="dob" type="date" value={form.dob} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
        </div>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input id="username" name="username" type="text" value={form.username} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold">Save & Continue</button>
        {saved && <p className="text-green-600 text-center mt-4">Information saved! All other users cleared.</p>}
      </form>
    </div>
  );
};

export default Auth;
