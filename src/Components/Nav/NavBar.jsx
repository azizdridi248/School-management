import React, { useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import logo from "../../assets/logoEni.png";
import { motion, AnimatePresence } from "framer-motion";

const NavbarMenu = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "Services", link: "#" },
  { id: 3, title: "About Us", link: "#" },
  { id: 4, title: "Our Team", link: "#" },
  { id: 5, title: "Contact Us", link: "#" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <nav className="relative z-20 flex items-center justify-between px-6 py-4 bg-white shadow-md dark:bg-gray-900 dark:text-white">
      {/* Logo */}
      <motion.div 
        className="flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src={logo} alt="logo" className="h-12 w-auto" />
      </motion.div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center space-x-6">
        {NavbarMenu.map((menu, i) => (
          <motion.a
            key={menu.id}
            href={menu.link}
            className="relative group text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors font-medium"
            custom={i}
            initial="hidden"
            animate="visible"
            variants={menuVariants}
            whileHover={{ scale: 1.05 }}
          >
            {menu.title}
            <motion.span 
              className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500"
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        ))}

        <motion.button 
          className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-5 rounded-full shadow-sm"
          whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(59, 130, 246, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          Sign In
        </motion.button>
      </div>

      {/* Mobile Menu Icon */}
      <motion.div 
        className="lg:hidden"
        whileTap={{ scale: 0.9 }}
      >
        {isMobileMenuOpen ? (
          <IoMdClose 
            className="text-3xl text-gray-600 dark:text-gray-300 cursor-pointer"
            onClick={toggleMobileMenu}
          />
        ) : (
          <IoMdMenu 
            className="text-3xl text-gray-600 dark:text-gray-300 cursor-pointer"
            onClick={toggleMobileMenu}
          />
        )}
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {NavbarMenu.map((menu, i) => (
                <motion.a
                  key={menu.id}
                  href={menu.link}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-500 font-medium py-2"
                  custom={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: i * 0.1, duration: 0.3 }
                  }}
                  exit={{ opacity: 0, x: -20 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {menu.title}
                </motion.a>
              ))}
              <motion.button 
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-5 rounded-full shadow-sm w-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: NavbarMenu.length * 0.1, duration: 0.3 }
                }}
                exit={{ opacity: 0, y: 10 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign In
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;