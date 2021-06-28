import express, { Application, Request, Response } from 'express';
import {
  Client,
  ClientConfig,
  middleware,
  MiddlewareConfig,
  WebhookEvent,
} from "@line/bot-sdk";
import { LinebotController } from "../controllers/linebot.controller";

const clientConfig: ClientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.CHANNEL_SECRET,
};

const middlewareConfig: MiddlewareConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET || '',
};

// Created a new client by LINE-SDK
const client = new Client(clientConfig);
const linebotController = new LinebotController(client);
const linebotRouter = express.Router();

linebotRouter.get(
  '/',
  async (_: Request, res: Response): Promise<Response> => {
    return res.status(200).json({
      status: 'success',
      message: 'Connected successfully!',
    });
  }
);

linebotRouter.post(
  '/webhook',
  middleware(middlewareConfig),
  linebotController.echo.bind(linebotController),
);

export {
  linebotRouter
}
