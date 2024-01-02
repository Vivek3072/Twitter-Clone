import client from "./client";

export default class ChatController {
  // Create or fetch One to One Chat
  static async accessChat(data) {
    const chat = await client.post("/tweets/create", data);
    return chat;
  }

  //Fetch all chats for a user
  static async fetchChats() {
    const chats = await client.get("/chat");
    return chats;
  }
}
