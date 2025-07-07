'use client'

import { motion } from 'framer-motion'
import { FadeIn } from '@/components/animations/FadeIn'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const testimonials = [
  {
    name: 'Dr. Sarah Martinez',
    position: 'Practice Administrator',
    company: 'Martinez Family Medicine',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1-494790108755-2616b612b17d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    content: 'Our no-show rate dropped from 25% to 8% after implementing the healthcare chatbot. Automated appointment reminders and easy rescheduling have transformed our practice efficiency.',
    rating: 5
  },
  {
    name: 'Michael Chen, Esq.',
    position: 'Managing Partner',
    company: 'Chen & Associates Law Firm',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    content: 'The legal chatbot handles client intake brilliantly. It collects all necessary information before consultations, saving us 2 hours per day and improving our case preparation.',
    rating: 5
  },
  {
    name: 'Dr. Emily Rodriguez',
    position: 'Chief Medical Officer',
    company: 'Riverside Medical Center',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    content: 'HIPAA compliance was seamless, and our patients love the 24/7 symptom triage. The chatbot routes urgent cases appropriately while handling routine inquiries automatically.',
    rating: 5
  },
  {
    name: 'David Thompson, Esq.',
    position: 'Solo Practitioner',
    company: 'Thompson Immigration Law',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    content: 'As a solo practitioner, the chatbot is like having a 24/7 receptionist. It screens potential clients, schedules consultations, and collects case details - incredibly valuable.',
    rating: 5
  },
  {
    name: 'Dr. Lisa Wang',
    position: 'Dental Practice Owner',
    company: 'SmileCare Dental Group',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    content: 'Patient satisfaction scores increased by 35% since implementing the healthcare chatbot. Patients can schedule appointments, get post-op instructions, and ask questions anytime.',
    rating: 5
  },
  {
    name: 'James Miller, Esq.',
    position: 'Family Law Attorney',
    company: 'Miller Family Law',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    content: 'The chatbot helps clients understand our services and costs upfront. This transparency has improved client relationships and reduced time spent on initial consultations.',
    rating: 5
  }
]

export default function TestimonialsSlider() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-heading">
            Trusted by Legal & Healthcare Professionals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how law firms and healthcare practices are improving efficiency and client satisfaction with our AI solutions
          </p>
        </motion.div>

        {/* Testimonials Slider */}
        <FadeIn delay={200}>
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-brand-blue',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-brand-green',
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex flex-col h-full">
                      {/* Quote Icon */}
                      <div className="mb-4">
                        <Quote className="h-8 w-8 text-brand-blue opacity-50" />
                      </div>

                      {/* Rating */}
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>

                      {/* Content */}
                      <blockquote className="text-gray-700 mb-6 flex-grow leading-relaxed">
                        "{testimonial.content}"
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {testimonial.position}, {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </FadeIn>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-brand-blue mb-2">500+</div>
                <div className="text-gray-600">Practices Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-blue mb-2">40%</div>
                <div className="text-gray-600">Reduction in No-Shows</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-blue mb-2">HIPAA</div>
                <div className="text-gray-600">Compliant</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-blue mb-2">24/7</div>
                <div className="text-gray-600">AI Support</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        .testimonials-swiper .swiper-pagination {
          bottom: -50px !important;
        }
        
        .testimonials-swiper .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          margin: 0 6px !important;
        }
        
        .testimonials-swiper .swiper-button-next,
        .testimonials-swiper .swiper-button-prev {
          color: #1E64E0 !important;
          font-weight: bold !important;
        }
        
        .testimonials-swiper .swiper-button-next:after,
        .testimonials-swiper .swiper-button-prev:after {
          font-size: 20px !important;
        }
      `}</style>
    </section>
  )
}