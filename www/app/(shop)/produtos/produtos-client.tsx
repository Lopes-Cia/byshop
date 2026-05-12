"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Filter } from "lucide-react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";

export default function ProductsClient() {
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [saleOnly, setSaleOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const queryState = useMemo(() => {
    return {
      category: searchParams.get("category") || "",
      price: searchParams.get("price") || "",
      sort: searchParams.get("sort") || "",
      sale: searchParams.get("sale") || ""
    };
  }, [searchParams]);

  useEffect(() => {
    const allowedCategories = new Set(["all", "audio", "wearables", "accessories"]);
    if (allowedCategories.has(queryState.category)) setSelectedCategory(queryState.category);

    const allowedPrices = new Set(["all", "under-50", "50-100", "100-200", "over-200"]);
    if (allowedPrices.has(queryState.price)) setPriceRange(queryState.price);

    const allowedSorts = new Set(["featured", "newest", "price-low", "price-high", "rating"]);
    if (allowedSorts.has(queryState.sort)) setSortBy(queryState.sort);

    setSaleOnly(queryState.sale === "1" || queryState.sale === "true");
  }, [queryState]);

  const filteredProducts = products
    .filter((product) => selectedCategory === "all" || product.category === selectedCategory)
    .filter((product) => {
      if (!saleOnly) return true;
      return Boolean(product.originalPrice && product.originalPrice > product.price);
    })
    .filter((product) => {
      if (priceRange === "all") return true;
      if (priceRange === "under-50") return product.price < 50;
      if (priceRange === "50-100") return product.price >= 50 && product.price <= 100;
      if (priceRange === "100-200") return product.price >= 100 && product.price <= 200;
      if (priceRange === "over-200") return product.price > 200;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest") return b.id.localeCompare(a.id);
      return 0;
    });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="lg:w-64">
          <div className="mb-4 lg:hidden">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>

          <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div>
              <h3 className="mb-3 text-xs tracking-widest uppercase">Categoria</h3>
              <div className="space-y-2">
                {["all", "audio", "wearables", "accessories"].map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mr-2"
                    />
                    <span className="capitalize">
                      {category === "all"
                        ? "Todos os produtos"
                        : category === "audio"
                          ? "Áudio"
                          : category === "wearables"
                            ? "Vestíveis"
                            : "Acessórios"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-xs tracking-widest uppercase">Promoções</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={saleOnly}
                  onChange={(e) => setSaleOnly(e.target.checked)}
                  className="mr-2"
                />
                <span>Apenas em promoção</span>
              </label>
            </div>

            <div>
              <h3 className="mb-3 text-xs tracking-widest uppercase">Faixa de preço</h3>
              <div className="space-y-2">
                {[
                  { value: "all", label: "Todos os preços" },
                  { value: "under-50", label: "Até $50" },
                  { value: "50-100", label: "$50 - $100" },
                  { value: "100-200", label: "$100 - $200" },
                  { value: "over-200", label: "Acima de $200" }
                ].map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      value={option.value}
                      checked={priceRange === option.value}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="mr-2"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Produtos ({filteredProducts.length})
            </h1>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="focus:ring-primary appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-8 focus:border-transparent focus:ring-2">
                <option value="featured">Destaques</option>
                <option value="newest">Mais recentes</option>
                <option value="price-low">Preço: menor para maior</option>
                <option value="price-high">Preço: maior para menor</option>
                <option value="rating">Melhor avaliados</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-500">Nenhum produto encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
