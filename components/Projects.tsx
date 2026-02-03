'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { projects, categoryLabels, ProjectCategory } from '@/data/projects';

export default function Projects() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const nextProject = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % projects.length);
    };

    const prevProject = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    const currentProject = projects[activeIndex];

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9,
        }),
    };

    return (
        <section id="projects" className="section-padding relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20"
                    style={{
                        background: 'conic-gradient(from 0deg, var(--primary), var(--secondary), var(--accent), var(--primary))',
                        filter: 'blur(150px)',
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
                >
                    <div>
                        <motion.p
                            className="text-[var(--primary)] font-mono text-sm mb-2"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            // Featured Work
                        </motion.p>
                        <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
                            Projects I&apos;ve
                            <br />
                            <span className="gradient-text">Built</span>
                        </h2>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-4">
                        <span className="text-[var(--text-muted)] font-mono text-sm">
                            {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                        </span>
                        <div className="flex gap-2">
                            <motion.button
                                onClick={prevProject}
                                className="p-3 rounded-xl glass text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ChevronLeft size={20} />
                            </motion.button>
                            <motion.button
                                onClick={nextProject}
                                className="p-3 rounded-xl glass text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ChevronRight size={20} />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Main project showcase */}
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Project details - left side */}
                    <div className="lg:col-span-5 order-2 lg:order-1">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currentProject.id}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4 }}
                                className="space-y-6"
                            >
                                {/* Categories */}
                                <div className="flex flex-wrap gap-2">
                                    {currentProject.category.map((cat) => (
                                        <span
                                            key={cat}
                                            className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--primary)]/10 text-[var(--primary)]"
                                        >
                                            {categoryLabels[cat]}
                                        </span>
                                    ))}
                                    {currentProject.featured && (
                                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center gap-1">
                                            <Sparkles size={12} />
                                            Featured
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h3 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
                                    {currentProject.title}
                                </h3>

                                {/* Description */}
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    {currentProject.longDescription}
                                </p>

                                {/* Tech stack */}
                                <div>
                                    <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-3">Tech Stack</p>
                                    <div className="flex flex-wrap gap-2">
                                        {currentProject.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1.5 text-sm rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--primary)]/50 transition-colors"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-4 pt-4">
                                    {currentProject.githubUrl && currentProject.githubUrl !== '#' && (
                                        <motion.a
                                            href={currentProject.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors font-medium"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Github size={18} />
                                            Source Code
                                        </motion.a>
                                    )}
                                    <motion.a
                                        href={currentProject.githubUrl !== '#' ? currentProject.githubUrl : undefined}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--text-primary)] text-[var(--background)] font-medium hover:opacity-90 transition-opacity"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <ExternalLink size={18} />
                                        View Project
                                    </motion.a>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Stacked cards visualization - right side */}
                    <div className="lg:col-span-7 order-1 lg:order-2">
                        <div className="relative h-[400px] md:h-[500px]">
                            {projects.map((project, index) => {
                                const offset = (index - activeIndex + projects.length) % projects.length;
                                const isActive = index === activeIndex;

                                // Only show current and next 2 cards
                                if (offset > 2 && offset < projects.length - 1) return null;

                                // Calculate position for stacked effect
                                let xOffset = offset * 30;
                                let yOffset = offset * 20;
                                let scale = 1 - offset * 0.08;
                                let zIndex = projects.length - offset;

                                // Handle wrapping for previous card
                                if (offset > 2) {
                                    xOffset = -50;
                                    yOffset = 0;
                                    scale = 0.9;
                                    zIndex = 0;
                                }

                                return (
                                    <motion.div
                                        key={project.id}
                                        className="absolute inset-0 cursor-pointer"
                                        style={{ zIndex }}
                                        animate={{
                                            x: xOffset,
                                            y: yOffset,
                                            scale,
                                            opacity: offset > 2 ? 0 : 1,
                                        }}
                                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                        onClick={() => {
                                            setDirection(1);
                                            setActiveIndex(index);
                                        }}
                                        whileHover={isActive ? { y: -5 } : {}}
                                    >
                                        <div
                                            className={`h-full rounded-3xl overflow-hidden border border-[var(--border)] p-6 flex flex-col justify-between`}
                                            style={{
                                                background: isActive
                                                    ? 'rgba(255,255,255,0.05)'
                                                    : 'var(--surface)',
                                                boxShadow: isActive ? '0 25px 50px -12px rgba(0,0,0,0.5)' : 'none',
                                            }}
                                        >
                                            {/* Card header */}
                                            <div>
                                                <div className="flex items-start justify-between mb-6">
                                                    <span className={`text-6xl md:text-7xl font-bold ${isActive ? 'text-white' : 'text-[var(--surface-elevated)]'}`}>
                                                        {String(index + 1).padStart(2, '0')}
                                                    </span>
                                                    {project.featured && isActive && (
                                                        <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center">
                                                            <Sparkles size={20} className="text-[var(--accent)]" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Only show text content on active card */}
                                                {isActive && (
                                                    <>
                                                        <h4 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-2">
                                                            {project.title}
                                                        </h4>
                                                        <p className="text-[var(--text-secondary)] text-sm line-clamp-2">
                                                            {project.description}
                                                        </p>
                                                    </>
                                                )}
                                            </div>

                                            {/* Card footer - only on active card */}
                                            {isActive && (
                                                <div className="flex flex-wrap gap-2 mt-auto pt-6">
                                                    {project.technologies.slice(0, 3).map((tech) => (
                                                        <span
                                                            key={tech}
                                                            className="px-2 py-1 text-xs rounded-md bg-[var(--surface-elevated)] text-[var(--text-muted)]"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Project thumbnails / dots */}
                <motion.div
                    className="flex justify-center gap-2 mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {projects.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => {
                                setDirection(index > activeIndex ? 1 : -1);
                                setActiveIndex(index);
                            }}
                            className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex
                                ? 'w-8 bg-[var(--primary)]'
                                : 'w-2 bg-[var(--border)] hover:bg-[var(--text-muted)]'
                                }`}
                            whileHover={{ scale: 1.2 }}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
