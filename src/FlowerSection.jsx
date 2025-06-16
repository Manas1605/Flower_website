// components/FlowerSection.js
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FlowerSection({ folder, frameCount = 81, filter = 'none', children }) {
  const sectionRef = useRef();
  const imageRef = useRef();

  useEffect(() => {
    const updateImage = (index) => {
      const paddedIndex = String(index).padStart(4, '0');
      if (imageRef.current) {
        imageRef.current.src = `/${folder}/${paddedIndex}.webp`;
      }
    };

    const obj = { frame: 0 };

    const animation = gsap.to(obj, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=2000',
        scrub: true,
        pin: true,
      },
      onUpdate: () => updateImage(obj.frame),
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [folder, frameCount]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-white overflow-hidden"
    >
      <img
        ref={imageRef}
        src={`/${folder}/0000.webp`}
        alt={`${folder} animation`}
        className="w-full h-full object-cover pointer-events-none"
        style={{ filter }}
      />
      {children}
    </section>
  );
}
