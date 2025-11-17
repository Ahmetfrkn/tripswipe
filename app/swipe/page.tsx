"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

type City = {
  name: string;
  country: string;
  imageUrl: string;
};

type Budget = {
  transport: number;
  lodging: number;
  food: number;
  total: number;
};

const CITIES: City[] = [
  {
    name: "Paris",
    country: "France",
    imageUrl:
      "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg",
  },
  {
    name: "Lyon",
    country: "France",
    imageUrl:
      "https://images.pexels.com/photos/2082109/pexels-photo-2082109.jpeg",
  },
  {
    name: "Nice",
    country: "France",
    imageUrl:
      "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg",
  },
  {
    name: "Rome",
    country: "Italy",
    imageUrl:
      "https://images.pexels.com/photos/2082106/pexels-photo-2082106.jpeg",
  },
  {
    name: "Florence",
    country: "Italy",
    imageUrl:
      "https://images.pexels.com/photos/533953/pexels-photo-533953.jpeg",
  },
  {
    name: "Milan",
    country: "Italy",
    imageUrl:
      "https://images.pexels.com/photos/1796715/pexels-photo-1796715.jpeg",
  },
  {
    name: "Barcelona",
    country: "Spain",
    imageUrl:
      "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg",
  },
  {
    name: "Madrid",
    country: "Spain",
    imageUrl:
      "https://images.pexels.com/photos/951539/pexels-photo-951539.jpeg",
  },
  {
    name: "Berlin",
    country: "Germany",
    imageUrl:
      "https://images.pexels.com/photos/462867/pexels-photo-462867.jpeg",
  },
  {
    name: "Munich",
    country: "Germany",
    imageUrl:
      "https://images.pexels.com/photos/258136/pexels-photo-258136.jpeg",
  },
  {
    name: "Istanbul",
    country: "Turkey",
    imageUrl:
      "https://images.pexels.com/photos/236798/pexels-photo-236798.jpeg",
  },
  {
    name: "Cappadocia",
    country: "Turkey",
    imageUrl:
      "https://images.pexels.com/photos/2346019/pexels-photo-2346019.jpeg",
  },
];

type Direction = "left" | "right" | 0;

const cardVariants: Variants = {
  enter: {
    x: 0,
    y: 30,
    opacity: 0,
    scale: 0.97,
  },
  center: {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
  },
  exitLeft: {
    x: -320,
    rotate: -18,
    opacity: 0,
    transition: { duration: 0.25 },
  },
  exitRight: {
    x: 320,
    rotate: 18,
    opacity: 0,
    transition: { duration: 0.25 },
  },
};

