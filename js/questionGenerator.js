// Question Generator - AI-powered interview questions for different domains

class QuestionGenerator {
    constructor() {
        this.questionTemplates = {
            frontend: {
                basics: [
                    "What is the difference between let, const, and var in JavaScript?",
                    "Explain the box model in CSS.",
                    "What are semantic HTML elements? Give examples.",
                    "Describe the difference between == and === operators.",
                    "What is the purpose of the 'use strict' directive?",
                    "Explain event delegation in JavaScript.",
                    "What are pseudo-classes in CSS? Give examples.",
                    "How does the 'this' keyword work in JavaScript?",
                    "What is the difference between localStorage and sessionStorage?",
                    "Explain the concept of hoisting in JavaScript."
                ],
                intermediate: [
                    "Explain closures in JavaScript with an example.",
                    "What is the Virtual DOM and how does it work?",
                    "Describe the difference between promises and async/await.",
                    "How would you optimize a React application for performance?",
                    "Explain CSS specificity and how it's calculated.",
                    "What are Web Workers and when would you use them?",
                    "Describe the component lifecycle in React.",
                    "How does the browser render a web page?",
                    "Explain the concept of debouncing and throttling.",
                    "What are CSS preprocessors and their advantages?"
                ],
                advanced: [
                    "Explain how JavaScript's event loop works.",
                    "Describe the differences between various state management solutions (Redux, Context API, MobX).",
                    "How would you implement server-side rendering in a React application?",
                    "Explain memory leaks in JavaScript and how to prevent them.",
                    "Describe the process of creating a custom React hook.",
                    "How would you handle authentication in a large-scale React application?",
                    "Explain the concept of code splitting and lazy loading.",
                    "What are Web Components and how do they differ from framework components?",
                    "Describe the rendering optimizations you can implement in React.",
                    "How would you build a design system with reusable components?"
                ]
            },
            backend: {
                basics: [
                    "What is RESTful API and its principles?",
                    "Explain the difference between SQL and NoSQL databases.",
                    "What is middleware in the context of web development?",
                    "Describe HTTP methods and their purposes.",
                    "What is authentication vs authorization?",
                    "Explain the concept of ORM (Object-Relational Mapping).",
                    "What are environment variables and why are they important?",
                    "Describe the client-server architecture.",
                    "What is a web server and how does it work?",
                    "Explain the difference between PUT and PATCH methods."
                ],
                intermediate: [
                    "How would you design a scalable database schema for an e-commerce platform?",
                    "Explain database indexing and its impact on performance.",
                    "Describe different caching strategies (Redis, Memcached).",
                    "What is load balancing and how does it work?",
                    "Explain microservices architecture vs monolithic architecture.",
                    "How would you handle file uploads in a Node.js application?",
                    "Describe the concept of database transactions and ACID properties.",
                    "What are webhooks and how would you implement them?",
                    "Explain JWT (JSON Web Tokens) and their use in authentication.",
                    "How would you implement rate limiting in an API?"
                ],
                advanced: [
                    "Design a highly available and scalable system for a social media platform.",
                    "Explain eventual consistency in distributed systems.",
                    "How would you implement real-time features using WebSockets?",
                    "Describe strategies for database sharding and partitioning.",
                    "What is CQRS (Command Query Responsibility Segregation) pattern?",
                    "Explain how you'd handle distributed transactions across microservices.",
                    "Design a notification system that can handle millions of users.",
                    "Describe CAP theorem and its implications for distributed systems.",
                    "How would you implement a message queue system (RabbitMQ, Kafka)?",
                    "Explain strategies for handling API versioning in production."
                ]
            },
            fullstack: {
                basics: [
                    "Explain the difference between frontend and backend development.",
                    "What is the MERN stack and its components?",
                    "Describe how data flows in a full-stack application.",
                    "What are HTTP cookies and how are they used?",
                    "Explain the concept of API endpoints.",
                    "What is CORS and why is it important?",
                    "Describe the MVC (Model-View-Controller) architecture.",
                    "How do you handle form validation on both client and server side?",
                    "What is the purpose of package.json?",
                    "Explain the difference between client-side and server-side rendering."
                ],
                intermediate: [
                    "How would you implement authentication using JWT in a MERN application?",
                    "Describe the process of deploying a full-stack application.",
                    "What are environment-specific configurations and how do you manage them?",
                    "Explain how you'd handle file uploads with progress indicators.",
                    "Describe different state management approaches in full-stack applications.",
                    "How would you implement real-time features using Socket.io?",
                    "Explain the concept of serverless architecture.",
                    "What are the considerations for making an application PWA (Progressive Web App)?",
                    "Describe how you'd implement search functionality with filters.",
                    "How would you handle error logging and monitoring in production?"
                ],
                advanced: [
                    "Design a real-time collaborative application (like Google Docs).",
                    "Explain how you'd implement WebSocket with proper authentication.",
                    "Describe strategies for handling optimistic UI updates.",
                    "How would you build a multi-tenant SaaS application?",
                    "Explain techniques for optimizing database queries in full-stack apps.",
                    "Design a system for handling millions of concurrent users.",
                    "Describe how you'd implement A/B testing in a full-stack application.",
                    "What considerations are important for internationalization (i18n)?",
                    "Explain how you'd set up CI/CD for a full-stack application.",
                    "Design a feature flag system for gradual feature rollout."
                ]
            },
            devops: {
                basics: [
                    "What is DevOps and its core principles?",
                    "Explain the concept of continuous integration and continuous deployment.",
                    "What is Docker and how does it work?",
                    "Describe the difference between virtualization and containerization.",
                    "What is version control and why is Git important?",
                    "Explain the purpose of configuration management tools.",
                    "What is infrastructure as code?",
                    "Describe the components of a typical CI/CD pipeline.",
                    "What are build tools and their role in development?",
                    "Explain the concept of orchestration in DevOps."
                ],
                intermediate: [
                    "How would you set up a Kubernetes cluster?",
                    "Explain different deployment strategies (blue-green, canary, rolling updates).",
                    "Describe how you'd implement monitoring and alerting (Prometheus, Grafana).",
                    "What is Helm and how is it used in Kubernetes?",
                    "Explain the process of containerizing a microservices application.",
                    "How would you handle secrets management in a cloud environment?",
                    "Describe different cloud service models (IaaS, PaaS, SaaS).",
                    "What is Terraform and how does it differ from other IaC tools?",
                    "Explain how you'd implement logging aggregation (ELK stack, Loki).",
                    "Describe the concept of service mesh (Istio, Linkerd)."
                ],
                advanced: [
                    "Design a highly available, multi-region infrastructure on AWS/GCP/Azure.",
                    "Explain how you'd implement GitOps with ArgoCD or Flux.",
                    "Describe strategies for disaster recovery and business continuity.",
                    "How would you optimize Docker images for production?",
                    "Explain the implementation of auto-scaling based on custom metrics.",
                    "Design a secure CI/CD pipeline with security scanning at each stage.",
                    "What considerations are important for cloud cost optimization?",
                    "Explain how you'd implement policy as code (OPA, Sentinel).",
                    "Design a system for zero-downtime migrations in production.",
                    "Describe how you'd handle network security in a Kubernetes environment."
                ]
            },
            datascience: {
                basics: [
                    "What is the difference between supervised and unsupervised learning?",
                    "Explain the data science workflow.",
                    "What are the common data preprocessing techniques?",
                    "Describe different types of data visualization.",
                    "What is the difference between correlation and causation?",
                    "Explain the concept of overfitting and underfitting.",
                    "What are the common evaluation metrics for classification models?",
                    "Describe the CRISP-DM methodology.",
                    "What is feature engineering and why is it important?",
                    "Explain the bias-variance tradeoff."
                ],
                intermediate: [
                    "How would you handle imbalanced datasets in classification problems?",
                    "Explain different ensemble methods (Random Forest, Gradient Boosting).",
                    "Describe the process of feature selection techniques.",
                    "What is cross-validation and why is it important?",
                    "Explain dimensionality reduction techniques (PCA, t-SNE).",
                    "How would you deploy a machine learning model to production?",
                    "Describe different clustering algorithms and their use cases.",
                    "What is A/B testing and how do you implement it?",
                    "Explain time series analysis and forecasting methods.",
                    "How do you handle missing data in datasets?"
                ],
                advanced: [
                    "Design a recommendation system for an e-commerce platform.",
                    "Explain deep learning architectures (CNNs, RNNs, Transformers).",
                    "How would you implement MLOps practices in an organization?",
                    "Describe the process of building and deploying a real-time prediction service.",
                    "Explain generative adversarial networks (GANs) and their applications.",
                    "How would you handle model versioning and reproducibility?",
                    "Design a system for detecting anomalies in streaming data.",
                    "Explain reinforcement learning concepts and applications.",
                    "What considerations are important for ethical AI and fairness?",
                    "Describe how you'd implement explainable AI (XAI) in production models."
                ]
            },
            product: {
                basics: [
                    "What is the role of a Product Manager?",
                    "Explain the product development lifecycle.",
                    "What are user stories and acceptance criteria?",
                    "Describe different prioritization frameworks.",
                    "What is market research and why is it important?",
                    "Explain the concept of MVP (Minimum Viable Product).",
                    "What are OKRs and how are they used?",
                    "Describe the difference between product and project management.",
                    "What is user feedback and how do you collect it?",
                    "Explain the concept of product-market fit."
                ],
                intermediate: [
                    "How would you decide which features to build next?",
                    "Describe your process for conducting user interviews.",
                    "What metrics would you track for a subscription-based product?",
                    "Explain how you'd handle stakeholder management.",
                    "Describe a time you had to make a difficult product decision.",
                    "How would you validate a new product idea before building it?",
                    "What is competitive analysis and how do you conduct it?",
                    "Explain the concept of product-led growth.",
                    "How do you communicate product roadmap to different stakeholders?",
                    "Describe the process of writing product requirements documents."
                ],
                advanced: [
                    "Design a go-to-market strategy for a new SaaS product.",
                    "Explain how you'd handle product scaling challenges.",
                    "Describe your approach to product portfolio management.",
                    "How would you build a product analytics strategy from scratch?",
                    "Explain how you'd manage product lifecycle from introduction to decline.",
                    "Design a pricing strategy for a B2B product.",
                    "How would you handle product discovery in a mature market?",
                    "Describe your approach to building product culture in an organization.",
                    "Explain how you'd manage technical debt vs feature development.",
                    "How would you measure and improve product adoption?"
                ]
            }
        };
    }

