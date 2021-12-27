//overview class
const overview = document.querySelector(".overview");
//my GitHub username
const username = "AdrianneKU";
//ul list location to display repos
const displayRepos = document.querySelector(".repo-list");
//shows all repo information
const showRepoInfo = document.querySelector(".repos");
//shows individual repo data
const showRepoData = document.querySelector(".repo-data");

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
   const showRepoData = await repoInfo.json();
   displayRepoInfo(showRepoData);
};

//displaying repo info
const displayRepoInfo = function (repos) {
   for (const repo of repos) {
      const repoItem = document.createElement("li");
      repoItem.classList.add("repo");
      repoItem.innerHTML = `<h3>${repo.name}</h3>`;
      displayRepos.append(repoItem);
   }
};

//conditional statement to target innerText of h3
displayRepos.addEventListener("click", function (e) {
   if (e.target.matches("h3")) {
   const repoName = e.target.innerText;
   gitHubRepoInfo(repoName);
}
});

//async function to accept repoName   
const gitHubRepoInfo = async function (repoName) {
   const repoInformation = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
   const repoInfoData = await repoInformation.json();
   const fetchLanguages = await fetch(repoInfoData.languages_url);
   
   //fetch repo languages
   const languageData = await fetchLanguages.json();
   const languages = [];
   for (const language in languageData) {
      languages.push(language);
   }
   showAllRepoInfo(repoInfoData, languages);
};
//display repo data
const showAllRepoInfo = function (repoInfoData, languages) {
   showRepoData.innerHTML = "";
   showRepoData.classList.remove("hide");
   showRepoInfo.classList.add("hide");
   const div = document.createElement("div");
   div.innerHTML = `
   <h3>Name: ${repoInfoData.name}</h3>
   <p>Description: ${repoInfoData.description}</p>
   <p>Default Branch: ${repoInfoData.default_branch}</p>
   <p>Languages: ${languages.join(", ")}</p>
   <a class="visit" href="${repoInfoData.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
   `;
   showRepoData.append(div);
};