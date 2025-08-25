"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NeighborhoodCard from "./NeighborhoodCard";
import { NeighborhoodMatch } from "@/types";

interface MatchDisplayProps {
  matches: NeighborhoodMatch[];
  city1: string;
  country1: string;
  city2: string;
  country2: string;
}

export default function MatchDisplay({
  matches,
  city1,
  country1,
  city2,
  country2
}: MatchDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (matches.length === 0) {
    return null;
  }

  const currentMatch = matches[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : matches.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < matches.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Neighborhood Matches
        </h2>
        <p className="text-gray-600">
          Match {currentIndex + 1} of {matches.length}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <NeighborhoodCard
              neighborhood={currentMatch.neighborhood1}
              description={currentMatch.neighborhood1_description}
              city={city1}
              country={country1}
              image={currentMatch.image1}
              mapsLink={currentMatch.maps_link1}
              isLeft={true}
            />
            
            <NeighborhoodCard
              neighborhood={currentMatch.neighborhood2}
              description={currentMatch.neighborhood2_description}
              city={city2}
              country={country2}
              image={currentMatch.image2}
              mapsLink={currentMatch.maps_link2}
              isLeft={false}
            />
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-800">Why They Match</h3>
            </div>
            <p className="text-gray-700 mb-4">{currentMatch.similarity_reason}</p>
            
            <div className="flex flex-wrap gap-2">
              {currentMatch.characteristics.map((char, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 shadow-sm"
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center items-center gap-4">
        <button
          onClick={handlePrevious}
          className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Previous match"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        <div className="flex gap-2">
          {matches.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? "bg-blue-600 w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to match ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Next match"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
}