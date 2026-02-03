'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowUpRight, BookOpen } from 'lucide-react';
import { blogPosts } from '@/data/blogs';

// This component only renders if NEXT_PUBLIC_ENABLE_BLOG=true
export default function Blog() {
    const isEnabled = process.env.NEXT_PUBLIC_ENABLE_BLOG === 'true';

    if (!isEnabled) {
        return null;
    }

    return (
        <section id="blog" className="section-padding relative overflow-hidden">
            {/* Background decoration */}
            <div
                className="absolute bottom-1/3 left-0 w-96 h-96 rounded-full opacity-15"
                style={{
                    background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
                    filter: 'blur(100px)',
                    transform: 'translateX(-50%)',
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
                        Latest <span className="gradient-text">Blog Posts</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        Thoughts on software engineering, technology, and lessons learned
                    </p>
                </motion.div>

                {/* Blog Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogPosts.map((post, index) => (
                        <motion.a
                            key={post.id}
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="card-3d h-full p-6 flex flex-col">
                                {/* Icon header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                                        style={{ background: 'var(--gradient-primary)' }}
                                    >
                                        <BookOpen size={20} className="text-white" />
                                    </div>
                                    <motion.div
                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                        whileHover={{ x: 3, y: -3 }}
                                    >
                                        <ArrowUpRight size={20} className="text-[var(--primary)]" />
                                    </motion.div>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                                    {post.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-sm text-[var(--text-secondary)] mb-4 flex-1 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-0.5 text-xs rounded-md bg-[var(--surface-elevated)] text-[var(--text-muted)]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Meta */}
                                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] pt-4 border-t border-[var(--border)]">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={12} />
                                        {new Date(post.date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock size={12} />
                                        {post.readTime}
                                    </span>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Empty state if no blogs */}
                {blogPosts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <p className="text-[var(--text-muted)]">
                            Blog posts coming soon! Check back later.
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
