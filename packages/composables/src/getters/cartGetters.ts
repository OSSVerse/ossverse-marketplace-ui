import {
  CartGetters,
  AgnosticPrice,
  AgnosticTotals,
  AgnosticCoupon,
  AgnosticDiscount
} from '@vue-storefront/core';
import { Cart, LineItem } from '@vue-storefront/beckn-api/src/types';
import productGetters from './productGetters';
import providerGetters from './providers.Getters';
import { Cart as CartType } from '../useCart';
import { BppType, CartProduct, Product, ProviderVariant } from '../types';

export const getCartItems = (cart: CartType): LineItem[] => cart?.items || [];

export const getBppProvider = (product: CartProduct): BppType => {
  return product?.bppProvider || null;
};

export const getBppProviderName = (product: CartProduct): string => {
  return getBppProvider(product)?.descriptor?.name || '';
};

// export const getBpp = (cart: CartType) => {
//   return cart?.bpp?.descriptor?.name || null;
// };

export const getCartItemName = (product: CartProduct): string =>
  // eslint-disable-next-line quotes
  productGetters.getName(product) || "Product's name";

export const getCartItemImage = (product: CartProduct): string =>
  productGetters.getGallery(product)[0].small[0] ||
  'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg';

export const getCartItemPrice = (product: CartProduct): AgnosticPrice => {
  return productGetters.getPrice(product);
};

export const getProviderImage = (provider: ProviderVariant): string =>
  providerGetters.getProviderImages(provider)[0] || '';

export const getItemQty = (product: CartProduct): number =>
  product?.quantity || 0;

// export const getMeasureValue = (product: any): string =>
//   product?.measure?.value;

// export const getMeasureUnit = (product: any): string => product?.measure?.unit;

export const getCartItemAttributes = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  product: LineItem,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  filterByAttributeName?: Array<string>
): any => ({ color: 'red' });

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getCartItemSku = (product: any): string =>
  product?.sku || 'some-sku';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartTotals = (cart: CartType): AgnosticTotals => {
  const totalPrice: number = cart?.totalPrice || 0;
  return {
    total: totalPrice,
    subtotal: 10
  };
};

export const getQuoteBreakup = (cart: CartType): AgnosticTotals => {
  return cart?.quote?.breakup;
};

export const getQuoteItem = (cart: CartType): AgnosticTotals => {
  return cart?.quoteItem;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCartShippingPrice = (cart: Cart): number => 0;

export const getCartTotalItems = (cart: CartType): number => {
  return cart?.totalItems || 0;
};

export const getFormattedPrice = (price: number): string => String(price);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCoupons = (cart: Cart): AgnosticCoupon[] => [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getDiscounts = (cart: Cart): AgnosticDiscount[] => [];

export const getUpdatedPrice = (product: CartProduct): number =>
  parseFloat(product.updatedPrice) ?? null;

export const getUpdatedCount = (product: CartProduct): number =>
  product.updatedCount ?? null;

/**
 * Returns the cart item with additional fields formatted for sending in api requests.
 * @param item Cart Prodcut item
 */
const getCartItemFormatted = (item: CartProduct) => {
  const bppId = item.bpp.id;
  const providerId = item.bppProvider.id;
  const cartItemFormatted = {
    ...item,
    id: item.id,
    quantity: { count: item.quantity },
    // eslint-disable-next-line camelcase
    bpp_id: bppId,
    bppProvider: item.bppProvider,
    provider: {
      id: providerId,
      locations: [item.location_id]
    }
  };

  return cartItemFormatted;
};

/**
 * Returns an object which contains cart items mapped as per bppId
 * Similar to the below structure:
 * {
 *  [bppId]:[
 *     { // item1 of bppid },
 *     { // item2 of bppid },
 *   ],
 * }
 * @param cart Cart Object
 */
export const getCartItemsPerBpp = (cart: CartType): any => {
  const itemsPerBpp = {};

  cart.items.map((item) => {
    const bppId = item.bpp.id;
    const cartItem = getCartItemFormatted(item);
    if (itemsPerBpp[bppId]) {
      itemsPerBpp[bppId].push(cartItem);
    } else {
      itemsPerBpp[bppId] = [cartItem];
    }
  });

  return itemsPerBpp;
};

/**
 * Returns an object which contains cart items mapped as per bppId and for each bpp provider
 * Similar to the below structure:
 * {
 *  [bppId]: {
 *    [providerId]: [
 *      { // item1 of bppid and providerId },
 *      { // item2 of bppid and providerId },
 *    ]
 *  },
 * }
 * @param cart Cart Object
 */
const getCartItemsPerBppPerProvider = (cart: CartType): any => {
  const itemsPerBppPerProvider = {};

  cart.items.map((item) => {
    const bppId = item.bpp.id;
    const providerId = item.bppProvider.id;
    const cartItem = getCartItemFormatted(item);

    if (itemsPerBppPerProvider[bppId]) {
      if (itemsPerBppPerProvider[bppId][providerId]) {
        itemsPerBppPerProvider[bppId][providerId].push(cartItem);
      } else {
        itemsPerBppPerProvider[bppId][providerId] = [cartItem];
      }
    } else {
      itemsPerBppPerProvider[bppId] = {
        [providerId]: [cartItem]
      };
    }
  });

  return itemsPerBppPerProvider;
};

const cartGetters: CartGetters<Cart, LineItem> = {
  getTotals: getCartTotals,
  getShippingPrice: getCartShippingPrice,
  getItems: getCartItems,
  getItemName: getCartItemName,
  getItemImage: getCartItemImage,
  getItemPrice: getCartItemPrice,
  getItemQty,
  getItemAttributes: getCartItemAttributes,
  getItemSku: getCartItemSku,
  getFormattedPrice: getFormattedPrice,
  getTotalItems: getCartTotalItems,
  getCoupons,
  getDiscounts,
  getBppProvider,
  getBppProviderName,
  getProviderImage,
  getUpdatedPrice,
  getUpdatedCount,
  getQuoteBreakup,
  getQuoteItem,
  getCartItemsPerBpp,
  getCartItemsPerBppPerProvider
};

export default cartGetters;
