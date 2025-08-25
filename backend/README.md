# CityMatch AI - Backend

This is the FastAPI backend that powers the CityMatch AI application.

## 🚀 Quick Start

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env and add your API keys

# Run the server
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

## 🔑 Environment Variables

Create a `.env` file with:

```env
OPENAI_API_KEY=your_openai_api_key_here
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here  # Optional
```

## 📁 Structure

- `main.py` - FastAPI application with all endpoints
- `data/cities.json` - Static city and country data
- `requirements.txt` - Python dependencies

## 🛠️ API Endpoints

- `GET /` - API information
- `GET /api/cities` - Get available cities and countries
- `POST /api/match-neighborhoods` - Stream neighborhood matches
- `GET /api/health` - Health check

## 💡 Key Features

- **OpenAI GPT-4 Integration** - Intelligent neighborhood matching
- **Streaming Responses** - Real-time data streaming to frontend
- **Image Integration** - Fetches neighborhood images from Unsplash
- **CORS Support** - Configured for frontend communication

## 🎓 For Students

Study `main.py` to learn:
- How to structure prompts for consistent LLM responses
- Implementing streaming with FastAPI
- Error handling in production
- Clean API design patterns
- Working with external APIs (OpenAI, Unsplash)

## 📚 Tech Stack

- FastAPI
- OpenAI Python SDK
- Pydantic for data validation
- HTTPX for async HTTP requests
- Python 3.8+

See the main [README](../README.md) for full project documentation.