import { registerTime } from "../core/entry";
import { app } from "../server";
import { Request, Response } from "express";

app.post("/register-time", (req: Request, res: Response) => {
  const schoolName: string = req.body.schoolName as string;
  const area: string = req.body.area as string;

  if (!schoolName || !area) {
    res.status(400).json({ error: "Missing required query params" });
    return;
  }

  try {
    res.json(registerTime({ schoolName, area }));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
