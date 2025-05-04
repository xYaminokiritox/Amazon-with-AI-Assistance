
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { CreditCard, Truck, Check } from 'lucide-react';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would process payment/order here
    // For this demo, we'll just simulate a successful order
    toast({
      title: "Order placed successfully!",
      description: "Your order has been placed and will be shipped soon.",
    });
    
    setFormSubmitted(true);
    clearCart();
  };
  
  if (formSubmitted) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
          <p className="mb-6">Thank you for your purchase. Your order has been placed and will be shipped soon.</p>
          <Link to="/">
            <Button className="bg-amazon-primary hover:bg-amazon-yellow text-white hover:text-black">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="mb-6">You need items in your cart to proceed to checkout.</p>
        <Link to="/" className="text-amazon-secondary hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Form */}
        <div className="flex-1">
          <form onSubmit={handleCheckout}>
            {/* Shipping Information */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck size={20} className="mr-2" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" required />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" required />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Payment Information */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard size={20} className="mr-2" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="credit" className="mb-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit" id="credit" />
                    <Label htmlFor="credit">Credit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                </RadioGroup>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" required />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="XXXX XXXX XXXX XXXX" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expDate">Expiration Date</Label>
                    <Input id="expDate" placeholder="MM/YY" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="XXX" required />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Button 
              type="submit"
              className="w-full bg-amazon-yellow hover:bg-amazon-primary text-black hover:text-white"
            >
              Place Order
            </Button>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-80">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Items list */}
                <div className="space-y-2">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.title.substring(0, 20)}... × {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-2 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{getCartTotal() > 35 ? "FREE" : "$4.99"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>
                    ${(
                      getCartTotal() + 
                      (getCartTotal() > 35 ? 0 : 4.99) + 
                      (getCartTotal() * 0.1)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
