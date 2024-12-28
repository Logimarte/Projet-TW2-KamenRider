"use strict";
var users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'member', password: 'member123', role: 'member' },
];
var currentUser = null; // Utilisateur connecté
function login(username, password) {
    var user = users.find(function (u) { return u.username === username && u.password === password; });
    if (user) {
        currentUser = user;
        alert("Bienvenue, ".concat(user.username, "!"));
        updateNavForUser(user);
    }
    else {
        alert('Nom d’utilisateur ou mot de passe incorrect.');
    }
}
function updateNavForUser(user) {
    var navContainer = document.querySelector('.nav-container');
    if (navContainer) {
        if (user.role === 'admin') {
            var adminButton = document.createElement('button');
            adminButton.textContent = 'Page Admin';
            adminButton.classList.add('admin-btn');
            adminButton.onclick = function () { return (window.location.href = 'admin.html'); };
            navContainer.appendChild(adminButton);
        }
    }
}
document.addEventListener('DOMContentLoaded', function () {
    var _a;
    // Logique pour afficher/masquer le formulaire de connexion
    var loginBtn = document.getElementById('loginBtn');
    var loginForm = document.getElementById('loginForm');
    if (loginBtn && loginForm) {
        loginBtn.addEventListener('click', function () {
            loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
        });
        (_a = loginForm.querySelector('form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
            event.preventDefault();
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            login(username, password);
            loginForm.style.display = 'none';
        });
    }
    if (window.location.pathname.endsWith('admin.html') && (!currentUser || currentUser.role !== 'admin')) {
        alert("Accès refusé : Vous n'êtes pas administrateur.");
        window.location.href = 'index.html';
    }
});
