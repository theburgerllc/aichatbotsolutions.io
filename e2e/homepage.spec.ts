import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load the homepage', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/AI Chatbot Solutions/i)

    // Check main heading is visible
    const heading = page.locator('h1').first()
    await expect(heading).toBeVisible()
    await expect(heading).toContainText(/AI/i)
  })

  test('should display navigation menu', async ({ page }) => {
    // Check navbar is visible
    const navbar = page.locator('nav').first()
    await expect(navbar).toBeVisible()

    // Check navigation links
    const navLinks = ['Features', 'Industries', 'Pricing', 'About', 'Contact']
    for (const link of navLinks) {
      await expect(page.locator('nav').getByText(link)).toBeVisible()
    }
  })

  test('should have a working CTA button', async ({ page }) => {
    // Find and click the main CTA button
    const ctaButton = page.getByRole('button', { name: /Book Demo|Get Started|Start Free/i }).first()
    await expect(ctaButton).toBeVisible()
    
    // Click and verify navigation
    await ctaButton.click()
    
    // Should navigate to demo or contact page
    await expect(page.url()).toMatch(/demo|contact|book|calendar/i)
  })

  test('should display footer with company information', async ({ page }) => {
    // Scroll to footer
    const footer = page.locator('footer')
    await footer.scrollIntoViewIfNeeded()
    await expect(footer).toBeVisible()

    // Check footer contains important links
    await expect(footer.getByText(/Privacy Policy/i)).toBeVisible()
    await expect(footer.getByText(/Terms/i)).toBeVisible()
  })

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Check mobile menu button is visible
    const mobileMenuButton = page.locator('button[aria-label*="menu"]').or(page.locator('button').filter({ hasText: /menu/i }))
    await expect(mobileMenuButton).toBeVisible()

    // Click mobile menu
    await mobileMenuButton.click()

    // Check mobile menu is expanded
    const mobileMenu = page.locator('[data-testid="mobile-menu"]').or(page.locator('nav').filter({ hasText: /Features.*Industries.*Pricing/i }))
    await expect(mobileMenu).toBeVisible()
  })
})
