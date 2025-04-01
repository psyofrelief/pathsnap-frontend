"use client";
import Faq from "@/components/sections/home/Faq";
import Features from "@/components/sections/home/Features";
import Geography from "@/components/sections/home/Geography";
import Hero from "@/components/sections/home/Hero";
export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Geography />
      <Faq />
    </>
  );
}
