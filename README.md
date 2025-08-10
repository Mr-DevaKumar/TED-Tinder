# 🎬 TEDinder - Tinder-style TED Talk Discovery

[![Live Demo](https://img.shields.io/badge/Demo-Vercel-green)](https://tedinder.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

<img src="public/screenshot.png" alt="TEDinder Screenshot" width="400"/>

Discover TED Talks by swiping like Tinder! Save favorites, get AI recommendations, and binge wisdom. Built with React + Firebase.

## ✨ Features

- **Tinder-like swipe interface** for TED Talks
- **AI-powered recommendations** after 10 swipes
- **Topic filtering** (Technology, Psychology, etc.)
- **Save favorites** to your personal library
- **Dark/Light mode** toggle
- **Debate Mode**: Swipe on opposing viewpoints

## 🛠 Tech Stack

- **Frontend**: React.js (Vite), Framer Motion
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Database**: Firebase Firestore (free tier)
- **APIs**: 
  - YouTube Data API (TED Talks)
  - OpenAI API (recommendations - optional)

## 🚀 Quick Start

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/tedinder.git
   cd tedinder
Install dependencies

bash
npm install
Set up environment variables
Create .env file:

env
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_YOUTUBE_API_KEY=your_youtube_api_key
# Optional:
VITE_OPENAI_KEY=your_openai_key
Run the development server

bash
npm run dev
Build for production

bash
npm run build
📂 Project Structure
text
tedinder/
├── public/               # Static files
├── src/
│   ├── components/       # React components
│   │   ├── SwipeCard.jsx # Tinder-like card
│   │   ├── Navbar.jsx    # Navigation
│   │   └── ThemeToggle.jsx
│   ├── context/          # State management
│   ├── firebase/         # Firebase config
│   ├── services/         # API calls
│   ├── App.jsx           # Main app
│   └── main.jsx          # Entry point
├── .env.example          # Env template
└── vite.config.js        # Build config
🌐 Deployment
Vercel (Recommended):

Connect your GitHub repo

Add environment variables

Deploy!

Netlify:

bash
npm install -g netlify-cli
netlify deploy
🤝 Contributing
Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
Distributed under the MIT License. See LICENSE for more information.

✉️ Contact
Your Name - @yourtwitter - youremail@example.com

Project Link: https://github.com/yourusername/tedinder

text

### 🎨 Recommended Additions:
1. Add a **screenshot.png** in `/public` folder
2. Create a **LICENSE** file (MIT recommended)
3. For AI features, add an "AI Disclaimer" section

### 🔧 Customization Tips:
- Replace all `yourusername`, API keys, and contact info
- For Firebase setup, you may want to add a link to Firebase docs
- Add more screenshots if you have different views

Would you like me to add any specific sections like:
- Troubleshooting guide?
- Detailed API documentation?
- Roadmap of future features?
