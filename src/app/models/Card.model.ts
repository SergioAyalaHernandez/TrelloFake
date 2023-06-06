import {List} from "@models/list.model";

export interface Card{
  id: string;
  title: string;
  position: number;
  list: List;
}
