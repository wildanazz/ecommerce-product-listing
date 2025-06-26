import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

import IProduct from '@/interfaces/IProduct';

/**
 * API Route: /api/products
 * 
 * Reads product data from a local JSON file (`data/products.json`) and returns
 * the list of products with optional filtering.
 * 
 * Query Parameters:
 * - category (string, optional): Filter products by category.
 * 
 * Responses:
 * - 200: Returns the filtered array of products.
 * - 500: Returns an error object if file reading or parsing fails.
 * 
 * Examples:
 * GET /api/products
 * GET /api/products?category=Electronics
 */
export default async function handler( req: NextApiRequest, res: NextApiResponse<IProduct[] | { error: string }>) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'products.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    let products = JSON.parse(jsonData);

    const { category } = req.query;

    if (typeof category === 'string' && category) {
      products = products.filter((p: { category: string; }) => p.category === category);
    }
    
    res.status(200).json(products);
  } catch (error) {
    console.error('API Error:', error);

    res.status(500).json({ error: 'Failed to load products' });
  }
}