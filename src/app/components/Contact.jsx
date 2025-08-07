"use client"
import React, { useState } from 'react';

function Contact() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        company: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        // Handle form submission here
    };

    return (
        <div className="min-h-screen bg-[#006abc]">
            <div className="container mx-auto px-1 py-8 min-h-screen flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
                    {/* Left Section - Contact Info */}
                    <div className="text-white space-y-8 flex flex-col justify-center px-3">
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-light mb-2">Get in touch</h1>
                            <div className="w-12 h-px bg-white mb-8"></div>
                        </div>
                        
                        <p className="text-lg font-light mb-12">For general enquiries</p>
                        
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-medium mb-2">Address :</h3>
                                <p className="font-light">110, 16th Road, Chembur, Mumbai - 400071</p>
                            </div>
                            
                            <div>
                                <h3 className="font-medium mb-2">Phone :</h3>
                                <p className="font-light">+91 22 25208822</p>
                            </div>
                            
                            <div>
                                <h3 className="font-medium mb-2">Email :</h3>
                                <p className="font-light">info@supremegroup.co.in</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Contact Form */}
                    <div className="flex flex-col justify-center px-3">
                        <div className="space-y-8">
                            <div>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="Full name"
                                    className="w-full bg-transparent border-0 border-b border-white/40 outline-none px-0 py-3 text-white placeholder-white/70 focus:border-white transition-colors duration-300"
                                />
                            </div>
                            
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    className="w-full bg-transparent border-0 border-b border-white/40 outline-none px-0 py-3 text-white placeholder-white/70 focus:border-white transition-colors duration-300"
                                />
                            </div>
                            
                            <div>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    placeholder="Company"
                                    className="w-full bg-transparent border-0 border-b border-white/40 outline-none px-0 py-3 text-white placeholder-white/70 focus:border-white transition-colors duration-300"
                                />
                            </div>
                            
                            <div>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Message"
                                    rows="4"
                                    className="w-full bg-transparent border-0 border-b border-white/40 outline-none px-0 py-3 text-white placeholder-white/70 focus:border-white transition-colors duration-300 resize-none"
                                />
                            </div>
                            
                            <div className="pt-4">
                                <button
                                    onClick={handleSubmit}
                                    className="border border-white text-white rounded-full px-8 py-2.5 bg-transparent hover:bg-white hover:text-blue-600 transition-all duration-300 font-medium"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;