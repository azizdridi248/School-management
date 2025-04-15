import React from "react";
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="py-16 bg-cyan-800">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-white">EniConnect</h1>
            <p className="text-cyan-100">
              Connecting students to knowledge and innovation. Discover new opportunities 
              and collaboration in one comprehensive platform.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-white">Quick Links</h1>
            <ul className="space-y-2">
              {['Home', 'Services', 'About', 'Contact'].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-cyan-100 hover:text-cyan-200 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Engineering Fields */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-white">Fields</h1>
            <ul className="space-y-2">
              {['Informatique', 'Mecatronique', 'Infotronique', 'Genie Indus'].map((field, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-cyan-100 hover:text-cyan-200 transition-colors"
                  >
                    {field}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-white">Stay Updated</h1>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-4 py-3 rounded-l-lg focus:outline-none text-black bg-amber-50"
              />
              <button className="bg-cyan-600 hover:bg-cyan-700 text-black px-4 py-3 rounded-r-lg transition-colors">
                Subscribe
              </button>
            </div>
            
            {/* Social Icons */}
            <div className="flex space-x-4 pt-4">
              <a href="#" className="text-cyan-100 hover:text-white transition-colors">
                <FaWhatsapp size={20} />
              </a>
              <a href="#" className="text-cyan-100 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-cyan-100 hover:text-white transition-colors">
                <TbWorldWww size={20} />
              </a>
              <a href="#" className="text-cyan-100 hover:text-white transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-cyan-700 mt-12 pt-6 text-center text-cyan-200">
          <p>© 2024 EniConnect. All rights reserved.</p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;