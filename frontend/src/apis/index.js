import axios from "axios";

const url = "http://localhost:8080/api/cities";

export default function (options = {}) {
  console.log(options)
  const { headers } = options;

  return axios.create(
    {
    baseURL: url,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    //   Authorization: `Bearer ` + (localStorage.getItem("token") == null
    //        ? "" : localStorage.getItem("token")), 
      ...headers,
    },
  });
}
