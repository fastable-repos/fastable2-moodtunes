import type { Page } from '@playwright/test';

export async function captureScreenshot(page: Page, name: string): Promise<void> {
  await page.screenshot({ path: `e2e/screenshots/${name}.png`, fullPage: true });
}

export async function assertNoConsoleErrors(page: Page): Promise<void> {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  // Give a moment for any errors to surface
  await page.waitForTimeout(200);
  if (errors.length > 0) {
    throw new Error(`Console errors found: ${errors.join(', ')}`);
  }
}
