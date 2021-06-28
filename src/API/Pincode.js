import axios from "axios";

export default axios.create({
  baseURL:
    "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin",
  params: {
    pincode: "term",
    date: "03-06-2021"
  }
});
