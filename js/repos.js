import {
    getQueryParams, getRepoList
} from './utilities/helpers.js';

//DOM nodes
const userDetailsNode = document.getElementById("user-details");
const repoDetailsNode = document.getElementById("repo-details");

//location 
const searchQuery = window.location.search;
const userName = getQueryParams(searchQuery, "username=");

if (userName) {

    //show user details
    

    //show repo details


}
else {
    window.location = '/index.html';
}