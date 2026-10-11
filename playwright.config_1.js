// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { channel } from 'node:diagnostics_channel';
import { permission } from 'node:process';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries:1,
  timeout: 90000,
  expect: { timeout: 10000 },
  reporter: 'html',
  projects: [
    /* Shared settings for all the pr
    ojects below. See https://playwright.dev/docs/api/class-testoptions. */

    {
      name: "Edge",
      use: {
        browserName: 'chromium',
        channel: 'msedge',
        headless: false,
        screenShot: 'on',
        trace: 'on'
      }
    },
    {
      name: "Chrome",
      use: {
        browserName: 'chromium',
        headless: false,
        screenShot: 'on',
        trace: 'on',
        //viewport:{width:720, height:1200}
        //...devices['Galaxy S24 landscape'],
        ///ssl certificate
        ignoreHttpsErrors:true,
        //broser notification for permission
        permission:['geolocation'],
      //  video:'on'
      }
    },
    {
      name: "safari",
      use: {
        browserName: 'webkit',
        headless: false,
        screenShot: 'on',
        trace: 'on',
        ...devices['iPhone 15 Pro Max']
      }
    }

  ]


});
module.exports = config

