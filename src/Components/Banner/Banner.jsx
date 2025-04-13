import React from "react";
import { motion } from "framer-motion";
import { IoPeople, IoBook, IoSchool, IoStatsChart } from "react-icons/io5";

console.log("Banner file loaded");
export default function Banner() {
    console.log("test")
    const data = [
        {
            icon: <IoPeople className="text-4xl text-blue-600" />,
            title: "Étudiants",
            number: "+700"
        },
        {
            icon: <IoBook className="text-4xl text-blue-600" />,
            title: "Cours",
            number: "+50"
        },
        {
            icon: <IoSchool className="text-4xl text-blue-600" />,
            title: "Formateurs",
            number: "+30"
        },
        {
            icon: <IoStatsChart className="text-4xl text-blue-600" />,
            title: "Taux de réussite",
            number: "98%"
        }
    ];

    return (
        <section className="py-12 bg-blue-500 text-white my-10 rounded-xl mx-10">
            <div className="container mx-auto px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {data.map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white bg-opacity-20 rounded-xl p-6 text-center shadow-lg"
                        >
                            <div className="flex justify-center mb-4">
                                {item.icon}
                            </div>
                            <h3 className="text-3xl font-bold mb-2">{item.number}</h3>
                            <p className="text-xl">{item.title}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}