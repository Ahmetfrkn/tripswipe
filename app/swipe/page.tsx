import SwipeClient from "./SwipeClient";

type SwipePageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function SwipePage({ searchParams }: SwipePageProps) {
  const countriesParamRaw = searchParams?.countries;
  const daysParamRaw = searchParams?.days;

  const countriesParam =
    typeof countriesParamRaw === "string" ? countriesParamRaw : "";
  const daysParam =
    typeof daysParamRaw === "string" ? daysParamRaw : "5";

  return (
    <SwipeClient
      initialCountriesParam={countriesParam}
      initialDaysParam={daysParam}
    />
  );
}
