/* Quản lý xác thực bằng localStorage */
const LS_USERS = 'bookstore_users';
const LS_CURRENT = 'bookstore_current_user';

const Auth = {
  getUsers() {
    return JSON.parse(localStorage.getItem(LS_USERS) || '[]');
  },
  saveUsers(users) {
    localStorage.setItem(LS_USERS, JSON.stringify(users));
  },
  current() {
    return JSON.parse(localStorage.getItem(LS_CURRENT) || 'null');
  },
  setCurrent(user) {
    if (user) localStorage.setItem(LS_CURRENT, JSON.stringify(user));
    else localStorage.removeItem(LS_CURRENT);
  },
  isAuthed() {
    return !!this.current();
  },
  requireAuth() {
    if (!this.isAuthed()) {
      location.href = './login.html';
    }
  },
  logout() {
    this.setCurrent(null);
    location.href = '../index.html';
  },

  mountLogin(formId) {
    const form = document.getElementById(formId);
    form.addEventListener('submit', e => {
      e.preventDefault();
      const username = form.username.value.trim();
      const password = form.password.value;

      const users = this.getUsers();
      const u = users.find(x => x.username === username && x.password === password);
      if (!u) {
        App.toast('Sai tên đăng nhập hoặc mật khẩu', 'error');
        return;
      }
      this.setCurrent({ username });
      App.toast('Đăng nhập thành công', 'success');
      setTimeout(() => location.href = './products.html', 500);
    });
  },

  mountRegister(formId) {
    const form = document.getElementById(formId);
    form.addEventListener('submit', e => {
      e.preventDefault();
      const username = form.username.value.trim();
      const password = form.password.value;
      const confirm = form.confirm.value;

      if (password !== confirm) {
        App.toast('Mật khẩu nhập lại không khớp', 'error');
        return;
      }

      const users = this.getUsers();
      if (users.some(x => x.username === username)) {
        App.toast('Tên đăng nhập đã tồn tại', 'error');
        return;
      }
      users.push({ username, password });
      this.saveUsers(users);
      App.toast('Đăng ký thành công, vui lòng đăng nhập', 'success');
      setTimeout(() => location.href = './login.html', 600);
    });
  }
};

window.Auth = Auth;
