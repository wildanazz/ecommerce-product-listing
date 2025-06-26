import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

import IProduct from '@/interfaces/IProduct';

/**
 * @route   GET /api/products
 * @desc    Fetches a list of products from the local JSON file (`data/products.json`)
 * @returns {IProduct[]} - Array of product objects
 * 
 * @response
 *   200 - Success: Returns the list of products
 *   500 - Error: Failed to load or parse product data
 */
export default async function handler( req: NextApiRequest, res: NextApiResponse<IProduct[] | { error: string }>) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'products.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(jsonData);
    
    res.status(200).json(products);
  } catch (error) {
    console.error('API Error:', error);

    res.status(500).json({ error: 'Failed to load products' });
  }
}