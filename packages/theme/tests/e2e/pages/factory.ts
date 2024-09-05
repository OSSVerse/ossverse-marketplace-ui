import Category from './category';
import { Billing, Payment, Shipping, ThankYou, CheckOut } from './checkout';
import Home from './home';
import Product from './product';
import search from './search';
import cart from './cart';

const page = {
  get cart() {
    return cart;
  },
  get category() {
    return Category;
  },
  get checkout() {
    return {
      shipping: new Shipping(),
      billing: new Billing(),
      payment: new Payment(),
      thankyou: new ThankYou(),
      checkOut: new CheckOut()
    };
  },
  get home() {
    return Home;
  },
  get product() {
    return Product;
  },
  get search() {
    return search;
  }
};

export default page;
