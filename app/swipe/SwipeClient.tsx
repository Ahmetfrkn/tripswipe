"use client";

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

type SwipeClientProps = {
  initialCountriesParam: string | undefined;
  initialDaysParam: string | undefined;
};

const CITIES: City[] = [
  { name: "Paris", country: "France", imageUrl: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg" },
  { name: "Lyon", country: "France", imageUrl: "https://images.pexels.com/photos/2082109/pexels-photo-2082109.jpeg" },
  { name: "Nice", country: "France", imageUrl: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg" },

  { name: "Rome", country: "Italy", imageUrl: "https://www.klook.com/destination/c92-rome/" },
  { name: "Florence", country: "Italy", imageUrl: "https://www.travelanddestinations.com/travel-guide-for-visiting-florence/" },
  { name: "Venice", country: "Italy", imageUrl: "https://www.tourissimo.travel/blog/understanding-venices-unique-transportation" },
  { name: "Milan", country: "Italy", imageUrl: "https://www.timeout.com/milan/things-to-do/best-things-to-do-in-milan" },

  { name: "Barcelona", country: "Spain", imageUrl: "https://www.earthtrekkers.com/best-things-to-do-barcelona-spain/" },
  { name: "Madrid", country: "Spain", imageUrl: "https://www.wendyperrin.com/destination/insiders-guide-madrid-spain/" },
  { name: "Seville", country: "Spain", imageUrl: "https://portugal-magik.com/10-best-things-to-do-in-seville-spain/" },

  { name: "Berlin", country: "Germany", imageUrl: "https://www.berlin.de/en/tourism/" },
  { name: "Munich", country: "Germany", imageUrl: "https://www.munich.travel/en" },

  { name: "Istanbul", country: "Turkey", imageUrl: "https://blog.obilet.com/istanbulda-gezilecek-yerler/" },
  { name: "Cappadocia", country: "Turkey", imageUrl: "https://www.independent.co.uk/travel/europe/turkey/best-things-to-do-cappadocia-turkey-b2381370.html" },
  { name: "Antalya", country: "Turkey", imageUrl: "https://www.businessinsider.com/antalya-is-the-fourth-most-visited-city-in-europe-2017-10" },

  { name: "Athens", country: "Greece", imageUrl: "https://images.pexels.com/photos/210307/pexels-photo-210307.jpeg" },
  { name: "Santorini", country: "Greece", imageUrl: "https://images.pexels.com/photos/1796724/pexels-photo-1796724.jpeg" },

  { name: "London", country: "United Kingdom", imageUrl: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg" },
  { name: "Edinburgh", country: "United Kingdom", imageUrl: "https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg" },

  { name: "Amsterdam", country: "Netherlands", imageUrl: "https://images.pexels.com/photos/208733/pexels-photo-208733.jpeg" },

  { name: "Zurich", country: "Switzerland", imageUrl: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg" },
  { name: "Lucerne", country: "Switzerland", imageUrl: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg" },

  { name: "Vienna", country: "Austria", imageUrl: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg" },
  { name: "Salzburg", country: "Austria", imageUrl: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg" },

  { name: "Prague", country: "Czech Republic", imageUrl: "https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg" },

  { name: "Lisbon", country: "Portugal", imageUrl: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg" },
  { name: "Porto", country: "Portugal", imageUrl: "https://images.pexels.com/photos/210205/pexels-photo-210205.jpeg" },

  { name: "New York", country: "United States", imageUrl: "https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg" },
  { name: "Los Angeles", country: "United States", imageUrl: "https://images.pexels.com/photos/462024/pexels-photo-462024.jpeg" },

  { name: "Tokyo", country: "Japan", imageUrl: "https://images.pexels.com/photos/373290/pexels-photo-373290.jpeg" },
  { name: "Kyoto", country: "Japan", imageUrl: "https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg" },
  { name: "Osaka", country: "Japan", imageUrl: "https://images.pexels.com/photos/373290/pexels-photo-373290.jpeg" },

  { name: "Bangkok", country: "Thailand", imageUrl: "https://images.pexels.com/photos/161758/thailand-bangkok-city-water-161758.jpeg" },
  { name: "Phuket", country: "Thailand", imageUrl: "https://images.pexels.com/photos/248771/pexels-photo-248771.jpeg" },

  { name: "Dubai", country: "United Arab Emirates", imageUrl: "https://images.pexels.com/photos/3584826/pexels-photo-3584826.jpeg" },
  { name: "Abu Dhabi", country: "United Arab Emirates", imageUrl: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg" },

  { name: "Bali", country: "Indonesia", imageUrl: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg" },

  { name: "Sydney", country: "Australia", imageUrl: "https://images.pexels.com/photos/2193300/pexels-photo-2193300.jpeg" },
  { name: "Melbourne", country: "Australia", imageUrl: "https://images.pexels.com/photos/447592/pexels-photo-447592.jpeg" },

  { name: "Mexico City", country: "Mexico", imageUrl: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg" },
  { name: "Cancun", country: "Mexico", imageUrl: "https://images.pexels.com/photos/248771/pexels-photo-248771.jpeg" },

  { name: "Cairo", country: "Egypt", imageUrl: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg" },
  { name: "Luxor", country: "Egypt", imageUrl: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg" }
];

type Direction = "left" | "right" | 0;

const cardVariants: Variants = {
  enter: {
    x: 0,
    y: 30,
    opacity: 0,
    scale: 0.97
  },
  center: {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1
  },
  exitLeft: {
    x: -320,
    rotate: -18,
    opacity: 0,
    transition: { duration: 0.25 }
  },
  exitRight: {
    x: 320,
    rotate: 18,
    opacity: 0,
    transition: { duration: 0.25 }
  }
};

const CITY_POIS: Record<string, string[]> = {
  "paris|france": ["Eiffel Tower", "Louvre Museum", "Montmartre"],
  "lyon|france": ["Vieux Lyon", "Notre-Dame de Fourvière"],
  "nice|france": ["Promenade des Anglais", "Vieux Nice"],
  "rome|italy": ["Colosseum", "Trevi Fountain", "Vatican City"],
  "florence|italy": ["Duomo di Firenze", "Uffizi Gallery"],
  "venice|italy": ["Grand Canal", "St. Mark's Square"],
  "milan|italy": ["Duomo di Milano", "Galleria Vittorio Emanuele II"],
  "barcelona|spain": ["Sagrada Família", "Park Güell", "La Rambla"],
  "madrid|spain": ["Plaza Mayor", "Royal Palace of Madrid"],
  "berlin|germany": ["Brandenburg Gate", "Berlin Wall Memorial"],
  "munich|germany": ["Marienplatz", "English Garden"],
  "istanbul|turkey": ["Hagia Sophia", "Blue Mosque", "Grand Bazaar"],
  "cappadocia|turkey": ["Göreme Open-Air Museum", "Fairy chimneys"],
  "antalya|turkey": ["Old Town Kaleiçi", "Konyaaltı Beach"],
  "athens|greece": ["Acropolis of Athens", "Plaka"],
  "santorini|greece": ["Oia village", "Fira"],
  "london|united kingdom": ["Big Ben", "Tower Bridge"],
  "amsterdam|netherlands": ["Canals of Amsterdam", "Dam Square"],
  "prague|czech republic": ["Charles Bridge", "Old Town Square"],
  "lisbon|portugal": ["Belém Tower", "Alfama"],
  "porto|portugal": ["Ribeira", "Dom Luís I Bridge"],
  "new york|united states": ["Times Square", "Central Park"],
  "tokyo|japan": ["Shibuya Crossing", "Tokyo Skytree"],
  "bangkok|thailand": ["Grand Palace", "Wat Arun"],
  "dubai|united arab emirates": ["Burj Khalifa", "Dubai Marina"],
  "bali|indonesia": ["Ubud rice terraces", "Tanah Lot"],
  "sydney|australia": ["Sydney Opera House", "Harbour Bridge"],
  "cairo|egypt": ["Pyramids of Giza", "Egyptian Museum"]
};

function cityKey(name: string, country: string) {
  return `${name.toLowerCase().trim()}|${country.toLowerCase().trim()}`;
}

export default function SwipeClient({
  initialCountriesParam,
  initialDaysParam
}: SwipeClientProps) {
  const countriesParam = initialCountriesParam ?? "";
  const daysParam =
    initialDaysParam && initialDaysParam.trim() !== ""
      ? initialDaysParam
      : "5";

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
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          days: daysNumber,
          cities: likedCities.map((c) => ({
            name: c.name,
            country: c.country
          }))
        })
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

  const uniqueLikedCityKeys = Array.from(
    new Set(likedCities.map((c) => cityKey(c.name, c.country)))
  );

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
                    damping: 20
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
              If this city feels exciting, press the right button to like it. If
              not, press the left button to skip and see the next one.
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
            <h2 className="text-lg font-semibold mb-1">
              Your TripSwipe journey
            </h2>
            {likedCities.length === 0 ? (
              <p>
                You did not like any city yet. You can go back and adjust your
                filters.
              </p>
            ) : (
              <>
                <div className="relative overflow-hidden rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-200 via-emerald-200 to-rose-200 mb-2">
                  <div className="h-36 sm:h-44 w-full opacity-80">
                    <img
                      src="https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg"
                      alt="World map route"
                      className="w-full h-full object-cover mix-blend-multiply"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative w-32 sm:w-40 h-16">
                      <div className="absolute inset-y-1/2 -translate-y-1/2 left-2 right-2 border-dashed border-2 border-red-400 rounded-full opacity-80" />
                      <div className="absolute left-1 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-red-500 shadow-md shadow-red-400" />
                      <div className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-emerald-500 shadow-md shadow-emerald-400" />
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg sm:text-xl animate-bounce">
                        ✈
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-3 text-[10px] sm:text-xs text-sky-900/80 font-medium bg-white/60 rounded-full px-2 py-0.5">
                    Route preview based on your likes
                  </div>
                </div>

                <div>
                  <p className="mb-2 font-medium text-slate-800">
                    You liked these cities:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    {likedCities.map((city) => (
                      <li key={city.name}>
                        <span className="font-semibold">{city.name}</span>{" "}
                        <span className="text-xs text-slate-500">
                          ({city.country})
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-sky-100 space-y-3">
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
                    <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
                  )}

                  {itinerary && (
                    <div className="mt-2 bg-white rounded-2xl border border-slate-200 p-4 max-h-80 overflow-y-auto whitespace-pre-wrap text-xs sm:text-sm leading-relaxed shadow-sm">
                      <h3 className="font-semibold text-sky-800 mb-2 text-sm sm:text-base">
                        Trip route
                      </h3>
                      <p className="font-sans text-slate-800">{itinerary}</p>
                    </div>
                  )}

                  {budget && (
                    <div className="mt-2 bg-sky-50 rounded-2xl border border-sky-100 p-3 text-xs sm:text-sm">
                      <h3 className="font-semibold mb-1 text-sky-900">
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

                  {uniqueLikedCityKeys.length > 0 && (
                    <div className="mt-2 bg-white rounded-2xl border border-emerald-100 p-3 text-xs sm:text-sm">
                      <h3 className="font-semibold mb-1 text-emerald-800">
                        Open in Google Maps
                      </h3>
                      <div className="space-y-2">
                        {uniqueLikedCityKeys.map((key) => {
                          const pois = CITY_POIS[key];
                          if (!pois || pois.length === 0) return null;

                          const [namePart, countryPart] = key
                            .split("|")
                            .map(
                              (s) =>
                                s.charAt(0).toUpperCase() + s.slice(1)
                            );

                          return (
                            <div key={key}>
                              <p className="font-medium text-slate-800 mb-1">
                                {namePart}, {countryPart}
                              </p>
                              <ul className="flex flex-wrap gap-2">
                                {pois.map((place) => {
                                  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                    `${place} ${namePart}`
                                  )}`;
                                  return (
                                    <li key={place}>
                                      <a
                                        href={url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] text-emerald-800 hover:bg-emerald-100 transition"
                                      >
                                        {place}
                                      </a>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
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
