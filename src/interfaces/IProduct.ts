export default interface IProduct {
    id: string, 
    name: string, 
    category: string, 
    price: number, 
    description: string, 
    imageUrl: string, 
    sku?: string; 
    available?: boolean;
}