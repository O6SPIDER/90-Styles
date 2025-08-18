import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative w-full py-20 bg-[#f5f5f5] text-gray-900 dark:bg-gray-900 dark:text-white overflow-hidden"
    >
      {/* Glow Backgrounds */}
      <div className="absolute top-20 left-20 w-72 h-72 
                      bg-yellow-300/30 dark:bg-yellow-400/20 
                      rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 
                      bg-amber-400/30 dark:bg-amber-500/20 
                      rounded-full blur-3xl animate-pulse delay-300" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions, custom requests, or partnership ideas? Let’s talk and make it happen.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-8 shadow-xl space-y-6 border border-gray-200 dark:border-white/10"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent!");
            }}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-2">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Write your message..."
                rows={5}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-400 outline-none"
              ></textarea>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 py-3 rounded-lg font-semibold text-lg text-gray-900 
                         bg-gradient-to-r from-yellow-400 to-amber-500 dark:text-white 
                         transition-transform shadow-lg hover:shadow-2xl"
            >
              Send Message
            </motion.button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-yellow-300/30 dark:bg-yellow-400/20 rounded-xl">
                <Mail className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Email</h4>
                <p className="text-gray-700 dark:text-gray-300">support@90styles.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-yellow-300/30 dark:bg-yellow-400/20 rounded-xl">
                <Phone className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Phone</h4>
                <p className="text-gray-700 dark:text-gray-300">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-yellow-300/30 dark:bg-yellow-400/20 rounded-xl">
                <MapPin className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Location</h4>
                <p className="text-gray-700 dark:text-gray-300">Accra, Ghana</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
