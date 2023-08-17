import { ElementHandle, expect , Locator , Page } from "@playwright/test";
import Wrapper from "../base/Wrapper";
import { Product } from '../utils/products';


export default class ResultsPage extends Wrapper {

    readonly nextPageButton: Locator;
    constructor(public page: Page){
        super(page);
        this.nextPageButton = this.page.getByTitle('Siguiente');
    }

    async clickNextPageButton(){
        await this.nextPageButton.click();
        }

        async extractData() {
            await Product.sleep(1000);
            const productItems = await this.page.$$('.andes-card');
            
            const productsMap: Map<string, Product> = new Map();
    
            for (const productItem of productItems) {
                const product = await this.extractSingleProduct(productItem);
                if (product) {
                    if (!productsMap.has(await product.getUniqueId())) {
                        productsMap.set(await product.getUniqueId(), product);
                    }
                }
            }
            
            this.writeResults(Array.from(productsMap.values()));
        }
    
        async extractSingleProduct(productItem: ElementHandle): Promise<Product | null> {
            const priceElement = await productItem.$('span.ui-search-price__part.shops__price-part');
            const titleElement = await productItem.$('h2.ui-search-item__title');
            const linkElement = await productItem.$('a');
    
            if (priceElement && titleElement && linkElement) {
                const dirtyPrice = await priceElement.textContent();
                const price = await Product.cleanPrice(dirtyPrice || '');
                const title = await titleElement.textContent() || '';
                const href = await linkElement.getAttribute('href') || '';
    
                if (await this.isValidUrl(href)) {
                    return new Product(title, price, href);
                }
            }
            return null;
        }
    
        async isValidUrl(url: string): Promise<boolean> {
            return url.includes('https://articulo.mercadolibre.com.uy/') || url.includes('https://click1.mercadolibre.com.uy/');
        }
    
        async writeResults(products: Product[]): Promise<void> {
            Product.writeToFile(products, 'products.txt');
        }
        

}