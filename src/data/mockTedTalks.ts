import { TedTalk } from '../types';

export const TOPICS = [
  'Technology',
  'Science',
  'Business',
  'Psychology',
  'Design',
  'Education',
  'Health',
  'Environment',
  'Society',
  'Art'
];

export const MOCK_TED_TALKS: TedTalk[] = [
  {
    id: '1',
    title: 'The Future of Artificial Intelligence',
    speaker: 'Fei-Fei Li',
    description: 'Explore how AI will reshape our world and what we need to prepare for the future.',
    duration: '18:42',
    views: '2.1M',
    date: '2024-01-15',
    topic: 'Technology',
    thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://youtu.be/QOKLW5ITEiI?si=vNqHlpmksA8Wwrr5',
    tags: ['artificial intelligence', 'future', 'innovation']
  },
  {
    id: '2',
    title: 'The Power of Vulnerability',
    speaker: 'Brené Brown',
    description: 'A powerful talk about courage, vulnerability, and human connection.',
    duration: '20:19',
    views: '58M',
    date: '2023-12-08',
    topic: 'Psychology',
    thumbnail: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://youtu.be/iCvmsMzlF7o?si=Ym9q1N_Dx8FPOQGD',
    tags: ['vulnerability', 'courage', 'connection']
  },
  {
    id: '3',
    title: 'How Great Leaders Inspire Action',
    speaker: 'Simon Sinek',
    description: 'Discover the golden circle and why some people and organizations are more innovative.',
    duration: '18:04',
    views: '62M',
    date: '2023-11-20',
    topic: 'Business',
    thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://youtu.be/qp0HIF3SfI4?si=IHa9Q4ZfOpHbNmtc',
    tags: ['leadership', 'inspiration', 'business']
  },
  {
    id: '4',
    title: 'The Hidden Power of Social Networks',
    speaker: 'Nicholas Christakis',
    description: 'How your social networks affect everything you feel, think and do.',
    duration: '17:29',
    views: '4.2M',
    date: '2024-02-01',
    topic: 'Society',
    thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://youtu.be/2U-tOghblfE?si=utvjeYxoYj9U4Y2-',
    tags: ['social networks', 'society', 'psychology']
  },
  {
    id: '5',
    title: 'The Puzzle of Motivation',
    speaker: 'Dan Pink',
    description: 'Career analyst Dan Pink examines the puzzle of motivation, starting with a fact that ought to change everything.',
    duration: '18:36',
    views: '28M',
    date: '2023-10-14',
    topic: 'Psychology',
    thumbnail: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://youtu.be/rrkrvAUbU9Y?si=1r90SYfqQecInlI0',
    tags: ['motivation', 'work', 'psychology']
  },
  {
    id: '6',
    title: 'Your Smartphone is Changing Your Brain',
    speaker: 'Tristan Harris',
    description: 'A design thinker breaks down the addictive psychology of social platforms.',
    duration: '17:11',
    views: '5.8M',
    date: '2024-01-22',
    topic: 'Technology',
    thumbnail: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://youtu.be/2ldLwkj4dRc?si=aU9yNAFQYRyunDCC',
    tags: ['technology', 'psychology', 'digital wellness']
  },
  {
    id: '7',
    title: 'The Art of Stress-Free Productivity',
    speaker: 'David Allen',
    description: 'Getting things done without burning out using proven productivity methods.',
    duration: '16:45',
    views: '3.1M',
    date: '2023-12-12',
    topic: 'Business',
    thumbnail: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://youtu.be/CHxhjDPKfbY?si=YKFvTtROkUg-J8K-',
    tags: ['productivity', 'stress', 'organization']
  },
  {
    id: '8',
    title: 'The Science of Happiness',
    speaker: 'Martin Seligman',
    description: 'The father of positive psychology talks about what makes life worth living.',
    duration: '23:42',
    views: '15M',
    date: '2024-02-08',
    topic: 'Psychology',
    thumbnail: 'https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://youtu.be/QlBxRbQqhbU?si=ZYv3pLYOCcBq_DZu',
    tags: ['happiness', 'positive psychology', 'wellbeing']
  },
  {
    id: '9',
    title: 'Climate Change Solutions',
    speaker: 'Greta Thunberg',
    description: 'A young activist\'s call to action for addressing the climate crisis.',
    duration: '11:10',
    views: '12M',
    date: '2023-11-30',
    topic: 'Environment',
    thumbnail: 'https://images.pexels.com/photos/9324314/pexels-photo-9324314.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://youtu.be/tlWuP7wESZw?si=jLKxYLgGwTxGHl7r',
    tags: ['climate change', 'environment', 'activism']
  },
  {
    id: '10',
    title: 'The Future of Work',
    speaker: 'Lynda Gratton',
    description: 'How technology and changing demographics will reshape careers.',
    duration: '19:28',
    views: '6.7M',
    date: '2024-01-05',
    topic: 'Business',
    thumbnail: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://youtu.be/pu-dsxra0ss?si=V7MX_Sh5oiPP9wdl',
    tags: ['future of work', 'careers', 'technology']
  }
];