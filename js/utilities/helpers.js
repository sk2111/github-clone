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

export const fetchJson = async (url) => {
    try {
        const response = await fetch(url, {
            headers: {
                'authorization': 'token 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'
            }
        });
        const data = await response.json();
        return data;
    }
    catch (e) {
        console.log(e);
        return [];
    }
};

export const getRepoList = (repoList = []) => {
    return repoList.map(({ full_name, description, stargazers_count, updated_at }) => {
        const [updatedDate] = updated_at.split('T');
        const listNode = createDOMNode('li', null, [{ name: 'class', value: 'repo-item' }]);
        const bookIcon = createDOMNode('i', null, [{ name: 'class', value: 'icon-book fas fa-book' }]);
        const nameNode = createDOMNode('a', full_name, [
            { name: 'class', value: 'repo-name' },
            { name: 'href', value: `/files.html?repo=${full_name}` },
            { name: 'target', value: '_blank' },
        ]);
        const detailNode = createDOMNode('p', description, [{ name: 'class', value: 'repo-detail' }]);
        const containerNode = createDOMNode('div', null, [{ name: 'class', value: 'repo-con' }]);
        const starIcon = createDOMNode('i', null, [{ name: 'class', value: 'icon-star far fa-star' }]);
        const starsNode = createDOMNode('span', `${stargazers_count}`, [{ name: 'class', value: 'repo-stars' }]);
        const updatedAtNode = createDOMNode('span', `updated on ${updatedDate}`, [{ name: 'class', value: 'repo-date' }]);
        containerNode.append(starIcon, starsNode, updatedAtNode);
        listNode.append(bookIcon, nameNode, detailNode, containerNode);
        return listNode;
    });

};

export const getQueryParams = (searchQuery, keyword) => {
    const value = searchQuery.split(keyword);
    return value[1] || null;
};