    // Generate random questions based on domain and difficulty
    generateQuestions(domain, difficulty = 'mixed', count = 10) {
        const domainKey = this.getDomainKey(domain);
        if (!domainKey || !this.questionTemplates[domainKey]) {
            return this.generateFallbackQuestions(domain, count);
        }

        let questions = [];
        const domainQuestions = this.questionTemplates[domainKey];

        if (difficulty === 'mixed') {
            // Get a mix of difficulties
            const easyCount = Math.ceil(count * 0.3);
            const mediumCount = Math.ceil(count * 0.4);
            const hardCount = count - easyCount - mediumCount;

            questions = [
                ...this.getRandomQuestions(domainQuestions.basics, easyCount),
                ...this.getRandomQuestions(domainQuestions.intermediate, mediumCount),
                ...this.getRandomQuestions(domainQuestions.advanced, hardCount)
            ];
        } else {
            // Get questions from specific difficulty
            const difficultyMap = {
                'entry': 'basics',
                'intermediate': 'intermediate',
                'senior': 'advanced',
                'lead': 'advanced'
            };
            const level = difficultyMap[difficulty] || 'intermediate';
            questions = this.getRandomQuestions(domainQuestions[level] || domainQuestions.intermediate, count);
        }

        // If we don't have enough questions, fill with fallbacks
        if (questions.length < count) {
            const fallbackQuestions = this.generateFallbackQuestions(domain, count - questions.length);
            questions = [...questions, ...fallbackQuestions];
        }

        return questions.slice(0, count);
    }

