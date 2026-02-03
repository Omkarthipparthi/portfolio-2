export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    tags: string[];
    url: string;
}

// Add your blog posts here
// The blog section will only show if NEXT_PUBLIC_ENABLE_BLOG=true in .env.local
export const blogPosts: BlogPost[] = [
    {
        id: 'sample-1',
        title: 'Building Scalable Data Pipelines with GCP',
        excerpt: 'A deep dive into designing and implementing event-driven data pipelines using GCP Pub/Sub, Cloud Functions, and BigQuery for real-time analytics.',
        date: '2025-01-15',
        readTime: '8 min read',
        tags: ['GCP', 'Data Engineering', 'Cloud'],
        url: '#', // Replace with your actual blog URL
    },
    {
        id: 'sample-2',
        title: 'From Angular 2 to Angular 12: Migration Lessons',
        excerpt: 'Key insights and best practices learned from leading a large-scale Angular migration project, including common pitfalls and how to avoid them.',
        date: '2024-11-20',
        readTime: '6 min read',
        tags: ['Angular', 'Frontend', 'Migration'],
        url: '#', // Replace with your actual blog URL
    },
    {
        id: 'sample-3',
        title: 'Natural Language to SQL: An AI Approach',
        excerpt: 'Exploring how modern LLMs can translate human queries into structured SQL, making databases accessible to non-technical users.',
        date: '2024-09-05',
        readTime: '10 min read',
        tags: ['AI/ML', 'NLP', 'SQL'],
        url: '#', // Replace with your actual blog URL
    },
];
