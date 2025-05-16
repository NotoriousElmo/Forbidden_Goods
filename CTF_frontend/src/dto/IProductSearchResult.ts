import { Product } from "./IProduct";

export interface ProductSearchResult {
    products: Product[];
    message?: string;
}
