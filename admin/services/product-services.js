class ProductServices {
  getListProductApi() {
    const promise = axios({
      url: "https://684931ef45f4c0f5ee7063db.mockapi.io/api/Product_CapStone_2",
      method: "GET",
    });
    return promise;
  }
}

export default ProductServices;
