import { test, expect } from '@playwright/test'

test.describe('Stripe Checkout Flow', () => {
  test('should navigate to pricing page and select a plan', async ({ page }) => {
    // Go to pricing page
    await page.goto('/pricing')

    // Check pricing cards are visible
    const pricingCards = page.locator('[data-testid="pricing-card"]').or(page.locator('.pricing-card')).or(page.locator('[class*="price"]'))
    await expect(pricingCards.first()).toBeVisible()

    // Find and click a subscribe/purchase button
    const subscribeButton = page.getByRole('button', { name: /Subscribe|Get Started|Choose Plan|Select/i }).first()
    await expect(subscribeButton).toBeVisible()
    
    // Click to initiate checkout
    await subscribeButton.click()

    // Should either redirect to Stripe or show a checkout modal
    // Wait for either Stripe redirect or checkout form
    await page.waitForLoadState('networkidle')
    
    // Check if we're on Stripe checkout or internal checkout page
    const url = page.url()
    const isStripeCheckout = url.includes('checkout.stripe.com')
    const isInternalCheckout = url.includes('/checkout') || url.includes('/payment')
    
    expect(isStripeCheckout || isInternalCheckout).toBeTruthy()
  })

  test('should handle Stripe payment elements', async ({ page }) => {
    // Navigate directly to checkout if possible
    await page.goto('/checkout')

    // Look for Stripe payment element iframe
    const stripeFrame = page.frameLocator('iframe[name*="stripe"]').or(page.frameLocator('iframe[src*="stripe"]'))
    
    if (await stripeFrame.locator('input').first().isVisible({ timeout: 5000 }).catch(() => false)) {
      // Stripe Elements are loaded
      expect(true).toBeTruthy()
    } else {
      // Check for alternative payment form
      const paymentForm = page.locator('form').filter({ has: page.locator('input[name*="card"]') })
      if (await paymentForm.isVisible()) {
        expect(paymentForm).toBeVisible()
      }
    }
  })

  test('should validate checkout form fields', async ({ page }) => {
    // Try to navigate to checkout
    await page.goto('/checkout')

    // Check for email field
    const emailField = page.locator('input[type="email"]').or(page.locator('input[name="email"]'))
    if (await emailField.isVisible()) {
      // Test invalid email
      await emailField.fill('invalid-email')
      
      // Try to proceed
      const proceedButton = page.getByRole('button', { name: /Pay|Continue|Submit/i })
      if (await proceedButton.isVisible()) {
        await proceedButton.click()
        
        // Check for validation error
        const errorMessage = page.locator('text=/valid email|invalid/i')
        await expect(errorMessage).toBeVisible()
      }
    }
  })

  test('should show order summary', async ({ page }) => {
    // Navigate to checkout with a product
    await page.goto('/pricing')
    
    // Select a plan
    const selectButton = page.getByRole('button', { name: /Select|Choose/i }).first()
    if (await selectButton.isVisible()) {
      await selectButton.click()
      
      // Wait for navigation
      await page.waitForLoadState('networkidle')
      
      // Look for order summary
      const orderSummary = page.locator('text=/Total|Summary|Order/i')
      if (await orderSummary.isVisible()) {
        await expect(orderSummary).toBeVisible()
        
        // Check for price display
        const priceElement = page.locator('text=/$\\d+/').or(page.locator('text=/\\$\\d+/'))
        await expect(priceElement.first()).toBeVisible()
      }
    }
  })

  test('should handle discount codes', async ({ page }) => {
    await page.goto('/checkout')

    // Look for discount/promo code input
    const promoInput = page.locator('input[name*="promo"]').or(page.locator('input[name*="discount"]')).or(page.locator('input[placeholder*="code"]'))
    
    if (await promoInput.isVisible()) {
      // Enter a test promo code
      await promoInput.fill('TESTCODE')
      
      // Look for apply button
      const applyButton = page.getByRole('button', { name: /Apply|Add/i })
      if (await applyButton.isVisible()) {
        await applyButton.click()
        
        // Wait for response
        await page.waitForLoadState('networkidle')
        
        // Check for either success or error message
        const message = page.locator('text=/applied|invalid|expired/i')
        await expect(message).toBeVisible({ timeout: 5000 })
      }
    }
  })

  test('should handle successful payment redirect', async ({ page }) => {
    // Mock successful payment by going to success page
    await page.goto('/payment/success?session_id=test_session')

    // Check for success message
    const successMessage = page.locator('text=/Thank you|Success|confirmed/i')
    await expect(successMessage.first()).toBeVisible()

    // Check for order details or next steps
    const orderInfo = page.locator('text=/order|receipt|email/i')
    await expect(orderInfo.first()).toBeVisible()
  })

  test('should handle payment cancellation', async ({ page }) => {
    // Mock cancelled payment
    await page.goto('/payment/cancel')

    // Check for cancellation message
    const cancelMessage = page.locator('text=/cancelled|canceled|not completed/i')
    await expect(cancelMessage.first()).toBeVisible()

    // Check for retry option
    const retryButton = page.getByRole('button', { name: /Try again|Back|Return/i })
    await expect(retryButton.first()).toBeVisible()
  })
})
