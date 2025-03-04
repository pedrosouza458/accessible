import { IBusiness } from "./business";

export interface ICategory {
  id: string;
  name?: string;
  business: IBusiness[];
}