// components/FlowerSection.js
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FlowerSection({ folder, frameCount = 81, filter = 'none', children }) {
  const sectionRef = useRef();
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);

  // 🖼️ Load all frames into memory
  useEffect(() => {
    const loadedImages = [];

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(4, '0');
      img.src = `/${folder}/${paddedIndex}.webp`;
      loadedImages.push(img);
    }

    setImages(loadedImages);
  }, [folder, frameCount]);

  // 🌀 Draw current frame to canvas
  useEffect(() => {
    if (!images.length) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const obj = { frame: 0 };

    const render = () => {
      const img = images[obj.frame];
      if (img && context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    const anim = gsap.to(obj, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=2000',
        scrub: true,
        pin: true,
        scroller: document.body,
      },
      onUpdate: render,
    });

    render(); // render first frame

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [images]);

  return (
    <section ref={sectionRef} className="relative h-screen w-full bg-white overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none absolute top-0 left-0"
        style={{ filter }}
      />
      {children}
    </section>
  );
}
