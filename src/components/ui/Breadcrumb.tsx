import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-xs mb-6 flex-wrap" style={{ color: "#505070" }}>
      <Link href="/" className="flex items-center gap-1 hover:text-purple-400 transition-colors">
        <Home className="w-3 h-3" />
        <span>الرئيسية</span>
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronLeft className="w-3 h-3 opacity-40" />
          {item.href ? (
            <Link href={item.href} className="hover:text-purple-400 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-purple-300">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
