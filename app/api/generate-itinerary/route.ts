import { NextResponse } from "next/server";

type CityRequest = {
  name: string;
  country: string;
};

type CityMeta = {
  weight: number;
  dailyCosts: {
    transport: number;
    lodging: number;
    food: number;
  };
  highlights: string[];
  shortTitleIdeas: string[];
};

const CITY_DATA: Record<string, CityMeta> = {
  "paris|france": {
    weight: 3,
    dailyCosts: { transport: 40, lodging: 130, food: 60 },
    highlights: [
      "Visit the Eiffel Tower and enjoy the city view.",
      "Walk around the Louvre and its surroundings.",
      "Stroll through Montmartre and see Sacré-Cœur.",
      "Relax along the Seine River at sunset."
    ],
    shortTitleIdeas: [
      "Iconic landmarks and first impressions",
      "Art, museums and river walks",
      "Hidden streets and café culture",
      "Romantic views and night lights"
    ]
  },
  "lyon|france": {
    weight: 1,
    dailyCosts: { transport: 25, lodging: 90, food: 45 },
    highlights: [
      "Explore Vieux Lyon (Old Town).",
      "Walk up to the Basilica of Notre-Dame de Fourvière.",
      "Try traditional bouchon restaurants.",
      "Enjoy the views along the Rhône and Saône rivers."
    ],
    shortTitleIdeas: [
      "Old town and local food",
      "City views and riverside walks"
    ]
  },
  "nice|france": {
    weight: 1,
    dailyCosts: { transport: 25, lodging: 110, food: 50 },
    highlights: [
      "Walk along the Promenade des Anglais.",
      "Relax at the pebble beaches.",
      "Explore the old town (Vieux Nice).",
      "Take a short trip to nearby coastal villages."
    ],
    shortTitleIdeas: [
      "Seaside views and promenade",
      "Old town and coastal vibes"
    ]
  },
  "rome|italy": {
    weight: 3,
    dailyCosts: { transport: 35, lodging: 120, food: 55 },
    highlights: [
      "Visit the Colosseum and Roman Forum.",
      "See the Pantheon and Piazza Navona.",
      "Throw a coin into Trevi Fountain.",
      "Explore the Vatican Museums and St. Peter’s Basilica."
    ],
    shortTitleIdeas: [
      "Ancient history and first walk",
      "Fountains, squares and local life",
      "Vatican and spiritual landmarks"
    ]
  },
  "florence|italy": {
    weight: 2,
    dailyCosts: { transport: 30, lodging: 100, food: 50 },
    highlights: [
      "Visit the Duomo and climb the dome.",
      "See famous art at the Uffizi Gallery.",
      "Walk across Ponte Vecchio.",
      "Enjoy sunset views from Piazzale Michelangelo."
    ],
    shortTitleIdeas: [
      "Renaissance heart and city walk",
      "Art, bridges and views"
    ]
  },
  "milan|italy": {
    weight: 1,
    dailyCosts: { transport: 30, lodging: 115, food: 55 },
    highlights: [
      "Visit the Duomo and Galleria Vittorio Emanuele II.",
      "Walk around the Brera district.",
      "See the Sforza Castle and nearby park.",
      "Discover Milan’s café and fashion streets."
    ],
    shortTitleIdeas: [
      "Duomo and city center",
      "Art, fashion and cafés"
    ]
  },
  "barcelona|spain": {
    weight: 2,
    dailyCosts: { transport: 30, lodging: 110, food: 50 },
    highlights: [
      "Walk along La Rambla and Gothic Quarter.",
      "Visit Sagrada Família.",
      "See Park Güell and Gaudí’s architecture.",
      "Enjoy the beach and seaside promenade."
    ],
    shortTitleIdeas: [
      "Gothic streets and first walk",
      "Gaudí highlights and city views"
    ]
  },
  "madrid|spain": {
    weight: 2,
    dailyCosts: { transport: 30, lodging: 100, food: 50 },
    highlights: [
      "Explore Puerta del Sol and Plaza Mayor.",
      "Visit the Royal Palace of Madrid.",
      "Walk in Retiro Park.",
      "Discover local tapas bars and nightlife."
    ],
    shortTitleIdeas: [
      "City center and royal squares",
      "Parks, museums and tapas"
    ]
  },
  "berlin|germany": {
    weight: 2,
    dailyCosts: { transport: 32, lodging: 95, food: 45 },
    highlights: [
      "See the Brandenburg Gate and Reichstag.",
      "Visit the Berlin Wall Memorial or East Side Gallery.",
      "Walk around Museum Island.",
      "Explore local neighborhoods and street art."
    ],
    shortTitleIdeas: [
      "History and city highlights",
      "Street art and museum island"
    ]
  },
  "munich|germany": {
    weight: 1,
    dailyCosts: { transport: 28, lodging: 100, food: 50 },
    highlights: [
      "Explore Marienplatz and the old town.",
      "Visit the English Garden.",
      "Try Bavarian food and beer halls.",
      "Take a short trip to nearby palaces or lakes."
    ],
    shortTitleIdeas: [
      "Old town and beer culture",
      "Parks and Bavarian vibes"
    ]
  },
  "istanbul|turkey": {
    weight: 3,
    dailyCosts: { transport: 20, lodging: 70, food: 35 },
    highlights: [
      "Visit Hagia Sophia and the Blue Mosque.",
      "Walk through the Grand Bazaar and Spice Bazaar.",
      "Take a Bosphorus cruise.",
      "Explore Galata, Karaköy and local cafés."
    ],
    shortTitleIdeas: [
      "Historic peninsula and mosques",
      "Bazaars, Bosphorus and neighborhoods"
    ]
  },
  "cappadocia|turkey": {
    weight: 2,
    dailyCosts: { transport: 25, lodging: 80, food: 40 },
    highlights: [
      "See the fairy chimneys and rock formations.",
      "Visit Göreme Open-Air Museum.",
      "Wake up early for hot-air balloons.",
      "Walk through valleys and small villages."
    ],
    shortTitleIdeas: [
      "Fairy chimneys and first views",
      "Valleys, villages and balloons"
    ]
  }
};

