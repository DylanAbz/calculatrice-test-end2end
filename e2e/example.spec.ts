import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:5173/');
});


test.describe('Calculator', () => {
  test('1+1=2', async ({page}) => {
    await page.locator("#button-number-1").click();
    await page.locator('.sum').click();
    await page.locator("#button-number-1").click();
    await page.locator('.btnEqual').click();
    await expect(page.locator(".screen")).toContainText('2');
  });

  test('1-1=0', async ({page}) => {
    await page.locator("#button-number-1").click();
    await page.locator('.soustraction').click();
    await page.locator("#button-number-1").click();
    await page.locator('.btnEqual').click();
    await expect(page.locator(".screen")).toContainText('0');
  });

  test('2*2=4', async ({page}) => {
    await page.locator("#button-number-2").click();
    await page.locator('.multiplication').click();
    await page.locator("#button-number-2").click();
    await page.locator('.btnEqual').click();
    await expect(page.locator(".screen")).toContainText('4');
  });
})

test.describe('Specific use cases', () => {
  test('negative number', async ({page}) => {
    await page.locator("#button-number-2").click();
    await page.locator('.soustraction').click();
    await page.locator("#button-number-4").click();
    await page.locator('.btnEqual').click();
    await expect(page.locator(".screen")).toContainText('-2');
    await page.locator('.sum').click();
    await page.locator("#button-number-2").click();
    await page.locator('.btnEqual').click();
    await expect(page.locator(".screen")).toContainText('0');
  });

  test('multiple operators', async ({ page }) => {
    await page.locator("#button-number-2").click();
    await page.locator('.multiplication').click();
    await page.locator('.soustraction').click();
    await page.locator("#button-number-2").click();
    await page.locator('.btnEqual').click();
    await expect(page.locator(".screen")).toContainText('-4');
  });

  test('1+1+1', async ({ page }) => {
    await page.locator("#button-number-1").click();
    await page.locator('.sum').click();
    await page.locator("#button-number-1").click();
    await page.locator('.sum').click();
    await page.locator("#button-number-1").click();
    await expect(page.getByRole('banner')).toContainText('1 + 1 + 1');
  });
})


test.describe('Saisie', () => {
  test('123456789', async ({page}) => {
    await page.locator("#button-number-0").click();
    await page.locator("#button-number-1").click();
    await page.locator("#button-number-2").click();
    await page.locator("#button-number-3").click();
    await page.locator("#button-number-4").click();
    await page.locator("#button-number-5").click();
    await page.locator("#button-number-6").click();
    await page.locator("#button-number-7").click();
    await page.locator("#button-number-8").click();
    await page.locator("#button-number-9").click();
    await expect(page.locator(".screen")).toContainText('123456789');
  });

  test('0 is working', async ({page}) => {
    await page.locator("#button-number-1").click();
    await page.locator("#button-number-0").click();
    await expect(page.locator(".screen")).toContainText('10');
  });
})