import React, { useState } from "react";
import axios from "axios";
import Button from "../components/button.jsx";
import Navbar from "./Navbar.jsx";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Activity,
  Shield,
  Zap,
  Heart,
  Stethoscope,
  Users as UsersIcon,
  FileHeart,
  Loader2,
  Wallet,
  ChevronRight
} from "lucide-react";

const SignUpForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    usertype: "",
    gender: "",
    email: "",
    password: "",
    walletAddress: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    usertype: "",
    gender: "",
    email: "",
    password: ""
  });
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
      setError("");
    }
  };

  const validateStep1 = () => {
    const errors = { name: "", usertype: "", gender: "" };
    let isValid = true;

    if (!form.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    } else if (form.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    if (!form.usertype) {
      errors.usertype = "Please select a user type";
      isValid = false;
    }

    if (!form.gender) {
      errors.gender = "Please select your gender";
      isValid = false;
    }

    setFieldErrors({ ...fieldErrors, ...errors });
    return isValid;
  };

  const validateStep2 = () => {
    const errors = { email: "", password: "" };
    let isValid = true;

    if (!form.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!form.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (form.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setFieldErrors({ ...fieldErrors, ...errors });
    return isValid;
  };

  const nextStep = () => {
    if (validateStep1()) {
      setStep(2);
      setError("");
    }
  };

  const prevStep = () => {
    setStep(1);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) {
      return;
    }

    setLoading(true);
    setError("");

    if (!window.ethereum) {
      setError("MetaMask is required to sign up. Please install MetaMask and try again.");
      setLoading(false);
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const wallet = accounts[0];

      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        ...form,
        walletAddress: wallet,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (onSuccess) {
        onSuccess(res.data.user);
      }

      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || 
        "Registration failed. Please try again or contact support."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 pt-24 md:pt-32">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Side - Branding & Features (Desktop Only) */}
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
                  Join the Future of Healthcare
                </h2>
                <p className="text-lg text-gray-600">
                  Create your account to access secure blockchain-based medical records, 
                  AI-powered health insights, and connect with healthcare professionals worldwide.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Blockchain Security</h3>
                    <p className="text-sm text-gray-600">
                      Your medical data encrypted and secured on immutable blockchain
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">AI-Powered Health</h3>
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
                    <h3 className="font-semibold text-gray-900 mb-1">Complete Control</h3>
                    <p className="text-sm text-gray-600">
                      You own your data - grant and revoke access anytime
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    10K+
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    500+
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Doctors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    24/7
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Support</div>
                </div>
              </div>
            </div>

            {/* Right Side - Registration Form */}
            <div className="w-full">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Form Header with Progress */}
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 px-8 py-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Create Account</h2>
                      <p className="text-blue-100 text-sm">Step {step} of 2</p>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className="flex items-center gap-2">
                    <div className={`
                      flex items-center justify-center
                      w-8 h-8 rounded-full
                      font-semibold text-sm
                      transition-all duration-300
                      ${step >= 1 
                        ? 'bg-white text-blue-600 shadow-lg' 
                        : 'bg-white/20 text-white border border-white/30'
                      }
                    `}>
                      {step > 1 ? <CheckCircle className="w-5 h-5" /> : "1"}
                    </div>
                    
                    <div className={`
                      flex-1 h-2 rounded-full transition-all duration-300
                      ${step >= 2 ? 'bg-white' : 'bg-white/20'}
                    `} />
                    
                    <div className={`
                      flex items-center justify-center
                      w-8 h-8 rounded-full
                      font-semibold text-sm
                      transition-all duration-300
                      ${step >= 2 
                        ? 'bg-white text-blue-600 shadow-lg' 
                        : 'bg-white/20 text-white border border-white/30'
                      }
                    `}>
                      2
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
                            Registration Error
                          </h3>
                          <p className="text-sm text-red-700">{error}</p>
                        </div>
                        <button
                          onClick={() => setError("")}
                          className="text-red-400 hover:text-red-600 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 1: Personal Information */}
                  {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          Personal Information
                        </h3>
                        <p className="text-sm text-gray-600">
                          Let's start with some basic details about you
                        </p>
                      </div>

                      {/* Full Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User className={`w-5 h-5 ${fieldErrors.name ? 'text-red-400' : 'text-gray-400'}`} />
                          </div>
                          <input
                            id="name"
                            type="text"
                            name="name"
                            required
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className={`
                              block w-full pl-12 pr-4 py-3.5
                              text-gray-900 placeholder-gray-400
                              bg-gray-50 border-2 rounded-xl
                              transition-all duration-200
                              focus:outline-none focus:ring-4 focus:bg-white
                              disabled:opacity-50 disabled:cursor-not-allowed
                              ${fieldErrors.name 
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                                : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                              }
                            `}
                            disabled={loading}
                          />
                          {fieldErrors.name && (
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                              <AlertCircle className="w-5 h-5 text-red-500" />
                            </div>
                          )}
                        </div>
                        {fieldErrors.name && (
                          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <span className="font-medium">Error:</span> {fieldErrors.name}
                          </p>
                        )}
                      </div>

                      {/* User Type and Gender Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* User Type */}
                        <div>
                          <label htmlFor="usertype" className="block text-sm font-semibold text-gray-700 mb-2">
                            I am a
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Stethoscope className={`w-5 h-5 ${fieldErrors.usertype ? 'text-red-400' : 'text-gray-400'}`} />
                            </div>
                            <select
                              id="usertype"
                              name="usertype"
                              required
                              value={form.usertype}
                              onChange={handleChange}
                              className={`
                                block w-full pl-12 pr-4 py-3.5
                                text-gray-900
                                bg-gray-50 border-2 rounded-xl
                                transition-all duration-200
                                focus:outline-none focus:ring-4 focus:bg-white
                                disabled:opacity-50 disabled:cursor-not-allowed
                                appearance-none cursor-pointer
                                ${fieldErrors.usertype 
                                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                                  : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                                }
                              `}
                              disabled={loading}
                            >
                              <option value="">Select type</option>
                              <option value="Patient">Patient</option>
                              <option value="Doctor">Doctor</option>
                            </select>
                            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 w-5 h-5 text-gray-400 pointer-events-none" />
                          </div>
                          {fieldErrors.usertype && (
                            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                              <span className="font-medium">Error:</span> {fieldErrors.usertype}
                            </p>
                          )}
                        </div>

                        {/* Gender */}
                        <div>
                          <label htmlFor="gender" className="block text-sm font-semibold text-gray-700 mb-2">
                            Gender
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <UsersIcon className={`w-5 h-5 ${fieldErrors.gender ? 'text-red-400' : 'text-gray-400'}`} />
                            </div>
                            <select
                              id="gender"
                              name="gender"
                              required
                              value={form.gender}
                              onChange={handleChange}
                              className={`
                                block w-full pl-12 pr-4 py-3.5
                                text-gray-900
                                bg-gray-50 border-2 rounded-xl
                                transition-all duration-200
                                focus:outline-none focus:ring-4 focus:bg-white
                                disabled:opacity-50 disabled:cursor-not-allowed
                                appearance-none cursor-pointer
                                ${fieldErrors.gender 
                                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                                  : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
                                }
                              `}
                              disabled={loading}
                            >
                              <option value="">Select gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 w-5 h-5 text-gray-400 pointer-events-none" />
                          </div>
                          {fieldErrors.gender && (
                            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                              <span className="font-medium">Error:</span> {fieldErrors.gender}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Continue Button */}
                      <Button
                        type="button"
                        onClick={nextStep}
                        variant="primary"
                        size="lg"
                        fullWidth
                        disabled={loading}
                        className="relative overflow-hidden group mt-2"
                        rightIcon={<ChevronRight className="w-5 h-5" />}
                      >
                        <span className="relative z-10">Continue</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Button>
                    </div>
                  )}

                  {/* Step 2: Account Setup */}
                  {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          Account Setup
                        </h3>
                        <p className="text-sm text-gray-600">
                          Create your secure login credentials
                        </p>
                      </div>

                      {/* Email */}
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
                            disabled={loading}
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

                      {/* Password */}
                      <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                          Password
                        </label>
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
                            placeholder="Create a strong password"
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
                            disabled={loading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                            disabled={loading}
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
                        {!fieldErrors.password && (
                          <p className="mt-2 text-xs text-gray-500">
                            Password must be at least 6 characters long
                          </p>
                        )}
                      </div>

                      {/* Wallet Connection Info */}
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                            <Wallet className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                              <Shield className="w-4 h-4 text-blue-600" />
                              Wallet Connection Required
                            </h4>
                            <p className="text-sm text-gray-600">
                              Your MetaMask wallet will be securely connected during registration. 
                              This enables blockchain-based security for your medical records.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-2">
                        <Button
                          type="button"
                          onClick={prevStep}
                          variant="outline"
                          size="lg"
                          disabled={loading}
                          className="flex-1"
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          onClick={handleSubmit}
                          variant="primary"
                          size="lg"
                          disabled={loading}
                          loading={loading}
                          className="flex-1 relative overflow-hidden group"
                          rightIcon={!loading && <ChevronRight className="w-5 h-5" />}
                        >
                          {loading ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin mr-2" />
                              Creating Account...
                            </>
                          ) : (
                            <>
                              <span className="relative z-10">Sign Up</span>
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Divider */}
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500 font-medium">
                        Already have an account?
                      </span>
                    </div>
                  </div>

                  {/* Sign In Link */}
                  <div className="text-center">
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group"
                    >
                      <span>Sign in instead</span>
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
                    <span>Your data is encrypted and secured with blockchain technology</span>
                  </div>
                </div>
              </div>

              {/* Mobile Feature Cards */}
              <div className="lg:hidden mt-8 space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-blue-100 shadow-sm">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                    <FileHeart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">For Patients</h3>
                    <p className="text-xs text-gray-600">Secure health records & AI diagnosis</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-purple-100 shadow-sm">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                    <Stethoscope className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">For Doctors</h3>
                    <p className="text-xs text-gray-600">Professional tools & patient management</p>
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

export default SignUpForm;