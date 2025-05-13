import Airtable from "airtable";
import { PeopleRecord, PeopleTableFields } from "@/types/airtable";
import { EncampmentsRecord, EncampmentsTableFields } from "@/types/airtable";

// Initialize Airtable
const getBase = () => {
  if (!process.env.NEXT_PUBLIC_AIRTABLE_API_KEY) {
    throw new Error(
      "NEXT_PUBLIC_AIRTABLE_API_KEY is not defined in environment variables"
    );
  }
  if (!process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID) {
    throw new Error(
      "NEXT_PUBLIC_AIRTABLE_BASE_ID is not defined in environment variables"
    );
  }

  return new Airtable({
    apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
  }).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);
};

export const getPeopleRecords = async (): Promise<PeopleRecord[]> => {
  try {
    const base = getBase();
    const records = await base("People").select().all();
    return records.map((record) => ({
      id: record.id,
      fields: record.fields as unknown as PeopleTableFields,
      createdTime: record._rawJson.createdTime,
    }));
  } catch (error) {
    console.error("Error fetching records:", error);
    return [];
  }
};

export const createPeopleRecord = async (
  fields: PeopleTableFields
): Promise<PeopleRecord | null> => {
  try {
    const base = getBase();
    const record = await base("People").create([{ fields }]);
    const createdRecord = record[0];
    return {
      id: createdRecord.id,
      fields: createdRecord.fields as unknown as PeopleTableFields,
      createdTime: createdRecord._rawJson.createdTime,
    };
  } catch (error) {
    console.error("Error creating record:", error);
    return null;
  }
};

export const getEncampmentsRecords = async (): Promise<EncampmentsRecord[]> => {
  try {
    const base = getBase();
    const records = await base("Encampments").select().all();
    return records.map((record) => ({
      id: record.id,
      fields: record.fields as unknown as EncampmentsTableFields,
      createdTime: record._rawJson.createdTime,
    }));
  } catch (error) {
    console.error("Error fetching encampments records:", error);
    return [];
  }
};

export const createEncampmentsRecord = async (
  fields: EncampmentsTableFields
): Promise<EncampmentsRecord | null> => {
  try {
    const base = getBase();
    const record = await base("Encampments").create([{ fields }]);
    const createdRecord = record[0];
    return {
      id: createdRecord.id,
      fields: createdRecord.fields as unknown as EncampmentsTableFields,
      createdTime: createdRecord._rawJson.createdTime,
    };
  } catch (error) {
    console.error("Error creating encampments record:", error);
    return null;
  }
};

export default getBase();
