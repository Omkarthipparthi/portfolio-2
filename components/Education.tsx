'use client';

import { motion, useInView } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Star, Trophy, Zap } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

const coursework = [
    'Data Mining',
    'Machine Learning',
    'Cloud Computing',
    'Distributed Systems',
    'Natural Language Processing',
    'Blockchain & Applications',
];

const achievements = [
    { icon: Trophy, label: 'Top Performer', color: '#FFC627' },
    { icon: Star, label: 'Dean\'s List', color: '#8C1D40' },
    { icon: Zap, label: 'Research', color: 'var(--primary)' },
];

// Animated GPA counter
function AnimatedGPA({ inView }: { inView: boolean }) {
    const [displayValue, setDisplayValue] = useState(0);
    const targetValue = 3.97;

    useEffect(() => {
        if (!inView) return;

        const duration = 2500;
        const steps = 100;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            // Easing function for smooth animation
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * targetValue;

            if (step >= steps) {
                setDisplayValue(targetValue);
                clearInterval(timer);
            } else {
                setDisplayValue(Number(current.toFixed(2)));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [inView]);

    return (
        <motion.div
            className="relative"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
            {/* Glowing background */}
            <motion.div
                className="absolute inset-0 rounded-full opacity-50"
                style={{
                    background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity }}
            />
            <span className="relative text-6xl md:text-7xl font-bold gradient-text">
                {displayValue.toFixed(2)}
            </span>
        </motion.div>
    );
}

export default function Education() {
    const gpaRef = useRef(null);
    const gpaInView = useInView(gpaRef, { once: true, margin: '-100px' });

    return (
        <section id="education" className="section-padding relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-15"
                    style={{
                        background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                    }}
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />
            </div>

            <div className="max-w-5xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">
                        <span className="gradient-text">Education</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        My academic journey and achievements
                    </p>
                </motion.div>

                {/* Education Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    {/* Floating achievement badges */}
                    <div className="absolute -top-8 left-1/4 z-20">
                        <motion.div
                            className="glass px-3 py-2 rounded-full flex items-center gap-2"
                            animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <Trophy size={16} className="text-[#FFC627]" />
                            <span className="text-xs font-semibold text-[var(--text-primary)]">Top 5%</span>
                        </motion.div>
                    </div>

                    <div className="absolute -top-4 right-1/4 z-20">
                        <motion.div
                            className="glass px-3 py-2 rounded-full flex items-center gap-2"
                            animate={{ y: [0, -15, 0], rotate: [5, -5, 5] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                        >
                            <Star size={16} className="text-[#8C1D40]" />
                            <span className="text-xs font-semibold text-[var(--text-primary)]">Dean&apos;s List</span>
                        </motion.div>
                    </div>

                    {/* Main card */}
                    <div className="card-3d p-8 md:p-10 relative overflow-hidden">
                        {/* ASU Maroon accent - animated */}
                        <motion.div
                            className="absolute top-0 left-0 right-0 h-2"
                            style={{ background: 'linear-gradient(90deg, #8C1D40, #FFC627, #8C1D40)' }}
                            animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
                            transition={{ duration: 5, repeat: Infinity }}
                        />

                        <div className="flex flex-col lg:flex-row gap-8 items-start">
                            {/* Left - University info */}
                            <div className="flex-1">
                                {/* Degree icon with animation */}
                                <motion.div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative"
                                    style={{ background: 'linear-gradient(135deg, #8C1D40, #FFC627)' }}
                                    whileHover={{ scale: 1.1, rotate: 10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                    >
                                        <GraduationCap size={32} className="text-white" />
                                    </motion.div>
                                </motion.div>

                                {/* University name */}
                                <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2">
                                    Arizona State University
                                </h3>

                                {/* Degree */}
                                <p className="text-xl text-[var(--primary)] font-semibold mb-4">
                                    Master of Science in Computer Science
                                </p>

                                {/* Meta info */}
                                <div className="flex flex-wrap gap-4 text-[var(--text-secondary)] mb-6">
                                    <span className="flex items-center gap-2">
                                        <Calendar size={16} className="text-[var(--text-muted)]" />
                                        May 2025
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <MapPin size={16} className="text-[var(--text-muted)]" />
                                        Tempe, AZ
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    Completed an intensive graduate program focusing on software engineering,
                                    machine learning, and distributed systems. Engaged in cutting-edge research
                                    and built practical projects applying AI/ML to real-world problems.
                                </p>
                            </div>

                            {/* Right - GPA with animation */}
                            <div ref={gpaRef} className="lg:w-72 space-y-6">
                                {/* GPA Card - Animated */}
                                <motion.div
                                    className="glass p-8 rounded-2xl text-center relative overflow-hidden"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Shimmer effect */}
                                    <motion.div
                                        className="absolute inset-0 opacity-20"
                                        style={{
                                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                                        }}
                                        animate={{ x: ['-100%', '100%'] }}
                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                    />

                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <motion.div
                                            animate={{ rotate: [0, 360] }}
                                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                        >
                                            <Award size={24} className="text-[var(--accent)]" />
                                        </motion.div>
                                        <span className="text-sm text-[var(--text-muted)] uppercase tracking-wider">GPA</span>
                                    </div>

                                    <AnimatedGPA inView={gpaInView} />

                                    <motion.div
                                        className="text-sm text-[var(--text-muted)] mt-2"
                                        initial={{ opacity: 0 }}
                                        animate={gpaInView ? { opacity: 1 } : {}}
                                        transition={{ delay: 2.5 }}
                                    >
                                        out of 4.0
                                    </motion.div>
                                </motion.div>

                                {/* Achievement badges */}
                                <div className="flex gap-2 justify-center">
                                    {achievements.map((achievement, index) => (
                                        <motion.div
                                            key={achievement.label}
                                            className="glass p-3 rounded-xl"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.5 + index * 0.1 }}
                                            whileHover={{ scale: 1.1, y: -5 }}
                                        >
                                            <achievement.icon size={20} style={{ color: achievement.color }} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Relevant Coursework */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-8 pt-8 border-t border-[var(--border)]"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <BookOpen size={18} className="text-[var(--primary)]" />
                                <h4 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                                    Relevant Coursework
                                </h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {coursework.map((course, index) => (
                                    <motion.span
                                        key={course}
                                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{
                                            scale: 1.1,
                                            y: -5,
                                            background: 'var(--gradient-primary)',
                                            color: 'white',
                                        }}
                                        className="px-4 py-2 text-sm rounded-xl bg-[var(--surface-elevated)] text-[var(--text-secondary)] border border-[var(--border)] cursor-default transition-all duration-200"
                                    >
                                        {course}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
