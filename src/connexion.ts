interface User {
  username: string;
  password: string;
  role: 'admin' | 'member';
}

// les logs du site
const users: User[] = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'membre', password: 'membre123', role: 'member' },
];

let currentUser: User | null = null;

// Fonction pour gérer la connexion
function login(username: string, password: string): void {
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    currentUser = user;
    alert(`Bienvenue, ${user.username}!`);
    updateNavForUser(user); // Mise à jour de la nav selon l'utilisateur
    updatePageForUser(user); // Mise à jour de la page selon l'utilisateur
  } else {
    alert('Nom d’utilisateur ou mot de passe incorrect.');
  }
}

// Fonction pour gérer la déconnexion
function logout(): void {
  currentUser = null;
  alert('Vous êtes déconnecté.');
  updateNavForUser(null); // Mise à jour de la nav pour la déconnexion
  updatePageForUser(null); // Mise à jour de la page pour la déconnexion
}

// Fonction pour mettre à jour le contenu de la page en fonction de l'utilisateur
function updatePageForUser(user: User | null): void {
  const appDiv = document.getElementById('app');
  const logoutMessage = document.getElementById('logoutMessage');

  if (appDiv && logoutMessage) {
    if (user) {
      appDiv.style.display = 'block';
      logoutMessage.style.display = 'none';  // Cacher le message de déconnexion
    } else {
      appDiv.style.display = 'none';
      logoutMessage.style.display = 'block';  // Afficher le message de déconnexion
    }
  }
}

// Fonction pour mettre à jour la barre de navigation en fonction de l'utilisateur
function updateNavForUser(user: User | null): void {
  const navContainer = document.querySelector('.nav-container');
  const loginBtn = document.getElementById('loginBtn');

  if (navContainer && loginBtn) {
    // l'utilisateur est connecté,le bouton devient déconnexion
    if (user) {
      loginBtn.textContent = 'Déconnexion';

      // Ajoute le bouton pour l'admin uniquement qui mêne a la pge admin.html
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
      // l'utilisateur est déconnecté, sa réinitialise l'interface
      loginBtn.textContent = 'Connexion';
      // Supprime le bouton de la page admin
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

  // Mettre à jour la page en fonction de l'état de connexion de l'utilisateur
  updatePageForUser(currentUser);

  if (loginBtn && loginForm) {
    // Afficher ou masquer le formulaire de connexion
    loginBtn.addEventListener('click', () => {
      if (currentUser) {
        logout();
      } else {
        loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
      }
    });
    

    // Soumettre le formulaire de connexion
    loginForm.querySelector('form')?.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = (document.getElementById('username') as HTMLInputElement).value;
      const password = (document.getElementById('password') as HTMLInputElement).value;

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
