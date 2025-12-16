import { RAZORPAY_KEY_ID } from '../config/razorpay.js';
import loadRazorpay from '../utils/loadRazorpay.js';

const startPayment = async ({ amount, name, description }) => {
  // Guard: keys not yet added
  if (!RAZORPAY_KEY_ID) {
    alert('Payment gateway is not live yet.');
    return;
  }

  const isLoaded = await loadRazorpay();
  if (!isLoaded) {
    alert('Razorpay SDK failed to load.');
    return;
  }

  const options = {
    key: RAZORPAY_KEY_ID,
    amount: amount * 100, // paise
    currency: 'INR',
    name,
    description,
    handler: function (response) {
      console.log('Payment success:', response);
      alert('Payment Successful!');
    },
    theme: {
      color: '#1e40af',
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};

export default startPayment;
