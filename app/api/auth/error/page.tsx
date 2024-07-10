"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

export default function Error() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div>
      <h1>Error</h1>
      <p>{error ? `Error: ${error}` : "An unknown error occurred."}</p>
    </div>
  );
}
