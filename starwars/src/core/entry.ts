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
      `The earliest time that you can register is ${areaConfig.startTime}. You're here too early.`
    );
  }

  if (isBefore(areaConfig.endTime, now())) {
    throw new Error(
      `The latest time that you can register is ${areaConfig.endTime}. You're here too late.`
    );
  }

  const timeUsed = diffMs(now(), areaConfig.startTime);

  const existingEntry = await getEntryBySchoolName(schoolName);

  if (existingEntry && existingEntry.timeUsed < timeUsed) {
    return existingEntry;
  }

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
