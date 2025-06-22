// cart.js - Quản lý giỏ hàng
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Cập nhật số lượng trên icon giỏ hàng
export function updateCartCount() {
  const badge = document.getElementById('cartCount');
  if (badge) {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.innerText = count;
  }
}

// Thêm sản phẩm
export function addToCart(product) {
  const found = cart.find(item => item.id === product.id);
  if (found) {
    found.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCartToLocalStorage();
  updateCartCount();
}

// Tăng/giảm số lượng
export function updateQuantity(id, amount) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.quantity = Math.max(1, item.quantity + amount);
    saveCartToLocalStorage();
    renderCart();
  }
}




// Xóa sản phẩm
export function removeFromCart(id) {
  cart = cart.filter(p => p.id !== id);
  saveCartToLocalStorage();
  renderCart();
}

// Thanh toán: xóa sạch giỏ
export function checkoutCart() {
  cart = [];
  saveCartToLocalStorage();
  renderCart();
}

// Render giỏ hàng
export function renderCart() {
  const body = document.getElementById('cartBody');
  const total = document.getElementById('cartTotal');
  if (!body || !total) return;

  body.innerHTML = cart.map(p => `
    <tr>
      <td class="p-2">${p.name}</td>
      <td>${format(p.price)}</td>
      <td>
        <button onclick="updateQuantity('${p.id}', -1)" class="px-2">-</button>
        ${p.quantity}
        <button onclick="updateQuantity('${p.id}', 1)" class="px-2">+</button>
      </td>
      <td>${format(p.price * p.quantity)}</td>
      <td><button onclick="removeFromCart('${p.id}')" class="text-red-600">X</button></td>
    </tr>`).join('');

  total.innerText = format(cart.reduce((sum, item) => sum + item.price * item.quantity, 0));
}

// Lưu giỏ hàng
export function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Định dạng giá
function format(price) {
  return Number(price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

// Gán vào global để gọi trong HTML
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
