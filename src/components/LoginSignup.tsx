import { useState } from 'react';
import { Mail, Phone, Fingerprint, Sprout, Lock } from 'lucide-react';

interface LoginSignupProps {
  onLogin: () => void;
}

export function LoginSignup({ onLogin }: LoginSignupProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      {/* Header */}
      <div className="bg-green-600 text-white pt-16 pb-24 px-6 rounded-b-[3rem] shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
            <Sprout className="w-12 h-12" />
          </div>
        </div>
        <h1 className="text-center text-white mb-2">
          SmartFarm
        </h1>
        <p className="text-center text-green-50">
          Your Intelligent Farming Partner
        </p>
      </div>

      {/* Form Container */}
      <div className="flex-1 px-6 -mt-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md mx-auto">
          {/* Toggle */}
          <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-xl transition-all ${
                isLogin
                  ? 'bg-white shadow-md text-green-600'
                  : 'text-gray-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-xl transition-all ${
                !isLogin
                  ? 'bg-white shadow-md text-green-600'
                  : 'text-gray-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="farmer@smartfarm.com"
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-green-600 hover:text-green-700">
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl shadow-lg transition-all hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Sprout className="w-5 h-5" />
              <span>Enter Your Smart Farm</span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Biometric Login */}
          <button
            type="button"
            onClick={onLogin}
            className="w-full border-2 border-gray-200 hover:border-green-500 text-gray-700 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group"
          >
            <Fingerprint className="w-6 h-6 text-green-600 group-hover:scale-110 transition-transform" />
            <span>Fingerprint Login</span>
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 mt-8 mb-8">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-600 hover:text-green-700"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}
