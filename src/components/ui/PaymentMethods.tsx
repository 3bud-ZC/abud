"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Smartphone, Wallet, Shield, Check, AlertCircle } from "lucide-react";
import { cn, formatPrice, isValidEmail, isValidPhone } from "@/lib/utils";

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  fees?: number;
  processingTime: string;
  available: boolean;
}

interface PaymentMethodsProps {
  amount: number;
  onPaymentSelect: (method: string, paymentData: any) => void;
  className?: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "vodafone_cash",
    name: "فودافون كاش",
    icon: <Smartphone className="w-6 h-6" />,
    description: "ادفع باستخدام محفظة فودافون كاش",
    fees: 0,
    processingTime: "فوري",
    available: true,
  },
  {
    id: "instapay",
    name: "إنستاباي",
    icon: <Wallet className="w-6 h-6" />,
    description: "الدفع السريع عبر إنستاباي",
    fees: 0,
    processingTime: "فوري",
    available: true,
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: <CreditCard className="w-6 h-6" />,
    description: "ادفع بأمان عبر PayPal",
    fees: 2.9,
    processingTime: "1-2 دقائق",
    available: true,
  },
  {
    id: "bank_transfer",
    name: "تحويل بنكي",
    icon: <CreditCard className="w-6 h-6" />,
    description: "تحويل مباشر من البنك",
    fees: 0,
    processingTime: "24-48 ساعة",
    available: false,
  },
];

export default function PaymentMethods({ amount, onPaymentSelect, className }: PaymentMethodsProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [paymentData, setPaymentData] = useState<any>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const validatePaymentData = (method: string, data: any): boolean => {
    const newErrors: Record<string, string> = {};

    switch (method) {
      case "vodafone_cash":
        if (!data.phone) {
          newErrors.phone = "رقم الهاتف مطلوب";
        } else if (!isValidPhone(data.phone)) {
          newErrors.phone = "رقم هاتف غير صحيح";
        }
        break;

      case "instapay":
        if (!data.phone) {
          newErrors.phone = "رقم الهاتف مطلوب";
        } else if (!isValidPhone(data.phone)) {
          newErrors.phone = "رقم هاتف غير صحيح";
        }
        break;

      case "paypal":
        if (!data.email) {
          newErrors.email = "البريد الإلكتروني مطلوب";
        } else if (!isValidEmail(data.email)) {
          newErrors.email = "بريد إلكتروني غير صحيح";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentSubmit = async () => {
    if (!selectedMethod) return;

    if (!validatePaymentData(selectedMethod, paymentData)) {
      return;
    }

    setIsProcessing(true);
    
    try {
      await onPaymentSelect(selectedMethod, paymentData);
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateTotal = (method: PaymentMethod) => {
    const fees = method.fees ? (amount * method.fees) / 100 : 0;
    return amount + fees;
  };

  const renderPaymentForm = (method: PaymentMethod) => {
    switch (method.id) {
      case "vodafone_cash":
      case "instapay":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رقم الهاتف
              </label>
              <input
                type="tel"
                placeholder="01xxxxxxxxx"
                value={paymentData.phone || ""}
                onChange={(e) => setPaymentData({ ...paymentData, phone: e.target.value })}
                className={cn(
                  "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  errors.phone ? "border-red-500" : "border-gray-200"
                )}
                dir="ltr"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.phone}
                </p>
              )}
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <Shield className="w-4 h-4 inline ml-1" />
                سيتم إرسال رسالة تأكيد على رقم الهاتف المسجل
              </p>
            </div>
          </div>
        );

      case "paypal":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                placeholder="example@email.com"
                value={paymentData.email || ""}
                onChange={(e) => setPaymentData({ ...paymentData, email: e.target.value })}
                className={cn(
                  "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  errors.email ? "border-red-500" : "border-gray-200"
                )}
                dir="ltr"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <Shield className="w-4 h-4 inline ml-1" />
                سيتم تحويلك إلى PayPal لإتمام الدفع بأمان
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <h3 className="text-lg font-semibold">اختر طريقة الدفع</h3>

      {/* Payment Methods Grid */}
      <div className="grid gap-4">
        {paymentMethods.map((method) => (
          <motion.div
            key={method.id}
            whileHover={{ scale: method.available ? 1.02 : 1 }}
            whileTap={{ scale: method.available ? 0.98 : 1 }}
          >
            <label
              className={cn(
                "block p-4 border rounded-lg cursor-pointer transition-all",
                !method.available && "opacity-50 cursor-not-allowed",
                selectedMethod === method.id
                  ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={(e) => {
                  if (method.available) {
                    setSelectedMethod(e.target.value);
                    setPaymentData({});
                    setErrors({});
                  }
                }}
                className="sr-only"
                disabled={!method.available}
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    selectedMethod === method.id ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                  )}>
                    {method.icon}
                  </div>
                  <div>
                    <h4 className="font-medium flex items-center gap-2">
                      {method.name}
                      {selectedMethod === method.id && (
                        <Check className="w-4 h-4 text-blue-600" />
                      )}
                      {!method.available && (
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                          قريباً
                        </span>
                      )}
                    </h4>
                    <p className="text-sm text-gray-600">{method.description}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                      <span>وقت المعالجة: {method.processingTime}</span>
                      {method.fees && method.fees > 0 && (
                        <span>رسوم: {method.fees}%</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-left">
                  <div className="font-semibold">
                    {formatPrice(calculateTotal(method))}
                  </div>
                  {method.fees && method.fees > 0 && (
                    <div className="text-xs text-gray-500">
                      + {formatPrice((amount * method.fees) / 100)} رسوم
                    </div>
                  )}
                </div>
              </div>
            </label>
          </motion.div>
        ))}
      </div>

      {/* Payment Form */}
      {selectedMethod && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t pt-6"
        >
          {renderPaymentForm(paymentMethods.find(m => m.id === selectedMethod)!)}
          
          {/* Payment Summary */}
          <div className="bg-gray-50 p-4 rounded-lg mt-6">
            <div className="flex justify-between items-center mb-2">
              <span>المبلغ الأساسي:</span>
              <span>{formatPrice(amount)}</span>
            </div>
            {paymentMethods.find(m => m.id === selectedMethod)?.fees && (
              <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
                <span>رسوم المعالجة:</span>
                <span>{formatPrice((amount * paymentMethods.find(m => m.id === selectedMethod)!.fees!) / 100)}</span>
              </div>
            )}
            <div className="flex justify-between items-center font-semibold text-lg border-t pt-2">
              <span>المجموع:</span>
              <span>{formatPrice(calculateTotal(paymentMethods.find(m => m.id === selectedMethod)!))}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handlePaymentSubmit}
            disabled={isProcessing}
            className={cn(
              "w-full py-4 px-6 rounded-lg font-semibold transition-all mt-6",
              isProcessing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            )}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                جاري المعالجة...
              </div>
            ) : (
              `ادفع ${formatPrice(calculateTotal(paymentMethods.find(m => m.id === selectedMethod)!))}`
            )}
          </button>
        </motion.div>
      )}
    </div>
  );
}
