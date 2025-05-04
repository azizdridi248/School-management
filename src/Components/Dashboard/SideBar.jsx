"use client";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiBook,
  FiUsers,
  FiSettings,
  FiHelpCircle,
  FiMenu,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { GiTeacher } from "react-icons/gi";
import { MdAssignment } from "react-icons/md";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsOpen(false); // Close sidebar by default on mobile
        setIsCollapsed(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const menuItems = [
    { name: "Home", icon: FiHome, path: "/admin" },
    { name: "Courses", icon: FiBook, path: "/courses" },
    { name: "Students", icon: FiUsers, path: "/students" },
    { name: "Teachers", icon: GiTeacher, path: "/teachers" },
    { name: "Exam", icon: MdAssignment, path: "/exam" },
    { name: "Settings", icon: FiSettings, path: "/settings" },
    { name: "Help", icon: FiHelpCircle, path: "/help" },
  ];

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="p-4 text-gray-700 fixed top-2 left-2 z-50 bg-white rounded-md shadow-md"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}

      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <>
            {/* Desktop Collapse Button - Improved positioning */}
            {!isMobile && (
              <motion.button
                onClick={toggleSidebar}
                className={`fixed top-4 z-50 p-2 bg-blue-600 rounded-full shadow-md text-gray-600 hover:text-blue-600 transition-all duration-300 hover:bg-blue-50`}
                style={{
                  left: isCollapsed ? "5.5rem" : "16.5rem", // Adjusted positioning
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {isCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
              </motion.button>
            )}

            {/* Sidebar */}
            <motion.div
              initial={{
                x: isMobile ? -300 : 0,
                opacity: isMobile ? 0 : 1,
                width: isCollapsed ? 80 : 256,
              }}
              animate={{
                x: 0,
                opacity: 1,
                width: isCollapsed ? 80 : 256,
              }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className={`bg-white h-screen fixed top-0 left-0 border-r border-gray-200 p-4 z-40 flex flex-col ${
                isCollapsed ? "w-20" : "w-64"
              }`}
            >
              {/* Logo Section */}
              <motion.div 
                className={`p-4 mb-8 ${isCollapsed ? "text-center" : ""}`}
                layout
              >
                <h1 className={`font-bold text-blue-600 ${isCollapsed ? "text-xl" : "text-xl"}`}>
                  {isCollapsed ? "EC" : "EniConnect"}
                </h1>
              </motion.div>

              {/* Navigation Items */}
              <nav className="flex-1">
                <ul className="space-y-2">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.li
                        key={index}
                        whileHover={{ 
                          x: isCollapsed ? 0 : 5,
                          backgroundColor: "rgba(239, 246, 255, 0.8)"
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                        layout
                      >
                        <NavLink
                          to={item.path}
                          className={({ isActive }) =>
                            `flex items-center gap-3 p-3 ${
                              isActive ? "text-blue-600 bg-blue-50" : "text-gray-600"
                            } hover:text-blue-600 hover:bg-blue-50 rounded-lg transition`
                          }
                          title={isCollapsed ? item.name : ""}
                        >
                          <span className="text-xl">
                            <Icon />
                          </span>
                          {!isCollapsed && (
                            <motion.span
                              initial={{ opacity: 1 }}
                              animate={{ opacity: isCollapsed ? 0 : 1 }}
                              transition={{ duration: 0.2 }}
                              className="whitespace-nowrap"
                            >
                              {item.name}
                            </motion.span>
                          )}
                        </NavLink>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* User Profile Section */}
              <motion.div 
                className="border-t border-gray-200 pt-4 mt-auto"
                layout
              >
                <div className={`flex items-center gap-3 p-3 ${isCollapsed ? "justify-center" : ""}`}>
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    U
                  </div>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 1 }}
                      animate={{ opacity: isCollapsed ? 0 : 1 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm font-medium"
                    >
                      Admin@Enicar
                    </motion.span>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;