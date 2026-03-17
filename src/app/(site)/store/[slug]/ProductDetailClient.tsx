"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { trackProductDetailView, trackProductCTAClick } from "@/lib/analytics";

interface ProductDetailClientProps {
  product: {
    id: string;
    slug: string;
    title: string;
    price: number;
    purchaseType: string;
    category?: {
      name: string;
      slug: string;
    } | null;
  };
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const hasTrackedView = useRef(false);

  useEffect(() => {
    // Track product detail view only once
    if (!hasTrackedView.current) {
      trackProductDetailView({
        product_id: product.id,
        product_slug: product.slug,
        product_type: product.purchaseType === 'instant' ? 'instant' : 'contact',
        product_category: product.category?.name,
        product_price: product.price,
      });
      hasTrackedView.current = true;
    }
  }, [product]);

  const handleCTAClick = () => {
    trackProductCTAClick({
      product_id: product.id,
      product_slug: product.slug,
      product_type: product.purchaseType === 'instant' ? 'instant' : 'contact',
      product_category: product.category?.name,
      product_price: product.price,
      cta_type: product.purchaseType === 'instant' ? 'instant_purchase' : 'service_inquiry',
    });
  };

  if (product.purchaseType === 'instant') {
    return (
      <Link 
        href={`/checkout?product=${product.id}`}
        onClick={handleCTAClick}
        className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white transition-all duration-200 w-full"
        style={{ background: "linear-gradient(135deg,#9333ea,#6d28d9)", boxShadow: "0 0 20px rgba(147,51,234,0.4)" }}
      >
        <ShoppingCart className="w-5 h-5" />
        <span className="font-bold">احصل عليه الآن — {product.price} ج.م</span>
      </Link>
    );
  }

  return (
    <Link 
      href="/contact"
      onClick={handleCTAClick}
      className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white transition-all duration-200 w-full"
      style={{ background: "linear-gradient(135deg,#06b6d4,#0891b2)", boxShadow: "0 0 20px rgba(6,182,212,0.4)" }}
    >
      <ShoppingCart className="w-5 h-5" />
      <span className="font-bold">اطلب الخدمة — ابدأ الآن</span>
    </Link>
  );
}
