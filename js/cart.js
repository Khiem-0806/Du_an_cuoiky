/* Quản lý giỏ hàng */
const Cart = {
  key() {
    const user = Auth.current();
    return user ? `bookstore_cart_${user.username}` : 'bookstore_cart_guest';
  },
  get() {
    return JSON.parse(localStorage.getItem(this.key()) || '[]');
  },
  save(items) {
    localStorage.setItem(this.key(), JSON.stringify(items));
  },

  add(bookId, qty = 1) {
    const items = this.get();
    const found = items.find(x => x.id === bookId);
    if (found) found.qty += qty;
    else items.push({ id: bookId, qty });
    this.save(items);
    App.toast('Đã thêm vào giỏ hàng', 'success');
  },

  remove(bookId) {
    const items = this.get().filter(x => x.id !== bookId);
    this.save(items);
  },

  updateQty(bookId, qty) {
    const items = this.get();
    const it = items.find(x => x.id === bookId);
    if (!it) return;
    it.qty = Math.max(1, Math.min(99, Number(qty) || 1));
    this.save(items);
  },

  async renderCart(tbodyId, totalId, checkoutBtnId) {
    const tbody = document.getElementById(tbodyId);
    const grandTotal = document.getElementById(totalId);
    const books = await Api.getBooks();

    const items = this.get();
    tbody.innerHTML = '';
    let total = 0;

    items.forEach((it, idx) => {
      const book = books.find(b => b.id === it.id);
      const itemTotal = book.price * it.qty;
      total += itemTotal;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td><img class="thumb" src="${book.image}" alt="${book.title}"/></td>
        <td>${book.title}</td>
        <td>${App.formatPrice(book.price)}</td>
        <td>
          <input class="qty" type="number" min="1" max="99" value="${it.qty}" data-id="${book.id}" />
        </td>
        <td class="bold">${App.formatPrice(itemTotal)}</td>
        <td><button class="icon-btn danger" data-remove="${book.id}" title="Xóa">✖</button></td>
      `;
      tbody.appendChild(tr);
    });

    grandTotal.textContent = App.formatPrice(total);

    // events
    tbody.addEventListener('input', e => {
      const id = Number(e.target.dataset.id);
      if (id) {
        this.updateQty(id, e.target.value);
        this.renderCart(tbodyId, totalId, checkoutBtnId);
      }
    });

    tbody.addEventListener('click', e => {
      const id = Number(e.target.dataset.remove);
      if (id) {
        this.remove(id);
        this.renderCart(tbodyId, totalId, checkoutBtnId);
      }
    });

    // checkout
    document.getElementById(checkoutBtnId).onclick = () => {
      if (!this.get().length) return App.toast('Giỏ hàng đang trống', 'error');
      this.save([]);
      this.renderCart(tbodyId, totalId, checkoutBtnId);
      App.toast('Thanh toán thành công. Cảm ơn bạn!', 'success');
    };
  }
};

window.Cart = Cart;
