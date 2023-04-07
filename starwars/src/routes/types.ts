import { AreaConfig } from "../config";
import { Entry } from "../data/types";

export type RequestHandler<Req, Res> = (req: Req) => Promise<Res>;

export interface RegisterTimeRequest {
  schoolName: string;
  area: string;
}

export interface RegisterTimeResponse {
  timeUsed: number;
  schoolName: string;
  area: string;
}

export interface GetAreaConfigRequest {
  area: string;
}

export interface GetAreaConfigResponse {
  areaConfig: AreaConfig;
}

export interface GetLeaderboardRequest {}

export interface GetLeaderboardResponse {
  entries: Entry[];
}
