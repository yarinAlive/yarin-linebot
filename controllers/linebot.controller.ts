import type { Request, Response } from "express";
import type { Client, WebhookEvent } from "@line/bot-sdk";

import { LinebotService } from "../services/linebot.service";
import { UserService } from "../services/user.service";

export class LinebotController {
  constructor(
    private client: Client,
  ) {}


  public async echo(req: Request, res: Response): Promise<Response> {
    const events: WebhookEvent[] = req.body.events;

    const results = await Promise.all(
      events.map(async (event: WebhookEvent) => {
        try {
          const lineUserId = event.source.userId;

          if (lineUserId) {
            UserService.retrieveUserProfile(lineUserId);
          }

          await LinebotService.textEventHandler(event, this.client);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(err);
          }

          return res.status(500).json({
            status: 'error',
          });
        }
      })
    );

    return res.status(200).json({
      status: 'success',
      results,
    });
  }
}
