import client from "./client";

export default class ChatController {
  // Create or access/fetch One to One Chat
  static async accessChat(data) {
    console.log(data, "data going here");
    const chat = await client.post("/chat", data);
    return chat;
  }

  //Fetch all chats for the logged in user
  static async fetchChats() {
    const chats = await client.get("/chat");
    return chats;
  }

  static async createGroupChat(data) {
    console.log(data, "chat data group create");
    const grpChat = await client.post("/chat/group", data);
    return grpChat;
  }
}
