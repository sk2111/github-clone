import {
    updateNavigationBar, updateUserView, fetchJson, updateTitleCount, getUserList
} from './utilities/helpers.js';

//DOM nodes
const searchViewNode = document.getElementById('search-view');
const infoViewNode = document.getElementById('info-view');
const totalCountNode = document.getElementById('total-search-count');
const searchResultsNode = document.getElementById('search-results');
const navItemsNode = document.querySelectorAll('.nav-item');
const repoCountNode = document.getElementById('repo-count');
const userCountNode = document.getElementById('user-count');

//constants
const NAV_SELECTED_CLASS = 'nav-selected';
const NAV_REPOSITORIES = 'repositories';
const NAV_USERS = 'users';
let currentNavView = NAV_REPOSITORIES;

//variables
let debounceId = null;
let searchTerm = '';
let usersPagination = 1;

//API end points
const GITHUB_USERS = 'https://api.github.com/search/users?per_page=10';


const handleContentView = async (currentNavView, searchTerm) => {
    if (currentNavView === NAV_REPOSITORIES) {
        const url = `${GITHUB_USERS}&q=${searchTerm}&page=${usersPagination}`;
        const { total_count: totalCount, items: usersList } = await fetchJson(url);
        updateTitleCount(totalCount, 'users', userCountNode, totalCountNode);
        const userNodeList = getUserList(usersList);
        searchResultsNode.innerHTML = '';
        searchResultsNode.append(...userNodeList);
    }
    if (currentNavView === NAV_USERS) {
        //fetch data 


        //update header info

        //create dynamic node for users and inject in screen 


    }
};


window.handleViewChange = (e) => {
    const navView = e.getAttribute('data-nav');
    if (navView === currentNavView) return;
    currentNavView = navView;
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