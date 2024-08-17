import {
  AreaChartIcon,
  BarChart3,
  BrainCircuit,
  Database,
  DraftingCompass,
  Handshake,
  Layout,
  LineChart,
  MonitorCheck,
} from "lucide-react"

interface Logo {
  image: string
  alt: string
}

interface Image {
  image: string
  alt: string
}

interface Feature {
  no: number
  title: string
  description: string
}

interface ServiceItem {
  title: string
  description: string
  logo: React.ReactNode
  h2: string
  logos: Logo[]
  image: Image
  features: Feature[]
}

type Service = ServiceItem[]

export const Services: Service = [
  {
    title: "Generative AI",
    description:
      "At Mindscape Analytics, we recognize the transformative power of generative AI in shaping the future of business. Our generative AI services unlock new possibilities, enabling businesses to create innovative content, automate complex tasks, and stay ahead in a rapidly evolving landscape. With our expertise, you can harness the full potential of AI to drive creativity, efficiency, and growth.",
    h2: "Unlock the Power of Data with Our Generative AI Services",
    logo: (
      <AreaChartIcon size={32} className="size-8 rounded-full border p-1" />
    ),
    logos: [
      {
        image: "/svg/zapier.svg",
        alt: "Zapier",
      },
      {
        image: "/svg/huggingface.svg",
        alt: "Hugging Face",
      },
      {
        image: "/svg/openai.svg",
        alt: "Open AI",
      },
      {
        image: "/svg/python-original.svg",
        alt: "Python",
      },
      {
        image: "/svg/logos_azure.svg",
        alt: "Domo",
      },
    ],
    image: {
      image: "/images/services/genai_banner.png",
      alt: "Business Intelligence",
    },
    features: [
      {
        no: 1,
        title: "Content Generation",
        description:
          "Automate content creation across multiple mediums - blogs, social media, and marketing materials, to boost your brand visibility.",
      },
      {
        no: 2,
        title: "Custom GPTs",
        description:
          "Empower your business with our custom GPT solutions, delivering intelligent, AI-driven interactions tailored to your unique needs.",
      },
      {
        no: 3,
        title: "Image Generation",
        description:
          "Generate high-quality images for creative projects using models like GANs and VAEs to reduce efforts while maintaining uniqueness.",
      },
      {
        no: 4,
        title: "Text Analytics (LLMs)",
        description:
          "Extract valuable insights from textual data using Large Language Models (LLMs) such as ChatGPT for improved decision-making.",
      },
      {
        no: 5,
        title: "Custom Generative AI Models",
        description:
          "Develop tailored AI models to meet your specific business needs, ensuring a personalized approach to AI-driven solutions.",
      },
      {
        no: 6,
        title: "Model Training",
        description:
          "Fine-tune AI models with advanced training techniques, enabling better performance and results for your organization.",
      },
      {
        no: 7,
        title: "Customer Support Automation",
        description:
          "Streamline customer support processes with AI-powered chatbots, ensuring faster response times & higher customer satisfaction.",
      },
      {
        no: 8,
        title: "ChatGPT Integration",
        description:
          "Integrate the powerful ChatGPT plugin into your existing systems for seamless AI-driven assistance & improved customer experiences.",
      },
      {
        no: 9,
        title: "Voice and Video Generation",
        description:
          "Produce high-quality, synthetic voice and video content, ideal for personalized customer communications and experiences.",
      },
      {
        no: 10,
        title: "On-demand Analytics",
        description:
          "Access real-time insights using AI to get immediate answers to business queries and make data-driven decisions.",
      },
    ],
  },
  {
    title: "Business Intelligence",
    description:
      "At Mindscape Analytics, we understand the importance of leveraging data to drive informed decision-making and achieve business success. Our business intelligence services offer a wide range of benefits that can help businesses of all sizes thrive in today’s competitive landscape.",
    h2: "Unlock the Power of Data with Our Business Intelligence Services",
    logo: (
      <AreaChartIcon size={32} className="size-8 rounded-full border p-1" />
    ),
    logos: [
      {
        image: "/svg/microsoft_powerbi-icon.svg",
        alt: "Power BI",
      },
      {
        image: "/svg/tableau-icon.svg",
        alt: "Tebleau",
      },
      {
        image: "/svg/looker.svg",
        alt: "Google Looker Studio",
      },
      {
        image: "/svg/qlik.svg",
        alt: "Qlik",
      },
      {
        image: "/svg/domo.svg",
        alt: "Domo",
      },
    ],
    image: {
      image: "/images/services/business_banner.png",
      alt: "Business Intelligence",
    },
    features: [
      {
        no: 1,
        title: "Actionable Insights",
        description:
          "Gain valuable insights into your business operations, customer behavior, and market trends to make data-driven decisions with confidence.",
      },
      {
        no: 2,
        title: "Improved Efficiency",
        description:
          "Streamline your processes and workflows by identifying inefficiencies and optimizing resources based on data-driven recommendations.",
      },
      {
        no: 3,
        title: "Enhanced Decision-Making",
        description:
          "Make smarter decisions faster by accessing real-time data and interactive dashboards that provide a comprehensive view of your business performance.",
      },
      {
        no: 4,
        title: "Competitive Advantage",
        description:
          "Stay ahead of the competition by identifying opportunities for growth, anticipating market trends, and responding to changes proactively.",
      },
      {
        no: 5,
        title: "Cost Savings",
        description:
          "Identify cost-saving opportunities and revenue-generating strategies through data analysis, leading to improved profitability and ROI.",
      },
      {
        no: 6,
        title: "Dashboards",
        description:
          "BI dynamic dashboards to enhance decision-making and maximize business performance.",
      },
    ],
  },
  {
    title: "Modern Web Development",
    description:
      "At Mindscape, We specialize in creating captivating and functional websites that leave a lasting impression on your audience. Our web development services include:",
    h2: "Elevate Your Online Presence with Our Web Development Solutions",
    logo: <Layout size={32} className="size-8 rounded-full border p-1" />,
    logos: [
      {
        image: "/svg/nextjs-original.svg",
        alt: "nextjs",
      },
      {
        image: "/svg/typescript-original.svg",
        alt: "typescript",
      },
      {
        image: "/svg/tailwindcss-original.svg",
        alt: "tailwindcss",
      },
      {
        image: "/svg/nodejs-original.svg",
        alt: "nodejs",
      },
      {
        image: "/svg/fastapi-original.svg",
        alt: "Fast API",
      },
    ],
    image: {
      image: "/images/services/webdev_banner.png",
      alt: "Modern Web Development",
    },
    features: [
      {
        no: 1,
        title: "Server-Side Development",
        description:
          "Develop scalable server-side logic using versatile languages and frameworks such as Next.js, Python, or Ruby on Rails.",
      },
      {
        no: 2,
        title: "Third-Party Integration",
        description:
          "Seamlessly integrate third-party APIs and services to augment the functionality and capabilities of your web applications.",
      },
      {
        no: 3,
        title: "Performance Optimization",
        description:
          "Optimize web applications for maximum speed, scalability, and performance to enhance user satisfaction and engagement.",
      },
      {
        no: 4,
        title: "Security Implementation",
        description:
          "Implement robust security measures with custom and third party authentications and protocols to safeguard against cyber threats and vulnerabilities, ensuring the confidentiality and integrity of your data and systems.",
      },
      {
        no: 5,
        title: "UI/UX Design",
        description:
          "Create intuitive and engaging user interfaces and experiences, ensuring that your web applications are visually appealing and easy to navigate.",
      },
      {
        no: 6,
        title: "Content Management Systems (CMS)",
        description:
          "Implement and customize powerful CMS solutions such as WordPress, Drupal, or Joomla, allowing you to manage your content efficiently and effortlessly.",
      },
      {
        no: 7,
        title: "E-commerce Solutions",
        description:
          "Build robust e-commerce platforms with features like payment gateway integration, inventory management, and user-friendly checkout processes to boost your online sales.",
      },
      {
        no: 8,
        title: "API Development",
        description:
          "Design and develop robust APIs to enable seamless communication between your web applications and other software systems, enhancing functionality and interoperability.",
      },
      {
        no: 9,
        title:
          "DevOps and Continuous Integration/Continuous Deployment (CI/CD)",
        description:
          "Implement DevOps practices and CI/CD pipelines to streamline your development process, enabling faster and more reliable deployments.",
      },
    ],
  },
  {
    title: "Data Science ML | DL",
    description:
      "Our team of skilled data scientists specializes in extracting valuable insights from complex datasets, developing predictive models, and driving data-driven decisionmaking. Our services include:",
    h2: "Unlock the power of data with our comprehensive data science services",
    logo: <BrainCircuit size={32} className="size-8 rounded-full border p-1" />,
    logos: [
      {
        image: "/svg/python-original.svg",
        alt: "python",
      },
      {
        image: "/svg/r-original.svg",
        alt: "r language",
      },
      {
        image: "/svg/logos_azure.svg",
        alt: "Azure",
      },
      {
        image: "/svg/tensorflow-original.svg",
        alt: "Next.js",
      },
      {
        image: "/svg/jupyter-original-wordmark.svg",
        alt: "juptyer notebook",
      },
    ],
    image: {
      image: "/images/services/datascience_banner.png",
      alt: "Modern Web Development",
    },
    features: [
      {
        no: 1,
        title: "Data Analysis and Insights",
        description:
          "Analyze vast and intricate datasets to extract meaningful insights and actionable trends.",
      },
      {
        no: 2,
        title: "Predictive Modeling",
        description:
          "Develop advanced machine learning algorithms to forecast business outcomes and enhance decision-making processes.",
      },
      {
        no: 3,
        title: "Collaborative Data Solutions",
        description:
          "Work closely with cross-functional teams to identify opportunities for leveraging data to drive business growth and innovation.",
      },
      {
        no: 4,
        title: "Data Preprocessing and Cleansing",
        description:
          "Ensure data integrity and accuracy through meticulous cleaning and preprocessing techniques.",
      },
      {
        no: 5,
        title: "Experiment Design and Validation",
        description:
          "Design and execute experiments to test hypotheses and validate model performance effectively.",
      },
      {
        no: 6,
        title: "Data Visualization",
        description:
          "Communicate complex findings and insights to stakeholders through compelling data visualizations and storytelling techniques.",
      },
      {
        no: 7,
        title: "Machine Learning",
        description:
          "Developing advanced ML models to predict trends, optimize processes, and enhance business performance.",
      },
      {
        no: 8,
        title: "Deep Learning",
        description:
          "Harnessing the power of neural networks to unlock new opportunities and solve complex problems in areas such as image recognition, natural language processing, and more.",
      },
      {
        no: 9,
        title: "Continuous Learning and Mentorship",
        description:
          "Stay abreast of the latest advancements in data science and provide guidance and mentorship to nurture talent within your organization",
      },
    ],
  },
  {
    title: "Big Data & Data Engineering",
    description:
      "From managing Cloudera services to architecting data solutions and resolving technical challenges, our team has the expertise to drive your data initiatives forward. Our services include:",
    h2: "Leverage the potential of big data and optimize your data architecture with our specialized services",
    logo: <Database size={32} className="size-8 rounded-full border p-1" />,
    logos: [
      {
        image: "/sreamset.png",
        alt: "SreamSets",
      },
      {
        image: "/svg/apachekafka-original.svg",
        alt: "Apache Kafka",
      },
      {
        image: "/svg/hadoop-original.svg",
        alt: "Hadoop",
      },
      {
        image: "/svg/cloudera.svg",
        alt: "Cloudera",
      },
      {
        image: "/svg/linux-original.svg",
        alt: "Linux",
      },
    ],
    image: {
      image: "/images/services/bigdata_banner.png",
      alt: "Modern Web Development",
    },
    features: [
      {
        no: 1,
        title: "Cloudera Services Management",
        description:
          "Ensure the smooth operation of your big data infrastructure by managing Cloudera services and resolving cluster errors promptly.",
      },
      {
        no: 2,
        title: "Streamsets Pipeline Development",
        description:
          "Design, build, and debug Streamsets pipelines to efficiently ingest, process, and transform data for analysis.",
      },
      {
        no: 3,
        title: "SSL/TLS Issue Resolution",
        description:
          "Address SSL/TLS issues and deployments to ensure secure data transmission and communication within your data ecosystem.",
      },
      {
        no: 4,
        title: "Automated Compaction",
        description:
          "Implement automated processes to streamline data compaction and optimize storage resources for improved efficiency.",
      },
      {
        no: 5,
        title: "HDFS and Table Issue Resolution",
        description:
          "Resolve HDFS and table issues promptly to maintain data integrity and availability across your data environment.",
      },
      {
        no: 6,
        title: "Certificate Management",
        description:
          "Renew SSL/TLS certificates and manage subscriptions to ensure uninterrupted service delivery and compliance.",
      },
      {
        no: 7,
        title: "Linux Node Management",
        description:
          "Manage different Linux nodes, including edge, development, and production environments, to support your data operations effectively.",
      },
      {
        no: 8,
        title: "Cloud Virtual Machine Creation",
        description:
          "Deploy and manage cloud virtual machines to scale your data infrastructure and support diverse workloads efficiently.",
      },
      {
        no: 9,
        title: "HDFS Storage Management",
        description:
          "Monitor and manage HDFS storage resources to optimize performance and cost-effectiveness for your data storage needs.",
      },
      {
        no: 10,
        title: "Support Ticket Management",
        description:
          "Create and manage support tickets with Streamsets and Cloudera to address technical issues promptly and efficiently, ensuring smooth operations.",
      },
    ],
  },
  {
    title: "Prescriptive Analytics",
    description:
      "We specialize in advanced analytics services designed to drive innovation and efficiency for businesses of all sizes. From data science and machine learning to prescriptive analytics and optimization, we offer a comprehensive suite of solutions tailored to your specific needs.",
    h2: "Empower businesses to make informed decisions, optimize operations, and achieve strategic objectives",
    logo: <BarChart3 size={32} className="size-8 rounded-full border p-1" />,
    logos: [
      {
        image: "/svg/python-original.svg",
        alt: "Python",
      },
      {
        image: "/svg/apachespark-original.svg",
        alt: "Python",
      },
      {
        image: "/svg/r-original.svg",
        alt: "R Language",
      },
      {
        image: "/svg/jupyter-original-wordmark.svg",
        alt: "Jupyter Notebook",
      },
      {
        image: "/svg/tensorflow-original.svg",
        alt: "Tensorflow",
      },
    ],
    image: {
      image: "/images/services/analytic_banner.png",
      alt: "Bussiness Intelligence",
    },
    features: [
      {
        no: 1,
        title: "Actionable Recommendations",
        description:
          "Provide actionable insights and recommendations to optimize decision-making processes.",
      },
      {
        no: 2,
        title: "Optimization Techniques",
        description:
          "Utilize advanced optimization techniques such as linear and integer programming to solve complex business problems.",
      },
      {
        no: 3,
        title: "Resource Allocation",
        description:
          "Optimize resource allocation strategies to maximize efficiency and minimize costs.",
      },
      {
        no: 4,
        title: "Production Planning",
        description:
          "Develop production planning models to optimize production schedules and minimize downtime.",
      },
      {
        no: 5,
        title: "Supply Chain Optimization",
        description:
          "Analyze supply chain data to identify inefficiencies and optimize logistics, inventory management, and distribution.",
      },
      {
        no: 6,
        title: "Revenue Maximization",
        description:
          "Implement pricing optimization strategies to maximize revenue and profitability.",
      },
      {
        no: 7,
        title: "Risk Management",
        description:
          "Identify and mitigate risks through scenario analysis and risk modeling techniques.",
      },
      {
        no: 8,
        title: "Dynamic Pricing",
        description:
          "Develop dynamic pricing models to adjust prices in real-time based on demand and market conditions.",
      },
      {
        no: 9,
        title: "Portfolio Optimization",
        description:
          "Optimize investment portfolios to maximize returns while minimizing risk.",
      },
      {
        no: 10,
        title: "Custom Solutions",
        description:
          "Tailor prescriptive analytics solutions to address specific business challenges and objectives.",
      },
    ],
  },
  {
    title: "2D | 3D Graphic Design",
    description:
      "We offer a wide range of graphic design services to help businesses enhance their visual presence and effectively communicate with their audience. With our team of skilled designers and creative professionals, we can bring your ideas to life and help you achieve your branding and marketing.",
    h2: "Empower businesses markiting stratigies with creative solutions for a visually engaging brand experience.",
    logo: (
      <DraftingCompass size={32} className="size-8 rounded-full border p-1" />
    ),
    logos: [
      {
        image: "/svg/devicon_figma.svg",
        alt: "Figma",
      },
      {
        image: "/svg/blender-original.svg",
        alt: "Blender",
      },
      {
        image: "/svg/adobe.svg",
        alt: "Adobe",
      },
      {
        image: "/svg/canva-original.svg",
        alt: "Canva",
      },
      {
        image: "/svg/autodesk.svg",
        alt: "Autodesk",
      },
    ],
    image: {
      image: "/images/services/design_banner.png",
      alt: "Graphic Design",
    },
    features: [
      {
        no: 1,
        title: "Logo Design",
        description:
          "Create a unique and memorable logo that represents your brand identity and values.",
      },
      {
        no: 2,
        title: "Branding and Identity",
        description:
          "Develop cohesive branding materials, including business cards, letterheads, and brand guidelines, to establish a strong brand presence.",
      },
      {
        no: 3,
        title: "Print Design",
        description:
          "Design eye-catching marketing materials such as flyers, brochures, posters, and banners to promote your products or services.",
      },
      {
        no: 4,
        title: "Digital Design",
        description:
          "Craft visually appealing graphics for websites, social media platforms, and digital marketing campaigns to engage your audience online.",
      },
      {
        no: 5,
        title: "Packaging Design",
        description:
          "Design attractive and functional packaging solutions that stand out on the shelves and leave a lasting impression on consumers.",
      },
      {
        no: 6,
        title: "UI/UX Design",
        description:
          "Create intuitive and user-friendly interfaces for websites, mobile apps, and software applications to enhance the user experience.",
      },
      {
        no: 7,
        title: "Illustration",
        description:
          "Produce custom illustrations and graphics that add a unique and artistic touch to your projects.",
      },
      {
        no: 8,
        title: "Infographic Design",
        description:
          "Present complex information and data in a visually appealing and easy-to-understand format through infographics.",
      },
      {
        no: 9,
        title: "Motion Graphics",
        description:
          "Bring your content to life with dynamic motion graphics and animations for videos, presentations, and digital signage.",
      },
      {
        no: 10,
        title: "Canva Services",
        description:
          "Utilize the power of Canva with our customized templates and designs, allowing for easy editing and customization for your specific needs.",
      },
    ],
  },
  {
    title: "Information Technology",
    description:
      "Information technology services offered by our company, covering various aspects of operating system and software installation, online support, digital marketing, project design and engineering, network setup, and online IT support services. It emphasizes expertise, reliability, and commitment to excellence in delivering IT solutions.",
    h2: "We strive to deliver reliable, efficient, and cost-effective IT solutions to our clients",
    logo: <MonitorCheck size={32} className="size-8 rounded-full border p-1" />,
    logos: [
      {
        image: "/svg/microsoft.svg",
        alt: "Microsoft",
      },
      {
        image: "/svg/redhat-original.svg",
        alt: "Red Hat",
      },
      {
        image: "/svg/logos_aws.svg",
        alt: "AWS",
      },
      {
        image: "/svg/cisco.svg",
        alt: "Cisco",
      },
      {
        image: "/svg/devicon_googlecloud.svg",
        alt: "Google Cloud",
      },
    ],
    image: {
      image: "/images/services/it_banner.png",
      alt: "Information Technology",
    },
    features: [
      {
        no: 1,
        title: "OS and Software Installation",
        description:
          "Expert installation of operating systems and software applications to ensure optimal functionality and performance.",
      },
      {
        no: 2,
        title: "Online Support",
        description:
          "Dedicated online support services to address technical issues, troubleshoot problems, and provide timely solutions for a seamless user experience.",
      },
      {
        no: 3,
        title: "Digital Marketing & SEO Rank",
        description:
          "Strategic digital marketing solutions and search engine optimization (SEO) strategies to improve online visibility, drive traffic, and boost search engine rankings.",
      },
      {
        no: 4,
        title: "Project Design & Engineering",
        description:
          "Innovative project design and engineering services to conceptualize, plan, and execute IT projects with precision and efficiency.",
      },
      {
        no: 5,
        title: "ERD and UML Design",
        description:
          "Expert design of entity-relationship diagrams (ERD) and unified modeling language (UML) diagrams to visualize and communicate complex systems and processes effectively.",
      },
      {
        no: 6,
        title: "Network Setup and Configuration",
        description:
          "Professional setup and configuration of networks, including hardware and software components, to ensure secure and reliable connectivity for your business operations.",
      },
      {
        no: 7,
        title: "Online IT Support Service",
        description:
          "Comprehensive online IT support services to address technical issues, provide guidance, and offer solutions remotely, ensuring minimal downtime and maximum productivity.",
      },
    ],
  },
]
