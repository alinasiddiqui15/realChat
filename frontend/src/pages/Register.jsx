import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) return;
    
    setIsSubmitting(true);
    const success = await register(username, email, password);
    setIsSubmitting(false);
    
    if (success) {
      navigate('/');
    }
  };

  const handleSocialLogin = (platform) => {
    toast(`Sign up with ${platform} is simulated. Backend integration required!`, {
      icon: '🔐',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-900 dark:bg-dark-900 px-4 transition-colors relative overflow-hidden">
      {/* Background glowing blobs precisely matching mockup style */}
      <div className="nexus-bg-blob w-[450px] h-[450px] bg-primary-500 top-[-8%] right-[-8%]"></div>
      <div className="nexus-bg-blob w-[550px] h-[550px] bg-accent-500 bottom-[-15%] left-[-8%]"></div>

      <div className="w-full max-w-sm bg-light-800 dark:bg-dark-800 border border-light-600 dark:border-dark-600 p-8 rounded-[42px] z-10 shadow-xl shadow-gray-200/40 dark:shadow-black/30 animate-in fade-in slide-in-from-bottom-4 duration-500 my-8">
        
        {/* Logo and Wording */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-nexus-gradient flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary-500/20 mb-4 transition-all hover:scale-105">
            N
          </div>
          <h1 className="text-2xl font-black tracking-widest text-gray-800 dark:text-gray-100 uppercase">
            NEXUS
          </h1>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-4 leading-tight">
            Create Account
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Join Nexus today
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-light-900 dark:bg-dark-900 border-none rounded-full px-6 py-4 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-primary-500/30 transition-all placeholder-gray-400/90 shadow-inner"
              placeholder="Username"
              required
            />
          </div>

          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-light-900 dark:bg-dark-900 border-none rounded-full px-6 py-4 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-primary-500/30 transition-all placeholder-gray-400/90 shadow-inner"
              placeholder="Email address"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-light-900 dark:bg-dark-900 border-none rounded-full pl-6 pr-12 py-4 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-primary-500/30 transition-all placeholder-gray-400/90 shadow-inner"
              placeholder="Password"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1"
            >
              {showPassword ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !username || !email || !password}
            className="w-full bg-nexus-gradient text-white font-bold rounded-full py-4 hover:shadow-lg hover:shadow-primary-500/20 hover:opacity-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-sm mt-2"
          >
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200/60 dark:border-dark-700/50"></div>
          </div>
          <span className="relative bg-light-800 dark:bg-dark-800 px-3 text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider">
            Or register with
          </span>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => handleSocialLogin('Google')}
            className="flex items-center justify-center gap-2 py-3.5 bg-light-900 dark:bg-dark-900 border border-light-600/30 dark:border-dark-600/30 rounded-full hover:bg-light-700 dark:hover:bg-dark-700 transition-colors text-xs font-bold text-gray-700 dark:text-gray-200 shadow-sm"
          >
            <FcGoogle size={18} />
            Google
          </button>
          <button
            onClick={() => handleSocialLogin('GitHub')}
            className="flex items-center justify-center gap-2 py-3.5 bg-light-900 dark:bg-dark-900 border border-light-600/30 dark:border-dark-600/30 rounded-full hover:bg-light-700 dark:hover:bg-dark-700 transition-colors text-xs font-bold text-gray-700 dark:text-gray-200 shadow-sm"
          >
            <FaGithub size={18} className="text-gray-800 dark:text-gray-100" />
            GitHub
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/register" className="text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors font-bold ml-1">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
