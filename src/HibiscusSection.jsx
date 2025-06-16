// components/HibiscusSection.js
import FlowerSection from './FlowerSection';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaHeart, FaRegCalendarAlt, FaRegClock, FaQuoteLeft } from 'react-icons/fa';
import { GiWaterDrop, GiSunflower } from 'react-icons/gi';

gsap.registerPlugin(ScrollTrigger);

export default function HibiscusSection() {
  const quoteRef = useRef();
  const titleRef = useRef();
  const cardsRef = useRef([]);
  const ctaRef = useRef();

  // Easily adjustable positioning
  const positions = {
    quote: {
      top: '5%',  // Change this percentage to move quote up/down
      left: '29%', // Change this percentage to move quote left/right
      width: '40%' // Change this to control quote width
    },
    title: {
      top: '30%',  // Vertical position of main title
      left: '5%'  // Horizontal position
    },
    cards: {
      top: '65%',  // Vertical start of cards
      left: '5%',  // Horizontal position
      width: '50%' // Container width
    },
    cta: {
      top: '90%',  // Vertical position of button
      left: '50%'  // Center horizontally
    }
  };

  useEffect(() => {
    // Animations
    gsap.fromTo(
      quoteRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    );

    gsap.fromTo(
      titleRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, delay: 0.3, ease: 'back.out(1.2)' }
    );

    cardsRef.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.5 + i * 0.15, ease: 'back.out(1.2)' }
      );
    });

    gsap.to(ctaRef.current, {
      scale: 1.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 1
    });
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <FlowerSection folder="Hibiscus_frames" filter="contrast(1.1) brightness(1.05) saturate(1.2)">
      {/* Quote Section - TOP */}
      <div 
        ref={quoteRef}
        className="absolute z-10 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-rose-100"
        style={{
          top: positions.quote.top,
          left: positions.quote.left,
          width: positions.quote.width
        }}
      >
        <FaQuoteLeft className="text-rose-300 text-3xl mb-4" />
        <p className="text-lg md:text-xl text-rose-700 italic mb-2">
          "Like the hibiscus, we have but a day to bloom. Make it count."
        </p>
        <p className="text-sm text-rose-600">— Ancient Hawaiian Proverb</p>
      </div>

      {/* Main Title - BELOW QUOTE */}
      <div
        ref={titleRef}
        className="absolute z-10"
        style={{
          top: positions.title.top,
          left: positions.title.left
        }}
      >
        <h1 className="text-4xl md:text-7xl font-bold text-rose-700">Ephemeral</h1>
        <h1 className="text-4xl md:text-7xl font-bold text-rose-500 mb-4">Elegance</h1>
        <p className="text-lg md:text-2xl text-rose-600 max-w-md">
          The Hibiscus teaches us to cherish each moment.
        </p>
      </div>

      {/* Cards Section - BOTTOM */}
      <div 
        className="absolute z-10 grid grid-cols-1 md:grid-cols-3 gap-5"
        style={{
          top: positions.cards.top,
          left: positions.cards.left,
          width: positions.cards.width
        }}
      >
        {[
          {
            icon: <FaRegClock className="text-2xl" />,
            title: "Moments Matter",
            content: "Life's beauty is in its transience."
          },
          {
            icon: <FaHeart className="text-2xl" />,
            title: "Live Passionately",
            content: "Bloom with all your vibrant color."
          },
          {
            icon: <FaRegCalendarAlt className="text-2xl" />,
            title: "Daily Renewal",
            content: "Each day brings fresh opportunities."
          }
        ].map((card, index) => (
          <div
            key={index}
            ref={addToRefs}
            className="bg-gradient-to-br from-rose-50 to-pink-50 p-5 rounded-xl shadow-lg border border-rose-100 hover:shadow-xl transition-all"
          >
            <div className="text-rose-600 mb-3">{card.icon}</div>
            <h3 className="text-lg font-semibold text-rose-800">{card.title}</h3>
            <p className="text-sm text-rose-700 mt-2">{card.content}</p>
          </div>
        ))}
      </div>

      {/* CTA Button - VERY BOTTOM */}
      <div 
        ref={ctaRef}
        className="absolute z-10"
        style={{
          top: positions.cta.top,
          left: positions.cta.left,
          transform: 'translateX(-50%)'
        }}
      >
        <button className="bg-gradient-to-r from-rose-600 to-rose-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all text-lg">
          Begin Anew
        </button>
      </div>

      {/* Decorative Elements (positioned absolutely) */}
      <GiSunflower className="absolute text-rose-300/40 text-5xl top-20 right-20" />
      <GiWaterDrop className="absolute text-rose-400/30 text-4xl bottom-40 left-10" />
    </FlowerSection>
  );
}