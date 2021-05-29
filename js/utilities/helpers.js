export const createDOMNode = (tagName, content, attribute = []) => {
    const elem = document.createElement(tagName);
    if (content) {
        elem.innerText = content;
    }
    if (Array.isArray(attribute)) {
        attribute.forEach(({ name, value }) => {
            elem.setAttribute(name, value);
        });
    }
    return elem;
};

export const updateNavigationBar = (eve, navItemsNode, selectedClass) => {
    navItemsNode.forEach(node => node.classList.remove(selectedClass));
    eve.classList.add(selectedClass);
};

export const updateUserView = (searchTerm, searchViewNode, infoViewNode) => {
    const isValid = searchTerm.length;
    searchViewNode.style.visibility = isValid ? 'visible' : 'hidden';
    infoViewNode.style.display = isValid ? 'none' : '';
};

export const fetchJson = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    catch (e) {
        console.log(e);
        return [];
    }
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

export const getUserList = (userList) => {
    const nodeList = userList.map(({ avatar_url, login, url }) => {
        const listNode = createDOMNode('li', null, [{ name: 'class', value: 'user-item' }]);
        const imgNode = createDOMNode('img', null, [{ name: 'src', value: avatar_url }, { name: 'class', value: 'user-avatar' }]);
        const nameNode = createDOMNode('p', login, [{ name: 'class', value: 'user-name' }]);
        listNode.append(imgNode, nameNode);
        return listNode;
    });
    return nodeList;
};