import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/**
 * AnimatedCounter – counts up from 0 to `target` when in view.
 */
function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    const startTime = performance.now();
                    const numericTarget = parseInt(target, 10);

                    const animate = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(eased * numericTarget));

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };

                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration, hasAnimated]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
}

export default function Achievements() {
    const achievements = [
        {
            icon: "🏢",
            title: "IFFCO Intern",
            description:
                "Built full-stack internal tools at IFFCO Phulpur Unit — Node.js, Express, MySQL",
            tag: "Industry",
        },
        {
            icon: "🏆",
            title: "Web Wonders 2025",
            description:
                "Led a 4-member team as Technical Lead for the Web Wonders 2025 competition",
            tag: "Leadership",
        },
        {
            icon: "⭐",
            title: "3★ CodeChef",
            description:
                "Achieved 3-Star rating (1600+) on CodeChef through consistent competitive programming",
            tag: "CP",
        },
        {
            icon: "🎓",
            title: "CGPA 9.19",
            description:
                "Maintaining excellent academic record at NIT Surat in B.Tech AI",
            tag: "Academic",
        },
        {
            icon: "📊",
            title: "97.20% in 10th",
            description:
                "Scored 97.20% in ICSE Board — St. Joseph's College, Prayagraj",
            tag: "Academic",
        },
        {
            icon: "📈",
            title: "95.80% in 12th",
            description:
                "Scored 95.80% in CBSE Board — Shiv Jyoti Convent School, Kota",
            tag: "Academic",
        },
        {
            icon: "🤖",
            title: "Stanford ML Course",
            description:
                "Pursuing the Stanford Online Machine Learning Specialization",
            tag: "Learning",
        },
        {
            icon: "🌐",
            title: "RangRiti Platform",
            description:
                "Built a 40+ art-form cultural platform with AI tools, VR rooms & marketplace",
            tag: "Project",
        },
        {
            icon: "🔗",
            title: "ACM SVNIT",
            description:
                "Executive Member — organizing coding workshops and tech events on campus",
            tag: "Community",
        },
        {
            icon: "🧑‍🏫",
            title: "Nexus Mentor",
            description:
                "Mentoring juniors in programming and coordinating technical initiatives at SVNIT",
            tag: "Mentorship",
        },
    ];

    const stats = [
        { value: "9", suffix: ".19", label: "CGPA", icon: "🎯" },
        { value: "300", suffix: "+", label: "Problems Solved", icon: "💻" },
        { value: "5", suffix: "+", label: "Projects Deployed", icon: "🚀" },
        { value: "1600", suffix: "+", label: "CodeChef Rating", icon: "⭐" },
    ];

    // Stagger container variants
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.06,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    return (
        <section
            id="achievements"
            className="py-20 px-6 relative overflow-hidden"
        >
            {/* Background – simple, no continuous animation */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-red-600/5 rounded-full blur-[180px]" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/5 rounded-full blur-[140px]" />
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2
                        className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        Achievements & Highlights
                    </h2>
                    <p
                        className="text-gray-400 text-lg font-light tracking-wide uppercase"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        Milestones that define the journey
                    </p>
                </motion.div>

                {/* Stats Counter Row */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className="group relative"
                        >
                            <div className="p-6 rounded-2xl bg-black border-2 border-dashed border-red-500/30 text-center transition-all duration-300 hover:border-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] relative overflow-hidden">
                                <span className="text-2xl mb-2 block">{stat.icon}</span>
                                <div
                                    className="text-3xl md:text-4xl font-bold text-red-500 mb-1 font-mono"
                                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    <AnimatedCounter
                                        target={stat.value}
                                        suffix={stat.suffix}
                                        duration={1800}
                                    />
                                </div>
                                <div
                                    className="text-sm text-gray-400"
                                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    {stat.label}
                                </div>

                                {/* Corner dots */}
                                <div className="absolute -top-1 -left-1 w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Achievement Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
                >
                    {achievements.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className="group"
                        >
                            <div className="h-full p-5 rounded-xl bg-black border border-red-500/15 transition-all duration-300 hover:border-red-500/50 hover:shadow-[0_0_25px_rgba(239,68,68,0.1)] relative overflow-hidden">
                                {/* Subtle hover gradient */}
                                <div className="absolute inset-0 bg-gradient-to-b from-red-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="relative z-10">
                                    {/* Icon + Tag row */}
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-2xl">{item.icon}</span>
                                        <span
                                            className="text-[9px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400/80 border border-red-500/20 font-bold uppercase tracking-widest"
                                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                        >
                                            {item.tag}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h4
                                        className="text-sm font-bold text-white mb-2 leading-tight group-hover:text-red-400 transition-colors duration-300"
                                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                    >
                                        {item.title}
                                    </h4>

                                    {/* Description */}
                                    <p className="text-gray-500 text-xs leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Bottom accent */}
                                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-16 w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent"
                />
            </div>
        </section>
    );
}
