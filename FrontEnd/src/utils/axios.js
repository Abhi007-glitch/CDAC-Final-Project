import axios from "axios";

export default axios.create({
  baseURL: "/api", // the backed base url
});
