'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar, Briefcase, ChevronRight } from 'lucide-react';
import { experiences } from '@/data/experience';

export default function Experience() {
    return (
        <section id="experience" className="section-padding relative overflow-hidden">
            {/* Background decoration */}
            <div
                className="absolute top-1/3 right-0 w-96 h-96 rounded-full opacity-15"
                style={{
                    background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
                    filter: 'blur(100px)',
                    transform: 'translateX(50%)',
                }}
            />

            <div className="max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">
                        Work <span className="gradient-text">Experience</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        My professional journey building impactful software
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] transform md:-translate-x-1/2" />

                    {/* Experience cards */}
                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-[var(--primary)] transform -translate-x-1/2 md:-translate-x-1/2 mt-8 z-10">
                                    <div className="absolute inset-0 rounded-full bg-[var(--primary)] animate-ping opacity-30" />
                                </div>

                                {/* Date badge - desktop */}
                                <div
                                    className={`hidden md:flex w-1/2 items-start ${index % 2 === 0 ? 'justify-end pr-12' : 'justify-start pl-12'
                                        }`}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="glass px-4 py-2 rounded-xl mt-6"
                                    >
                                        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                                            <Calendar size={14} />
                                            <span className="text-sm font-medium">{exp.duration}</span>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Card */}
                                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'} pl-8 md:pl-12`}>
                                    <motion.div
                                        className="card-3d p-6 relative group"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {/* Type badge */}
                                        <div className="absolute -top-3 right-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${exp.type === 'internship'
                                                        ? 'bg-[var(--secondary)]/20 text-[var(--secondary)]'
                                                        : 'bg-[var(--primary)]/20 text-[var(--primary)]'
                                                    }`}
                                            >
                                                {exp.type === 'internship' ? 'Internship' : 'Full-time'}
                                            </span>
                                        </div>

                                        {/* Header */}
                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">
                                                {exp.role}
                                            </h3>
                                            <div className="flex items-center gap-2 text-[var(--primary)] font-semibold">
                                                <Briefcase size={16} />
                                                {exp.company}
                                            </div>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-[var(--text-muted)]">
                                                <span className="flex items-center gap-1">
                                                    <MapPin size={14} />
                                                    {exp.location}
                                                </span>
                                                <span className="md:hidden flex items-center gap-1">
                                                    <Calendar size={14} />
                                                    {exp.duration}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Highlights */}
                                        <ul className="space-y-2 mb-4">
                                            {exp.highlights.slice(0, 3).map((highlight, i) => (
                                                <motion.li
                                                    key={i}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="flex gap-2 text-sm text-[var(--text-secondary)]"
                                                >
                                                    <ChevronRight
                                                        size={16}
                                                        className="flex-shrink-0 mt-0.5 text-[var(--primary)]"
                                                    />
                                                    <span className="line-clamp-2">{highlight}</span>
                                                </motion.li>
                                            ))}
                                            {exp.highlights.length > 3 && (
                                                <li className="text-xs text-[var(--text-muted)] pl-6">
                                                    +{exp.highlights.length - 3} more achievements
                                                </li>
                                            )}
                                        </ul>

                                        {/* Technologies */}
                                        <div className="flex flex-wrap gap-2">
                                            {exp.technologies.slice(0, 6).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-2 py-1 text-xs rounded-md bg-[var(--surface-elevated)] text-[var(--text-secondary)] border border-[var(--border)]"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {exp.technologies.length > 6 && (
                                                <span className="px-2 py-1 text-xs rounded-md bg-[var(--surface-elevated)] text-[var(--text-muted)]">
                                                    +{exp.technologies.length - 6}
                                                </span>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
