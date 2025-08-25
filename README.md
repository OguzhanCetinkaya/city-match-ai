# CityMatch AI 🌍🤖

> **A demonstration project for "Building with LLMs: From Prompting to Production" course**

This application showcases how Large Language Models (LLMs) can enable us to build sophisticated applications in hours that would have been impossible or taken months to develop just a few years ago.

## 🎯 Why This Project?

Before LLMs, creating an application that could intelligently match neighborhoods across different cities would require:
- Massive datasets of neighborhood characteristics
- Complex algorithms for similarity matching
- Extensive domain expertise in urban planning
- Months of development time
- Manual curation of thousands of data points

**With LLMs, we built this in just hours!** 🚀

## 🌟 What Does It Do?

CityMatch AI uses GPT-4 to intelligently match similar neighborhoods between any two cities based on:
- Demographics and social character
- Economic status and development
- Cultural vibe and lifestyle
- Urban layout and architecture
- Historical significance
- Entertainment and nightlife
- Business and commercial activity

Try it with San Francisco ↔ Istanbul, New York ↔ London, or Tokyo ↔ Paris!

## 🛠️ Tech Stack Showcase

This project demonstrates modern LLM application development:

- **Backend**: FastAPI (Python) - Simple, fast, production-ready
- **LLM Integration**: OpenAI GPT-4 - State-of-the-art language model
- **Frontend**: Next.js + TypeScript - Modern React framework
- **Streaming**: Real-time responses - Enhanced user experience
- **No Database Required**: LLM as the knowledge base!

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 18+
- OpenAI API Key ([Get one here](https://platform.openai.com/api-keys))
- Unsplash API Key (Optional, [Get one here](https://unsplash.com/developers))

### 1. Clone the Repository

```bash
git clone https://github.com/OguzhanCetinkaya/city-match-ai.git
cd city-match-ai
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env and add your OpenAI API key

# Run the server
uvicorn main:app --reload --port 8000
```

### 3. Frontend Setup (New Terminal)

```bash
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

### 4. Open Your Browser

Navigate to [http://localhost:3000](http://localhost:3000) and start exploring!

## 💡 Key Learning Points for Students

### 1. **LLM as a Data Source**
Instead of building complex databases, we use GPT-4's knowledge about cities and neighborhoods directly.

### 2. **Prompt Engineering in Production**
See `backend/main.py` for how we structure prompts to get consistent, high-quality JSON responses.

### 3. **Streaming Responses**
Learn how to implement real-time streaming from LLMs to create responsive user experiences.

### 4. **Error Handling**
The app gracefully handles edge cases like no matches found or API errors.

### 5. **Modern Full-Stack Architecture**
Clean separation between frontend and backend with type-safe interfaces.

## 📁 Project Structure

```
city-match-ai/
├── backend/                  # FastAPI backend
│   ├── main.py              # Core API with LLM integration
│   ├── requirements.txt     # Python dependencies
│   └── data/cities.json     # Static city data
├── frontend/                 # Next.js frontend
│   ├── app/                 # Next.js app router
│   ├── components/          # React components
│   └── types/               # TypeScript definitions
└── README.md                # You are here!
```

## 🎓 Course Challenges

Want to extend this project? Here are some ideas:

### Beginner
- Add more cities to the selection
- Customize the UI colors and styling
- Add a feature to save favorite matches

### Intermediate
- Implement caching to reduce API calls
- Add user authentication
- Create a comparison history feature

### Advanced
- Switch to a different LLM provider (Anthropic, Cohere, etc.)
- Add multi-language support
- Implement semantic search for specific neighborhood characteristics
- Create an API endpoint for batch comparisons

## 🤔 Questions to Consider

1. **How would you build this without LLMs?** Think about the data collection, algorithms, and time required.

2. **What other "impossible" applications can LLMs enable?** This is just one example - what ideas do you have?

3. **How can we ensure consistency in LLM responses?** Look at the prompt structure and response parsing.

4. **What are the trade-offs?** Consider cost, latency, and accuracy compared to traditional approaches.

## 🐛 Troubleshooting

### "Failed to fetch" error
- Make sure the backend is running on port 8000
- Check that your `.env` file has a valid OpenAI API key

### No matches found
- This is normal for some city pairs that are too different
- Try the suggested combinations in the error message

### Slow responses
- OpenAI API response time varies
- Consider implementing caching for repeated queries

## 📚 Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)

## 🤝 Contributing

This is an educational project. Feel free to:
- Fork and create your own variations
- Submit issues with questions
- Share your improvements with the class

## 📄 License

MIT - Use this for learning, teaching, and building!

---

**Built with ❤️ for "Building with LLMs: From Prompting to Production" course**

*Remember: This app was created in just a few hours using AI assistance. Imagine what you can build!*