"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const ALL_COUNTRIES = [
  "France",
  "Italy",
  "Spain",
  "Germany",
  "Turkey",
  "Greece",
  "United Kingdom",
  "Netherlands",
  "Switzerland",
  "Austria",
  "Czech Republic",
  "Portugal",
  "United States",
  "Japan",
  "Thailand",
  "United Arab Emirates",
  "Indonesia",
  "Australia",
  "Mexico",
  "Egypt",
  "Norway",
  "Morocco"
];

export default function HomePage() {
  const router = useRouter();

  const [selectedCountries, setSelectedCountries] = useState<string[]>([
    "France",
    "Italy",
    "Spain"
  ]);
  const [days, setDays] = useState<number>(5);

  const toggleCountry = (country: string) => {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  };

  const handleStart = () => {
    if (selectedCountries.length === 0) {
      alert("Please select at least one country before starting.");
      return;
    }

    const safeDays = Math.max(1, Math.min(21, Number(days) || 5));
    const countriesParam = selectedCountries.join(",");

    const url = `/swipe?countries=${encodeURIComponent(
      countriesParam
    )}&days=${encodeURIComponent(String(safeDays))}`;

    router.push(url);
  };

  const handleMyTrips = () => {
    alert("Saved trip plans will be available here in a future version.");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50 flex items-center justify-center px-4 py-8">
      <div className="relative w-full max-w-6xl bg-white/90 backdrop-blur rounded-3xl shadow-2xl border border-amber-100 overflow-hidden">
        <div className="pointer-events-none select-none">
          <div className="hidden md:block absolute -left-10 top-24 w-40 h-56 rounded-3xl overflow-hidden shadow-lg border border-white/60 bg-slate-200">
            <img
              src="https://images.pexels.com/photos/210307/pexels-photo-210307.jpeg"
              alt="Mountain lake"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:block absolute -left-6 bottom-10 w-40 h-56 rounded-3xl overflow-hidden shadow-lg border border-white/60 bg-slate-200 rotate-[-4deg]">
            <img
              src="https://images.pexels.com/photos/372098/pexels-photo-372098.jpeg"
              alt="Hiker on mountain"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:block absolute -right-10 top-16 w-44 h-60 rounded-3xl overflow-hidden shadow-lg border border-white/60 bg-slate-200 rotate-3">
            <img
              src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg"
              alt="Forest waterfall"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:block absolute -right-6 bottom-8 w-40 h-56 rounded-3xl overflow-hidden shadow-lg border border-white/60 bg-slate-200">
            <img
              src="https://images.pexels.com/photos/386148/pexels-photo-386148.jpeg"
              alt="Niagara waterfall"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.4fr,1fr] gap-8 lg:gap-10 px-5 sm:px-8 py-6 sm:py-8 lg:py-10">
          <div className="space-y-6">
            <header className="flex items-start gap-4">
              <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-amber-400 bg-amber-50 text-amber-700 font-semibold text-xl">
                AF
              </div>
              <div>
                <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-amber-500 font-semibold">
                  Trip Swipe
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                  Welcome back,<span className="text-amber-500"> Ahmet Furkan</span>
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl">
                  Choose the countries you dream about, set your trip length and
                  discover a custom route just by swiping through cities.
                </p>
              </div>
            </header>

            <section className="bg-gradient-to-br from-sky-50 via-emerald-50/60 to-amber-50 border border-sky-100 rounded-2xl shadow-md p-4 sm:p-5 space-y-5">
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-slate-900">
                  Select countries
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-1">
                  Tap to add or remove countries. We will only show cities from
                  the places you choose.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-40 sm:max-h-48 overflow-y-auto pr-1">
                {ALL_COUNTRIES.map((country) => {
                  const active = selectedCountries.includes(country);
                  return (
                    <button
                      key={country}
                      type="button"
                      onClick={() => toggleCountry(country)}
                      className={[
                        "text-xs sm:text-sm rounded-full px-3 py-2 border transition text-left",
                        active
                          ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                          : "bg-white/90 text-slate-700 border-slate-200 hover:bg-sky-50"
                      ].join(" ")}
                    >
                      {country}
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2 border-t border-sky-100">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Trip length
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500">
                    How many days can you travel this time?
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    max={21}
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value) || 1)}
                    className="w-20 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                  <span className="text-sm text-slate-600">days</span>
                </div>
              </div>
            </section>

            <section className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={handleStart}
                className="w-full sm:flex-1 rounded-xl bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 text-white font-semibold py-3 text-sm sm:text-base shadow-md hover:brightness-110 transition"
              >
                Start swiping
              </button>
              <button
                type="button"
                onClick={handleMyTrips}
                className="w-full sm:w-auto rounded-xl border border-slate-200 bg-white/80 text-slate-800 font-medium py-3 px-4 text-xs sm:text-sm hover:bg-slate-50 transition"
              >
                My trip plans
              </button>
            </section>

            <p className="text-[11px] sm:text-xs text-slate-500">
              Selected countries:{" "}
              <span className="font-semibold text-sky-700">
                {selectedCountries.length > 0
                  ? selectedCountries.join(", ")
                  : "none"}
              </span>{" "}
              · Trip length:{" "}
              <span className="font-semibold text-emerald-700">
                {days} days
              </span>
            </p>
          </div>

          <div className="hidden lg:flex flex-col justify-between">
            <div className="bg-white/90 rounded-3xl border border-amber-100 shadow-md p-4 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-500">
                Trip moodboard
              </p>
              <p className="text-sm text-slate-600">
                Mountains, waterfalls, cities and forests. However you like to
                travel, just swipe and let TripSwipe sketch a route for you.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <div className="rounded-2xl overflow-hidden border border-white shadow-sm">
                    <img
                      src="https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg"
                      alt="Eiffel Tower"
                      className="w-full h-28 object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-white shadow-sm">
                    <img
                      src="https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg"
                      alt="Beach cliffs"
                      className="w-full h-28 object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="rounded-2xl overflow-hidden border border-white shadow-sm">
                    <img
                      src="https://images.pexels.com/photos/2346019/pexels-photo-2346019.jpeg"
                      alt="Cappadocia balloons"
                      className="w-full h-28 object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-white shadow-sm">
                    <img
                      src="https://images.pexels.com/photos/386148/pexels-photo-386148.jpeg"
                      alt="Waterfall hiking"
                      className="w-full h-28 object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-2 text-[11px]">
                <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 font-medium">
                  MOUNTAIN
                </span>
                <span className="inline-flex items-center rounded-full bg-sky-100 text-sky-700 px-3 py-1 font-medium">
                  CITY
                </span>
                <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-700 px-3 py-1 font-medium">
                  FOREST
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
