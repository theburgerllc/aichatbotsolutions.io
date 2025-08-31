import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@/test/utils'
import Navbar from './Navbar'

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}))

describe('Navbar Component', () => {
  it('should render the logo and company name', () => {
    render(<Navbar />)
    
    const logo = screen.getByAltText(/logo/i)
    expect(logo).toBeInTheDocument()
    
    const companyName = screen.getByText(/AI Chatbot Solutions/i)
    expect(companyName).toBeInTheDocument()
  })

  it('should render all navigation links', () => {
    render(<Navbar />)
    
    const expectedLinks = ['Features', 'Industries', 'Pricing', 'About', 'Contact']
    
    expectedLinks.forEach(link => {
      const element = screen.getByText(new RegExp(link, 'i'))
      expect(element).toBeInTheDocument()
    })
  })

  it('should render the demo button', () => {
    render(<Navbar />)
    
    const demoButton = screen.getByRole('button', { name: /Book Demo/i })
    expect(demoButton).toBeInTheDocument()
  })

  it('should toggle mobile menu when hamburger is clicked', () => {
    render(<Navbar />)
    
    // Find the mobile menu button (usually has aria-label)
    const mobileMenuButton = screen.getByRole('button', { name: /menu/i })
    
    // Initially mobile menu should be closed
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()
    
    // Click to open
    fireEvent.click(mobileMenuButton)
    
    // Mobile menu should be visible
    const mobileMenu = screen.getByTestId('mobile-menu')
    expect(mobileMenu).toBeInTheDocument()
    
    // Click to close
    fireEvent.click(mobileMenuButton)
    
    // Mobile menu should be hidden
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument()
  })

  it('should have correct href attributes for links', () => {
    render(<Navbar />)
    
    const featuresLink = screen.getByText(/Features/i).closest('a')
    expect(featuresLink).toHaveAttribute('href', expect.stringContaining('features'))
    
    const pricingLink = screen.getByText(/Pricing/i).closest('a')
    expect(pricingLink).toHaveAttribute('href', expect.stringContaining('pricing'))
  })

  it('should apply sticky positioning on scroll', () => {
    render(<Navbar />)
    
    const navbar = screen.getByRole('navigation')
    
    // Initial state
    expect(navbar).toHaveClass(expect.stringContaining('navbar'))
    
    // Simulate scroll
    fireEvent.scroll(window, { target: { scrollY: 100 } })
    
    // Should have sticky/scrolled class
    expect(navbar).toHaveClass(expect.stringContaining('sticky') || expect.stringContaining('scrolled'))
  })

  it('should highlight active page link', () => {
    // Mock the current pathname
    vi.mock('next/navigation', () => ({
      usePathname: () => '/features',
    }))
    
    render(<Navbar />)
    
    const activeLink = screen.getByText(/Features/i).closest('a')
    expect(activeLink).toHaveClass(expect.stringContaining('active'))
  })
})
