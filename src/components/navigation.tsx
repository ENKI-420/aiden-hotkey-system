import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Activity, Home, LogIn, Users } from 'lucide-react';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-cyan-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Activity className="h-8 w-8 text-cyan-600" />
          <span className="text-xl font-bold text-cyan-900">Norton Oncology Hub</span>
        </div>
        
        <div className="hidden gap-8 md:flex">
          {[
            { name: 'Home', href: '/', icon: Home },
            { name: 'Dashboard', href: '/dashboard', icon: Activity },
            { name: 'Patients', href: '/patients', icon: Users },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'group flex items-center gap-2 text-sm font-medium text-gray-700 transition-colors hover:text-cyan-600',
                location.pathname === item.href && 'text-cyan-600'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
              {location.pathname === item.href && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-[1.5px] left-0 h-0.5 w-full bg-cyan-600"
                  initial={false}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700 transition-colors hover:bg-cyan-100"
          >
            <LogIn className="h-4 w-4" />
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;