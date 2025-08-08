"use client"
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

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
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const progressCircleRef = useRef(null);
  
  const videoKeys = Object.keys(videos);
  const minSwipeDistance = 50;

  // Handle touch events for swipe
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
      goToSlide(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  };

  // Navigation functions
  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % videoKeys.length);
  };

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + videoKeys.length) % videoKeys.length);
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Update progress circle
  useEffect(() => {
    const updateProgress = () => {
      if (videoRef.current && videoRef.current.duration) {
        const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(currentProgress);
      }
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', updateProgress);
      return () => video.removeEventListener('timeupdate', updateProgress);
    }
  }, [currentIndex]);

  // Animate progress circle
  useEffect(() => {
    if (progressCircleRef.current) {
      const circumference = 2 * Math.PI * 18;
      const offset = circumference - (progress / 100) * circumference;
      progressCircleRef.current.style.strokeDashoffset = offset;
    }
  }, [progress]);

  // Get current video title
  const getCurrentVideoTitle = () => {
    return videoKeys[currentIndex].replace(/([A-Z])/g, ' $1').trim();
  };

  return (
    <div className="w-full pt-8 pb-12 px-4">
      <div className='flex flex-col items-center mb-6'>
        <h1 className='text-[#006abc] text-2xl font-semibold'>{title}</h1>
        <p className='text-center text-gray-300 mt-2' dangerouslySetInnerHTML={{ __html: description }} />
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
          {videoKeys.map((key, index) => (
            <div key={key} className="w-full flex-shrink-0 relative">
              <video
                ref={index === currentIndex ? videoRef : null}
                autoPlay={index === currentIndex}
                loop
                muted
                playsInline
                className="w-full rounded-lg"
              >
                <source src={videos[key]} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Play Button */}
              {index === currentIndex && (
                <div 
                  onClick={togglePlay}
                  className="absolute bottom-2  right-2 z-50 cursor-pointer group"
                >
                  <svg className="w-8 h-8" viewBox="0 0 44 44">
                    <circle
                      cx="22"
                      cy="22"
                      r="20"
                      fill="none"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="2"
                    />
                    <circle
                      ref={progressCircleRef}
                      cx="22"
                      cy="22"
                      r="18"
                      fill="none"
                      stroke="#006abc"
                      strokeWidth="2"
                      strokeDasharray="113.097"
                      strokeDashoffset={113.097 - (progress * 113.097 / 100)}
                      transform="rotate(-90 22 22)"
                      className="transition-all duration-100"
                    />
                    {isPlaying ? (
                      <path
                        fill="white"
                        d="M16 14h4v16h-4zm8 0h4v16h-4z"
                      />
                    ) : (
                      <path
                        fill="white"
                        d="M16 12l12 10-12 10z"
                      />
                    )}
                  </svg>
                </div>
              )}
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

      {/* Image Thumbnails */}
      <div className='flex items-center mt-4 justify-center gap-3 overflow-x-auto py-2'>
        {videoKeys.map((key) => (
          <div
            key={key}
            className={`flex-shrink-0 flex flex-col items-center cursor-pointer ${currentIndex === videoKeys.indexOf(key) ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}
            onClick={() => goToSlide(videoKeys.indexOf(key))}
          >
            {/* <img
              src={images[key]}
              width={60}
              height={60}
              alt={key.replace(/([A-Z])/g, ' $1').trim()}
              className="object-contain"
            /> */}
          </div>
        ))}
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center mt-4 gap-2">
        {videoKeys.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === index ? 'bg-[#006abc] w-6' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Desktop Video Section Component
const DesktopVideoSection = ({ 
  sectionIndex, 
  activeVideo, 
  videos, 
  images, 
  handleVideoChange, 
  videoRefs, 
  isPlaying, 
  progress, 
  progressCircleRefs,
  playButtonRefs,
  togglePlay
}) => {
  // Get current video source
  const getCurrentVideoSrc = () => {
    return videos[activeVideo] || videos.completeBody;
  };

  // Get current video title
  const getCurrentVideoTitle = () => {
    return activeVideo.replace(/([A-Z])/g, ' $1').trim();
  };

  return (
    <div className="video-section h-screen w-full flex flex-col justify-center relative">
      <div className="relative w-full flex items-center justify-center">
        <video
          key={`${sectionIndex}-${activeVideo}`}
          ref={el => videoRefs.current[sectionIndex] = el}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto max-h-[60vh] object-contain mx-auto"
        >
          <source src={getCurrentVideoSrc()} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Play Button */}
        <div 
          ref={el => playButtonRefs.current[sectionIndex] = el}
          onClick={() => togglePlay(sectionIndex)}
          className="absolute bottom-4 right-4 z-50 cursor-pointer group"
        >
          <svg className="w-12 h-12" viewBox="0 0 44 44">
            <circle
              cx="22"
              cy="22"
              r="20"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
            />
            <circle
              ref={el => progressCircleRefs.current[sectionIndex] = el}
              cx="22"
              cy="22"
              r="18"
              fill="none"
              stroke="#006abc"
              strokeWidth="2"
              strokeDasharray="113.097"
              strokeDashoffset={113.097 - (progress[sectionIndex] * 113.097 / 100)}
              transform="rotate(-90 22 22)"
              className="transition-all duration-100"
            />
            {isPlaying[sectionIndex] ? (
              <path
                fill="white"
                d="M16 14h4v16h-4zm8 0h4v16h-4z"
              />
            ) : (
              <path
                fill="white"
                d="M16 12l12 10-12 10z"
              />
            )}
          </svg>
        </div>
      </div>
      
      {/* Current Video Title */}
      <div className="text-center mt-4 mb-2">
        <h3 className="text-white text-xl font-medium">
          {getCurrentVideoTitle()}
        </h3>
      </div>

      {/* Image Thumbnails */}
      <div className='flex items-center mt-3 justify-center gap-3 overflow-x-auto py-2'>
        {Object.entries(images).map(([key, src]) => (
          <div
            key={key}
            className={`flex-shrink-0 flex flex-col items-center cursor-pointer ${activeVideo === key ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}
            onClick={() => handleVideoChange(key)}
          >
            <img
              src={src}
              width={80}
              height={80}
              alt={key.replace(/([A-Z])/g, ' $1').trim()}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

function Gsap() {
  // Refs
  const containerRef = useRef(null);
  const rightSectionRef = useRef(null);
  const videoRefs = useRef([]);
  const videoContainerRefs = useRef([]);
  const verticalLineRef = useRef(null);
  const headingRef = useRef(null);
  const passengerTabRef = useRef(null);
  const commercialTabRef = useRef(null);
  const playButtonRefs = useRef([]);
  const progressCircleRefs = useRef([]);

  // State
  const [activeSection, setActiveSection] = useState(0);
  const [activeVideo, setActiveVideo] = useState({
    passenger: 'completeBody',
    commercial: 'completeBody'
  });
  const [isManualScroll, setIsManualScroll] = useState(false);
  const [isPlaying, setIsPlaying] = useState([true, false]);
  const [progress, setProgress] = useState([0, 0]);

  // Toggle play/pause for specific video
  const togglePlay = (sectionIndex) => {
    const newIsPlaying = [...isPlaying];
    newIsPlaying[sectionIndex] = !newIsPlaying[sectionIndex];
    setIsPlaying(newIsPlaying);
    
    const video = videoRefs.current[sectionIndex];
    if (video) {
      if (newIsPlaying[sectionIndex]) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  // Handle video time updates
  useEffect(() => {
    const updateProgress = (sectionIndex) => {
      const video = videoRefs.current[sectionIndex];
      if (!video) return;

      const handleTimeUpdate = () => {
        if (video.duration) {
          const currentProgress = (video.currentTime / video.duration) * 100;
          setProgress(prev => {
            const newProgress = [...prev];
            newProgress[sectionIndex] = currentProgress;
            return newProgress;
          });
        }
      };

      video.addEventListener('timeupdate', handleTimeUpdate);
      return () => video.removeEventListener('timeupdate', handleTimeUpdate);
    };

    const cleanup1 = updateProgress(0);
    const cleanup2 = updateProgress(1);

    return () => {
      cleanup1 && cleanup1();
      cleanup2 && cleanup2();
    };
  }, []);

  // Animate progress circles
  useEffect(() => {
    progressCircleRefs.current.forEach((circle, index) => {
      if (circle) {
        const circumference = 2 * Math.PI * 18;
        const offset = circumference - (progress[index] / 100) * circumference;
        circle.style.strokeDashoffset = offset;
      }
    });
  }, [progress]);

  // Handle video change
  const handleVideoChange = (type, videoKey) => {
    setActiveVideo(prev => ({
      ...prev,
      [type]: videoKey
    }));
  };

  // Scroll to section
  const scrollToSection = (sectionIndex) => {
    setIsManualScroll(true);
    setActiveSection(sectionIndex);
    
    gsap.to(window, {
      scrollTo: { y: sectionIndex * window.innerHeight, autoKill: false },
      duration: 1,
      ease: "power3.inOut",
      onComplete: () => setIsManualScroll(false)
    });
  };

  // GSAP animations setup
  useEffect(() => {
    if (window.innerWidth >= 768) {
      // Enhanced heading animation
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          toggleActions: "play none none none"
        }
      });

      // Animate the heading text elements separately
      gsap.utils.toArray(".heading-line").forEach((line, i) => {
        gsap.from(line, {
          opacity: 0,
          y: 30,
          duration: 1,
          delay: i * 0.2,
          ease: "power3.out"
        });
      });

      // Set up scroll triggers for each section with zoom effect
      const sections = gsap.utils.toArray(".video-section");
      
      sections.forEach((section, index) => {
        const videoContainer = videoContainerRefs.current[index];
        
        // Zoom out when entering section
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "top center",
          onEnter: () => {
            gsap.fromTo(videoContainer, 
              { scale: 0.8, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" }
            );
            if (!isManualScroll) setActiveSection(index);
          },
          onEnterBack: () => {
            gsap.fromTo(videoContainer, 
              { scale: 0.8, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" }
            );
            if (!isManualScroll) setActiveSection(index);
          }
        });

        // Zoom in when leaving section
        ScrollTrigger.create({
          trigger: section,
          start: "bottom center",
          end: "bottom top",
          onLeave: () => {
            gsap.to(videoContainer, 
              { scale: 0.8, opacity: 0.7, duration: 0.5, ease: "power2.in" }
            );
          },
          onLeaveBack: () => {
            gsap.to(videoContainer, 
              { scale: 0.8, opacity: 0.7, duration: 0.5, ease: "power2.in" }
            );
          }
        });
      });

      // Animate the vertical line
      gsap.to(verticalLineRef.current, {
        backgroundPosition: "0% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: rightSectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      });

      // Auto-play first video when component mounts
      if (videoRefs.current[0]) {
        videoRefs.current[0].play();
        setIsPlaying([true, false]);
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isManualScroll]);

  return (
    <>
      {/* Desktop View */}
      <div className='bg-black relative text-white min-h-screen hidden md:block lg:block' ref={containerRef}>
        {/* Enhanced heading section */}
        <div
          ref={headingRef}
          className='flex w-full relative z-30 pointer-events-none'
        >
          <div className='absolute w-full flex flex-col justify-center items-center top-40 px-4'>
            <h1 className='heading-line text-3xl md:text-5xl lg:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300'>
              Evolving the drive with 360°
            </h1>
            <h3 className='heading-line text-xl md:text-3xl lg:text-4xl mt-6 text-center text-gray-300'>
              comprehensive solutions
            </h3>
          </div>
        </div>

        <div className='container mx-auto flex pt-20'>
          {/* Left Section - Navigation Tabs */}
          <div className='w-1/2 sticky top-0 h-screen flex items-center justify-center'>
            <div className='relative pl-6 h-[250px] flex flex-col justify-between'>
              {/* Vertical Line with animated indicator */}
              <div className="absolute left-0 top-0 w-1 bg-white h-full rounded-full overflow-hidden">
                <div
                  ref={verticalLineRef}
                  className="absolute left-0 w-full bg-yellow-400 transition-all duration-700 ease-in-out"
                  style={{
                    height: '50%',
                    top: activeSection === 0 ? '0%' : '50%',
                  }}
                />
              </div>

              {/* Passenger Vehicles Tab */}
              <div
                ref={passengerTabRef}
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
                ref={commercialTabRef}
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
          <div className='w-1/2 overflow-hidden relative' ref={rightSectionRef}>
            {/* Passenger Vehicle Section */}
            <DesktopVideoSection
              sectionIndex={0}
              activeVideo={activeVideo.passenger}
              videos={passengerVideos}
              images={passengerImages}
              handleVideoChange={(videoKey) => handleVideoChange('passenger', videoKey)}
              videoRefs={videoRefs}
              isPlaying={isPlaying}
              progress={progress}
              progressCircleRefs={progressCircleRefs}
              playButtonRefs={playButtonRefs}
              togglePlay={togglePlay}
            />

            {/* Commercial Vehicle Section */}
            <DesktopVideoSection
              sectionIndex={1}
              activeVideo={activeVideo.commercial}
              videos={truckVideos}
              images={truckImages}
              handleVideoChange={(videoKey) => handleVideoChange('commercial', videoKey)}
              videoRefs={videoRefs}
              isPlaying={isPlaying}
              progress={progress}
              progressCircleRefs={progressCircleRefs}
              playButtonRefs={playButtonRefs}
              togglePlay={togglePlay}
            />

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