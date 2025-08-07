"use client"
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

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

function Gsap() {
  const rightSectionRef = useRef(null);
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const [activeSection, setActiveSection] = useState(0); // 0 for passenger, 1 for commercial
  const verticalLineRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState({
    passenger: 'completeBody',
    commercial: 'completeBody'
  });
  const [isManualScroll, setIsManualScroll] = useState(false);
  const headingRef = useRef(null);

 useEffect(() => {
  const sections = gsap.utils.toArray(".video-section");

  gsap.to(headingRef.current, {
    y: -200,
    opacity: 0.8,
    scrollTrigger: {
      trigger: rightSectionRef.current,
      start: "top top",
      end: "+=100%", // reduce from 200% to prevent extra space
      scrub: 1,
    },
  });

  ScrollTrigger.create({
    trigger: rightSectionRef.current,
    start: "top top",
    end: "+=100%", // shrink scroll trigger duration
    pin: true,
    scrub: 1,
    pinSpacing: false, // ensures no extra space is added below
    onUpdate: (self) => {
      if (!isManualScroll) {
        const progress = self.progress;
        setActiveSection(progress < 0.5 ? 0 : 1);
      }
    },
    onLeave: () => setIsManualScroll(false),
    onLeaveBack: () => setIsManualScroll(false),
  });

  gsap.to(sections, {
    yPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: rightSectionRef.current,
      start: "top top",
      end: "+=100%", // must match the above
      scrub: 1,
    },
  });

  videoRefs.current.forEach((video, index) => {
    if (video) {
      ScrollTrigger.create({
        trigger: video,
        start: "top center",
        end: "bottom center",
        onEnter: () => video.play(),
        onEnterBack: () => video.play(),
        onLeave: () => video.pause(),
        onLeaveBack: () => video.pause(),
      });
    }
  });

  return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}, [activeSection, isManualScroll]);


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

  const scrollToSection = (sectionIndex) => {
    setIsManualScroll(true);
    setActiveSection(sectionIndex);
    
    const scrollY = sectionIndex * window.innerHeight;
    
    gsap.to(window, {
      scrollTo: {
        y: scrollY,
        autoKill: false
      },
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => setIsManualScroll(false)
    });
  };

  return (
    <div className='bg-black relative text-white min-h-screen' ref={containerRef}>
      {/* Animated heading section */}
      <div 
        ref={headingRef}
        className=' flex w-full  relative pointer-events-none z-30'
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
            {/* Vertical Line with 50% fill by default */}
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
            <div className='flex items-center mt-5 justify-center gap-5'>
              {Object.entries(passengerImages).map(([key, src]) => (
                <div 
                  key={key} 
                  className={`flex flex-col items-center cursor-pointer ${activeVideo.passenger === key ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}
                  onClick={() => handleVideoChange('passenger', key)}
                >
                  <Image 
                    src={src}
                    width={80} 
                    height={80} 
                    alt={key.replace(/([A-Z])/g, ' $1').trim()}
                  />
                  <p className={`-mt-1 text-sm 2xl:text-base ${activeVideo.passenger === key ? 'text-white' : 'text-gray-400'}`}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
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
            <div className='flex items-center mt-5 justify-center gap-5'>
              {Object.entries(truckImages).map(([key, src]) => (
                <div 
                  key={key} 
                  className={`flex flex-col items-center cursor-pointer ${activeVideo.commercial === key ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}
                  onClick={() => handleVideoChange('commercial', key)}
                >
                  <Image 
                    src={src}
                    width={80} 
                    height={80} 
                    alt={key.replace(/([A-Z])/g, ' $1').trim()}
                  />
                  <p className={`-mt-1 text-sm 2xl:text-base ${activeVideo.commercial === key ? 'text-white' : 'text-gray-400'}`}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Empty section to ensure proper scrolling */}
          <div className="video-section h-screen w-full flex flex-col justify-center"></div>
        </div>
      </div>
    </div>
  );
}

export default Gsap;