import React from 'react';
import Link from 'next/link';

function NotFoundPage() {
  return (
    <div className='w-full h-screen flex items-center justify-center bg-gray-50'>
      <div className='text-center p-6 mx-4'>
        <h1 className='text-[#5dd6fc] font-semibold text-5xl sm:text-6xl mb-4'>404</h1>
        <p className='text-xl sm:text-2xl text-gray-600 mb-8'>
          The page you have requested doesn't exist.
        </p>
        <Link href="/">
          <button className='rounded-full px-6 bg-[#5dd6fc] hover:bg-[#4ac5e8] text-white font-medium py-2 transition-colors duration-200'>
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;