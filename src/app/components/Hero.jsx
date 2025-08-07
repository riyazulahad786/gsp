import React from 'react';

function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute w-full h-full object-cover"
      >
        <source src="/SupremeGroupassets/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Text Overlay */}
   <div className="absolute inset-0">
  {/* Black translucent overlay */}
  <div className="absolute inset-0 bg-black/50 z-0"></div>

  {/* Text content on top of overlay */}
  <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full">
    <h1 className="text-xl md:text-2xl mb-2">Driven by performance</h1>
    <p className="text-2xl md:text-5xl font-bold px-4">
      Soft trims and <span className="text-[#4ac5e9]">NVH solutions</span>
    </p>
    <p className="text-2xl md:text-5xl max-w-2xl px-4">for seamless rides</p>
  </div>
</div>

    </div>
  );
}

export default Hero;