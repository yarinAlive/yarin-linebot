import type {
  TextMessage,
  WebhookEvent,
  Client,
} from "@line/bot-sdk";

export class LinebotService {
  public static async textEventHandler (event: WebhookEvent, client: Client): Promise<TextMessage | undefined> {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return;
    }

    const { replyToken } = event;
    const { text } = event.message;

    // Compose the response message
    const response: TextMessage = {
      type: 'text',
      text,
    };

    // Reply to the user which sent message in the linebot channel
    await client.replyMessage(replyToken, response);
  };
}
