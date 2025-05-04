import { motion } from 'framer-motion';
import { FiCalendar, FiMessageSquare, FiAward, FiChevronRight } from 'react-icons/fi';

const StudentMain = ({ studentName }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {studentName || 'Student'}!</h1>
        <p className="text-gray-500 mt-2">Here's your student dashboard</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
   

        {/* Grades Card */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">Moyen Generale</h3>
          <div className="space-y-4">
            <span className="text-3xl font-bold text-indigo-600">11.20</span>
            <p className="text-sm text-gray-500">Your current average</p>
          </div>
        </motion.div>

        {/* Deadlines Card */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Deadlines</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700">TLA</span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                2 days left
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700">DevelopementMobile</span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                5 days left
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={containerVariants}
        >
          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 flex flex-col items-center hover:bg-gray-50 transition duration-150"
          >
            <div className="bg-blue-50 p-3 rounded-full mb-3">
              <FiCalendar className="text-blue-600 text-xl" />
            </div>
            <span className="text-sm font-medium text-gray-900">Schedule</span>
          </motion.button>

          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 flex flex-col items-center hover:bg-gray-50 transition duration-150"
          >
            <div className="bg-purple-50 p-3 rounded-full mb-3">
              <FiMessageSquare className="text-purple-600 text-xl" />
            </div>
            <span className="text-sm font-medium text-gray-900">Messages</span>
          </motion.button>

          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 flex flex-col items-center hover:bg-gray-50 transition duration-150"
          >
            <div className="bg-green-50 p-3 rounded-full mb-3">
              <FiMessageSquare className="text-green-600 text-xl" />
            </div>
            <span className="text-sm font-medium text-gray-900">Resources</span>
          </motion.button>

          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 flex flex-col items-center hover:bg-gray-50 transition duration-150"
          >
            <div className="bg-amber-50 p-3 rounded-full mb-3">
              <FiAward className="text-amber-600 text-xl" />
            </div>
            <span className="text-sm font-medium text-gray-900">Grades</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default StudentMain;