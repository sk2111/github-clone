import { fetchJson, getQueryParams, getRepoList, createDOMNode } from './utilities/helpers.js';

//DOM nodes
const userDetailsNode = document.getElementById('user-details');
const repoDetailsNode = document.getElementById('repo-details');
//location 
const searchQuery = window.location.search;
const userName = getQueryParams(searchQuery, 'username=');
//API
const GITHUB_REPOS = `https://api.github.com/users/${userName}/repos`;

(async function () {
    try {
        if (!userName) return window.location = '/index.html';
        const repoList = await fetchJson(GITHUB_REPOS);
        const [{ owner: { avatar_url: avatarUrl, login: loginName } }] = repoList;
        const imageNode = createDOMNode('img', null, [{ name: 'class', value: 'user-avatar' }, { name: 'src', value: avatarUrl }]);
        const nameNode = createDOMNode('h5', loginName, [{ name: 'class', value: 'user-name' }]);
        //show user details
        userDetailsNode.append(imageNode, nameNode);
        //show repo details
        const repoTotalCount = `${repoList.length} user repositories found`
        const repoCountNode = createDOMNode('h4', repoTotalCount, [{ name: 'class', value: 'repo-count' }]);
        repoDetailsNode.append(repoCountNode, ...getRepoList(repoList));
    }
    catch (e) {
        console.log(e);
    }
})();