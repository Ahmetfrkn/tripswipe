"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ALL_COUNTRIES = ["France", "Italy", "Spain", "Germany", "Turkey"];

export default function Home() {
  const router = useRouter();
  const [selectedCountries, setSelectedCountries] = useState<string[]>(["France"]);
  const [days, setDays] = useState("5");

  const toggleCountry = (country: string) => {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  };

  const handleStart = () => {
    if (selectedCountries.length === 0) {
      alert("Please select at least one country.");
      return;
    }

    const countriesParam = selectedCountries.join(",");
    const url = `/swipe?countries=${encodeURIComponent(
      countriesParam
    )}&days=${days}`;

    router.push(url);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-rose-50 to-emerald-100 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-sky-100 p-8">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-extrabold text-sky-800 mb-2 tracking-tight">
            TripSwipe
          </h1>
          <p className="text-slate-600">
            Pick your dream countries and trip duration. We will turn your
            choices into a unique travel experience.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-slate-700 mb-2">
              Select countries
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {ALL_COUNTRIES.map((country) => (
                <button
                  key={country}
                  type="button"
                  onClick={() => toggleCountry(country)}
                  className={`text-sm rounded-full px-3 py-2 border transition ${
                    selectedCountries.includes(country)
                      ? "bg-sky-500 text-white border-sky-500 shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-sky-50"
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-700 mb-2">
              Trip duration
            </h2>
            <select
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            >
              <option value="3">3 days (short escape)</option>
              <option value="5">5 days</option>
              <option value="7">7 days (one week)</option>
              <option value="10">10 days (extended trip)</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleStart}
            className="w-full mt-2 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 text-white font-semibold py-3 shadow-md hover:shadow-lg hover:brightness-110 transition"
          >
            Start swiping ✨
          </button>
        </div>
      </div>
    </main>
  );
}
