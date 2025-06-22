// Gọi API MockAPI lấy danh sách sản phẩm
const BASE_URL = 'https://684931ef45f4c0f5ee7063db.mockapi.io/api/Product_CapStone_2';

export async function getProducts() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Lỗi gọi API');
  return await res.json();
}
