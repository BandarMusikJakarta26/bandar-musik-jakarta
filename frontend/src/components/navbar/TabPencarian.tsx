import SearchBrands from "./SearchBrands";
import SearchCategories from "./SearchCategories";
import SearchProducts from "./SearchProducts";

export default function TabPencarian({ result }: { result: { products: any[], brands: any[], categories: any[] } }){
    return (
        <div className={`${result.products.length == 0 && result.brands.length == 0 && result.categories.length == 0 ? 'h-0' : false} pencarian absolute bg-primary top-[10px] text-[14px] w-full h-[300px] overflow-y-scroll`}>
            { result.categories.length > 0 ? <SearchCategories categories={result.categories}/> : null}
            { result.brands.length > 0 ? <SearchBrands brands={result.brands}/> : null}
            { result.products.length > 0 ? <SearchProducts products={result.products}/> : null}
        </div>
)
}