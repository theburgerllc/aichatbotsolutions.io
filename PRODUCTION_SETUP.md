# 🚀 Production Setup Guide for AI Chatbot Solutions

This guide will help you properly configure and deploy your AI Chatbot Solutions website to production.

## 📋 Pre-Deployment Checklist

### 1. Stripe Configuration
- [ ] Create a live Stripe account
- [ ] Create a "King Plan" product in Stripe Dashboard
  - Price: $199/month (recurring)
  - Name: "BotPenguin King Plan - AI Chatbot Solution"
- [ ] Copy the live price ID (starts with `price_`)
- [ ] Set up webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
- [ ] Configure webhook events: `checkout.session.completed`, `invoice.payment_succeeded`, `invoice.payment_failed`, `customer.subscription.deleted`
- [ ] Copy webhook secret (starts with `whsec_`)

### 2. BotPenguin Partner Setup
- [ ] Apply for BotPenguin partner program
- [ ] Get your partner ID and redirect URL
- [ ] Configure partner account settings
- [ ] Test the partner redirect flow

### 3. SendGrid Configuration
- [ ] Create SendGrid account
- [ ] Verify your domain (aichatbotsolutions.io)
- [ ] Create API key with send permissions
- [ ] Set up sender authentication
- [ ] Test email delivery

### 4. Google Analytics Setup
- [ ] Create Google Analytics 4 property
- [ ] Copy measurement ID (starts with `G-`)
- [ ] Set up conversion goals
- [ ] Test tracking implementation

## 🔧 Environment Variables Configuration

### Create `.env.production` file:

```bash
# ===== STRIPE CONFIGURATION (PRODUCTION) =====
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
STRIPE_SECRET_KEY=sk_live_your_live_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_live_webhook_secret
NEXT_PUBLIC_STRIPE_KING_PLAN_PRICE_ID=price_your_live_king_plan_price_id

# ===== APPLICATION CONFIGURATION =====
NEXT_PUBLIC_APP_URL=https://aichatbotsolutions.io
NEXTAUTH_URL=https://aichatbotsolutions.io

# ===== BOTPENGUIN PARTNER INTEGRATION =====
NEXT_PUBLIC_BOTPENGUIN_PARTNER_REDIRECT_URL=https://partner.botpenguin.com/reseller/sign_up
NEXT_PUBLIC_BOTPENGUIN_PARTNER_ID=your_real_partner_id

# ===== SENDGRID CONFIGURATION =====
SENDGRID_API_KEY=SG.your_production_sendgrid_api_key
SENDGRID_FROM_EMAIL=hello@aichatbotsolutions.io

# ===== ANALYTICS =====
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR_MEASUREMENT_ID

# ===== BOTPENGUIN CHAT WIDGET (OPTIONAL) =====
NEXT_PUBLIC_BOTPENGUIN_BOT_ID=your_production_bot_id
NEXT_PUBLIC_BOTPENGUIN_CUSTOMER_ID=your_production_customer_id

# ===== SECURITY =====
NEXTAUTH_SECRET=your_secure_nextauth_secret_here
JWT_SECRET=your_secure_jwt_secret_here

# ===== BUSINESS INFORMATION =====
BUSINESS_NAME=AI Chatbot Solutions
BUSINESS_EMAIL=hello@aichatbotsolutions.io
BUSINESS_PHONE=+1-555-CHATBOT
BUSINESS_ADDRESS=123 Innovation Drive, Tech City, TC 12345, USA
```

## 🌐 Deployment Instructions

### Option 1: Vercel Deployment (Recommended)

1. **Connect GitHub Repository:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy from repository
   vercel --prod
   ```

2. **Configure Environment Variables in Vercel:**
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add all production environment variables
   - Ensure "Production" is selected for environment

3. **Set up Custom Domain:**
   - Add `aichatbotsolutions.io` in Vercel domains section
   - Configure DNS records as instructed by Vercel

### Option 2: Manual Deployment

1. **Build the Application:**
   ```bash
   npm run build
   npm start
   ```

2. **Server Configuration:**
   - Ensure Node.js 18+ is installed
   - Configure reverse proxy (nginx/Apache)
   - Set up SSL certificates
   - Configure environment variables

## 🔐 Security Configuration

### 1. Environment Variables
- Never commit production keys to version control
- Use secure environment variable management
- Rotate keys regularly
- Use different keys for staging/production

### 2. HTTPS Configuration
- Ensure all traffic is HTTPS
- Configure security headers
- Set up HSTS
- Use secure cookies

### 3. Domain Verification
- Verify SendGrid domain
- Set up proper DNS records
- Configure SPF/DKIM records for email delivery

## 🧪 Testing Production Setup

### 1. Payment Flow Test
```bash
# Test with Stripe test cards in production environment
# Card: 4242424242424242 (Visa)
# Expiry: Any future date
# CVC: Any 3 digits
```

### 2. Email Delivery Test
- Submit contact form
- Verify admin notification received
- Check customer auto-response
- Test different email scenarios

### 3. BotPenguin Integration Test
- Complete a test purchase
- Verify redirect to BotPenguin partner portal
- Check customer data transfer
- Confirm account provisioning

### 4. Analytics Verification
- Check Google Analytics real-time data
- Verify conversion tracking
- Test event firing for purchases
- Confirm UTM parameter tracking

## 📊 Monitoring & Maintenance

### 1. Performance Monitoring
- Set up Vercel Analytics
- Monitor Core Web Vitals
- Track conversion rates
- Monitor error rates

### 2. Uptime Monitoring
- Set up status page monitoring
- Configure alert notifications
- Monitor API endpoint health
- Track payment success rates

### 3. Regular Maintenance
- Update dependencies monthly
- Review security logs
- Monitor stripe webhook health
- Check email delivery rates

## 🚨 Troubleshooting

### Common Issues:

1. **Stripe Webhook Failures:**
   - Check webhook URL is accessible
   - Verify webhook secret matches
   - Check endpoint response format

2. **Email Delivery Issues:**
   - Verify SendGrid domain authentication
   - Check SPF/DKIM records
   - Review sender reputation

3. **BotPenguin Redirect Failures:**
   - Verify partner credentials
   - Check redirect URL format
   - Ensure proper metadata transfer

### Getting Help:
- Check Vercel deployment logs
- Review browser console errors
- Check API endpoint responses
- Contact platform support teams

## 📞 Support Contacts

- **Stripe Support:** https://support.stripe.com/
- **BotPenguin Support:** https://help.botpenguin.com/
- **SendGrid Support:** https://support.sendgrid.com/
- **Vercel Support:** https://vercel.com/help

---

## ✅ Production Deployment Checklist

- [ ] All environment variables configured
- [ ] Stripe live mode tested
- [ ] SendGrid domain verified
- [ ] BotPenguin partner setup complete
- [ ] Google Analytics tracking verified
- [ ] SSL certificate configured
- [ ] Custom domain set up
- [ ] Payment flow tested end-to-end
- [ ] Email delivery confirmed
- [ ] Analytics events firing
- [ ] Error monitoring set up
- [ ] Backup procedures in place

**Once all items are checked, your AI Chatbot Solutions website is ready for production! 🎉**