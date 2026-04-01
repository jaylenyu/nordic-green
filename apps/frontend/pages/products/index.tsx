import { useEffect } from "react";
import { CATEGORY_MAP, FILTERS } from "constants/products";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import EmptyBox from "@components/ui/EmptyBox";
import SpinnerComponent from "@components/ui/Spinner";
import ProductCard from "@components/product/ProductCard";
import useProductManagement from "hooks/useProducts";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import { cn } from "@/lib/utils";

export default function Products() {
  const {
    activePage,
    setPage,
    selectedCategory,
    searchValue,
    total,
    products,
    handleCategory,
    handleFilterChange,
    handleSearchInput,
  } = useProductManagement();

  useEffect(() => { window.scrollTo({ top: 0 }); }, [activePage]);

  return (
    <main className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
        {/* Search */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="제품명 검색"
              value={searchValue}
              onChange={handleSearchInput}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            size="sm"
            variant={selectedCategory === "-1" ? "default" : "ghost"}
            onClick={() => handleCategory("ALL")}
          >
            ALL
          </Button>
          {CATEGORY_MAP.map((categoryName, index) => (
            <Button
              key={index}
              size="sm"
              variant={selectedCategory === (index + 1).toString() ? "default" : "ghost"}
              onClick={() => handleCategory(categoryName)}
            >
              {categoryName}
            </Button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex justify-end mb-6">
          <Select defaultValue={FILTERS[0].value} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FILTERS.map(({ label, value }) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Product Grid */}
        {products ? (
          products.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {products.map((item, idx) => (
                <ProductCard key={idx} products={item} />
              ))}
            </div>
          ) : (
            <EmptyBox />
          )
        ) : (
          <SpinnerComponent />
        )}

        {/* Pagination */}
        {total > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage(activePage - 1)}
              disabled={activePage <= 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === activePage ? "default" : "ghost"}
                size="icon"
                className={cn("w-9 h-9 text-sm", page === activePage && "pointer-events-none")}
                onClick={() => setPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage(activePage + 1)}
              disabled={activePage >= total}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
