import ProductServices from "./../services/product-services.js";
import Product from "./../model/product.js";

// khởi tạo đối tượng service từ lớp đối tượng Productservices
const services = new ProductServices();
// tạo hàm dom tới id thẻ html
const getEle = (id) => document.getElementById(id);

// Lấy dữ liệu từ API
const getListProduct = () => {
  const promise = services.getListProductApi();

  promise
    .then((result) => {
      renderListProduct(result.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
// Renderlist Product
const renderListProduct = (data) => {
  let contentHTML = "";
  for (let i = 0; i < data.length; i++) {
    const product = data[i];
    contentHTML += `
    <tr
              class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            >
              <td class="px-6 py-4">${i + 1}</td>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                ${product.name}
              </th>
              <td class="px-6 py-4">${product.price}</td>
              <td class="px-6 py-4">${product.screen}</td>
              <td class="px-6 py-4">${product.backCamera}</td>
              <td class="px-6 py-4">${product.frontCamera}</td>
              <td class="px-6 py-4">
                <img
                  width="50px"
                  src="${product.img}"
                  alt=""
                />
              </td>
              <td class="px-6 py-4">${product.desc}</td>
              <td class="px-6 py-4">${product.type}</td>
              <td class="px-6 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >Edit</a
                >
              </td>
            </tr>
    `;
  }
  getEle("tblDanhSachSP").innerHTML = contentHTML;
};

getListProduct();
