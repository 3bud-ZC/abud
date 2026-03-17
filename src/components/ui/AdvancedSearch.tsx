"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, ChevronDown, Star, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterOption {
  id: string;
  name: string;
  count?: number;
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
  categories?: FilterOption[];
  priceRange?: { min: number; max: number };
  className?: string;
}

export interface SearchFilters {
  query: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  rating: number;
  sortBy: "newest" | "oldest" | "price_low" | "price_high" | "rating" | "popular";
  inStock: boolean;
}

const sortOptions = [
  { value: "newest", label: "الأحدث" },
  { value: "oldest", label: "الأقدم" },
  { value: "price_low", label: "السعر: من الأقل للأعلى" },
  { value: "price_high", label: "السعر: من الأعلى للأقل" },
  { value: "rating", label: "الأعلى تقييماً" },
  { value: "popular", label: "الأكثر شعبية" },
];

export default function AdvancedSearch({
  onSearch,
  categories = [],
  priceRange = { min: 0, max: 10000 },
  className
}: AdvancedSearchProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    category: "",
    minPrice: priceRange.min,
    maxPrice: priceRange.max,
    rating: 0,
    sortBy: "newest",
    inStock: false,
  });

  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  useEffect(() => {
    let count = 0;
    if (filters.query) count++;
    if (filters.category) count++;
    if (filters.minPrice > priceRange.min || filters.maxPrice < priceRange.max) count++;
    if (filters.rating > 0) count++;
    if (filters.inStock) count++;
    setActiveFiltersCount(count);
  }, [filters, priceRange]);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters: SearchFilters = {
      query: "",
      category: "",
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      rating: 0,
      sortBy: "newest",
      inStock: false,
    };
    setFilters(clearedFilters);
    onSearch(clearedFilters);
  };

  const renderStarRating = (rating: number, onRatingChange: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRatingChange(star === rating ? 0 : star)}
            className={cn(
              "transition-colors",
              star <= rating ? "text-yellow-400" : "text-gray-300 hover:text-yellow-200"
            )}
          >
            <Star className="w-5 h-5 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="ابحث عن المنتجات..."
          value={filters.query}
          onChange={(e) => handleFilterChange("query", e.target.value)}
          className="w-full pr-12 pl-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
        />
      </div>

      {/* Filter Toggle & Sort */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors",
            isFilterOpen
              ? "bg-blue-50 border-blue-200 text-blue-700"
              : "border-gray-200 hover:bg-gray-50"
          )}
        >
          <Filter className="w-4 h-4" />
          <span>فلاتر</span>
          {activeFiltersCount > 0 && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>

        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange("sortBy", e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="border border-gray-200 rounded-lg p-6 space-y-6 bg-gray-50">
              {/* Clear All Filters */}
              {activeFiltersCount > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {activeFiltersCount} فلتر نشط
                  </span>
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    مسح الكل
                  </button>
                </div>
              )}

              {/* Categories */}
              {categories.length > 0 && (
                <div>
                  <h3 className="font-medium mb-3">الفئات</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value=""
                        checked={filters.category === ""}
                        onChange={(e) => handleFilterChange("category", e.target.value)}
                        className="text-blue-500"
                      />
                      <span>جميع الفئات</span>
                    </label>
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          checked={filters.category === category.id}
                          onChange={(e) => handleFilterChange("category", e.target.value)}
                          className="text-blue-500"
                        />
                        <span className="flex-1">{category.name}</span>
                        {category.count && (
                          <span className="text-sm text-gray-500">({category.count})</span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  نطاق السعر
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm text-gray-600 mb-1">من</label>
                      <input
                        type="number"
                        min={priceRange.min}
                        max={priceRange.max}
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange("minPrice", Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm text-gray-600 mb-1">إلى</label>
                      <input
                        type="number"
                        min={priceRange.min}
                        max={priceRange.max}
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange("maxPrice", Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  {/* Price Range Slider */}
                  <div className="px-2">
                    <input
                      type="range"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange("maxPrice", Number(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{priceRange.min} ج.م</span>
                      <span>{priceRange.max} ج.م</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="font-medium mb-3">التقييم الأدنى</h3>
                {renderStarRating(filters.rating, (rating) => handleFilterChange("rating", rating))}
                {filters.rating > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    {filters.rating} نجوم فأكثر
                  </p>
                )}
              </div>

              {/* Stock Status */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange("inStock", e.target.checked)}
                    className="text-blue-500"
                  />
                  <span>متوفر في المخزن فقط</span>
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