function keyForCity(name: string, country: string) {
  return `${name.toLowerCase().trim()}|${country.toLowerCase().trim()}`;
}

function chooseTopCities(cities: CityRequest[], totalDays: number) {
  if (cities.length <= totalDays) return cities;

  const withWeight = cities.map((city) => {
    const meta = CITY_DATA[keyForCity(city.name, city.country)];
    const weight = meta ? meta.weight : 1;
    return { city, weight };
  });

  withWeight.sort((a, b) => b.weight - a.weight);

  const limited = withWeight.slice(0, totalDays).map((w) => w.city);
  return limited;
}

function allocateDays(cities: CityRequest[], totalDays: number) {
  const weights = cities.map((city) => {
    const meta = CITY_DATA[keyForCity(city.name, city.country)];
    return meta ? meta.weight : 1;
  });

  const totalWeight = weights.reduce((sum, w) => sum + w, 0) || 1;

  let allocated = cities.map((_, idx) =>
    Math.max(1, Math.round((weights[idx] / totalWeight) * totalDays))
  );

  let currentTotal = allocated.reduce((sum, d) => sum + d, 0);

  while (currentTotal > totalDays) {
    let maxIndex = allocated.findIndex((d) => d === Math.max(...allocated));
    if (allocated[maxIndex] > 1) {
      allocated[maxIndex] -= 1;
      currentTotal--;
    } else {
      break;
    }
  }

  while (currentTotal < totalDays) {
    let maxWeight = Math.max(...weights);
    let maxWeightIndex = weights.findIndex((w) => w === maxWeight);
    allocated[maxWeightIndex] += 1;
    currentTotal++;
  }

  return allocated;
}

function buildItineraryText(cities: CityRequest[], daysPerCity: number[]) {
  const lines: string[] = [];

  let dayCounter = 1;

  lines.push("Suggested multi-city itinerary:\n");

  cities.forEach((city, index) => {
    const daysHere = daysPerCity[index];
    const key = keyForCity(city.name, city.country);
    const meta = CITY_DATA[key];

    for (let i = 0; i < daysHere; i++) {
      const dayTitleBase =
        meta?.shortTitleIdeas?.[i] ??
        (i === 0
          ? "First impressions and main highlights"
          : "More local neighborhoods and flexible time");

      lines.push(`Day ${dayCounter} – ${city.name}: ${dayTitleBase}`);

      const bullets: string[] = [];

      if (meta?.highlights && meta.highlights.length > 0) {
        for (let b = 0; b < meta.highlights.length && bullets.length < 4; b++) {
          bullets.push(`• ${meta.highlights[b]}`);
        }
      } else {
        bullets.push(
          "• Walk through the central areas and get a feeling of the city.",
          "• Try a few local dishes or café spots.",
          "• Visit at least one key landmark or viewpoint."
        );
      }

      bullets.forEach((b) => lines.push(b));
      lines.push("");
      dayCounter++;
    }
  });

  lines.push(
    "Note: This itinerary is approximate and can be adjusted based on flight times, hotel location and personal pace."
  );

  return lines.join("\n");
}

function estimateBudget(
  cities: CityRequest[],
  daysPerCity: number[]
): { transport: number; lodging: number; food: number; total: number } {
  let transport = 0;
  let lodging = 0;
  let food = 0;

  cities.forEach((city, index) => {
    const daysHere = daysPerCity[index];
    const key = keyForCity(city.name, city.country);
    const meta = CITY_DATA[key];

    const daily =
      meta?.dailyCosts ?? { transport: 25, lodging: 80, food: 40 };

    transport += daily.transport * daysHere;
    lodging += daily.lodging * daysHere;
    food += daily.food * daysHere;
  });

  const total = transport + lodging + food;

  return { transport, lodging, food, total };
}

export async function POST(req: Request) {
  const body = await req.json();
  const cities = (body.cities ?? []) as CityRequest[];
  const requestedDays = Number(body.days) || 5;

  if (!Array.isArray(cities) || cities.length === 0) {
    return NextResponse.json(
      { error: "No cities provided." },
      { status: 400 }
    );
  }

  const totalDays = Math.max(1, requestedDays);

  const effectiveCities =
    cities.length > totalDays ? chooseTopCities(cities, totalDays) : cities;

  const daysPerCity = allocateDays(effectiveCities, totalDays);
  const itinerary = buildItineraryText(effectiveCities, daysPerCity);
  const budget = estimateBudget(effectiveCities, daysPerCity);

  return NextResponse.json({
    itinerary,
    budget
  });
}
