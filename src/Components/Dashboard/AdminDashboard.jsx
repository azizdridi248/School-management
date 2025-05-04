import { motion } from "framer-motion";
import { FiPlus, FiPlay, FiUsers, FiBook, FiSettings } from "react-icons/fi";
import Sidebar from "./SideBar";
import { GiTeacher } from "react-icons/gi";

const AdminDashboard = () => {
  const cardItems = [
    {
      title: "Add other admins",
      icon: <FiUsers className="text-2xl" />,
      description: "Create rich course content and coaching products for your students. When you give them a pricing plan, they'll appear on your site!",
    },
    {
      title: "Add Teacher",
      icon: <GiTeacher className="text-2xl" />,
      description: "Create rich course content and coaching products for your students. When you give them a pricing plan, they'll appear on your site!",
    },
    {
      title: "Add students",
      icon: <FiUsers className="text-2xl" />,
      description: "Create rich course content and coaching products for your students. When you give them a pricing plan, they'll appear on your site!",
    },
    {
      title: "Delete students",
      icon: <FiUsers className="text-2xl" />,
      description: "Create rich course content and coaching products for your students. When you give them a pricing plan, they'll appear on your site!",
    },
    {
      title: "Delete Teacher",
      icon: <GiTeacher className="text-2xl" />,
      description: "Create rich course content and coaching products for your students. When you give them a pricing plan, they'll appear on your site!",
    },
    {
      title: "Delete Admin",
      icon: <FiUsers className="text-2xl" />,
      description: "Create rich course content and coaching products for your students. When you give them a pricing plan, they'll appear on your site!",
    },
    {
      title: "Show All Admin",
      icon: <FiUsers className="text-2xl" />,
      description: "Create rich course content and coaching products for your students. When you give them a pricing plan, they'll appear on your site!",
    },


  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
    <Sidebar />
    
    <div className="flex-1 ml-64 p-6">
      {/* Header Banner */}
      

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to your dashboard</h1>
          <div className="flex items-center text-gray-600">
            <span>Eniconnect@Enicar.com</span>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cardItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
              </div>
              <p className="text-gray-600 mb-6">{item.description}</p>
              <button className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800">
                <FiPlus /> Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
};

export default AdminDashboard;