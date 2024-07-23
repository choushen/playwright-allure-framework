import { chromium, Browser } from '@playwright/test';

let browser: Browser;

export default async function globalSetup() {
    console.log('Global setup is running...');
    browser = await chromium.launch();
    global['__BROWSER__'] = browser;
}
