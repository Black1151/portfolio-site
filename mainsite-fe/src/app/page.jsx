import Image from 'next/image'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'
import imageLaptop from 'public/codeBG.jpg'
import FadeInLetters from '@/components/FadeInLetters'

const proficiencies = [
  { label: 'HTML 5', logo: 'html.png' },
  { label: 'CSS 3', logo: 'CSS.png' },
  { label: 'ES6', logo: 'ES6.png' },
  { label: 'TypeScript', logo: 'typescript.png' },
  { label: 'React', logo: 'react.png' },
  { label: 'Next JS', logo: 'next.png' },
  { label: 'Redux', logo: 'redux.png' },
  { label: 'Tailwind CSS', logo: 'tailwind.png' },
  { label: 'Chakra UI', logo: 'chakra.png' },
  { label: 'Sass', logo: 'sass.png' },
  { label: 'React Native', logo: 'react.png' },
  { label: 'Native Base', logo: 'nativebase.png' },
  { label: 'Expo', logo: 'expo.png' },
  { label: 'Node JS', logo: 'node.png' },
  { label: 'Adonis 5', logo: 'adonis.png' },
  { label: 'PostgreSQL', logo: 'postgres.png' },
  { label: 'MySQL', logo: 'sql.png' },
  { label: 'Docker', logo: 'docker.png' },
  { label: 'NginX', logo: 'NginX.png' },
  { label: 'GIT', logo: 'git.png' },
  { label: 'Adobe Photoshop', logo: 'photoshop.png' },
  { label: 'Adobe Illustrator', logo: 'illustrator.png' },
]

const portfolioProjects = [
  {
    href:
      `https://scrolladex.` + process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_DOMAIN
        : 'localhost',
    title: 'Scroll-A-Dex!',
    description: `Personnel management app`,
    features: [
      'Authentication',
      'CRUD',
      'REST API',
      'File uploads',
      'Form validation',
      'Search',
      'Filtering',
      'Responsive',
    ],
    stack: [
      'React',
      'Next JS',
      'Redux',
      'Chakra UI',
      'Adonis 5',
      'Node JS',
      'Postgres',
      'Axios',
      'Fornik',
      'Yup',
    ],
  },
]

function Clients() {
  return (
    <div className="mt-24 bg-white py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-lg font-semibold tracking-wider text-black sm:text-left">
            Languages, frameworks and tools
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-6"
          >
            {proficiencies.map(({ label, logo }, index) => (
              <li key={index}>
                <FadeIn>
                  <div className="jusify-center flex flex-col items-center">
                    <Image
                      src={logo}
                      alt={label}
                      width={75}
                      height={75}
                      unoptimized
                    />
                    <p className="text-md mt-6  flex gap-x-2 text-neutral-950 ">
                      {label}
                    </p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}

function Portfolio() {
  return (
    <>
      <SectionIntro
        title="Portfolio projects"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>More to come soon!</p>
      </SectionIntro>
      <Container className="mt-16 overflow-hidden">
        <FadeInStagger className="grid grid-cols-1 gap-8 ">
          {portfolioProjects.map((project) => (
            <FadeIn key={project.href} className="flex max-w-full">
              <a target="_blank" rel="noopener noreferrer" href={project.href}>
                <article className="relative flex min-h-[800px] w-full flex-1 flex-col justify-between rounded-3xl ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 md:min-h-[500px] ">
                  <div className="rounded-t-3xl bg-black">
                    <div className="p-6 text-orange-500 md:p-8">
                      <p className="font-display text-3xl font-semibold">
                        {project.title}
                      </p>
                      <p className="mt-4 text-base">{project.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-0 top-[128px] h-full w-full md:top-[144px]">
                    <Image
                      src="/scrolladex.png"
                      alt="Background Image"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </div>
                  <div className="relative z-10 bg-black bg-opacity-75 p-6 sm:p-8">
                    <div className="mt-2 flex flex-row flex-wrap gap-2">
                      {project.features &&
                        project.features.map((feature, index) => (
                          <div
                            key={index}
                            className="rounded-xl bg-gray-500 px-2 py-1 text-xs text-white"
                          >
                            <p>{feature}</p>
                          </div>
                        ))}
                    </div>
                    <div className="mt-2 flex flex-row flex-wrap gap-2">
                      {project.stack &&
                        project.stack.map((feature, index) => (
                          <div
                            key={index}
                            className="rounded-xl bg-orange-500 px-2 py-1 text-xs text-white"
                          >
                            <p>{feature}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                </article>
              </a>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}

function Services() {
  return (
    <>
      <SectionIntro
        eyebrow="What am I all about?"
        title="Impactful designs, clean code, efficient deployment"
        className="mt-24 sm:mt-32 lg:mt-40"
      ></SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                src={imageLaptop}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title="Frontend development">
              {`Good front end development is not just about writing code. It's about putting yourself in the customers' shoes and wondering if they are thinking "Wow, this is amazing!". The bit that people see is the most important part of any project. Only pixel perfect will do.`}
            </ListItem>
            <ListItem title="Backend development">
              {`In todays cloud computing world compute time is money and scalability is key. Fetching must be efficient and secure. I can build REST APIs using Node JS and Adonis 5, with PostgreSQL or MySQL databases.`}
            </ListItem>
            <ListItem title="App development">
              {`In today's world of mobile devices, having a mobile app is a must. Using React Native, I can build mobile apps which work across iOS and Android.`}
            </ListItem>
            <ListItem title="Efficient Deployment">
              {`Using layered docker builds, nginx reverse proxies, and CI/CD pipelines, I can ensure any application is deployed efficiently and securely, frontend, backend and database.`}
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}

export const metadata = {
  description:
    'Professional full stack developer and designer. I build beautiful, responsive websites and mobile applications.',
}

export default async function Home() {
  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <h1 className="weight font-display text-5xl tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
          <div className="flex flex-row space-x-4">
            <FadeInLetters className="font-thin" direction="down">
              DANIEL
            </FadeInLetters>
            <FadeInLetters direction="up">BLACK</FadeInLetters>
          </div>
        </h1>
        <FadeIn delay={0.6}>
          <p className="mt-6 text-xl text-neutral-600">
            Full stack developer, designer, and general clever clogs.
          </p>
        </FadeIn>
      </Container>
      <Clients />
      <Testimonial className="mt-2 sm:mt-32 lg:mt-40" theme="dark" client={{}}>
        Harmony of creativity and logic makes the difference; perfect your art,
        master your code.
      </Testimonial>

      <Services />
      <Portfolio />

      <ContactSection />
    </>
  )
}
