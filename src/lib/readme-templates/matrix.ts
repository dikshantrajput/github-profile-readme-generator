import type { IGitRepoIntegration, IGitUserIntegration } from "$lib/types/core";

/* eslint-disable @typescript-eslint/no-explicit-any */
async function createMatrixProfileTemplate(
  githubUserIntegration: IGitUserIntegration,
  githubRepoIntegration: IGitRepoIntegration,
): Promise<string> {
  try {
    const userProfile = await githubUserIntegration.getUserProfile();
    const repos = await githubRepoIntegration.getRepos();

    // Calculate stats
    const totalStars = repos.reduce(
      (sum: any, repo: any) => sum + repo.stargazers_count,
      0,
    );
    const totalForks = repos.reduce(
      (sum: any, repo: any) => sum + repo.forks_count,
      0,
    );

    const template = `
<div align="center">
  <!-- Matrix-style ASCII Art Header -->
  <pre><code>
  ██████╗ ███████╗██╗   ██╗███████╗██╗      ██████╗ ██████╗ ███████╗██████╗ 
  ██╔══██╗██╔════╝██║   ██║██╔════╝██║     ██╔═══██╗██╔══██╗██╔════╝██╔══██╗
  ██║  ██║█████╗  ██║   ██║█████╗  ██║     ██║   ██║██████╔╝█████╗  ██████╔╝
  ██║  ██║██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║     ██║   ██║██╔═══╝ ██╔══╝  ██╔══██╗
  ██████╔╝███████╗ ╚████╔╝ ███████╗███████╗╚██████╔╝██║     ███████╗██║  ██║
  ╚═════╝ ╚══════╝  ╚═══╝  ╚══════╝╚══════╝ ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═╝
  </code></pre>

  <!-- Matrix-style Moving Text -->
  <img src="https://readme-typing-svg.demolab.com?font=Matrix+Code+NFI&size=25&duration=1000&pause=1000&color=00FF00&center=true&vCenter=true&width=600&lines=INITIALIZING+SYSTEM...;LOADING+PROFILE+DATA...;ACCESSING+MAINFRAME...;DEVELOPER:+${
      encodeURIComponent(userProfile.name || userProfile.login)
    };STATUS:+ACTIVE" />

  <!-- Matrix-style Profile Stats -->
  <table>
    <tr>
      <td>
        <div align="center">
          <img src="https://github-readme-stats.vercel.app/api?username=${userProfile.login}&show_icons=true&theme=chartreuse-dark&bg_color=000000&hide_border=true&text_color=00FF00&title_color=00FF00&icon_color=00FF00&border_color=00FF00" />
        </div>
      </td>
      <td>
        <div align="center">
          <img src="https://github-readme-streak-stats.herokuapp.com/?user=${userProfile.login}&theme=chartreuse-dark&background=000000&hide_border=true&ring=00FF00&fire=00FF00&currStreakLabel=00FF00" />
        </div>
      </td>
    </tr>
  </table>
  <br />

  <!-- System Status Display -->
  <div align="center">
    <h2>SYSTEM STATUS</h2>
    <table>
      <tr>
        <td><img src="https://img.shields.io/badge/Repositories-${repos.length}-00FF00?style=for-the-badge&logo=github&logoColor=00FF00&labelColor=000000&color=009900" /></td>
        <td><img src="https://img.shields.io/badge/Stars-${totalStars}-00FF00?style=for-the-badge&logo=github&logoColor=00FF00&labelColor=000000&color=009900" /></td>
        <td><img src="https://img.shields.io/badge/Forks-${totalForks}-00FF00?style=for-the-badge&logo=github&logoColor=00FF00&labelColor=000000&color=009900" /></td>
      </tr>
    </table>
  </div>

  <br />
  <br />

  <!-- Matrix-style Code Activity -->
  <h2>CODE TRANSMISSION LOG</h2>
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${userProfile.login}&bg_color=000000&color=00FF00&line=00FF00&point=FFFFFF&area=true&hide_border=true" />

  <br />
  <br />

  <!-- Top Repositories in Matrix Style -->
  <h2>CRITICAL PROJECTS</h2>
  <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: stretch;justify-content: space-around">
    ${
      repos
        .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6)
        .map((repo: any) => `
<a href="${repo.html_url}">
          <img src="https://github-readme-stats.vercel.app/api/pin/?username=${userProfile.login}&repo=${repo.name}&theme=chartreuse-dark&bg_color=000000&hide_border=true&title_color=00FF00&icon_color=00FF00" />
        </a>
      `).join("\n")
    }
  </div>

  <br />

  <!-- Technology Matrix -->
  <h2>TECHNOLOGY MATRIX</h2>
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${userProfile.login}&layout=compact&theme=chartreuse-dark&bg_color=000000&hide_border=true&title_color=00FF00" />

  <br />
  <br />

  <!-- Contact Information in Matrix Style -->
  <h2>COMMUNICATION CHANNELS</h2>
  <br />
  <div>
    ${
      userProfile.twitter_username
        ? `<a href="https://twitter.com/${userProfile.twitter_username}">
        <img src="https://img.shields.io/badge/TWITTER-CONNECT-00FF00?style=for-the-badge&logo=twitter&logoColor=00FF00&labelColor=000000&color=009900" />
      </a>`
        : ""
    }
    ${
      userProfile.email
        ? `<a href="mailto:${userProfile.email}">
        <img src="https://img.shields.io/badge/EMAIL-TRANSMIT-00FF00?style=for-the-badge&logo=gmail&logoColor=00FF00&labelColor=000000&color=009900" />
      </a>`
        : ""
    }
<a href="${userProfile.html_url}">
      <img src="https://img.shields.io/badge/GITHUB-ACCESS-00FF00?style=for-the-badge&logo=github&logoColor=00FF00&labelColor=000000&color=009900" />
    </a>
  </div>

  <br />

  <!-- Matrix Rain Effect (ASCII Art) -->
  <pre><code>
  ╔════════════════════════════════════════════════════════════╗
  ║ 01001000 01000101 01001100 01001100 01001111 00100000 ... ║
  ║ 10101010 11110000 10101010 11110000 10101010 11110000 ... ║
  ║ 01010101 00001111 01010101 00001111 01010101 00001111 ... ║
  ╚════════════════════════════════════════════════════════════╝
  </code></pre>

  <br />
  <!-- Profile Views Counter -->
  <img src="https://komarev.com/ghpvc/?username=${userProfile.login}&color=00FF00&style=for-the-badge&label=PROFILE+ACCESSES&color=009900" />
</div>`;

    return template;
  } catch (error) {
    throw new Error(`Error creating matrix profile template: ${String(error)}`);
  }
}

export { createMatrixProfileTemplate };
