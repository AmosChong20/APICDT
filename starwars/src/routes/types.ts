export type RequestHandler<Req, Res> = (req: Req) => Res;

export interface RegisterTimeRequest {
  schoolName: string;
  area: string;
}

export interface RegisterTimeResponse {
  timeUsed: number;
}
