// Airtable field names as they appear in the Airtable interface
export interface PeopleTableFields {
  full_name: string;
  mothers_name: string;
  year_of_birth: string;
  gender: string;
  chronicity: string;
  veteran: boolean;
  vi_6months: boolean;
  notes: string;
}

// Our code-friendly field names (snake_case)
export interface PeopleFormFields {
  full_name: string;
  mothers_name: string;
  year_of_birth: string;
  gender: string[];
  chronicity: string;
  veteran: boolean;
  vi_6months: boolean;
  notes: string;
}

// Mapping between our form fields and Airtable fields for the People table
export const peopleFieldMapping: Record<
  keyof PeopleFormFields,
  keyof PeopleTableFields
> = {
  full_name: "full_name",
  mothers_name: "mothers_name",
  year_of_birth: "year_of_birth",
  gender: "gender",
  chronicity: "chronicity",
  veteran: "veteran",
  vi_6months: "vi_6months",
  notes: "notes",
} as const;

// Type for the Airtable record response from the People table
export interface PeopleRecord {
  id: string;
  fields: PeopleTableFields;
  createdTime: string;
}

// Type for creating a new record in the People table
export type CreatePeopleRecord = Omit<PeopleRecord, "id" | "createdTime">;

// Gender options for the form
export const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "other", label: "Other" },
] as const;
