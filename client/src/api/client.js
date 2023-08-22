import { create } from "apisauce";
import { BASE_URL, LOCAL_URL } from "./BaseURL";

let baseURL = BASE_URL;

if (process.env.NODE_ENV === "production") {
  baseURL = BASE_URL;
} else if (process.env.NODE_ENV === "development") {
  baseURL = LOCAL_URL;
}

const client = create({
  baseURL: baseURL,
});

client.addAsyncRequestTransform(async (request) => {
  const tokenString = localStorage.getItem("token");

  if (tokenString === "undefined") return;

  const token = JSON.parse(tokenString);

  if (!token) return;

  request.headers["Authorization"] = `Bearer ${token}`;
});

export default client;