export default function SwipePage() {
  const searchParams = useSearchParams();

  const countriesParam = searchParams.get("countries") ?? "";
  const daysParam = searchParams.get("days") ?? "5";

  const selectedCountries = countriesParam
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);

  const filteredCities =
    selectedCountries.length > 0
      ? CITIES.filter((city) => selectedCountries.includes(city.country))
      : CITIES;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCities, setLikedCities] = useState<City[]>([]);
  const [direction, setDirection] = useState<Direction>(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<string | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentCity =
    currentIndex < filteredCities.length ? filteredCities[currentIndex] : null;

  const swipe = (dir: Direction) => {
    if (!currentCity) return;

    setDirection(dir);

    setTimeout(() => {
      if (dir === "right") {
        setLikedCities((prev) => [...prev, currentCity]);
      }
      setCurrentIndex((prev) => prev + 1);
      setDirection(0);
    }, 250);
  };

  const handleSkip = () => {
    if (!currentCity || direction !== 0) return;
    swipe("left");
  };

  const handleLike = () => {
    if (!currentCity || direction !== 0) return;
    swipe("right");
  };

  const handleGenerateItinerary = async () => {
    if (likedCities.length === 0 || isGenerating) return;

    setIsGenerating(true);
    setErrorMessage(null);
    setItinerary(null);
    setBudget(null);

    try {
      const daysNumber = Number(daysParam) || 5;

      const response = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          days: daysNumber,
          cities: likedCities.map((c) => ({
            name: c.name,
            country: c.country,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      setItinerary(data.itinerary ?? "No itinerary returned.");
      if (data.budget) {
        setBudget(data.budget as Budget);
      }
    } catch (err) {
      setErrorMessage(
        "Something went wrong while generating the trip plan. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-rose-50 flex items-center justify-center px-3 py-6 sm:px-4 sm:py-10">
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-sky-100 p-4 sm:p-8">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-sky-800">
            TripSwipe
          </h1>
          <Link
            href="/"
            className="text-xs sm:text-sm rounded-full px-3 py-1 bg-sky-100 text-sky-700 border border-sky-200 hover:bg-sky-200 transition"
          >
            Back to filters
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-5 text-xs sm:text-sm">
          <div className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 border border-sky-200">
            Countries:{" "}
            <span className="font-semibold">
              {selectedCountries.length > 0
                ? selectedCountries.join(", ")
                : "none selected"}
            </span>
          </div>
          <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
            Duration: <span className="font-semibold">{daysParam} days</span>
          </div>
          <div className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
            City {Math.min(currentIndex + 1, filteredCities.length)} of{" "}
            {filteredCities.length}
          </div>
        </div>

        {filteredCities.length === 0 && (
          <p className="text-center text-sm text-slate-600">
            No cities found for the selected countries.
          </p>
        )}

        {currentCity ? (
          <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 sm:p-5 shadow-sm">
            <div className="relative mb-4 h-[60vh] sm:h-80 md:h-96 lg:h-[420px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCity.name}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit={direction === "left" ? "exitLeft" : "exitRight"}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className="absolute inset-0 overflow-hidden rounded-3xl bg-slate-200 shadow-md"
                >
                  <img
                    src={currentCity.imageUrl}
                    alt={currentCity.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                  {currentCity.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  {currentCity.country}
                </p>
              </div>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-500 mb-4">
              If this city feels exciting, press the right button to like it.
              If not, press the left button to skip and see the next one.
            </p>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleSkip}
                disabled={direction !== 0}
                className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-sm sm:text-base text-slate-700 font-semibold hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                ⬅ Skip
              </button>
              <button
                type="button"
                onClick={handleLike}
                disabled={direction !== 0}
                className="flex-1 rounded-xl bg-gradient-to-r from-rose-500 to-amber-400 text-white font-semibold py-3 text-sm sm:text-base shadow-md hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Like ➡
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 shadow-sm text-sm text-slate-700 space-y-4">
            <h2 className="text-lg font-semibold">You reviewed all cities</h2>
            {likedCities.length === 0 ? (
              <p>
                You did not like any city yet. You can go back and adjust your
                filters.
              </p>
            ) : (
              <>
                <div>
                  <p className="mb-2">
                    You liked these cities based on your swipes:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {likedCities.map((city) => (
                      <li key={city.name}>
                        {city.name} ({city.country})
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-sky-100">
                  <button
                    type="button"
                    onClick={handleGenerateItinerary}
                    disabled={isGenerating}
                    className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-semibold py-3 text-sm sm:text-base shadow-md hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {isGenerating
                      ? "Generating trip plan..."
                      : "Generate trip plan"}
                  </button>

                  {errorMessage && (
                    <p className="mt-2 text-xs text-red-500">
                      {errorMessage}
                    </p>
                  )}

                  {itinerary && (
                    <div className="mt-4 bg-white rounded-xl border border-slate-200 p-4 max-h-80 overflow-y-auto whitespace-pre-wrap text-xs sm:text-sm">
                      {itinerary}
                    </div>
                  )}

                  {budget && (
                    <div className="mt-4 bg-sky-50 rounded-xl border border-sky-100 p-3 text-xs sm:text-sm">
                      <h3 className="font-semibold mb-1">
                        Estimated budget (rough, in EUR)
                      </h3>
                      <ul className="space-y-1">
                        <li>
                          Transport:{" "}
                          <span className="font-semibold">
                            €{budget.transport.toFixed(0)}
                          </span>
                        </li>
                        <li>
                          Accommodation:{" "}
                          <span className="font-semibold">
                            €{budget.lodging.toFixed(0)}
                          </span>
                        </li>
                        <li>
                          Food & drinks:{" "}
                          <span className="font-semibold">
                            €{budget.food.toFixed(0)}
                          </span>
                        </li>
                        <li className="pt-1 border-t border-slate-200">
                          Total:{" "}
                          <span className="font-semibold">
                            €{budget.total.toFixed(0)}
                          </span>
                        </li>
                      </ul>
                      <p className="mt-1 text-[10px] text-slate-500">
                        These numbers are only rough estimates and can change
                        based on travel season, hotel choice and personal
                        spending.
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
