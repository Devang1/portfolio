import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaGithub, 
  FaLinkedin, 
  FaTwitter,
  FaPaperPlane,
  FaCheck,
  FaExclamationTriangle,
  FaUser,
  FaComment,
  FaCode
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Initialize EmailJS with your public key
// Get these from https://www.emailjs.com
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [activeField, setActiveField] = useState(null);
  const containerRef = useRef(null);
  const formRef = useRef(null);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Terminal typing effect
      gsap.fromTo(".typing-text",
        { width: 0 },
        {
          width: "100%",
          duration: 1.5,
          ease: "power2.inOut",
          delay: 0.5,
          scrollTrigger: {
            trigger: ".contact-header",
            start: "top 80%",
          }
        }
      );

      // Contact cards entrance
      gsap.from(".contact-card",
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-info",
            start: "top 70%",
          }
        }
      );

      // Form entrance
      gsap.from(".contact-form",
        {
          x: -100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 70%",
          }
        }
      );

      // Floating icons
      gsap.to(".floating-icon", {
        y: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send email using EmailJS
      await emailjs.send(
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  {
    name: formData.name,                 // {{name}}
    email: formData.email,               // {{email}} (Reply-To)
    message: formData.message,            // {{message}}
    title: formData.subject || "Contact", // {{title}}
    time: new Date().toLocaleString(),    // {{time}}
  },
  EMAILJS_PUBLIC_KEY
);


      // Success animation
      gsap.to(".success-animation", {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      });

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);

    } catch (error) {
      console.error('Error sending email:', error);
      
      // Error animation
      gsap.to(".error-animation", {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      });

      setSubmitStatus('error');
      
      // Reset error after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: "EMAIL",
      value: "devangshukla119@gmail.com",
      link: "mailto:devangshukla119@gmail.com",
      color: "#EA4335"
    }
  ];

  const socialLinks = [
    {
      icon: <FaGithub className="text-xl" />,
      name: "GitHub",
      link: "https://github.com/Devang1",
      color: "#333"
    },
    {
      icon: <FaLinkedin className="text-xl" />,
      name: "LinkedIn",
      link: "https://linkedin.com/in/devang-kishore-shukla-8881402ba",
      color: "#0077B5"
    }
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full px-4 md:px-8 lg:px-16 py-20 overflow-hidden bg-[#03030B]"
      id="contact"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, #F57C0020 0%, transparent 70%)`,
            transform: `translate(${cursorPosition.x * 0.5}px, ${cursorPosition.y * 0.5}px)`,
          }}
        />
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(90deg, #F57C0020 1px, transparent 1px),
            linear-gradient(#F57C0020 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none">
        {[FaEnvelope, FaPhone, FaCode, FaComment].map((Icon, index) => (
          <div
            key={index}
            className="absolute floating-icon opacity-10"
            style={{
              left: `${20 + index * 20}%`,
              top: `${30 + index * 10}%`,
            }}
          >
            <Icon className="text-4xl text-[#F57C00]" />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 mb-16 contact-header">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-[#F57C00] animate-pulse" />
          <span className="text-[#F57C00] text-sm tracking-widest">
            $ ./contact --send-mail
          </span>
        </div>
        
        <div className="relative">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 overflow-hidden">
            <span className="typing-text inline-block whitespace-nowrap overflow-hidden border-r-2 border-[#F57C00] pr-2">
              CONTACT_MATRIX
            </span>
          </h1>
          
          <div className="h-px w-48 bg-gradient-to-r from-[#F57C00] to-transparent mb-4" />
          
          <p className="text-gray-400 mt-3 tracking-wide">
            > system active | ready to connect | email: devangshukla119@gmail.com
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        
        {/* Left Panel - Contact Info & Social */}
        <div className="contact-info">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#F57C00]" />
              <span className="text-[#F57C00] text-sm tracking-widest">
                $ ./contact_info --display
              </span>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="contact-card block"
                >
                  <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/30 backdrop-blur-sm hover:border-[#F57C00]/30 transition-all duration-300 group">
                    <div className="flex items-start gap-4">
                      <div 
                        className="p-3 rounded-lg transition-all duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${info.color}20` }}
                      >
                        <div style={{ color: info.color }}>
                          {info.icon}
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">{info.title}</p>
                        <p className="text-white text-lg font-medium group-hover:text-[#F57C00] transition-colors">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#F57C00]" />
              <span className="text-[#F57C00] text-sm tracking-widest">
                $ ./social --connect
              </span>
            </div>

            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 rounded-xl border border-gray-800 bg-gray-900/30 backdrop-blur-sm hover:border-[#F57C00]/30 transition-all duration-300 group"
                  style={{ color: social.color }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Status Terminal */}
          <div className="mt-12 p-6 rounded-xl border border-gray-800 bg-black/40 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-gray-400 text-sm">terminal — system_status</span>
            </div>
            
            <div className="font-mono text-sm space-y-2">
              <p className="text-gray-300">
                <span className="text-green-500">$</span> status --mail-server
              </p>
              <p className="text-gray-400">
                > SMTP Connection: <span className="text-green-500">ACTIVE</span>
              </p>
              <p className="text-gray-300">
                <span className="text-green-500">$</span> ping devangshukla119@gmail.com
              </p>
              <p className="text-gray-400">
                > Response Time: <span className="text-green-500">47ms</span>
              </p>
              <div className="flex items-center mt-4">
                <span className="text-green-500 mr-2">$</span>
                <span className="text-gray-300">ready_to_receive --input</span>
                <span className="ml-2 text-[#F57C00] animate-pulse">█</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Contact Form */}
        <div className="contact-form">
          <div className="sticky top-24">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#F57C00]" />
                <span className="text-[#F57C00] text-sm tracking-widest">
                  $ ./send_message --interactive
                </span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                SEND <span className="text-[#F57C00]">MESSAGE</span>
              </h2>
              <p className="text-gray-400">
                Fill out the form below and I'll get back to you as soon as possible
              </p>
            </div>

            {/* Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="flex items-center gap-2 text-gray-300 mb-2">
                  <FaUser className="text-[#F57C00]" />
                  <span className="text-sm">YOUR_NAME</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setActiveField('name')}
                    onBlur={() => setActiveField(null)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-[#F57C00] focus:ring-1 focus:ring-[#F57C00]/30 transition-all"
                    placeholder="$ enter your name"
                  />
                  {activeField === 'name' && (
                    <div className="absolute -inset-1 rounded-lg blur-sm opacity-30 bg-gradient-to-r from-[#F57C00] to-transparent -z-10" />
                  )}
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="flex items-center gap-2 text-gray-300 mb-2">
                  <SiGmail className="text-[#F57C00]" />
                  <span className="text-sm">EMAIL_ADDRESS</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setActiveField('email')}
                    onBlur={() => setActiveField(null)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-[#F57C00] focus:ring-1 focus:ring-[#F57C00]/30 transition-all"
                    placeholder="$ user@domain.com"
                  />
                  {activeField === 'email' && (
                    <div className="absolute -inset-1 rounded-lg blur-sm opacity-30 bg-gradient-to-r from-[#F57C00] to-transparent -z-10" />
                  )}
                </div>
              </motion.div>

              {/* Subject Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="flex items-center gap-2 text-gray-300 mb-2">
                  <FaComment className="text-[#F57C00]" />
                  <span className="text-sm">SUBJECT</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setActiveField('subject')}
                    onBlur={() => setActiveField(null)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-[#F57C00] focus:ring-1 focus:ring-[#F57C00]/30 transition-all"
                    placeholder="$ project inquiry / collaboration"
                  />
                  {activeField === 'subject' && (
                    <div className="absolute -inset-1 rounded-lg blur-sm opacity-30 bg-gradient-to-r from-[#F57C00] to-transparent -z-10" />
                  )}
                </div>
              </motion.div>

              {/* Message Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="flex items-center gap-2 text-gray-300 mb-2">
                  <FaCode className="text-[#F57C00]" />
                  <span className="text-sm">MESSAGE</span>
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setActiveField('message')}
                    onBlur={() => setActiveField(null)}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-[#F57C00] focus:ring-1 focus:ring-[#F57C00]/30 transition-all resize-none"
                    placeholder="$ type your message here..."
                  />
                  {activeField === 'message' && (
                    <div className="absolute -inset-1 rounded-lg blur-sm opacity-30 bg-gradient-to-r from-[#F57C00] to-transparent -z-10" />
                  )}
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-[#F57C00] to-orange-600 text-white font-medium tracking-wider hover:from-orange-600 hover:to-[#F57C00] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>SENDING...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        <span>SEND MESSAGE</span>
                      </>
                    )}
                  </div>
                  
                  {/* Button glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
              </motion.div>

              {/* Status Messages */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="success-animation"
                  >
                    <div className="p-4 rounded-lg bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-800/50">
                      <div className="flex items-center gap-3">
                        <FaCheck className="text-green-500 text-xl" />
                        <div>
                          <p className="text-green-400 font-medium">Message Sent Successfully!</p>
                          <p className="text-green-300 text-sm">I'll get back to you soon at {formData.email}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="error-animation"
                  >
                    <div className="p-4 rounded-lg bg-gradient-to-r from-red-900/30 to-rose-900/30 border border-red-800/50">
                      <div className="flex items-center gap-3">
                        <FaExclamationTriangle className="text-red-500 text-xl" />
                        <div>
                          <p className="text-red-400 font-medium">Failed to Send Message</p>
                          <p className="text-red-300 text-sm">Please try again or contact me directly at devangshukla119@gmail.com</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-20 pt-8 border-t border-gray-800">
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Devang Kishore Shukla. All systems operational.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Last updated: {new Date().toLocaleDateString()} | Response time: &lt;24h
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;