import Airtable, { FieldSet } from "airtable";
import { PeopleRecord, PeopleTableFields } from "@/types/airtable";
import {
  EncampmentsRecord,
  EncampmentsTableFields,
  EncampmentsFormFields,
} from "@/types/airtable";
import {
  ProvidersRecord,
  ProvidersTableFields,
  BedTypesRecord,
  BedTypesTableFields,
  DonationsRecord,
  DonationsTableFields,
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
    // Use table ID directly: tblgfLcOI1iViWkun
    const records = await base("tblgfLcOI1iViWkun").select().all();
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
    // Use table ID directly: tblgfLcOI1iViWkun
    const records = await base("tblgfLcOI1iViWkun").create([
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
    await base("Encampments").create([
      { fields: fields as unknown as FieldSet },
    ]);
  } catch (error) {
    console.error("Error creating encampment record:", error);
    throw new Error("Failed to create encampment record");
  }
}

export const getProvidersRecords = async (): Promise<ProvidersRecord[]> => {
  try {
    const base = getBase();
    // Use table ID directly: tblTQpGt9Th8ETHPh
    const records = await base("tblTQpGt9Th8ETHPh").select().all();
    return records.map((record) => ({
      id: record.id,
      fields: record.fields as unknown as ProvidersTableFields,
      createdTime: record._rawJson.createdTime,
    }));
  } catch (error) {
    console.error("Error fetching providers records:", error);
    return [];
  }
};

export const getBedTypesRecords = async (): Promise<BedTypesRecord[]> => {
  try {
    const base = getBase();
    // Use table ID directly: tblTI5lFeTTGozx5q
    const records = await base("tblTI5lFeTTGozx5q").select().all();
    return records.map((record) => ({
      id: record.id,
      fields: record.fields as unknown as BedTypesTableFields,
      createdTime: record._rawJson.createdTime,
    }));
  } catch (error) {
    console.error("Error fetching bed types records:", error);
    return [];
  }
};

export const getDonationsRecords = async (): Promise<DonationsRecord[]> => {
  try {
    const base = getBase();
    // Use table ID directly: tblkPblJxjB8XsE0c
    const records = await base("tblkPblJxjB8XsE0c").select().all();
    return records.map((record) => ({
      id: record.id,
      fields: record.fields as unknown as DonationsTableFields,
      createdTime: record._rawJson.createdTime,
    }));
  } catch (error) {
    console.error("Error fetching donations records:", error);
    return [];
  }
};

export default getBase();
