"use strict";
// les logs du site
var users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'membre', password: 'membre123', role: 'member' },
];
var currentUser = null;
// Fonction pour gérer la connexion
function login(username, password) {
    var user = users.find(function (u) { return u.username === username && u.password === password; });
    if (user) {
        currentUser = user;
        alert("Bienvenue, ".concat(user.username, "!"));
        updateNavForUser(user); // Mise à jour de la nav selon l'utilisateur
        updatePageForUser(user); // Mise à jour de la page selon l'utilisateur
    }
    else {
        alert('Nom d’utilisateur ou mot de passe incorrect.');
    }
}
// Fonction pour gérer la déconnexion
function logout() {
    currentUser = null;
    alert('Vous êtes déconnecté.');
    updateNavForUser(null); // Mise à jour de la nav pour la déconnexion
    updatePageForUser(null); // Mise à jour de la page pour la déconnexion
}
// Fonction pour mettre à jour le contenu de la page en fonction de l'utilisateur
function updatePageForUser(user) {
    var appDiv = document.getElementById('app');
    var logoutMessage = document.getElementById('logoutMessage');
    if (appDiv && logoutMessage) {
        if (user) {
            appDiv.style.display = 'block';
            logoutMessage.style.display = 'none'; // Cacher le message de déconnexion
        }
        else {
            appDiv.style.display = 'none';
            logoutMessage.style.display = 'block'; // Afficher le message de déconnexion
        }
    }
}
// Fonction pour mettre à jour la barre de navigation en fonction de l'utilisateur
function updateNavForUser(user) {
    var navContainer = document.querySelector('.nav-container');
    var loginBtn = document.getElementById('loginBtn');
    if (navContainer && loginBtn) {
        // l'utilisateur est connecté,le bouton devient déconnexion
        if (user) {
            loginBtn.textContent = 'Déconnexion';
            // Ajoute le bouton pour l'admin uniquement qui mêne a la pge admin.html
            if (user.role === 'admin') {
                var adminButton = document.querySelector('.admin-btn');
                if (!adminButton) {
                    adminButton = document.createElement('button');
                    adminButton.textContent = 'Page Admin';
                    adminButton.classList.add('admin-btn');
                    adminButton.onclick = function () { return (window.location.href = 'admin.html'); };
                    navContainer.appendChild(adminButton);
                }
            }
        }
        else {
            // l'utilisateur est déconnecté, sa réinitialise l'interface
            loginBtn.textContent = 'Connexion';
            // Supprime le bouton de la page admin
            var adminButton = document.querySelector('.admin-btn');
            if (adminButton) {
                adminButton.remove();
            }
        }
    }
}
// Écouteurs d'événements pour la connexion et déconnexion
document.addEventListener('DOMContentLoaded', function () {
    var _a;
    var loginBtn = document.getElementById('loginBtn');
    var loginForm = document.getElementById('loginForm');
    // Mettre à jour la page en fonction de l'état de connexion de l'utilisateur
    updatePageForUser(currentUser);
    if (loginBtn && loginForm) {
        // Afficher ou masquer le formulaire de connexion
        loginBtn.addEventListener('click', function () {
            if (currentUser) {
                logout();
            }
            else {
                loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
            }
        });
        // Soumettre le formulaire de connexion
        (_a = loginForm.querySelector('form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
            event.preventDefault();
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            login(username, password);
            loginForm.style.display = 'none';
        });
    }
    if (window.location.pathname.endsWith('admin.html') && (!currentUser || currentUser.role !== 'admin')) {
        alert('Accès refusé : Vous n\'êtes pas administrateur.');
        window.location.href = 'index.html';
    }
    updateNavForUser(currentUser);
});
