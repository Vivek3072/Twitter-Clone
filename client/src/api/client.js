import { create } from "apisauce";
import { LOCAL_URL } from "./BaseURL";

const client = create({
  baseURL: LOCAL_URL,
});

client.addAsyncRequestTransform(async (request) => {
  const tokenString = localStorage.getItem("token");

  if (tokenString === "undefined") return;

  const token = JSON.parse(tokenString);

  if (!token) return;

  request.headers["Authorization"] = `Bearer ${token}`;
});

export default client;
