/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

export default function StoreLocator() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://store-locator-admin.vercel.app/dist/store-locator-v0.0.1.js";
    script.async = true;
    document.body.appendChild(script);

    // Config pour le micro-frontend
    (window as any).myliStoreLocatorConfig = {
      apiKey: "4d5b7598-7ce4-4533-b0c0-f2147b175fd9",
      label: "Pokémon",
      style: {
        mainColor: "#D40128",
      },
    };

    script.onload = () => {
      setIsLoaded(true);
    };
  }, []);

  if (!isLoaded) {
    return null;
  }

  console.log("isLoaded", isLoaded);

  // @ts-expect-error it's ok, the web component is loaded by the above script
  return <myli-store-locator></myli-store-locator>;
}
