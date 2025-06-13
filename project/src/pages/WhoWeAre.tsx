import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, Globe, Target, ArrowRight, Star, Shield } from 'lucide-react'
import Meta from '../components/Meta'
import ImageLoader from '../components/ImageLoader'
import { useTranslation } from 'react-i18next'

const milestones = [
  {
    year: 2018,
    title: 'Foundation',
    description: 'Established with a vision to empower youth globally',
    metric: '10 founding members',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
  },
  {
    year: 2020,
    title: 'Global Expansion',
    description: 'Expanded operations to 25 countries',
    metric: '5,000+ youth impacted',
    image: 'https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg',
  },
  {
    year: 2022,
    title: 'Digital Transformation',
    description: 'Launched innovative online learning platform',
    metric: '15,000+ online participants',
    image: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg',
  },
  {
    year: 2024,
    title: 'Sustainable Impact',
    description: 'Achieved major sustainability goals',
    metric: '100+ community projects',
    image: 'https://images.pexels.com/photos/3184603/pexels-photo-3184603.jpeg',
  },
]

const values = [
  {
    icon: Heart,
    title: 'Empowerment',
    description:
      'We believe in unlocking the potential within every young person through education, mentorship, and opportunities.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Globe,
    title: 'Global Perspective',
    description:
      'Our diverse, multicultural approach creates understanding and collaboration across borders.',
    color: 'bg-accent/10 text-accent',
  },
  {
    icon: Target,
    title: 'Innovation',
    description:
      'We embrace new ideas and technologies to create cutting-edge solutions for youth development.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Shield,
    title: 'Integrity',
    description:
      'We maintain the highest standards of transparency and accountability in all our operations.',
    color: 'bg-accent/10 text-accent',
  },
]

const leaders = [
  {
    name: 'Sarah Chen',
    role: 'Executive Director',
    bio: 'With 15+ years in youth development, Sarah leads our global initiatives with passion and expertise.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
  },
  {
    name: 'Michael Okonjo',
    role: 'Programs Director',
    bio: 'Michael brings innovative approaches to our educational and leadership programs.',
    image: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg',
  },
  {
    name: 'Aisha Patel',
    role: 'Community Impact Lead',
    bio: 'Aisha ensures our initiatives create lasting positive change in communities worldwide.',
    image: 'https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg',
  },
]

export default function WhoWeAre() {
  const { t } = useTranslation()

  return (
    <>
      <Meta
        title="Who We Are | Global Youth Organization"
        description="Discover our mission to empower youth globally through education, leadership, and community engagement."
      />

      <div className="min-h-screen bg-light">
        {/* Hero Section */}
        <div className="relative min-h-[70vh] flex items-center">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 mix-blend-multiply" />
            <ImageLoader
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
              alt="Youth empowerment"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative container mx-auto px-4 py-24 text-light">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Empowering Youth Globally
              </h1>

              <p className="text-xl md:text-2xl text-light/90 mb-8">
                Building bridges across cultures, fostering leadership, and
                creating positive change since 2018.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-lg bg-light text-primary hover:bg-light/90 gap-2"
                >
                  Join Our Mission
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-lg btn-outline text-light hover:bg-light hover:text-primary"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-24 bg-light">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 text-dark">Our Mission</h2>
              <p className="text-xl text-dark/80 max-w-3xl mx-auto">
                To empower youth through education, leadership development, and
                community engagement, creating a global network of
                change-makers.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-light rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`w-12 h-12 rounded-lg ${value.color} flex items-center justify-center mb-4`}
                  >
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-dark">
                    {value.title}
                  </h3>
                  <p className="text-dark/80">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="py-24 bg-base-200">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
              <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
                Key milestones in our mission to empower youth globally
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-primary opacity-30" />
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="relative rounded-xl overflow-hidden">
                        <ImageLoader
                          src={milestone.image}
                          alt={milestone.title}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <span className="text-white font-bold text-xl">
                            {milestone.year}
                          </span>
                          <h3 className="text-white text-2xl font-bold mt-2">
                            {milestone.title}
                          </h3>
                          <p className="text-white/80 mt-2">
                            {milestone.description}
                          </p>
                          <div className="flex items-center gap-2 text-white/60 mt-4">
                            <Star className="w-4 h-4" />
                            <span>{milestone.metric}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-primary border-4 border-base-100" />
                    </div>

                    <div className="flex-1" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="py-24 bg-base-100">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Our Leadership</h2>
              <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
                Meet the dedicated team driving our mission forward
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leaders.map((leader, index) => (
                <motion.div
                  key={leader.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-base-200 rounded-xl overflow-hidden"
                >
                  <div className="aspect-square relative">
                    <ImageLoader
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold">{leader.name}</h3>
                      <p className="text-white/80">{leader.role}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-base-content/80">{leader.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-24 bg-primary text-light">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl font-bold mb-6">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl text-light/90 mb-8">
                Join our global community of youth leaders and change-makers
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/join">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-lg bg-light text-primary hover:bg-light/90 gap-2"
                  >
                    Join Us Today
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-lg btn-outline text-light hover:bg-light hover:text-primary"
                  >
                    Contact Us
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
