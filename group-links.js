document.addEventListener('DOMContentLoaded', () => {
    const groupTitle = document.getElementById('group-title');
    const linksList = document.getElementById('links-list');

    const urlParams = new URLSearchParams(window.location.search);
    const groupId = urlParams.get('group');

    const placeholderLinks = {
        'learning-resources': [
            { title: 'Introduction to JavaScript', url: 'https://example.com/js-intro' },
            { title: 'Python for Data Science', url: 'https://example.com/python-ds' },
            { title: 'Web Development Bootcamp', url: 'https://example.com/web-dev' },
        ],
        'dev-tools': [
            { title: 'VS Code Extensions for Productivity', url: 'https://example.com/vscode-extensions' },
            { title: 'Git and GitHub Tutorial', url: 'https://example.com/git-tutorial' },
            { title: 'Docker for Beginners', url: 'https://example.com/docker-intro' },
        ],
        // Add more placeholder links for other groups...
    };

    function displayLinks(groupId) {
        const links = placeholderLinks[groupId] || [];
        groupTitle.textContent = groupId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        linksList.innerHTML = links.map(link => `
            <li><a href="${link.url}" target="_blank">${link.title}</a></li>
        `).join('');
    }

    if (groupId) {
        displayLinks(groupId);
    } else {
        groupTitle.textContent = 'Group not found';
    }
});
