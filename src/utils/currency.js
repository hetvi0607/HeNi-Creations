import { useEffect, useState } from "react";

export const getCurrencyByCountry = (countryCode) => {
  if (countryCode === "US") return { code: "USD", rate: 0.012 };
  if (countryCode === "CA") return { code: "CAD", rate: 0.016 };
  return { code: "INR", rate: 1 };
};

export const formatPrice = (price, countryCode = "IN") => {
  const currency = getCurrencyByCountry(countryCode);
  const convertedPrice = price * currency.rate;

  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency.code,
    maximumFractionDigits: 0,
  }).format(convertedPrice);
};

export const useCountryCode = () => {
  const [countryCode, setCountryCode] = useState("IN");

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => setCountryCode(data.country_code || "IN"))
      .catch(() => setCountryCode("IN"));
  }, []);

  return countryCode;
};