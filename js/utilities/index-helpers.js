import { createDOMNode } from './helpers.js';

export const updateNavigationBar = (eve, navItemsNode, selectedClass) => {
    navItemsNode.forEach(node => node.classList.remove(selectedClass));
    eve.classList.add(selectedClass);
};

export const updateUserView = (searchTerm, searchViewNode, infoViewNode) => {
    const isValid = searchTerm.length;
    searchViewNode.style.visibility = isValid ? 'visible' : 'hidden';
    infoViewNode.style.display = isValid ? 'none' : '';
};


export const updateNavCount = (totalCount, navNode) => {
    const total = Number(totalCount);
    if (total) {
        navNode.innerText = total > 1000 ? `${parseInt(total / 1000)} k` : total;
        return;
    }
    navNode.innerText = '-';
};

export const updateTitleCount = (totalCount, type, totalCountNode) => {
    const total = Number(totalCount);
    if (total) {
        totalCountNode.innerText = `${total} ${type} results`;
        return;
    }
    totalCountNode.innerText = 'No Results';
};

export const getUserList = (userList = []) => {
    return userList.map(({ avatar_url, login }) => {
        const listNode = createDOMNode('li', null, [
            { name: 'class', value: 'user-item' }
        ]);
        const imgNode = createDOMNode('img', null, [
            { name: 'src', value: avatar_url },
            { name: 'class', value: 'user-avatar' }
        ]);
        const nameNode = createDOMNode('a', login, [
            { name: 'class', value: 'user-name' },
            { name: 'href', value: `/repos.html?username=${login}` },
            { name: 'target', value: '_blank' }
        ]);
        listNode.append(imgNode, nameNode);
        return listNode;
    });
};
