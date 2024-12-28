"use strict";
var users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'member', password: 'member123', role: 'member' },
];
var currentUser = null; // Utilisateur connecté
// Fonction pour gérer la connexion
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
// Fonction pour gérer la déconnexion
function logout() {
    currentUser = null;
    alert('Vous êtes déconnecté.');
    updateNavForUser(null);
}
// Fonction pour mettre à jour la barre de navigation en fonction de l'utilisateur
function updateNavForUser(user) {
    var navContainer = document.querySelector('.nav-container');
    var loginBtn = document.getElementById('loginBtn');
    if (navContainer && loginBtn) {
        // Si un utilisateur est connecté, change le texte du bouton
        if (user) {
            loginBtn.textContent = 'Déconnexion';
            // Ajoute le bouton Admin pour l'admin uniquement
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
            // Si l'utilisateur est déconnecté, réinitialise l'interface
            loginBtn.textContent = 'Connexion';
            // Supprime le bouton Admin s'il existe
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
    if (loginBtn && loginForm) {
        // Afficher ou masquer le formulaire de connexion
        loginBtn.addEventListener('click', function () {
            if (currentUser) {
                logout();
            }
            else {
                loginForm.style.display =
                    loginForm.style.display === 'none' ? 'block' : 'none';
            }
        });
        // Soumettre le formulaire de connexion
        (_a = loginForm.querySelector('form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
            event.preventDefault();
            var username = document.getElementById('username')
                .value;
            var password = document.getElementById('password')
                .value;
            login(username, password);
            loginForm.style.display = 'none';
        });
    }
    // Vérifier si on est sur la page admin et si l'utilisateur est un admin
    if (window.location.pathname.endsWith('admin.html') &&
        (!currentUser || currentUser.role !== 'admin')) {
        alert('Accès refusé : Vous n\'êtes pas administrateur.');
        window.location.href = 'index.html';
    }
    // Mettre à jour la barre de navigation à la charge de la page
    updateNavForUser(currentUser);
});
