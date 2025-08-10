export interface TedTalk {
  id: string;
  title: string;
  speaker: string;
  description: string;
  duration: string;
  views: string;
  date: string;
  topic: string;
  thumbnail: string;
  videoUrl: string;
  tags: string[];
}

export interface UserPreferences {
  topics: string[];
  swipedTalks: string[];
  favorites: string[];
  swipeCount: number;
}

export interface SwipeDirection {
  x: number;
  y: number;
}