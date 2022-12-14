import { QueryKey } from 'react-query';
import { Maybe, SortOrder } from './generated';

export type CategoriesQueryOptionsType = {
  type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type TagsQueryOptionsType = {
  type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type ShopsQueryOptionsType = {
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type WithdrawsQueryOptionsType = {
  text?: string;
  shop_id?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type QuestionsQueryOptionsType = {
  shop_id?: string;
  user?: string;
  product?: string;
  page?: number;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type ReviewsQueryOptionsType = {
  shop_id?: string;
  user?: string;
  product?: string;
  page?: number;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type ProductsQueryOptionsType = {
  page?: number;
  shop_id?: string;
  text?: string;
  type?: string;
  category?: string;
  status?: string;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type TypesQueryOptionsType = {
  page?: number;
  text?: string;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
export type StaffsQueryOptionsType = {
  page?: number;
  shop_id?: string;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};

export type QueryOptionsType = {
  page?: number;
  text?: string;
  shop_id?: Maybe<string>;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};

export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: string;
};
