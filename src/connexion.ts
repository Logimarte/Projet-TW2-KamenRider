interface User {
    username: string;
    password: string;
    role: 'admin' | 'member';
  }
  
  const users: User[] = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'member', password: 'member123', role: 'member' },
  ];
  
  let currentUser: User | null = null; // Utilisateur connecté
  
  // Fonction pour gérer la connexion
  function login(username: string, password: string): void {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
  
    if (user) {
      currentUser = user;
      alert(`Bienvenue, ${user.username}!`);
      updateNavForUser(user);
    } else {
      alert('Nom d’utilisateur ou mot de passe incorrect.');
    }
  }
  
  // Fonction pour gérer la déconnexion
  function logout(): void {
    currentUser = null;
    alert('Vous êtes déconnecté.');
    updateNavForUser(null);
  }
  
  // Fonction pour mettre à jour la barre de navigation en fonction de l'utilisateur
  function updateNavForUser(user: User | null): void {
    const navContainer = document.querySelector('.nav-container');
    const loginBtn = document.getElementById('loginBtn');
  
    if (navContainer && loginBtn) {
      // Si un utilisateur est connecté, change le texte du bouton
      if (user) {
        loginBtn.textContent = 'Déconnexion';
        
        // Ajoute le bouton Admin pour l'admin uniquement
        if (user.role === 'admin') {
          let adminButton = document.querySelector('.admin-btn') as HTMLButtonElement;
          if (!adminButton) {
            adminButton = document.createElement('button');
            adminButton.textContent = 'Page Admin';
            adminButton.classList.add('admin-btn');
            adminButton.onclick = () => (window.location.href = 'admin.html');
            navContainer.appendChild(adminButton);
          }
        }
      } else {
        // Si l'utilisateur est déconnecté, réinitialise l'interface
        loginBtn.textContent = 'Connexion';
        // Supprime le bouton Admin s'il existe
        const adminButton = document.querySelector('.admin-btn');
        if (adminButton) {
          adminButton.remove();
        }
      }
    }
  }
  
  // Écouteurs d'événements pour la connexion et déconnexion
  document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const loginForm = document.getElementById('loginForm');
  
    if (loginBtn && loginForm) {
      // Afficher ou masquer le formulaire de connexion
      loginBtn.addEventListener('click', () => {
        if (currentUser) {
          logout();
        } else {
          loginForm.style.display =
            loginForm.style.display === 'none' ? 'block' : 'none';
        }
      });
  
      // Soumettre le formulaire de connexion
      loginForm.querySelector('form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = (document.getElementById('username') as HTMLInputElement)
          .value;
        const password = (document.getElementById('password') as HTMLInputElement)
          .value;
  
        login(username, password);
        loginForm.style.display = 'none';
      });
    }
  
    // Vérifier si on est sur la page admin et si l'utilisateur est un admin
    if (
      window.location.pathname.endsWith('admin.html') &&
      (!currentUser || currentUser.role !== 'admin')
    ) {
      alert('Accès refusé : Vous n\'êtes pas administrateur.');
      window.location.href = 'index.html';
    }
  
    // Mettre à jour la barre de navigation à la charge de la page
    updateNavForUser(currentUser);
  });
  