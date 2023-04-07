export const now = () => new Date();

export const isBefore = (date1: Date, date2: Date) =>
  date1.getTime() < date2.getTime();

export const isAfter = (date1: Date, date2: Date) =>
  date1.getTime() > date2.getTime();

export const diffMs = (date1: Date, date2: Date) =>
  Math.abs(date1.getTime() - date2.getTime());
