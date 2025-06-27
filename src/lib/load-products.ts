import IProduct from "@/interfaces/IProduct"

/**
 * Fetches the list of products from the backend API.
 *
 * @returns Promise resolving to an array of IProduct objects.
 */
export async function getProductsFromAPI(): Promise<IProduct[]> {
    // Use environment variable for the base URL, fallback to localhost for development
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

    const res = await fetch(`${baseUrl}/api/products`);
    
    // If the request fails, return an empty array to avoid breaking the UI
    if (!res.ok) {
        return []
    } else {
        // If successful, parse and return the JSON response as an array of products
        return res.json()
    }
}