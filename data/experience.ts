export interface Experience {
    id: string;
    company: string;
    role: string;
    duration: string;
    location: string;
    type: 'full-time' | 'internship';
    highlights: string[];
    technologies: string[];
}

export const experiences: Experience[] = [
    {
        id: 'ford',
        company: 'Ford Motor Company',
        role: 'Software Engineer',
        duration: 'Jul 2025 – Present',
        location: 'Long Beach, CA',
        type: 'full-time',
        highlights: [
            'Engineered high-performance EV telemetry and cost visualization tools using Next.js and Tailwind, enabling engineers to explore large datasets and make real-time, data-driven decisions',
            'Designed and owned scalable backend services using Python (FastAPI), delivering secure RESTful APIs consumed by internal dashboards and partner services',
            'Built and maintained ETL/data pipelines for BOM (Bill of Materials), telemetry, and cost signals, validating part and variant mappings to power downstream reporting and forecasting workflows',
            'Implemented event-driven ingestion on GCP Pub/Sub, decoupling producers/consumers and improving reliability and horizontal scalability of backend workflows',
            'Containerized backend services with Docker and deployed on GCP Cloud Run, provisioning supporting infrastructure via Terraform (IaC)',
            'Delivered an end-to-end internal EV charging platform that processes charging-session telemetry and provides utilization, performance, and cost monitoring across several EV programs',
        ],
        technologies: ['Next.js', 'Tailwind', 'Python', 'FastAPI', 'GCP', 'Docker', 'Terraform', 'Pub/Sub'],
    },
    {
        id: 'rocket',
        company: 'Rocket Mortgage',
        role: 'Software Engineer Intern',
        duration: 'Jun 2025 – Jul 2025',
        location: 'Detroit, MI',
        type: 'internship',
        highlights: [
            'Built an AI-powered incident analysis service leveraging MCP servers and tools such as GitHub, PagerDuty, and Dynatrace to correlate code changes, alerts, and telemetry',
            'Enabled faster root-cause prediction and improved after-hours support response',
            'Built responsive web apps with Angular and scalable backend APIs using Java Spring Boot',
        ],
        technologies: ['Angular', 'Java', 'Spring Boot', 'AI/ML', 'PagerDuty', 'Dynatrace'],
    },
    {
        id: 'opentext',
        company: 'OpenText',
        role: 'Software Engineer',
        duration: 'Oct 2020 – Jul 2023',
        location: 'Hyderabad, IN',
        type: 'full-time',
        highlights: [
            'Led front-end and API optimization efforts, reducing Angular-based UI load times by 30% through enhanced component design, lazy loading, and efficient REST API integration',
            'Developed and maintained scalable RESTful services and Java Spring Boot backends using JPA/Hibernate, enabling seamless cross-database operations',
            'Successfully piloted an 8-week migration project from Angular 2 to Angular 12, demonstrating expertise in large-scale migrations',
            'Supervised and mentored interns in migrating test components from Selenium to Cypress, boosting testing efficiency and reliability',
            'Led migration of core functionalities from on-premises to cloud, applying Spring Cloud and containerized deployments, achieving a 30% reduction in service downtime',
        ],
        technologies: ['Angular', 'Java', 'Spring Boot', 'JPA/Hibernate', 'Spring Cloud', 'Selenium', 'Cypress'],
    },
];
