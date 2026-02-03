export type ProjectCategory = 'all' | 'ai-ml' | 'blockchain' | 'web' | 'data';

export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    category: ProjectCategory[];
    technologies: string[];
    githubUrl: string;
    featured: boolean;
}

export const projects: Project[] = [
    {
        id: 'leet2git',
        title: 'Leet2Git',
        description: 'Chrome extension that automates LeetCode submissions to GitHub',
        longDescription: 'Developed a Chrome extension using Angular (TypeScript) that automates code submissions to GitHub. Features include content scripts for real-time page interaction, background service workers for asynchronous data processing, and OAuth for secure GitHub authentication.',
        category: ['web'],
        technologies: ['Angular', 'TypeScript', 'Chrome Extension', 'OAuth', 'GitHub API'],
        githubUrl: 'https://github.com/Omkarthipparthi/L2G',
        featured: true,
    },
    {
        id: 'nl2sql',
        title: 'NL2SQL - Natural Language to SQL',
        description: 'NLP system that translates human-readable queries into SQL commands',
        longDescription: 'Designed and implemented a Natural Language Processing system to translate human-readable queries into structured SQL commands. Utilized ChromaDB vector database for vectorized schemas and trained queries. Evaluated using Spider 2.0 benchmarking datasets.',
        category: ['ai-ml', 'data'],
        technologies: ['Python', 'NLP', 'ChromaDB', 'LLMs', 'SQL', 'Spider 2.0'],
        githubUrl: 'https://github.com/Omkarthipparthi/NL2SQL',
        featured: true,
    },
    {
        id: 'money-management',
        title: 'Money Management Using Blockchain',
        description: 'Decentralized app for automated ether distribution to wallets',
        longDescription: 'Developed a decentralized money management application on the Ethereum test network that allows ether to be distributed automatically to designated wallets based on customizable parameters (asset percentages, dates, or times).',
        category: ['blockchain'],
        technologies: ['Solidity', 'Ethereum', 'MetaMask', 'Ropsten', 'Smart Contracts'],
        githubUrl: 'https://github.com/Omkarthipparthi/MoneyManagement',
        featured: false,
    },
    {
        id: 'supply-chain',
        title: 'Decentralized Supply Chain Management',
        description: 'Blockchain-based product lifecycle management using Hyperledger Fabric',
        longDescription: 'Designed and implemented a decentralized supply chain management system using Hyperledger Fabric, focusing on product lifecycle management and ownership transfer. Developed smart contracts in Go to track products across multiple organizations.',
        category: ['blockchain'],
        technologies: ['Hyperledger Fabric', 'Go', 'Docker', 'Smart Contracts', 'Blockchain'],
        githubUrl: 'https://github.com/Omkarthipparthi/CSE598-EBA-Project2',
        featured: false,
    },
    {
        id: 'gradedevils',
        title: 'GradeDevils',
        description: 'AI-powered grading platform using AWS and machine learning',
        longDescription: 'Designed an AI-powered grading platform using AWS Lambda, DynamoDB, S3, Bedrock, and SageMaker to automate grading workflows. Developed ML pipelines to classify and score student submissions using supervised learning techniques.',
        category: ['ai-ml', 'web'],
        technologies: ['AWS Lambda', 'DynamoDB', 'S3', 'SageMaker', 'Bedrock', 'Python'],
        githubUrl: 'https://github.com/Omkarthipparthi/GradeDevils',
        featured: true,
    },
    {
        id: 'text-classification',
        title: 'Multi-label Text Classification',
        description: 'Deep learning models with attention mechanisms for text classification',
        longDescription: 'Designed multi-label text classification models integrating BiLSTM, CNN, and multi-head attention mechanisms. Achieved Micro F1 score of 0.85 and accuracy of 88% on benchmark datasets using GloVe and BERT embeddings.',
        category: ['ai-ml', 'data'],
        technologies: ['TensorFlow', 'BiLSTM', 'CNN', 'BERT', 'GloVe', 'Python'],
        githubUrl: '#',
        featured: false,
    },
];

export const categoryLabels: Record<ProjectCategory, string> = {
    'all': 'All Projects',
    'ai-ml': 'AI/ML',
    'blockchain': 'Blockchain',
    'web': 'Web Dev',
    'data': 'Data Engineering',
};
