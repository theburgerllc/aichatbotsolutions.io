# AI Chatbot Solutions - Legal & Healthcare Automation

A professional Next.js 15 website offering custom AI chatbot solutions specifically designed for legal and healthcare practices. This project implements industry-specific chatbot services powered by enterprise AI technology with HIPAA compliance and legal industry standards.

## 🚀 Overview

This website provides custom AI chatbot solutions for legal and healthcare professionals, featuring:
- **Legal Chatbot Suite**: Client intake automation, appointment scheduling, case management workflows
- **Healthcare Chatbot Suite**: HIPAA-compliant patient communication, appointment reminders, symptom triage

The platform uses BotPenguin's enterprise infrastructure as the backend technology while delivering industry-specific solutions.

### Key Features

- **Industry-Specific Solutions**: Tailored chatbot workflows for legal and healthcare practices
- **Stripe Payment Integration**: Setup fees + monthly subscriptions with industry-specific pricing
- **HIPAA Compliance**: Enterprise-grade security for healthcare communications
- **Custom Integrations**: Practice management systems, EMR/EHR, CRM integration
- **Professional Design**: Mobile-first approach with Tailwind CSS
- **Performance Optimized**: Next.js 15 with App Router, image optimization, and SSR
- **Analytics Ready**: Google Analytics 4 integration with conversion tracking
- **Contact System**: Industry-specific lead capture with SendGrid integration

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4.0 with custom brand colors
- **UI Components**: shadcn/ui for consistent design system
- **Animations**: Framer Motion for micro-interactions
- **Carousel**: Swiper.js for testimonials
- **Payments**: Stripe Elements with subscription billing
- **Email**: SendGrid for contact form and notifications
- **Analytics**: Google Analytics 4
- **Deployment**: Vercel with edge CDN

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/aichatbotsolutions.io.git
cd aichatbotsolutions.io
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

4. **Configure your environment variables** (see section below)

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 🔧 Environment Variables

Copy `.env.example` to `.env.local` and configure the following:

### Development Setup

```env
# Stripe Configuration (Use TEST keys for development)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_test_publishable_key
STRIPE_SECRET_KEY=sk_test_your_test_secret_key
STRIPE_WEBHOOK_SECRET=whsec_test_your_webhook_secret
NEXT_PUBLIC_STRIPE_KING_PLAN_PRICE_ID=price_test_king_plan_id

# BotPenguin Partner Integration
NEXT_PUBLIC_BOTPENGUIN_PARTNER_REDIRECT_URL=https://partner.botpenguin.com/reseller/sign_up
NEXT_PUBLIC_BOTPENGUIN_PARTNER_ID=your_partner_id_here

# SendGrid Configuration
SENDGRID_API_KEY=SG.your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=noreply@yourdomain.com

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Production Setup

For production deployment, see `PRODUCTION_SETUP.md` for detailed configuration instructions.

### Optional Variables

```env
# Google Analytics (Recommended)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# BotPenguin Chat Widget (Optional)
NEXT_PUBLIC_BOTPENGUIN_BOT_ID=your_bot_id_here
NEXT_PUBLIC_BOTPENGUIN_CUSTOMER_ID=your_customer_id_here

# Razorpay (Optional for international customers)
NEXT_PUBLIC_USE_RAZORPAY=false
RAZORPAY_KEY_ID=rzp_live_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

## 💳 Payment Flow Setup

### 1. Stripe Configuration

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Create subscription products for both suites:
   - Legal Chatbot Suite: Setup fee + $200/month recurring
   - Healthcare Chatbot Suite: Setup fee + $250/month recurring
3. Copy the Price IDs to environment variables:
   - `NEXT_PUBLIC_STRIPE_LEGAL_SUITE_PRICE_ID`
   - `NEXT_PUBLIC_STRIPE_HEALTHCARE_SUITE_PRICE_ID`
4. Set up webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
5. Configure webhook to listen for: `checkout.session.completed`, `invoice.payment_succeeded`, `invoice.payment_failed`

### 2. BotPenguin Integration Setup

1. Set up BotPenguin enterprise account for backend infrastructure
2. Configure partner integration for automated provisioning
3. Set up HIPAA-compliant hosting for healthcare clients
4. Test the flow with both legal and healthcare service configurations

### 3. SendGrid Configuration

1. Create a SendGrid account
2. Create an API key with send permissions
3. Verify your sender domain/email
4. Test the contact form to ensure emails are delivered

