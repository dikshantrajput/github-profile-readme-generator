/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IGitRepoIntegration, IGitUserIntegration } from "$lib/types/core";

async function createDevelopersCookbookTemplate(
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
    const languageStats = repos.reduce((acc: any, repo: any) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {});

    const topLanguages = Object.entries(languageStats)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 6);

    // Get top repos as "signature dishes"
    const topRepos = repos
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
      .slice(0, 3);

    const template = `
<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,14,16,18,20&height=200&section=header&text=${encodeURIComponent("The Developer's Cookbook")}&fontSize=50&fontAlignY=35&desc=${encodeURIComponent(`Crafted with ❤️ by ${userProfile.name || userProfile.login}`)}&descAlignY=60&animation=twinkling" width="100%" />
</div>

<div align="center">
  <h3>🧑‍🍳 Master Chef's Profile</h3>
  <img src="https://readme-typing-svg.demolab.com?font=Playfair+Display&size=25&duration=3000&pause=1000&color=FFA500&center=true&vCenter=true&width=600&lines=${encodeURIComponent(`${userProfile.bio || 'Cooking up code...'};${repos.length}+ Recipes in the Collection;${totalStars}+ Recipe Ratings;${totalForks}+ Servings till date;Cooking since ${new Date(userProfile.created_at).getFullYear()}`)}" alt="Chef's Bio" />
</div>

<br>

<div align="center">
  <h2>📖 Recipe Collection Stats</h2>
  <table>
    <tr>
      <td>
        <img src="https://github-readme-stats.vercel.app/api?username=${userProfile.login}&show_icons=true&theme=gruvbox&hide_border=true&title_color=FFA500&icon_color=FFD700&text_color=D2691E&bg_color=FFF8DC" />
      </td>
      <td>
        <img src="https://github-readme-streak-stats.herokuapp.com/?user=${userProfile.login}&theme=gruvbox&background=FFF8DC&border=FFA500&stroke=FFA500&ring=FFD700&fire=D2691E&currStreakLabel=D2691E&sideLabels=D2691E&dates=8B4513" />
      </td>
    </tr>
  </table>
</div>

<br>

<h2 align="center">👨‍🍳 Signature Dishes (Featured Recipes)</h2>

<div align="center" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
  ${topRepos.map((repo: any) => `
<div style="border: 2px solid #FFA500; border-radius: 15px; padding: 15px; margin: 10px; background-color: #FFF8DC;">
      <h3>🍽️ ${repo.name}</h3>
      <p><em>${repo.description || 'A special creation'}</em></p>
      <p>⭐ ${repo.stargazers_count} ratings • 🍴 ${repo.forks_count} servings</p>
      <p>Main Ingredient: ${repo.language || 'Mixed'}</p>
      <a href="${repo.html_url}">
        <img src="https://img.shields.io/badge/View%20Recipe-FFA500?style=for-the-badge&logo=github&logoColor=black" />
      </a>
</div>`).join('\n')}
</div>

<br>

<h2 align="center">🧪 Kitchen Ingredients (Tech Stack)</h2>

<div align="center">
  <div style="background-color: #FFF8DC; border-radius: 15px; padding: 20px; margin: 20px;">
    <h3>🥘 Preferred Ingredients</h3>
    ${topLanguages.map(([lang, count]) => `
<img src="https://img.shields.io/badge/${encodeURIComponent(lang)}-${count}%20recipes-FFA500?style=for-the-badge&logo=${encodeURIComponent(lang.toLowerCase())}&logoColor=black" />
    `).join(' ')}
  </div>
</div>

<br>

<h2 align="center">📊 Cooking Activity (Contributions)</h2>

<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${userProfile.login}&bg_color=FFF8DC&color=D2691E&line=FFA500&point=FFD700&area=true&hide_border=true&custom_title=Kitchen%20Activity%20Timeline" width="100%" />
</div>

<br>

<h2 align="center">🏆 Culinary Achievements</h2>

<div align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=${userProfile.login}&theme=gruvbox&no-frame=true&column=7&margin-w=15&margin-h=15" />
</div>

<br>

<h2 align="center">📬 Visit My Kitchen</h2>

<div align="center">
  ${userProfile.twitter_username ?
    `<a href="https://twitter.com/${userProfile.twitter_username}">
      <img src="https://img.shields.io/badge/Twitter-Kitchen%20Updates-FFA500?style=for-the-badge&logo=twitter&logoColor=black" />
    </a>` : ''
  }
  ${userProfile.blog ?
    `<a href="${userProfile.blog}">
      <img src="https://img.shields.io/badge/Website-Recipe%20Blog-FFA500?style=for-the-badge&logo=firefox&logoColor=black" />
    </a>` : ''
  }
<a href="${userProfile.html_url}">
    <img src="https://img.shields.io/badge/GitHub-Recipe%20Collection-FFA500?style=for-the-badge&logo=github&logoColor=black" />
  </a>
  ${userProfile.email ?
    `<a href="mailto:${userProfile.email}">
      <img src="https://img.shields.io/badge/Email-Contact%20Chef-FFA500?style=for-the-badge&logo=gmail&logoColor=black" />
    </a>` : ''
  }
</div>

<br>

<div align="center">
  <img src="https://komarev.com/ghpvc/?username=${userProfile.login}&style=for-the-badge&color=FFA500&label=Kitchen+Visitors" />
</div>

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,14,16,18,20&height=100&section=footer" width="100%" />
</div>`;

    return template;
  } catch (error) {
    throw new Error(`Error creating developer's cookbook template: ${String(error)}`);
  }
}

export { createDevelopersCookbookTemplate };