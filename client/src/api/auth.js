import client from "./client";

export default class AuthController {
  static async getAllUsers() {
    const user = await client.get("/auth/all");
    return user;
  }
  static async login(data) {
    const user = await client.post("/auth/login", data);
    return user;
  }
  static async register(data) {
    const user = await client.post("/auth/register", data);
    return user;
  }
  static async currentUser() {
    const user = await client.get("/auth/current");
    return user;
  }
  static async followUserReq(data) {
    const user = await client.post("/auth/follow", data);
    return user;
  }
}
