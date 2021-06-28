import express, { Application } from 'express';
import { linebotRouter } from "./routers/linebot.router";

const app: Application = express();
app.use('/linebot', linebotRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is running, port = ${PORT}`);
});
