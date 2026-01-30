import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
  Activity,
  Shield,
  Heart,
  Brain,
  Zap,
  Lock,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Database,
  FileText,
  Stethoscope,
  Globe,
  Award,
  Target,
  Fingerprint
} from 'lucide-react';

/* ============================================
   HERO SECTION - Main landing area
   ============================================ */
export const HeroSection = ({ userType }) => {
  const heroContent = {
    patient: {
      title: "Your Health, Your Control",
      subtitle: "AI-powered early disease detection with complete privacy and control over your medical data",
      cta: "Start Health Assessment",
      features: ["AI Symptom Checker", "Secure Health Records", "Early Disease Detection"],
      route: "/pat-dashboard",
      gradient: "from-blue-600 via-purple-600 to-pink-600"
    },
    doctor: {
      title: "Advanced Medical Intelligence",
      subtitle: "Access AI-powered diagnostics and secure patient records with blockchain-verified permissions",
      cta: "Access Doctor Portal",
      features: ["AI-Assisted Diagnosis", "Secure Patient Access", "Analytics Dashboard"],
      route: "/doc-dashboard",
      gradient: "from-emerald-600 via-teal-600 to-cyan-600"
    }
  };

  const content = heroContent[userType];
  if (!content) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 pt-20 md:pt-24">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-20 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 -right-40 w-96 h-96 bg-gradient-to-br from-pink-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-500" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full shadow-lg">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Powered by Blockchain & AI
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              <span className={`bg-gradient-to-r ${content.gradient} bg-clip-text text-transparent`}>
                {content.title}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-2xl">
              {content.subtitle}
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              {content.features.map((feature, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium text-gray-800">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to={content.route}>
                <button className={`
                  group relative overflow-hidden
                  px-8 py-4
                  bg-gradient-to-r ${content.gradient}
                  text-white font-semibold text-lg
                  rounded-xl shadow-xl
                  hover:shadow-2xl hover:scale-105
                  transition-all duration-300
                  flex items-center gap-3
                `}>
                  <span className="relative z-10">{content.cta}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
              </Link>

              <button className="
                px-8 py-4
                bg-white border-2 border-gray-300
                text-gray-800 font-semibold text-lg
                rounded-xl shadow-md
                hover:border-gray-400 hover:shadow-lg hover:scale-105
                transition-all duration-200
                flex items-center gap-3
              ">
                <span>Watch Demo</span>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="font-medium">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-600" />
                <span className="font-medium">256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="font-medium">ISO Certified</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative hidden lg:block animate-fade-in-up delay-200">
            <div className="relative">
              {/* Main Card */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-200 transform hover:scale-105 transition-transform duration-500">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 bg-gradient-to-br ${content.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <Activity className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900">Health Dashboard</h3>
                      <p className="text-sm text-gray-500">Real-time monitoring</p>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl border border-blue-200">
                    <Heart className="w-6 h-6 text-blue-600 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">98%</div>
                    <div className="text-xs text-gray-600">Health Score</div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-2xl border border-emerald-200">
                    <TrendingUp className="w-6 h-6 text-emerald-600 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">24/7</div>
                    <div className="text-xs text-gray-600">AI Support</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl border border-purple-200">
                    <Brain className="w-6 h-6 text-purple-600 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">99.2%</div>
                    <div className="text-xs text-gray-600">Accuracy</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-2xl border border-pink-200">
                    <Shield className="w-6 h-6 text-pink-600 mb-2" />
                    <div className="text-2xl font-bold text-gray-900">100%</div>
                    <div className="text-xs text-gray-600">Secure</div>
                  </div>
                </div>

                {/* Activity Chart Placeholder */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-700">Activity Trend</span>
                    <Zap className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div className="flex items-end justify-between gap-2 h-24">
                    {[40, 65, 45, 80, 60, 95, 75].map((height, i) => (
                      <div
                        key={i}
                        className={`flex-1 bg-gradient-to-t ${content.gradient} rounded-t-lg opacity-80 hover:opacity-100 transition-opacity cursor-pointer`}
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-200 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Verified</div>
                    <div className="text-xs text-gray-500">Blockchain Secured</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-200 animate-float delay-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Private</div>
                    <div className="text-xs text-gray-500">End-to-End Encrypted</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-300 {
          animation-delay: 300ms;
        }

        .delay-500 {
          animation-delay: 500ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }

        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </section>
  );
};

/* ============================================
   FEATURES GRID - Key feature showcase
   ============================================ */
export const FeaturesGrid = ({ userType }) => {
  const patientFeatures = [
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "AI Health Assistant",
      description: "Multilingual symptom checker with intelligent disease prediction",
      color: "from-blue-500 to-blue-600",
      borderColor: "border-blue-200",
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Secure Health Vault",
      description: "Your medical records encrypted and stored on blockchain",
      color: "from-emerald-500 to-emerald-600",
      borderColor: "border-emerald-200",
      bgColor: "from-emerald-50 to-emerald-100"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Early Detection",
      description: "AI-powered analysis of X-rays, MRIs, and lab reports",
      color: "from-purple-500 to-purple-600",
      borderColor: "border-purple-200",
      bgColor: "from-purple-50 to-purple-100"
    },
    {
      icon: <Fingerprint className="w-8 h-8" />,
      title: "Health Passport",
      description: "Universal health identity as a secure digital passport",
      color: "from-pink-500 to-pink-600",
      borderColor: "border-pink-200",
      bgColor: "from-pink-50 to-pink-100"
    }
  ];

  const doctorFeatures = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Patient Management",
      description: "Secure access to patient records with permission-based system",
      color: "from-cyan-500 to-cyan-600",
      borderColor: "border-cyan-200",
      bgColor: "from-cyan-50 to-cyan-100"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Diagnostics",
      description: "Advanced AI models to assist in medical diagnosis",
      color: "from-indigo-500 to-indigo-600",
      borderColor: "border-indigo-200",
      bgColor: "from-indigo-50 to-indigo-100"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Blockchain Security",
      description: "Tamper-proof medical records with complete audit trail",
      color: "from-emerald-500 to-emerald-600",
      borderColor: "border-emerald-200",
      bgColor: "from-emerald-50 to-emerald-100"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Smart Analytics",
      description: "Real-time insights and health trend analysis",
      color: "from-purple-500 to-purple-600",
      borderColor: "border-purple-200",
      bgColor: "from-purple-50 to-purple-100"
    }
  ];

  const features = userType === 'patient' ? patientFeatures : doctorFeatures;

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Features</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            {userType === 'patient' ? 'Empowering Your Health Journey' : 'Advanced Medical Tools'}
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            {userType === 'patient' 
              ? 'Experience the future of healthcare with AI-powered insights and blockchain security'
              : 'Leverage cutting-edge technology to provide better patient care and outcomes'
            }
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-transparent hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Gradient Border Effect (shows on hover) */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl`} />
              
              {/* Icon Container */}
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border ${feature.borderColor}`}>
                <div className={`bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`}>
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-900">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Learn More Link */}
              <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-gray-400 group-hover:text-blue-600 transition-colors">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
            <span>Explore All Features</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

/* ============================================
   STATS SECTION - Key metrics showcase
   ============================================ */
export const StatsSection = ({ userType }) => {
  const patientStats = [
    { number: '99.2%', label: 'Accuracy Rate', icon: <Target className="w-6 h-6" />, color: 'from-blue-500 to-blue-600' },
    { number: '24/7', label: 'AI Availability', icon: <Clock className="w-6 h-6" />, color: 'from-emerald-500 to-emerald-600' },
    { number: '100%', label: 'Data Privacy', icon: <Lock className="w-6 h-6" />, color: 'from-purple-500 to-purple-600' },
    { number: '50+', label: 'Languages Supported', icon: <Globe className="w-6 h-6" />, color: 'from-pink-500 to-pink-600' }
  ];

  const doctorStats = [
    { number: '10,000+', label: 'Patients Served', icon: <Users className="w-6 h-6" />, color: 'from-cyan-500 to-cyan-600' },
    { number: '95%', label: 'Diagnostic Accuracy', icon: <Brain className="w-6 h-6" />, color: 'from-indigo-500 to-indigo-600' },
    { number: '50%', label: 'Time Saved', icon: <Clock className="w-6 h-6" />, color: 'from-emerald-500 to-emerald-600' },
    { number: '100%', label: 'Secure Access', icon: <Shield className="w-6 h-6" />, color: 'from-purple-500 to-purple-600' }
  ];

  const stats = userType === 'patient' ? patientStats : doctorStats;

  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105"
            >
              {/* Icon */}
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>

              {/* Number */}
              <div className="text-4xl lg:text-5xl font-extrabold text-white mb-2">
                {stat.number}
              </div>

              {/* Label */}
              <div className="text-blue-200 font-medium">
                {stat.label}
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10`} />
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span className="text-white font-medium">SOC 2 Certified</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium">HIPAA Compliant</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              <span className="text-white font-medium">ISO 27001</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================
   CTA SECTION - Call to action
   ============================================ */
export const CTASection = ({ userType }) => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full blur-3xl" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 rounded-full shadow-md mb-6">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold text-blue-700">Get Started Today</span>
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
          {userType === 'patient' ? 'Take Control of Your Health Today' : 'Join the Medical Revolution'}
        </h2>

        {/* Description */}
        <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
          {userType === 'patient' 
            ? 'Start your journey towards better health with AI-powered insights and secure data management'
            : 'Enhance your practice with advanced AI tools and secure patient data management'
          }
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
            <span>{userType === 'patient' ? 'Get Started Free' : 'Request Demo'}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-800 font-semibold text-lg rounded-xl shadow-md hover:border-gray-400 hover:shadow-lg hover:scale-105 transition-all duration-200">
            Contact Sales
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>Free 30-day trial</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================
   FOOTER - Site footer
   ============================================ */
export const Footer = () => {
  const footerSections = [
    {
      title: 'Platform',
      links: [
        { label: 'AI Diagnosis', href: '#' },
        { label: 'Health Records', href: '#' },
        { label: 'Symptom Checker', href: '#' },
        { label: 'Doctor Portal', href: '#' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'API Reference', href: '#' },
        { label: 'Help Center', href: '#' },
        { label: 'Blog', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Contact', href: '#' },
        { label: 'Partners', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'HIPAA Compliance', href: '#' },
        { label: 'Security', href: '#' }
      ]
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <span className="text-2xl font-bold">MedLink AI</span>
                <p className="text-sm text-blue-200">Healthcare Reimagined</p>
              </div>
            </div>
            <p className="text-blue-200 leading-relaxed">
              Revolutionizing healthcare with AI and blockchain technology for better patient outcomes and secure data management.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {['twitter', 'linkedin', 'github', 'facebook'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 hover:border-white/30 transition-all duration-200 hover:scale-110"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-white/60 rounded" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-blue-200 hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Newsletter Section */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="font-bold text-lg mb-2">Stay Updated</h3>
            <p className="text-blue-200 text-sm mb-4">Get the latest healthcare insights delivered to your inbox.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-blue-200 text-sm">
            &copy; 2025 MedLink AI. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-blue-200">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-400" />
              <span className="text-blue-200">SSL Secured</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-400" />
              <span className="text-blue-200">ISO Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};