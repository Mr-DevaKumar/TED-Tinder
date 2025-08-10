import React from 'react';
import { motion } from 'framer-motion';
import { Home, Heart, Filter, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavigationProps {
  activeTab: 'discover' | 'favorites' | 'filter';
  onTabChange: (tab: 'discover' | 'favorites' | 'filter') => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: 'discover', icon: Home, label: 'Discover' },
    { id: 'favorites', icon: Heart, label: 'Favorites' },
    { id: 'filter', icon: Filter, label: 'Filter' },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 z-40">
      <div className="flex items-center justify-around px-4 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-colors ${
                isActive 
                  ? 'text-red-500 bg-red-50 dark:bg-red-900/20' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Icon size={20} fill={isActive ? 'currentColor' : 'none'} />
              <span className="text-xs font-medium">{item.label}</span>
            </motion.button>
          );
        })}
        
        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="flex flex-col items-center gap-1 p-3 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          <span className="text-xs font-medium">Theme</span>
        </motion.button>
      </div>
    </nav>
  );
};

export default Navigation;