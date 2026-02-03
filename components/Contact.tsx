'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, Github, Linkedin, ExternalLink, Send, Sparkles } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const socialLinks = [
    {
        name: 'GitHub',
        icon: Github,
        href: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/Omkarthipparthi',
        color: '#333',
        hoverBg: 'bg-[#333]',
    },
    {
        name: 'LinkedIn',
        icon: Linkedin,
        href: process.env.NEXT_PUBLIC_LINKEDIN_URL || '#',
        color: '#0077B5',
        hoverBg: 'bg-[#0077B5]',
    },
    {
        name: 'Email',
        icon: Mail,
        href: `mailto:${process.env.NEXT_PUBLIC_EMAIL || 'hello@example.com'}`,
        color: 'var(--primary)',
        hoverBg: 'bg-[var(--primary)]',
    },
];

// Particle configuration for burst effect
interface Particle {
    id: number;
    x: number;
    y: number;
    angle: number;
    velocity: number;
    size: number;
    color: string;
}

// Floating background particles - generated client-side only
interface BGParticle {
    id: number;
    left: number;
    top: number;
    duration: number;
    delay: number;
}

function FloatingParticles() {
    const [particles, setParticles] = useState<BGParticle[]>([]);

    useEffect(() => {
        // Generate random positions only on client
        const newParticles: BGParticle[] = [];
        for (let i = 0; i < 20; i++) {
            newParticles.push({
                id: i,
                left: Math.random() * 100,
                top: Math.random() * 100,
                duration: 5 + Math.random() * 5,
                delay: Math.random() * 5,
            });
        }
        setParticles(newParticles);
    }, []);

    if (particles.length === 0) return null;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute w-1 h-1 rounded-full bg-[var(--primary)]"
                    style={{
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                        opacity: 0.3,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0.1, 0.5, 0.1],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                    }}
                />
            ))}
        </div>
    );
}

function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Magnetic pull effect - button moves towards cursor
        const deltaX = (e.clientX - centerX) * 0.3;
        const deltaY = (e.clientY - centerY) * 0.3;

        mouseX.set(deltaX);
        mouseY.set(deltaY);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        // Create particle burst
        const colors = ['var(--primary)', 'var(--secondary)', 'var(--accent)', '#fff'];
        const newParticles: Particle[] = [];
        for (let i = 0; i < 12; i++) {
            newParticles.push({
                id: i,
                x: 0,
                y: 0,
                angle: (i / 12) * Math.PI * 2,
                velocity: 50 + Math.random() * 50,
                size: 3 + Math.random() * 4,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }
        setParticles(newParticles);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
        // Clear particles after animation
        setTimeout(() => setParticles([]), 500);
    };

    return (
        <motion.a
            ref={buttonRef}
            href={href}
            className="relative inline-flex items-center gap-3 btn-primary text-lg px-8 py-4 overflow-visible"
            style={{ x, y }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            whileTap={{ scale: 0.95 }}
        >
            {/* Particle burst effect */}
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        background: particle.color,
                        boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                    }}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                        x: Math.cos(particle.angle) * particle.velocity,
                        y: Math.sin(particle.angle) * particle.velocity,
                        opacity: 0,
                        scale: 0,
                    }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                />
            ))}

            {/* Glow effect on hover */}
            <motion.div
                className="absolute inset-0 rounded-xl opacity-0"
                style={{
                    background: 'var(--gradient-primary)',
                    filter: 'blur(20px)',
                }}
                animate={{ opacity: isHovered ? 0.5 : 0 }}
            />

            {/* Sparkle icon that appears on hover */}
            <motion.div
                className="absolute -top-2 -right-2"
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={isHovered ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -45 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <Sparkles size={20} className="text-[var(--accent)]" />
            </motion.div>

            <span className="relative z-10 flex items-center gap-3">
                {children}
            </span>
        </motion.a>
    );
}

