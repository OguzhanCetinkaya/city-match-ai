"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Country } from "@/types";
import { cn } from "@/lib/utils";

interface CitySelectorProps {
  cities: Country[];
  label: string;
  onCitySelect: (city: string, country: string) => void;
  disabled?: boolean;
}

export default function CitySelector({ cities, label, onCitySelect, disabled }: CitySelectorProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  useEffect(() => {
    if (selectedCountry) {
      const country = cities.find(c => c.name === selectedCountry);
      setAvailableCities(country?.cities || []);
      setSelectedCity("");
    }
  }, [selectedCountry, cities]);

  useEffect(() => {
    if (selectedCity && selectedCountry) {
      onCitySelect(selectedCity, selectedCountry);
    }
  }, [selectedCity, selectedCountry, onCitySelect]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">{label}</h3>
      
      <div className="relative">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          disabled={disabled}
          className={cn(
            "w-full px-4 py-3 pr-10 text-base border rounded-lg appearance-none",
            "bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            "disabled:bg-gray-100 disabled:cursor-not-allowed",
            !selectedCountry && "text-gray-400"
          )}
        >
          <option value="">Select Country</option>
          {cities.map((country) => (
            <option key={country.name} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>

      <div className="relative">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedCountry || disabled}
          className={cn(
            "w-full px-4 py-3 pr-10 text-base border rounded-lg appearance-none",
            "bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            "disabled:bg-gray-100 disabled:cursor-not-allowed",
            !selectedCity && "text-gray-400"
          )}
        >
          <option value="">Select City</option>
          {availableCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}