import { registerTime } from "../core/entry";
import { app } from "../server";
import { Request, Response } from "express";

app.post("/register-time", async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(400).json({ error: "Missing body" });
    return;
  }
  const schoolName: string = req.body.schoolName as string;
  const area: string = req.body.area as string;

  if (!schoolName || !area) {
    res
      .status(400)
      .json({ error: "Missing required params: schoolName, area." });
    return;
  }

  try {
    res.json(await registerTime({ schoolName, area }));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
