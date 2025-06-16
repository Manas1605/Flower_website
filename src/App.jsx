import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

import DahliaSection from './DahliaSection';
import SunflowerSection from './SunflowerSection';
import HibiscusSection from './HibiscusSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    // 👇 This must be the scroll container
    <div id="lenis-root">
      <DahliaSection />
      <SunflowerSection />
      <HibiscusSection />
    </div>
  );
}

export default App;
