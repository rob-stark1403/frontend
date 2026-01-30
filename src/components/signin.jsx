import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "./button.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";
import Navbar from "./Navbar.jsx";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Activity,
  Shield,
  Zap,
  Heart
} from "lucide-react";

const SignInForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear field-specific error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }
    
    // Clear general error
    if (error) {
      setError(null);
    }
  };

  const validateForm = () => {
    const errors = { email: "", password: "" };
    let isValid = true;

    // Email validation
    if (!form.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!form.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (form.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signin", form);
      localStorage.setItem("token", res.data.token);
      login(res.data.user);
      
      // Navigate based on user type
      if (res.data.user.usertype === 'Doctor') {
        navigate("/doc-dashboard");
      } else {
        navigate("/pat-dashboard");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 
        "Login failed. Please check your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 pt-24 md:pt-32">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Side - Branding & Features */}
            <div className="hidden lg:block space-y-8">
              {/* Logo & Title */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 blur-xl animate-pulse" />
                    <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-2xl shadow-2xl">
                      <Activity className="w-10 h-10 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                      MedLink AI
                    </h1>
                    <p className="text-gray-600 font-medium">Healthcare Reimagined</p>
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                  Welcome Back to Your Health Journey
                </h2>
                <p className="text-lg text-gray-600">
                  Sign in to access your secure medical records, AI-powered health insights, 
                  and connect with healthcare professionals.
                </p>
              </div>

              {/* Feature List */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Blockchain Security</h3>
                    <p className="text-sm text-gray-600">
                      Your medical data is encrypted and secured on blockchain technology
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">AI-Powered Insights</h3>
                    <p className="text-sm text-gray-600">
                      Get instant health analysis and personalized recommendations
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">24/7 Health Support</h3>
                    <p className="text-sm text-gray-600">
                      Access your health records and connect with doctors anytime
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    10K+
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    99.9%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    24/7
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Support</div>
                </div>
              </div>
            </div>

            {/* Right Side - Sign In Form */}
            <div className="w-full">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 px-8 py-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
                      <p className="text-blue-100 text-sm">Sign in to your account</p>
                    </div>
                  </div>
                </div>

                {/* Form Body */}
                <div className="px-8 py-8">
                  {/* Error Alert */}
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-in slide-in-from-top-2 duration-200">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-red-900 mb-1">
                            Sign In Failed
                          </h3>
                          <p className="text-sm text-red-700">{error}</p>
                        </div>
                        <button
                          onClick={() => setError(null)}
                          className="text-red-400 hover:text-red-600 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className={`w-5 h-5 ${fieldErrors.email ? 'text-red-400' : 'text-gray-400'}`} />
                        </div>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          className={`
                            block w-full pl-12 pr-4 py-3.5
                            text-gray-900 placeholder-gray-400
                            bg-gray-50 border-2 rounded-xl
                            transition-all duration-200
                            focus:outline-none focus:ring-4 focus:bg-white
                            disabled:opacity-50 disabled:cursor-not-allowed
                            ${fieldErrors.email 
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                              : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                            }
                          `}
                          disabled={isLoading}
                        />
                        {fieldErrors.email && (
                          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                          </div>
                        )}
                      </div>
                      {fieldErrors.email && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <span className="font-medium">Error:</span> {fieldErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Password Field */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                          Password
                        </label>
                        <button
                          type="button"
                          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                          onClick={() => navigate('/forgot-password')}
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className={`w-5 h-5 ${fieldErrors.password ? 'text-red-400' : 'text-gray-400'}`} />
                        </div>
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          required
                          value={form.password}
                          onChange={handleChange}
                          placeholder="Enter your password"
                          className={`
                            block w-full pl-12 pr-12 py-3.5
                            text-gray-900 placeholder-gray-400
                            bg-gray-50 border-2 rounded-xl
                            transition-all duration-200
                            focus:outline-none focus:ring-4 focus:bg-white
                            disabled:opacity-50 disabled:cursor-not-allowed
                            ${fieldErrors.password 
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                              : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                            }
                          `}
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                          disabled={isLoading}
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {fieldErrors.password && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <span className="font-medium">Error:</span> {fieldErrors.password}
                        </p>
                      )}
                    </div>

                    {/* Remember Me & Submit */}
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                          Remember me for 30 days
                        </label>
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        disabled={isLoading}
                        loading={isLoading}
                        className="relative overflow-hidden group"
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Signing In...
                          </>
                        ) : (
                          <>
                            <span className="relative z-10">Sign In</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>

                  {/* Divider */}
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500 font-medium">
                        New to MedLink AI?
                      </span>
                    </div>
                  </div>

                  {/* Sign Up Link */}
                  <div className="text-center">
                    <Link
                      to="/register"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group"
                    >
                      <span>Create a free account</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Shield className="w-4 h-4" />
                    <span>Protected by industry-leading encryption</span>
                  </div>
                </div>
              </div>

              {/* Additional Info - Mobile Only */}
              <div className="lg:hidden mt-8 space-y-4">
                <div className="flex items-center justify-center gap-8 text-center">
                  <div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      10K+
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Users</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      99.9%
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Uptime</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      24/7
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-600 mb-4">Trusted by healthcare professionals worldwide</p>
            <div className="flex items-center justify-center gap-8 flex-wrap opacity-60">
              <div className="text-xs font-semibold text-gray-500">🏥 500+ Hospitals</div>
              <div className="text-xs font-semibold text-gray-500">👨‍⚕️ 2,000+ Doctors</div>
              <div className="text-xs font-semibold text-gray-500">🔒 HIPAA Compliant</div>
              <div className="text-xs font-semibold text-gray-500">⚡ Blockchain Secured</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;