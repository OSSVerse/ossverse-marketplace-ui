/* eslint camelcase: 0 */

import { AckResponse } from '@vue-storefront/beckn-api';
import { FacetSearchResult } from '@vue-storefront/core';

export { UseCategory, UseProduct } from '@vue-storefront/core';

export type Address = Record<string, unknown>;

export type Category = Record<string, unknown>;

export type User = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

export type UserAddress = Record<string, unknown>;

export type Cart = Record<string, unknown>;

export type CartItem = Record<string, unknown>;

export type Coupon = Record<string, unknown>;

export type Order = Record<string, unknown>;

export type OrderItem = Record<string, unknown>;

export type Review = Record<string, unknown>;

export type Shipping = Record<string, unknown>;

export type ShippingMethod = Record<string, unknown>;

export type WishlistProduct = Record<string, unknown>;

export type Wishlist = Record<string, unknown>;

export type OrderSearchParams = Record<string, any>;

export type OrdersResponse = {
  data: any[];
  total: number;
};

export interface FacetResultsData {
  ackResponse: AckResponse;
}
export interface OnSearchParam {
  message_id: string;
  limit?: number;
  skip?: number;
}

export type SearchData = FacetSearchResult<FacetResultsData>;

export type ProductPrice = {
  currency: string;
  value: string;
  estimated_value?: number;
  computed_value?: number;
  listed_value?: number;
  offered_value?: number;
  minimum_value?: number;
  maximum_value?: number;
};

export type ProductDescriptor = {
  name: string;
  code: string;
  symbol: string;
  short_des: string;
  long_desc: string;
  images: string;
  audio: string;
  renderd?: string;
};

export type Product = {
  id: string;
  // eslint-disable-next-line
  parent_item_id: string;
  // eslint-disable-next-line
  categry_id: string;
  // eslint-disable-next-line
  location_id: string;
  time: string;
  descriptor: ProductDescriptor;
  price: ProductPrice;
  matched: string;
  related: string;
  recommended: boolean;
  tags?: string[];
};

export type BppDescriptor = {
  images: string[];
  name: string;
  short_desc: string;
};

export type BppType = {
  id: string;
  descriptor: BppDescriptor;
};

export type CartProduct = Product & {
  quantity: number;
  bpp: BppType;
  bppProvider: BppType;
  updatedPrice?: string;
  updatedCount?: number;
};

export type ProviderDescriptor = {
  name: string;
  code: string;
  symbol?: string;
  short_desc?: string;
  long_desc?: string;
  images?: string[];
};

export type ProviderVariant = {
  id: string;
  descriptor: ProviderDescriptor;
  categories: string;
  items: Product[];
  audio: string;
  render3d?: string;
};

export type bppDescriptor = {
  name: string;
  code: string;
  symbol?: string;
  short_desc?: string;
  long_desc?: string;
  images?: string[];
};

export type ProductsResponse = {
  data: Product[];
  total: number;
};

// {
//   "id": "./retail.kirana/ind.blr/pooja-stores.brown-bread-400gm@lrdn.bpp.shopez.com.item",
//   "parent_item_id": null,
//   "descriptor": {
//       "name": "Brown Bread 400 gm",
//       "code": null,
//       "symbol": null,
//       "short_desc": null,
//       "long_desc": null,
//       "images": null,
//       "audio": null,
//       "3d_render": null
//   },
//   "price": {
//       "currency": "INR",
//       "value": "40",
//       "estimated_value": null,
//       "computed_value": null,
//       "listed_value": null,
//       "offered_value": null,
//       "minimum_value": null,
//       "maximum_value": null
//   },
//   "category_id": "./local-retail.kirana/ind.blr/pooja-stores.breads@lrdn.bpp.shopx.com.provider_category",
//   "location_id": "./retail.kirana/ind.blr/pooja-stores.koramangala-4th-block@lrdn.bpp.shopez.com.provider_location",
//   "time": null,
//   "matched": true,
//   "related": null,
//   "recommended": true,
//   "tags": null
// },
