import { motion } from "framer-motion";
import { useState } from "react";
import SpringCard from "../components/ui/SpringCard";
import { EncryptButton } from "../components/ui/EncryptButton";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Using FormSubmit.co - a free form submission service
      const response = await fetch('https://formsubmit.co/ajax/srivastavaojas454@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Contact from ${formData.name}`,
          _captcha: 'false'
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: "https://cdn.simpleicons.org/gmail/EA4335",
      label: "Email",
      value: "srivastavaojas454@gmail.com",
      link: "mailto:srivastavaojas454@gmail.com"
    },
    {
      icon: "https://cdn.simpleicons.org/github/FFFFFF",
      label: "GitHub",
      value: "@Ojas-Srivastava05",
      link: "https://github.com/Ojas-Srivastava05"
    },
    {
      icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
      label: "LinkedIn",
      value: "@ojas-srivastava05",
      link: "https://www.linkedin.com/in/ojas-srivastava05"
    },
    {
      icon: "https://cdn.simpleicons.org/googlemaps/4285F4",
      label: "Location",
      value: "Prayagraj,India",
      link: null
    }
  ];

  return (
    <section id="contact" className="min-h-screen py-20 px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Get In Touch
          </h2>
          <p className="text-gray-400 text-lg font-light tracking-wide uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Let's Create Something Amazing Together
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SpringCard>
              <div className="p-8 rounded-xl bg-black border border-red-500/20">
                <h3 className="text-2xl font-bold mb-6 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Send a Message 📬
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-black border border-slate-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors disabled:opacity-50"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-black border border-slate-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors disabled:opacity-50"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-black border border-slate-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors resize-none disabled:opacity-50"
                      placeholder="Your message..."
                    />
                  </div>
                  
                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm"
                    >
                      ✅ Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm"
                    >
                      ❌ Failed to send message. Please try again or email directly.
                    </motion.div>
                  )}

                  <EncryptButton
                    text={isSubmitting ? "Sending..." : "Send Message"}
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={isSubmitting}
                  />
                </form>
              </div>
            </SpringCard>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <SpringCard>
              <div className="p-8 rounded-xl bg-black border border-red-500/20">
                <h3 className="text-2xl font-bold mb-6 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-lg bg-black border border-red-500/20 hover:border-red-500/50 transition-colors"
                    >
                      <div className="w-8 h-8 flex items-center justify-center">
                        <img 
                          src={info.icon} 
                          alt={info.label}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-400 mb-1">{info.label}</p>
                        {info.link ? (
                          <a
                            href={info.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white font-semibold hover:text-red-400 transition-colors break-all"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-white font-semibold">{info.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </SpringCard>

            <SpringCard>
              <div className="p-8 rounded-xl bg-black border border-red-500/20">
                <h3 className="text-xl font-bold mb-4 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Available For
                </h3>
                <div className="space-y-3">
                  {[
                    "💼 Full-time opportunities",
                    "🚀 Freelance projects",
                    "🤝 Collaborations",
                    "💡 Open source contributions"
                  ].map((item, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="text-gray-300"
                    >
                      {item}
                    </motion.p>
                  ))}
                </div>
              </div>
            </SpringCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
