import React from "react";
import { motion } from "framer-motion";
import { IoPeople, IoBook, IoSchool, IoStatsChart } from "react-icons/io5";

const Banner = () => {
  const data = [
    {
      icon: <IoPeople className="text-4xl text-cyan-200" />,
      title: "Étudiants",
      number: "+700"
    },
    {
      icon: <IoBook className="text-4xl text-cyan-200" />,
      title: "Cours",
      number: "+50"
    },
    {
      icon: <IoSchool className="text-4xl text-cyan-200" />,
      title: "Teachers",
      number: "+30"
    },
    {
      icon: <IoStatsChart className="text-4xl text-cyan-200" />,
      title: "Taux de Empoche",
      number: "98%"
    }
  ];

  return (
    <section className="py-3 bg-cyan-700 text-white my-10 rounded-xl mx-4 md:mx-10">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {data.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-cyan-600/40 rounded-xl p-6 text-center shadow-lg flex flex-col items-center backdrop-blur-sm border border-cyan-500/30"
            >
              <div className="mb-4">
                {item.icon}
              </div>
              <h3 className="text-3xl font-bold mb-2 text-white">{item.number}</h3>
              <p className="text-xl text-cyan-100">{item.title}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;