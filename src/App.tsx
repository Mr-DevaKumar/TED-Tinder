import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import NetflixNavigation from './components/NetflixNavigation';
import HeroSection from './components/HeroSection';
import TalkCarousel from './components/TalkCarousel';
import { MOCK_TED_TALKS, TOPICS } from './data/mockTedTalks';
import { TedTalk, UserPreferences } from './types';
import { 
  loadPreferences, 
  savePreferences, 
  removeFromFavorites,
  addToFavorites
} from './utils/localStorage';

function AppContent() {
  const [preferences, setPreferences] = useState<UserPreferences>(loadPreferences());
  const [favorites, setFavorites] = useState<TedTalk[]>([]);
  const [featuredTalk, setFeaturedTalk] = useState<TedTalk>(MOCK_TED_TALKS[0]);

  // Load favorites on mount and when preferences change
  useEffect(() => {
    const favoriteTalks = MOCK_TED_TALKS.filter(talk => 
      preferences.favorites.includes(talk.id)
    );
    setFavorites(favoriteTalks);
  }, [preferences.favorites]);

  // Rotate featured talk every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedTalk(prev => {
        const currentIndex = MOCK_TED_TALKS.findIndex(talk => talk.id === prev.id);
        const nextIndex = (currentIndex + 1) % MOCK_TED_TALKS.length;
        return MOCK_TED_TALKS[nextIndex];
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleAddToFavorites = (talk: TedTalk) => {
    addToFavorites(talk.id);
    const updatedPreferences = loadPreferences();
    setPreferences(updatedPreferences);
  };

  const handleRemoveFromFavorites = (talkId: string) => {
    removeFromFavorites(talkId);
    const updatedPreferences = loadPreferences();
    setPreferences(updatedPreferences);
  };

  // Get talks by category
  const getTalksByTopic = (topic: string, limit: number = 10) => {
    return MOCK_TED_TALKS.filter(talk => talk.topic === topic).slice(0, limit);
  };


  // Get trending talks (most viewed)
  const getTrendingTalks = () => {
    return [...MOCK_TED_TALKS]
      .sort((a, b) => parseFloat(b.views.replace(/[^\d.]/g, '')) - parseFloat(a.views.replace(/[^\d.]/g, '')))
      .slice(0, 10);
  };

  // Get recently added talks
  const getRecentTalks = () => {
    return [...MOCK_TED_TALKS]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);
  };

  return (
    <>
      <Helmet>
        <title>TEDinder - Discover TED Talks Like Never Before</title>
        <meta name="description" content="Swipe through TED Talks and discover your next favorite with AI-powered recommendations. The Tinder for TED Talks." />
        <meta name="keywords" content="TED Talks, discovery, AI recommendations, swipe, education, learning" />
        <meta property="og:title" content="TEDinder - Discover TED Talks Like Never Before" />
        <meta property="og:description" content="Swipe through TED Talks and discover your next favorite with AI-powered recommendations." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      
      <div className="min-h-screen bg-black text-white">
        <NetflixNavigation />
        
        <main>
          {/* Hero Section */}
          <HeroSection
            featuredTalk={featuredTalk}
            onAddToFavorites={handleAddToFavorites}
            onRemoveFromFavorites={handleRemoveFromFavorites}
            isFavorite={preferences.favorites.includes(featuredTalk.id)}
          />
          
          {/* Content Rows */}
          <div className="relative z-10 -mt-32 pb-20 pt-20">
            {/* My List */}
            {favorites.length > 0 && (
              <TalkCarousel
                title="My List"
                talks={favorites}
                onAddToFavorites={handleAddToFavorites}
                onRemoveFromFavorites={handleRemoveFromFavorites}
                favorites={preferences.favorites}
                size="large"
              />
            )}
            
            {/* Trending Now */}
            <TalkCarousel
              title="Trending Now"
              talks={getTrendingTalks()}
              onAddToFavorites={handleAddToFavorites}
              onRemoveFromFavorites={handleRemoveFromFavorites}
              favorites={preferences.favorites}
              size="medium"
            />
            
            {/* Recently Added */}
            <TalkCarousel
              title="Recently Added"
              talks={getRecentTalks()}
              onAddToFavorites={handleAddToFavorites}
              onRemoveFromFavorites={handleRemoveFromFavorites}
              favorites={preferences.favorites}
              size="medium"
            />
            
            {/* Technology Talks */}
            <TalkCarousel
              title="Technology & Innovation"
              talks={getTalksByTopic('Technology')}
              onAddToFavorites={handleAddToFavorites}
              onRemoveFromFavorites={handleRemoveFromFavorites}
              favorites={preferences.favorites}
              size="small"
            />
            
            {/* Psychology Talks */}
            <TalkCarousel
              title="Psychology & Human Behavior"
              talks={getTalksByTopic('Psychology')}
              onAddToFavorites={handleAddToFavorites}
              onRemoveFromFavorites={handleRemoveFromFavorites}
              favorites={preferences.favorites}
              size="small"
            />
            
            {/* Business Talks */}
            <TalkCarousel
              title="Business & Leadership"
              talks={getTalksByTopic('Business')}
              onAddToFavorites={handleAddToFavorites}
              onRemoveFromFavorites={handleRemoveFromFavorites}
              favorites={preferences.favorites}
              size="small"
            />
            
            {/* Science Talks */}
            <TalkCarousel
              title="Science & Discovery"
              talks={getTalksByTopic('Science')}
              onAddToFavorites={handleAddToFavorites}
              onRemoveFromFavorites={handleRemoveFromFavorites}
              favorites={preferences.favorites}
              size="small"
            />
          </div>
        </main>
      </div>
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;