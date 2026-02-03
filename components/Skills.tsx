'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Skills organized by rows for the marquee
const skillRows = [
    ['TypeScript', 'JavaScript', 'Python', 'Java', 'Go', 'React', 'Next.js', 'Angular', 'Node.js'],
    ['FastAPI', 'Spring Boot', 'GraphQL', 'REST APIs', 'GCP', 'AWS', 'Docker', 'Kubernetes', 'Terraform'],
    ['PostgreSQL', 'MongoDB', 'Redis', 'TensorFlow', 'PyTorch', 'LangChain', 'PySpark', 'Solidity', 'CI/CD'],
];

// Featured skills with category colors
const featuredSkills = [
    { name: 'React', category: 'Frontend', color: '#61DAFB' },
    { name: 'Python', category: 'Backend', color: '#3776AB' },
    { name: 'TypeScript', category: 'Language', color: '#3178C6' },
    { name: 'GCP', category: 'Cloud', color: '#4285F4' },
    { name: 'Docker', category: 'DevOps', color: '#2496ED' },
    { name: 'TensorFlow', category: 'AI/ML', color: '#FF6F00' },
];

export default function Skills() {
    return (
        <section id="skills" className="section-padding relative overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 opacity-20">
                <div
                    className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 animate-[spin_20s_linear_infinite]"
                    style={{
                        background: 'conic-gradient(from 0deg, var(--primary), var(--secondary), var(--accent), var(--primary))',
                        filter: 'blur(100px)',
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">
                        Skills & <span className="gradient-text">Technologies</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        Technologies I work with to build amazing products
                    </p>
                </motion.div>

                {/* Featured Skills - Floating Orbs */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-6 mb-16"
                >
                    {featuredSkills.map((skill, index) => (
                        <FloatingSkillOrb key={skill.name} skill={skill} index={index} />
                    ))}
                </motion.div>

                {/* Infinite Marquee */}
                <div className="space-y-4">
                    {skillRows.map((row, rowIndex) => (
                        <InfiniteMarquee
                            key={rowIndex}
                            skills={row}
                            direction={rowIndex % 2 === 0 ? 'left' : 'right'}
                            speed={30 + rowIndex * 5}
                        />
                    ))}
                </div>

                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--background)] to-transparent pointer-events-none" />
            </div>
        </section>
    );
}

function FloatingSkillOrb({ skill, index }: { skill: typeof featuredSkills[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                delay: index * 0.1,
                type: 'spring',
                stiffness: 200,
                damping: 15
            }}
            whileHover={{
                scale: 1.15,
                boxShadow: `0 0 40px ${skill.color}50`,
            }}
            className="relative group cursor-pointer"
        >
            {/* Glow effect */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                style={{ background: skill.color }}
            />

            {/* Main orb */}
            <div
                className="relative w-24 h-24 rounded-2xl flex flex-col items-center justify-center glass border-2 transition-all duration-300"
                style={{
                    borderColor: `${skill.color}40`,
                }}
            >
                <span className="text-lg font-bold text-[var(--text-primary)] group-hover:text-white transition-colors">
                    {skill.name}
                </span>
                <span
                    className="text-xs mt-1 transition-colors"
                    style={{ color: skill.color }}
                >
                    {skill.category}
                </span>
            </div>

            {/* Floating animation */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: 'easeInOut',
                }}
            />
        </motion.div>
    );
}

function InfiniteMarquee({
    skills,
    direction,
    speed
}: {
    skills: string[];
    direction: 'left' | 'right';
    speed: number;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            ref={containerRef}
            className="relative flex overflow-hidden py-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

            {/* Scrolling content - duplicated for seamless loop */}
            <motion.div
                className="flex gap-4"
                animate={{
                    x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
                }}
                transition={{
                    x: {
                        duration: speed,
                        repeat: Infinity,
                        ease: 'linear',
                    },
                }}
                style={{
                    animationPlayState: isHovered ? 'paused' : 'running',
                }}
            >
                {/* First set */}
                {skills.map((skill, index) => (
                    <SkillPill key={`${skill}-1-${index}`} skill={skill} />
                ))}
                {/* Duplicate for seamless loop */}
                {skills.map((skill, index) => (
                    <SkillPill key={`${skill}-2-${index}`} skill={skill} />
                ))}
            </motion.div>
        </div>
    );
}

function SkillPill({ skill }: { skill: string }) {
    return (
        <motion.div
            whileHover={{
                scale: 1.1,
                background: 'var(--gradient-primary)',
            }}
            className="flex-shrink-0 px-5 py-2.5 rounded-full glass border border-[var(--border)] cursor-default transition-all duration-200"
        >
            <span className="text-sm font-medium text-[var(--text-secondary)] whitespace-nowrap">
                {skill}
            </span>
        </motion.div>
    );
}
