# AI Chatbot Solutions - BotPenguin King Plan Reseller

A high-converting sales funnel website built with Next.js 15 for reselling BotPenguin's King Plan. This project implements a complete payment flow with Stripe integration and automatic BotPenguin partner account provisioning.

## 🚀 Overview

This website serves as a reseller funnel for BotPenguin's King Plan, offering customers a 50% discount ($199/month instead of $399/month) while providing a 40% recurring revenue share to the reseller through BotPenguin's partner program.

### Key Features

- **Modern Sales Funnel**: Optimized for conversions with compelling copy and social proof
- **Stripe Payment Integration**: Secure subscription billing with webhook handling
- **BotPenguin Partner Integration**: Automatic account provisioning after payment
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance Optimized**: Next.js 15 with App Router, image optimization, and SSR
- **Analytics Ready**: Google Analytics 4 integration with conversion tracking
- **Contact System**: SendGrid-powered contact form with auto-responses

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
2. Create a recurring subscription product for the King Plan ($199/month)
3. Copy the Price ID to `NEXT_PUBLIC_STRIPE_KING_PLAN_PRICE_ID`
4. Set up webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
5. Configure webhook to listen for: `checkout.session.completed`, `invoice.payment_succeeded`, `invoice.payment_failed`

### 2. BotPenguin Partner Setup

1. Apply for BotPenguin's partner program
2. Get your partner ID and redirect URL
3. Configure the partner redirect URL in your BotPenguin dashboard
4. Test the flow with a test payment to ensure proper account provisioning

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
- **Stripe Analytics**: Payment success/failure rates
- **Contact Form Tracking**: Submission rates and response times
- **Conversion Events**: King Plan signups, trial starts, contact submissions

## 🔒 Security Features

- **Payment Security**: Stripe handles all payment processing
- **Data Protection**: No sensitive data stored locally
- **HTTPS Only**: All traffic encrypted
- **GDPR Compliant**: Cookie consent and privacy controls
- **Webhook Verification**: All Stripe webhooks verified

## 🧪 Testing

### Payment Flow Testing

1. **Use Stripe test mode** with test cards:
   - Success: `4242 4242 4242 4242`
   - Declined: `4000 0000 0000 0002`

2. **Test BotPenguin redirect** in sandbox mode

3. **Verify webhook handling** with Stripe CLI

### Contact Form Testing

1. Test form validation and error handling
2. Verify SendGrid email delivery
3. Check auto-response functionality

## 🎨 Customization

### Brand Colors

The website uses custom brand colors defined in `globals.css`:
- Primary Blue: `#1E64E0`
- Accent Green: `#6FF35F`

### Logo Replacement

Replace the placeholder logos in `/public/images/`:
- `logo.svg` - Main logo for hero and footer
- `nav_bar_logo.svg` - Icon for navbar

### Content Updates

Main content areas to customize:
- Hero section copy in `HeroSection.tsx`
- Benefits and features in `BenefitsSection.tsx`
- Testimonials in `TestimonialsSlider.tsx`
- FAQ content in `FAQAccordion.tsx`

## 📈 Conversion Optimization

The website is optimized for conversions with:

- **Clear Value Proposition**: 50% savings on King Plan
- **Social Proof**: Customer testimonials and trust indicators
- **Urgency Elements**: Limited-time offer messaging
- **Risk Reversal**: Free trial and money-back guarantee
- **Multiple CTAs**: Various entry points throughout the funnel

## 🤝 Support

For technical support or questions:

- **Email**: hello@aichatbotsolutions.io
- **Documentation**: Check this README and code comments
- **Issues**: Create GitHub issues for bugs or feature requests

## 📄 License

This project is licensed under the Apache License 2.0. See [LICENSE](LICENSE) for details.

---

**Built with ❤️ using Next.js 15, Tailwind CSS, and modern web technologies.**