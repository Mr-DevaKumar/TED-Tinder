import { TedTalk, UserPreferences } from '../types';
import { MOCK_TED_TALKS } from '../data/mockTedTalks';

export class TalkMatchAI {
  private static analyzeUserPreferences(preferences: UserPreferences): Record<string, number> {
    const topicScores: Record<string, number> = {};
    
    // Analyze favorite topics
    preferences.favorites.forEach(favId => {
      const talk = MOCK_TED_TALKS.find(t => t.id === favId);
      if (talk) {
        topicScores[talk.topic] = (topicScores[talk.topic] || 0) + 2;
        
        // Bonus for tags
        talk.tags.forEach(tag => {
          topicScores[tag] = (topicScores[tag] || 0) + 0.5;
        });
      }
    });
    
    // Consider selected topics
    preferences.topics.forEach(topic => {
      topicScores[topic] = (topicScores[topic] || 0) + 1;
    });
    
    return topicScores;
  }

  private static scoreRelevance(talk: TedTalk, preferences: UserPreferences): number {
    const userTopicScores = this.analyzeUserPreferences(preferences);
    let score = 0;
    
    // Topic match
    score += userTopicScores[talk.topic] || 0;
    
    // Tag matches
    talk.tags.forEach(tag => {
      score += (userTopicScores[tag] || 0) * 0.3;
    });
    
    // Popularity bonus (based on views)
    const viewCount = parseFloat(talk.views.replace(/[^\d.]/g, ''));
    if (viewCount > 10) score += 1; // 10M+ views bonus
    if (viewCount > 50) score += 1; // 50M+ views bonus
    
    // Recency bonus
    const talkDate = new Date(talk.date);
    const monthsOld = (Date.now() - talkDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
    if (monthsOld < 6) score += 0.5; // Recent talks bonus
    
    return score;
  }

  public static getRecommendations(
    preferences: UserPreferences, 
    excludeIds: string[] = [],
    limit: number = 5
  ): TedTalk[] {
    // Filter out already seen talks
    const unseenTalks = MOCK_TED_TALKS.filter(
      talk => !preferences.swipedTalks.includes(talk.id) && !excludeIds.includes(talk.id)
    );
    
    // Score and sort talks
    const scoredTalks = unseenTalks
      .map(talk => ({
        talk,
        score: this.scoreRelevance(talk, preferences)
      }))
      .sort((a, b) => b.score - a.score);
    
    return scoredTalks.slice(0, limit).map(item => item.talk);
  }

  public static shouldShowRecommendations(preferences: UserPreferences): boolean {
    return preferences.swipeCount >= 10 && preferences.swipeCount % 10 === 0;
  }

  public static getMatchMessage(preferences: UserPreferences): string {
    const favoriteCount = preferences.favorites.length;
    const swipeCount = preferences.swipeCount;
    
    if (favoriteCount === 0) {
      return "Based on your browsing, here are some talks you might love!";
    } else if (favoriteCount < 3) {
      return `You've liked ${favoriteCount} talk${favoriteCount === 1 ? '' : 's'}. Here are similar ones!`;
    } else {
      return `Great taste! After ${swipeCount} swipes, here are your perfect TalkMatches!`;
    }
  }
}