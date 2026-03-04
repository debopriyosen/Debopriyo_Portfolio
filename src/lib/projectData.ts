// Define the structure for project instances
export interface ProjectImage {
    url: string;
    span?: "col-span-1" | "col-span-2";
}

export interface SubProject {
    id: string;
    title: string;
    thumbnail: string;
    description: string;
    images: ProjectImage[];
}

export interface ProjectCategory {
    title: string;
    category: string;
    description: string;
    subProjects: SubProject[];
}

// Simulated database mapped by URL slug
export const projectDatabase: Record<string, ProjectCategory> = {
    "packaging-designs": {
        title: "Packaging Designs",
        category: "Branding / Design",
        description: "A comprehensive exploration of sustainable and premium packaging solutions for modern eco-conscious brands. Highlighting tactile materials and minimalist typography across various sub-projects.",
        subProjects: [
            {
                id: "project-1",
                title: "Project 1",
                thumbnail: "/images/projects/packaging/project1/1.jpg",
                description: "A showcase of premium packaging design, featuring a series of detailed visualizations from 1 to 19.",
                images: [
                    { url: "/images/projects/packaging/project1/1.jpg", span: "col-span-2" },
                    { url: "/images/projects/packaging/project1/2.jpg", span: "col-span-1" },
                    { url: "/images/projects/packaging/project1/3.jpg", span: "col-span-1" },
                    { url: "/images/projects/packaging/project1/4.jpg", span: "col-span-2" },
                    { url: "/images/projects/packaging/project1/5.jpg", span: "col-span-1" },
                    { url: "/images/projects/packaging/project1/6.jpg", span: "col-span-1" },
                    { url: "/images/projects/packaging/project1/7.jpg", span: "col-span-1" },
                    { url: "/images/projects/packaging/project1/8.jpg", span: "col-span-1" },
                    { url: "/images/projects/packaging/project1/9.jpg", span: "col-span-2" },
                    { url: "/images/projects/packaging/project1/10.jpg", span: "col-span-1" },
                    { url: "/images/projects/packaging/project1/11.jpg", span: "col-span-1" },
                    { url: "/images/projects/packaging/project1/12.jpg", span: "col-span-1" },
                    { url: "/images/projects/packaging/project1/13.jpg", span: "col-span-1" },
                    { url: "/images/projects/packaging/project1/14.jpg", span: "col-span-2" },
                    { url: "/images/projects/packaging/project1/15.jpg", span: "col-span-1" },
                    { url: "/images/projects/packaging/project1/16.jpg", span: "col-span-1" },
                    { url: "/images/projects/packaging/project1/17.jpg", span: "col-span-1" },
                    { url: "/images/projects/packaging/project1/18.jpg", span: "col-span-1" },
                    { url: "/images/projects/packaging/project1/19.jpg", span: "col-span-2" }
                ]
            },
            {
                id: "project-2",
                title: "Project 2",
                thumbnail: "https://images.unsplash.com/photo-1533682944066-eebbf906d203?auto=format&fit=crop&q=80&w=800",
                description: "Another beautiful packaging assignment focusing on eco-friendly paper sourcing and elegant typography.",
                images: [
                    { url: "https://images.unsplash.com/photo-1533682944066-eebbf906d203?auto=format&fit=crop&q=80&w=2000", span: "col-span-2" },
                    { url: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=2000", span: "col-span-2" }
                ]
            }
        ]
    },
    "fintech-dashboard": {
        title: "Fintech Dashboard",
        category: "Next.js / Tailwind",
        description: "A dark-mode financial analytics dashboard designed for institutional traders, featuring real-time data visualization and complex component architecture.",
        subProjects: [
            {
                id: "dashboard-v1",
                title: "Initial Concept",
                thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
                description: "The first iteration of the fintech dashboard focusing on dark mode contrasts.",
                images: [
                    { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000", span: "col-span-2" },
                    { url: "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=2000", span: "col-span-1" },
                    { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000", span: "col-span-1" }
                ]
            }
        ]
    },
    // Fallbacks for other routes
    "award-winning-portfolio": {
        title: "Award Winning Portfolio",
        category: "Framer Motion",
        description: "The architecture behind an Awwwards-winning digital portfolio focusing on scrollytelling and micro-interactions.",
        subProjects: [
            {
                id: "portfolio-design",
                title: "Visual Design",
                thumbnail: "https://images.unsplash.com/photo-1542382257-80dedb725088?auto=format&fit=crop&q=80&w=800",
                description: "A seamless scrolling experience.",
                images: [
                    { url: "https://images.unsplash.com/photo-1542382257-80dedb725088?auto=format&fit=crop&q=80&w=2000", span: "col-span-2" },
                    { url: "https://images.unsplash.com/photo-1507238692062-75ca28b488f5?auto=format&fit=crop&q=80&w=2000", span: "col-span-2" }
                ]
            }
        ]
    },
    "interactive-campaign": {
        title: "Interactive Campaign",
        category: "Three.js",
        description: "A WebGL rich experience created for a luxury automotive brand, featuring 3D product configurators.",
        subProjects: [
            {
                id: "campaign-v1",
                title: "3D Rendering",
                thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
                description: "Interactive 3D configurator built entirely in the browser.",
                images: [
                    { url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000", span: "col-span-2" }
                ]
            }
        ]
    }
};
