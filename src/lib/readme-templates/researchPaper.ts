/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IGitRepoIntegration, IGitUserIntegration } from "$lib/types/core";

async function createResearchPaperTemplate(
  githubUserIntegration: IGitUserIntegration,
  githubRepoIntegration: IGitRepoIntegration,
): Promise<string> {
  try {
    const userProfile = await githubUserIntegration.getUserProfile();
    const repos = await githubRepoIntegration.getRepos();

    // Calculate statistics
    const totalStars = repos.reduce(
      (sum: any, repo: any) => sum + repo.stargazers_count,
      0,
    );
    const totalForks = repos.reduce(
      (sum: any, repo: any) => sum + repo.forks_count,
      0,
    );

    // Calculate language distribution
    const languageStats = repos.reduce((acc: any, repo: any) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {});

    const topLanguages = Object.entries(languageStats)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 5);

    // Format date for paper
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });

    const template = `
<div align="center">
  <h1>Technical Analysis and Empirical Evaluation of Software Development Practices</h1>
  <h2>A Comprehensive Study of ${
      userProfile.name || userProfile.login
    }'s Development Portfolio</h2>
  
  <p><em>${userProfile.company || "Independent Researcher"}</em></p>
  <p><em>${userProfile.location || "Global"}</em></p>
  <p><em>${currentDate}</em></p>
</div>

</br>
<div align="center">
  <img src="https://komarev.com/ghpvc/?username=${userProfile.login}&style=for-the-badge&color=grey" alt="Citation Count" />
</div>

</br>

---

</br>

### Abstract
</br>

This paper presents a comprehensive analysis of the software development practices and contributions of ${
      userProfile.name || userProfile.login
    }. Through quantitative analysis of ${repos.length} repositories and ${
      totalStars + totalForks
    } total interactions, we demonstrate significant impact in the field of software development. ${
      userProfile.bio || ""
    }

**Keywords:** Software Engineering, Open Source, Code Quality, Version Control

</br>

---

</br>


### 1. Introduction
</br>

The field of software development requires continuous evaluation of methodologies and practices. This study examines the development patterns and technical contributions of a software engineer through empirical analysis of GitHub metrics and project outcomes.

</br>

---

</br>


## 2. Methodology
</br>

#### 2.1 Development Environment
</br>

\`\`\`yaml
Primary Languages: ${topLanguages.map(([lang]) => lang).join(", ")}
Repository Count: ${repos.length}
Analysis Period: Lifetime Contributions
\`\`\`

#### 2.2 Technical Proficiency Distribution
</br>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${userProfile.login}&layout=compact&theme=transparent&hide_border=true&title_color=000&text_color=000&hide_title=true" />
</div>

</br>

---

</br>


## 3. Results and Analysis
</br>

#### 3.1 Contribution Metrics

<div align="center">
  <table>
    <tr>
      <td>
        <img src="https://github-readme-stats.vercel.app/api?username=${userProfile.login}&show_icons=true&theme=transparent&hide_border=true&title_color=000&text_color=000&icon_color=000&hide_title=true" />
      </td>
      <td>
        <img src="https://github-readme-streak-stats.herokuapp.com/?user=${userProfile.login}&theme=transparent&hide_border=true&stroke=000&ring=000&fire=000&currStreakNum=000&sideNums=000&currStreakLabel=000&sideLabels=000&dates=000" />
      </td>
    </tr>
  </table>
</div>

#### 3.2 Significant Repositories
</br>

<div align="center">
  <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: stretch;justify-content: space-around">
  ${
      repos
        .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6)
        .map((repo: any) => `
<div>
      <a href="${repo.html_url}">
        <img src="https://github-readme-stats.vercel.app/api/pin/?username=${userProfile.login}&repo=${repo.name}&theme=transparent&hide_border=true&title_color=000&text_color=000&icon_color=000" />
      </a>
</div>`).join("\n")
    }
</div>
</div>

#### 3.3 Temporal Analysis of Contributions

<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${userProfile.login}&bg_color=ffffff&color=000000&line=000000&point=000000&area=true&hide_border=true&custom_title=Development%20Activity%20Timeline" />
</div>

</br>

---

</br>


### 4. Technical Expertise
</br>

\`\`\`bibtex
@article{${userProfile.login}_expertise,
    author = {${userProfile.name || userProfile.login}},
    title = {Technical Proficiency Analysis},
    journal = {GitHub Portfolio},
    year = {2024},
    volume = {${repos.length}},
    number = {${totalStars}},
    pages = {${totalForks}},
    keywords = {${topLanguages.map(([lang]) => lang).join(", ")}}
}
\`\`\`

<div align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=${userProfile.login}&theme=flat&no-frame=true&column=6" />
</div>

</br>

---

</br>


### 5. Collaboration Networks
</br>

<div align="center" style="margin: 20px 0;">
  ${
      userProfile.twitter_username
        ? `<a href="https://twitter.com/${userProfile.twitter_username}">
      <img src="https://img.shields.io/badge/Research%20Network-Twitter-black?style=for-the-badge&logo=twitter" />
    </a>`
        : ""
    }
  ${
      userProfile.blog
        ? `<a href="${userProfile.blog}">
      <img src="https://img.shields.io/badge/Research%20Portfolio-Website-black?style=for-the-badge&logo=google-chrome" />
    </a>`
        : ""
    }
  <a href="${userProfile.html_url}">
    <img src="https://img.shields.io/badge/Code%20Repository-GitHub-black?style=for-the-badge&logo=github" />
  </a>
  ${
      userProfile.email
        ? `<a href="mailto:${userProfile.email}">
      <img src="https://img.shields.io/badge/Academic%20Contact-Email-black?style=for-the-badge&logo=gmail" />
    </a>`
        : ""
    }
</div>

</br>

---

</br>


### 6. References

${
      repos
        .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5)
        .map((repo: any, index: number) => `
[${index + 1}] ${userProfile.login}, "${repo.name}," GitHub Repository, ${
          repo.created_at.split("T")[0]
        }.
    Stars: ${repo.stargazers_count}, Forks: ${repo.forks_count}
    Available: ${repo.html_url}
`).join("\n")
    }

</br>

---

</br>

<div align="center">
  <sub>This profile analysis was last updated on ${
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }</sub>
</div>
`;

    return template;
  } catch (error) {
    throw new Error(`Error creating research paper template: ${String(error)}`);
  }
}

export { createResearchPaperTemplate };
