import { IBusiness } from "./business";

export interface ILink {
  id: string;
  title: string;
  url: string;
  business?: IBusiness;
  businessId?: string;
}