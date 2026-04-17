"use client";

import dynamic from "next/dynamic";

const AlumniMap = dynamic(() => import("./AlumniMap"), {
  ssr: false,
});

export default function MapWrapper() {
  return <AlumniMap />;
}