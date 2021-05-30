import {
    fetchJson, getRepoList
} from './utilities/helpers.js';

import {
    updateNavigationBar, updateUserView,
    updateNavCount, updateTitleCount, getUserList
} from './utilities/index-helpers.js';
//DOM nodes
const searchViewNode = document.getElementById('search-view');
const infoViewNode = document.getElementById('info-view');
const totalCountNode = document.getElementById('total-search-count');
const searchResultsNode = document.getElementById('search-results');
const navItemsNode = document.querySelectorAll('.nav-item');
const repoNavCountNode = document.getElementById('repo-count');
const userNavCountNode = document.getElementById('user-count');

//constants
const NAV_SELECTED_CLASS = 'nav-selected';
const NAV_REPOSITORIES = 'repositories';
const PAGI_NEXT = 'next';
const PAGI_PREVIOUS = 'previous';
const NAV_USERS = 'users';
let currentNavView = NAV_REPOSITORIES;

//variables
let debounceId = null;
let searchTerm = '';
let usersPagination = 1;
let repoPagination = 1;

//API end points
const GITHUB_USERS = 'https://api.github.com/search/users?per_page=10';
const GITHUB_REPOS = 'https://api.github.com/search/repositories?per_page=10';


const handleContentView = async (currentNavView, searchTerm) => {
    try {
        searchResultsNode.innerHTML = '';
        const usersUrl = `${GITHUB_USERS}&q=${searchTerm}&page=${usersPagination}`;
        const repoUrl = `${GITHUB_REPOS}&q=${searchTerm}&page=${repoPagination}`;
        const { total_count: totalUsersCount, items: usersList } = await fetchJson(usersUrl);
        const { total_count: totalReposCount, items: reposList } = await fetchJson(repoUrl);
        updateNavCount(totalUsersCount, userNavCountNode);
        updateNavCount(totalReposCount, repoNavCountNode);

        if (currentNavView === NAV_USERS) {
            updateTitleCount(totalUsersCount, 'users', totalCountNode);
            const userNodeList = getUserList(usersList);
            searchResultsNode.append(...userNodeList);
        }

        if (currentNavView === NAV_REPOSITORIES) {
            updateTitleCount(totalReposCount, 'repositories', totalCountNode);
            const repoNodeList = getRepoList(reposList);
            searchResultsNode.append(...repoNodeList);
        }
    }
    catch (e) {
        console.log(e);
    }
};


window.handleViewChange = (e) => {
    const navView = e.getAttribute('data-nav');
    if (navView === currentNavView) return;
    currentNavView = navView;
    usersPagination = 1;
    repoPagination = 1;
    updateNavigationBar(e, navItemsNode, NAV_SELECTED_CLASS);
    handleContentView(currentNavView, searchTerm);
};

window.handleSearch = (e) => {
    searchTerm = e.value;
    if (debounceId) {
        clearTimeout(debounceId);
    }
    debounceId = setTimeout(() => {
        if (searchTerm.length) {
            handleContentView(currentNavView, searchTerm);
        }
        updateUserView(searchTerm, searchViewNode, infoViewNode);
    }, 750);
};

window.handlePagination = (e) => {
    const pagination = e.getAttribute('data-pagi');
    if (pagination === PAGI_NEXT) {
        currentNavView === NAV_USERS ? ++usersPagination : ++repoPagination;
    }
    if (pagination === PAGI_PREVIOUS) {
        currentNavView === NAV_USERS ? --usersPagination : --repoPagination;

    }

    if (usersPagination < 1) return usersPagination = 1;
    if (repoPagination < 1) return repoPagination = 1;

    handleContentView(currentNavView, searchTerm);
};