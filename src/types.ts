export type Consent = boolean | null;
export type QueryType = "general" | "support";

export interface MyFormData {
    firstName: string;
    lastName: string;
    email: string;
    queryType: QueryType;
    message: string;
    consent: Consent;
}