import Image from 'next/image'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridPattern } from '@/components/GridPattern'

export function Testimonial({ children, client, className, theme='light' }) {
  // Define the classnames for each theme
  const themeClasses = {
    light: 'relative isolate bg-neutral-50 py-16 sm:py-28 md:py-32 text-neutral-950',
    dark: 'relative isolate bg-neutral-950 py-16 sm:py-28 md:py-32 text-neutral-50',
  };

  return (
    <div
      className={clsx(
        themeClasses[theme],
        className
      )}
    >
      <GridPattern
        className={`absolute inset-0 -z-10 h-full w-full ${theme === "light" ? "fill-neutral-100 stroke-neutral-950/5" : "fill-neutral-950/5 stroke-stone-800" }  [mask-image:linear-gradient(to_bottom_left,white_50%,transparent_60%)]`}
        yOffset={-256}
      />
      <Container>
        <FadeIn>
          <figure className="mx-auto max-w-4xl">
            <blockquote className="relative font-display text-3xl font-medium tracking-tight sm:text-4xl">
              <p className="before:content-['“'] after:content-['”'] sm:before:absolute sm:before:right-full">
                {children}
              </p>
            </blockquote>
            <figcaption className="mt-10">
              <Image src={client.logo} alt={client.name} unoptimized />
            </figcaption>
          </figure>
        </FadeIn>
      </Container>
    </div>
  )
}
