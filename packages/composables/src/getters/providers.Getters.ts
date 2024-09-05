import {
  AgnosticAttribute
} from '@vue-storefront/core';
import { Product, ProviderVariant, bppDescriptor } from '../types';

// TODO: Add interfaces for some of the methods in core
// Provider

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProviderName = (provider: ProviderVariant): string => provider?.descriptor?.name || 'Provider\'s name';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProviderCode = (provider: ProviderVariant): string => provider?.descriptor?.code || 'Provider\'s code';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProviderImages = (provider: ProviderVariant): string[] => provider?.descriptor?.images || [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProviderBpp = (bpp: bppDescriptor): string => bpp?.name;

export const getProvidersFromSearch = (bpps: Array<any>): Array<ProviderVariant> => {
  const data = [];
  bpps.map((bpp) => {
    return bpp.bpp_providers.map((obj) => {
      data.push(obj);
      return obj;
    });
  });
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
//   export const getProviderFiltered = (providers: ProviderVariant[], filters: ProviderVariantFilters | any = {}): ProviderVariant[] => {
//     return [
//       {
//         _id: 1,
//         _description: 'Some description',
//         _categoriesRef: [
//           '1',
//           '2'
//         ],
//         name: 'Black jacket',
//         sku: 'black-jacket',
//         images: [
//           'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/providers/081223_1_large.jpg'
//         ],
//         price: {
//           original: 12.34,
//           current: 10.00
//         }
//       },
//       {
//         _id: 2,
//         _description: 'Some different description',
//         _categoriesRef: [
//           '1',
//           '2',
//           '3'
//         ],
//         name: 'White shirt',
//         sku: 'white-shirt',
//         images: [
//           'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/providers/081223_1_large.jpg'
//         ],
//         price: {
//           original: 15.11,
//           current: 11.00
//         }
//       }
//     ];
//   };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProviderAttributes = (providers: ProviderVariant[] | ProviderVariant, filterByAttributeName?: string[]): Record<string, AgnosticAttribute | string> => {
  return {};
};

export const getProviderShortDescription = (provider: ProviderVariant): any => provider?.descriptor?.short_desc || 'Provider\'s short';

export const getProviderLongDescription = (provider: ProviderVariant): any => provider?.descriptor?.long_desc || 'Provider\'s long';

export const getProviderSymbol = (provider: ProviderVariant): any => provider?.descriptor?.symbol || 'Provider\'s symbol';

export const getProviderAudio = (provider: ProviderVariant): any => provider?.audio || 'Provider\'s Audio';

export const getProviderRender3D = (provider: ProviderVariant): any => provider?.render3d || 'Provider\'s render3d';

//   export const getProviderCategories = (provider: ProviderVariant): string[] => (provider as any)?._categoriesRef || '';

export const getProviderId = (provider: ProviderVariant): string => (provider as any)?.id || '';

export const getProducts = (provider: ProviderVariant): Product[] => (provider as any)?.items || [];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProviderDistance = (provider: ProviderVariant): any => '8.1';

const providerGetters = {
  getProviderName: getProviderName,
  getProviderCode: getProviderCode,
  getProviderImages: getProviderImages,
  getProvidersFromSearch: getProvidersFromSearch,
  // getProviderFiltered:getProviderFiltered,
  getProviderAttributes: getProviderAttributes,
  getProviderShortDescription: getProviderShortDescription,
  getProviderLongDescription: getProviderLongDescription,
  getProviderSymbol: getProviderSymbol,
  getProviderAudio: getProviderAudio,
  getProviderRender3D: getProviderRender3D,
  // getProviderCategories:getProviderCategories,
  getProviderId: getProviderId,
  getProducts: getProducts,
  getProviderDistance: getProviderDistance,
  getProviderBpp: getProviderBpp
};

export default providerGetters;
