import client from "../client";

export default class MessageController {
  // Create New Message
  static async sendMessage(data) {
    const message = await client.post("/message", data);
    return message;
  }

  //Fetch all messages for a chat
  static async fetchAllMessages(param) {
    const allMessages = await client.get(`/message/${param}`);
    return allMessages;
  }
}
