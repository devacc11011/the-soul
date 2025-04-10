'use client'
import dynamic from "next/dynamic";

const SeedSearcher = dynamic(() => import("@/app/seed-searcher/seed-searcher"), {
    ssr: false,
});

export default function SeedSearcherContainer() {
    return <>
      <SeedSearcher/>
    </>
}