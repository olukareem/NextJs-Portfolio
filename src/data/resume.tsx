import { Icons } from "@/components/icons";
import { Apple, HomeIcon, Smartphone } from "lucide-react";
import { CgWebsite } from "react-icons/cg";

const createIcon = (Icon: any, className = "size-3") => {
  return <Icon className={className} />;
};

export const DATA = {
  name: "Olu Kareem",
  initials: "OK",
  url: "https://www.olukareem.me",
  location: "Brooklyn, New York",
  locationLink: "https://www.google.com/maps/place/brooklyn",
  tagline: "Full Stack Developer | Web & Mobile",
  description: "I like to build modern, user-friendly web apps.",
  summary:
    "I started in the music scene, but as I got into tech, I found a new creative outlet through coding. Beginning as an intern at Splice, I soon became a software engineer, working on tools for musicians and creators—including a desktop sample library built with TypeScript and Angular, and a mobile music app using Dart and Flutter. Now, as a freelance developer specializing in React and TypeScript, I'm focused on building unique tools and collaborating with businesses and creatives to bring their visions to life. I’m constantly learning and staying on top of the latest tech. Let’s connect and make something great together.",
  avatarUrl: "/images/DSC00796~3.png",
  personalPhilosophy:
    "Act before you're ready, focus on consistent growth, and always seek balance.",
  ethnicBackground: "I'm Nigerian-Jamaican American",
  valuesAndBeliefs:
    "Authenticity and resilience define my journey. I value community, creative freedom, and creating meaningful change. I believe in making the most of life’s challenges, growing from them, and helping others where possible.",
  funFacts: [
    {
      funfact1:
        "Started rapping and gained fame young, but moved into tech for stability.",
    },
    {
      funfact2:
        "I've lived in Brooklyn, Lisbon, Oakland California, Cleveland Ohio and Chiang Mai, traveling the world as a digital nomad.",
    },
    {
      funfact3:
        "In the 2010s I released multiple rap mixtapes and musical content under the names Olu and Olukara. I put out my most recent album, It Wasn't That Deep, in 2024 under the alias, Glolorun.",
      musicLink: "https://glolorun.com/",
    },
  ],
  softSkills:
    "Creative problem-solving, adaptability, resilience empathy, cultural awareness, strong communication, and a collaborative mindset.",
  challengesOvercome: [
    {
      challenge:
        "Balancing my love for music with the need for financial stability",
      outcome: "Found a way to support my music by freelancing in tech",
    },
  ],
  goals: [
    {
      shortTerm:
        "Build a strong foundation in freelance software development by completing a portfolio of high-quality, interactive projects, including a personal website, e-commerce platform, and AI-integrated applications. Establish a steady client base that allows me to refine my skills in React, TypeScript, and Next.js while delivering impactful solutions for businesses.",
      longTerm:
        "Achieve financial independence through a successful career in software engineering, with a focus on innovative projects that bridge creativity and technology. Transition toward building tools and platforms that support the music and creative industries, integrating my technical expertise with my passion for art and storytelling.",
    },
  ],
  favoriteBooks: [
    {
      book1: "The Creative Act by Rick Rubin",
      book2: "Think and Grow Rich by Napoleon Hill",
      book3: "Meditations by Marcus Aurelius",
    },
  ],
  favoriteMusic:
    "Kendrick Lamar, Madlib, MF DOOM, Madlib, Toro Y Moi, Kanye West, Outkast, Michael Jackson, Sade, Dean Blunt, Yves Tumor, Mixtape Lil Wayne, and Ka.",
  favoriteDestinations: [
    {
      destination1:
        "Brooklyn, NY – the place where I experienced the most personal and creative growth",
      destination2:
        "Lisbon, Portugal – where I fell in love with travel, enjoying the locals, vibe, and scenery",
      destination3:
        "Chiang Mai, Thailand – for its affordable, peaceful environment and digital nomad community",
    },
  ],
  favoriteQuotes: [
    {
      quote1: "Start before you're ready",
      quote2: "The pain you feel today will be the strength you feel tomorrow.",
      quote3: "The best way to predict the future is to create it.",
    },
  ],
  interests:
    "Music production and sound design, coding and software development, travel, photography and videography, fitness and health, philosophy, exploring avant-garde design.",
  skills: [
    /* General Skills: */
    { name: "Full-Stack Development" },
    {
      name: "Cross-Platform Mobile Development",
    },
    {
      name: "Creative Development",
    },
    {
      name: "Agile Frameworks (Scrum)",
    },
    { name: "Database Management (SQL, ORM)" },
    { name: "Version Control" },
    { name: "E-Commerce" },
    { name: "API Management" },
    { name: "Component Library Management" },
    { name: "Feature Management" },
    { name: "Customer Data Management (CDP)" },
    { name: "Customer Engagement (CRM)" },
    { name: "Email Integration" },
    { name: "DNS Management" },
    { name: "AI/ML Integration" },
    { name: "Vector Database Management" },
    { name: "Natural Language Processing" },
  ],
  languages: [
    /* Core Programming Languages */
    {
      name: "Javascript",
      imageUrl: "/skill-icons/javascript.svg",
      description:
        "I learned JavaScript during my time at General Assembly and have used it extensively across personal and professional projects to build dynamic, interactive applications.",
    },
    {
      name: "Typescript",
      imageUrl: "/skill-icons/typescript.svg",
      description:
        "TypeScript became essential while working at Splice, where I applied it on Splice's Desktop and Bridge apps. It's now my preferred language for scaling complex projects.",
    },
    {
      name: "Dart",
      imageUrl: "/skill-icons/dart.svg",
      description:
        "I used Dart at Splice to build cross-platform mobile apps like CoSo and Splice Mobile, optimizing for performance and a smooth user experience.",
    },
    {
      name: "GraphQL",
      imageUrl: "/skill-icons/graphql.svg",
      description:
        "At Splice, I used GraphQL to efficiently manage and update our sounds API, handling complex data requirements.",
    },
    {
      name: "Sass",
      imageUrl: "/skill-icons/sass.svg",
      description:
        "I gained experience with Sass at General Assembly, where I used it to write clean, modular CSS in my projects.",
    },
  ],
  frameworks: [
    /* Core Frameworks */
    {
      name: "React",
      imageUrl: "/skill-icons/react.svg",
      description:
        "React has been my primary frontend framework since learning it at General Assembly, and I use it heavily in both personal projects and professional work.",
    },
    {
      name: "Angular",
      imageUrl: "/skill-icons/angular.svg",
      description:
        "I much experience with Angular from my time at Splice, using it for key projects like the Bridge and Desktop applications, where it helped deliver complex, scalable UIs.",
    },
    {
      name: "Next.js",
      imageUrl: "/skill-icons/next-js.svg",
      description:
        "I adopted Next.js at General Assembly and I use it frequently for building high-performance web applications with server-side rendering.",
    },
    {
      name: "Flutter",
      imageUrl: "/skill-icons/flutter.svg",
      description:
        "I paired Flutter with Dart at Splice, delivering cross-platform mobile apps like CoSo and Splice Mobile with native-like performance.",
    },
    {
      name: "Node.js",
      imageUrl: "/skill-icons/node-js.svg",
      description:
        "I've relied on Node.js for backend development throughout my career, from General Assembly to Splice, powering server-side logic and APIs.",
    },
    {
      name: "OpenAI",
      imageUrl: "/skill-icons/openAI.svg",
      description:
        "I've integrated OpenAI's GPT models to build AI-powered features, including a custom chatbot for my portfolio that can engage with visitors and answer questions about my experience.",
    },
    {
      name: "Langchain",
      imageUrl: "/skill-icons/langchain.svg",
      description:
        "I've used Langchain to create sophisticated AI applications, implementing features like document retrieval, chat history management, and context-aware responses.",
    },
    // {
    //   name: "Electron.js",
    //   imageUrl: "/skill-icons/electronjs.svg",
    //   description: "I used Electron.js while maintaining on Splice Desktop.",
    // },
    {
      name: "Tailwind CSS",
      imageUrl: "/skill-icons/tailwind.svg",
      description:
        "Ive used Tailwind CSS to speed up UI design in personal projects, enabling efficient, utility-first styling.",
    },
    // {
    //   name: "Bootstrap",
    //   imageUrl: "/skill-icons/bootstrap.svg",
    //   description:
    //     "I used Bootstrap during my work at Splice, enabling fast prototyping and consistent, responsive layouts across projects.",
    // },
  ],
  devTools: [
    /* Developer Tools */
    {
      name: "AWS SES",
      imageUrl: "/skill-icons/aws-ses.svg",
      description:
        "I've implemented AWS Simple Email Service in this portfolio's contact form, enabling visitors to send emails directly through the site while maintaining security and deliverability.",
    },
    {
      name: "Cloudflare",
      imageUrl: "/skill-icons/cloudflare.svg",
      description:
        "I use Cloudflare to manage this portfolio's DNS settings, including setting up MX and DKIM records for the contact form's email system.",
    },
    {
      name: "VsCode",
      imageUrl: "/skill-icons/vscode.svg",
      description:
        "My primary code editor, where I write, debug, and manage all my projects.",
    },
    {
      name: "Git",
      imageUrl: "/skill-icons/git.svg",
      description: "I use Git for version control across all my projects.",
    },
    {
      name: "PostgreSQL",
      imageUrl: "/skill-icons/postgresql.svg",
      description:
        "I’ve used PostgreSQL for relational database management, handling structured data in web and mobile apps.",
    },
    // {
    //   name: "MongoDB",
    //   imageUrl: "/skill-icons/mongodb.svg",
    //   description:
    //     "I've used MongoDB for NoSQL databases, particularly in projects that require flexible, scalable data structures.",
    // },
    // {
    //   name: "Prisma",
    //   imageUrl: "/skill-icons/prisma.svg",
    //   description:
    //     "Prisma has been my ORM for working with databases on some of my personal projects",
    // },
    // {
    //   name: "Storybook.js",
    //   imageUrl: "/skill-icons/storybook.svg",
    //   description:
    //     "I'm familiar with storybook from my time at Splice, where I contributed to the frontend component library.",
    // },
    {
      name: "Vercel",
      imageUrl: "/skill-icons/vercel.svg",
      description:
        "Vercel is my preferred platform for deploying and hosting Next.js projects with ease and speed. I've also used Vercel's AI SDK to build streaming chat interfaces and manage AI-powered features with efficient data handling and real-time responses.",
    },
    {
      name: "Android Studio",
      imageUrl: "/skill-icons/android-studio.svg",
      description:
        "I used Android Studio while developing and testing the Android version of Splice Mobile, particularly focusing on native functionality and app performance.",
    },
    {
      name: "Xcode",
      imageUrl: "/skill-icons/xcode.svg",
      description:
        "I worked with Xcode for iOS development and testing of Splice Mobile, ensuring smooth performance and compliance with Apple's platform guidelines.",
    },
    {
      name: "Upstash Redis",
      imageUrl: "/skill-icons/upstash.svg",
      description:
        "I've implemented Upstash Redis for efficient caching in AI applications, improving response times and reducing API costs.",
    },
    {
      name: "Datastax AstraDB",
      imageUrl: "/skill-icons/datastax_astradb.png",
      description:
        "I've used AstraDB as a vector database for AI applications, enabling efficient storage and retrieval of embeddings for natural language processing tasks.",
    },
  ],
  businessTools: [
    /* Business Tools */
    {
      name: "Stripe",
      imageUrl: "/skill-icons/stripe.svg",
      description:
        "I’ve integrated Stripe to handle secure payment processing for e-commerce and subscription-based applications.",
    },
    {
      name: "Segment",
      imageUrl: "/skill-icons/segment.svg",
      description:
        "I've used Segment for tracking and managing user data across different CoSo and Splice mobile.",
    },
    {
      name: "LaunchDarkly",
      imageUrl: "/skill-icons/launchdarkly.svg",
      description:
        "I'm familiar with setting up feature flags with LaunchDarkly from my time at Splice.",
    },
    {
      name: "Braze",
      imageUrl: "/skill-icons/braze.svg",
      description:
        "I've used Braze to implement marketing automation, push notifications, and user engagement strategies while working on Splice mobile.",
    },
    {
      name: "Businessmap (Kanban)",
      imageUrl: "/skill-icons/businessmap.svg",
      description:
        "I'm familiar with Businessmap, as my team at Splice would use it for managing our projects in a Kanban format.",
    },
    {
      name: "Slack",
      imageUrl: "/skill-icons/slack.svg",
      description: "Slack is my usual for team comms.",
    },
    {
      name: "Miro",
      imageUrl: "/skill-icons/miro.svg",
      description:
        "I've used Miro to map out workflows, brainstorm ideas, and collaborate on projects visually.",
    },
    {
      name: "Notion",
      imageUrl: "/skill-icons/notion.svg",
      description: "Notion is my hub for pretty much all my notes.",
    },
    {
      name: "Figma",
      imageUrl: "/skill-icons/figma.svg",
      description:
        "I've used Figma for collaborative UI/UX design, prototyping, and wireframing with teams.",
    },
    // {
    //   name: "Framer",
    //   imageUrl: "/skill-icons/framer.svg",
    //   description:
    //     "Framer helps me create interactive, high-fidelity prototypes to demonstrate design functionality.",
    // },
    // {
    //   name: "Webflow",
    //   imageUrl: "/skill-icons/webflow.svg",
    //   description:
    //     "I've used Webflow for visually designing and building responsive websites with clean, production-ready code.",
    // },
  ],
  mediaTools: [
    /* Media Tools */
    {
      name: "Ableton Live",
      imageUrl: "/skill-icons/abletonlive.png",
      description:
        "I spend much of my time producing and recording music. Ableton is my daw of choice.",
    },
    {
      name: "Adobe Premiere",
      imageUrl: "/skill-icons/premiere.svg",
      description:
        "I've recently started shooting and editing video as a hobby.",
    },
    {
      name: "DaVinci Resolve",
      imageUrl: "/skill-icons/resolve.svg",
      description: "I use resolve for color grading.",
    },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    // { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "#projects", icon: CgWebsite, label: "Work" },
  ],
  contact: {
    email: "hello@example.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/olukareem",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/olukareem",
        icon: Icons.linkedin,

        navbar: true,
      },
      // X: {
      //   name: "X",
      //   url: "",
      //   icon: Icons.x,

      //   navbar: true,
      // },
      // Youtube: {
      //   name: "Youtube",
      //   url: "",
      //   icon: Icons.youtube,
      //   navbar: true,
      // },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Splice",
      href: "https://splice.com/",
      badges: [],
      location: "Remote",
      title: "Software Engineer",
      logoUrl: "/business-logos/splice.png",
      start: "2021",
      end: "2024",
      description:
        "At Splice, I initially focused on desktop applications (2021-2022), developing key front-end features for Splice Bridge and Splice Desktop using TypeScript, AngularJS, Node.js, and Electron.js. This included music sample transposition, DAW integrations, and asset management. Later (2022-2024), I transitioned to mobile development, working on Splice Mobile and CoSo, an AI-assisted music creation platform. Using Flutter, Dart, GraphQL, Android Studio, and Xcode, I developed front-end components, maintained both front-end and back-end, and implemented analytics tracking with Segment. Throughout my tenure, I collaborated with designers and participated in code reviews and testing to ensure smooth functionality and alignment.",
    },
    {
      company: "Public Records",
      href: "https://publicrecords.nyc/",
      badges: [],
      location: "Brooklyn, NY",
      title: "Founding Team Member",
      logoUrl: "/business-logos/PRlogo.gif",
      start: "2019",
      end: "2021",
      description:
        "Public Records is a music-driven restaurant, performance, and community space. As an inaugural staff member, I contributed to the early development of the space by assisting with various tasks and ensuring smooth operations. My role involved customer-facing services and bar support, where I made small adjustments and improvements to enhance the guest experience.",
    },
  ],
  education: [
    {
      school: "General Assembly",
      degree: "Fullstack Software Engineering Bootcamp",
      href: "https://generalassemb.ly/",
      logoUrl: "/business-logos/GA.png",
      start: "2020",
      end: "2020",
      description:
        "During my time at General Assembly’s Full Stack Software Engineering Bootcamp, I built a strong foundation in web development by working on a range of full-stack projects. I created a sports reference database using vanilla JavaScript and multiple APIs, built an interactive weather app with React and JavaScript, and developed a full-stack CRUD blogging application with a React frontend and Ruby on Rails backend. I also collaborated with an Agile development team to build a food recipe search app using JavaScript, React, and Mongoose. These projects sharpened my technical skills across front-end and back-end technologies, strengthened my teamwork abilities, and taught me how to approach problem-solving in a fast-paced, real-world environment.",
    },
  ],
  projects: [
    {
      title: "Otion (Work in progress)",
      href: "https://otion-seven.vercel.app/",
      dates: "2024",
      active: true,
      description:
        "Otion is a Notion-style document editor with real-time database capabilities, featuring infinite nested documents, file management, and a fully responsive design. The app includes dark/light modes, authentication, file uploads with trash/recovery features, and the ability to publish notes to the web.",
      technologies: [
        "Next.js",
        "React",
        "Convex",
        "Tailwind",
        "Shadcn UI",
        "Clerk",
      ],
      links: [
        {
          type: "Website",
          href: "https://otion-seven.vercel.app/",
          icon: createIcon(Icons.globe),
        },
      ],
      // image: "/images/otion_sc.png",
      video:
        "https://customer-i0qw4yckciid7sxe.cloudflarestream.com/e17b2af24f617b94feb55e413c16f501/manifest/video.m3u8",
    },
    {
      title: "Splice Mobile",
      href: "https://youtu.be/8v7ZOYPknqA",
      dates: "2022 - 2024",
      active: true,
      description:
        "Splice Mobile is a comprehensive music production app that enables users to create multi-layered compositions using samples, presets, MIDI, and creative tools from the Splice catalog. I developed front-end components and purchase asset flows for CoSo, an AI-assisted music creation platform, maintained both front-end and back-end using Dart and GraphQL, contributed to the unification of CoSo and Splice Mobile into a single app, and implemented analytics tracking using Segment.",
      technologies: [
        "Flutter",
        "Dart",
        "Android Studio",
        "XCode",
        "GraphQl",
        "Figma",
        "Segment",
        "LaunchDarkly",
        "Braze",
      ],
      links: [
        {
          type: "About",
          href: "https://splice.com/tools/mobile",
          icon: createIcon(Icons.globe),
        },
        {
          type: "Android",
          href: "https://play.google.com/store/apps/details?id=com.splice.mobile&pcampaignid=web_share",
          icon: createIcon(Smartphone),
        },
        {
          type: "iOS",
          href: "https://apps.apple.com/us/app/splice-make-more-music/id1108532275",
          icon: createIcon(Apple),
        },
      ],
      image: "",
      video:
        "https://customer-i0qw4yckciid7sxe.cloudflarestream.com/09315f52825b209740156edf4cff7a11/manifest/video.m3u8",
    },
    {
      title: "Splice Bridge",
      href: "https://splice.com/tools/bridge",
      dates: "2021 - 2022",
      active: true,
      description:
        "Splice Bridge is a specialized plugin that seamlessly integrates with your DAW to preview Splice samples in real-time, automatically matching them to your project's tempo and key. I developed the transpose component for key and BPM adjustments, created front-end coachmark and toast components, implemented the 'Copy to DAW' feature, and worked on the Bridge companion app with direct DAW integration.",
      technologies: [
        "Typescript",
        "Angular",
        "Node.js",
        "Storybook.js",
        "Electron.js",
        "Figma",
        "Bootstrap",
      ],
      links: [
        {
          type: "About",
          href: "https://splice.com/blog/how-to-use-splice-bridge/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://customer-i0qw4yckciid7sxe.cloudflarestream.com/6f485552046d41ad7bd4397d9c8279df/manifest/video.m3u8",
    },
    {
      title: "Splice Desktop",
      href: "https://splice.com/tools/desktop",
      dates: "2021 - 2022",
      active: true,
      description:
        "Splice Desktop is a central hub for music production that provides access to millions of royalty-free sounds, loops, FX, MIDI, and presets with direct DAW integration. I developed front-end components using Angular and TypeScript, managed the component library with Storybook.js, and implemented asset management features including library additions, purchases, favorites, and credit spending.",
      technologies: [
        "Typescript",
        "Angular",
        "Node.js",
        "Storybook.js",
        "Electron.js",
        "Figma",
        "Bootstrap",
      ],
      links: [
        {
          type: "About",
          href: "https://splice.com/tools/desktop",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://customer-i0qw4yckciid7sxe.cloudflarestream.com/1e6d5c239874f261895ca7e2bcc3142e/manifest/video.m3u8",
    },
  ],
} as const;