## 🏗️ Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── contact/              # Contact form handler
│   │   ├── create-checkout-session/ # Stripe checkout
│   │   ├── checkout-success/     # Payment success handler
│   │   └── webhooks/stripe/      # Stripe webhooks
│   ├── about/                    # About page
│   ├── contact/                  # Contact page
│   ├── pricing/                  # Pricing page
│   ├── success/                  # Payment success page
│   ├── layout.tsx                # Root layout with SEO
│   └── page.tsx                  # Home page
├── components/                   # React components
│   ├── sections/                 # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── BenefitsSection.tsx
│   │   ├── TestimonialsSlider.tsx
│   │   ├── PricingTable.tsx
│   │   └── FAQAccordion.tsx
│   ├── ui/                       # shadcn/ui components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── CookieConsentBanner.tsx
└── lib/                          # Utilities
    └── utils.ts
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Connect to Vercel**
```bash
npx vercel
```

2. **Set environment variables** in Vercel dashboard

3. **Configure custom domain** (optional)

4. **Set up Stripe webhook** with your production URL

### Manual Deployment

1. **Build the project**
```bash
npm run build
```

2. **Start production server**
```bash
npm start
```

## 📊 Analytics & Tracking

The website includes comprehensive tracking:

- **Google Analytics 4**: Page views, user behavior, conversion tracking
- **Stripe Analytics**: Payment success/failure rates for both suites
- **Contact Form Tracking**: Industry-specific lead tracking and response times
- **Conversion Events**: Legal/Healthcare suite signups, consultation requests, demo bookings

## 🔒 Security Features

- **Payment Security**: Stripe handles all payment processing with PCI compliance
- **HIPAA Compliance**: Enterprise-grade encryption and access controls for healthcare data
- **Data Protection**: No sensitive patient/client data stored locally
- **HTTPS Only**: All traffic encrypted with SSL/TLS
- **GDPR Compliant**: Cookie consent and privacy controls
- **Webhook Verification**: All Stripe webhooks verified
- **Audit Logging**: Complete audit trails for compliance requirements

## 🧪 Testing

### Payment Flow Testing

1. **Use Stripe test mode** with test cards:
   - Success: `4242 4242 4242 4242`
   - Declined: `4000 0000 0000 0002`

2. **Test both service flows**:
   - Legal Chatbot Suite checkout and provisioning
   - Healthcare Chatbot Suite checkout and provisioning

3. **Verify webhook handling** with Stripe CLI

4. **Test industry-specific forms** and data collection

### Email (SendGrid)
- Install: `npm i @sendgrid/mail @sendgrid/client`
- Env: `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL` (verified sender or domain), optional `SENDGRID_EU=1` for EU-pinned subusers.
- API route: `/api/contact` (server-only) sends mail via SendGrid.
- **Security:** Use a restricted API key (Mail Send only). Keep keys server-side.
- **EU Residency:** When `SENDGRID_EU=1`, the client uses `https://api.eu.sendgrid.com`.

### Contact Form Testing

1. Test form validation and error handling
2. Verify SendGrid email delivery for both legal and healthcare inquiries
3. Test industry selection functionality
4. Check auto-response functionality with industry-specific content

## 🎨 Customization

### Brand Colors

The website uses custom brand colors defined in `globals.css`:
- Primary Blue: `#1E64E0`
- Accent Green: `#6FF35F`

### Logo Replacement

Custom PNG logos are already integrated in `/public/images/`:
- `logo.png` - Main logo for hero and footer
- `nav_bar_logo.png` - Icon for navbar
- `favicon.png` - Browser favicon

### Content Updates

Industry-specific content is already implemented:
- Legal/Healthcare hero section in `HeroSection.tsx`
- Practice-focused benefits in `BenefitsSection.tsx`
- Professional testimonials in `TestimonialsSlider.tsx`
- Industry-specific FAQ content in `FAQAccordion.tsx`
- Two-tier pricing structure in `PricingTable.tsx`

## 📈 Conversion Optimization

The website is optimized for conversions with:

- **Clear Value Proposition**: Industry-specific solutions for legal and healthcare practices
- **Social Proof**: Professional testimonials from actual law firms and medical practices
- **Trust Indicators**: HIPAA compliance badges and security certifications
- **Risk Reversal**: Free consultation and comprehensive support included
- **Multiple CTAs**: Targeted entry points for each industry throughout the funnel
- **Practice-Focused Copy**: Industry-specific pain points and solutions highlighted

## 🤝 Support

For technical support or questions:

- **Email**: hello@aichatbotsolutions.io
- **Documentation**: Check this README and code comments
- **Issues**: Create GitHub issues for bugs or feature requests

## 📄 License

This project is licensed under the Apache License 2.0. See [LICENSE](LICENSE) for details.


**Professional AI chatbot solutions for legal and healthcare practices. Built with Next.js 15, enterprise-grade security, and industry-specific workflows.**