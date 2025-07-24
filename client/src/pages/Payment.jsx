import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Lock, 
  Shield, 
  ArrowLeft, 
  Check, 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign,
  AlertCircle,
  Eye,
  EyeOff,
  Smartphone,
  Wallet,
  Building2
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get booking data from navigation state or props
  const bookingData = location.state?.bookingData || {
    trip: {
      title: "Magical Bali Adventure",
      location: "Bali, Indonesia",
      duration: "7D/6N",
      price: 1200,
      imageUrls: [{ url: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400" }]
    },
    travellers: "2 Adults",
    startDate: "2024-03-15",
    name: "John Doe",
    email: "john.doe@email.com"
  };

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    country: '',
    saveCard: false
  });
  const [showCvv, setShowCvv] = useState(false);
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Payment methods
  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, popular: true },
    { id: 'paypal', name: 'PayPal', icon: Wallet },
    { id: 'applepay', name: 'Apple Pay', icon: Smartphone },
    { id: 'googlepay', name: 'Google Pay', icon: Smartphone },
    { id: 'bank', name: 'Bank Transfer', icon: Building2 }
  ];

  // Price calculations
  const basePrice = bookingData.trip.price;
  const taxAmount = basePrice * 0.12; // 12% tax
  const serviceFee = 25;
  const discountAmount = basePrice * (discount / 100);
  const totalAmount = basePrice + taxAmount + serviceFee - discountAmount;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let formattedValue = value;

    // Format card number
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.substring(0, 19);
    }

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) formattedValue = formattedValue.substring(0, 5);
    }

    // Format CVV
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 4) formattedValue = formattedValue.substring(0, 4);
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : formattedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const applyPromoCode = () => {
    const validCodes = {
      'TRAVEL10': 10,
      'FIRST20': 20,
      'SUMMER15': 15
    };

    if (validCodes[promoCode.toUpperCase()]) {
      setDiscount(validCodes[promoCode.toUpperCase()]);
      setErrors(prev => ({ ...prev, promo: '' }));
    } else {
      setErrors(prev => ({ ...prev, promo: 'Invalid promo code' }));
      setDiscount(0);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (paymentMethod === 'card') {
      if (!formData.cardNumber.replace(/\s/g, '')) {
        newErrors.cardNumber = 'Card number is required';
      } else if (formData.cardNumber.replace(/\s/g, '').length < 13) {
        newErrors.cardNumber = 'Invalid card number';
      }

      if (!formData.expiryDate) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Invalid expiry date (MM/YY)';
      }

      if (!formData.cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (formData.cvv.length < 3) {
        newErrors.cvv = 'Invalid CVV';
      }

      if (!formData.cardName.trim()) {
        newErrors.cardName = 'Cardholder name is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const paymentData = {
        bookingData,
        paymentMethod,
        amount: totalAmount,
        paymentDetails: paymentMethod === 'card' ? {
          last4: formData.cardNumber.slice(-4),
          cardType: getCardType(formData.cardNumber)
        } : { method: paymentMethod }
      };

      console.log('Payment processed:', paymentData);
      
      // Redirect to success page
      navigate('/payment/success', { 
        state: { 
          paymentData,
          bookingId: `BK${Date.now()}`
        }
      });

    } catch (error) {
      console.error('Payment error:', error);
      setErrors({ submit: 'Payment failed. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const getCardType = (cardNumber) => {
    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'Visa';
    if (number.startsWith('5') || number.startsWith('2')) return 'Mastercard';
    if (number.startsWith('3')) return 'American Express';
    return 'Unknown';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-300 py-8 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="backdrop-blur-md bg-white/30 rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="backdrop-blur-md bg-white/50 hover:bg-white/70 p-3 rounded-lg border border-white/20 transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="text-gray-600" size={20} />
              </button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-800 to-purple-600 bg-clip-text text-transparent">
                  Secure Payment
                </h1>
                <p className="text-gray-600">Complete your booking securely</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-green-600">
              <Shield size={20} />
              <span className="text-sm font-medium">256-bit SSL Encrypted</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Payment Form */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Payment Methods */}
          <div className="backdrop-blur-md bg-white/80 rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Choose Payment Method</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethods.map((method) => {
                const IconComponent = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`relative p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                      paymentMethod === method.id
                        ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50'
                        : 'border-white/20 backdrop-blur-md bg-white/50 hover:bg-white/70'
                    }`}
                  >
                    {method.popular && (
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                    <div className="flex items-center space-x-3">
                      <IconComponent size={24} className={paymentMethod === method.id ? 'text-blue-600' : 'text-gray-600'} />
                      <span className={`font-medium ${paymentMethod === method.id ? 'text-blue-600' : 'text-gray-700'}`}>
                        {method.name}
                      </span>
                    </div>
                    {paymentMethod === method.id && (
                      <Check className="absolute top-2 right-2 text-blue-600" size={16} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Payment Details Form */}
          {paymentMethod === 'card' && (
            <div className="backdrop-blur-md bg-white/80 rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <CreditCard className="text-blue-500 mr-3" size={24} />
                Card Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full backdrop-blur-md bg-white/80 border border-white/20 rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                      placeholder="1234 5678 9012 3456"
                    />
                    <div className="absolute right-3 top-3">
                      <div className="w-8 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded text-white text-xs flex items-center justify-center font-bold">
                        {getCardType(formData.cardNumber).slice(0, 4)}
                      </div>
                    </div>
                  </div>
                  {errors.cardNumber && <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Expiry Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="w-full backdrop-blur-md bg-white/80 border border-white/20 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                      placeholder="MM/YY"
                    />
                    {errors.expiryDate && <p className="text-red-400 text-sm mt-1">{errors.expiryDate}</p>}
                  </div>

                  {/* CVV */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <div className="relative">
                      <input
                        type={showCvv ? 'text' : 'password'}
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full backdrop-blur-md bg-white/80 border border-white/20 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                        placeholder="123"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCvv(!showCvv)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showCvv ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {errors.cvv && <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>}
                  </div>
                </div>

                {/* Cardholder Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className="w-full backdrop-blur-md bg-white/80 border border-white/20 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                    placeholder="John Doe"
                  />
                  {errors.cardName && <p className="text-red-400 text-sm mt-1">{errors.cardName}</p>}
                </div>

                {/* Save Card Checkbox */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="saveCard"
                    checked={formData.saveCard}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">Save this card for future bookings</span>
                </div>
              </form>
            </div>
          )}

          {/* Alternative Payment Methods */}
          {paymentMethod !== 'card' && (
            <div className="backdrop-blur-md bg-white/80 rounded-2xl p-6 border border-white/20">
              <div className="text-center py-8">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  {paymentMethods.find(m => m.id === paymentMethod)?.icon && 
                    React.createElement(paymentMethods.find(m => m.id === paymentMethod).icon, { 
                      size: 24, 
                      className: "text-white" 
                    })
                  }
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {paymentMethods.find(m => m.id === paymentMethod)?.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  You will be redirected to complete your payment securely.
                </p>
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Continue to {paymentMethods.find(m => m.id === paymentMethod)?.name}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          
          {/* Trip Summary */}
          <div className="backdrop-blur-md bg-white/80 rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Trip Summary</h2>
            
            <div className="flex space-x-4 mb-6">
              <img 
                src={bookingData.trip.imageUrls[0].url}
                alt={bookingData.trip.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">{bookingData.trip.title}</h3>
                <div className="flex items-center text-gray-600 text-sm mb-1">
                  <MapPin size={14} className="mr-1" />
                  {bookingData.trip.location}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Calendar size={14} className="mr-1" />
                  {bookingData.trip.duration}
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Travelers:</span>
                <span className="font-medium">{bookingData.travellers}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Check-in:</span>
                <span className="font-medium">{new Date(bookingData.startDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Promo Code */}
          <div className="backdrop-blur-md bg-white/80 rounded-2xl p-6 border border-white/20">
            <h3 className="font-semibold text-gray-800 mb-4">Promo Code</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 backdrop-blur-md bg-white/80 border border-white/20 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                placeholder="Enter promo code"
              />
              <button
                onClick={applyPromoCode}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
              >
                Apply
              </button>
            </div>
            {errors.promo && <p className="text-red-400 text-sm mt-2">{errors.promo}</p>}
            {discount > 0 && (
              <p className="text-green-600 text-sm mt-2">✓ {discount}% discount applied!</p>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="backdrop-blur-md bg-white/80 rounded-2xl p-6 border border-white/20">
            <h3 className="font-semibold text-gray-800 mb-4">Price Details</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Trip Price</span>
                <span>${basePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes & Fees</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service Fee</span>
                {/* <span>${servicesFee}</span> */}
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({discount}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-800">Total</span>
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Pay Button */}
          {paymentMethod === 'card' && (
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-3 ${
                isProcessing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <Lock size={20} />
                  <span>Pay ${totalAmount.toFixed(2)}</span>
                </>
              )}
            </button>
          )}

          {/* Security Notice */}
          <div className="backdrop-blur-md bg-white/50 rounded-lg p-4 border border-white/20">
            <div className="flex items-start space-x-3">
              <Shield className="text-green-500 mt-0.5" size={20} />
              <div className="text-sm">
                <p className="font-medium text-gray-800 mb-1">Secure Payment</p>
                <p className="text-gray-600 text-xs">
                  Your payment information is encrypted and secure. We never store your card details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
