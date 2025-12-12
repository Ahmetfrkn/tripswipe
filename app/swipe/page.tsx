"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SwipeClient from "./SwipeClient";

function SwipePageInner() {
  const searchParams = useSearchParams();

  const countriesParam = searchParams.get("countries") ?? "";
  const rawDays = searchParams.get("days")?.trim();
  const daysParam =
    rawDays && !Number.isNaN(Number(rawDays)) ? rawDays : "5";

  return (
    <SwipeClient
      initialCountriesParam={countriesParam}
      initialDaysParam={daysParam}
    />
  );
}

export default function SwipePage() {
  return (
    <Suspense fallback={null}>
      <SwipePageInner />
    </Suspense>
  );
}
