/*TypeScript interface of a product which is the main data type we're using on this API */
export interface Product {
    product_id: string;
    product_name: string;
    quantity: number;
    entry_date: string;
    modification_date?: string;
}

