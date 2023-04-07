import {
  RegisterTimeRequest,
  RegisterTimeResponse,
  RequestHandler,
} from "../routes/types";

export const registerTime: RequestHandler<
  RegisterTimeRequest,
  RegisterTimeResponse
> = ({ area, schoolName }) => {
  
  return {
    timeUsed: 0,
  };
};
