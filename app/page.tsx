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
  "Egypt"
];

export default function HomePage() {
  const router = useRouter();

  const [selectedCountries, setSelectedCountries] = useState<string[]>([
    "France",
    "Italy"
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
    const safeDays = Math.max(1, Math.min(21, Number(days) || 5));
    const countriesParam = selectedCountries.join(",");

    const url =
      selectedCountries.length > 0
        ? `/swipe?countries=${encodeURIComponent(
            countriesParam
          )}&days=${encodeURIComponent(String(safeDays))}`
        : `/swipe?days=${encodeURIComponent(String(safeDays))}`;

    router.push(url);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-rose-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-sky-100 p-6 sm:p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-sky-800 mb-2">
            TripSwipe
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Pick the countries you are interested in, choose how many days you
            have, then swipe through cities like a travel Tinder.
          </p>
        </div>

        <section className="mb-6">
          <h2 className="text-sm font-semibold text-slate-800 mb-2">
            Select countries
          </h2>
          <p className="text-xs text-slate-500 mb-3">
            You can choose one or more countries. The swipe screen will only
            show cities from these countries.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto pr-1">
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
                      ? "bg-sky-500 text-white border-sky-500 shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-sky-50"
                  ].join(" ")}
                >
                  {country}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-sm font-semibold text-slate-800 mb-2">
            Trip length
          </h2>
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
          <p className="mt-1 text-[11px] text-slate-500">
            The itinerary generator will always respect this total number of
            days, even if you like many cities.
          </p>
        </section>

        <section className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={handleStart}
            className="w-full sm:flex-1 rounded-xl bg-gradient-to-r from-rose-500 to-amber-400 text-white font-semibold py-3 text-sm sm:text-base shadow-md hover:brightness-110 transition"
          >
            Start swiping
          </button>
          <div className="text-[11px] sm:text-xs text-slate-500 text-center sm:text-left">
            Selected countries:{" "}
            <span className="font-semibold text-sky-700">
              {selectedCountries.length > 0
                ? selectedCountries.join(", ")
                : "none (all cities will be shown)"}
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
