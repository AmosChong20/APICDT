import { getConfigForArea, getLeaderboard, registerTime } from "../core/entry";
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

app.get("/get-leaderboard", async (req: Request, res: Response) => {
  try {
    res.json(await getLeaderboard());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/get-area-config", async (req: Request, res: Response) => {
  const area: string = req.query.area as string;

  if (!area) {
    res.status(400).json({ error: "Missing required param: area." });
    return;
  }

  try {
    res.json(await getConfigForArea({ area }));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
