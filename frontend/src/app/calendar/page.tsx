"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Agbalumo, Raleway } from "next/font/google";
import { ToolCard } from "../components/ui/toolCard";
import { CardEvent } from "../components/ui/cardEvent";
import { CardEventSkeleton } from "../components/ui/cardEventSkeleton";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { fetchHighlightedEvents } from "@/app/api/event";
import { fetchUser } from "@/app/api/data";
import { Suspense } from 'react';

const agbalumo = Agbalumo({
  subsets: ["latin"],
  variable: "--font-test",
  weight: "400",
});
const raleway = Raleway({
  subsets: ["latin"],
  weight: "900",
  variable: "--font-raleway",
});



export default function Home() {

  return (
    <div>
        <h1>Calendrier</h1>
    </div>
  );
}