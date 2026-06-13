"use client";

import SectionDivider from "@/components/effects/SectionDivider";
import QuickNav from "@/components/about/QuickNav";
import ProfileHero from "@/components/about/ProfileHero";
import StatsCounter from "@/components/about/StatsCounter";
import CurrentlyWorking from "@/components/about/CurrentlyWorking";
import FeaturedWork from "@/components/about/FeaturedWork";
import SkillConstellation from "@/components/about/SkillConstellation";
import DailyStack from "@/components/about/DailyStack";
import PrinciplesSection from "@/components/about/PrinciplesSection";
import AboutTimeline from "@/components/about/AboutTimeline";
import FAQSection from "@/components/about/FAQSection";
import AboutCTA from "@/components/about/AboutCTA";

export default function AboutPage() {
  return (
    <div className="pt-20">
      <QuickNav />

      {/* ─────────── HERO ─────────── */}
      <section id="hero" className="relative py-20 lg:py-28 px-4 overflow-hidden scroll-mt-32">
        <div className="relative z-10">
          <ProfileHero />
        </div>
      </section>

      <SectionDivider variant="line" />

      {/* ─────────── FEATURED WORK ─────────── */}
      <div id="work" className="scroll-mt-32">
        <FeaturedWork />
      </div>

      <SectionDivider variant="line" />

      {/* ─────────── STATS ─────────── */}
      <div id="stats" className="scroll-mt-32">
        <StatsCounter />
      </div>

      <SectionDivider variant="gradient" height={40} />

      {/* ─────────── SKILL CONSTELLATION ─────────── */}
      <div id="skills" className="scroll-mt-32">
        <SkillConstellation />
      </div>

      <SectionDivider variant="line" />

      {/* ─────────── DAILY STACK ─────────── */}
      <div id="stack" className="scroll-mt-32">
        <DailyStack />
      </div>

      <SectionDivider variant="gradient" height={40} />

      {/* ─────────── CURRENTLY WORKING ─────────── */}
      <div id="current" className="scroll-mt-32">
        <CurrentlyWorking />
      </div>

      <SectionDivider variant="line" />

      {/* ─────────── PRINCIPLES ─────────── */}
      <div id="principles" className="scroll-mt-32">
        <PrinciplesSection />
      </div>

      <SectionDivider variant="line" />

      {/* ─────────── TIMELINE ─────────── */}
      <AboutTimeline />

      <SectionDivider variant="gradient" height={40} />

      {/* ─────────── FAQ ─────────── */}
      <FAQSection />

      <SectionDivider variant="line" />

      {/* ─────────── CTA ─────────── */}
      <AboutCTA />
    </div>
  );
}
