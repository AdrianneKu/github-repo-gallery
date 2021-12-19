//overview class
const overview = document.querySelector(".overview");
//my GitHub username
const username = "AdrianneKu";
//ul list location to display repos
const displayRepos = document.querySelector(".repo-list");

//fetching my GitHub profile   
const gitHubProfile = async function () {
   const res = await fetch(`https://api.github.com/users/${username}`);
   const data = await res.json();
   displayMyGitHub(data);
};

gitHubProfile();

//display my GitHub profile
const displayMyGitHub = function (data) {
   const div = document.createElement("div");
   div.classList.add("user-info");
   div.innerHTML = `
      <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
    `;
   overview.append(div);
   gitHubRepos();
};
   
//fetching my GitHub repos   
const gitHubRepos = async function () {
   const repoInfo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
   const repoData = await repoInfo.json();
   displayRepoInfo(repoData);
};

//displaying repo info
const displayRepoInfo = function (repos) {
   for (const repo of repos) {
      const repoItem = document.createElement("li");
      repoItem.classList.add("repo");
      repoItem.innerHTML = `<h3>${repo.name}</h3>`;
      displayRepos.append(repoItem);
   };
};