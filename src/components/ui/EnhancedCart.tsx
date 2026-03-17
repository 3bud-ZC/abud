"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Plus, Minus, Trash2, Heart, Share2, Gift, Truck, Shield, Clock } from "lucide-react";
import Image from "next/image";
import { cn, formatPrice, calculateDiscount } from "@/lib/utils";

interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  quantity: number;
  image: string;
  category: string;
  inStock: boolean;
  maxQuantity: number;
  estimatedDelivery: string;
}

interface EnhancedCartProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onAddToWishlist: (itemId: string) => void;
  onCheckout: () => void;
  isLoading?: boolean;
  className?: string;
}

interface CartSummary {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

export default function EnhancedCart({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onAddToWishlist,
  onCheckout,
  isLoading = false,
  className
}: EnhancedCartProps) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const calculateSummary = (): CartSummary => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = items.reduce((sum, item) => {
      if (item.discount && item.originalPrice) {
        return sum + ((item.originalPrice - item.price) * item.quantity);
      }
      return sum;
    }, 0);
    
    const shipping = subtotal > 500 ? 0 : 50; // Free shipping over 500 EGP
    const tax = subtotal * 0.14; // 14% VAT
    const total = subtotal + shipping + tax;

    return { subtotal, discount, shipping, tax, total };
  };

  const summary = calculateSummary();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    const item = items.find(i => i.id === itemId);
    if (item && newQuantity <= item.maxQuantity) {
      onUpdateQuantity(itemId, newQuantity);
    }
  };

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    
    setIsApplyingCoupon(true);
    // Simulate API call
    setTimeout(() => {
      setAppliedCoupon(couponCode);
      setIsApplyingCoupon(false);
    }, 1000);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
  };

  if (items.length === 0) {
    return (
      <div className={cn("text-center py-12", className)}>
        <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">سلة التسوق فارغة</h3>
        <p className="text-gray-500 mb-6">لم تقم بإضافة أي منتجات بعد</p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          تصفح المنتجات
        </button>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Cart Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" />
          سلة التسوق ({items.length})
        </h2>
        <div className="flex gap-2">
          <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    {item.discount && (
                      <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded">
                        -{item.discount}%
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-semibold text-lg">{formatPrice(item.price)}</span>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Quantity Controls & Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Quantity */}
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.maxQuantity}
                            className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Stock Status */}
                        <div className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          item.inStock
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        )}>
                          {item.inStock ? "متوفر" : "غير متوفر"}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onAddToWishlist(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                        <span className="font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Truck className="w-4 h-4" />
                        <span>التوصيل: {item.estimatedDelivery}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="w-4 h-4" />
                        <span>ضمان سنة</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Coupon Section */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Gift className="w-5 h-5" />
              كود الخصم
            </h3>
            
            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-800 font-medium">تم تطبيق الكود: {appliedCoupon}</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-green-600 hover:text-green-700 text-sm"
                >
                  إزالة
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="أدخل كود الخصم"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={applyCoupon}
                  disabled={isApplyingCoupon || !couponCode.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isApplyingCoupon ? "جاري التطبيق..." : "تطبيق"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6">
            <h3 className="font-semibold text-lg mb-4">ملخص الطلب</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>المجموع الفرعي:</span>
                <span>{formatPrice(summary.subtotal)}</span>
              </div>
              
              {summary.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>الخصم:</span>
                  <span>-{formatPrice(summary.discount)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  <Truck className="w-4 h-4" />
                  الشحن:
                </span>
                <span className={summary.shipping === 0 ? "text-green-600" : ""}>
                  {summary.shipping === 0 ? "مجاني" : formatPrice(summary.shipping)}
                </span>
              </div>
              
              <div className="flex justify-between text-sm text-gray-600">
                <span>الضريبة (14%):</span>
                <span>{formatPrice(summary.tax)}</span>
              </div>
              
              <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                <span>المجموع:</span>
                <span>{formatPrice(summary.total)}</span>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-blue-50 rounded-lg p-3 mb-6">
              <div className="flex items-center gap-2 text-blue-800 mb-2">
                <Clock className="w-4 h-4" />
                <span className="font-medium">معلومات الشحن</span>
              </div>
              <p className="text-sm text-blue-700">
                {summary.subtotal > 500 
                  ? "تهانينا! حصلت على شحن مجاني" 
                  : `أضف ${formatPrice(500 - summary.subtotal)} للحصول على شحن مجاني`
                }
              </p>
            </div>

            {/* Checkout Button */}
            <button
              onClick={onCheckout}
              disabled={isLoading || items.some(item => !item.inStock)}
              className={cn(
                "w-full py-4 px-6 rounded-lg font-semibold transition-all",
                isLoading || items.some(item => !item.inStock)
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
              )}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  جاري المعالجة...
                </div>
              ) : (
                `إتمام الشراء - ${formatPrice(summary.total)}`
              )}
            </button>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-600">
              <Shield className="w-4 h-4" />
              <span>دفع آمن ومشفر</span>
            </div>

            {/* Continue Shopping */}
            <button className="w-full mt-3 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
              متابعة التسوق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
