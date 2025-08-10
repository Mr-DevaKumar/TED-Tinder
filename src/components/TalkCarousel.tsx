import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TalkCard from './TalkCard';
import { TedTalk } from '../types';

interface TalkCarouselProps {
  title: string;
  talks: TedTalk[];
  onAddToFavorites: (talk: TedTalk) => void;
  onRemoveFromFavorites: (talkId: string) => void;
  favorites: string[];
  size?: 'small' | 'medium' | 'large';
}

const TalkCarousel: React.FC<TalkCarouselProps> = ({
  title,
  talks,
  onAddToFavorites,
  onRemoveFromFavorites,
  favorites,
  size = 'medium'
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = size === 'small' ? 200 : size === 'medium' ? 280 : 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (talks.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4 px-4 md:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scroll('left')}
            className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scroll('right')}
            className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight size={16} />
          </motion.button>
        </div>
      </div>
      
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-8 pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {talks.map((talk) => (
          <TalkCard
            key={talk.id}
            talk={talk}
            onAddToFavorites={onAddToFavorites}
            onRemoveFromFavorites={onRemoveFromFavorites}
            isFavorite={favorites.includes(talk.id)}
            size={size}
          />
        ))}
      </div>
    </div>
  );
};

export default TalkCarousel;