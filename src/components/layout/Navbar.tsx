import React from 'react';

const Navbar: React.FC<{ onLogin: () => void; onSignup: () => void; user?: string }> = ({ onLogin, onSignup, user }) => {
  return (
    <nav className="w-full bg-white/90 border-b border-gray-200 px-4 py-2 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">R</span>
        </div>
        <span className="text-xl font-semibold text-gray-900">RePackr</span>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <span className="text-gray-700">Welcome, {user}</span>
        ) : (
          <>
            <button onClick={onLogin} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition">Log In</button>
            <button onClick={onSignup} className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition">Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
