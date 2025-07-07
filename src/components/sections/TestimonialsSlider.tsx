'use client'

import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const testimonials = [
  {
    name: 'Sarah Johnson',
    position: 'CEO',
    company: 'TechStart Inc.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1-494790108755-2616b612b17d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    content: 'Our customer support costs dropped by 60% within the first month of implementing their AI chatbot. The ROI was incredible, and customer satisfaction actually improved!',
    rating: 5
  },
  {
    name: 'Michael Chen',
    position: 'Marketing Director',
    company: 'E-commerce Plus',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    content: 'The chatbot increased our sales conversion by 45%. It guides customers through our product catalog perfectly and answers questions instantly, even at 3 AM.',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    position: 'Customer Success Manager',
    company: 'SaaS Solutions',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    content: 'Implementation was seamless, and the analytics dashboard gives us incredible insights into customer behavior. Our team can focus on complex issues while the bot handles routine queries.',
    rating: 5
  },
  {
    name: 'David Thompson',
    position: 'Operations Manager',
    company: 'Retail Chain Co.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    content: 'We deployed across 15 store locations and 3 online platforms. The multi-channel support is fantastic - customers get consistent help whether they\'re on our website or WhatsApp.',
    rating: 5
  },
  {
    name: 'Lisa Wang',
    position: 'Head of Customer Experience',
    company: 'Financial Services Ltd.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    content: 'Security was our biggest concern, but their enterprise-grade protection exceeded our compliance requirements. We now handle 3x more customer inquiries with the same team size.',
    rating: 5
  },
  {
    name: 'James Miller',
    position: 'Founder',
    company: 'Local Business Hub',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    content: 'As a small business, we couldn\'t afford 24/7 support staff. Now our chatbot handles customer inquiries around the clock, and our revenue has grown 30% in just 6 months.',
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
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - see how businesses like yours are transforming their customer experience
          </p>
        </motion.div>

        {/* Testimonials Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
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
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
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
        </motion.div>

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
                <div className="text-3xl font-bold text-brand-blue mb-2">10,000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-blue mb-2">99.9%</div>
                <div className="text-gray-600">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-blue mb-2">40%</div>
                <div className="text-gray-600">Average Sales Increase</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-blue mb-2">24/7</div>
                <div className="text-gray-600">Support Available</div>
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