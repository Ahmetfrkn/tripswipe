"use client";

import { useSearchParams } from "next/navigation";
import SwipeClient from "./SwipeClient";

export default function SwipePage() {
  const searchParams = useSearchParams();

  const countriesParam = searchParams.get("countries") ?? "";
  const daysParam = searchParams.get("days") ?? "5";

  return (
    <SwipeClient
      initialCountriesParam={countriesParam}
      initialDaysParam={daysParam}
    />
  );
}
