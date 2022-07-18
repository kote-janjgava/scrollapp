import { PaginationInterface } from './pagination-interface';

export interface Response {
  pagination: PaginationInterface;
  list: any[];
}