function MagneticSocialIcon({ social, index }: { social: typeof socialLinks[0]; index: number }) {
    const iconRef = useRef<HTMLAnchorElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 200 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);
    const rotate = useSpring(useTransform(mouseX, [-30, 30], [-15, 15]), springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!iconRef.current) return;
        const rect = iconRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) * 0.4);
        mouseY.set((e.clientY - centerY) * 0.4);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.a
            ref={iconRef}
            href={social.href}
            target={social.name !== 'Email' ? '_blank' : undefined}
            rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
            className="relative p-4 rounded-xl glass text-[var(--text-secondary)] transition-all duration-300 group"
            style={{ x, y, rotate }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={social.name}
        >
            {/* Hover background */}
            <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: social.color }}
            />
            <social.icon size={24} className="relative z-10 group-hover:text-white transition-colors" />
        </motion.a>
    );
}

export default function Contact() {
    const email = process.env.NEXT_PUBLIC_EMAIL || 'hello@example.com';
    const resumeLink = process.env.NEXT_PUBLIC_RESUME_LINK || '#';

    return (
        <section id="contact" className="section-padding relative overflow-hidden">
            {/* Animated background gradient */}
            <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                    background: 'radial-gradient(ellipse at center bottom, var(--primary) 0%, transparent 60%)',
                    filter: 'blur(100px)',
                }}
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 5, repeat: Infinity }}
            />

            {/* Floating particles - rendered client-side only */}
            <FloatingParticles />

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="section-title">
                        Get In <span className="gradient-text">Touch</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        I&apos;m always open to discussing new opportunities and interesting projects
                    </p>
                </motion.div>

                {/* Main Contact Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="card-3d p-8 md:p-12 text-center relative overflow-hidden"
                >
                    {/* Animated gradient border */}
                    <motion.div
                        className="absolute inset-0 opacity-50"
                        style={{
                            background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 50%, var(--accent) 100%)',
                            padding: '1px',
                            borderRadius: '16px',
                            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            maskComposite: 'exclude',
                            WebkitMaskComposite: 'xor',
                        }}
                        animate={{
                            background: [
                                'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 50%, var(--accent) 100%)',
                                'linear-gradient(225deg, var(--primary) 0%, var(--secondary) 50%, var(--accent) 100%)',
                                'linear-gradient(315deg, var(--primary) 0%, var(--secondary) 50%, var(--accent) 100%)',
                                'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 50%, var(--accent) 100%)',
                            ],
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />

                    {/* Email CTA */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <motion.div
                            className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center relative"
                            style={{ background: 'var(--gradient-primary)' }}
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <Send size={36} className="text-white" />

                            {/* Pulsing ring effect */}
                            <motion.div
                                className="absolute inset-0 rounded-2xl"
                                style={{ border: '2px solid var(--primary)' }}
                                animate={{
                                    scale: [1, 1.4],
                                    opacity: [0.5, 0],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.div>

                        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                            Let&apos;s Build Something Amazing
                        </h3>
                        <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
                            Whether you have a project idea, job opportunity, or just want to say hello —
                            I&apos;d love to hear from you!
                        </p>

                        {/* Magnetic Button */}
                        <MagneticButton href={`mailto:${email}`}>
                            <Mail size={20} />
                            Say Hello
                        </MagneticButton>

                        <motion.p
                            className="text-sm text-[var(--text-muted)] mt-6"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            {email}
                        </motion.p>
                    </motion.div>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-8">
                        <motion.div
                            className="flex-1 h-px bg-[var(--border)]"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        />
                        <span className="text-[var(--text-muted)] text-sm">or connect with me</span>
                        <motion.div
                            className="flex-1 h-px bg-[var(--border)]"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        />
                    </div>

                    {/* Magnetic Social Links */}
                    <div className="flex justify-center gap-4 mb-8">
                        {socialLinks.map((social, index) => (
                            <MagneticSocialIcon key={social.name} social={social} index={index} />
                        ))}
                    </div>

                    {/* Resume Link */}
                    <motion.a
                        href={resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors text-sm group"
                        whileHover={{ x: 5 }}
                    >
                        <ExternalLink size={16} className="group-hover:rotate-45 transition-transform" />
                        View my resume
                    </motion.a>
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-16 pt-8 border-t border-[var(--border)]"
                >
                    <p className="text-[var(--text-muted)] text-sm">
                        Designed & Built by{' '}
                        <span className="gradient-text font-semibold">Omkar Thipparthi</span>
                    </p>
                    <p className="text-[var(--text-muted)] text-xs mt-2">
                        © {new Date().getFullYear()} All rights reserved.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
