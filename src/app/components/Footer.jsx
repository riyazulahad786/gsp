import Image from 'next/image'
import React from 'react'
import backgroundimage from '../../../public/assets/Group.png'
function Footer() {
    return (
        <div className='relative px-4 md:py-5 lg:py-5 md:px-0 lg:px-0'>
            <div className='absolute right-0 bottom-0 -z-10'>
                <Image src={backgroundimage} className='h-full w-auto object-cover ' alt='footer image' />
            </div>
            <div className='container mx-auto py-3 relative z-10'>
                <div>
                    <div>
                        <img
                            src="/assets/Supreme_logos.png"

                            alt="Supreme Logo"
                            className="w-40 md:w-36 lg:w-36"
                        />                    </div>

                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 py-5 lg:grid-cols-4 gap-4'>
                    <div>
                        <p className="py-3 font-manrope font-bold uppercase text-base tracking-wider leading-none">
                            Applications
                        </p>                     <ul>
                            <li className="font-manrope font-medium text-sm leading-[41px] tracking-widest">
                                Apparel
                            </li>
                            <li className="font-manrope font-medium text-sm leading-[41px] tracking-widest">Automotive</li>
                            <li className="font-manrope font-medium text-sm leading-[41px] tracking-widest">Filtration</li>
                            <li className="font-manrope font-medium text-sm leading-[41px] tracking-widest">Customised Nonwoven</li>
                        </ul>
                    </div>
                    <div>
                        <p className="py-3 font-manrope font-bold uppercase text-base tracking-wider leading-none">Company</p>
                        <ul>
                            <li className="font-manrope font-medium text-sm leading-[41px] tracking-widest">Who We Are</li>
                            <li className="font-manrope font-medium text-sm leading-[41px] tracking-widest">Global Compentency</li>
                            <li className="font-manrope font-medium text-sm leading-[41px] tracking-widest">Innovation</li>
                            <li className="font-manrope font-medium text-sm leading-[41px] tracking-widest">ESG Impact</li>
                        </ul>
                    </div>
                    <div>
                        <p className="py-3 font-manrope font-bold uppercase text-base tracking-wider leading-none">MORE</p>
                        <ul>
                            <li className="font-manrope font-medium text-sm leading-[41px] tracking-widest">Contact Us</li>
                            <li className="font-manrope font-medium text-sm leading-[41px] tracking-widest">Careers</li>

                        </ul>
                    </div>
                    <div>
                        <p className="py-3 font-manrope font-bold uppercase text-base tracking-wider leading-none">Follow Us</p>
                        <ul>
                            <li className="font-manrope font-medium text-sm leading-[41px] tracking-widest">LinkedIn</li>

                        </ul>
                    </div>
                </div>
            </div>
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 py-4">
                <div>
                    <p className="text-sm md:text-base">©2024. All Rights Reserved.</p>
                </div>
                <div>
                    <p className="text-sm md:text-base text-center md:text-right">
                        Supreme House, 110, 16th Road, Chembur, Mumbai – 400071.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer
