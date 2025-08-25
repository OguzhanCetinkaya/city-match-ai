"use client";

import { useState } from "react";
import { MapPin, ExternalLink, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface NeighborhoodCardProps {
  neighborhood: string;
  description: string;
  city: string;
  country: string;
  image?: string;
  mapsLink: string;
  isLeft?: boolean;
}

export default function NeighborhoodCard({
  neighborhood,
  description,
  city,
  country,
  image,
  mapsLink,
  isLeft = true
}: NeighborhoodCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
        {image && !imageError ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            )}
            <Image
              src={image}
              alt={neighborhood}
              fill
              className="object-cover"
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{neighborhood}</h3>
        <p className="text-sm text-gray-500 mb-3">{city}, {country}</p>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <MapPin className="w-4 h-4" />
          View on Maps
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}