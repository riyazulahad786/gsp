"use client"
import React, { useRef, useEffect, useState } from 'react';

// Video sources
const passengerVideos = {
  completeBody: "/SupremeGroupassets/passenger.mp4",
  front: "/SupremeGroupassets/front.mp4",
  cabin: "/SupremeGroupassets/cabin.mp4",
  exterior: "/SupremeGroupassets/exterior.mp4",
  trunk: "/SupremeGroupassets/plate.mp4"
};

const truckVideos = {
  completeBody: "/SupremeGroupassets/truck.mp4",
  engine: "/SupremeGroupassets/truckfront.mp4",
  cabin: "/SupremeGroupassets/trunk.mp4"
};

// Image sources
const passengerImages = {
  completeBody: "/assets/completebody.png",
  front: "/assets/fronts.png",
  cabin: "/assets/cabin.png",
  trunk: "/assets/trunk.png",
  exterior: "/assets/exterior.png"
};

const truckImages = {
  completeBody: "/assets/truck1.svg",
  engine: "/assets/truck2.svg",
  cabin: "/assets/truck3.svg"
};

// Mobile Carousel Component
const MobileCarousel = ({ videos, images, title, description }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const videoKeys = Object.keys(videos);
  
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < videoKeys.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % videoKeys.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + videoKeys.length) % videoKeys.length);
  };

  // Get current video title
  const getCurrentVideoTitle = () => {
    return videoKeys[currentIndex].replace(/([A-Z])/g, ' $1').trim();
  };

  return (
    <div className="w-full pt-8 pb-12 px-4">
      <div className='flex flex-col items-center mb-6'>
        <h1 className='text-[#006abc] text-2xl font-semibold'>{title}</h1>
        <p className='text-center text-gray-300 mt-2' dangerouslySetInnerHTML={{ __html: description }}>
        </p>
      </div>
      
      <div className="relative overflow-hidden rounded-lg">
        {/* Video Container */}
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {videoKeys.map((key) => (
            <div key={key} className="w-full flex-shrink-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full rounded-lg"
              >
                <source src={videos[key]} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          disabled={currentIndex === 0}
          style={{ opacity: currentIndex === 0 ? 0.3 : 1 }}
        >
          {/* <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg> */}
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          disabled={currentIndex === videoKeys.length - 1}
          style={{ opacity: currentIndex === videoKeys.length - 1 ? 0.3 : 1 }}
        >
          {/* <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg> */}
        </button>
      </div>

      {/* Current Video Title */}
      <div className="text-center mt-4">
        <h3 className="text-white text-lg font-medium">
          {getCurrentVideoTitle()}
        </h3>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center mt-4 gap-2">
        {videoKeys.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentIndex === index ? 'bg-[#006abc] w-8' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

function Gsap() {
  // Desktop refs and state
  const rightSectionRef = useRef(null);
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const [activeSection, setActiveSection] = useState(0);
  const verticalLineRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState({
    passenger: 'completeBody',
    commercial: 'completeBody'
  });
  const [isManualScroll, setIsManualScroll] = useState(false);
  const headingRef = useRef(null);

  useEffect(() => {
    // Only run GSAP animations on desktop (simulated with timeout for demo)
    if (window.innerWidth >= 768) {
      // GSAP animations would go here
      // For demo purposes, we'll just set up basic scroll handling
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const section = Math.floor(scrollY / windowHeight);
        setActiveSection(Math.min(section, 1));
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleVideoChange = (type, videoKey) => {
    setActiveVideo(prev => ({
      ...prev,
      [type]: videoKey
    }));
  };

  const getCurrentVideoSrc = (section) => {
    if (section === 0) {
      return passengerVideos[activeVideo.passenger] || passengerVideos.completeBody;
    } else {
      return truckVideos[activeVideo.commercial] || truckVideos.completeBody;
    }
  };

  // Get current video title for desktop
  const getCurrentVideoTitle = (section) => {
    const currentVideo = section === 0 ? activeVideo.passenger : activeVideo.commercial;
    return currentVideo.replace(/([A-Z])/g, ' $1').trim();
  };

  const scrollToSection = (sectionIndex) => {
    setIsManualScroll(true);
    setActiveSection(sectionIndex);
    
    window.scrollTo({
      top: sectionIndex * window.innerHeight,
      behavior: 'smooth'
    });
    
    setTimeout(() => setIsManualScroll(false), 800);
  };

  return (
    <>
      {/* Desktop View */}
      <div className='bg-black relative text-white min-h-screen hidden md:block lg:block' ref={containerRef}>
        {/* Animated heading section */}
        <div
          ref={headingRef}
          className='flex w-full relative pointer-events-none z-30'
          style={{ willChange: 'transform, opacity' }}
        >
          <div className='absolute w-full flex flex-col justify-center items-center top-40'>
            <h1 className='text-sm md:text-4xl lg:text-4xl'>Evolving the drive with 360-degree</h1>
            <h3 className='text-sm md:text-3xl lg:text-3xl mt-4'>comprehensive solutions</h3>
          </div>
        </div>

        <div className='container mx-auto flex pt-20'>
          {/* Left Section - Navigation Tabs */}
          <div className='w-1/2 sticky top-0 h-screen flex items-center justify-center'>
            <div className='relative pl-3 h-64 flex flex-col justify-between'>
              {/* Vertical Line */}
              <div
                ref={verticalLineRef}
                className='absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-yellow-400 via-yellow-400 to-gray-600 bg-[length:100%_200%] bg-[position:0%_0%]'
                style={{
                  background: 'linear-gradient(to bottom, #facc15 50%, #3f3f46 50%)'
                }}
              ></div>

              {/* Passenger Vehicles Tab */}
              <div
                onClick={() => scrollToSection(0)}
                className={`relative z-10 cursor-pointer ${activeSection === 0 ? 'text-yellow-400' : 'text-white'}`}
              >
                <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold">Passenger Vehicles</h1>
                <p className="py-1 lg:w-2/3">
                  Revving up innovation from interior to exterior.
                </p>
              </div>

              {/* Commercial Vehicles Tab */}
              <div
                onClick={() => scrollToSection(1)}
                className={`mt-8 relative z-10 cursor-pointer ${activeSection === 1 ? 'text-yellow-400' : 'text-white'}`}
              >
                <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold">Commercial Vehicles</h1>
                <p className="mt-1 lg:w-2/3">
                  Advancing engineering for heavy-duty vehicles.
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Scrollable Content */}
          <div className='w-1/2 overflow-hidden' ref={rightSectionRef}>
            {/* Passenger Vehicle Section */}
            <div className="video-section h-screen w-full flex flex-col justify-center">
              <video
                key={`passenger-${activeVideo.passenger}`}
                ref={el => videoRefs.current[0] = el}
                autoPlay
                loop
                muted
                playsInline
                className="w-full"
              >
                <source src={getCurrentVideoSrc(0)} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Current Video Title */}
              <div className="text-center mt-4 mb-2">
                <h3 className="text-white text-xl font-medium">
                  {getCurrentVideoTitle(0)}
                </h3>
              </div>

              <div className='flex items-center mt-3 justify-center gap-5'>
                {Object.entries(passengerImages).map(([key, src]) => (
                  <div
                    key={key}
                    className={`flex flex-col items-center cursor-pointer ${activeVideo.passenger === key ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}
                    onClick={() => handleVideoChange('passenger', key)}
                  >
                    <img
                      src={src}
                      width={80}
                      height={80}
                      alt={key.replace(/([A-Z])/g, ' $1').trim()}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Commercial Vehicle Section */}
            <div className="video-section h-screen w-full flex flex-col justify-center">
              <video
                key={`commercial-${activeVideo.commercial}`}
                ref={el => videoRefs.current[1] = el}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-100"
              >
                <source src={getCurrentVideoSrc(1)} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Current Video Title */}
              <div className="text-center mt-4 mb-2">
                <h3 className="text-white text-xl font-medium">
                  {getCurrentVideoTitle(1)}
                </h3>
              </div>

              <div className='flex items-center mt-3 justify-center gap-5'>
                {Object.entries(truckImages).map(([key, src]) => (
                  <div
                    key={key}
                    className={`flex flex-col items-center cursor-pointer ${activeVideo.commercial === key ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}
                    onClick={() => handleVideoChange('commercial', key)}
                  >
                    <img
                      src={src}
                      width={80}
                      height={80}
                      alt={key.replace(/([A-Z])/g, ' $1').trim()}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Empty section to ensure proper scrolling */}
            <div className="video-section h-screen w-full flex flex-col justify-center"></div>
          </div>
        </div>
      </div>

      {/* Mobile View - Carousel Layout */}
      <div className='bg-black text-white block md:hidden lg:hidden'>
        {/* Passenger Vehicle Carousel */}
        <MobileCarousel
          videos={passengerVideos}
          images={passengerImages}
          title="Passenger vehicles"
          description="Revving up innovation<br />from interior to exterior."
        />

        {/* Commercial Vehicle Carousel */}
        <MobileCarousel
          videos={truckVideos}
          images={truckImages}
          title="Commercial vehicles"
          description="Advancing engineering<br />for heavy-duty vehicles."
        />
      </div>
    </>
  );
}

export default Gsap;