import { expect, test, type Page } from "@playwright/test";

async function expectSocialMetadata(
  page: Page,
  {
    canonicalUrl,
    imageUrl,
    ogType,
  }: {
    canonicalUrl: string;
    imageUrl: string;
    ogType: "website" | "article";
  },
) {
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonicalUrl);
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", ogType);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", imageUrl);
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", imageUrl);
}

test("home page exposes the main teaching headline and navigation", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Lessons built on curiosity, filmed across the world." }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "About" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Explore monthly lessons" })).toBeVisible();
});

test("home page exposes logo-based social metadata", async ({ page }) => {
  await page.goto("/");

  await expectSocialMetadata(page, {
    canonicalUrl: "https://lightscamerateach.com/",
    imageUrl: "https://lightscamerateach.com/assets/lights-camera-teach-logo.png",
    ogType: "website",
  });
});
