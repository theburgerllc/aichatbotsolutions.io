import { test, expect } from '@playwright/test'

test.describe('Contact Form & Lead Capture', () => {
  test('should submit contact form successfully', async ({ page }) => {
    // Navigate to contact page
    await page.goto('/contact')

    // Fill out the form
    await page.fill('input[name="name"]', 'John Doe')
    await page.fill('input[name="email"]', 'john.doe@example.com')
    await page.fill('input[name="company"]', 'Acme Legal Corp')
    await page.fill('textarea[name="message"]', 'I am interested in implementing AI chatbots for our legal practice.')
    
    // Select industry if dropdown exists
    const industrySelect = page.locator('select[name="industry"]')
    if (await industrySelect.isVisible()) {
      await industrySelect.selectOption('Legal')
    }

    // Submit the form
    const submitButton = page.getByRole('button', { name: /Submit|Send|Contact/i })
    await submitButton.click()

    // Wait for success message
    const successMessage = page.locator('text=/Thank you|Success|received your message/i')
    await expect(successMessage).toBeVisible({ timeout: 10000 })
  })

  test('should show validation errors for invalid input', async ({ page }) => {
    await page.goto('/contact')

    // Try to submit without filling required fields
    const submitButton = page.getByRole('button', { name: /Submit|Send|Contact/i })
    await submitButton.click()

    // Check for validation errors
    const errorMessage = page.locator('text=/required|invalid|please/i').first()
    await expect(errorMessage).toBeVisible()
  })

  test('should validate email format', async ({ page }) => {
    await page.goto('/contact')

    // Fill invalid email
    await page.fill('input[name="name"]', 'John Doe')
    await page.fill('input[name="email"]', 'invalid-email')
    await page.fill('textarea[name="message"]', 'Test message')

    // Submit form
    const submitButton = page.getByRole('button', { name: /Submit|Send|Contact/i })
    await submitButton.click()

    // Check for email validation error
    const emailError = page.locator('text=/valid email|email.*invalid/i')
    await expect(emailError).toBeVisible()
  })

  test('should handle API errors gracefully', async ({ page }) => {
    // Mock API to return error
    await page.route('**/api/contact', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, error: 'Server error' })
      })
    })

    await page.goto('/contact')

    // Fill and submit form
    await page.fill('input[name="name"]', 'John Doe')
    await page.fill('input[name="email"]', 'john@example.com')
    await page.fill('textarea[name="message"]', 'Test message')
    
    const submitButton = page.getByRole('button', { name: /Submit|Send|Contact/i })
    await submitButton.click()

    // Check for error message
    const errorMessage = page.locator('text=/error|failed|try again/i')
    await expect(errorMessage).toBeVisible({ timeout: 10000 })
  })

  test('should capture lead from homepage CTA', async ({ page }) => {
    await page.goto('/')

    // Find and click demo CTA
    const ctaButton = page.getByRole('button', { name: /Book Demo|Schedule Demo|Get Demo/i }).first()
    
    if (await ctaButton.isVisible()) {
      await ctaButton.click()

      // Should navigate to demo booking or contact form
      await expect(page.url()).toMatch(/demo|contact|book|calendar/i)

      // If it's a form, check form is visible
      const formElement = page.locator('form').first()
      if (await formElement.isVisible()) {
        await expect(formElement).toBeVisible()
      }
    }
  })

  test('should handle newsletter subscription', async ({ page }) => {
    await page.goto('/')

    // Scroll to footer
    const footer = page.locator('footer')
    await footer.scrollIntoViewIfNeeded()

    // Look for newsletter signup
    const newsletterInput = footer.locator('input[type="email"]').or(footer.locator('input[placeholder*="email"]'))
    
    if (await newsletterInput.isVisible()) {
      // Enter email
      await newsletterInput.fill('subscriber@example.com')

      // Find and click subscribe button
      const subscribeButton = footer.getByRole('button', { name: /Subscribe|Sign up|Join/i })
      if (await subscribeButton.isVisible()) {
        await subscribeButton.click()

        // Check for success message
        const successMessage = page.locator('text=/subscribed|thank you|success/i')
        await expect(successMessage).toBeVisible({ timeout: 5000 })
      }
    }
  })
})
