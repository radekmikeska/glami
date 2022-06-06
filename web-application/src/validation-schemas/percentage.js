import { number } from "yup";

export const percentageSchema = number()
  .min(-99, "Minimal value is -99")
  .max(1000, "Max value is 1000");
