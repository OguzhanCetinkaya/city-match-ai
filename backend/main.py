import traceback
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import json
import asyncio
from openai import AsyncOpenAI
import os
from dotenv import load_dotenv
import httpx

load_dotenv()

app = FastAPI(title="CityMatch AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
UNSPLASH_ACCESS_KEY = os.getenv("UNSPLASH_ACCESS_KEY")

class CityMatchRequest(BaseModel):
    city1: str
    country1: str
    city2: str
    country2: str

class NeighborhoodMatch(BaseModel):
    neighborhood1: str
    neighborhood1_description: str
    neighborhood2: str
    neighborhood2_description: str
    similarity_reason: str
    characteristics: List[str]

@app.get("/")
async def root():
    return {"message": "CityMatch AI API", "version": "1.0"}

@app.get("/api/cities")
async def get_cities():
    with open("data/cities.json", "r") as f:
        return json.load(f)

async def get_neighborhood_image(query: str) -> Optional[str]:
    if not UNSPLASH_ACCESS_KEY:
        return None
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://api.unsplash.com/search/photos",
                params={
                    "query": query,
                    "per_page": 1,
                    "orientation": "landscape"
                },
                headers={"Authorization": f"Client-ID {UNSPLASH_ACCESS_KEY}"}
            )
            
            if response.status_code == 200:
                data = response.json()
                if data["results"]:
                    return data["results"][0]["urls"]["regular"]
    except Exception as e:
        print(f"Error fetching image: {e}")
    
    return None

async def generate_neighborhood_matches(city1: str, country1: str, city2: str, country2: str):
    prompt = f"""
    You are an expert in urban geography and city neighborhoods. Match similar neighborhoods between {city1}, {country1} and {city2}, {country2}.
    
    For each match, provide:
    1. The neighborhood name in {city1}
    2. A brief description of that neighborhood
    3. The matching neighborhood name in {city2}
    4. A brief description of that neighborhood
    5. Why they are similar
    6. Key characteristics they share
    
    Find 5-7 meaningful matches based on characteristics like:
    - Demographics and social character
    - Economic status and development
    - Cultural vibe and lifestyle
    - Urban layout and architecture
    - Historical significance
    - Entertainment and nightlife
    - Business and commercial activity
    
    Return as JSON array with this structure:
    [
        {{
            "neighborhood1": "name",
            "neighborhood1_description": "description",
            "neighborhood2": "name", 
            "neighborhood2_description": "description",
            "similarity_reason": "why they match",
            "characteristics": ["characteristic1", "characteristic2", ...]
        }}
    ]
    
    Only return the JSON array, no additional text.
    """
    
    try:
        response = await client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[
                {"role": "system", "content": "You are an expert in urban geography and city neighborhoods."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            stream=True
        )
        
        async for chunk in response:
            if chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content
                
    except Exception as e:
        yield json.dumps({"error": str(e)})

@app.post("/api/match-neighborhoods")
async def match_neighborhoods(request: CityMatchRequest):
    if request.city1 == request.city2 and request.country1 == request.country2:
        raise HTTPException(status_code=400, detail="Please select two different cities")
    
    async def stream_response():
        buffer = ""
        try:
            yield '{"status": "processing", "message": "Analyzing neighborhoods..."}\n'
            
            async for chunk in generate_neighborhood_matches(
                request.city1, request.country1, 
                request.city2, request.country2
            ):
                buffer += chunk
                
                # Clean the buffer - remove markdown code blocks if present
                cleaned_buffer = buffer.strip()
                if cleaned_buffer.startswith("```json"):
                    cleaned_buffer = cleaned_buffer[7:]  # Remove ```json
                if cleaned_buffer.startswith("```"):
                    cleaned_buffer = cleaned_buffer[3:]  # Remove ```
                if cleaned_buffer.endswith("```"):
                    cleaned_buffer = cleaned_buffer[:-3]  # Remove ending ```
                cleaned_buffer = cleaned_buffer.strip()
                
                if cleaned_buffer.startswith("[") and cleaned_buffer.endswith("]"):
                    try:
                        matches = json.loads(cleaned_buffer)
                        
                        for i, match in enumerate(matches):
                            image1_query = f"{match['neighborhood1']} {request.city1}"
                            image2_query = f"{match['neighborhood2']} {request.city2}"
                            
                            match["image1"] = await get_neighborhood_image(image1_query)
                            match["image2"] = await get_neighborhood_image(image2_query)
                            
                            match["maps_link1"] = f"https://www.google.com/maps/search/{match['neighborhood1']}+{request.city1}+{request.country1}"
                            match["maps_link2"] = f"https://www.google.com/maps/search/{match['neighborhood2']}+{request.city2}+{request.country2}"
                            
                            yield json.dumps({"status": "match", "data": match, "index": i}) + "\n"
                            await asyncio.sleep(0.1)
                        
                        yield json.dumps({"status": "complete", "total": len(matches)}) + "\n"
                    except json.JSONDecodeError:
                        pass
                        
        except Exception as e:
            print(f"Error: {e}")
            print(traceback.format_exc())
            yield json.dumps({"status": "error", "message": str(e)}) + "\n"
    
    return StreamingResponse(stream_response(), media_type="text/event-stream")

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}