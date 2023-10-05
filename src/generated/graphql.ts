import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  jsonb: any;
  numeric: any;
  timestamptz: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "homes" */
export type Homes = {
  __typename?: 'homes';
  address: Scalars['String'];
  bath?: Maybe<Scalars['numeric']>;
  beds?: Maybe<Scalars['numeric']>;
  city?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  description?: Maybe<Scalars['String']>;
  features?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  imgs?: Maybe<Scalars['jsonb']>;
  lat?: Maybe<Scalars['numeric']>;
  lng?: Maybe<Scalars['numeric']>;
  plan?: Maybe<Scalars['numeric']>;
  price?: Maybe<Scalars['numeric']>;
  published?: Maybe<Scalars['Boolean']>;
  sqft?: Maybe<Scalars['numeric']>;
  state?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  style?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  uid: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  yearBuilt?: Maybe<Scalars['numeric']>;
  zipcode?: Maybe<Scalars['String']>;
};


/** columns and relationships of "homes" */
export type HomesImgsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "homes" */
export type Homes_Aggregate = {
  __typename?: 'homes_aggregate';
  aggregate?: Maybe<Homes_Aggregate_Fields>;
  nodes: Array<Homes>;
};

/** aggregate fields of "homes" */
export type Homes_Aggregate_Fields = {
  __typename?: 'homes_aggregate_fields';
  avg?: Maybe<Homes_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Homes_Max_Fields>;
  min?: Maybe<Homes_Min_Fields>;
  stddev?: Maybe<Homes_Stddev_Fields>;
  stddev_pop?: Maybe<Homes_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Homes_Stddev_Samp_Fields>;
  sum?: Maybe<Homes_Sum_Fields>;
  var_pop?: Maybe<Homes_Var_Pop_Fields>;
  var_samp?: Maybe<Homes_Var_Samp_Fields>;
  variance?: Maybe<Homes_Variance_Fields>;
};


