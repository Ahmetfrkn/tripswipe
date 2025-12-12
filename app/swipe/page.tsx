"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SwipeClient from "./SwipeClient";

function SwipePageInner() {
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

export default function SwipePage() {
  return (
    <Suspense fallback={null}>
      <SwipePageInner />
    </Suspense>
  );
}
