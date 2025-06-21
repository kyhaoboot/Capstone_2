import { getEle } from "./../controller/main.js";

class Validation {
  checkEmpty(value, idNoti, mess) {
    if (value === "") {
      getEle(idNoti).innerHTML = mess;
      getEle(idNoti).classList.remove("hidden");
      return false;
    }
    getEle(idNoti).innerHTML = "";
    getEle(idNoti).classList.add("hidden");
    return true;
  }
}

export default Validation;