    // Get random questions from array
    getRandomQuestions(questionArray, count) {
        if (!questionArray || questionArray.length === 0) return [];
        
        const shuffled = [...questionArray].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(count, questionArray.length));
    }

    // Map user-friendly domain to our internal key
    getDomainKey(domain) {
        const domainMap = {
            'Frontend Developer': 'frontend',
            'Backend Developer': 'backend',
            'Full Stack Developer': 'fullstack',
            'DevOps Engineer': 'devops',
            'Data Scientist': 'datascience',
            'Product Manager': 'product',
            'frontend': 'frontend',
            'backend': 'backend',
            'fullstack': 'fullstack',
            'devops': 'devops',
            'datascience': 'datascience',
            'data scientist': 'datascience',
            'product': 'product'
        };
        return domainMap[domain?.toLowerCase()] || null;
    }

    // Generate fallback questions when domain not found
    generateFallbackQuestions(domain, count) {
        const fallbacks = [
            `Tell me about your experience as a ${domain || 'professional'}.`,
            `What interests you most about ${domain || 'your field'}?`,
            `Describe a challenging project you worked on in your career.`,
            `How do you stay updated with the latest trends in ${domain || 'your industry'}?`,
            `Where do you see yourself in 5 years?`,
            `Tell me about a time you had to work under pressure.`,
            `How do you handle constructive criticism?`,
            `Describe your ideal work environment.`,
            `What are your greatest professional strengths?`,
            `Tell me about a time you showed leadership.`,
            `How do you prioritize your work when dealing with multiple deadlines?`,
            `Describe a situation where you had to learn a new technology quickly.`,
            `How do you handle disagreements with team members?`,
            `What's the most important lesson you've learned in your career?`,
            `Tell me about a time you failed and what you learned from it.`
        ];

        return this.getRandomQuestions(fallbacks, count);
    }

    // Generate follow-up questions based on previous answer
    generateFollowUp(question, answer, domain) {
        const followUps = [
            `Can you provide a specific example to illustrate that?`,
            `What challenges did you face in that situation?`,
            `How would you approach this differently now?`,
            `What tools or technologies did you use?`,
            `How did you measure success in that case?`,
            `What was the most difficult part of that task?`,
            `How did your team contribute to this?`,
            `What would you do if you had more resources?`,
            `How does this relate to our ${domain || 'industry'}?`,
            `Can you elaborate on the technical aspects?`
        ];

        // If answer is too short, ask for elaboration
        if (answer && answer.split(' ').length < 20) {
            return "Can you provide more details about that?";
        }

        return this.getRandomQuestions(followUps, 1)[0];
    }

    // Generate questions based on job description
    generateFromJobDescription(jobDescription, count = 10) {
        // Simple keyword-based generation
        const keywords = {
            frontend: ['react', 'vue', 'angular', 'javascript', 'css', 'html', 'ui', 'ux'],
            backend: ['node', 'python', 'java', 'database', 'api', 'microservice', 'server'],
            devops: ['docker', 'kubernetes', 'aws', 'ci/cd', 'jenkins', 'terraform'],
            datascience: ['machine learning', 'python', 'data', 'analytics', 'statistics', 'model'],
            product: ['roadmap', 'stakeholder', 'user story', 'agile', 'market', 'strategy']
        };

        // Detect domain from job description
        let detectedDomain = 'general';
        const lowerJobDesc = jobDescription.toLowerCase();
        
        for (const [domain, domainKeywords] of Object.entries(keywords)) {
            if (domainKeywords.some(keyword => lowerJobDesc.includes(keyword))) {
                detectedDomain = domain;
                break;
            }
        }

        return this.generateQuestions(detectedDomain, 'mixed', count);
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuestionGenerator;
}