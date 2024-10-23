/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IGitRepoIntegration, IGitUserIntegration } from "$lib/types/core";

async function createDevelopersJourneyTemplate(
  githubUserIntegration: IGitUserIntegration,
  githubRepoIntegration: IGitRepoIntegration,
): Promise<string> {
  try {
    const userProfile = await githubUserIntegration.getUserProfile();
    const repos = await githubRepoIntegration.getRepos();

    // Calculate statistics
    const totalStars = repos.reduce((sum: any, repo: any) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum: any, repo: any) => sum + repo.forks_count, 0);

    // Get languages and create territory map
    const languageStats = repos.reduce((acc: any, repo: any) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {});

    const territories = Object.entries(languageStats)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 6);

    const template = `
<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=venom&height=200&text=${encodeURIComponent(`${userProfile.name || userProfile.login}`)}&fontSize=70&color=0:355c7d,100:6c5b7b&stroke=7B3FFF" />
</div>

<div align="center">
  <h2>🗺️ Welcome to My Developer's Journey Map 🗺️</h2>
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=6C5B7B&center=true&vCenter=true&repeat=false&width=500&lines=Level+${repos.length}+Code+Explorer;${totalStars}+Stars+Collected;${totalForks}+Sailers+Joined;${territories.length}+Territories+Conquered" />
</div>

<br>

<div align="center">
  <h2>🏰 Base Stats 🏰</h2>
  <table>
    <tr>
      <td>
        <img src="https://github-readme-stats.vercel.app/api?username=${userProfile.login}&show_icons=true&theme=nightowl&hide_border=true&bg_color=20,355c7d,6c5b7b&title_color=E2E8F0&icon_color=7B3FFF&text_color=E2E8F0&border_radius=15" />
      </td>
      <td>
        <img src="https://github-contribution-stats.vercel.app/api/?username=${userProfile.login}" />
      </td>
    </tr>
  </table>
</div>

<br>

<div align="center">
  <h2>🗻 Landmark Projects 🗻</h2>
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" />
  <br><br>
  <div style="display:flex;justify-content:center;align-items:stretch; flex-wrap: wrap; gap:10px">
  ${repos
    .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6)
    .map((repo: any) => `
<div>
      <a href="${repo.html_url}">
        <img src="https://github-readme-stats.vercel.app/api/pin/?username=${userProfile.login}&repo=${repo.name}&theme=nightowl&hide_border=true&bg_color=20,355c7d,6c5b7b&title_color=E2E8F0&icon_color=7B3FFF&border_radius=15" />
      </a>
    </div>`
  ).join('\n')}
</div>
</div>

<br>

<div align="center">
  <h2>🗺️ Territory Map 🗺️</h2>
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" />
  <br><br>
  <table>
    <tr>
      <td style="min-width:500px">
        <h3>Conquered Territories</h3>
        <div align="left">
          ${territories.map(([lang, count]) => `
<div style="margin: 10px 0;">
              <h4>🏕️ ${lang} Province</h4>
              <div style="background: linear-gradient(90deg, #355c7d ${(count as number / repos.length) * 100}%, transparent ${(count as number / repos.length) * 100}%); height: 20px; border-radius: 10px; border: 1px solid #7B3FFF;">
                <span style="padding: 0 10px; color: #E2E8F0;">${Math.round((count as number / repos.length) * 100)}% Explored</span>
              </div>
            </div>
          `).join('\n')}
</div>
</td>
<td>
<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${userProfile.login}&layout=compact&theme=nightowl&hide_border=true&bg_color=20,355c7d,6c5b7b&title_color=E2E8F0&text_color=E2E8F0&border_radius=15" />
      </td>
    </tr>
  </table>
</div>

<br>

<div align="center">
  <h2>🗿 Journey Milestones 🗿</h2>
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" />
  <br><br>
  <img src="https://github-profile-trophy.vercel.app/?username=${userProfile.login}&theme=darkhub&no-frame=true&column=7&title_color=7B3FFF" />
</div>

<br>

<div align="center">
  <h2>🧭 Travel Routes 🧭</h2>
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" />
  <br><br>
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${userProfile.login}&custom_title=Explorer's%20Activity%20Map&bg_color=355c7d&color=E2E8F0&line=7B3FFF&point=E2E8F0&area=true&area_color=6c5b7b&hide_border=true" />
</div>

<br>

<div align="center">
  <h2>📬 Trading Posts 📬</h2>
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" />
  <br><br>
  ${userProfile.twitter_username ?
    `<a href="https://twitter.com/${userProfile.twitter_username}">
      <img src="https://img.shields.io/badge/Twitter-🏪-7B3FFF?style=for-the-badge&logo=twitter&logoColor=white&labelColor=355c7d" />
    </a>` : ''
  }
  ${userProfile.blog ?
    `<a href="${userProfile.blog}">
      <img src="https://img.shields.io/badge/Website-🏰-7B3FFF?style=for-the-badge&logo=google-chrome&logoColor=white&labelColor=355c7d" />
    </a>` : ''
  }
  <a href="${userProfile.html_url}">
    <img src="https://img.shields.io/badge/GitHub-⚔️-7B3FFF?style=for-the-badge&logo=github&logoColor=white&labelColor=355c7d" />
  </a>
  ${userProfile.email ?
    `<a href="mailto:${userProfile.email}">
      <img src="https://img.shields.io/badge/Email-📜-7B3FFF?style=for-the-badge&logo=gmail&logoColor=white&labelColor=355c7d" />
    </a>` : ''
  }
</div>

<div align="center">
  <br><br>
  <img src="https://capsule-render.vercel.app/api?type=waving&height=100&color=0:355c7d,100:6c5b7b&section=footer" />
</div>`;

    return template;
  } catch (error) {
    throw new Error(`Error creating developer's journey template: ${String(error)}`);
  }
}

export { createDevelopersJourneyTemplate };