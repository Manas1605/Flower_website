// components/DahliaSection.js
import FlowerSection from './FlowerSection';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaInstagram, FaGithub, FaLinkedin, FaLeaf, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { IoMdFlower, IoMdMail } from 'react-icons/io';
import { GiEarthAmerica } from 'react-icons/gi';

gsap.registerPlugin(ScrollTrigger);

export default function DahliaSection() {
  const containerRef = useRef([]);
  const titleRef = useRef();
  const flowerRef = useRef();
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    // Title animation
    gsap.fromTo(
      titleRef.current,
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 90%',
        },
      }
    );

    // Floating flower effect
    gsap.to(flowerRef.current, {
      y: 20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Content animations
    containerRef.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
          delay: i * 0.15,
        }
      );
    });

    // Background elements animation
    gsap.utils.toArray('.floating-element').forEach((el, i) => {
      gsap.to(el, {
        y: 15,
        duration: 3 + i,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 2
      });
    });
  }, []);

  const addToRefs = (el) => {
    if (el && !containerRef.current.includes(el)) {
      containerRef.current.push(el);
    }
  };

  const handleContactClick = () => {
    setShowContact(true);
    // Here you would typically trigger a modal or form
    // For now we'll just show the contact info
  };

  return (
    <FlowerSection folder="Dahlia_frames" filter="contrast(1.05) brightness(1.15) saturate(1.1)">
      {/* Contact Modal/Overlay - would be implemented properly */}
      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white/90 p-8 rounded-3xl shadow-2xl max-w-md w-full relative">
            <button 
              onClick={() => setShowContact(false)}
              className="absolute top-4 right-4 text-blue-600 hover:text-blue-800 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
              <IoMdMail className="text-blue-500" /> Contact Me
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaEnvelope className="text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-700">Email</h3>
                  <a href="mailto:your@email.com" className="text-blue-600 hover:underline">
                    your@email.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaPhone className="text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-700">Phone</h3>
                  <a href="tel:+1234567890" className="text-blue-600 hover:underline">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-700">Location</h3>
                  <p className="text-blue-600">City, Country</p>
                </div>
              </div>
            </div>
            <form className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-blue-700 mb-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-blue-700 mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-blue-700 mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows="4"
                  className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200 font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <IoMdFlower className="absolute text-blue-200/30 text-6xl floating-element" style={{ top: '15%', left: '15%' }} />
        <FaLeaf className="absolute text-blue-300/40 text-5xl floating-element" style={{ top: '25%', right: '20%' }} />
        <GiEarthAmerica className="absolute text-blue-400/20 text-7xl floating-element" style={{ bottom: '20%', left: '10%' }} />
        <IoMdFlower className="absolute text-blue-200/20 text-4xl floating-element" style={{ bottom: '30%', right: '15%' }} />
      </div>

      {/* Title */}
      <div
        ref={titleRef}
        className="absolute z-20 text-left"
        style={{
          top: '8%',
          left: '10%',
        }}
      >
        <h1 className="text-[7vw] font-extrabold leading-tight text-blue-800 drop-shadow-lg">
          Silent <span className="text-blue-500">Blooms</span>
        </h1>
        <div ref={flowerRef} className="absolute -right-16 top-1/2 transform -translate-y-1/2">
          <IoMdFlower className="text-blue-500 text-5xl animate-pulse" />
        </div>
      </div>

      {/* Social Icons (Top Right) */}
      <div className="absolute top-6 right-6 z-30 flex space-x-4">
        <a
          href="https://instagram.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/90 text-blue-600 hover:bg-blue-50 hover:text-blue-700 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <FaInstagram size={22} />
        </a>
        <a
          href="https://linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/90 text-blue-600 hover:bg-blue-50 hover:text-blue-700 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <FaLinkedin size={22} />
        </a>
        <a
          href="https://github.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/90 text-blue-600 hover:bg-blue-50 hover:text-blue-700 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <FaGithub size={22} />
        </a>
      </div>

      {/* Info Section */}
      <div className="absolute z-10 left-10 top-[30%] max-w-4xl w-full space-y-7 text-blue-900">
        {/* Intro Block */}
        <div
          ref={addToRefs}
          className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-blue-100/50 hover:shadow-blue-100/40 transition-all duration-500"
        >
          <h2 className="text-3xl font-bold text-blue-800 flex items-center gap-2">
            <span className="text-blue-500">💡</span> Why Nature Needs Us
          </h2>
          <p className="text-lg text-blue-700 mt-4 leading-relaxed">
            Nature speaks in silence. Flowers like the Dahlia reflect the soul of our environment — vibrant yet vulnerable.
            <br className="hidden md:block" /> It's not just about saving beauty, it's about preserving the delicate balance of life that sustains us all.
          </p>
        </div>

        {/* Cards */}
        <div ref={addToRefs} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {[
            {
              icon: '🌱',
              title: 'Eco Living',
              content: 'Small lifestyle changes can lead to big environmental impacts. Learn how to start today.',
              bg: 'bg-gradient-to-br from-blue-50 to-green-50'
            },
            {
              icon: '🌍',
              title: 'Climate Impact',
              content: 'Understand how our actions affect the earth, and what steps we can take to reduce damage.',
              bg: 'bg-gradient-to-br from-blue-50 to-purple-50'
            },
            {
              icon: '🌸',
              title: 'Why Flowers?',
              content: 'Flowers are silent indicators of ecosystem health — protect their world, protect ours.',
              bg: 'bg-gradient-to-br from-pink-50 to-blue-50'
            },
            {
              icon: '📢',
              title: 'Get Involved',
              content: 'Join local initiatives, plant trees, or spread awareness. Every step counts.',
              bg: 'bg-gradient-to-br from-green-50 to-blue-50'
            },
            {
              icon: '🌐',
              title: 'Learn & Share',
              content: 'Explore environmental topics and share knowledge with your community.',
              bg: 'bg-gradient-to-br from-blue-50 to-indigo-50'
            },
            {
              icon: '🌿',
              title: 'Daily Actions',
              content: 'Simple daily habits that collectively make a significant difference for our planet.',
              bg: 'bg-gradient-to-br from-teal-50 to-blue-50'
            }
          ].map((card, index) => (
            <div 
              key={index}
              className={`${card.bg} p-5 rounded-2xl shadow-lg hover:scale-[1.03] transition-all duration-300 border border-white/50 hover:shadow-blue-200/50`}
            >
              <h2 className="text-2xl font-semibold text-blue-800 mb-2">{card.icon} {card.title}</h2>
              <p className="text-sm text-blue-700">
                {card.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Contact Button */}
      <div className="absolute bottom-8 right-8 z-30">
        <button 
          onClick={handleContactClick}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-medium flex items-center gap-2"
        >
          <FaEnvelope /> Contact Me
        </button>
      </div>
    </FlowerSection>
  );
}