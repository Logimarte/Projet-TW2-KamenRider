interface User {
    username: string;
    password: string;
    role: 'admin' | 'member';
  }
  
  const users: User[] = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'member', password: 'member123', role: 'member' },
  ];
  
  let currentUser: User | null = null; // Utilisateur est connecté



  function login(username: string, password: string): void {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
  
    if (user) {
      currentUser = user;
      alert(`Bienvenue, ${user.username}!`);
      updateNavForUser(user);
    } else {
      alert('Nom d’utilisateur ou mot de passe sont incorrect.');
    }
  }


  function updateNavForUser(user: User): void {
    const navContainer = document.querySelector('.nav-container');
  
    if (navContainer) {
      if (user.role === 'admin') {
        const adminButton = document.createElement('button');
        adminButton.textContent = 'Page Admin';
        adminButton.classList.add('admin-btn');
        adminButton.onclick = () => (window.location.href = 'admin.html');
        navContainer.appendChild(adminButton);
      }
    }
  }

  
// partie du fonctionnement de afficher/masquer le formulaire de connexion
  document.addEventListener('DOMContentLoaded', () => {
    
    const loginBtn = document.getElementById('loginBtn');
    const loginForm = document.getElementById('loginForm');
  
    if (loginBtn && loginForm) {
      loginBtn.addEventListener('click', () => {
        loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
      });
  
      loginForm.querySelector('form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
  
        login(username, password);
        loginForm.style.display = 'none';
      });
    }

    if (window.location.pathname.endsWith('admin.html') && (!currentUser || currentUser.role !== 'admin')) {
        alert("Accès refusé : Vous n'êtes pas administrateur.");
        window.location.href = 'index.html';
      }
    });