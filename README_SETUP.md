# CityMatch AI

An educational web application that demonstrates LLM integration by matching similar neighborhoods between different cities using AI.

## Features

- 🌍 Compare neighborhoods across 10+ countries and 50+ major cities
- 🤖 AI-powered neighborhood matching using OpenAI GPT-4
- 🖼️ Beautiful image integration from Unsplash
- 🗺️ Direct Google Maps links for each neighborhood
- ⚡ Real-time streaming responses
- 🎠 Smooth carousel navigation through matches
- 📱 Responsive design with loading animations

## Tech Stack

### Backend
- **FastAPI** - Python web framework
- **OpenAI API** - GPT-4 for neighborhood analysis
- **Unsplash API** - Neighborhood images
- **Python 3.8+**

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Vercel AI SDK** - Streaming support

## Setup Instructions

### Prerequisites
- Python 3.8 or higher
- Node.js 18 or higher
- OpenAI API key
- Unsplash API key (optional, for images)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file:
```bash
cp .env.example .env
```

5. Edit `.env` and add your API keys:
```
OPENAI_API_KEY=your_openai_api_key_here
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here  # Optional
```

6. Run the backend server:
```bash
uvicorn main:app --reload --port 8000
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Select a country and city for the first location
3. Select a different country and city for the second location
4. Click "Find Matching Neighborhoods"
5. Browse through the matched neighborhoods using the carousel
6. Click on Google Maps links to explore the actual neighborhoods

## Example City Combinations

Try these combinations for interesting matches:
- San Francisco ↔ Istanbul
- New York ↔ London
- Tokyo ↔ Paris
- Berlin ↔ Melbourne
- Barcelona ↔ Miami

## API Endpoints

### Backend API

- `GET /` - API info
- `GET /api/cities` - Get list of available cities
- `POST /api/match-neighborhoods` - Stream neighborhood matches
- `GET /api/health` - Health check

## Project Structure

```
city-match-ai/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   ├── data/
│   │   └── cities.json      # Available cities data
│   └── .env                 # Environment variables
├── frontend/
│   ├── app/
│   │   └── page.tsx         # Main application page
│   ├── components/
│   │   ├── CitySelector.tsx    # City selection dropdowns
│   │   ├── NeighborhoodCard.tsx # Neighborhood display card
│   │   └── MatchDisplay.tsx    # Carousel for matches
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   └── lib/
│       └── utils.ts         # Utility functions
└── README.md
```

## Environment Variables

### Backend (.env)
- `OPENAI_API_KEY` - Required: Your OpenAI API key
- `UNSPLASH_ACCESS_KEY` - Optional: For neighborhood images

## Troubleshooting

### Backend Issues
- Ensure Python 3.8+ is installed
- Check that all pip packages are installed correctly
- Verify your OpenAI API key is valid and has credits
- Make sure port 8000 is not in use

### Frontend Issues
- Ensure Node.js 18+ is installed
- Clear Next.js cache: `rm -rf .next`
- Check that backend is running on port 8000
- Verify CORS settings if running on different ports

### No Matches Found
- Try popular city combinations listed above
- Ensure cities are from different locations
- Check OpenAI API is working correctly

## Educational Purpose

This application demonstrates:
- How to integrate LLMs into web applications
- Streaming responses from AI models
- Building modern full-stack applications
- Creating engaging user interfaces with AI-generated content
- Handling asynchronous operations and loading states

## License

MIT - This is an educational project for learning purposes.