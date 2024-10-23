/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IGitRepoIntegration, IGitUserIntegration } from "$lib/types/core";

async function createSportsCardTemplate(
  githubUserIntegration: IGitUserIntegration,
  githubRepoIntegration: IGitRepoIntegration,
): Promise<string> {
  try {
    const userProfile = await githubUserIntegration.getUserProfile();
    const repos = await githubRepoIntegration.getRepos();

    // Calculate "career" stats
    const totalStars = repos.reduce((sum: any, repo: any) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum: any, repo: any) => sum + repo.forks_count, 0);
    const totalIssues = repos.reduce((sum: any, repo: any) => sum + repo.open_issues_count, 0);
    
    // Calculate "batting average" (success rate of PRs/commits)
    const successRate = ((totalStars / (totalStars + totalIssues)) * 1000).toFixed(3);
    
    // Get primary languages as "positions"
    const languageStats = repos.reduce((acc: any, repo: any) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {});

    const positions = Object.entries(languageStats)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 4)
      .map(([lang]) => lang);

    const template = `
<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=venom&height=300&color=gradient&customColorList=3&text=${encodeURIComponent(userProfile.name || userProfile.login)}&fontSize=80&fontAlignY=40&desc=${encodeURIComponent('⚾ Developer Trading Card ⚾')}&descSize=30&descAlignY=65&animation=fadeIn" width="100%" />
</div>

<div align="center">
  <table>
    <tr>
      <td width="40%" align="center">
        <div style="border: 2px solid gold; border-radius: 10px; padding: 10px; background: linear-gradient(145deg, #2a2a2a, #3a3a3a);">
          <img src="${userProfile.avatar_url}" width="300" style="border-radius: 10px;" />
          <div style="margin-top: 10px;">
            <img src="https://readme-typing-svg.demolab.com?font=Playfair+Display&weight=600&size=20&duration=3000&pause=1000&color=GOLD&center=true&vCenter=true&width=300&lines=${encodeURIComponent(`${positions.join(';')}`)}" />
          </div>
        </div>
      </td>
      <td width="60%" align="center">
        <div style="font-family: 'Playfair Display', serif;">
          <table style="background: linear-gradient(145deg, #2a2a2a, #3a3a3a); border-radius: 10px; padding: 20px;">
            <tr>
              <th colspan="4" style="font-size: 24px; color: gold; padding: 10px;">CAREER STATISTICS</th>
            </tr>
            <tr>
              <td align="center" style="padding: 10px;">
                <div style="font-size: 28px; color: white;">${successRate}</div>
                <div style="color: gold;">Batting Avg</div>
              </td>
              <td align="center" style="padding: 10px;">
                <div style="font-size: 28px; color: white;">${totalStars}</div>
                <div style="color: gold;">Home Runs</div>
              </td>
              <td align="center" style="padding: 10px;">
                <div style="font-size: 28px; color: white;">${totalForks}</div>
                <div style="color: gold;">RBIs</div>
              </td>
              <td align="center" style="padding: 10px;">
                <div style="font-size: 28px; color: white;">${repos.length}</div>
                <div style="color: gold;">Games Played</div>
              </td>
            </tr>
          </table>
        </div>
      </td>
    </tr>
  </table>
</div>

<br>

<div align="center" style="margin-top: 20px;">
  <div style="background: linear-gradient(145deg, #2a2a2a, #3a3a3a); border-radius: 10px; padding: 20px; max-width: 800px; margin: 0 auto;">
    <h2 style="color: gold; font-family: 'Playfair Display', serif;">SEASON HIGHLIGHTS</h2>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
      ${repos
        .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
        .slice(0, 4)
        .map((repo: any) => `
<div style="border: 2px solid gold; border-radius: 10px; padding: 10px;">
            <h3 style="color: white; margin: 0;">${repo.name}</h3>
            <p style="color: gold; margin: 5px 0;">⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</p>
            <p style="color: #ccc; margin: 5px 0;">${repo.description || 'No description available'}</p>
          </div>
        `).join('\n')}
  </div>
</div>

<br>

<div align="center">
  <div style="background: linear-gradient(145deg, #2a2a2a, #3a3a3a); border-radius: 10px; padding: 20px; max-width: 800px; margin: 0 auto;">
    <h2 style="color: gold; font-family: 'Playfair Display', serif;">PERFORMANCE METRICS</h2>
    <img src="https://github-readme-streak-stats.herokuapp.com/?user=${userProfile.login}&theme=great-gatsby&hide_border=true&background=00000000&stroke=gold&ring=gold&fire=orange&currStreakNum=white&sideNums=white&currStreakLabel=gold&sideLabels=gold" />
  </div>
</div>

<br>

<div align="center">
  <div style="background: linear-gradient(145deg, #2a2a2a, #3a3a3a); border-radius: 10px; padding: 20px; max-width: 800px; margin: 0 auto;">
    <h2 style="color: gold; font-family: 'Playfair Display', serif;">SKILLS SCOUTING REPORT</h2>
    <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${userProfile.login}&layout=compact&theme=great-gatsby&hide_border=true&bg_color=00000000&title_color=gold&text_color=white" />
  </div>
</div>

<br>

<div align="center">
  <div style="background: linear-gradient(145deg, #2a2a2a, #3a3a3a); border-radius: 10px; padding: 20px; max-width: 800px; margin: 0 auto;">
    <h2 style="color: gold; font-family: 'Playfair Display', serif;">SEASONAL PERFORMANCE</h2>
    <img src="https://github-readme-activity-graph.vercel.app/graph?username=${userProfile.login}&bg_color=00000000&color=gold&line=orange&point=white&area=true&hide_border=true&custom_title=Contribution%20Timeline" width="100%" />
  </div>
</div>

<div align="center" style="margin-top: 20px;">
  <div style="border: 2px solid gold; border-radius: 10px; padding: 10px; display: inline-block; background: linear-gradient(145deg, #2a2a2a, #3a3a3a);">
    <h2 style="color: gold; font-family: 'Playfair Display', serif; margin: 0;">CONNECT WITH THE PLAYER</h2>
    <div style="margin-top: 10px;">
      ${userProfile.twitter_username ?
        `<a href="https://twitter.com/${userProfile.twitter_username}">
          <img src="https://img.shields.io/badge/Twitter-gold?style=for-the-badge&logo=twitter&logoColor=black" />
        </a> ` : ''
      }
      ${userProfile.blog ?
        `<a href="${userProfile.blog}">
          <img src="https://img.shields.io/badge/Website-gold?style=for-the-badge&logo=google-chrome&logoColor=black" />
        </a> ` : ''
      }
<a href="${userProfile.html_url}">
        <img src="https://img.shields.io/badge/GitHub-gold?style=for-the-badge&logo=github&logoColor=black" />
      </a>
      ${userProfile.email ?
        `<a href="mailto:${userProfile.email}">
          <img src="https://img.shields.io/badge/Email-gold?style=for-the-badge&logo=gmail&logoColor=black" />
        </a>` : ''
      }
  </div>
</div>

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=100&color=gradient&customColorList=3&section=footer" width="100%" />
</div>`;

    return template;
  } catch (error) {
    throw new Error(`Error creating sports card template: ${String(error)}`);
  }
}

export { createSportsCardTemplate };