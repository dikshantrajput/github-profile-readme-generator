/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IGitRepoIntegration, IGitUserIntegration } from "$lib/types/core";

async function createRPGDevProfile(
  githubUserIntegration: IGitUserIntegration,
  githubRepoIntegration: IGitRepoIntegration,
): Promise<string> {
  try {
    const userProfile = await githubUserIntegration.getUserProfile();
    const repos = await githubRepoIntegration.getRepos();

    // Calculate developer level based on contributions and repos
    const totalStars = repos.reduce((sum: any, repo: any) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum: any, repo: any) => sum + repo.forks_count, 0);
    const devLevel = Math.floor(Math.log2(totalStars + totalForks + repos.length) + 1);

    // Calculate language experience points
    const languageXP = repos.reduce((acc: any, repo: any) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + repo.stargazers_count + repo.forks_count;
      }
      return acc;
    }, {});

    const topSkills = Object.entries(languageXP)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 6);

    const template = `
<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=venom&color=gradient&customColorList=12,20,29&height=300&section=header&text=${encodeURIComponent(userProfile.name || userProfile.login)}&fontSize=70&fontColor=FF5733&animation=fadeIn&desc=${encodeURIComponent('Level ' + devLevel + ' Developer')}&descSize=30&descAlignY=65" />
</div>

<div align="center">
  <!-- Character Stats Card -->
  <table>
    <tr>
      <td width="50%">
        <img src="https://readme-typing-svg.demolab.com?font=Press+Start+2P&size=15&duration=3000&pause=1000&color=FF5733&center=true&vCenter=true&multiline=true&repeat=false&width=435&height=100&lines=${encodeURIComponent(`CLASS: Game Developer;SPECIALIZATION: ${userProfile.company || 'Freelancer'};GUILD: ${userProfile.location || 'Global'};QUESTS COMPLETED: ${repos.length}`)}" />
      </td>
      <td width="50%">
        <div align="center">
          <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${userProfile.login}&layout=compact&theme=gruvbox&hide_border=true&title_color=FF5733&text_color=FFFFFF&bg_color=0D1117" />
        </div>
      </td>
    </tr>
  </table>
</div>

<br>
<br>

<!-- Skill Tree -->
<div align="center">
  <h2>
    🎮 SKILL TREE 🎮
  </h2>
  <div style="background: rgba(13, 17, 23, 0.8); padding: 20px; border-radius: 15px; margin: 10px; display:flex; flex-wrap: wrap; gap: 10px">
    ${topSkills.map(([lang, xp]) => `
<div style="margin: 10px;">
        <img src="https://img.shields.io/badge/${encodeURIComponent(lang)}-${Math.floor(Math.log2(xp as number) + 1)}%20LVL-FF5733?style=for-the-badge&logo=${encodeURIComponent(lang.toLowerCase())}&logoColor=white&labelColor=0D1117" />
      </div>
    `).join('\n')}
  </div>
</div>

<br>
<br>

<!-- Inventory (Projects) -->
<div align="center">
  <h2>
    🎲 INVENTORY (Featured Projects) 🎲
  </h2>
<div align="center">
    ${repos
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .map((repo: any) => `
<a href="${repo.html_url}">
          <img src="https://github-readme-stats.vercel.app/api/pin/?username=${userProfile.login}&repo=${repo.name}&theme=gruvbox&hide_border=true&title_color=FF5733&icon_color=FFB74D&text_color=FFFFFF&bg_color=0D1117" />
        </a>
    `).join('\n')}
  </div>
</div>

<br>
<br>

<!-- Achievement Stats -->
<div align="center">
  <h2>
    🏆 ACHIEVEMENTS 🏆
  </h2>
  <table>
    <tr>
      <td width="50%">
        <img src="https://github-readme-stats.vercel.app/api?username=${userProfile.login}&show_icons=true&theme=gruvbox&hide_border=true&title_color=FF5733&icon_color=FFB74D&text_color=FFFFFF&bg_color=0D1117" />
      </td>
      <td width="50%">
        <img src="https://github-readme-streak-stats.herokuapp.com/?user=${userProfile.login}&theme=gruvbox&hide_border=true&background=0D1117&ring=FF5733&fire=FFB74D&currStreakLabel=FF5733" />
      </td>
    </tr>
  </table>
</div>

<!-- Boss Fight (Contribution Graph) -->
<div align="center">
  <h2>
    ⚔️ BOSS FIGHTS (Contribution Map) ⚔️
  </h2>
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${userProfile.login}&bg_color=0D1117&color=FF5733&line=FFB74D&point=FFFFFF&area=true&hide_border=true&custom_title=Adventure%20Map" width="100%" />
</div>

<br>
<br>

<!-- Party Members (Social Links) -->
<div align="center">
  <h2>
    🤝 JOIN MY PARTY 🤝
  </h2>
  <div style="display: flex; justify-content: center; gap: 10px;">
    ${userProfile.twitter_username ?
      `<a href="https://twitter.com/${userProfile.twitter_username}">
        <img src="https://img.shields.io/badge/Twitter-JOIN-FF5733?style=for-the-badge&logo=twitter&logoColor=white&labelColor=0D1117" />
      </a>` : ''
    }
    ${userProfile.blog ?
      `<a href="${userProfile.blog}">
        <img src="https://img.shields.io/badge/Website-VISIT-FF5733?style=for-the-badge&logo=google-chrome&logoColor=white&labelColor=0D1117" />
      </a>` : ''
    }
<a href="${userProfile.html_url}">
      <img src="https://img.shields.io/badge/GitHub-FOLLOW-FF5733?style=for-the-badge&logo=github&logoColor=white&labelColor=0D1117" />
    </a>
    ${userProfile.email ?
      `<a href="mailto:${userProfile.email}">
        <img src="https://img.shields.io/badge/Email-CONTACT-FF5733?style=for-the-badge&logo=gmail&logoColor=white&labelColor=0D1117" />
      </a>` : ''
    }
  </div>
</div>

<br>
<br>

<!-- Trophy Room -->
<div align="center">
  <h2>
    🎖️ TROPHY ROOM 🎖️
  </h2>
  <img src="https://github-profile-trophy.vercel.app/?username=${userProfile.login}&theme=gruvbox&no-frame=true&no-bg=true&column=7&title_color=FF5733" />
</div>

<br>

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,29&height=100&section=footer" width="100% />
</div>
`;

    return template;
  } catch (error) {
    throw new Error(`Error creating RPG dev profile template: ${String(error)}`);
  }
}

export { createRPGDevProfile };