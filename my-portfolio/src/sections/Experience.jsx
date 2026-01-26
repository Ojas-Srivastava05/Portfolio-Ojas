import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SpringCard from "../components/ui/SpringCard";

const ExperienceCard = ({ experience, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`relative flex items-center justify-between md:justify-normal gap-8 w-full ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                }`}
        >
            {/* Date for Desktop */}
            <div className="hidden md:block w-5/12 text-right">
                {index % 2 === 0 ? (
                    <div className="text-right">
                        <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {experience.role}
                        </h3>
                        <p className="text-red-400 font-medium">{experience.company}</p>
                    </div>
                ) : (
                    <div className="text-right">
                        <span className="text-4xl font-bold text-gray-800/50">{experience.year}</span>
                    </div>
                )}
            </div>

            {/* Timeline Dot */}
            <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full border-4 border-black z-10">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20" />
            </div>

            {/* Content Card */}
            <div className="w-full md:w-5/12 pl-12 md:pl-0">
                {index % 2 === 0 ? (
                    <div className="text-left md:text-left">
                        <span className="hidden md:block text-4xl font-bold text-gray-800/50 mb-2">{experience.year}</span>
                        <span className="md:hidden text-4xl font-bold text-gray-800/50 mb-2 block">{experience.year}</span>
                        <SpringCard>
                            <div className="p-6 bg-black border border-red-500/20 rounded-xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="md:hidden mb-4">
                                    <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                        {experience.role}
                                    </h3>
                                    <p className="text-red-400 font-medium">{experience.company}</p>
                                </div>

                                <p className="text-gray-400 text-sm leading-relaxed relative z-10">
                                    {experience.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-4 relative z-10">
                                    {experience.tags.map((tag, i) => (
                                        <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </SpringCard>
                    </div>
                ) : (
                    <div className="text-left">
                        <div className="hidden md:block mb-4 text-left">
                            <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                {experience.role}
                            </h3>
                            <p className="text-red-400 font-medium">{experience.company}</p>
                        </div>

                        <span className="md:hidden text-4xl font-bold text-gray-800/50 mb-2 block">{experience.year}</span>

                        <SpringCard>
                            <div className="p-6 bg-black border border-red-500/20 rounded-xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="md:hidden mb-4">
                                    <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                        {experience.role}
                                    </h3>
                                    <p className="text-red-400 font-medium">{experience.company}</p>
                                </div>

                                <p className="text-gray-400 text-sm leading-relaxed relative z-10">
                                    {experience.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-4 relative z-10">
                                    {experience.tags.map((tag, i) => (
                                        <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </SpringCard>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default function Experience() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const experiences = [
        {
            year: "2023 - Present",
            role: "B.Tech in CSE",
            company: "IIIT Allahabad",
            description: "Pursuing Bachelor of Technology in Computer Science. Focusing on Data Structures, Algorithms, and Web Technologies. Active member of technical societies.",
            tags: ["DSA", "Web Dev", "OS", "DBMS"]
        },
        {
            year: "2024",
            role: "Open Source Contributor",
            company: "Hacktoberfest & GSSoC",
            description: "Contributed to various open-source projects including GirlScript Summer of Code. Fixed bugs, improved documentation, and added new features.",
            tags: ["Git", "React", "Node.js", "Community"]
        },
        {
            year: "2022 - 2023",
            role: "Senior Secondary",
            company: "Maharishi Vidya Mandir",
            description: "Completed 12th grade with focus on Physics, Chemistry, and Mathematics. Developed strong analytical and problem-solving skills.",
            tags: ["PCM", "Mathematics", "Logic"]
        },
    ];

    return (
        <section id="experience" className="min-h-screen py-20 px-6 relative overflow-hidden" ref={containerRef}>
            {/* Background effects */}
            <div className="absolute inset-0 -z-10">
                <motion.div
                    className="absolute top-1/2 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
            </div>

            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Experience & Education
                    </h2>
                    <p className="text-gray-400 text-lg font-light tracking-wide uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        My Academic and Professional Journey
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Central Line */}
                    <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-red-500/20" />

                    {/* Animated Line */}
                    <motion.div
                        className="absolute left-4 md:left-1/2 transform -translate-x-1/2 top-0 w-0.5 bg-red-500"
                        style={{ height }}
                    />

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <ExperienceCard key={index} experience={exp} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
