import * as config from "./config.json";

interface AreaConfig {
  area: string;
  startTime: Date;
  endTime: Date;
}

export const getAreaConfig = (area: string): AreaConfig | undefined => {
  const c = config.Starwars.find((c) => c.area === area);
  if (!c) {
    return;
  }
  return {
    area: c.area,
    startTime: new Date(c.startTime),
    endTime: new Date(c.endTime),
  };
};
