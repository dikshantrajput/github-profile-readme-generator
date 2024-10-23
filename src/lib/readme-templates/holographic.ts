import type { IGitRepoIntegration, IGitUserIntegration } from "$lib/types/core";

async function createHolographicHUDTemplate(
  githubUserIntegration: IGitUserIntegration,
  githubRepoIntegration: IGitRepoIntegration,
): Promise<string> {
  try {
    const userProfile = await githubUserIntegration.getUserProfile();
    const repos = await githubRepoIntegration.getRepos();

    // Calculate stats
    const totalStars = repos.reduce((sum: any, repo: any) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum: any, repo: any) => sum + repo.forks_count, 0);
    
    // Get language stats
    const languageMap: { [key: string]: number } = {};
    repos.forEach((repo: any) => {
      if (repo.language) {
        languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
      }
    });

    const mainLanguages = Object.entries(languageMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    const template = `
<div align="center">
  <!-- Holographic Header -->
  <img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=2,2,2,2,2&height=120&section=header&text=${encodeURIComponent(userProfile.name || userProfile.login)}&desc=${encodeURIComponent(userProfile.bio || '')}&animation=twinkling&fontColor=d2ffff&fontSize=40&descSize=20&stroke=00fff9&strokeWidth=2" />

  <!-- HUD Boot Animation -->
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=20&duration=3000&pause=1000&color=00FFF9&center=true&vCenter=true&multiline=true&repeat=false&width=600&height=100&lines=INITIALIZING+DEVELOPER+HUD...;LOADING+SYSTEM+METRICS...;ESTABLISHING+SECURE+CONNECTION..." alt="Typing SVG" />
  </a>
</div>

<!-- Main HUD Display -->
<div align="center">
  <table>
    <tr>
      <td width="50%" align="center">
        <!-- Left Eye Display -->
        <h3>⟨ System Performance ⟩</h3>
        <img src="https://github-readme-stats.vercel.app/api?username=${userProfile.login}&show_icons=true&bg_color=000000&title_color=00fff9&text_color=d2ffff&icon_color=00fff9&border_color=00fff9&border_radius=10&hide_border=false&include_all_commits=true&show=reviews,discussions_started,discussions_answered,prs_merged,prs_merged_percentage" />
      </td>
      <td width="50%" align="center">
        <!-- Right Eye Display -->
        <h3>⟨ Neural Network Analysis ⟩</h3>
        <img src="https://github-readme-streak-stats.herokuapp.com/?user=${userProfile.login}&background=000000&border=00fff9&stroke=00fff9&ring=00fff9&fire=00fff9&currStreakNum=d2ffff&sideNums=d2ffff&currStreakLabel=00fff9&sideLabels=00fff9&dates=d2ffff" />
      </td>
    </tr>
  </table>

  <!-- Tech Radar -->
  <h3>⟨ Technology Radar ⟩</h3>
  <div align="center">
    ${mainLanguages.map(([lang, count]) => `
      <div style="display: inline-block; margin: 10px;">
        <img src="https://img.shields.io/badge/${lang}-${Math.round((count/repos.length)*100)}%25-black?style=for-the-badge&logo=${lang.toLowerCase()}&logoColor=00fff9&labelColor=000000&color=000000&border_color=00fff9" />
      </div>
    `).join('\n')}
  </div>

  <!-- Holographic Projects -->
  <h3>⟨ Featured Projects ⟩</h3>
  <div align="center" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
    ${repos
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
      .slice(0, 4)
      .map((repo: any) => `
        <a href="${repo.html_url}">
          <img src="https://github-readme-stats.vercel.app/api/pin/?username=${userProfile.login}&repo=${repo.name}&bg_color=000000&title_color=00fff9&text_color=d2ffff&icon_color=00fff9&border_color=00fff9&border_radius=10" />
        </a>
      `).join('\n')}
  </div>

  <!-- Activity Scanner -->
  <h3>⟨ Activity Scanner ⟩</h3>
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${userProfile.login}&bg_color=000000&color=00fff9&line=00fff9&point=d2ffff&area=true&area_color=00fff922&hide_border=false&border_color=00fff9&custom_title=Contribution%20Grid" width="100%" />

  <!-- HUD Metrics -->
  <h3>⟨ System Metrics ⟩</h3>
  <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
    <img src="https://img.shields.io/github/stars/${userProfile.login}?style=for-the-badge&logo=github&color=000000&border_color=00fff9&text_color=00fff9&logoColor=00fff9&label=TOTAL%20STARS&labelColor=000000" />
    <img src="https://img.shields.io/github/followers/${userProfile.login}?style=for-the-badge&logo=github&color=000000&border_color=00fff9&text_color=00fff9&logoColor=00fff9&label=FOLLOWERS&labelColor=000000" />
    <img src="https://komarev.com/ghpvc/?username=${userProfile.login}&style=for-the-badge&color=000000&label=PROFILE+VIEWS&labelColor=000000" />
  </div>

  <!-- Communication Channels -->
  <h3>⟨ Communication Channels ⟩</h3>
  <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
    ${userProfile.twitter_username ? 
      `<a href="https://twitter.com/${userProfile.twitter_username}">
        <img src="https://img.shields.io/badge/Twitter-Connect-black?style=for-the-badge&logo=twitter&logoColor=00fff9&labelColor=000000&color=000000" />
      </a>` : ''
    }
    ${userProfile.blog ? 
      `<a href="${userProfile.blog}">
        <img src="https://img.shields.io/badge/Website-Visit-black?style=for-the-badge&logo=About.me&logoColor=00fff9&labelColor=000000&color=000000" />
      </a>` : ''
    }
    <a href="${userProfile.html_url}">
      <img src="https://img.shields.io/badge/GitHub-Follow-black?style=for-the-badge&logo=github&logoColor=00fff9&labelColor=000000&color=000000" />
    </a>
  </div>

  <!-- HUD Footer -->
  <img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=2,2,2,2,2&height=40&section=footer&text=END%20TRANSMISSION&animation=twinkling&fontColor=00fff9&fontSize=20&stroke=00fff9&strokeWidth=1" />
</div>`;

    return template;
  } catch (error) {
    throw new Error(`Error creating holographic HUD template: ${String(error)}`);
  }
}

export { createHolographicHUDTemplate };