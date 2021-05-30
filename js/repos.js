import {
    fetchJson, getQueryParams, getRepoList, createDOMNode
} from './utilities/helpers.js';

//DOM nodes
const userDetailsNode = document.getElementById("user-details");
const repoDetailsNode = document.getElementById("repo-details");

//location 
const searchQuery = window.location.search;
//const userName = getQueryParams(searchQuery, "username=");
const userName = 'sk2111';
//API
const GITHUB_REPOS = `https://api.github.com/users/${userName}/repos`;

(async function () {
    try {
        if (!userName) return window.location = '/index.html';;
        const repoList = await fetchJson(GITHUB_REPOS);

        console.log(repoList);
        //show user details

        //show repo details
        const repoTotalCount = `${repoList.length} repositories found`
        const repoCountNode = createDOMNode('h4', repoTotalCount, [{ name: 'class', value: 'repo-count' }]);
        const repoListNodes = getRepoList(repoList);
        repoDetailsNode.append(repoCountNode, ...repoListNodes);
    }
    catch (e) {
        console.log(e);
    }
})();