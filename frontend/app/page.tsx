"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, MapPin, AlertCircle } from "lucide-react";
import CitySelector from "@/components/CitySelector";
import MatchDisplay from "@/components/MatchDisplay";
import { Country, NeighborhoodMatch, StreamResponse } from "@/types";

export default function Home() {
  const [cities, setCities] = useState<Country[]>([]);
  const [city1, setCity1] = useState<{ city: string; country: string }>({ city: "", country: "" });
  const [city2, setCity2] = useState<{ city: string; country: string }>({ city: "", country: "" });
  const [matches, setMatches] = useState<NeighborhoodMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [processingMessage, setProcessingMessage] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:8000/api/cities")
      .then((res) => res.json())
      .then((data) => setCities(data.countries))
      .catch((err) => console.error("Failed to load cities:", err));
  }, []);

  const handleCity1Select = useCallback((city: string, country: string) => {
    setCity1({ city, country });
    setError("");
  }, []);

  const handleCity2Select = useCallback((city: string, country: string) => {
    setCity2({ city, country });
    setError("");
  }, []);

  const handleMatch = async () => {
    if (!city1.city || !city2.city) {
      setError("Please select both cities");
      return;
    }

    if (city1.city === city2.city && city1.country === city2.country) {
      setError("Please select two different cities");
      return;
    }

    setLoading(true);
    setError("");
    setMatches([]);
    setProcessingMessage("Analyzing neighborhoods...");

    try {
      const response = await fetch("http://localhost:8000/api/match-neighborhoods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city1: city1.city,
          country1: city1.country,
          city2: city2.city,
          country2: city2.country,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get matches");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      const newMatches: NeighborhoodMatch[] = [];

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n").filter(line => line.trim());

          for (const line of lines) {
            try {
              const data: StreamResponse = JSON.parse(line);
              
              if (data.status === "processing" && data.message) {
                setProcessingMessage(data.message);
              } else if (data.status === "match" && data.data) {
                newMatches.push(data.data);
                setMatches([...newMatches]);
                setProcessingMessage(`Found ${newMatches.length} matches...`);
              } else if (data.status === "complete") {
                setProcessingMessage("");
              } else if (data.status === "error") {
                throw new Error(data.message || "An error occurred");
              }
            } catch (e) {
              console.error("Error parsing stream:", e);
            }
          }
        }
      }

      if (newMatches.length === 0) {
        setError("No matches found. Try these popular combinations: San Francisco ↔ Istanbul, New York ↔ London, or Tokyo ↔ Paris");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to get neighborhood matches. Please try again.");
    } finally {
      setLoading(false);
      setProcessingMessage("");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center gap-3 mb-4">
            <MapPin className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">CityMatch AI</h1>
          </div>
          <p className="text-xl text-gray-600">
            Discover similar neighborhoods across different cities using AI
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-12"
        >
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <CitySelector
              cities={cities}
              label="First City"
              onCitySelect={handleCity1Select}
              disabled={loading}
            />
            <CitySelector
              cities={cities}
              label="Second City"
              onCitySelect={handleCity2Select}
              disabled={loading}
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-lg">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={handleMatch}
            disabled={loading || !city1.city || !city2.city}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                {processingMessage || "Finding matches..."}
              </span>
            ) : (
              "Find Matching Neighborhoods"
            )}
          </button>
        </motion.div>

        <AnimatePresence>
          {matches.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <MatchDisplay
                matches={matches}
                city1={city1.city}
                country1={city1.country}
                city2={city2.city}
                country2={city2.country}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
