import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import React, { useState, useEffect, useRef } from "react";

const featuredProducts = ["/images/pattern2.jpg", "/images/wp2.jpg"];

let count = 0;
let slideInterval: any;
export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideRef = useRef<HTMLDivElement>(null);

  const removeAnimation = () => {
    if (slideRef.current) slideRef.current.classList.remove("fade-anim");
  };

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.addEventListener("animationend", removeAnimation);
      slideRef.current.addEventListener("mouseenter", pauseSlider);
      slideRef.current.addEventListener("mouseleave", startSlider);
    }

    startSlider();
    return () => {
      pauseSlider();
    };
    // eslint-disable-next-line
  }, []);

  const startSlider = () => {
    slideInterval = setInterval(() => {
      handleOnNextClick();
    }, 3000);
  };

  const pauseSlider = () => {
    clearInterval(slideInterval);
  };

  const handleOnNextClick = () => {
    count = (count + 1) % featuredProducts.length;
    setCurrentIndex(count);
    if (slideRef.current) slideRef.current.classList.add("fade-anim");
  };
  const handleOnPrevClick = () => {
    const productsLength = featuredProducts.length;
    count = (currentIndex + productsLength - 1) % productsLength;
    setCurrentIndex(count);
    if (slideRef.current) slideRef.current.classList.add("fade-anim");
  };

  return (
    <div ref={slideRef} className="w-full select-none relative">
      <div className="aspect-w-16 aspect-h-9 h-44 sm:h-48 md:h-80">
        <img className="h-full w-full object-cover rounded-lg" src={featuredProducts[currentIndex]} alt="" />
      </div>

      <div className="absolute w-full top-1/2 transform -translate-y-1/2 px-3 flex justify-between items-center">
        <button
          className="bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition"
          onClick={handleOnPrevClick}
        >
          <ChevronLeftIcon height={30} width={30} />
        </button>
        <button
          className="bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition"
          onClick={handleOnNextClick}
        >
          <ChevronRightIcon height={30} width={30} />
        </button>
      </div>
    </div>
  );
}
