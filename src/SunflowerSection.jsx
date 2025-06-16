// components/SunflowerSection.js
import FlowerSection from './FlowerSection';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaSun, FaSeedling, FaLightbulb, FaHandHoldingHeart, FaQuoteLeft } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function SunflowerSection() {
  const quoteRef = useRef();
  const titleRef = useRef();
  const cardsRef = useRef([]);
  const sunflowerRef = useRef();

  useEffect(() => {
    // Quote animation (topmost element)
    gsap.fromTo(
      quoteRef.current,
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 90%',
        },
      }
    );

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
        delay: 0.3 // slight delay after quote
      }
    );

    // Floating sunflower animation
    gsap.to(sunflowerRef.current, {
      rotation: 5,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Cards animation
    cardsRef.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
          },
          delay: 0.5 + i * 0.2, // delay after title
        }
      );
    });
  }, []);

  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <FlowerSection folder="Sunflower_frames" filter="contrast(1.2) brightness(1.1) saturate(1.1)">
      {/* Decorative sun elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FaSun className="absolute text-yellow-300/20 text-8xl" style={{ top: '10%', left: '15%' }} />
        <FaSun className="absolute text-yellow-400/15 text-6xl" style={{ bottom: '20%', right: '10%' }} />
      </div>

      {/* Quote section - TOPMOST ELEMENT */}
      <div 
        ref={quoteRef}
        className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-2xl px-4"
      >
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-yellow-100 text-center">
          <FaQuoteLeft className="text-yellow-400 text-xl mx-auto mb-2" />
          <p className="text-lg italic text-yellow-700">
            "Keep your face always toward the sunshine—and shadows will fall behind you."
          </p>
          <p className="text-sm text-yellow-600 mt-1">— Walt Whitman</p>
        </div>
      </div>

      {/* Floating sunflower decoration */}
      <div 
        ref={sunflowerRef} 
        className="absolute left-10 top-1/3 z-10 text-6xl text-yellow-500"
      >
        <FaSun className="animate-pulse" />
      </div>

      {/* Main content - BELOW QUOTE */}
      <div
        ref={titleRef}
        className="absolute right-10 top-1/3 text-right z-10"
      >
        <h1 className="text-[5vw] font-bold text-yellow-600 drop-shadow-md">Golden</h1>
        <h1 className="text-[5vw] font-bold text-yellow-400 drop-shadow-md mb-4">Resilience</h1>
        <p className="text-lg text-yellow-700 max-w-md ml-auto leading-relaxed">
          Like sunflowers that turn to face the light, we too can find strength in adversity.
        </p>
      </div>

      {/* Cards section - BOTTOM */}
      <div className="absolute left-1/2 bottom-32 transform -translate-x-1/2 z-10 w-full max-w-5xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: <FaSun className="text-xl" />,
              title: "Solar Power",
              content: "Harnessing the sun's clean, renewable energy.",
              bg: "bg-gradient-to-br from-yellow-50 to-amber-50"
            },
            {
              icon: <FaSeedling className="text-xl" />,
              title: "Growth Mindset",
              content: "Adapt and thrive in changing conditions.",
              bg: "bg-gradient-to-br from-yellow-50 to-lime-50"
            },
            {
              icon: <FaLightbulb className="text-xl" />,
              title: "Bright Ideas",
              content: "Innovation inspired by nature's designs.",
              bg: "bg-gradient-to-br from-amber-50 to-yellow-50"
            },
            {
              icon: <FaHandHoldingHeart className="text-xl" />,
              title: "Community",
              content: "Stronger when we grow together.",
              bg: "bg-gradient-to-br from-yellow-50 to-orange-50"
            }
          ].map((card, index) => (
            <div
              key={index}
              ref={addToCardsRef}
              className={`${card.bg} p-4 rounded-lg shadow-md border border-yellow-100 hover:shadow-lg transition-all`}
            >
              <div className="text-yellow-600 mb-2">{card.icon}</div>
              <h3 className="font-semibold text-yellow-800 mb-1">{card.title}</h3>
              <p className="text-xs text-yellow-700">{card.content}</p>
            </div>
          ))}
        </div>
      </div>
    </FlowerSection>
  );
}