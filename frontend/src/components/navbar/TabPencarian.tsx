import React from "react";
import SearchBrands from "./SearchBrands";
import SearchCategories from "./SearchCategories";
import SearchProducts from "./SearchProducts";

const TabPencarian = function({ result }: { result: { products: any[], brands: any[], categories: any[] } }){
    return (
        <div className={`${result.products.length == 0 && result.brands.length == 0 && result.categories.length == 0 ? 'h-0 hidden' : false} pencarian absolute bg-primary top-[10px] text-[14px] w-full h-[300px] overflow-y-scroll`}>
            { result.categories.length > 0 ? <SearchCategories categories={result.categories}/> : false}
            { result.brands.length > 0 ? <SearchBrands brands={result.brands}/> : false}
            { result.products.length > 0 ? <SearchProducts products={result.products}/> : false}
        </div>
)
}

export default React.memo(TabPencarian)