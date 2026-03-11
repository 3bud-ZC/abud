import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Package, ArrowRight, ShoppingCart, Star, CheckCircle, Zap, Shield } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import JsonLd from "@/components/JsonLd";

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug, status: "active" },
    include: { category: true },
  });

  if (!product) notFound();

  const payMethods: string[] = Array.isArray(product.payMethods)
    ? product.payMethods
    : (() => { try { return JSON.parse(product.payMethods as string); } catch { return []; } })();

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.shortDesc ?? "",
    image: product.coverImage ?? "https://abud.fun/opengraph-image",
    url: `https://abud.fun/store/${product.slug}`,
    brand: { "@type": "Brand", name: "ABUD" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "EGP",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "ABUD", url: "https://abud.fun" },
      ...(product.oldPrice ? { priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] } : {}),
    },
    ...(product.category ? { category: product.category.name } : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://abud.fun" },
      { "@type": "ListItem", position: 2, name: "المتجر", item: "https://abud.fun/store" },
      { "@type": "ListItem", position: 3, name: product.title, item: `https://abud.fun/store/${product.slug}` },
    ],
  };

  const icons: Record<string, string> = { vodafone_cash: "📱", instapay: "💳", paypal: "🌐", card: "💳" };
  const labels: Record<string, string> = { vodafone_cash: "فودافون كاش", instapay: "إنستاباي", paypal: "PayPal", card: "بطاقة ائتمان" };

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="pt-20 pb-20">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <Link href="/store" className="inline-flex items-center gap-2 text-[#a0a0b8] hover:text-purple-400 transition-colors mb-8 text-sm">
            <ArrowRight className="w-4 h-4" />
            العودة للمتجر
          </Link>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Image */}
            <div className="aspect-video bg-[#0d0d14] border border-[#1a1a2e] rounded-2xl relative overflow-hidden">
              {product.coverImage ? (
                <Image
                  src={product.coverImage}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.1)_0%,transparent_70%)]" />
                  <Package className="w-16 h-16 text-purple-600/40 relative z-10" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-5">
              {product.category && (
                <span className="text-xs text-purple-400 bg-purple-600/10 px-3 py-1 rounded-full border border-purple-600/20 inline-block">
                  {product.category.name}
                </span>
              )}

              <h1 className="text-3xl font-black text-white leading-tight">{product.title}</h1>

              {product.shortDesc && (
                <p className="text-[#a0a0b8] leading-relaxed">{product.shortDesc}</p>
              )}

              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-4xl font-black text-purple-400">{formatPrice(product.price)}</span>
                {product.oldPrice && (
                  <span className="text-xl text-[#606080] line-through">{formatPrice(product.oldPrice)}</span>
                )}
                {product.oldPrice && product.oldPrice > product.price && (
                  <span className="text-sm bg-green-600 text-white px-2.5 py-1 rounded-full font-bold">
                    -{Math.round((1 - product.price / product.oldPrice) * 100)}% خصم
                  </span>
                )}
              </div>

              {product.featured && (
                <div className="flex items-center gap-2 text-yellow-400 text-sm">
                  <Star className="w-4 h-4 fill-yellow-400" />
                  <span>منتج مميز ومُوصى به</span>
                </div>
              )}

              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: Zap, text: "تسليم فوري" },
                  { icon: Shield, text: "جودة مضمونة" },
                  { icon: CheckCircle, text: "دعم مجاني" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex flex-col items-center gap-1.5 text-center p-3 rounded-xl bg-purple-600/5 border border-purple-600/15">
                    <Icon className="w-4 h-4 text-purple-400" />
                    <span className="text-xs text-[#a0a0b8] font-medium">{text}</span>
                  </div>
                ))}
              </div>

              {payMethods.length > 0 && (
                <div>
                  <p className="text-xs text-[#808090] mb-2">طرق الدفع المتاحة</p>
                  <div className="flex flex-wrap gap-2">
                    {payMethods.map((m: string) => (
                      <span key={m} className="flex items-center gap-1.5 text-xs text-[#a0a0b8] bg-[#1a1a2e] border border-[#2a2a3e] px-2.5 py-1 rounded-lg">
                        <span>{icons[m] || "💰"}</span>
                        {labels[m] || m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product.deliveryNote && (
                <div className="bg-purple-600/5 border border-purple-600/20 rounded-xl p-4 text-sm text-[#a0a0b8]">
                  <strong className="text-purple-400">ملاحظة التسليم: </strong>
                  {product.deliveryNote}
                </div>
              )}

              <Link
                href={`/checkout?product=${product.id}`}
                className="btn-primary w-full justify-center gap-2 text-base py-3.5"
              >
                <ShoppingCart className="w-5 h-5" />
                اشتري الآن
              </Link>
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div className="mt-12 card-base p-8">
              <h2 className="text-xl font-bold text-white mb-4">وصف المنتج</h2>
              <div className="prose-arabic" dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          )}

          {/* Internal linking */}
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/store" className="btn-outline text-sm py-2 px-4">← جميع المنتجات</Link>
            <Link href="/services" className="btn-outline text-sm py-2 px-4">خدماتي الاحترافية</Link>
            <Link href="/blog" className="btn-outline text-sm py-2 px-4">المدونة التقنية</Link>
          </div>
        </div>
      </div>
    </>
  );
}
