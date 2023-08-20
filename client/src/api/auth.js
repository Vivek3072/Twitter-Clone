import client from "./client";

export default class AuthController {
  static async login(data) {
    const user = await client.post("/auth/login", data);
    return user;
  }
  static async register(data) {
    const user = await client.post("/auth/register", data);
    return user;
  }
  static async followUser(data) {
    const user = await client.post("/auth/follow", data);
    return user;
  }
}
