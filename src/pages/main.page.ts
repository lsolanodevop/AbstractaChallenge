import { expect , Locator , Page } from "@playwright/test";
import Wrapper from "../base/Wrapper";
import { Product } from '../utils/products';

export default class MainPage extends Wrapper {

    readonly searchInput: Locator; 
    readonly searchButton: Locator;

    constructor(public page: Page){
        super(page);
        this.searchInput = this.page.getByPlaceholder('Buscar productos, marcas y más…');
        this.searchButton = this.page.getByRole('button', { name: 'Buscar' });
    }

    async searchForItem(item: string){
        await this.searchInput.fill(item);
    }

    async clickSearchButton(){
        await this.searchButton.click();
    }       

}