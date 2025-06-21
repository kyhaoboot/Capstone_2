import ProductServices from "./../services/product-services.js";
import Product from "./../model/product.js";
import Validation from "./../services/validation.js";

// khởi tạo đối tượng service từ lớp đối tượng Productservices
const services = new ProductServices();
// khởi tạo đối tượng validate từ lớp đối tượng validation
const validate = new Validation();
// tạo hàm dom tới id thẻ html
export const getEle = (id) => document.getElementById(id);

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
              <td class="px-6 py-4">${
                product.type === "Apple"
                  ? "Apple"
                  : product.type === "Samsung"
                  ? "Samsung"
                  : "Other"
              }</td>
              
              <td class="px-6 py-4">
              
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"  data-modal-target="crud-modal"
                data-modal-toggle="crud-modal" onclick="onEditProduct(${
                  product.id
                })">Sửa</button>
                <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onclick="onDeleteProduct(${product.id})">Xóa</button>
              </td>
            </tr>
    `;
  }
  getEle("tblDanhSachSP").innerHTML = contentHTML;
  // Khởi động lại các modal (Flowbite cần làm việc này)
  if (typeof window.initFlowbite === "function") {
    window.initFlowbite();
  }
};

getListProduct();

// Xóa sản phẩm

const onDeleteProduct = (id) => {
  const promise = services.deleteProductApi(id);
  promise
    .then((result) => {
      alert(`Delete Product ${result.data.name} success!`);
      getListProduct();
    })
    .catch((error) => {
      console.log(error);
    });
};

// Khai báo hàm onDeleteProduct với đối tượng window
window.onDeleteProduct = onDeleteProduct;

// Open modal
getEle("btnThemSP").onclick = function () {
  // update title modal
  document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm sản phẩm";
  // Create button add Product
  const btnAdd = ` <button
                 
                  class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onclick="onAddProduct()"
                >
                  Thêm sản phẩm mới
                </button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
};

// Lấy dữ liệu từ các thẻ input nhập vào
const getValue = () => {
  // tạo cờ
  let isValid = true;
  // Dom tới các thẻ input lấy value
  const name = getEle("nameProduct").value;
  const price = getEle("priceProduct").value;
  const screen = getEle("screenProduct").value;
  const backCamera = getEle("backProduct").value;
  const frontCamera = getEle("frontProduct").value;
  const img = getEle("imgProduct").value;
  const type = getEle("typeProduct").value;
  const desc = getEle("descProduct").value;

  // if (name === "") {
  //   getEle("errorName").classList.remove("hidden");
  //   getEle("errorName").innerHTML = "Vui lòng điền thông tin sản phẩm";
  //   isValid = false;
  // }

  isValid &= validate.checkEmpty(name, "errorName", "Vul lòng nhập thông tin");
  isValid &= validate.checkEmpty(
    price,
    "errorPrice",
    "Vul lòng nhập thông tin"
  );
  isValid &= validate.checkEmpty(
    price,
    "errorScreen",
    "Vul lòng nhập thông tin"
  );
  isValid &= validate.checkEmpty(
    backCamera,
    "errorBack",
    "Vul lòng nhập thông tin"
  );
  isValid &= validate.checkEmpty(
    frontCamera,
    "errorFront",
    "Vul lòng nhập thông tin"
  );
  isValid &= validate.checkEmpty(img, "errorImg", "Vul lòng nhập thông tin");
  isValid &= validate.checkEmpty(
    type,
    "errorType",
    "Vul lòng Chọn loại sản phẩm"
  );
  isValid &= validate.checkEmpty(
    desc,
    "errorDesc",
    "Vul lòng Chọn loại sản phẩm"
  );

  // khoi tạo đối tượng product từ lớp đối tượng product

  const product = new Product(
    "",
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    type,
    desc
  );
  if (!isValid) return;
  return product;
};

// hàm khởi tạo nút thêm sản phẩm mới
const onAddProduct = () => {
  console.log("123");
  const product = getValue();
  if (product) {
    const promise = services.addProductApi(product);
    promise
      .then((result) => {
        console.log(result);
        // Thông báo thêm sản phẩm thành công
        alert(`Add product ${result.data.name} success`);
        // render lại list sản phẩm
        getListProduct();
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(product);
  }
  console.log(product);
};
// khai báo hàm onAddProduct với đối tượng window
window.onAddProduct = onAddProduct;

// Khởi tạo hàm cho nút edit

const onEditProduct = (id) => {
  console.log(id);

  const promise = services.getProductById(id);
  promise
    .then((result) => {
      console.log(result);
      const product = result.data;
      // dom tới các thẻ input để hiển thị dữ kiệu
      getEle("nameProduct").value = product.name;
      getEle("priceProduct").value = product.price;
      getEle("screenProduct").value = product.screen;
      getEle("backProduct").value = product.backCamera;
      getEle("frontProduct").value = product.frontCamera;
      getEle("imgProduct").value = product.img;
      getEle("typeProduct").value = product.type;
      getEle("descProduct").value = product.desc;
      // console.log(product.type);
    })
    .catch((error) => {
      console.log(error);
    });
  // update title modal
  document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa sản phẩm";

  // Create button edit Product
  const btnEdit = ` <button
                 
   class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
   onclick="onUpdateProduct(${id})"
 >
  Cập nhật sản phẩm
 </button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnEdit;
};

// Khai báo hàm onEditProduct với đối tượng window
window.onEditProduct = onEditProduct;

const onUpdateProduct = (id) => {
  console.log(id);
  // Lấy lại thông tin mới cập nhật
  const product = getValue();
  // lấy lại ID từ data
  product.id = id;
  console.log(product);
  const promise = services.onUpdateProductApi(product);
  promise
    .then((result) => {
      alert(`Update ${result.data.name} success!`);
      document.getElementsByClassName("close")[0].click();
      getListProduct();
    })
    .catch((error) => {
      console.log(error);
    });
};

// Khai báo hàm onUpdateProduct với đối tượng window
window.onUpdateProduct = onUpdateProduct;
