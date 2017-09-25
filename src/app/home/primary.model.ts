import {Interested} from "./interested.model";

export interface Primary {
  investor
  contact
  location
  assigned
  status
  t_p
  interested: Interested
}
