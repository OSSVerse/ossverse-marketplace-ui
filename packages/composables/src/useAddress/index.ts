type Address = {
  name: string;
  mobile: string,
  building: string;
  landmark: string;
  city: string | null;
  state: string | null;
  pincode: number | null;
  valid: boolean;
  address: string;
};

const useAddress = () => {

  const getBillngAddress = (): Address => {
    try {
      const addressLocal: Address = JSON.parse(localStorage.getItem('billing_address'));
      const address: Address = {
        name: '',
        mobile: '',
        building: '',
        landmark: '',
        city: '',
        state: '',
        pincode: null,
        valid: false,
        address: ''
      };
      return { ...address, ...addressLocal };
      return address;
    } catch (error) {
      return {
        name: '',
        mobile: '',
        building: '',
        landmark: '',
        city: '',
        state: '',
        pincode: null,
        valid: false,
        address: ''
      };
    }
  };

  const getShippingAddress = (): Address => {
    try {
      const addressLocal: Address = JSON.parse(localStorage.getItem('shipping_address'));
      const address: Address = {
        name: '',
        mobile: '',
        building: '',
        landmark: '',
        city: '',
        state: '',
        pincode: null,
        valid: false,
        address: ''
      };
      return { ...address, ...addressLocal };
    } catch (error) {
      return {
        name: '',
        mobile: '',
        building: '',
        landmark: '',
        city: '',
        state: '',
        pincode: null,
        valid: false,
        address: ''
      };
    }
  };

  const setBillingAddress = (address: Address) => {

    localStorage.setItem('billing_address', JSON.stringify(address));
  };

  const setShippingAddress = (address: Address) => {

    localStorage.setItem('shipping_address', JSON.stringify(address));
  };

  return {
    getBillngAddress,
    getShippingAddress,
    setBillingAddress,
    setShippingAddress
  };
};

export default useAddress;
