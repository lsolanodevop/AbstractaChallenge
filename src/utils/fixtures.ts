import {test as baseTest} from '@playwright/test';

import mainPage from '../pages/main.page';
import resultsPage from '../pages/results.page';

const test = baseTest.extend<{
    mainPage: mainPage;
    resultsPage: resultsPage;
}>({
mainPage: async({page}, use) => {
    await use(new mainPage(page));
},
resultsPage: async({page}, use) => {
    await use(new resultsPage(page));
}
});

export default test;
export const expect = test.expect;