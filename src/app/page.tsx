import HeroSection from '@/components/sections/HeroSection'
import BenefitsSection from '@/components/sections/BenefitsSection'
import TestimonialsSlider from '@/components/sections/TestimonialsSlider'
import PricingTable from '@/components/sections/PricingTable'
import FAQAccordion from '@/components/sections/FAQAccordion'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BenefitsSection />
      <TestimonialsSlider />
      <PricingTable />
      <FAQAccordion />
    </div>
  )
}
