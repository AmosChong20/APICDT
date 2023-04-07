import { getAreaConfig } from "../config";
import {
  getEntries,
  getEntryBySchoolName,
  insertEntry,
  upsertEntry,
} from "../data/entry";
import {
  GetAreaConfigRequest,
  GetAreaConfigResponse,
  RegisterTimeRequest,
  RegisterTimeResponse,
  RequestHandler,
} from "../routes/types";
import { diffMs, isBefore, now } from "./utils";

export const registerTime: RequestHandler<
  RegisterTimeRequest,
  RegisterTimeResponse
> = async ({ area, schoolName }) => {
  const areaConfig = getAreaConfig(area);

  if (!areaConfig) {
    throw new Error(`No configuration can be found for area ${area}.`);
  }

  if (isBefore(now(), areaConfig.startTime)) {
    throw new Error(
      `抽签未开始：${areaConfig.area}区域的抽签将于${areaConfig.endTime}开始。`
    );
  }

  if (isBefore(areaConfig.endTime, now())) {
    throw new Error(
      `${areaConfig.area}区域的抽签已于${areaConfig.endTime}关闭。`
    );
  }

  const timeUsed = diffMs(now(), areaConfig.startTime);

  const existingEntry = await getEntryBySchoolName(schoolName);

  if (existingEntry) {
    throw new Error(
      `您已经注册过${area}区的抽签了，时间为${
        existingEntry.timeUsed / 1000
      }秒。您可在抽签结果页面查看结果。`
    );
  }

  // if (existingEntry && existingEntry.timeUsed < timeUsed) {
  //   return existingEntry;
  // }

  const entry = await upsertEntry({
    area,
    schoolName,
    timeUsed,
  });

  return entry;
};

export const getConfigForArea: RequestHandler<
  GetAreaConfigRequest,
  GetAreaConfigResponse
> = async ({ area }) => {
  const c = getAreaConfig(area);
  if (!c) throw new Error(`No configuration can be found for area ${area}.`);

  return {
    areaConfig: c,
  };
};

export const getLeaderboard = async () => {
  return {
    entries: await getEntries(),
  };
};
