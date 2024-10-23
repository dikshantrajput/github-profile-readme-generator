/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IGitRepoIntegration, IGitUserIntegration } from "$lib/types/core";

async function createDevOpsProfile(
  githubUserIntegration: IGitUserIntegration,
  githubRepoIntegration: IGitRepoIntegration,
): Promise<string> {
  try {
    const userProfile = await githubUserIntegration.getUserProfile();
    const repos = await githubRepoIntegration.getRepos();

    // Calculate infrastructure metrics
    const totalStars = repos.reduce(
      (sum: any, repo: any) => sum + repo.stargazers_count,
      0,
    );
    const totalForks = repos.reduce(
      (sum: any, repo: any) => sum + repo.forks_count,
      0,
    );

    // Get technology stack
    const techStack = repos.reduce((acc: any, repo: any) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {});

    const template = `
<div align="center">
  <img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=200&section=header&text=${
      encodeURIComponent(userProfile.name || userProfile.login)
    }&fontSize=30&fontAlignY=25&animation=twinkling&desc=${
      encodeURIComponent(userProfile.bio || "")
    }&descAlignY=40" />
</div>

</br>
</br>

<!-- System Status Dashboard -->
<div align="center">
  <h2>⚡ SYSTEM STATUS ⚡</h2>
  <table>
    <tr>
      <td>
        <img src="https://img.shields.io/badge/Status-Online-009900?style=for-the-badge&logo=statuspage&logoColor=white" />
      </td>
      <td>
        <img src="https://img.shields.io/badge/Uptime-100%25-009900?style=for-the-badge&logo=statuspal&logoColor=white" />
      </td>
      <td>
        <img src="https://img.shields.io/badge/Region-${
      encodeURIComponent(userProfile.location || "Global")
    }-009900?style=for-the-badge&logo=googlecloud&logoColor=white" />
      </td>
    </tr>
  </table>
</div>

</br>
</br>

<!-- Infrastructure Metrics -->
<div align="center">
  <h2>🔧 INFRASTRUCTURE METRICS 🔧</h2>
  <table>
    <tr>
      <td width="33%">
        <img src="https://img.shields.io/badge/Repositories-${repos.length}-009900?style=for-the-badge&logo=github&logoColor=white" />
      </td>
      <td width="33%">
        <img src="https://img.shields.io/badge/Stars-${totalStars}-009900?style=for-the-badge&logo=github&logoColor=white" />
      </td>
      <td width="33%">
        <img src="https://img.shields.io/badge/Forks-${totalForks}-009900?style=for-the-badge&logo=git&logoColor=white" />
      </td>
    </tr>
  </table>
</div>

</br>
</br>

<!-- Deployment Pipeline -->
<div align="center">
  <h2>🚀 DEPLOYMENT PIPELINE 🚀</h2>
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${userProfile.login}&bg_color=000000&color=00FF00&line=00FF00&point=FFFFFF&area=true&hide_border=true&custom_title=Deployment%20Frequency" />
</div>

</br>
</br>

<!-- Cluster Overview (Top Repositories) -->
<div align="center">
  <h2>💻 CLUSTER OVERVIEW 💻</h2>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
    ${
      repos
        .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6)
        .map((repo: any) => `
<a href="${repo.html_url}">
          <img src="https://github-readme-stats.vercel.app/api/pin/?username=${userProfile.login}&repo=${repo.name}&theme=dark&hide_border=true&title_color=00FF00&icon_color=00FF00&text_color=FFFFFF&bg_color=000000" />
        </a>
    `).join("\n")
    }
  </div>
</div>

</br>
</br>

<!-- Technology Stack Monitoring -->
<div align="center">
  <h2>📊 STACK MONITORING 📊</h2>
  <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 10px;">
    ${
      Object.entries(techStack)
        .sort(([, a], [, b]) => (b as number) - (a as number))
        .slice(0, 8)
        .map(([tech, count]) => `
<div>
          <img src="https://img.shields.io/badge/${
          encodeURIComponent(tech)
        }-${count}%20Instances-009900?style=for-the-badge&logo=${
          encodeURIComponent(tech.toLowerCase())
        }&logoColor=white" />
        </div>
    `).join("\n")
    }
  </div>
</div>

</br>
</br>

<!-- Performance Metrics -->
<div align="center">
  <h2>📈 PERFORMANCE METRICS 📈</h2>
  </br>
  <table>
    <tr>
      <td width="50%">
        <img src="https://github-readme-stats.vercel.app/api?username=${userProfile.login}&show_icons=true&theme=dark&hide_border=true&title_color=00FF00&icon_color=00FF00&text_color=FFFFFF&bg_color=000000" />
      </td>
      <td width="50%">
        <img src="https://github-readme-streak-stats.herokuapp.com/?user=${userProfile.login}&theme=dark&hide_border=true&background=000000&ring=00FF00&fire=00FF00&currStreakLabel=00FF00" />
      </td>
    </tr>
  </table>
</div>

</br>
</br>

<!-- Service Discovery -->
<div align="center">
  <h2>🔍 SERVICE DISCOVERY 🔍</h2>
  </br>
  <div style="display: flex; justify-content: center; gap: 10px;">
    ${
      userProfile.twitter_username
        ? `<a href="https://twitter.com/${userProfile.twitter_username}">
        <img src="https://img.shields.io/badge/Twitter-Connect-009900?style=for-the-badge&logo=twitter&logoColor=white" />
      </a>`
        : ""
    }
    ${
      userProfile.blog
        ? `<a href="${userProfile.blog}">
        <img src="https://img.shields.io/badge/Website-Visit-009900?style=for-the-badge&logo=google-chrome&logoColor=white" />
      </a>`
        : ""
    }
<a href="${userProfile.html_url}">
      <img src="https://img.shields.io/badge/GitHub-Follow-009900?style=for-the-badge&logo=github&logoColor=white" />
    </a>
    ${
      userProfile.email
        ? `<a href="mailto:${userProfile.email}">
        <img src="https://img.shields.io/badge/Email-Contact-009900?style=for-the-badge&logo=gmail&logoColor=white" />
      </a>`
        : ""
    }
  </div>
</div>

</br>
</br>

<!-- System Architecture -->
<div align="center">
  <h2>🏗️ SYSTEM ARCHITECTURE 🏗️</h2>
  <img src="https://github-profile-trophy.vercel.app/?username=${userProfile.login}&theme=matrix&no-frame=true&no-bg=true&column=7" />
</div>

</br>
</br>

<div align="center">
  <img src="https://komarev.com/ghpvc/?username=${userProfile.login}&style=for-the-badge&color=009900" />
</div>`;

    return template;
  } catch (error) {
    throw new Error(`Error creating DevOps profile template: ${String(error)}`);
  }
}

export { createDevOpsProfile };
