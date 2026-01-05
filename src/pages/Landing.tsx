import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Heart, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Heart,
    title: 'Swipe to Connect',
    description: 'Discover talent and opportunities through intuitive swipe interactions',
  },
  {
    icon: Users,
    title: 'Deep Profiles',
    description: 'Go beyond resumes with projects, achievements, and culture preferences',
  },
  {
    icon: Calendar,
    title: 'Real Meetups',
    description: 'Schedule in-person meetings at cafés, offices, or tech hubs',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Matching',
    description: 'Smart algorithms that understand both skills and cultural fit',
  },
];

const stats = [
  { value: '50K+', label: 'Professionals' },
  { value: '10K+', label: 'Companies' },
  { value: '25K+', label: 'Successful Matches' },
  { value: '95%', label: 'Match Satisfaction' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl text-foreground">SwipeHire</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/discover">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/discover">
              <Button variant="hero">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-success/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-border mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">The Tinder of Hiring in the AI Revolution</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Swipe. Match. Meet.
              <br />
              <span className="text-gradient">Trust. Hire.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Reimagining hiring through human connection. Discover talent, build relationships, 
              and make meaningful career moves—all through a simple swipe.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/discover">
                <Button variant="hero" size="xl">
                  Start Swiping
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="xl">
                For Companies
              </Button>
            </div>
          </motion.div>

          {/* Preview Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 relative max-w-lg mx-auto"
          >
            {/* Stack of cards preview */}
            <div className="relative h-80">
              {/* Back card */}
              <div className="absolute inset-0 bg-card rounded-3xl shadow-card transform rotate-3 translate-x-4 opacity-60" />
              {/* Middle card */}
              <div className="absolute inset-0 bg-card rounded-3xl shadow-card transform -rotate-2 -translate-x-2 opacity-80" />
              {/* Front card */}
              <div className="absolute inset-0 bg-card rounded-3xl shadow-swipe overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" 
                  alt="Profile"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold">Priya Sharma</h3>
                  <p className="text-muted-foreground">Senior Product Designer</p>
                  <div className="flex gap-2 mt-3">
                    <span className="px-3 py-1 bg-accent rounded-full text-xs">UI/UX</span>
                    <span className="px-3 py-1 bg-accent rounded-full text-xs">Figma</span>
                    <span className="px-3 py-1 bg-accent rounded-full text-xs">92% Match</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why SwipeHire?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A modern approach to professional connections that puts humans first
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-6 rounded-2xl shadow-card hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-secondary text-secondary-foreground">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-secondary-foreground/70 max-w-2xl mx-auto">
              From first swipe to successful hire in four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Create Profile', desc: 'Build your professional identity with skills, projects & culture preferences' },
              { step: '02', title: 'Swipe & Discover', desc: 'Browse curated profiles and swipe right on matches that excite you' },
              { step: '03', title: 'Match & Connect', desc: 'When interest is mutual, start meaningful conversations' },
              { step: '04', title: 'Meet & Hire', desc: 'Schedule real-world meetups and build lasting professional relationships' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-primary/30 mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-secondary-foreground/70 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary to-primary-glow rounded-3xl p-12 text-center text-white overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-50" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform How You Hire?</h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8">
                Join thousands of professionals and companies already building meaningful connections
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/discover">
                  <Button variant="glass" size="xl">
                    Start Free Today
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-semibold text-foreground">SwipeHire</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2025 SwipeHire. Swipe. Match. Meet. Trust. Hire.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
