import SwipeClient from "./SwipeClient";

type SwipePageProps = {
  searchParams?: {
    countries?: string;
    days?: string;
  };
};

export default function SwipePage({ searchParams }: SwipePageProps) {
  const countriesParam = searchParams?.countries ?? "";
  const daysParam =
    searchParams?.days && searchParams.days.trim() !== ""
      ? searchParams.days
      : "5";

  return (
    <SwipeClient
      initialCountriesParam={countriesParam}
      initialDaysParam={daysParam}
    />
  );
}
