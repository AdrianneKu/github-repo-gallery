//overview class
const overview = document.querySelector(".overview");
//my GitHub username
const username = "AdrianneKU";

//fetching my GitHub profile   
const gitHubProfile = async function () {
   const res = await fetch(`https://api.github.com/users/${username}`);
   const data = await res.json();
   displayMyGitHub(data);
   //console.log(data);
};

gitHubProfile();

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
   };