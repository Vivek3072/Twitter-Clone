import { create } from "apisauce";
import { BASE_URL } from "./BaseURL";

const client = create({
  baseURL: BASE_URL,
});

client.addAsyncRequestTransform(async (request) => {
  const tokenString = localStorage.getItem("token");

  if (tokenString === "undefined") return;

  const token = JSON.parse(tokenString);

  if (!token) return;

  request.headers["Authorization"] = `Bearer ${token}`;
});

export default client;
