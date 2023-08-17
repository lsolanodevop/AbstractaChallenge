import test from '../utils/fixtures';

test.describe('Abstracta: Mercadolibre Test', async () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://www.mercadolibre.com.uy/');
    });

    test.only('Should be able to search for the desired item "Camisetas"', async ({ mainPage, resultsPage }) => {
        await mainPage.searchForItem('Camisetas');
        await mainPage.clickSearchButton();
    
        const numPagesToExtract = 3; 
        for (let i = 0; i < numPagesToExtract; i++) {
            await resultsPage.extractData();
            if (i < numPagesToExtract - 1) {
                await resultsPage.clickNextPageButton();
            }
        }
    });
    
});