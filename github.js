"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Github {
    constructor() {
        this.ID = '🛑 YOUR GIT OAUTH ID HERE';
        this.key = '🛑 YOUR GIT OAUTH CLIENT SECRET HERE';
    }
    getUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userResponse = yield fetch(`https://api.github.com/users/${user}?client_id=${this.ID}&client_secret=${this.key}`);
            const profile = yield userResponse.json();
            return profile;
        });
    }
    displayUser(profile) {
        const userpic = document.getElementById('user-pic');
        const username = document.getElementById('user-name');
        const userbio = document.getElementById('user-bio');
        userpic.src = profile.avatar_url;
        username.innerHTML = profile.name;
        userbio.innerHTML = profile.bio;
    }
    getRepos(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const reposResponse = yield fetch(`https://api.github.com/users/${user}/repos?client_id=${this.ID}&client_secret=${this.key}`);
            const repos = yield reposResponse.json();
            return repos;
        });
    }
    displayRepos(repos) {
        const reposList = document.getElementById('repos-list');
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
