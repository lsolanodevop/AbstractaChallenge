import fs from 'fs';
import { promisify } from 'util';

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);
const existsAsync = promisify(fs.exists);

export class Product {
    name: string;
    price: string;
    link: string;

    constructor(name: string, price: string, link: string) {
        this.name = name;
        this.price = price;
        this.link = link;
    }

    formatData(): string {
        return `
        [
            name: ${this.name}
            price: ${this.price}
            Link: ${this.link}
        ],
        `;
    }

    static async writeToFile(products: Product[], filename: string = 'products.json') {
        let existingProducts: Product[] = [];
        
        // Check if the file already exists
        const fileExists = await existsAsync(filename);
        
        if (fileExists) {
            // If file exists, read its content
            const existingData = await readFileAsync(filename, 'utf8');
            existingProducts = JSON.parse(existingData);
        }
        
        // Combine the existing products with the new ones
        const allProducts = existingProducts.concat(products);
        
        // Write the combined list back to the file
        await writeFileAsync(filename, JSON.stringify(allProducts, null, 4), 'utf8');
    }


    static async cleanPrice(price: string): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                const match = price.match(/(.*?pesos)/);
                const cleanedPrice = match ? match[1].trim() : price;
                resolve(cleanedPrice);
            } catch (error) {
                reject(error);
            }
        });
    }
    
    static async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async equals(other: Product): Promise<boolean> {
        return this.link === other.link; 
    }

    async getUniqueId (): Promise<string> {
        return this.link; 
    }
}
