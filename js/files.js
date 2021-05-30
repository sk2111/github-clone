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
//file table
const getFileNodes = (tree) => {
    return tree.map(({ path }) => {
        const tableRow = createDOMNode('tr', null, []);
        const tableData = createDOMNode('td', path, []);
        const dataIcon = createDOMNode('td', '', [{ name: 'class', value: 'td-cen' }]);
        const fileIcon = createDOMNode('i', null, [{ name: 'class', value: 'fas fa-file-alt icon' }]);
        const folderIcon = createDOMNode('i', null, [{ name: 'class', value: 'fas fa-folder icon' }]);
        dataIcon.append(path.includes('.') ? fileIcon : folderIcon);
        tableRow.append(dataIcon, tableData);
        return tableRow;
    });
};

(async function () {
    try {
        if (!repoDetails) return window.location = '/index.html';
        repoTitle.innerText = `${repoDetails} repository files`;
        const [{ sha }] = await fetchJson(GITHUB_COMMIT_SHA);
        const fileList = await fetchJson(GITHUB_FILES + sha);
        fileDetailsNode.append(...getFileNodes(fileList.tree));
    }
    catch (e) {
        console.log(e);
    }
})();