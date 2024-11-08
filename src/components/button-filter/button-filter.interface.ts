import { Dispatch, ReactNode, SetStateAction } from "react";

export interface ButtonFilterProps {
  filter: "all" | "completed" | "active";
  filterState: "all" | "completed" | "active";
  setFilter: Dispatch<SetStateAction<"all" | "completed" | "active">>;
  children: ReactNode;
}
