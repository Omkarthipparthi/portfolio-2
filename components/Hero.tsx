'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, Sparkles } from 'lucide-react';
import Image from 'next/image';

const roles = [
    'Software Engineer',
    'Full Stack Developer',
    'Cloud Architect',
    'AI/ML Explorer',
];

export default function Hero() {
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const containerRef = useRef<HTMLElement>(null);

    // Mouse tracking for interactive gradient
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
    const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

    const gradientX = useTransform(smoothX, [0, 1], [0, 100]);
    const gradientY = useTransform(smoothY, [0, 1], [0, 100]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            mouseX.set((e.clientX - rect.left) / rect.width);
            mouseY.set((e.clientY - rect.top) / rect.height);
        }
    }, [mouseX, mouseY]);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    // Typewriter effect
    useEffect(() => {
        const currentRole = roles[currentRoleIndex];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (displayedText.length < currentRole.length) {
                    setDisplayedText(currentRole.slice(0, displayedText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                if (displayedText.length > 0) {
                    setDisplayedText(displayedText.slice(0, -1));
                } else {
                    setIsDeleting(false);
                    setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
                }
            }
        }, isDeleting ? 50 : 100);
        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, currentRoleIndex]);

    const socialLinks = [
        { icon: Github, href: process.env.NEXT_PUBLIC_GITHUB_URL || '#', label: 'GitHub' },
        { icon: Linkedin, href: process.env.NEXT_PUBLIC_LINKEDIN_URL || '#', label: 'LinkedIn' },
        { icon: Mail, href: `mailto:${process.env.NEXT_PUBLIC_EMAIL || ''}`, label: 'Email' },
    ];

    return (
        <section
            ref={containerRef}
            id="home"
            className="min-h-screen relative overflow-hidden flex items-center"
        >
            {/* Animated mesh gradient background */}
            <motion.div
                className="absolute inset-0"
                style={{
                    background: `
                        radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at ${100 - gradientX.get()}% ${100 - gradientY.get()}%, rgba(6, 182, 212, 0.2) 0%, transparent 50%),
                        radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.1) 0%, transparent 60%)
                    `,
                }}
            />

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Noise texture */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
                }}
            />

            {/* Main content - Bento-style layout */}
            <div className="max-w-7xl mx-auto px-6 py-20 w-full relative z-10">
                <div className="grid grid-cols-12 gap-4 md:gap-6">

                    {/* Main headline - spans most of the grid */}
                    <motion.div
                        className="col-span-12 lg:col-span-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Greeting badge */}
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-sm text-[var(--text-secondary)]">Available for opportunities</span>
                        </motion.div>

                        {/* Big text - editorial style */}
                        <h1 className="mb-6">
                            <motion.span
                                className="block text-6xl md:text-7xl lg:text-8xl font-bold text-[var(--text-primary)] leading-none tracking-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                Omkar
                            </motion.span>
                            <motion.span
                                className="block text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight mt-2"
                                style={{
                                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 50%, var(--accent) 100%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                Thipparthi
                            </motion.span>
                        </h1>

                        {/* Animated role with bracket styling */}
                        <motion.div
                            className="flex items-center gap-3 text-xl md:text-2xl mb-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <span className="text-[var(--text-muted)]">{'<'}</span>
                            <span className="text-[var(--primary)] font-mono">{displayedText}</span>
                            <motion.span
                                className="text-[var(--accent)]"
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                _
                            </motion.span>
                            <span className="text-[var(--text-muted)]">{'/>'}</span>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            className="text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            Building the future with code. Crafting scalable systems,
                            cloud-native solutions, and AI-powered experiences.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            className="flex flex-wrap gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <a href="#projects" className="group inline-flex items-center gap-2 px-6 py-3 bg-[var(--text-primary)] text-[var(--background)] rounded-xl font-medium hover:scale-105 transition-transform">
                                View Work
                                <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                            </a>
                            <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border)] rounded-xl text-[var(--text-primary)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
                                Let&apos;s Talk
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Profile image card */}
                    <motion.div
                        className="col-span-12 lg:col-span-4 row-span-2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className="relative h-full min-h-[400px] rounded-3xl overflow-hidden glass p-3">
                            <div className="relative h-full rounded-2xl overflow-hidden">
                                <Image
                                    src="/images/profile.jpg"
                                    alt="Omkar Thipparthi"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-60" />

                                {/* Floating stats */}
                                <motion.div
                                    className="absolute bottom-4 left-4 right-4 glass p-4 rounded-xl"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="text-2xl font-bold text-[var(--text-primary)]">3+</div>
                                            <div className="text-xs text-[var(--text-muted)]">Years Exp</div>
                                        </div>
                                        <div className="h-8 w-px bg-[var(--border)]" />
                                        <div>
                                            <div className="text-2xl font-bold text-[var(--text-primary)]">3.97</div>
                                            <div className="text-xs text-[var(--text-muted)]">GPA</div>
                                        </div>
                                        <div className="h-8 w-px bg-[var(--border)]" />
                                        <div>
                                            <div className="text-2xl font-bold text-[var(--text-primary)]">25+</div>
                                            <div className="text-xs text-[var(--text-muted)]">Projects</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Social links card */}
                    <motion.div
                        className="col-span-6 lg:col-span-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                    >
                        <div className="glass p-6 rounded-2xl h-full">
                            <p className="text-sm text-[var(--text-muted)] mb-4">Connect</p>
                            <div className="flex gap-3">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-xl bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--primary)] hover:scale-110 transition-all"
                                        whileHover={{ y: -3 }}
                                        aria-label={social.label}
                                    >
                                        <social.icon size={20} />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Location/status card */}
                    <motion.div
                        className="col-span-6 lg:col-span-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                    >
                        <div className="glass p-6 rounded-2xl h-full">
                            <p className="text-sm text-[var(--text-muted)] mb-2">Currently</p>
                            <p className="text-[var(--text-primary)] font-medium">Ford Motor Company</p>
                            <p className="text-sm text-[var(--text-secondary)]">Software Engineer</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <motion.a
                    href="#about"
                    className="flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <span className="text-xs">Scroll</span>
                    <ArrowDown size={16} />
                </motion.a>
            </motion.div>
        </section>
    );
}
