import { motion } from "framer-motion";

export default function Footer() {
  const socialLinks = [
    {
      name: "Gmail",
      icon: "https://cdn.simpleicons.org/gmail/EA4335",
      url: "mailto:your.email@gmail.com",
    },
    {
      name: "LinkedIn",
      icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
      url: "https://www.linkedin.com/in/ojas-srivastava05",
    },
    {
      name: "GitHub",
      icon: "https://cdn.simpleicons.org/github/FFFFFF",
      url: "https://github.com/Ojas-Srivastava05",
    },
    {
      name: "LeetCode",
      icon: "https://cdn.simpleicons.org/leetcode/FFA116",
      url: "https://leetcode.com/Oju_Srivastava",
    },
    {
      name: "CodeChef",
      icon: "https://cdn.simpleicons.org/codechef/5B4638",
      url: "https://www.codechef.com/users/ojassrivastava",
    },
    {
      name: "Codeforces",
      icon: "https://cdn.simpleicons.org/codeforces/1F8ACB",
      url: "https://codeforces.com/profile/oju",
    },
    {
      name: "Kaggle",
      icon: "https://cdn.simpleicons.org/kaggle/20BEFF",
      url: "https://www.kaggle.com/ojassrivastava05",
    }
  ];

  return (
    <footer className="relative py-12 px-6 border-t border-red-500/20 bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <div className="w-12 h-12 rounded-xl border-2 border-red-500/30 bg-black flex items-center justify-center transition-all duration-300 group-hover:border-red-500 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] p-2.5">
                <img 
                  src={social.icon} 
                  alt={social.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<span class="text-xl">💼</span>';
                  }}
                />
              </div>
              
              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {social.name}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-500 rotate-45" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent mb-8"
        />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-gray-400 font-hacker text-sm">
            © 2025{" "}
            <span className="text-red-500 font-bold">Ojas Srivastava</span>
            . All rights reserved.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Built with ❤️ using React & Framer Motion
          </p>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-red-500/20" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-red-500/20" />
      </div>
    </footer>
  );
}
