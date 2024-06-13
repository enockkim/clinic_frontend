import { Gender } from "./Gender";

export interface NextOfKin {
    id: number;
    name: string;
    contact: number;
    national_id_number: number;
    fk_relationship_id: number;
  }