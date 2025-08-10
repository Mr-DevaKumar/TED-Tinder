import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeCard from './SwipeCard';
import { TedTalk } from '../types';
import { addToFavorites, addSwipedTalk } from '../utils/localStorage';

interface SwipeStackProps {
  talks: TedTalk[];
  onSwipeComplete?: (direction: 'left' | 'right', talk: TedTalk) => void;
}

const SwipeStack: React.FC<SwipeStackProps> = ({ talks, onSwipeComplete }) => {
  const [currentTalks, setCurrentTalks] = useState<TedTalk[]>([]);

  useEffect(() => {
    setCurrentTalks(talks.slice(0, 3)); // Show 3 cards in stack
  }, [talks]);

  const handleSwipe = (direction: 'left' | 'right', talk: TedTalk) => {
    // Add to swiped talks
    addSwipedTalk(talk.id);
    
    // Add to favorites if swiped right
    if (direction === 'right') {
      addToFavorites(talk.id);
    }

    // Remove the swiped card and add next one
    const remainingTalks = currentTalks.filter(t => t.id !== talk.id);
    const nextTalkIndex = talks.findIndex(t => t.id === talk.id) + 3;
    const nextTalk = talks[nextTalkIndex];
    
    if (nextTalk && remainingTalks.length < 3) {
      remainingTalks.push(nextTalk);
    }
    
    setCurrentTalks(remainingTalks);
    onSwipeComplete?.(direction, talk);
  };

  if (currentTalks.length === 0) {
    return (
      <div className="relative w-full h-[600px] flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No more talks! 🎉
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            You've gone through all available talks. Check your favorites or adjust your filters!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] max-w-sm mx-auto">
      <AnimatePresence>
        {currentTalks.map((talk, index) => (
          <SwipeCard
            key={talk.id}
            talk={talk}
            onSwipeLeft={(t) => handleSwipe('left', t)}
            onSwipeRight={(t) => handleSwipe('right', t)}
            isTop={index === 0}
            index={index}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SwipeStack;