import React from 'react';
import {
  LayoutDashboard,
  Stethoscope,
  FileText,
  Users,
  FolderHeart,
  ShieldCheck,
  UserCog,
  ScanEye,
  Activity,
  ChevronRight
} from 'lucide-react';

const NavigationTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { 
      id: 'dashboard', 
      label: 'Dashboard',
      icon: LayoutDashboard,
      color: 'blue',
      description: 'Your health overview'
    },
    { 
      id: 'symptom-checker', 
      label: 'AI Symptom Checker',
      icon: Stethoscope,
      color: 'emerald',
      description: 'Get instant AI diagnosis'
    },
    { 
      id: 'disease-detection', 
      label: 'Report Analyzer',
      icon: FileText,
      color: 'purple',
      description: 'Analyze medical reports'
    },
    { 
      id: 'doctors', 
      label: 'Find Doctors',
      icon: Users,
      color: 'cyan',
      description: 'Connect with healthcare professionals'
    },
    { 
      id: 'health-records', 
      label: 'Health Records',
      icon: FolderHeart,
      color: 'pink',
      description: 'Secure medical history'
    },
    { 
      id: 'access-requests', 
      label: 'Access Requests',
      icon: ShieldCheck,
      color: 'amber',
      description: 'Manage data permissions'
    },
    { 
      id: 'guardian-management', 
      label: 'Guardian Management',
      icon: UserCog,
      color: 'indigo',
      description: 'Emergency contacts'
    },
    { 
      id: 'image-analyze', 
      label: 'Image Analyzer',
      icon: ScanEye,
      color: 'teal',
      description: 'AI-powered medical imaging'
    }
  ];

  const getColorClasses = (color, isActive) => {
    const colors = {
      blue: {
        active: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30',
        inactive: 'text-blue-700 hover:bg-blue-50 border-blue-200',
        icon: 'text-blue-600',
        iconActive: 'text-white'
      },
      emerald: {
        active: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30',
        inactive: 'text-emerald-700 hover:bg-emerald-50 border-emerald-200',
        icon: 'text-emerald-600',
        iconActive: 'text-white'
      },
      purple: {
        active: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30',
        inactive: 'text-purple-700 hover:bg-purple-50 border-purple-200',
        icon: 'text-purple-600',
        iconActive: 'text-white'
      },
      cyan: {
        active: 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/30',
        inactive: 'text-cyan-700 hover:bg-cyan-50 border-cyan-200',
        icon: 'text-cyan-600',
        iconActive: 'text-white'
      },
      pink: {
        active: 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg shadow-pink-500/30',
        inactive: 'text-pink-700 hover:bg-pink-50 border-pink-200',
        icon: 'text-pink-600',
        iconActive: 'text-white'
      },
      amber: {
        active: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30',
        inactive: 'text-amber-700 hover:bg-amber-50 border-amber-200',
        icon: 'text-amber-600',
        iconActive: 'text-white'
      },
      indigo: {
        active: 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30',
        inactive: 'text-indigo-700 hover:bg-indigo-50 border-indigo-200',
        icon: 'text-indigo-600',
        iconActive: 'text-white'
      },
      teal: {
        active: 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/30',
        inactive: 'text-teal-700 hover:bg-teal-50 border-teal-200',
        icon: 'text-teal-600',
        iconActive: 'text-white'
      }
    };

    return colors[color] || colors.blue;
  };

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white border-b border-gray-200 sticky top-16 md:top-20 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-20 blur-md" />
              <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
                <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-700 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Patient Dashboard
              </h2>
              <p className="text-sm text-gray-600 hidden sm:block">
                Your personalized healthcare control center
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation - Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-3 mb-2">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            const colorClasses = getColorClasses(tab.color, isActive);
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  group relative
                  flex items-center gap-3
                  px-4 py-3
                  rounded-xl
                  border-2
                  transition-all duration-200 ease-in-out
                  transform hover:scale-105 active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  ${isActive 
                    ? colorClasses.active 
                    : `bg-white ${colorClasses.inactive} shadow-sm hover:shadow-md`
                  }
                `}
              >
                {/* Animated Background Effect for Active State */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-shimmer" />
                )}

                {/* Icon */}
                <div className="relative z-10 flex-shrink-0">
                  <Icon 
                    className={`
                      w-5 h-5 
                      transition-transform duration-200
                      ${isActive ? colorClasses.iconActive : colorClasses.icon}
                      ${isActive ? 'animate-pulse' : 'group-hover:scale-110'}
                    `}
                    strokeWidth={2.5}
                  />
                </div>

                {/* Label */}
                <div className="relative z-10 flex-1 text-left">
                  <span className={`
                    text-sm font-semibold block
                    transition-colors duration-200
                  `}>
                    {tab.label}
                  </span>
                  {!isActive && (
                    <span className="text-xs text-gray-500 mt-0.5 hidden xl:block">
                      {tab.description}
                    </span>
                  )}
                </div>

                {/* Active Indicator Arrow */}
                {isActive && (
                  <ChevronRight className="w-4 h-4 text-white animate-bounce-x" strokeWidth={3} />
                )}
              </button>
            );
          })}
        </div>

        {/* Tablet Navigation - 2 Column Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-3 mb-2">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            const colorClasses = getColorClasses(tab.color, isActive);
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  group relative
                  flex items-center gap-3
                  px-4 py-3
                  rounded-xl
                  border-2
                  transition-all duration-200 ease-in-out
                  transform hover:scale-102 active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  ${isActive 
                    ? colorClasses.active 
                    : `bg-white ${colorClasses.inactive} shadow-sm hover:shadow-md`
                  }
                `}
              >
                <Icon 
                  className={`
                    w-5 h-5 flex-shrink-0
                    ${isActive ? colorClasses.iconActive : colorClasses.icon}
                    ${isActive ? 'animate-pulse' : 'group-hover:scale-110'}
                  `}
                  strokeWidth={2.5}
                />
                <span className="text-sm font-semibold flex-1 text-left">
                  {tab.label}
                </span>
                {isActive && (
                  <ChevronRight className="w-4 h-4 text-white" strokeWidth={3} />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile Navigation - Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-2 pb-2 min-w-max">
            {tabs.map(tab => {
              const isActive = activeTab === tab.id;
              const colorClasses = getColorClasses(tab.color, isActive);
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    group relative
                    flex items-center gap-2
                    px-4 py-2.5
                    rounded-lg
                    border-2
                    whitespace-nowrap
                    transition-all duration-200 ease-in-out
                    transform active:scale-95
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    ${isActive 
                      ? colorClasses.active 
                      : `bg-white ${colorClasses.inactive} shadow-sm`
                    }
                  `}
                >
                  <Icon 
                    className={`
                      w-4 h-4
                      ${isActive ? colorClasses.iconActive : colorClasses.icon}
                    `}
                    strokeWidth={2.5}
                  />
                  <span className="text-sm font-semibold">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Tab Description - Mobile Only */}
        <div className="md:hidden mt-3 px-4 py-2 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-700 font-medium">
            {tabs.find(t => t.id === activeTab)?.description}
          </p>
        </div>
      </div>

      {/* Bottom gradient accent line */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500" />

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-bounce-x {
          animation: bounce-x 1s infinite;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Smooth scroll behavior for mobile */
        .overflow-x-auto {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </div>
  );
};

export default NavigationTabs;