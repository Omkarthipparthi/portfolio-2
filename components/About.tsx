'use client';

import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion';
import { Code2, Cloud, Brain, Database, Briefcase, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

interface StatItem {
    label: string;
    value: number;
    suffix: string;
    icon: typeof Briefcase;
}

const stats: StatItem[] = [
    { label: 'Years Experience', value: 3, suffix: '+', icon: Briefcase },
    { label: 'Projects Built', value: 6, suffix: '+', icon: Code2 },
    { label: 'Companies', value: 3, suffix: '', icon: Cloud },
    { label: 'GPA', value: 3.97, suffix: '', icon: GraduationCap },
];

const techHighlights = [
    { name: 'Full Stack', icon: Code2, color: 'var(--primary)' },
    { name: 'Cloud & DevOps', icon: Cloud, color: 'var(--secondary)' },
    { name: 'AI/ML', icon: Brain, color: 'var(--accent)' },
    { name: 'Data Engineering', icon: Database, color: 'var(--primary)' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
    },
};

// Animated counter component
function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (!inView) return;

        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = value / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            current = (value / steps) * step;

            if (step >= steps) {
                setDisplayValue(value);
                clearInterval(timer);
            } else {
                setDisplayValue(Number.isInteger(value) ? Math.floor(current) : Number(current.toFixed(2)));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [inView, value]);

    return (
        <span>
            {Number.isInteger(value) ? displayValue : displayValue.toFixed(2)}
            {suffix}
        </span>
    );
}

export default function About() {
    const sectionRef = useRef(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const statsInView = useInView(statsRef, { once: true, margin: '-100px' });

    // Mouse position for parallax effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animations for parallax
    const springConfig = { damping: 25, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (imageRef.current) {
                const rect = imageRef.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                mouseX.set(e.clientX - centerX);
                mouseY.set(e.clientY - centerY);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section ref={sectionRef} id="about" className="section-padding relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full opacity-20"
                style={{
                    background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)',
                    filter: 'blur(100px)',
                    transform: 'translate(-50%, -50%)',
                }}
            />

            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        Passionate about building impactful software solutions
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left - Image with 3D parallax effect */}
                    <motion.div
                        ref={imageRef}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8 }}
                        className="relative perspective-1000"
                    >
                        <div className="relative mx-auto w-fit">
                            {/* Decorative frame */}
                            <div
                                className="absolute -inset-4 rounded-2xl opacity-50"
                                style={{
                                    background: 'var(--gradient-primary)',
                                    filter: 'blur(30px)',
                                }}
                            />

                            {/* Main image container with parallax */}
                            <motion.div
                                className="relative card-3d p-2 rounded-2xl overflow-hidden"
                                style={{
                                    rotateX,
                                    rotateY,
                                    transformStyle: 'preserve-3d',
                                }}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="relative w-80 h-96 rounded-xl overflow-hidden">
                                    <Image
                                        src="/images/profile.jpg"
                                        alt="Omkar Thipparthi"
                                        fill
                                        className="object-cover"
                                    />
                                    {/* Gradient overlay */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: 'linear-gradient(180deg, transparent 60%, rgba(10, 10, 15, 0.8) 100%)',
                                        }}
                                    />
                                </div>

                                {/* 3D floating layer */}
                                <motion.div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{ transform: 'translateZ(50px)' }}
                                />
                            </motion.div>

                            {/* Floating elements */}
                            <motion.div
                                className="absolute -top-6 -right-6 glass px-4 py-3 rounded-xl"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <span className="gradient-text font-bold text-lg">MS CS</span>
                                <p className="text-xs text-[var(--text-muted)]">Arizona State</p>
                            </motion.div>

                            <motion.div
                                className="absolute -bottom-4 -left-6 glass px-4 py-3 rounded-xl"
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <span className="text-2xl">🚀</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right - Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        className="space-y-8"
                    >
                        {/* Bio */}
                        <motion.div variants={itemVariants} className="space-y-4">
                            <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
                                Hi, I&apos;m Omkar! 👋
                            </h3>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                I&apos;m a <span className="text-[var(--primary)] font-medium">Software Engineer</span> with
                                over 3 years of experience crafting scalable applications and cloud-native solutions.
                                Currently at <span className="text-[var(--secondary)] font-medium">Ford Motor Company</span>,
                                I build high-performance EV telemetry tools and data pipelines that power real-time decision making.
                            </p>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                I hold a Master&apos;s in Computer Science from <span className="text-[var(--accent)] font-medium">Arizona State University</span> with
                                a GPA of 3.97. My journey spans from front-end optimization to designing event-driven
                                architectures on GCP, and I love exploring the intersection of AI/ML with practical engineering problems.
                            </p>
                        </motion.div>

                        {/* Stats Grid with Animated Counters */}
                        <motion.div
                            ref={statsRef}
                            variants={itemVariants}
                            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    className="card-3d p-4 text-center group"
                                    whileHover={{ scale: 1.08, y: -5 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <motion.div
                                        animate={statsInView ? { rotate: [0, 10, -10, 0] } : {}}
                                        transition={{ delay: index * 0.2, duration: 0.5 }}
                                    >
                                        <stat.icon className="w-6 h-6 mx-auto mb-2 text-[var(--primary)] group-hover:scale-110 transition-transform" />
                                    </motion.div>
                                    <div className="text-2xl font-bold gradient-text">
                                        <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={statsInView} />
                                    </div>
                                    <div className="text-xs text-[var(--text-muted)]">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Tech Highlights */}
                        <motion.div variants={itemVariants}>
                            <h4 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">
                                Core Expertise
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                {techHighlights.map((tech, index) => (
                                    <motion.div
                                        key={tech.name}
                                        className="flex items-center gap-2 glass px-4 py-2 rounded-xl"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <tech.icon
                                            className="w-4 h-4"
                                            style={{ color: tech.color }}
                                        />
                                        <span className="text-sm font-medium text-[var(--text-primary)]">
                                            {tech.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