/** aggregate fields of "homes" */
export type Homes_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Homes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Homes_Append_Input = {
  imgs?: InputMaybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type Homes_Avg_Fields = {
  __typename?: 'homes_avg_fields';
  bath?: Maybe<Scalars['Float']>;
  beds?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  plan?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  sqft?: Maybe<Scalars['Float']>;
  yearBuilt?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "homes". All fields are combined with a logical 'AND'. */
export type Homes_Bool_Exp = {
  _and?: InputMaybe<Array<Homes_Bool_Exp>>;
  _not?: InputMaybe<Homes_Bool_Exp>;
  _or?: InputMaybe<Array<Homes_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  bath?: InputMaybe<Numeric_Comparison_Exp>;
  beds?: InputMaybe<Numeric_Comparison_Exp>;
  city?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  features?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  imgs?: InputMaybe<Jsonb_Comparison_Exp>;
  lat?: InputMaybe<Numeric_Comparison_Exp>;
  lng?: InputMaybe<Numeric_Comparison_Exp>;
  plan?: InputMaybe<Numeric_Comparison_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
  published?: InputMaybe<Boolean_Comparison_Exp>;
  sqft?: InputMaybe<Numeric_Comparison_Exp>;
  state?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  style?: InputMaybe<String_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  uid?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  yearBuilt?: InputMaybe<Numeric_Comparison_Exp>;
  zipcode?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "homes" */
export enum Homes_Constraint {
  /** unique or primary key constraint on columns "id" */
  HomesIdKey = 'homes_id_key',
  /** unique or primary key constraint on columns "id" */
  HomesPkey = 'homes_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Homes_Delete_At_Path_Input = {
  imgs?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Homes_Delete_Elem_Input = {
  imgs?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Homes_Delete_Key_Input = {
  imgs?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "homes" */
export type Homes_Inc_Input = {
  bath?: InputMaybe<Scalars['numeric']>;
  beds?: InputMaybe<Scalars['numeric']>;
  id?: InputMaybe<Scalars['Int']>;
  lat?: InputMaybe<Scalars['numeric']>;
  lng?: InputMaybe<Scalars['numeric']>;
  plan?: InputMaybe<Scalars['numeric']>;
  price?: InputMaybe<Scalars['numeric']>;
  sqft?: InputMaybe<Scalars['numeric']>;
  yearBuilt?: InputMaybe<Scalars['numeric']>;
};

/** input type for inserting data into table "homes" */
export type Homes_Insert_Input = {
  address?: InputMaybe<Scalars['String']>;
  bath?: InputMaybe<Scalars['numeric']>;
  beds?: InputMaybe<Scalars['numeric']>;
  city?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  features?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  imgs?: InputMaybe<Scalars['jsonb']>;
  lat?: InputMaybe<Scalars['numeric']>;
  lng?: InputMaybe<Scalars['numeric']>;
  plan?: InputMaybe<Scalars['numeric']>;
  price?: InputMaybe<Scalars['numeric']>;
  published?: InputMaybe<Scalars['Boolean']>;
  sqft?: InputMaybe<Scalars['numeric']>;
  state?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  style?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  yearBuilt?: InputMaybe<Scalars['numeric']>;
  zipcode?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Homes_Max_Fields = {
  __typename?: 'homes_max_fields';
  address?: Maybe<Scalars['String']>;
  bath?: Maybe<Scalars['numeric']>;
  beds?: Maybe<Scalars['numeric']>;
  city?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  features?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  lat?: Maybe<Scalars['numeric']>;
  lng?: Maybe<Scalars['numeric']>;
  plan?: Maybe<Scalars['numeric']>;
  price?: Maybe<Scalars['numeric']>;
  sqft?: Maybe<Scalars['numeric']>;
  state?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  style?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  yearBuilt?: Maybe<Scalars['numeric']>;
  zipcode?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Homes_Min_Fields = {
  __typename?: 'homes_min_fields';
  address?: Maybe<Scalars['String']>;
  bath?: Maybe<Scalars['numeric']>;
  beds?: Maybe<Scalars['numeric']>;
  city?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  features?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  lat?: Maybe<Scalars['numeric']>;
  lng?: Maybe<Scalars['numeric']>;
  plan?: Maybe<Scalars['numeric']>;
  price?: Maybe<Scalars['numeric']>;
  sqft?: Maybe<Scalars['numeric']>;
  state?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  style?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  yearBuilt?: Maybe<Scalars['numeric']>;
  zipcode?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "homes" */
export type Homes_Mutation_Response = {
  __typename?: 'homes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Homes>;
};

/** input type for inserting object relation for remote table "homes" */
export type Homes_Obj_Rel_Insert_Input = {
  data: Homes_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Homes_On_Conflict>;
};

/** on_conflict condition type for table "homes" */
export type Homes_On_Conflict = {
  constraint: Homes_Constraint;
  update_columns?: Array<Homes_Update_Column>;
  where?: InputMaybe<Homes_Bool_Exp>;
};

/** Ordering options when selecting data from "homes". */
export type Homes_Order_By = {
  address?: InputMaybe<Order_By>;
  bath?: InputMaybe<Order_By>;
  beds?: InputMaybe<Order_By>;
  city?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  features?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  imgs?: InputMaybe<Order_By>;
  lat?: InputMaybe<Order_By>;
  lng?: InputMaybe<Order_By>;
  plan?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  published?: InputMaybe<Order_By>;
  sqft?: InputMaybe<Order_By>;
  state?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  style?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  uid?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  yearBuilt?: InputMaybe<Order_By>;
  zipcode?: InputMaybe<Order_By>;
};

/** primary key columns input for table: homes */
export type Homes_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Homes_Prepend_Input = {
  imgs?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "homes" */
export enum Homes_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  Bath = 'bath',
  /** column name */
  Beds = 'beds',
  /** column name */
  City = 'city',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Features = 'features',
  /** column name */
  Id = 'id',
  /** column name */
  Imgs = 'imgs',
  /** column name */
  Lat = 'lat',
  /** column name */
  Lng = 'lng',
  /** column name */
  Plan = 'plan',
  /** column name */
  Price = 'price',
  /** column name */
  Published = 'published',
  /** column name */
  Sqft = 'sqft',
  /** column name */
  State = 'state',
  /** column name */
  Status = 'status',
  /** column name */
  Style = 'style',
  /** column name */
  Title = 'title',
  /** column name */
  Uid = 'uid',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  YearBuilt = 'yearBuilt',
  /** column name */
  Zipcode = 'zipcode'
}

/** input type for updating data in table "homes" */
export type Homes_Set_Input = {
  address?: InputMaybe<Scalars['String']>;
  bath?: InputMaybe<Scalars['numeric']>;
  beds?: InputMaybe<Scalars['numeric']>;
  city?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  features?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  imgs?: InputMaybe<Scalars['jsonb']>;
  lat?: InputMaybe<Scalars['numeric']>;
  lng?: InputMaybe<Scalars['numeric']>;
  plan?: InputMaybe<Scalars['numeric']>;
  price?: InputMaybe<Scalars['numeric']>;
  published?: InputMaybe<Scalars['Boolean']>;
  sqft?: InputMaybe<Scalars['numeric']>;
  state?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  style?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  yearBuilt?: InputMaybe<Scalars['numeric']>;
  zipcode?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Homes_Stddev_Fields = {
  __typename?: 'homes_stddev_fields';
  bath?: Maybe<Scalars['Float']>;
  beds?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  plan?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  sqft?: Maybe<Scalars['Float']>;
  yearBuilt?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Homes_Stddev_Pop_Fields = {
  __typename?: 'homes_stddev_pop_fields';
  bath?: Maybe<Scalars['Float']>;
  beds?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  plan?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  sqft?: Maybe<Scalars['Float']>;
  yearBuilt?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Homes_Stddev_Samp_Fields = {
  __typename?: 'homes_stddev_samp_fields';
  bath?: Maybe<Scalars['Float']>;
  beds?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  plan?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  sqft?: Maybe<Scalars['Float']>;
  yearBuilt?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "homes" */
export type Homes_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Homes_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Homes_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']>;
  bath?: InputMaybe<Scalars['numeric']>;
  beds?: InputMaybe<Scalars['numeric']>;
  city?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  features?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  imgs?: InputMaybe<Scalars['jsonb']>;
  lat?: InputMaybe<Scalars['numeric']>;
  lng?: InputMaybe<Scalars['numeric']>;
  plan?: InputMaybe<Scalars['numeric']>;
  price?: InputMaybe<Scalars['numeric']>;
  published?: InputMaybe<Scalars['Boolean']>;
  sqft?: InputMaybe<Scalars['numeric']>;
  state?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  style?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  yearBuilt?: InputMaybe<Scalars['numeric']>;
  zipcode?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type Homes_Sum_Fields = {
  __typename?: 'homes_sum_fields';
  bath?: Maybe<Scalars['numeric']>;
  beds?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
  lat?: Maybe<Scalars['numeric']>;
  lng?: Maybe<Scalars['numeric']>;
  plan?: Maybe<Scalars['numeric']>;
  price?: Maybe<Scalars['numeric']>;
  sqft?: Maybe<Scalars['numeric']>;
  yearBuilt?: Maybe<Scalars['numeric']>;
};

/** update columns of table "homes" */
export enum Homes_Update_Column {
  /** column name */
  Address = 'address',
  /** column name */
  Bath = 'bath',
  /** column name */
  Beds = 'beds',
  /** column name */
  City = 'city',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Features = 'features',
  /** column name */
  Id = 'id',
  /** column name */
  Imgs = 'imgs',
  /** column name */
  Lat = 'lat',
  /** column name */
  Lng = 'lng',
  /** column name */
  Plan = 'plan',
  /** column name */
  Price = 'price',
  /** column name */
  Published = 'published',
  /** column name */
  Sqft = 'sqft',
  /** column name */
  State = 'state',
  /** column name */
  Status = 'status',
  /** column name */
  Style = 'style',
  /** column name */
  Title = 'title',
  /** column name */
  Uid = 'uid',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  YearBuilt = 'yearBuilt',
  /** column name */
  Zipcode = 'zipcode'
}

export type Homes_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Homes_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Homes_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Homes_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Homes_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Homes_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Homes_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Homes_Set_Input>;
  /** filter the rows which have to be updated */
  where: Homes_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Homes_Var_Pop_Fields = {
  __typename?: 'homes_var_pop_fields';
  bath?: Maybe<Scalars['Float']>;
  beds?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  plan?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  sqft?: Maybe<Scalars['Float']>;
  yearBuilt?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Homes_Var_Samp_Fields = {
  __typename?: 'homes_var_samp_fields';
  bath?: Maybe<Scalars['Float']>;
  beds?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  plan?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  sqft?: Maybe<Scalars['Float']>;
  yearBuilt?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Homes_Variance_Fields = {
  __typename?: 'homes_variance_fields';
  bath?: Maybe<Scalars['Float']>;
  beds?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  plan?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  sqft?: Maybe<Scalars['Float']>;
  yearBuilt?: Maybe<Scalars['Float']>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>;
  _eq?: InputMaybe<Scalars['jsonb']>;
  _gt?: InputMaybe<Scalars['jsonb']>;
  _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['jsonb']>;
  _lte?: InputMaybe<Scalars['jsonb']>;
  _neq?: InputMaybe<Scalars['jsonb']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "homes" */
  delete_homes?: Maybe<Homes_Mutation_Response>;
  /** delete single row from the table: "homes" */
  delete_homes_by_pk?: Maybe<Homes>;
  /** delete data from the table: "user_homes" */
  delete_user_homes?: Maybe<User_Homes_Mutation_Response>;
  /** delete single row from the table: "user_homes" */
  delete_user_homes_by_pk?: Maybe<User_Homes>;
  /** delete data from the table: "viewed_enum" */
  delete_viewed_enum?: Maybe<Viewed_Enum_Mutation_Response>;
  /** delete single row from the table: "viewed_enum" */
  delete_viewed_enum_by_pk?: Maybe<Viewed_Enum>;
  /** delete data from the table: "wishlisted" */
  delete_wishlisted?: Maybe<Wishlisted_Mutation_Response>;
  /** delete single row from the table: "wishlisted" */
  delete_wishlisted_by_pk?: Maybe<Wishlisted>;
  /** insert data into the table: "homes" */
  insert_homes?: Maybe<Homes_Mutation_Response>;
  /** insert a single row into the table: "homes" */
  insert_homes_one?: Maybe<Homes>;
  /** insert data into the table: "user_homes" */
  insert_user_homes?: Maybe<User_Homes_Mutation_Response>;
  /** insert a single row into the table: "user_homes" */
  insert_user_homes_one?: Maybe<User_Homes>;
  /** insert data into the table: "viewed_enum" */
  insert_viewed_enum?: Maybe<Viewed_Enum_Mutation_Response>;
  /** insert a single row into the table: "viewed_enum" */
  insert_viewed_enum_one?: Maybe<Viewed_Enum>;
  /** insert data into the table: "wishlisted" */
  insert_wishlisted?: Maybe<Wishlisted_Mutation_Response>;
  /** insert a single row into the table: "wishlisted" */
  insert_wishlisted_one?: Maybe<Wishlisted>;
  /** update data of the table: "homes" */
  update_homes?: Maybe<Homes_Mutation_Response>;
  /** update single row of the table: "homes" */
  update_homes_by_pk?: Maybe<Homes>;
  /** update multiples rows of table: "homes" */
  update_homes_many?: Maybe<Array<Maybe<Homes_Mutation_Response>>>;
  /** update data of the table: "user_homes" */
  update_user_homes?: Maybe<User_Homes_Mutation_Response>;
  /** update single row of the table: "user_homes" */
  update_user_homes_by_pk?: Maybe<User_Homes>;
  /** update multiples rows of table: "user_homes" */
  update_user_homes_many?: Maybe<Array<Maybe<User_Homes_Mutation_Response>>>;
  /** update data of the table: "viewed_enum" */
  update_viewed_enum?: Maybe<Viewed_Enum_Mutation_Response>;
  /** update single row of the table: "viewed_enum" */
  update_viewed_enum_by_pk?: Maybe<Viewed_Enum>;
  /** update multiples rows of table: "viewed_enum" */
  update_viewed_enum_many?: Maybe<Array<Maybe<Viewed_Enum_Mutation_Response>>>;
  /** update data of the table: "wishlisted" */
  update_wishlisted?: Maybe<Wishlisted_Mutation_Response>;
  /** update single row of the table: "wishlisted" */
  update_wishlisted_by_pk?: Maybe<Wishlisted>;
  /** update multiples rows of table: "wishlisted" */
  update_wishlisted_many?: Maybe<Array<Maybe<Wishlisted_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_HomesArgs = {
  where: Homes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Homes_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_User_HomesArgs = {
  where: User_Homes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Homes_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Viewed_EnumArgs = {
  where: Viewed_Enum_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Viewed_Enum_By_PkArgs = {
  enum: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_WishlistedArgs = {
  where: Wishlisted_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Wishlisted_By_PkArgs = {
  id: Scalars['numeric'];
};


/** mutation root */
export type Mutation_RootInsert_HomesArgs = {
  objects: Array<Homes_Insert_Input>;
  on_conflict?: InputMaybe<Homes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Homes_OneArgs = {
  object: Homes_Insert_Input;
  on_conflict?: InputMaybe<Homes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_HomesArgs = {
  objects: Array<User_Homes_Insert_Input>;
  on_conflict?: InputMaybe<User_Homes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Homes_OneArgs = {
  object: User_Homes_Insert_Input;
  on_conflict?: InputMaybe<User_Homes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Viewed_EnumArgs = {
  objects: Array<Viewed_Enum_Insert_Input>;
  on_conflict?: InputMaybe<Viewed_Enum_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Viewed_Enum_OneArgs = {
  object: Viewed_Enum_Insert_Input;
  on_conflict?: InputMaybe<Viewed_Enum_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_WishlistedArgs = {
  objects: Array<Wishlisted_Insert_Input>;
  on_conflict?: InputMaybe<Wishlisted_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Wishlisted_OneArgs = {
  object: Wishlisted_Insert_Input;
  on_conflict?: InputMaybe<Wishlisted_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_HomesArgs = {
  _append?: InputMaybe<Homes_Append_Input>;
  _delete_at_path?: InputMaybe<Homes_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Homes_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Homes_Delete_Key_Input>;
  _inc?: InputMaybe<Homes_Inc_Input>;
  _prepend?: InputMaybe<Homes_Prepend_Input>;
  _set?: InputMaybe<Homes_Set_Input>;
  where: Homes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Homes_By_PkArgs = {
  _append?: InputMaybe<Homes_Append_Input>;
  _delete_at_path?: InputMaybe<Homes_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Homes_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Homes_Delete_Key_Input>;
  _inc?: InputMaybe<Homes_Inc_Input>;
  _prepend?: InputMaybe<Homes_Prepend_Input>;
  _set?: InputMaybe<Homes_Set_Input>;
  pk_columns: Homes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Homes_ManyArgs = {
  updates: Array<Homes_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_User_HomesArgs = {
  _inc?: InputMaybe<User_Homes_Inc_Input>;
  _set?: InputMaybe<User_Homes_Set_Input>;
  where: User_Homes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Homes_By_PkArgs = {
  _inc?: InputMaybe<User_Homes_Inc_Input>;
  _set?: InputMaybe<User_Homes_Set_Input>;
  pk_columns: User_Homes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_Homes_ManyArgs = {
  updates: Array<User_Homes_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Viewed_EnumArgs = {
  _set?: InputMaybe<Viewed_Enum_Set_Input>;
  where: Viewed_Enum_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Viewed_Enum_By_PkArgs = {
  _set?: InputMaybe<Viewed_Enum_Set_Input>;
  pk_columns: Viewed_Enum_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Viewed_Enum_ManyArgs = {
  updates: Array<Viewed_Enum_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_WishlistedArgs = {
  _inc?: InputMaybe<Wishlisted_Inc_Input>;
  _set?: InputMaybe<Wishlisted_Set_Input>;
  where: Wishlisted_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Wishlisted_By_PkArgs = {
  _inc?: InputMaybe<Wishlisted_Inc_Input>;
  _set?: InputMaybe<Wishlisted_Set_Input>;
  pk_columns: Wishlisted_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Wishlisted_ManyArgs = {
  updates: Array<Wishlisted_Updates>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']>;
  _gt?: InputMaybe<Scalars['numeric']>;
  _gte?: InputMaybe<Scalars['numeric']>;
  _in?: InputMaybe<Array<Scalars['numeric']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['numeric']>;
  _lte?: InputMaybe<Scalars['numeric']>;
  _neq?: InputMaybe<Scalars['numeric']>;
  _nin?: InputMaybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "homes" */
  homes: Array<Homes>;
  /** fetch aggregated fields from the table: "homes" */
  homes_aggregate: Homes_Aggregate;
  /** fetch data from the table: "homes" using primary key columns */
  homes_by_pk?: Maybe<Homes>;
  /** An array relationship */
  user_homes: Array<User_Homes>;
  /** An aggregate relationship */
  user_homes_aggregate: User_Homes_Aggregate;
  /** fetch data from the table: "user_homes" using primary key columns */
  user_homes_by_pk?: Maybe<User_Homes>;
  /** fetch data from the table: "viewed_enum" */
  viewed_enum: Array<Viewed_Enum>;
  /** fetch aggregated fields from the table: "viewed_enum" */
  viewed_enum_aggregate: Viewed_Enum_Aggregate;
  /** fetch data from the table: "viewed_enum" using primary key columns */
  viewed_enum_by_pk?: Maybe<Viewed_Enum>;
  /** fetch data from the table: "wishlisted" */
  wishlisted: Array<Wishlisted>;
  /** fetch aggregated fields from the table: "wishlisted" */
  wishlisted_aggregate: Wishlisted_Aggregate;
  /** fetch data from the table: "wishlisted" using primary key columns */
  wishlisted_by_pk?: Maybe<Wishlisted>;
};


export type Query_RootHomesArgs = {
  distinct_on?: InputMaybe<Array<Homes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Homes_Order_By>>;
  where?: InputMaybe<Homes_Bool_Exp>;
};


export type Query_RootHomes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Homes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Homes_Order_By>>;
  where?: InputMaybe<Homes_Bool_Exp>;
};


export type Query_RootHomes_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootUser_HomesArgs = {
  distinct_on?: InputMaybe<Array<User_Homes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Homes_Order_By>>;
  where?: InputMaybe<User_Homes_Bool_Exp>;
};


export type Query_RootUser_Homes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Homes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Homes_Order_By>>;
  where?: InputMaybe<User_Homes_Bool_Exp>;
};


export type Query_RootUser_Homes_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootViewed_EnumArgs = {
  distinct_on?: InputMaybe<Array<Viewed_Enum_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Viewed_Enum_Order_By>>;
  where?: InputMaybe<Viewed_Enum_Bool_Exp>;
};


export type Query_RootViewed_Enum_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Viewed_Enum_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Viewed_Enum_Order_By>>;
  where?: InputMaybe<Viewed_Enum_Bool_Exp>;
};


export type Query_RootViewed_Enum_By_PkArgs = {
  enum: Scalars['String'];
};


export type Query_RootWishlistedArgs = {
  distinct_on?: InputMaybe<Array<Wishlisted_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Wishlisted_Order_By>>;
  where?: InputMaybe<Wishlisted_Bool_Exp>;
};


export type Query_RootWishlisted_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Wishlisted_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Wishlisted_Order_By>>;
  where?: InputMaybe<Wishlisted_Bool_Exp>;
};


export type Query_RootWishlisted_By_PkArgs = {
  id: Scalars['numeric'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "homes" */
  homes: Array<Homes>;
  /** fetch aggregated fields from the table: "homes" */
  homes_aggregate: Homes_Aggregate;
  /** fetch data from the table: "homes" using primary key columns */
  homes_by_pk?: Maybe<Homes>;
  /** fetch data from the table in a streaming manner: "homes" */
  homes_stream: Array<Homes>;
  /** An array relationship */
  user_homes: Array<User_Homes>;
  /** An aggregate relationship */
  user_homes_aggregate: User_Homes_Aggregate;
  /** fetch data from the table: "user_homes" using primary key columns */
  user_homes_by_pk?: Maybe<User_Homes>;
  /** fetch data from the table in a streaming manner: "user_homes" */
  user_homes_stream: Array<User_Homes>;
  /** fetch data from the table: "viewed_enum" */
  viewed_enum: Array<Viewed_Enum>;
  /** fetch aggregated fields from the table: "viewed_enum" */
  viewed_enum_aggregate: Viewed_Enum_Aggregate;
  /** fetch data from the table: "viewed_enum" using primary key columns */
  viewed_enum_by_pk?: Maybe<Viewed_Enum>;
  /** fetch data from the table in a streaming manner: "viewed_enum" */
  viewed_enum_stream: Array<Viewed_Enum>;
  /** fetch data from the table: "wishlisted" */
  wishlisted: Array<Wishlisted>;
  /** fetch aggregated fields from the table: "wishlisted" */
  wishlisted_aggregate: Wishlisted_Aggregate;
  /** fetch data from the table: "wishlisted" using primary key columns */
  wishlisted_by_pk?: Maybe<Wishlisted>;
  /** fetch data from the table in a streaming manner: "wishlisted" */
  wishlisted_stream: Array<Wishlisted>;
};


export type Subscription_RootHomesArgs = {
  distinct_on?: InputMaybe<Array<Homes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Homes_Order_By>>;
  where?: InputMaybe<Homes_Bool_Exp>;
};


export type Subscription_RootHomes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Homes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Homes_Order_By>>;
  where?: InputMaybe<Homes_Bool_Exp>;
};


export type Subscription_RootHomes_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootHomes_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Homes_Stream_Cursor_Input>>;
  where?: InputMaybe<Homes_Bool_Exp>;
};


export type Subscription_RootUser_HomesArgs = {
  distinct_on?: InputMaybe<Array<User_Homes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Homes_Order_By>>;
  where?: InputMaybe<User_Homes_Bool_Exp>;
};


export type Subscription_RootUser_Homes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Homes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Homes_Order_By>>;
  where?: InputMaybe<User_Homes_Bool_Exp>;
};


export type Subscription_RootUser_Homes_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootUser_Homes_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<User_Homes_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Homes_Bool_Exp>;
};


export type Subscription_RootViewed_EnumArgs = {
  distinct_on?: InputMaybe<Array<Viewed_Enum_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Viewed_Enum_Order_By>>;
  where?: InputMaybe<Viewed_Enum_Bool_Exp>;
};


export type Subscription_RootViewed_Enum_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Viewed_Enum_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Viewed_Enum_Order_By>>;
  where?: InputMaybe<Viewed_Enum_Bool_Exp>;
};


export type Subscription_RootViewed_Enum_By_PkArgs = {
  enum: Scalars['String'];
};


export type Subscription_RootViewed_Enum_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Viewed_Enum_Stream_Cursor_Input>>;
  where?: InputMaybe<Viewed_Enum_Bool_Exp>;
};


export type Subscription_RootWishlistedArgs = {
  distinct_on?: InputMaybe<Array<Wishlisted_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Wishlisted_Order_By>>;
  where?: InputMaybe<Wishlisted_Bool_Exp>;
};


export type Subscription_RootWishlisted_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Wishlisted_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Wishlisted_Order_By>>;
  where?: InputMaybe<Wishlisted_Bool_Exp>;
};


export type Subscription_RootWishlisted_By_PkArgs = {
  id: Scalars['numeric'];
};


export type Subscription_RootWishlisted_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Wishlisted_Stream_Cursor_Input>>;
  where?: InputMaybe<Wishlisted_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "user_homes" */
export type User_Homes = {
  __typename?: 'user_homes';
  hId: Scalars['Int'];
  /** An object relationship */
  home?: Maybe<Homes>;
  id: Scalars['Int'];
  type: Viewed_Enum_Enum;
  uid: Scalars['String'];
  /** An object relationship */
  viewed_enum?: Maybe<Viewed_Enum>;
};

/** aggregated selection of "user_homes" */
export type User_Homes_Aggregate = {
  __typename?: 'user_homes_aggregate';
  aggregate?: Maybe<User_Homes_Aggregate_Fields>;
  nodes: Array<User_Homes>;
};

export type User_Homes_Aggregate_Bool_Exp = {
  count?: InputMaybe<User_Homes_Aggregate_Bool_Exp_Count>;
};

export type User_Homes_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<User_Homes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<User_Homes_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "user_homes" */
export type User_Homes_Aggregate_Fields = {
  __typename?: 'user_homes_aggregate_fields';
  avg?: Maybe<User_Homes_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<User_Homes_Max_Fields>;
  min?: Maybe<User_Homes_Min_Fields>;
  stddev?: Maybe<User_Homes_Stddev_Fields>;
  stddev_pop?: Maybe<User_Homes_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Homes_Stddev_Samp_Fields>;
  sum?: Maybe<User_Homes_Sum_Fields>;
  var_pop?: Maybe<User_Homes_Var_Pop_Fields>;
  var_samp?: Maybe<User_Homes_Var_Samp_Fields>;
  variance?: Maybe<User_Homes_Variance_Fields>;
};


/** aggregate fields of "user_homes" */
export type User_Homes_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Homes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user_homes" */
export type User_Homes_Aggregate_Order_By = {
  avg?: InputMaybe<User_Homes_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<User_Homes_Max_Order_By>;
  min?: InputMaybe<User_Homes_Min_Order_By>;
  stddev?: InputMaybe<User_Homes_Stddev_Order_By>;
  stddev_pop?: InputMaybe<User_Homes_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<User_Homes_Stddev_Samp_Order_By>;
  sum?: InputMaybe<User_Homes_Sum_Order_By>;
  var_pop?: InputMaybe<User_Homes_Var_Pop_Order_By>;
  var_samp?: InputMaybe<User_Homes_Var_Samp_Order_By>;
  variance?: InputMaybe<User_Homes_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "user_homes" */
export type User_Homes_Arr_Rel_Insert_Input = {
  data: Array<User_Homes_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<User_Homes_On_Conflict>;
};

/** aggregate avg on columns */
export type User_Homes_Avg_Fields = {
  __typename?: 'user_homes_avg_fields';
  hId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "user_homes" */
export type User_Homes_Avg_Order_By = {
  hId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "user_homes". All fields are combined with a logical 'AND'. */
export type User_Homes_Bool_Exp = {
  _and?: InputMaybe<Array<User_Homes_Bool_Exp>>;
  _not?: InputMaybe<User_Homes_Bool_Exp>;
  _or?: InputMaybe<Array<User_Homes_Bool_Exp>>;
  hId?: InputMaybe<Int_Comparison_Exp>;
  home?: InputMaybe<Homes_Bool_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  type?: InputMaybe<Viewed_Enum_Enum_Comparison_Exp>;
  uid?: InputMaybe<String_Comparison_Exp>;
  viewed_enum?: InputMaybe<Viewed_Enum_Bool_Exp>;
};

/** unique or primary key constraints on table "user_homes" */
export enum User_Homes_Constraint {
  /** unique or primary key constraint on columns "id" */
  UserHomesPkey = 'user_homes_pkey'
}

/** input type for incrementing numeric columns in table "user_homes" */
export type User_Homes_Inc_Input = {
  hId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "user_homes" */
export type User_Homes_Insert_Input = {
  hId?: InputMaybe<Scalars['Int']>;
  home?: InputMaybe<Homes_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Viewed_Enum_Enum>;
  uid?: InputMaybe<Scalars['String']>;
  viewed_enum?: InputMaybe<Viewed_Enum_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type User_Homes_Max_Fields = {
  __typename?: 'user_homes_max_fields';
  hId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  uid?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "user_homes" */
export type User_Homes_Max_Order_By = {
  hId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  uid?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Homes_Min_Fields = {
  __typename?: 'user_homes_min_fields';
  hId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  uid?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "user_homes" */
export type User_Homes_Min_Order_By = {
  hId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  uid?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "user_homes" */
export type User_Homes_Mutation_Response = {
  __typename?: 'user_homes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Homes>;
};

/** on_conflict condition type for table "user_homes" */
export type User_Homes_On_Conflict = {
  constraint: User_Homes_Constraint;
  update_columns?: Array<User_Homes_Update_Column>;
  where?: InputMaybe<User_Homes_Bool_Exp>;
};

/** Ordering options when selecting data from "user_homes". */
export type User_Homes_Order_By = {
  hId?: InputMaybe<Order_By>;
  home?: InputMaybe<Homes_Order_By>;
  id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  uid?: InputMaybe<Order_By>;
  viewed_enum?: InputMaybe<Viewed_Enum_Order_By>;
};

/** primary key columns input for table: user_homes */
export type User_Homes_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "user_homes" */
export enum User_Homes_Select_Column {
  /** column name */
  HId = 'hId',
  /** column name */
  Id = 'id',
  /** column name */
  Type = 'type',
  /** column name */
  Uid = 'uid'
}

/** input type for updating data in table "user_homes" */
export type User_Homes_Set_Input = {
  hId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Viewed_Enum_Enum>;
  uid?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type User_Homes_Stddev_Fields = {
  __typename?: 'user_homes_stddev_fields';
  hId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "user_homes" */
export type User_Homes_Stddev_Order_By = {
  hId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type User_Homes_Stddev_Pop_Fields = {
  __typename?: 'user_homes_stddev_pop_fields';
  hId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "user_homes" */
export type User_Homes_Stddev_Pop_Order_By = {
  hId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type User_Homes_Stddev_Samp_Fields = {
  __typename?: 'user_homes_stddev_samp_fields';
  hId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "user_homes" */
export type User_Homes_Stddev_Samp_Order_By = {
  hId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "user_homes" */
export type User_Homes_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Homes_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Homes_Stream_Cursor_Value_Input = {
  hId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Viewed_Enum_Enum>;
  uid?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type User_Homes_Sum_Fields = {
  __typename?: 'user_homes_sum_fields';
  hId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "user_homes" */
export type User_Homes_Sum_Order_By = {
  hId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** update columns of table "user_homes" */
export enum User_Homes_Update_Column {
  /** column name */
  HId = 'hId',
  /** column name */
  Id = 'id',
  /** column name */
  Type = 'type',
  /** column name */
  Uid = 'uid'
}

export type User_Homes_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<User_Homes_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Homes_Set_Input>;
  /** filter the rows which have to be updated */
  where: User_Homes_Bool_Exp;
};

/** aggregate var_pop on columns */
export type User_Homes_Var_Pop_Fields = {
  __typename?: 'user_homes_var_pop_fields';
  hId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "user_homes" */
export type User_Homes_Var_Pop_Order_By = {
  hId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type User_Homes_Var_Samp_Fields = {
  __typename?: 'user_homes_var_samp_fields';
  hId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "user_homes" */
export type User_Homes_Var_Samp_Order_By = {
  hId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type User_Homes_Variance_Fields = {
  __typename?: 'user_homes_variance_fields';
  hId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "user_homes" */
export type User_Homes_Variance_Order_By = {
  hId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** columns and relationships of "viewed_enum" */
export type Viewed_Enum = {
  __typename?: 'viewed_enum';
  enum: Scalars['String'];
  type: Scalars['String'];
  /** An array relationship */
  user_homes: Array<User_Homes>;
  /** An aggregate relationship */
  user_homes_aggregate: User_Homes_Aggregate;
};


/** columns and relationships of "viewed_enum" */
export type Viewed_EnumUser_HomesArgs = {
  distinct_on?: InputMaybe<Array<User_Homes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Homes_Order_By>>;
  where?: InputMaybe<User_Homes_Bool_Exp>;
};


/** columns and relationships of "viewed_enum" */
export type Viewed_EnumUser_Homes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Homes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Homes_Order_By>>;
  where?: InputMaybe<User_Homes_Bool_Exp>;
};

/** aggregated selection of "viewed_enum" */
export type Viewed_Enum_Aggregate = {
  __typename?: 'viewed_enum_aggregate';
  aggregate?: Maybe<Viewed_Enum_Aggregate_Fields>;
  nodes: Array<Viewed_Enum>;
};

/** aggregate fields of "viewed_enum" */
export type Viewed_Enum_Aggregate_Fields = {
  __typename?: 'viewed_enum_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Viewed_Enum_Max_Fields>;
  min?: Maybe<Viewed_Enum_Min_Fields>;
};


/** aggregate fields of "viewed_enum" */
export type Viewed_Enum_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Viewed_Enum_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "viewed_enum". All fields are combined with a logical 'AND'. */
export type Viewed_Enum_Bool_Exp = {
  _and?: InputMaybe<Array<Viewed_Enum_Bool_Exp>>;
  _not?: InputMaybe<Viewed_Enum_Bool_Exp>;
  _or?: InputMaybe<Array<Viewed_Enum_Bool_Exp>>;
  enum?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  user_homes?: InputMaybe<User_Homes_Bool_Exp>;
  user_homes_aggregate?: InputMaybe<User_Homes_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "viewed_enum" */
export enum Viewed_Enum_Constraint {
  /** unique or primary key constraint on columns "enum" */
  ViewedEnumPkey = 'viewed_enum_pkey'
}

export enum Viewed_Enum_Enum {
  /** Contacted */
  Contacted = 'CONTACTED',
  /** RemovedFromWishlist */
  RemovedFromWishlist = 'REMOVED_FROM_WISHLIST',
  /** Viewed */
  Viewed = 'VIEWED',
  /** Wishlisted */
  Wishlisted = 'WISHLISTED'
}

/** Boolean expression to compare columns of type "viewed_enum_enum". All fields are combined with logical 'AND'. */
export type Viewed_Enum_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Viewed_Enum_Enum>;
  _in?: InputMaybe<Array<Viewed_Enum_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Viewed_Enum_Enum>;
  _nin?: InputMaybe<Array<Viewed_Enum_Enum>>;
};

/** input type for inserting data into table "viewed_enum" */
export type Viewed_Enum_Insert_Input = {
  enum?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  user_homes?: InputMaybe<User_Homes_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Viewed_Enum_Max_Fields = {
  __typename?: 'viewed_enum_max_fields';
  enum?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Viewed_Enum_Min_Fields = {
  __typename?: 'viewed_enum_min_fields';
  enum?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "viewed_enum" */
export type Viewed_Enum_Mutation_Response = {
  __typename?: 'viewed_enum_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Viewed_Enum>;
};

/** input type for inserting object relation for remote table "viewed_enum" */
export type Viewed_Enum_Obj_Rel_Insert_Input = {
  data: Viewed_Enum_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Viewed_Enum_On_Conflict>;
};

/** on_conflict condition type for table "viewed_enum" */
export type Viewed_Enum_On_Conflict = {
  constraint: Viewed_Enum_Constraint;
  update_columns?: Array<Viewed_Enum_Update_Column>;
  where?: InputMaybe<Viewed_Enum_Bool_Exp>;
};

/** Ordering options when selecting data from "viewed_enum". */
export type Viewed_Enum_Order_By = {
  enum?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  user_homes_aggregate?: InputMaybe<User_Homes_Aggregate_Order_By>;
};

/** primary key columns input for table: viewed_enum */
export type Viewed_Enum_Pk_Columns_Input = {
  enum: Scalars['String'];
};

/** select columns of table "viewed_enum" */
export enum Viewed_Enum_Select_Column {
  /** column name */
  Enum = 'enum',
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "viewed_enum" */
export type Viewed_Enum_Set_Input = {
  enum?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "viewed_enum" */
export type Viewed_Enum_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Viewed_Enum_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Viewed_Enum_Stream_Cursor_Value_Input = {
  enum?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

/** update columns of table "viewed_enum" */
export enum Viewed_Enum_Update_Column {
  /** column name */
  Enum = 'enum',
  /** column name */
  Type = 'type'
}

export type Viewed_Enum_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Viewed_Enum_Set_Input>;
  /** filter the rows which have to be updated */
  where: Viewed_Enum_Bool_Exp;
};

/** columns and relationships of "wishlisted" */
export type Wishlisted = {
  __typename?: 'wishlisted';
  hId: Scalars['numeric'];
  id: Scalars['numeric'];
};

/** aggregated selection of "wishlisted" */
export type Wishlisted_Aggregate = {
  __typename?: 'wishlisted_aggregate';
  aggregate?: Maybe<Wishlisted_Aggregate_Fields>;
  nodes: Array<Wishlisted>;
};

/** aggregate fields of "wishlisted" */
export type Wishlisted_Aggregate_Fields = {
  __typename?: 'wishlisted_aggregate_fields';
  avg?: Maybe<Wishlisted_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Wishlisted_Max_Fields>;
  min?: Maybe<Wishlisted_Min_Fields>;
  stddev?: Maybe<Wishlisted_Stddev_Fields>;
  stddev_pop?: Maybe<Wishlisted_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Wishlisted_Stddev_Samp_Fields>;
  sum?: Maybe<Wishlisted_Sum_Fields>;
  var_pop?: Maybe<Wishlisted_Var_Pop_Fields>;
  var_samp?: Maybe<Wishlisted_Var_Samp_Fields>;
  variance?: Maybe<Wishlisted_Variance_Fields>;
};


/** aggregate fields of "wishlisted" */
export type Wishlisted_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Wishlisted_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Wishlisted_Avg_Fields = {
  __typename?: 'wishlisted_avg_fields';
  hId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "wishlisted". All fields are combined with a logical 'AND'. */
export type Wishlisted_Bool_Exp = {
  _and?: InputMaybe<Array<Wishlisted_Bool_Exp>>;
  _not?: InputMaybe<Wishlisted_Bool_Exp>;
  _or?: InputMaybe<Array<Wishlisted_Bool_Exp>>;
  hId?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<Numeric_Comparison_Exp>;
};

/** unique or primary key constraints on table "wishlisted" */
export enum Wishlisted_Constraint {
  /** unique or primary key constraint on columns "id" */
  WishlistedPkey = 'wishlisted_pkey'
}

/** input type for incrementing numeric columns in table "wishlisted" */
export type Wishlisted_Inc_Input = {
  hId?: InputMaybe<Scalars['numeric']>;
  id?: InputMaybe<Scalars['numeric']>;
};

/** input type for inserting data into table "wishlisted" */
export type Wishlisted_Insert_Input = {
  hId?: InputMaybe<Scalars['numeric']>;
  id?: InputMaybe<Scalars['numeric']>;
};

/** aggregate max on columns */
export type Wishlisted_Max_Fields = {
  __typename?: 'wishlisted_max_fields';
  hId?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['numeric']>;
};

/** aggregate min on columns */
export type Wishlisted_Min_Fields = {
  __typename?: 'wishlisted_min_fields';
  hId?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['numeric']>;
};

/** response of any mutation on the table "wishlisted" */
export type Wishlisted_Mutation_Response = {
  __typename?: 'wishlisted_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Wishlisted>;
};

/** on_conflict condition type for table "wishlisted" */
export type Wishlisted_On_Conflict = {
  constraint: Wishlisted_Constraint;
  update_columns?: Array<Wishlisted_Update_Column>;
  where?: InputMaybe<Wishlisted_Bool_Exp>;
};

/** Ordering options when selecting data from "wishlisted". */
export type Wishlisted_Order_By = {
  hId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: wishlisted */
export type Wishlisted_Pk_Columns_Input = {
  id: Scalars['numeric'];
};

/** select columns of table "wishlisted" */
export enum Wishlisted_Select_Column {
  /** column name */
  HId = 'hId',
  /** column name */
  Id = 'id'
}

/** input type for updating data in table "wishlisted" */
export type Wishlisted_Set_Input = {
  hId?: InputMaybe<Scalars['numeric']>;
  id?: InputMaybe<Scalars['numeric']>;
};

/** aggregate stddev on columns */
export type Wishlisted_Stddev_Fields = {
  __typename?: 'wishlisted_stddev_fields';
  hId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Wishlisted_Stddev_Pop_Fields = {
  __typename?: 'wishlisted_stddev_pop_fields';
  hId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Wishlisted_Stddev_Samp_Fields = {
  __typename?: 'wishlisted_stddev_samp_fields';
  hId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "wishlisted" */
export type Wishlisted_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Wishlisted_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Wishlisted_Stream_Cursor_Value_Input = {
  hId?: InputMaybe<Scalars['numeric']>;
  id?: InputMaybe<Scalars['numeric']>;
};

/** aggregate sum on columns */
export type Wishlisted_Sum_Fields = {
  __typename?: 'wishlisted_sum_fields';
  hId?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['numeric']>;
};

/** update columns of table "wishlisted" */
export enum Wishlisted_Update_Column {
  /** column name */
  HId = 'hId',
  /** column name */
  Id = 'id'
}

export type Wishlisted_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Wishlisted_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Wishlisted_Set_Input>;
  /** filter the rows which have to be updated */
  where: Wishlisted_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Wishlisted_Var_Pop_Fields = {
  __typename?: 'wishlisted_var_pop_fields';
  hId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Wishlisted_Var_Samp_Fields = {
  __typename?: 'wishlisted_var_samp_fields';
  hId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Wishlisted_Variance_Fields = {
  __typename?: 'wishlisted_variance_fields';
  hId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

export type SearchHomesByLocationQueryVariables = Exact<{
  distinct_on?: InputMaybe<Array<Homes_Select_Column> | Homes_Select_Column>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Homes_Order_By> | Homes_Order_By>;
  where?: InputMaybe<Homes_Bool_Exp>;
}>;


export type SearchHomesByLocationQuery = { __typename?: 'query_root', homes: Array<{ __typename?: 'homes', id: number, lat?: any | null, lng?: any | null, style?: string | null, price?: any | null, status?: string | null }> };

export type SearchHomesByLocationDetailedQueryVariables = Exact<{
  distinct_on?: InputMaybe<Array<Homes_Select_Column> | Homes_Select_Column>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Homes_Order_By> | Homes_Order_By>;
  where?: InputMaybe<Homes_Bool_Exp>;
}>;


export type SearchHomesByLocationDetailedQuery = { __typename?: 'query_root', homes: Array<{ __typename?: 'homes', id: number, lat?: any | null, lng?: any | null, yearBuilt?: any | null, style?: string | null, address: string, bath?: any | null, beds?: any | null, price?: any | null, sqft?: any | null, plan?: any | null, imgs?: any | null, published?: boolean | null, status?: string | null, created_at: any, updated_at: any }> };

export type GetMyHomesQueryVariables = Exact<{
  distinct_on?: InputMaybe<Array<Homes_Select_Column> | Homes_Select_Column>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Homes_Order_By> | Homes_Order_By>;
  where?: InputMaybe<Homes_Bool_Exp>;
}>;


export type GetMyHomesQuery = { __typename?: 'query_root', homes: Array<{ __typename?: 'homes', id: number, address: string, bath?: any | null, beds?: any | null, price?: any | null, sqft?: any | null, plan?: any | null, imgs?: any | null, published?: boolean | null, status?: string | null }> };

export type GetHomeByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetHomeByIdQuery = { __typename?: 'query_root', homes_by_pk?: { __typename?: 'homes', price?: any | null, id: number, sqft?: any | null, bath?: any | null, beds?: any | null, address: string, style?: string | null, imgs?: any | null, published?: boolean | null } | null };

export type InsertUserHomeMutationVariables = Exact<{
  hId: Scalars['Int'];
  uid: Scalars['String'];
  type: Viewed_Enum_Enum;
}>;


export type InsertUserHomeMutation = { __typename?: 'mutation_root', insert_user_homes_one?: { __typename?: 'user_homes', id: number, type: Viewed_Enum_Enum, uid: string, hId: number } | null };

export type GetWishlistedHomesQueryVariables = Exact<{
  uid: Scalars['String'];
}>;


export type GetWishlistedHomesQuery = { __typename?: 'query_root', wishlisted: Array<{ __typename?: 'user_homes', id: number, hId: number }> };

export type GetWishlistedHomesDetailedQueryVariables = Exact<{
  uid: Scalars['String'];
}>;


export type GetWishlistedHomesDetailedQuery = { __typename?: 'query_root', wishlisted: Array<{ __typename?: 'user_homes', id: number, hId: number, home?: { __typename?: 'homes', address: string, price?: any | null, imgs?: any | null, bath?: any | null, beds?: any | null, sqft?: any | null } | null }> };

export type RemoveWishlistMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveWishlistMutation = { __typename?: 'mutation_root', update_user_homes_by_pk?: { __typename?: 'user_homes', id: number, hId: number } | null };

export type DeleteWishlistMutationVariables = Exact<{
  uid: Scalars['String'];
  hId: Scalars['Int'];
}>;


export type DeleteWishlistMutation = { __typename?: 'mutation_root', delete_user_homes?: { __typename?: 'user_homes_mutation_response', affected_rows: number } | null };

export type GetHomeQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetHomeQuery = { __typename?: 'query_root', homes_by_pk?: { __typename?: 'homes', uid: string, title?: string | null, address: string, bath?: any | null, beds?: any | null, city?: string | null, created_at: any, description?: string | null, features?: string | null, id: number, lat?: any | null, lng?: any | null, plan?: any | null, price?: any | null, sqft?: any | null, state?: string | null, style?: string | null, updated_at: any, yearBuilt?: any | null, zipcode?: string | null, imgs?: any | null, published?: boolean | null, status?: string | null } | null };

export type UpdateHomeMutationVariables = Exact<{
  id: Scalars['Int'];
  address: Scalars['String'];
  bath?: InputMaybe<Scalars['numeric']>;
  beds?: InputMaybe<Scalars['numeric']>;
  city?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  features?: InputMaybe<Scalars['String']>;
  imgs?: InputMaybe<Scalars['jsonb']>;
  lat?: InputMaybe<Scalars['numeric']>;
  lng?: InputMaybe<Scalars['numeric']>;
  plan?: InputMaybe<Scalars['numeric']>;
  price?: InputMaybe<Scalars['numeric']>;
  sqft?: InputMaybe<Scalars['numeric']>;
  state?: InputMaybe<Scalars['String']>;
  style?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  published?: InputMaybe<Scalars['Boolean']>;
  yearBuilt?: InputMaybe<Scalars['numeric']>;
  zipcode?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
}>;


export type UpdateHomeMutation = { __typename?: 'mutation_root', update_homes_by_pk?: { __typename?: 'homes', title?: string | null, address: string, bath?: any | null, beds?: any | null, city?: string | null, description?: string | null, features?: string | null, imgs?: any | null, lat?: any | null, lng?: any | null, plan?: any | null, price?: any | null, sqft?: any | null, state?: string | null, style?: string | null, yearBuilt?: any | null, zipcode?: string | null, status?: string | null, published?: boolean | null } | null };

export type InsertHomeMutationVariables = Exact<{
  object: Homes_Insert_Input;
}>;


export type InsertHomeMutation = { __typename?: 'mutation_root', insert_homes_one?: { __typename?: 'homes', title?: string | null, address: string, bath?: any | null, beds?: any | null, city?: string | null, created_at: any, description?: string | null, features?: string | null, id: number, lat?: any | null, lng?: any | null, price?: any | null, plan?: any | null, sqft?: any | null, published?: boolean | null, state?: string | null, style?: string | null, updated_at: any, yearBuilt?: any | null, zipcode?: string | null, status?: string | null } | null };

export type SetHomePlanMutationVariables = Exact<{
  id: Scalars['Int'];
  plan?: InputMaybe<Scalars['numeric']>;
}>;


export type SetHomePlanMutation = { __typename?: 'mutation_root', update_homes_by_pk?: { __typename?: 'homes', plan?: any | null } | null };

export type SetHomePublishedMutationVariables = Exact<{
  id: Scalars['Int'];
  published?: InputMaybe<Scalars['Boolean']>;
}>;


export type SetHomePublishedMutation = { __typename?: 'mutation_root', update_homes_by_pk?: { __typename?: 'homes', published?: boolean | null } | null };

export const namedOperations = {
  Query: {
    SearchHomesByLocation: 'SearchHomesByLocation',
    SearchHomesByLocationDetailed: 'SearchHomesByLocationDetailed',
    GetMyHomes: 'GetMyHomes',
    GetHomeById: 'GetHomeById',
    GetWishlistedHomes: 'GetWishlistedHomes',
    GetWishlistedHomesDetailed: 'GetWishlistedHomesDetailed',
    GetHome: 'GetHome'
  },
  Mutation: {
    InsertUserHome: 'InsertUserHome',
    RemoveWishlist: 'RemoveWishlist',
    DeleteWishlist: 'DeleteWishlist',
    UpdateHome: 'UpdateHome',
    InsertHome: 'InsertHome',
    SetHomePlan: 'SetHomePlan',
    SetHomePublished: 'SetHomePublished'
  }
}

export const SearchHomesByLocationDocument = /*#__PURE__*/ gql`
    query SearchHomesByLocation($distinct_on: [homes_select_column!], $limit: Int, $offset: Int, $order_by: [homes_order_by!], $where: homes_bool_exp) {
  homes(
    distinct_on: $distinct_on
    limit: $limit
    offset: $offset
    order_by: $order_by
    where: $where
  ) {
    id
    lat
    lng
    style
    price
    status
  }
}
    `;

export function useSearchHomesByLocationQuery(options?: Omit<Urql.UseQueryArgs<SearchHomesByLocationQueryVariables>, 'query'>) {
  return Urql.useQuery<SearchHomesByLocationQuery, SearchHomesByLocationQueryVariables>({ query: SearchHomesByLocationDocument, ...options });
};
export const SearchHomesByLocationDetailedDocument = /*#__PURE__*/ gql`
    query SearchHomesByLocationDetailed($distinct_on: [homes_select_column!], $limit: Int, $offset: Int, $order_by: [homes_order_by!], $where: homes_bool_exp) {
  homes(
    distinct_on: $distinct_on
    limit: $limit
    offset: $offset
    order_by: $order_by
    where: $where
  ) {
    id
    lat
    lng
    yearBuilt
    style
    address
    bath
    beds
    price
    sqft
    plan
    imgs
    published
    status
    created_at
    updated_at
  }
}
    `;

export function useSearchHomesByLocationDetailedQuery(options?: Omit<Urql.UseQueryArgs<SearchHomesByLocationDetailedQueryVariables>, 'query'>) {
  return Urql.useQuery<SearchHomesByLocationDetailedQuery, SearchHomesByLocationDetailedQueryVariables>({ query: SearchHomesByLocationDetailedDocument, ...options });
};
export const GetMyHomesDocument = /*#__PURE__*/ gql`
    query GetMyHomes($distinct_on: [homes_select_column!], $limit: Int, $offset: Int, $order_by: [homes_order_by!], $where: homes_bool_exp) {
  homes(
    distinct_on: $distinct_on
    limit: $limit
    offset: $offset
    order_by: $order_by
    where: $where
  ) {
    id
    address
    bath
    beds
    price
    sqft
    plan
    imgs
    published
    status
  }
}
    `;

export function useGetMyHomesQuery(options?: Omit<Urql.UseQueryArgs<GetMyHomesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetMyHomesQuery, GetMyHomesQueryVariables>({ query: GetMyHomesDocument, ...options });
};
export const GetHomeByIdDocument = /*#__PURE__*/ gql`
    query GetHomeById($id: Int!) {
  homes_by_pk(id: $id) {
    price
    id
    sqft
    bath
    beds
    address
    style
    imgs
    published
  }
}
    `;

export function useGetHomeByIdQuery(options: Omit<Urql.UseQueryArgs<GetHomeByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetHomeByIdQuery, GetHomeByIdQueryVariables>({ query: GetHomeByIdDocument, ...options });
};
export const InsertUserHomeDocument = /*#__PURE__*/ gql`
    mutation InsertUserHome($hId: Int!, $uid: String!, $type: viewed_enum_enum!) {
  insert_user_homes_one(
    object: {hId: $hId, uid: $uid, type: $type}
    on_conflict: {constraint: user_homes_pkey, update_columns: [hId, type]}
  ) {
    id
    type
    uid
    hId
  }
}
    `;

export function useInsertUserHomeMutation() {
  return Urql.useMutation<InsertUserHomeMutation, InsertUserHomeMutationVariables>(InsertUserHomeDocument);
};
export const GetWishlistedHomesDocument = /*#__PURE__*/ gql`
    query GetWishlistedHomes($uid: String!) {
  wishlisted: user_homes(where: {uid: {_eq: $uid}, type: {_eq: WISHLISTED}}) {
    id
    hId
  }
}
    `;

export function useGetWishlistedHomesQuery(options: Omit<Urql.UseQueryArgs<GetWishlistedHomesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetWishlistedHomesQuery, GetWishlistedHomesQueryVariables>({ query: GetWishlistedHomesDocument, ...options });
};
export const GetWishlistedHomesDetailedDocument = /*#__PURE__*/ gql`
    query GetWishlistedHomesDetailed($uid: String!) {
  wishlisted: user_homes(where: {uid: {_eq: $uid}, type: {_eq: WISHLISTED}}) {
    id
    hId
    home {
      address
      price
      imgs
      bath
      beds
      sqft
    }
  }
}
    `;

export function useGetWishlistedHomesDetailedQuery(options: Omit<Urql.UseQueryArgs<GetWishlistedHomesDetailedQueryVariables>, 'query'>) {
  return Urql.useQuery<GetWishlistedHomesDetailedQuery, GetWishlistedHomesDetailedQueryVariables>({ query: GetWishlistedHomesDetailedDocument, ...options });
};
export const RemoveWishlistDocument = /*#__PURE__*/ gql`
    mutation RemoveWishlist($id: Int!) {
  update_user_homes_by_pk(
    pk_columns: {id: $id}
    _set: {type: REMOVED_FROM_WISHLIST}
  ) {
    id
    hId
  }
}
    `;

export function useRemoveWishlistMutation() {
  return Urql.useMutation<RemoveWishlistMutation, RemoveWishlistMutationVariables>(RemoveWishlistDocument);
};
export const DeleteWishlistDocument = /*#__PURE__*/ gql`
    mutation DeleteWishlist($uid: String!, $hId: Int!) {
  delete_user_homes(where: {uid: {_eq: $uid}, hId: {_eq: $hId}}) {
    affected_rows
  }
}
    `;

export function useDeleteWishlistMutation() {
  return Urql.useMutation<DeleteWishlistMutation, DeleteWishlistMutationVariables>(DeleteWishlistDocument);
};
export const GetHomeDocument = /*#__PURE__*/ gql`
    query GetHome($id: Int!) {
  homes_by_pk(id: $id) {
    uid
    title
    address
    bath
    beds
    city
    created_at
    description
    features
    id
    lat
    lng
    plan
    price
    sqft
    state
    style
    updated_at
    yearBuilt
    zipcode
    imgs
    published
    status
  }
}
    `;

export function useGetHomeQuery(options: Omit<Urql.UseQueryArgs<GetHomeQueryVariables>, 'query'>) {
  return Urql.useQuery<GetHomeQuery, GetHomeQueryVariables>({ query: GetHomeDocument, ...options });
};
export const UpdateHomeDocument = /*#__PURE__*/ gql`
    mutation UpdateHome($id: Int!, $address: String!, $bath: numeric, $beds: numeric, $city: String, $description: String, $features: String, $imgs: jsonb, $lat: numeric, $lng: numeric, $plan: numeric, $price: numeric, $sqft: numeric, $state: String, $style: String, $title: String, $published: Boolean, $yearBuilt: numeric, $zipcode: String, $status: String) {
  update_homes_by_pk(
    pk_columns: {id: $id}
    _set: {address: $address, bath: $bath, beds: $beds, city: $city, description: $description, features: $features, imgs: $imgs, lat: $lat, lng: $lng, plan: $plan, price: $price, sqft: $sqft, state: $state, style: $style, title: $title, yearBuilt: $yearBuilt, zipcode: $zipcode, published: $published, status: $status}
  ) {
    title
    address
    bath
    beds
    city
    description
    features
    imgs
    lat
    lng
    plan
    price
    sqft
    state
    style
    yearBuilt
    zipcode
    status
    published
  }
}
    `;

export function useUpdateHomeMutation() {
  return Urql.useMutation<UpdateHomeMutation, UpdateHomeMutationVariables>(UpdateHomeDocument);
};
export const InsertHomeDocument = /*#__PURE__*/ gql`
    mutation InsertHome($object: homes_insert_input!) {
  insert_homes_one(object: $object) {
    title
    address
    bath
    beds
    city
    created_at
    description
    features
    id
    lat
    lng
    price
    plan
    sqft
    published
    state
    style
    updated_at
    yearBuilt
    zipcode
    status
  }
}
    `;

export function useInsertHomeMutation() {
  return Urql.useMutation<InsertHomeMutation, InsertHomeMutationVariables>(InsertHomeDocument);
};
export const SetHomePlanDocument = /*#__PURE__*/ gql`
    mutation SetHomePlan($id: Int!, $plan: numeric) {
  update_homes_by_pk(pk_columns: {id: $id}, _set: {plan: $plan}) {
    plan
  }
}
    `;

export function useSetHomePlanMutation() {
  return Urql.useMutation<SetHomePlanMutation, SetHomePlanMutationVariables>(SetHomePlanDocument);
};
export const SetHomePublishedDocument = /*#__PURE__*/ gql`
    mutation SetHomePublished($id: Int!, $published: Boolean) {
  update_homes_by_pk(pk_columns: {id: $id}, _set: {published: $published}) {
    published
  }
}
    `;

export function useSetHomePublishedMutation() {
  return Urql.useMutation<SetHomePublishedMutation, SetHomePublishedMutationVariables>(SetHomePublishedDocument);
};