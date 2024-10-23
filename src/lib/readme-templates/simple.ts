/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IGitRepoIntegration, IGitUserIntegration } from "$lib/types/core";

async function createEnhancedUserProfileTemplate(
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

    // Get unique languages from repos
    const languages = [
      ...new Set(repos.map((repo: any) => repo.language).filter(Boolean)),
    ];

    // Get top 6 repos sorted by stars
    const topRepos = repos
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);

    // Create typing text from user data
    const typingLines = [
      userProfile.bio,
      `${repos.length} Public Repositories`,
      `${totalStars} Total Stars`,
      ...languages,
    ].filter(Boolean);

    // Create the README template
    const template = `
<div align="center">
  <img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=${
      encodeURIComponent(userProfile.name || userProfile.login)
    }&fontSize=30&fontAlignY=25&animation=twinkling&desc=${
      encodeURIComponent(userProfile.bio || "")
    }&descAlignY=40" />

  ![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&duration=3000&pause=1000&color=3b82f6&center=true&vCenter=true&width=435&lines=${
      encodeURIComponent(typingLines.join(";"))
    })
</div>
<br />

<h2 align="center">
  <img src="https://media.giphy.com/media/iY8CRBdQXODJSCERIr/giphy.gif" width="35"> Quick Stats <img src="https://media.giphy.com/media/iY8CRBdQXODJSCERIr/giphy.gif" width="35">
</h2>
<div align="center">
  <img src="https://custom-icon-badges.demolab.com/badge/-${repos.length}%20Repositories-2962FF?style=for-the-badge&logoColor=white&logo=repo"/>
  <img src="https://custom-icon-badges.demolab.com/badge/-${totalStars}%20Stars-FFB000?style=for-the-badge&logoColor=white&logo=star"/>
  <img src="https://custom-icon-badges.demolab.com/badge/-${totalForks}%20Forks-FF4B4B?style=for-the-badge&logoColor=white&logo=fork"/>
</div>

<br/>
<br/>

<h2 align="center">
  <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif" width="35"> GitHub Analytics <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif" width="35">
</h2>
<p align="center">
  <a href="https://github.com/${userProfile.login}">
    <img height="180em" src="https://github-readme-stats-sigma-five.vercel.app/api?username=${userProfile.login}&show_icons=true&count_private=true&theme=react&hide_border=true&bg_color=0D1117&title_color=3b82f6&icon_color=22c55e"/>
    <img height="180em" src="https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=${userProfile.login}&langs_count=8&count_private=true&layout=compact&theme=react&hide_border=true&bg_color=0D1117&title_color=3b82f6"/>
  </a>
</p>

<br/>

<p align="center">
  <a href="https://github.com/${userProfile.login}">
    <img src="https://github-readme-streak-stats.herokuapp.com/?user=${userProfile.login}&theme=react&hide_border=true&stroke=0000&background=0D1117&ring=3b82f6&fire=22c55e&currStreakLabel=3b82f6" alt="GitHub Streak Stats" />
  </a>
</p>

<br/>
<br/>

<h2 align="center">
  <img src="https://media.giphy.com/media/0TtX2qqpxp3pIafzio/giphy.gif" width="35"> Top Repositories <img src="https://media.giphy.com/media/0TtX2qqpxp3pIafzio/giphy.gif" width="35">
</h2>

<div align="center">
  ${
      topRepos.map((repo: any) => `
  <a href="${repo.html_url}">
    <img align="center" src="https://github-readme-stats-sigma-five.vercel.app/api/pin/?username=${userProfile.login}&repo=${repo.name}&theme=react&hide_border=true&bg_color=0D1117&title_color=3b82f6&icon_color=22c55e" />
  </a>
  `).join("\n")
    }
</div>

<br/>
<br/>

<div align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=${userProfile.login}&theme=react&no-frame=true&no-bg=true&row=1&column=7" />
</div>

<br/>
<br/>

<img width="100%" src="https://github-readme-activity-graph.vercel.app/graph?username=dikshantrajput&custom_title=Contribution%20Graph&bg_color=0D1117&color=3b82f6&line=22c55e&point=FFFFFF&area=true&area_color=22c55e&hide_border=true" />

<br/>
<br/>

<div align="center">
<h2 align="center">
  <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="35"> Let's Connect <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="35">
</h2>
  ${
      userProfile.twitter_username
        ? `<a href="https://twitter.com/${userProfile.twitter_username}">
      <img src="https://img.shields.io/badge/Twitter-%231DA1F2?style=for-the-badge&logo=Twitter&logoColor=white"/>
    </a>`
        : ""
    }
  ${
      userProfile.blog
        ? `<a href="${userProfile.blog}">
      <img src="https://img.shields.io/badge/Website-%23000000?style=for-the-badge&logo=About.me&logoColor=white"/>
    </a>`
        : ""
    }
  <a href="${userProfile.html_url}">
    <img src="https://img.shields.io/badge/-GitHub-%23181717?style=for-the-badge&logo=github&logoColor=white"/>
  </a>
  ${
      userProfile.email
        ? `<a href="mailto:${userProfile.email}">
      <img src="https://img.shields.io/badge/Email-%23D14836?style=for-the-badge&logo=gmail&logoColor=white"/>
    </a>`
        : ""
    }
</div>

<br/>
<br/>

<p align="center">
  <img src="https://komarev.com/ghpvc/?username=${userProfile.login}&style=for-the-badge&color=3b82f6" alt="Profile Views" />
</p>
        `;

    return template;
  } catch (error) {
    throw new Error(
      `Error creating enhanced user profile template: ${String(error)}`,
    );
  }
}

export { createEnhancedUserProfileTemplate };
