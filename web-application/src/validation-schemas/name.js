import { string } from "yup";

export const nameSchema = string().min(2, "Must have at least two characters.");
