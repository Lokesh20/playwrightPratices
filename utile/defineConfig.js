import { defineConfig } from '@playwright/test';

export default defineConfig({
    reporter: [
        ['line'],
        ['html'],
        ['allure-playwright']
    ]
});
