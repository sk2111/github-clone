export const updateNavigationBar = (eve, navItemsNode, selectedClass) => {
    navItemsNode.forEach(node => node.classList.remove(selectedClass));
    eve.classList.add(selectedClass);
};