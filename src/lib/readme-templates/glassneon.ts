/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IGitRepoIntegration, IGitUserIntegration } from "$lib/types/core";

async function createGlassNeonTemplate(
  githubUserIntegration: IGitUserIntegration,
  githubRepoIntegration: IGitRepoIntegration,
): Promise<string> {
  try {
    const userProfile = await githubUserIntegration.getUserProfile();
    const repos = await githubRepoIntegration.getRepos();

    // Advanced stats calculations
    const totalStars = repos.reduce((sum: any, repo: any) => sum + repo.stargazers_count, 0);
    
    // Calculate technology expertise
    const languageStats = repos.reduce((acc: any, repo: any) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {});

    const topLanguages = Object.entries(languageStats)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 6);

    const template = `
<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,12,30&height=180&section=header&text=${encodeURIComponent(userProfile.name || userProfile.login)}&fontSize=60&fontAlignY=35&desc=${encodeURIComponent(userProfile.bio || '')}&descAlignY=60&animation=twinkling" width="100%" />
</div>

<div align="center">
  <a href="${userProfile.html_url}">
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=24&duration=4000&pause=1000&color=00F7FF&center=true&vCenter=true&width=600&lines=${encodeURIComponent(`Hello World 👋;I'm ${userProfile.name || userProfile.login}; ${userProfile.bio || ''};${repos.length}+ Public Repositories;${totalStars}+ Total Stars`)}" alt="Typing SVG" />
  </a>
</div>

<br>
<br>

<div align="center">
  <table>
    <tr>
      <td width="50%" align="center">
        <img src="https://github-readme-stats.vercel.app/api?username=${userProfile.login}&show_icons=true&theme=radical&bg_color=0D1117&hide_border=true&border_radius=15&title_color=00F7FF&icon_color=00F7FF&text_color=FFFFFF" />
      </td>
      <td width="50%" align="center">
        <img src="https://github-readme-streak-stats.herokuapp.com/?user=${userProfile.login}&theme=radical&background=0D1117&hide_border=true&border_radius=15&ring=00F7FF&fire=00F7FF&currStreakLabel=00F7FF" />
      </td>
    </tr>
  </table>
</div>

<br>
<br>

<div align="center">
  <h2>
    <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width="30px" height="30px">
    Featured Projects
  </h2>
  <br>
  <div align="center">
    ${repos
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .map((repo: any) => `
<a href="${repo.html_url}">
          <img src="https://github-readme-stats.vercel.app/api/pin/?username=${userProfile.login}&repo=${repo.name}&theme=radical&bg_color=0D1117&hide_border=true&border_radius=15&title_color=00F7FF&icon_color=00F7FF" />
        </a>
      `).join('\n')}
  </div>
</div>

<br>
<br>

<div align="center">
  <h2>
    <img src="https://media.giphy.com/media/iY8CRBdQXODJSCERIr/giphy.gif" width="30px" height="30px">
    Developer Metrics
  </h2>
  <br>
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${userProfile.login}&layout=compact&theme=radical&bg_color=0D1117&hide_border=true&border_radius=15&title_color=00F7FF&text_color=FFFFFF" />
</div>

<br>

<div align="center">
  <h2>
    <img src="https://media.giphy.com/media/jSKBmKkvo2dPQQtsR1/giphy.gif" width="30px" height="30px">
    Tech Arsenal
  </h2>
  <br>
  <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 10px;">
    ${topLanguages.map(([lang]) => `
<img src="https://img.shields.io/badge/${encodeURIComponent(lang)}-Expert-00F7FF?style=for-the-badge&logo=${encodeURIComponent(lang.toLowerCase())}&logoColor=white&labelColor=0D1117" />
    `).join('\n')}
  </div>
</div>

<br>
<br>

<div align="center">
  <h2>
    <img src="https://media.giphy.com/media/c4u2gld3Or69i/giphy.gif" width="30px" height="30px">
    Connect With Me
  </h2>
  <br>
  <div style="display: flex; justify-content: center; gap: 10px;">
    ${userProfile.twitter_username ?
      `<a href="https://twitter.com/${userProfile.twitter_username}">
        <img src="https://img.shields.io/badge/Twitter-00F7FF?style=for-the-badge&logo=twitter&logoColor=white&labelColor=0D1117" />
      </a>` : ''
    }
    ${userProfile.blog ?
      `<a href="${userProfile.blog}">
        <img src="https://img.shields.io/badge/Website-00F7FF?style=for-the-badge&logo=google-chrome&logoColor=white&labelColor=0D1117" />
      </a>` : ''
    }
<a href="${userProfile.html_url}">
      <img src="https://img.shields.io/badge/GitHub-00F7FF?style=for-the-badge&logo=github&logoColor=white&labelColor=0D1117" />
    </a>
    ${userProfile.email ?
      `<a href="mailto:${userProfile.email}">
        <img src="https://img.shields.io/badge/Email-00F7FF?style=for-the-badge&logo=gmail&logoColor=white&labelColor=0D1117" />
      </a>` : ''
    }
  </div>
</div>

<br>
<br>

<div align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=${userProfile.login}&theme=radical&no-frame=true&no-bg=true&column=7&title_color=00F7FF" />
</div>

<br>
<br>

<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${userProfile.login}&bg_color=0D1117&color=00F7FF&line=FF00FF&point=FFFFFF&area=true&hide_border=true&custom_title=Contribution%20Graph" width="100%" />
</div>

<br>
<br>

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,12,30&height=100&section=footer" width="100%" />
</div>`;

    return template;
  } catch (error) {
    throw new Error(`Error creating glass neon template: ${String(error)}`);
  }
}

export { createGlassNeonTemplate };