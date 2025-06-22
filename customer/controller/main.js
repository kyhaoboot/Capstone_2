// main.js - Điều khiển hiển thị sản phẩm, lọc, tìm kiếm và thêm giỏ hàng
import { getProducts } from '../services/product-services.js';
import { addToCart, saveCartToLocalStorage, updateCartCount } from '../model/cart.js';

// DOM
const listContainer = document.getElementById('productList');
const filterSelect = document.getElementById('filterType');
const searchInput = document.getElementById('searchInput');

// Render danh sách sản phẩm
function renderProducts(products) {
  if (!listContainer) return;

  listContainer.innerHTML = products.map(p => `
    <div class="bg-white p-4 rounded shadow hover:shadow-lg transition">
      <img src="${p.img}" alt="${p.name}" class="w-full h-40 object-contain mb-2" />
      <h3 class="font-bold">${p.name}</h3>
      <p class="text-red-500 font-semibold">${Number(p.price).toLocaleString('vi-VN')}₫</p>
      <div class="flex justify-between items-center mt-2">
        <button class="text-sm bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500" onclick='addToCart(${JSON.stringify(p)})'>Thêm giỏ</button>
        <a href="./product-detail.html?id=${p.id}" class="text-blue-600 text-sm hover:underline">Chi tiết</a>
      </div>
    </div>`).join('');
}

// Kết hợp lọc và tìm kiếm
function filterAndRender(products) {
  const keyword = searchInput?.value?.toLowerCase() || '';
  const type = filterSelect?.value;

  let filtered = products;
  if (type !== 'all') filtered = filtered.filter(p => p.type === type);
  if (keyword) filtered = filtered.filter(p => p.name.toLowerCase().includes(keyword));

  renderProducts(filtered);
}

// Khởi chạy
getProducts().then(products => {
  renderProducts(products);

  filterSelect?.addEventListener('change', () => filterAndRender(products));
  searchInput?.addEventListener('input', () => filterAndRender(products));
});

// Cho phép gọi từ HTML
window.addToCart = (p) => {
  addToCart(p);
  saveCartToLocalStorage();
  alert('Đã thêm vào giỏ hàng!');
};

//Gọi khi trang load
updateCartCount();
