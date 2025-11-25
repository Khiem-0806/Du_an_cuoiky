/* Tiện ích & render UI dùng chung */
const App = {
  // Header + trạng thái đăng nhập
  mountHeader(active) {
    const authBox = document.getElementById('authActions');
    const user = Auth.current();
    if (!authBox) return;

    if (user) {
      authBox.innerHTML = `
        <span class="hello">👋 Xin chào, <strong>${user.username}</strong></span>
        <button class="btn" id="logoutBtn">Đăng xuất</button>
      `;
      document.getElementById('logoutBtn').onclick = () => Auth.logout();
    } else {
      authBox.innerHTML = `
        <a class="btn" href="./pages/login.html">Đăng nhập</a>
        <a class="btn btn-primary" href="./pages/register.html">Đăng ký</a>
      `;
    }

    // Ẩn link yêu cầu đăng nhập nếu chưa login
    document.querySelectorAll('[data-auth="true"]').forEach(a => {
      if (!user) a.classList.add('disabled');
    });
  },

  // Định dạng giá
  formatPrice(n) {
    return n.toLocaleString('vi-VN') + 'đ';
  },

  // Toast mini
  toast(msg, type = 'info') {
    const tip = document.createElement('div');
    tip.className = `toast ${type}`;
    tip.textContent = msg;
    document.body.appendChild(tip);
    setTimeout(() => tip.classList.add('show'), 10);
    setTimeout(() => { tip.classList.remove('show'); tip.remove(); }, 2200);
  },

  // Thẻ card sách
  bookCard(b) {
    return `
      <div class="card">
        <div class="card-media">
          <img src="${b.image}" alt="${b.title}"/>
        </div>
        <div class="card-body">
          <h3 class="card-title">${b.title}</h3>
          <p class="muted">Tác giả: ${b.author}</p>
          <p class="muted">Thể loại: ${b.category}</p>
          <div class="card-bottom">
            <span class="price">${this.formatPrice(b.price)}</span>
            <button class="btn btn-primary add-btn" data-id="${b.id}">➕ Thêm vào giỏ</button>
          </div>
        </div>
      </div>`;
  },

  // Render featured
  async renderFeatured(gridId, limit = 6) {
    const el = document.getElementById(gridId);
    const books = (await Api.getBooks()).slice(0, limit);
    el.innerHTML = books.map(b => this.bookCard(b)).join('');
    el.addEventListener('click', e => {
      const id = Number(e.target.dataset.id);
      if (id) {
        if (!Auth.isAuthed()) {
          this.toast('Hãy đăng nhập trước khi mua', 'error');
          return location.href = './pages/login.html';
        }
        Cart.add(id, 1);
      }
    });
  },

  // Trang products
  async renderProductsPage({ gridId, searchId, categoryId }) {
    const grid = document.getElementById(gridId);
    const box = document.getElementById(searchId);
    const sel = document.getElementById(categoryId);

    // categories
    const cats = await Api.getCategories();
    cats.forEach(c => {
      const op = document.createElement('option');
      op.value = c; op.textContent = c;
      sel.appendChild(op);
    });

    const books = await Api.getBooks();

    const renderList = () => {
      const q = box.value.trim().toLowerCase();
      const cat = sel.value;
      const list = books.filter(b => {
        const okCat = (cat === '__all__' || b.category === cat);
        const okQ = (!q || b.title.toLowerCase().includes(q));
        return okCat && okQ;
      });
      grid.innerHTML = list.map(b => this.bookCard(b)).join('');
    };

    renderList();
    [box, sel].forEach(el => el.addEventListener('input', renderList));

    grid.addEventListener('click', e => {
      const id = Number(e.target.dataset.id);
      if (id) Cart.add(id, 1);
    });
  }
};

window.App = App;
