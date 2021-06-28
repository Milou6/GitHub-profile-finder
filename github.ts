class Github {
  ID: string;
  key: string;

  constructor() {
    this.ID = '🛑 YOUR GIT OAUTH ID HERE';
    this.key = '🛑 YOUR GIT OAUTH CLIENT SECRET HERE';
  }

  async getUser(user: string) {
    const userResponse: Response = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.ID}&client_secret=${this.key}`
    );
    const profile = await userResponse.json();

    return profile;
  }

  displayUser(profile: Profile) {
    const userpic = document.getElementById('user-pic') as HTMLImageElement;
    const username = document.getElementById('user-name') as HTMLElement;
    const userbio = document.getElementById('user-bio') as HTMLElement;

    userpic.src = profile.avatar_url;
    username.innerHTML = profile.name;
    userbio.innerHTML = profile.bio;
  }

  async getRepos(user: string) {
    const reposResponse = await fetch(
      `https://api.github.com/users/${user}/repos?client_id=${this.ID}&client_secret=${this.key}`
    );
    const repos = await reposResponse.json();

    return repos;
  }

  displayRepos(repos: Array<Repo>) {
    const reposList = document.getElementById('repos-list') as HTMLElement;

    // Reset repo list between user searches
    reposList.innerHTML = '';

    for (let i = 0; i < repos.length && i < 5; i++) {
      let repo = repos[i];

      reposList.innerHTML += `
      <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="collection-item">
        ${repo.name}
        <span class="new badge light-blue" data-badge-caption="forks">${repo.forks}</span>
        <span class="new badge  green accent-3" data-badge-caption="watchers">${repo.watchers_count}</span>
        <span class="new badge amber" data-badge-caption="stars">${repo.stargazers_count}</span>
      </a>
      `;
    }
  }
}

interface Profile {
  avatar_url: string;
  name: string;
  bio: string;
}

interface Repo {
  name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  watchers_count: number;
  forks: number;
}
