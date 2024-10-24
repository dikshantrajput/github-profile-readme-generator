import { createDevelopersCookbookTemplate } from "./readme-templates/developerCodebook";
import { createDevelopersJourneyTemplate } from "./readme-templates/developerJourney";
import { createDevOpsProfile } from "./readme-templates/devops";
import { createGlassNeonTemplate } from "./readme-templates/glassneon";
import { createMatrixProfileTemplate } from "./readme-templates/matrix";
import { createResearchPaperTemplate } from "./readme-templates/researchPaper";
import { createRPGDevProfile } from "./readme-templates/rpg";
import { createEnhancedUserProfileTemplate } from "./readme-templates/simple";
import { createSportsCardTemplate } from "./readme-templates/sports";
import { createNeonSynthwaveTemplate } from "./readme-templates/synthwave";
import { createTradingDashboardTemplate } from "./readme-templates/trading";
import type { GithubTemplateInterface } from "./types/core";

export const templates: GithubTemplateInterface[] = [
  {
    id: 1,
    title: "Minimalist Masterpiece",
    description:
      "A clean and straightforward README template that highlights your projects and skills without any distractions.",
    preview: `# Changelog
  ## [Unreleased]
  ## [1.0.0]
  ## [0.9.0]
  ## Migration Guide`,
    icon: "📝",
    fn: createEnhancedUserProfileTemplate,
  },
  {
    id: 2,
    title: "Matrix Profile",
    description:
      "Generates a matrix-style GitHub profile overview with developer statistics, repository data, and visual elements.",
    preview: `# Project Name
  [![Stars](https://img.shields.io/github/stars/username/repo)]()
  ## Features
  ## Installation
  ## Documentation
  ## Contributing`,
    icon: "⭐",
    fn: createMatrixProfileTemplate,
  },
  {
    id: 3,
    title: "DevOps Profile Generator",
    description:
      "Create a dynamic and detailed DevOps profile, showcasing your GitHub contributions, infrastructure metrics, technology stack, and deployment insights—all in a visually engaging template.",
    preview: `# Project
  Description
  ## Quick Start
  ## License`,
    icon: "🎯",
    fn: createDevOpsProfile,
  },
  {
    id: 4,
    title: "Trading Dashboard",
    description:
      "Generates a trading dashboard-inspired GitHub profile template, including repository metrics, language portfolio, top repositories, and personalized developer statistics.",
    preview: `# Product Name
  ## Features
  ## Screenshots
  ## Installation
  ## Feedback`,
    icon: "🎨",
    fn: createTradingDashboardTemplate,
  },
  {
    id: 5,
    title: "Developer's Cookbook Template",
    description:
      'Showcase your GitHub profile as a fun, culinary-inspired "Developer\'s Cookbook" highlighting your top repositories, languages, and contributions as signature dishes and ingredients.',
    preview: `# Hi 👋, I'm [Your Name]
  🔭 I'm currently working on...
  🌱 I'm currently learning...
  👯 I'm looking to collaborate on...
  📫 How to reach me...`,
    icon: "👨‍💻",
    fn: createDevelopersCookbookTemplate,
  },
  {
    id: 6,
    title: "Quest Log",
    description:
      "Level up your GitHub profile with this RPG-inspired README template, perfect for showcasing your coding adventures and achievements.",
    preview: `# Project
  ## Contributing
  ## Code of Conduct
  ## Development
  ## Community`,
    icon: "🌟",
    fn: createRPGDevProfile,
  },
  {
    id: 7,
    title: "My Developer's Journey Map",
    description:
      "Personalized, visual journey of your GitHub contributions, projects, and achievements, highlighting your coding milestones, language expertise, and project stats in an interactive and engaging format.",
    preview: `# Project Documentation
  ## API Reference
  ## Configuration
  ## Examples
  ## Troubleshooting`,
    icon: "📚",
    fn: createDevelopersJourneyTemplate,
  },
  {
    id: 8,
    title: "Neon Synthwave",
    description:
      "Creates a neon synthwave-themed GitHub profile template showcasing user stats, featured projects, and a visually striking retro design.",
    preview: `# CLI Tool
  ## Commands
  ## Options
  ## Examples
  ## Configuration`,
    icon: "⌨️",
    fn: createNeonSynthwaveTemplate,
  },
  {
    id: 9,
    title: "Research Paper",
    description:
      "Creates a research-paper formatted template analyzing a GitHub user's repository statistics and contributions.",
    preview: `# Organization Name
  ## About Us
  ## Projects
  ## Contributing
  ## Contact`,
    icon: "🏢",
    fn: createResearchPaperTemplate,
  },
  {
    id: 10,
    title: "Neon Reflections",
    description:
      "A vibrant README template that combines glassy aesthetics and neon colors to create a visually striking profile.",
    preview: `# Research Project
  ## Abstract
  ## Methodology
  ## Results
  ## Citations`,
    icon: "🎓",
    fn: createGlassNeonTemplate,
  },
  {
    id: 11,
    title: "Developer Sports Card",
    description:
      "Personalized sports card highlighting your GitHub profile, showcasing key stats, top repositories, and skill insights in a fun and engaging way.",
    preview: `# Project Name
  ## Description
  ## Installation
  ## Usage
  ## Contributing
  ## License`,
    icon: "📦",
    fn: createSportsCardTemplate,
  },
];
