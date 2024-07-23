import { Browser } from '@playwright/test';


export default async function globalTeardown() {
    console.log('Global teardown is running...');
    const browser = global['__BROWSER__'] as Browser;
    if (browser) {
        await browser.close();
    }
}