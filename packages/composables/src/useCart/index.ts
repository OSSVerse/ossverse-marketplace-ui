/* istanbul ignore file */

import { useCartFactory } from '@vue-storefront/core';
import { Context } from 'node:vm';
import { CartProduct, Product } from '../types';
import productGetters from '../getters/productGetters';

export type Coupon = Record<string, unknown>;

export type Cart = {
  items: CartProduct[];
  totalPrice: number;
  totalItems: number;
  cartTime: string;
  quote: any;
  quoteItem: any;
};

const cartSample = {
  items: [],
  totalPrice: 0,
  totalItems: 0,
  cartTime: null,
  quote: null,
  quoteItem: {}
};

const params = {
  load: async () => {
    let cartData = { ...cartSample };
    if (localStorage.getItem('cartData')) {
      cartData = JSON.parse(localStorage.getItem('cartData'));
    } else {
      localStorage.setItem('cartData', JSON.stringify(cartData));
    }
    return cartData;
  },

  addItem: async (
    context: Context,
    { currentCart, product, quantity, customQuery }
  ) => {
    if (customQuery.clearCart) {
      localStorage.removeItem('cartData');
      currentCart = {
        items: [],
        totalPrice: 0,
        totalItems: 0,
        cartTime: null,
        quote: null,
        quoteItem: {}
      };
    }

    const price = productGetters.getPrice(product).regular;

    const exisitingIndex = currentCart.items.findIndex(
      (p) => p.id === product.id
    );

    if (exisitingIndex !== -1) {
      const oldQuantity = currentCart.items[exisitingIndex].quantity;
      const quantityDiff = quantity - oldQuantity;
      const priceDifference = quantityDiff * price;

      currentCart.totalPrice += priceDifference;
      currentCart.totalItems += quantityDiff;
      currentCart.items[exisitingIndex].quantity = quantity;
      currentCart.cartTime = new Date();
      if (quantity === 0) {
        currentCart.items.splice(exisitingIndex, 1);
        if (currentCart.totalItems === 0) {
          currentCart.cartTime = null;
          currentCart.quote = null;
          currentCart.quoteItem = {};
        }
      }
    } else {
      product = {
        quantity,
        ...product,
        bpp: customQuery.bpp,
        bppProvider: customQuery.bppProvider,
        locations: customQuery.locations
      };
      const priceDifference = quantity * price;

      currentCart.totalPrice += priceDifference;
      currentCart.totalItems += quantity;
      currentCart.items.push(product);
      currentCart.cartTime = new Date();
    }

    if (!currentCart.quoteItem) {
      currentCart.quoteItem = {};
    }

    localStorage.setItem('cartData', JSON.stringify(currentCart));
    return { ...currentCart };
  },

  removeItem: async (
    context: Context,
    { currentCart, product, customQuery }
  ) => {
    console.log('Mocked: removeFromCart');
    return currentCart;
  },

  updateItemQty: async (
    context: Context,
    { currentCart, product, quantity, customQuery }
  ) => {
    console.log('Mocked: updateQuantity');
    return currentCart;
  },

  clear: async (context: Context, { currentCart }) => {
    localStorage.removeItem('cartData');
    currentCart = {
      items: [],
      totalPrice: 0,
      totalItems: 0,
      cartTime: null,
      quote: {}
    };
    return currentCart;
  },

  applyCoupon: async (
    context: Context,
    { currentCart, couponCode, customQuery }
  ) => {
    console.log('Mocked: applyCoupon');
    return { updatedCart: currentCart, updatedCoupon: currentCart };
  },

  removeCoupon: async (
    context: Context,
    { currentCart, coupon, customQuery }
  ) => {
    console.log('Mocked: removeCoupon');
    return { updatedCart: currentCart };
  },

  isInCart: (context: Context, { currentCart, product }) => {
    const exisiting = currentCart?.items.find((p) => p.id === product.id);
    if (exisiting) {
      return exisiting;
    }
    return false;
  }
};

export default useCartFactory<Cart, CartProduct, Product, Coupon>(params);
