import { updateNavigationBar } from './utilities/helpers.js';

//DOM nodes
const searchViewNode = document.getElementById('search-view');
const infoViewNode = document.getElementById('info-view');
const navItemsNode = document.querySelectorAll('.nav-item');
const repoCountNode = document.getElementById('repo-count');
const userCountNode = document.getElementById('user-count');

//App constants
const NAV_SELECTED_CLASS = 'nav-selected';
const NAV_REPOSITORIES = 'repositories';
const NAV_USERS = 'users';
let currentNavView = NAV_REPOSITORIES;

//variables
let debounceId = null;
let searchTerm = '';



const handleContentView = (currentNavView, searchTerm) => {
    if (currentNavView === NAV_REPOSITORIES) {

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
            searchViewNode.style.visibility = 'visible';
            infoViewNode.style.display = 'none';
            return handleContentView(currentNavView, searchTerm);
        }
        infoViewNode.style.display = '';
        searchViewNode.style.visibility = 'hidden';
    }, 750);
};