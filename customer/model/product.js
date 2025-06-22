// product.js

// Import các chức năng cần thiết
import { getProducts } from '../services/product-services.js'; // Hàm lấy dữ liệu sản phẩm từ MockAPI
import { addToCart, updateCartCount } from '../model/cart.js'; // Hàm xử lý giỏ hàng

// Lấy các phần tử HTML cần thao tác
const productList = document.getElementById('productList'); // Khu vực hiển thị sản phẩm
const filter = document.getElementById('filter'); // Dropdown filter loại sản phẩm
const searchInput = document.getElementById('searchInput'); // Ô tìm kiếm theo tên sản phẩm

let allProducts = []; // Biến lưu trữ toàn bộ danh sách sản phẩm lấy từ API

// Khi lấy được dữ liệu từ API
getProducts().then(products => {
  allProducts = products; // Gán dữ liệu vào biến toàn cục
  renderProducts(allProducts); // Hiển thị toàn bộ sản phẩm lần đầu tiên
  updateCartCount(); // Cập nhật số lượng giỏ hàng trên icon
});

// Xử lý sự kiện khi người dùng thay đổi loại sản phẩm cần lọc
filter.addEventListener('change', () => {
  const type = filter.value; // Lấy loại sản phẩm được chọn (samsung, iphone, all)
  const filtered = type === 'all' ? allProducts : allProducts.filter(p => p.type === type);
  renderProducts(filtered); // Hiển thị danh sách sản phẩm đã lọc
});

// Xử lý sự kiện tìm kiếm theo tên sản phẩm
searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase(); // Lấy từ khóa người dùng nhập vào, chuyển về chữ thường
  const searched = allProducts.filter(p => p.name.toLowerCase().includes(keyword)); // Lọc sản phẩm theo từ khóa
  renderProducts(searched); // Hiển thị kết quả tìm kiếm
});

// Hàm hiển thị sản phẩm ra giao diện
function renderProducts(products) {
  // Duyệt qua danh sách sản phẩm và tạo HTML tương ứng
  productList.innerHTML = products.map(p => `
    <div class="bg-white p-4 rounded shadow hover:shadow-lg transition">
      <a href="product-detail.html?id=${p.id}">
        <img src="${p.img}" class="h-40 w-full object-contain mb-2" />
        <h3 class="font-semibold text-lg mb-1">${p.name}</h3>
      </a>
      <p class="text-red-600 font-semibold mb-2">${formatPrice(p.price)}</p>
      <button onclick='addToCart(${JSON.stringify(p)})'
        class="bg-yellow-400 w-full py-2 font-bold hover:bg-yellow-500">
        Mua ngay
      </button>
    </div>
  `).join('');
}

// Hàm định dạng giá tiền sang kiểu VND
function formatPrice(price) {
  return price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });
}

// Gán hàm addToCart ra window để có thể gọi từ HTML inline
window.addToCart = addToCart;
