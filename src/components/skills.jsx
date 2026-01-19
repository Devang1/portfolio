import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiReact,
  SiNextdotjs,
  SiThreedotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiGraphql,
  SiGit,
  SiDocker,
  SiJest,
  SiWebpack,
  SiFigma,
  SiSocketdotio,
  SiRedis,
  SiJavascript,
  SiVite,
  SiFirebase,
  SiVercel,
  SiPrisma,
  SiGreensock
} from "react-icons/si";
import { 
  FaServer, 
  FaDatabase, 
  FaCode, 
  FaTools, 
  FaCloud, 
  FaPalette,
  FaBolt,
  FaShieldAlt,
  FaMobileAlt,
  FaRocket
} from "react-icons/fa";

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const skillsData = [
  {
    category: "Frontend",
    icon: <FaPalette className="text-xl sm:text-2xl" />,
    color: "#F57C00",
    gradient: "from-orange-500 to-yellow-500",
    skills: [
      { name: "React", icon: SiReact, level: 96, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, level: 92, color: "#E5E7EB" },
      { name: "TypeScript", icon: SiTypescript, level: 88, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, level: 95, color: "#F7DF1E" },
      { name: "Tailwind CSS", icon: SiTailwindcss, level: 94, color: "#06B6D4" },
      { name: "Framer Motion", icon: SiFramer, level: 89, color: "#0055FF" },
      { name: "GSAP", icon: SiGreensock, level: 86, color: "#88CE02" },
      { name: "Three.js", icon: SiThreedotjs, level: 82, color: "#049EF4" },
      { name: "Redux", icon: SiRedux, level: 87, color: "#764ABC" },
      { name: "Zustand", icon: SiRedux, level: 84, color: "#8B5CF6" }
    ]
  },
  {
    category: "Backend",
    icon: <FaServer className="text-xl sm:text-2xl" />,
    color: "#10B981",
    gradient: "from-emerald-500 to-teal-500",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, level: 93, color: "#339933" },
      { name: "Express", icon: SiExpress, level: 90, color: "#9CA3AF" },
      { name: "MongoDB", icon: SiMongodb, level: 88, color: "#47A248" },
      { name: "PostgreSQL", icon: SiPostgresql, level: 85, color: "#4169E1" },
      { name: "Socket.io", icon: SiSocketdotio, level: 86, color: "#D1D5DB" },
      { name: "Prisma", icon: SiPrisma, level: 83, color: "#2D3748" },
      { name: "GenAI", icon: FaRocket, level: 78, color: "#22C55E" },
      { name: "REST API", icon: FaCode, level: 90, color: "#38BDF8" },
    ]
  }
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView();

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mouse tracking (desktop only)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isMobile) return;
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40
      });
    };
    
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Floating particles effect (desktop only)
  useEffect(() => {
    if (!containerRef.current || isMobile) return;

    const particles = [];
    const colors = ["#F57C00", "#10B981", "#8B5CF6"];
    
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full';
      particle.style.background = colors[i % colors.length];
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = '0.1';
      containerRef.current.appendChild(particle);
      
      gsap.to(particle, {
        x: gsap.utils.random(-50, 50),
        y: gsap.utils.random(-50, 50),
        duration: gsap.utils.random(3, 6),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.1
      });
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, [isMobile]);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Category cards entrance
      gsap.from(".category-card", {
        y: 10,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".category-section",
          start: "top 85%",
        }
      });

      // Skill orbs animation
      gsap.from(".skill-orb", {
        scale: 0,
        rotation: 180,
        duration: 0.6,
        stagger: 0.03,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 80%",
        }
      });

      // Floating animation for active category (desktop only)
      if (!isMobile) {
        gsap.to(".active-category-card", {
          y: -2,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, [activeCategory, isMobile]);

  const currentCategory = skillsData[activeCategory];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16 md:py-20 overflow-hidden bg-[#03030B]"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div 
          className="absolute top-1/4 left-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] rounded-full blur-3xl transition-transform duration-300"
          style={{
            background: `radial-gradient(circle, ${currentCategory.color}20 0%, transparent 70%)`,
            transform: isMobile 
              ? 'none' 
              : `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
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
          backgroundSize: '30px 30px'
        }} />
      </div>

      {/* Header */}
      <div className="relative z-10 mb-8 sm:mb-12 md:mb-16">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#F57C00] animate-pulse" />
          <span className="text-[#F57C00] text-xs sm:text-sm tracking-widest">
            $ ./skills --tech-stack
          </span>
        </div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4"
        >
          TECH <span className="text-[#F57C00]">STACK</span>
        </motion.h1>
        
        <p className="text-gray-400 max-w-2xl text-sm sm:text-base md:text-lg">
          > A comprehensive collection of technologies and tools I work with to build modern web applications
        </p>
      </div>

      {/* Category Selection - Orb Design */}
      <div className="category-section relative z-10 mb-8 sm:mb-10 md:mb-12">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
          {skillsData.map((category, index) => (
            <motion.button
              key={category.category}
              onClick={() => setActiveCategory(index)}
              whileHover={{ scale: activeCategory === index ? 1 : 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`category-card relative group ${
                activeCategory === index ? 'active-category-card' : ''
              }`}
            >
              {/* Orb container */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20">
                {/* Outer glow */}
                <div 
                  className={`absolute inset-0 rounded-full blur-md sm:blur-lg md:blur-xl transition-all duration-300 ${
                    activeCategory === index 
                      ? `bg-gradient-to-br ${category.gradient} opacity-20 sm:opacity-30`
                      : 'opacity-0'
                  }`}
                />
                
                {/* Orb */}
                <div 
                  className={`absolute inset-1.5 sm:inset-2 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeCategory === index
                      ? `bg-gradient-to-br ${category.gradient} shadow-lg sm:shadow-xl md:shadow-2xl`
                      : 'bg-gray-800 border border-gray-700'
                  }`}
                >
                  <div className={`transition-all duration-300 ${
                    activeCategory === index ? 'text-white' : 'text-gray-400'
                  }`}>
                    {category.icon}
                  </div>
                </div>
              </div>
              
              {/* Category name */}
              <div className="mt-2 sm:mt-3 text-center">
                <span className={`text-xs sm:text-sm font-medium transition-colors ${
                  activeCategory === index 
                    ? `text-[${category.color}]` 
                    : 'text-gray-400'
                }`}>
                  {category.category}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Skills Display */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            {/* Category Title */}
            <div className="mb-6 sm:mb-8 md:mb-10 text-center">
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gray-900/50 backdrop-blur-sm border border-gray-800">
                <div 
                  className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                  style={{ backgroundColor: currentCategory.color }}
                />
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
                  {currentCategory.category} <span className="text-[#F57C00]">Skills</span>
                </h2>
              </div>
            </div>

            {/* Skills Grid - Circular Design */}
            <div className="skills-grid grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
              {currentCategory.skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    className="skill-orb group relative"
                    initial={false}
                    animate={false}
                    onMouseEnter={() => !isMobile && setHoveredSkill(skill.name)}
                    onMouseLeave={() => !isMobile && setHoveredSkill(null)}
                    onClick={() => isMobile && setHoveredSkill(hoveredSkill === skill.name ? null : skill.name)}
                  >
                    {/* Skill orb */}
                    <div className="relative h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40 mx-auto">
                      {/* Outer ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-gray-800 group-hover:border-opacity-100 transition-all duration-300"
                        style={{ borderColor: `${skill.color}40` }}
                      />
                      
                      {/* Progress ring */}
                      <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                        <circle
                          cx="50%"
                          cy="50%"
                          r="45%"
                          stroke={skill.color}
                          strokeWidth="2"
                          fill="transparent"
                          strokeDasharray="283"
                          strokeDashoffset={283 - (283 * skill.level / 100)}
                          className="transition-all duration-1000"
                        />
                      </svg>
                      
                      {/* Icon container */}
                      <div 
                        className="absolute inset-4 sm:inset-5 md:inset-6 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 active:scale-105"
                        style={{ 
                          backgroundColor: `${skill.color}15`,
                          border: `1px solid ${skill.color}30`
                        }}
                      >
                        <Icon 
                          className="text-2xl sm:text-3xl md:text-4xl transition-all duration-300 group-hover:scale-125 active:scale-110"
                          style={{ color: skill.color }}
                        />
                      </div>
                      
                      {/* Level indicator */}
                      <div className="absolute -bottom-1.5 sm:-bottom-2 left-1/2 transform -translate-x-1/2">
                        <div className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gray-900 border border-gray-800">
                          <span className="text-xs sm:text-sm font-bold" style={{ color: skill.color }}>
                            {skill.level}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Skill name */}
                    <div className="mt-4 sm:mt-6 md:mt-8 text-center">
                      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-1 px-1">
                        {skill.name}
                      </h3>
                      <div className="w-12 sm:w-14 md:w-16 h-1 mx-auto rounded-full overflow-hidden bg-gray-800">
                        <div 
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${skill.level}%`,
                            backgroundColor: skill.color 
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Mobile touch info */}
                    {isMobile && hoveredSkill === skill.name && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900/90 backdrop-blur-sm rounded-2xl flex items-center justify-center p-4 z-20"
                      >
                        <div className="text-center">
                          <Icon className="text-4xl mb-2 mx-auto" style={{ color: skill.color }} />
                          <h3 className="text-lg font-bold text-white mb-1">{skill.name}</h3>
                          <p className="text-sm text-gray-300">Proficiency: {skill.level}%</p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  );
};

// Custom hook for intersection observer
const useInView = () => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
};

export default Skills;