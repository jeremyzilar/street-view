import Airtable, { FieldSet, Record as AirtableRecord } from "airtable";
import { PeopleRecord, PeopleTableFields } from "@/types/airtable";
import {
  EncampmentsRecord,
  EncampmentsTableFields,
  EncampmentsFormFields,
  encampmentsFieldMapping,
} from "@/types/airtable";

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
    // Convert the encampment field to an array if it exists
    const airtableFields = {
      ...fields,
      encampment: fields.encampment ? [fields.encampment] : undefined,
    };
    const records = await base("People").create([
      { fields: airtableFields as unknown as FieldSet },
    ]);
    const createdRecord = records[0];
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

export async function createEncampmentsRecord(
  fields: EncampmentsFormFields
): Promise<void> {
  try {
    const base = getBase();
    // Convert form fields to Airtable fields
    const airtableFields: Partial<EncampmentsTableFields> = {};

    // Handle fields
    Object.entries(encampmentsFieldMapping).forEach(
      ([formField, airtableField]) => {
        if (formField in fields) {
          airtableFields[airtableField] = fields[
            formField as keyof EncampmentsFormFields
          ] as any;
        }
      }
    );

    await base("Encampments").create(airtableFields);
  } catch (error) {
    console.error("Error creating encampment record:", error);
    throw new Error("Failed to create encampment record");
  }
}

export default getBase();
