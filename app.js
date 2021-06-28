"use strict";
const searchBar = document.getElementById('searchBar');
const github = new Github();
// if (searchBar) {
searchBar.addEventListener('keyup', (e) => {
    if (e.target) {
        const target = e.target;
        // Get value of input field
        const userText = target.value;
        if (userText != '') {
            // Make http call
            github.getUser(userText).then((profile) => {
                console.log(profile);
                // If a user was found
                if (profile.message !== 'Not Found') {
                    // Display user data on page
                    github.displayUser(profile);
                    github.getRepos(userText).then((repos) => {
                        console.log(repos);
                        github.displayRepos(repos);
                    });
                    // Erase Not Found alert if present
                    clearNotFound();
                }
                else {
                    // User not found
                    displayNotFound();
                }
            });
        }
        else {
            // Reset to default
            clearNotFound();
        }
    }
});
// }
function displayNotFound() {
    // Check if alert already displayed
    if (document.getElementById('not-found-alert')) {
        return;
    }
    else {
        const searchForm = document.getElementById('search-form');
        const searchBar = document.getElementById('search-bar');
        // Create an alert button :
        // <a class="waves-effect waves-light btn red">User not found</a>
        const alert = document.createElement('a');
        const linkText = document.createTextNode('User not found');
        alert.appendChild(linkText);
        alert.classList.add('waves-effect', 'waves-light', 'btn', 'red');
        alert.setAttribute('id', 'not-found-alert');
        // Add alert to the DOM
        searchForm === null || searchForm === void 0 ? void 0 : searchForm.insertBefore(alert, searchBar);
    }
}
function clearNotFound() {
    const alert = document.getElementById('not-found-alert');
    if (alert) {
        alert.remove();
    }
}
