export interface Skill {
    name: string;
    icon?: string;
}

export interface SkillCategory {
    title: string;
    color: string;
    skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
    {
        title: 'Languages',
        color: 'var(--primary)',
        skills: [
            { name: 'TypeScript' },
            { name: 'JavaScript' },
            { name: 'Python' },
            { name: 'Java' },
            { name: 'Go' },
            { name: 'Solidity' },
            { name: 'SQL' },
            { name: 'HTML/CSS' },
        ],
    },
    {
        title: 'Frontend',
        color: 'var(--secondary)',
        skills: [
            { name: 'React' },
            { name: 'Next.js' },
            { name: 'Angular' },
            { name: 'Tailwind CSS' },
            { name: 'Framer Motion' },
        ],
    },
    {
        title: 'Backend',
        color: 'var(--accent)',
        skills: [
            { name: 'Node.js' },
            { name: 'FastAPI' },
            { name: 'Spring Boot' },
            { name: 'REST APIs' },
            { name: 'GraphQL' },
        ],
    },
    {
        title: 'Cloud & DevOps',
        color: 'var(--primary)',
        skills: [
            { name: 'GCP' },
            { name: 'AWS' },
            { name: 'Docker' },
            { name: 'Kubernetes' },
            { name: 'Terraform' },
            { name: 'CI/CD' },
        ],
    },
    {
        title: 'Databases',
        color: 'var(--secondary)',
        skills: [
            { name: 'PostgreSQL' },
            { name: 'MongoDB' },
            { name: 'DynamoDB' },
            { name: 'Redis' },
            { name: 'ChromaDB' },
        ],
    },
    {
        title: 'AI/ML & Data',
        color: 'var(--accent)',
        skills: [
            { name: 'TensorFlow' },
            { name: 'PyTorch' },
            { name: 'LangChain' },
            { name: 'PySpark' },
            { name: 'Pandas' },
            { name: 'NLP' },
        ],
    },
];
