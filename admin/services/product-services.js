class ProductServices {
  getListProductApi() {
    const promise = axios({
      url: "https://684931ef45f4c0f5ee7063db.mockapi.io/api/Product_CapStone_2",
      method: "GET",
    });
    return promise;
  }
  deleteProductApi(id) {
    const promise = axios({
      url: `https://684931ef45f4c0f5ee7063db.mockapi.io/api/Product_CapStone_2/${id}`,
      method: "DELETE",
    });
    return promise;
  }
  addProductApi(product) {
    const promise = axios({
      url: `https://684931ef45f4c0f5ee7063db.mockapi.io/api/Product_CapStone_2`,
      method: "POST",
      data: product,
    });
    return promise;
  }
  getProductById(id) {
    const promise = axios({
      url: `https://684931ef45f4c0f5ee7063db.mockapi.io/api/Product_CapStone_2/${id}`,
      method: "GET",
    });
    return promise;
  }
  onUpdateProductApi(product) {
    const promise = axios({
      url: `https://684931ef45f4c0f5ee7063db.mockapi.io/api/Product_CapStone_2/${product.id}`,
      method: "PUT",
      data: product,
    });
    return promise;
  }
}

export default ProductServices;
