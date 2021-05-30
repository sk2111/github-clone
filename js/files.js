import {
    fetchJson, getQueryParams, createDOMNode
} from './utilities/helpers.js';

//DOM nodes
const repoTitle = document.getElementById('repo-title');
const fileDetailsNode = document.getElementById('file-details');

//location 
const searchQuery = window.location.search;
const repoDetails = getQueryParams(searchQuery, 'repo=');


//API
const GITHUB_COMMIT_SHA = `https://api.github.com/repos/${repoDetails}/commits`;
const GITHUB_FILES = `https://api.github.com/repos/${repoDetails}/git/trees/`;


const getFileNodes = (tree) => {
    return tree.map(({ path }) => {
        const tableRow = createDOMNode('tr', null, []);
        const tableData = createDOMNode('td', path, []);
        const fileIcon = createDOMNode('i', null, [{ name: 'class', value: 'fal fa-file-alt file' }]);
        tableRow.append(fileIcon, tableData);
        return tableRow;
    });
};

(async function () {
    try {
        if (!repoDetails) return window.location = '/index.html';
        repoTitle.innerText = repoDetails;
        const [{ sha }] = await fetchJson(GITHUB_COMMIT_SHA);
        const fileList = await fetchJson(GITHUB_FILES + sha);
        const fileNodes = getFileNodes(fileList.tree);
        fileDetailsNode.append(...fileNodes);
        console.log(fileList);
    }
    catch (e) {
        console.log(e);
    }
})();