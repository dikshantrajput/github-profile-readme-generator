/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IGitRepoIntegration, IGitUserIntegration } from "$lib/types/core";

async function createNeonSynthwaveTemplate(
  githubUserIntegration: IGitUserIntegration,
  githubRepoIntegration: IGitRepoIntegration,
): Promise<string> {
  try {
    const userProfile = await githubUserIntegration.getUserProfile();
    const repos = await githubRepoIntegration.getRepos();

    // Calculate advanced stats
    const totalStars = repos.reduce((sum: any, repo: any) => sum + repo.stargazers_count, 0);
    const totalCommits = repos.reduce((sum: any, repo: any) => sum + (repo.commits_count || 0), 0);

    // Get language stats
    const languageStats: { [key: string]: number } = {};
    repos.forEach((repo: any) => {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
      }
    });

    const template = `
<div align="center">
  <!-- Synthwave Header -->
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,2,5,30&height=180&section=header&text=${encodeURIComponent(userProfile.name || userProfile.login)}&desc=${encodeURIComponent('< ' + (userProfile.bio || 'Developer') + ' >')}&fontSize=40&descSize=20&fontColor=ff2e97&animation=twinkling" />

  <!-- Retro Wave Animation -->
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.demolab.com?font=Press+Start+2P&size=20&duration=4000&pause=1000&color=FF2E97&center=true&vCenter=true&multiline=true&repeat=false&width=500&height=100&lines=PRESS+START;LOADING+DEVELOPER+PROFILE...;SYSTEM+READY" alt="Typing SVG" />
  </a>
</div>

<!-- Neon Statistics Grid -->
<table align="center">
  <tr>
    <td width="50%">
      <img src="https://github-readme-stats.vercel.app/api?username=${userProfile.login}&show_icons=true&bg_color=2E213B&title_color=ff2e97&text_color=c792ea&icon_color=00b4ee&border_color=ff2e97&border_radius=10&include_all_commits=true" />
    </td>
    <td width="50%">
      <img src="https://github-readme-streak-stats.herokuapp.com/?user=${userProfile.login}&background=2E213B&border=ff2e97&stroke=ff2e97&ring=ff2e97&fire=00b4ee&currStreakNum=c792ea&sideNums=c792ea&currStreakLabel=00b4ee&sideLabels=00b4ee&dates=c792ea" />
    </td>
  </tr>
</table>

<!-- Retro Wave Separator -->
<img src="https://user-images.githubusercontent.com/74038190/212744287-14f66c13-5458-40dc-9244-8ff533fc8f4a.gif" width="100%">

<!-- Featured Projects -->
<div align="center">
  <h2>
    <img src="https://media.giphy.com/media/WFZvB7VIXBgiz3oDXE/giphy.gif" width="35">
    <span style="color: #ff2e97">Featured Projects</span>
    <img src="https://media.giphy.com/media/WFZvB7VIXBgiz3oDXE/giphy.gif" width="35">
  </h2>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
    ${repos
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
      .slice(0, 4)
      .map((repo: any) => `
        <a href="${repo.html_url}">
          <img src="https://github-readme-stats.vercel.app/api/pin/?username=${userProfile.login}&repo=${repo.name}&bg_color=2E213B&title_color=ff2e97&text_color=c792ea&icon_color=00b4ee&border_color=ff2e97&border_radius=10" />
        </a>
      `).join('\n')}
  </div>
</div>

<!-- Skill Grid -->
<div align="center">
  <h2>
    <img src="https://media.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif" width="35">
    <span style="color: #ff2e97">Tech Stack</span>
    <img src="https://media.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif" width="35">
  </h2>
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${userProfile.login}&bg_color=2E213B&color=ff2e97&line=00b4ee&point=c792ea&area=true&area_color=ff2e9722&hide_border=true&custom_title=Contribution%20Grid" width="100%" />
</div>

<!-- Retro Wave Separator -->
<img src="https://user-images.githubusercontent.com/74038190/212744287-14f66c13-5458-40dc-9244-8ff533fc8f4a.gif" width="100%">

<!-- Stats Grid -->
<div align="center">
  <h2>
    <img src="https://media.giphy.com/media/ZDTbix65Me1YDNLDF3/giphy.gif" width="35">
    <span style="color: #ff2e97">Developer Stats</span>
    <img src="https://media.giphy.com/media/ZDTbix65Me1YDNLDF3/giphy.gif" width="35">
  </h2>
  <p align="center">
    <img src="https://img.shields.io/github/stars/${userProfile.login}?style=for-the-badge&logo=github&color=2E213B&logoColor=ff2e97&labelColor=2E213B&label=TOTAL%20STARS" />
    <img src="https://img.shields.io/github/followers/${userProfile.login}?style=for-the-badge&logo=github&color=2E213B&logoColor=ff2e97&labelColor=2E213B&label=FOLLOWERS" />
    <img src="https://komarev.com/ghpvc/?username=${userProfile.login}&style=for-the-badge&color=2E213B&label=PROFILE+VIEWS&labelColor=2E213B" />
  </p>
</div>

<!-- Connect Section -->
<div align="center">
  <h2>
    <img src="https://media.giphy.com/media/du3J3cXyzhj75IOgvA/giphy.gif" width="35">
    <span style="color: #ff2e97">Connect With Me</span>
    <img src="https://media.giphy.com/media/du3J3cXyzhj75IOgvA/giphy.gif" width="35">
  </h2>
  ${userProfile.twitter_username ? 
    `<a href="https://twitter.com/${userProfile.twitter_username}">
      <img src="https://img.shields.io/badge/Twitter-Connect-2E213B?style=for-the-badge&logo=twitter&logoColor=ff2e97&labelColor=2E213B&color=2E213B" />
    </a>` : ''
  }
  ${userProfile.blog ? 
    `<a href="${userProfile.blog}">
      <img src="https://img.shields.io/badge/Website-Visit-2E213B?style=for-the-badge&logo=About.me&logoColor=ff2e97&labelColor=2E213B&color=2E213B" />
    </a>` : ''
  }
  <a href="${userProfile.html_url}">
    <img src="https://img.shields.io/badge/GitHub-Follow-2E213B?style=for-the-badge&logo=github&logoColor=ff2e97&labelColor=2E213B&color=2E213B" />
  </a>
</div>

<!-- Footer -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,2,5,30&height=100&section=footer" />`;

    return template;
  } catch (error) {
    throw new Error(`Error creating neon synthwave template: ${String(error)}`);
  }
}

export { createNeonSynthwaveTemplate };