/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IGitRepoIntegration, IGitUserIntegration } from "$lib/types/core";

async function createTradingDashboardTemplate(
  githubUserIntegration: IGitUserIntegration,
  githubRepoIntegration: IGitRepoIntegration,
): Promise<string> {
  try {
    const userProfile = await githubUserIntegration.getUserProfile();
    const repos = await githubRepoIntegration.getRepos();

    // Calculate repository metrics
    const totalStars = repos.reduce((sum: any, repo: any) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum: any, repo: any) => sum + repo.forks_count, 0);
    const totalWatchers = repos.reduce((sum: any, repo: any) => sum + repo.watchers_count, 0);

    // Calculate language portfolio
    const languageStats = repos.reduce((acc: any, repo: any) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {});

    const totalRepos = repos.length;
    const languagePortfolio = Object.entries(languageStats)
      .map(([lang, count]) => ({
        lang,
        percentage: ((count as number) / totalRepos * 100).toFixed(1)
      }))
      .sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage))
      .slice(0, 5);

    // Get top performing repos
    const topRepos = repos
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);

    const template = `
<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=rect&color=0a0047&height=120&section=header&text=${encodeURIComponent(userProfile.name || userProfile.login)}'s%20Tech%20Portfolio&fontSize=36&fontColor=00ff88&animation=fadeIn" width="100%" />
</div>

<br/>

\`\`\`diff
@@ MARKET SUMMARY | ${new Date().toLocaleDateString()} @@
${repos.length > 0 ? '+' : '-'} REPOS Index: ${repos.length} units
${totalStars > 0 ? '+' : '-'} STAR Index: ${totalStars} points
${totalForks > 0 ? '+' : '-'} FORK Market Cap: ${totalForks} units
${totalWatchers > 0 ? '+' : '-'} WATCH List Volume: ${totalWatchers} trackers
\`\`\`

<div align="center">
  <h2>📈 Developer Performance Metrics 📉</h2>
  <table>
    <tr>
      <td>
        <img src="https://github-readme-streak-stats.herokuapp.com/?user=${userProfile.login}&theme=chartreuse-dark&hide_border=true&border_radius=0&date_format=M%20j%5B%2C%20Y%5D&background=0a0047&stroke=00ff88&ring=00ff88&fire=ffd700&currStreakLabel=00ff88" />
      </td>
      <td>
        <img src="https://github-readme-stats.vercel.app/api?username=${userProfile.login}&show_icons=true&theme=chartreuse-dark&hide_border=true&bg_color=0a0047&title_color=00ff88&icon_color=ffd700&text_color=ffffff" />
      </td>
    </tr>
  </table>
</div>

<br/>

<h2>📊 Technology Portfolio Distribution</h2>

\`\`\`diff
! ASSET ALLOCATION BY LANGUAGE
${languagePortfolio.map(({ lang, percentage }) => 
  `${Number(percentage) > 20 ? '+' : '-'} ${lang.padEnd(15)} ${percentage}% ${('▓'.repeat(Math.floor(Number(percentage)/2))).padEnd(20)}`
).join('\n')}
\`\`\`

<h2>🕯️ Top Performing Assets (Repositories) 📊</h2>

<div align="center">
  ${topRepos.map((repo: any) => `
  <a href="${repo.html_url}">
    <img src="https://github-readme-stats.vercel.app/api/pin/?username=${userProfile.login}&repo=${repo.name}&theme=chartreuse-dark&hide_border=true&bg_color=0a0047&title_color=00ff88&icon_color=ffd700" />
  </a>
  `).join('\n')}
</div>

<br/>

<h2>📡 Market Activity Matrix</h2>

<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${userProfile.login}&bg_color=0a0047&color=00ff88&line=ffd700&point=ffffff&area=true&hide_border=true&custom_title=Contribution%20Volatility%20Index" />
</div>

<br/>

<h2>🏆 Achievement Indices</h2>

<div align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=${userProfile.login}&theme=matrix&no-frame=true&column=7&title=Stars,Followers,Commits,Repositories,PullRequest,Issues&no-bg=true" />
</div>

<br/>

<h2>📱 Trading Desk Contact</h2>

<div align="center">
  ${userProfile.twitter_username ? 
    `<a href="https://twitter.com/${userProfile.twitter_username}">
      <img src="https://img.shields.io/badge/Twitter-𝕏-00ff88?style=for-the-badge&logo=twitter&logoColor=white&labelColor=0a0047" />
    </a>` : ''
  }
  ${userProfile.blog ?
    `<a href="${userProfile.blog}">
      <img src="https://img.shields.io/badge/Website-🌐-00ff88?style=for-the-badge&logo=google-chrome&logoColor=white&labelColor=0a0047" />
    </a>` : ''
  }
  <a href="${userProfile.html_url}">
    <img src="https://img.shields.io/badge/GitHub-📈-00ff88?style=for-the-badge&logo=github&logoColor=white&labelColor=0a0047" />
  </a>
  ${userProfile.email ?
    `<a href="mailto:${userProfile.email}">
      <img src="https://img.shields.io/badge/Email-📧-00ff88?style=for-the-badge&logo=gmail&logoColor=white&labelColor=0a0047" />
    </a>` : ''
  }
</div>

<br/>

<div align="center">
  <h3>📈 Market Sentiment</h3>
  <img src="https://komarev.com/ghpvc/?username=${userProfile.login}&color=00ff88&style=for-the-badge&label=PROFILE+VIEWS" />
</div>

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0a0047&height=120&section=footer" width="100%" />
</div>
`;

    return template;
  } catch (error) {
    throw new Error(`Error creating trading dashboard template: ${String(error)}`);
  }
}

export { createTradingDashboardTemplate };