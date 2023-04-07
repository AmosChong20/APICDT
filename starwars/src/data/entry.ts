import { Entry } from "./types";
import { knex } from "../db";

// CRUD operations for the `entry` table.
export const getEntryBySchoolName = async (
  schoolName: string
): Promise<Entry> => {
  const results = await knex
    .select("*")
    .from("entry")
    .where({ schoolName: schoolName });
  return results[0];
};

export const insertEntry = async (entry: Entry): Promise<Entry> => {
  await knex.insert(entry).into("entry");
  return await getEntryBySchoolName(entry.schoolName);
};

export const updateEntry = async (entry: Entry): Promise<Entry> => {
  await knex("entry").update(entry).where({ schoolName: entry.schoolName });
  return await getEntryBySchoolName(entry.schoolName);
};

export const deleteEntryBySchoolName = async (schoolName: string) => {
  await knex("entry").where("schoolName", schoolName).del();
};

export const upsertEntry = async (entry: Entry) => {
  const existingEntry = await getEntryBySchoolName(entry.schoolName);
  if (!existingEntry) {
    return insertEntry(entry);
  } else {
    return updateEntry({ ...existingEntry, ...entry });
  }
};
