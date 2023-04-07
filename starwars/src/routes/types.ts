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
