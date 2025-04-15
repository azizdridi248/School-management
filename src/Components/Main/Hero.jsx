import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaLaptopCode, FaRobot, FaMicrochip, FaIndustry } from "react-icons/fa";
import { motion } from "framer-motion";

import informatique from "../../assets/Informatique.png";
import mec from "../../assets/Mecatronique.png";
import Infotronique from "../../assets/Infotronique.png";
import Genie from "../../assets/Genie Indus.png";

const Hero = () => {
  const specialties = [
    {
      icon: <FaLaptopCode className="text-3xl text-cyan-200" />,
      title: "Informatique",
      image: informatique
    },
    {
      icon: <FaRobot className="text-3xl text-cyan-200" />,
      title: "Mecatronique",
      image: mec
    },
    {
      icon: <FaMicrochip className="text-3xl text-cyan-200" />,
      title: "Infotronique",
      image: Infotronique
    },
    {
      icon: <FaIndustry className="text-3xl text-cyan-200" />,
      title: "Genie Indus",
      image: Genie
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <section className="bg-cyan-700 overflow-hidden relative">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Brand Info */}
          <motion.div 
            className="text-center lg:text-left"
            variants={itemVariants}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Explore the World of <motion.span 
                className="text-cyan-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >Engineering</motion.span> Specializations
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-cyan-100 mb-8 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Discover the exciting fields of engineering that shape our technological future. Find your passion and start your journey today.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.button 
                className="flex items-center justify-center px-8 py-4 bg-cyan-800 hover:bg-cyan-900 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border border-cyan-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get Started</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <IoIosArrowRoundForward className="ml-2 text-xl" />
                </motion.span>
              </motion.button>
              <motion.button 
                className="px-8 py-4 border-2 border-cyan-300 text-white rounded-xl hover:bg-cyan-600/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Image Gallery */}
          <motion.div 
            className="grid grid-cols-2 gap-4"
            variants={containerVariants}
          >
            {specialties.map((item, index) => (
              <motion.div 
                key={index} 
                className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500"
                variants={itemVariants}
                whileHover="hover"
              >
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-white text-lg font-semibold">{item.title}</h3>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Fields Section */}
        <motion.div 
          className="fields mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-center text-white mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Engineering Fields
          </motion.h2>
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {specialties.map((item, index) => (
              <motion.div 
                key={index} 
                className="flex flex-col items-center p-6 bg-cyan-800/80 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
                }}
              >
                <motion.div 
                  className="p-3 bg-cyan-700/50 rounded-full mb-4"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-cyan-100 text-center">
                  Learn about {item.title} engineering
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;