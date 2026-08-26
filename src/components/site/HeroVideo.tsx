import React from 'react'
import { ChevronRight } from 'lucide-react'
import { gaAttrs } from '@/lib/analytics'
import { siteConfig } from '@/lib/site'

const HeroVideo = () => {
  return (
    <div className='h-dvh p-12 pt-30'>
        <div className='relative bg-black h-full w-full rounded-md overflow-hidden'>
          <video
            className='absolute inset-0 h-full w-full object-cover object-top'
            autoPlay
            muted
            loop
            playsInline
            preload='auto'
            tabIndex={-1}
          >
            {/* <source src='/intro-reel.webm' type='video/webm' /> */}
            <source src='/intro-reel2.mp4' type='video/mp4' />
          </video>

          {/* Legibility wash behind the glass card. */}
          <div className='pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent' />

          {/* Glass card, bottom left. */}
          <div className='absolute bottom-8 left-8 z-10 max-w-lg rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:bottom-12 sm:left-12 sm:p-8'>
            <p className='text-xs font-semibold uppercase tracking-[0.25em] text-white/60'>
              Eastern Fulfillment
            </p>
            <h1 className='mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl'>
              Your trusted third-party logistics partner
            </h1>
            <p className='mt-4 text-sm leading-relaxed text-white/80 sm:text-base'>
              Store inventory, fulfill orders faster, and deliver exceptional
              customer experiences at scale.
            </p>
            <div className='mt-8 flex flex-row flex-wrap gap-3'>
              <a
                href={siteConfig.appUrl}
                target='_blank'
                rel='noopener noreferrer'
                {...gaAttrs('cta_click', {
                  cta_location: 'hero_video',
                  cta_text: 'Get Started',
                  cta_destination: siteConfig.appUrl,
                  cta_type: 'primary',
                })}
                className='group inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-colors border-primary border bg-primary text-primary-foreground xl:px-8'
              >
                <span className='inline-flex h-4 w-4 mr-2 items-center justify-start overflow-hidden transition-all duration-500 ease-out group-hover:w-0 group-hover:mr-0'>
                  <ChevronRight className='h-4 w-4 shrink-0 transition-transform duration-500 ease-out group-hover:-translate-x-4' />
                </span>
                Get Started
                <span className='inline-flex h-4 w-0 items-center justify-end overflow-hidden transition-all duration-500 ease-out group-hover:w-4 group-hover:ml-2'>
                  <ChevronRight className='h-4 w-4 shrink-0 translate-x-4 transition-transform duration-500 ease-out group-hover:translate-x-0' />
                </span>
              </a>
              <a
                href={siteConfig.demoUrl}
                target='_blank'
                rel='noopener noreferrer'
                {...gaAttrs('cta_click', {
                  cta_location: 'hero_video',
                  cta_text: 'Book a Demo',
                  cta_destination: siteConfig.demoUrl,
                  cta_type: 'secondary',
                })}
                className='group inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-colors border border-white/30 bg-white/15 text-white hover:bg-white/25 xl:px-8'
              >
                <span className='inline-flex h-4 w-4 mr-2 items-center justify-start overflow-hidden transition-all duration-500 ease-out group-hover:w-0 group-hover:mr-0'>
                  <ChevronRight className='h-4 w-4 shrink-0 transition-transform duration-500 ease-out group-hover:-translate-x-4' />
                </span>
                Book a Demo
                <span className='inline-flex h-4 w-0 items-center justify-end overflow-hidden transition-all duration-500 ease-out group-hover:w-4 group-hover:ml-2'>
                  <ChevronRight className='h-4 w-4 shrink-0 translate-x-4 transition-transform duration-500 ease-out group-hover:translate-x-0' />
                </span>
              </a>
            </div>
          </div>
        </div>
        </div>
  )
}

export default HeroVideo
