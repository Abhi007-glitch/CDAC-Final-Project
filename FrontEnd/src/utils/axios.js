import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3500", // the backed base url
});
