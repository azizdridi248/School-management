"use client";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence ,isDragActive} from "framer-motion";
import {
  FiHome,
  FiBook,
  FiUsers,
  FiSettings,
  FiHelpCircle,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { GiTeacher } from "react-icons/gi";
import { MdAssignment } from "react-icons/md";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const menuItems = [
    { name: "Home", icon: FiHome, path: "/" },
    { name: "Courses", icon: FiBook, path: "/courses" },
    { name: "Students", icon: FiUsers, path: "/student" },
    { name: "Teachers", icon: GiTeacher, path: "/teachers" },
    { name: "Exam", icon: MdAssignment, path: "/exam" },
    { name: "Settings", icon: FiSettings, path: "/settings" },
    { name: "Help", icon: FiHelpCircle, path: "/help" },
  ];


  return (
    <>
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 text-gray-700 fixed top-2 left-2 z-50 bg-white rounded-md shadow-md"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}

      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.div
            initial={{ x: isMobile ? -300 : 0, opacity: isMobile ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-64 bg-white h-screen fixed top-0 left-0 border-r border-gray-200 p-4 z-40"
          >
            <div className="p-4 mb-8">
              <h1 className="text-xl font-bold text-blue-600">EniConnect</h1>
            </div>

            <nav>
              <ul className="space-y-2">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.li
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <NavLink
                        to={item.path}
                        
                        className={`flex items-center gap-3 p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition  ${isDragActive ? "bg-blue-50" : "text-gray-600 "} `}
                      >
                        <span className="text-lg">
                          <Icon />
                        </span>
                        <span>{item.name}</span>
                      </NavLink>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <div className="absolute bottom-4 left-0 right-0 p-4 border-t border-gray-200">
              <div className="flex items-center gap-3 p-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  U
                </div>
                <span className="text-sm font-medium">Admin@Enicar</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
