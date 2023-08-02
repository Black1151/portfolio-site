import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

export function ContactSection() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn className="-mx-6 rounded-4xl bg-neutral-950 px-6 py-20 sm:mx-0 sm:py-32 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="max-w-xl text-white">
            <div className='flex flex-col gap-6'>
              <h2 className="font-display text-3xl [text-wrap:balance] sm:text-6xl text-orange-500">
                Hire me!
              </h2>
              <h1 className='text-3xl'>Tel: 07749-989-810</h1>
              <h1 className='text-3xl'>Email: danblack9988@gmail.com</h1>
            </div>
            <div className="mt-10 border-t border-white/10 pt-10  text-white">
              <h3 className="font-display text-base font-semibold">
                Available for remote roles or hybrid in:
              </h3>
              <h2 className=''>Leeds, Manchester, Bradford, Harrogate, surrounding areas. </h2>
              
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
