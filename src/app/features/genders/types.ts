import { WithIdAndTitle } from "app/types";

export type Gender = WithIdAndTitle;

export type GetGendersResponse = {
  genders: Gender[];
};
