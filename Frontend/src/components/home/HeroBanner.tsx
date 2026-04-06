import { useEffect, useState } from "react";
import { IconChevron } from "./HomeIcons";

const HERO_SLIDES = [
  {
    eyebrow: "This Week's Deals",
    title: "Up to 50% Off\nTop Picks",
    sub: "Save big on trending products with limited-time offers across popular categories.",
    cta: "Shop Deals",
    emoji: "🛍️",
  },
  {
    eyebrow: "Special Featured Products",
    title: "Premium Quality\nBest Value",
    sub: "Explore featured collections curated for quality, performance, and everyday use.",
    cta: "View Featured",
    emoji: "⭐",
  },
  {
    eyebrow: "New Arrivals",
    title: "Fresh Drops\nJust For You",
    sub: "Discover newly launched products and grab early-bird pricing before stock runs out.",
    cta: "Explore New",
    emoji: "✨",
  },
] as const;

const HeroBanner = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = HERO_SLIDES.length;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [totalSlides]);

  const slide = HERO_SLIDES[activeSlide];
  const titleLines = slide.title.split("\n");

  return (
    <div className="hero">
      <div className="hero__left">
        <div className="hero__eyebrow">{slide.eyebrow}</div>
        <h1 className="hero__title">
          {titleLines.map((line, idx) => (
            <span key={idx}>
              {line}
              {idx < titleLines.length - 1 ? <br /> : null}
            </span>
          ))}
        </h1>
        <p className="hero__sub">{slide.sub}</p>
        <button className="hero__cta">
          {slide.cta} <IconChevron />
        </button>
      </div>
      <div className="hero__right">{slide.emoji}</div>

      <div className="hero__controls">
        <button
          className="hero__nav-btn"
          onClick={() =>
            setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
          }
          aria-label="Previous slide"
        >
          ‹
        </button>
        <div className="hero__dots">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              className={`hero__dot ${activeSlide === i ? "hero__dot--active" : ""}`}
              onClick={() => setActiveSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          className="hero__nav-btn"
          onClick={() => setActiveSlide((prev) => (prev + 1) % totalSlides)}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
