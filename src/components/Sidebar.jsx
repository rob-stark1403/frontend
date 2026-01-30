import React from "react";
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  Calendar, 
  UserCircle, 
  Settings,
  Activity,
  ChevronRight,
  Stethoscope
} from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: LayoutDashboard,
      description: 'Dashboard & Analytics'
    },
    { 
      id: 'patients', 
      label: 'Patients', 
      icon: Users,
      description: 'Manage Patient Records',
      badge: '24'
    },
    { 
      id: 'requests', 
      label: 'Access Requests', 
      icon: ClipboardList,
      description: 'Pending Approvals',
      badge: '3',
      badgeType: 'warning'
    },
    { 
      id: 'appointments', 
      label: 'Appointments', 
      icon: Calendar,
      description: 'Schedule & Visits'
    },
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: UserCircle,
      description: 'Your Information'
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings,
      description: 'Preferences & Security'
    }
  ];

  return (
    <aside className="
      fixed left-0 top-0 bottom-0
      w-72
      bg-gradient-to-b from-white to-gray-50
      border-r border-gray-200
      shadow-xl
      overflow-y-auto
      z-40
      flex flex-col
    ">
      {/* Logo & Branding Section */}
      <div className="
        sticky top-0
        bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700
        px-6 py-6
        border-b-4 border-blue-800
        shadow-lg
      ">
        <div className="flex items-center gap-3 mb-2">
          {/* Medical Logo Icon with Pulse Animation */}
          <div className="relative">
            <div className="absolute inset-0 bg-white/30 rounded-xl blur-md animate-pulse" />
            <div className="relative bg-white/20 backdrop-blur-sm p-3 rounded-xl border border-white/30 shadow-lg">
              <Stethoscope className="w-7 h-7 text-white" strokeWidth={2.5} />
            </div>
          </div>
          
          {/* Brand Text */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              MedLink AI
            </h1>
            <p className="text-xs text-blue-100 font-medium tracking-wide">
              Doctor Portal
            </p>
          </div>
        </div>
        
        {/* Status Indicator */}
        <div className="
          flex items-center gap-2
          mt-4 px-3 py-2
          bg-white/10 backdrop-blur-sm
          border border-white/20
          rounded-lg
        ">
          <div className="relative">
            <Activity className="w-4 h-4 text-emerald-300" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full" />
          </div>
          <span className="text-sm text-white font-medium">
            System Online
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                group
                relative w-full
                flex items-center gap-3
                px-4 py-3.5
                rounded-xl
                font-medium text-sm
                transition-all duration-200 ease-in-out
                ${isActive 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02]' 
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 hover:shadow-md hover:scale-[1.01]'
                }
                ${!isActive && 'hover:border-l-4 hover:border-blue-500'}
              `}
            >
              {/* Active Indicator Bar */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg" />
              )}
              
              {/* Icon */}
              <div className={`
                flex-shrink-0
                ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'}
                transition-colors duration-200
              `}>
                <Icon className="w-5 h-5" strokeWidth={2.5} />
              </div>
              
              {/* Label & Description */}
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold truncate">
                    {item.label}
                  </span>
                  
                  {/* Badge */}
                  {item.badge && (
                    <span className={`
                      flex items-center justify-center
                      min-w-[20px] h-5 px-1.5
                      text-xs font-bold
                      rounded-full
                      ${isActive 
                        ? 'bg-white/20 text-white border border-white/30' 
                        : item.badgeType === 'warning'
                          ? 'bg-amber-100 text-amber-700 border border-amber-200'
                          : 'bg-blue-100 text-blue-700 border border-blue-200'
                      }
                      shadow-sm
                    `}>
                      {item.badge}
                    </span>
                  )}
                </div>
                
                {/* Description (only show when not active for cleaner look) */}
                {!isActive && (
                  <p className="text-xs text-gray-500 mt-0.5 truncate">
                    {item.description}
                  </p>
                )}
              </div>
              
              {/* Chevron Icon */}
              <ChevronRight 
                className={`
                  w-4 h-4 flex-shrink-0
                  transition-all duration-200
                  ${isActive 
                    ? 'text-white translate-x-0 opacity-100' 
                    : 'text-gray-400 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                  }
                `}
              />
            </button>
          );
        })}
      </nav>

      {/* Bottom Section - Doctor Info Card */}
      <div className="
        sticky bottom-0
        mt-auto
        p-4
        bg-gradient-to-t from-white to-transparent
        border-t border-gray-200
      ">
        <div className="
          flex items-center gap-3
          p-4
          bg-gradient-to-br from-blue-50 to-purple-50
          border border-blue-200
          rounded-xl
          shadow-md
          hover:shadow-lg
          transition-all duration-200
          cursor-pointer
          group
        ">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="
              w-12 h-12
              bg-gradient-to-br from-blue-600 to-purple-600
              rounded-full
              flex items-center justify-center
              text-white font-bold text-lg
              shadow-lg
              border-2 border-white
            ">
              👨‍⚕️
            </div>
            {/* Online Status Indicator */}
            <div className="absolute -bottom-0.5 -right-0.5">
              <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
            </div>
          </div>
          
          {/* Doctor Info */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">
              Dr. Smith
            </p>
            <p className="text-xs text-gray-600 truncate">
              Cardiologist
            </p>
          </div>
          
          {/* Settings Icon */}
          <Settings className="
            w-5 h-5 text-gray-400
            group-hover:text-blue-600 group-hover:rotate-90
            transition-all duration-300
          " />
        </div>

        {/* Version/Copyright */}
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-400">
            MedLink AI v2.0
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            © 2025 Healthcare DApp
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;