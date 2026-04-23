import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LocationInput } from '@/components/grp/LocationInput';
import { Location } from '@/types/grp';
import { FeatureCard } from '@/components/grp/FeatureCard';
import { TestimonialsSection } from '@/components/grp/TestimonialsSection';
import { DashboardMetrics } from '@/components/grp/DashboardMetrics';
import { Shield, Zap, MapPin, Award, Lock, TrendingUp, ArrowRight, Check } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: 'Guaranteed Safety',
      description: 'Every ride is protected with our advanced safety protocol and verified drivers.',
      color: 'red' as const,
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get matched with drivers in seconds, not minutes. Efficiency at its best.',
      color: 'blue' as const,
    },
    {
      icon: MapPin,
      title: 'Real-time Tracking',
      description: 'Know exactly where your ride is at all times with live GPS tracking.',
      color: 'green' as const,
    },
    {
      icon: Award,
      title: 'Verified Professionals',
      description: 'All drivers are thoroughly vetted with proven track records.',
      color: 'purple' as const,
    },
    {
      icon: Lock,
      title: 'Secured Transactions',
      description: 'Your payments are protected with enterprise-grade encryption.',
      color: 'red' as const,
    },
    {
      icon: TrendingUp,
      title: 'Fair Pricing',
      description: 'Transparent pricing with no hidden fees. What you see is what you pay.',
      color: 'blue' as const,
    },
  ];

  const benefits = [
    'No cancellations - ride is guaranteed',
    'Real-time driver tracking',
    'Emergency support 24/7',
    'Certified drivers only',
  ];

  const [pickup, setPickup] = useState<Location | null>(null as unknown as Location | null);
  const [destination, setDestination] = useState<Location | null>(null as unknown as Location | null);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-6">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-grp/5 rounded-full blur-3xl" />
          <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto text-center animate-fade-in">
          {/* Logo */}
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-grp to-grp-glow flex items-center justify-center shadow-grp animate-float">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6 leading-tight">
            UrbanGo
            <br />
            <span className="bg-gradient-to-r from-grp to-grp-glow bg-clip-text text-transparent">
              Cabs
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Experience the future of ride-sharing with guaranteed safety, transparency, and reliability. Never worry about cancelled rides again.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              variant="grp"
              onClick={() => navigate('/auth')}
              className="gap-2"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>

          {/* Quick Booking Widget */}
          <div className="max-w-3xl mx-auto bg-card glass-card border border-border p-4 md:p-6 rounded-2xl shadow-card flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <LocationInput
                  label="Pickup"
                  placeholder="Enter pickup"
                  value={pickup}
                  onChange={(loc: Location) => setPickup(loc)}
                  variant="pickup"
                />
                <LocationInput
                  label="Destination"
                  placeholder="Enter destination"
                  value={destination}
                  onChange={(loc: Location) => setDestination(loc)}
                  variant="destination"
                />
              </div>
              <div className="mt-3 flex items-center gap-3">
                <Button size="sm" variant="grp" onClick={() => navigate('/home')}>
                  Book Now
                </Button>
                <Button size="sm" variant="outline" onClick={() => navigate('/auth')}>
                  Sign In
                </Button>
              </div>
            </div>
            <div className="w-36 h-24 md:w-44 md:h-28 flex-shrink-0">
              <img src="/car-illustration.svg" alt="car" className="w-full h-full object-contain animate-float" />
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-success" />
              <span>50K+ Rides Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-success" />
              <span>4.8/5 Star Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-success" />
              <span>100% Safety Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why GRP Section */}
      <section className="py-20 px-6 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Why Choose GRP?</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We've reimagined ride-sharing with guarantees. No more cancellations, no more waiting, just reliable transportation every time.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-grp flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right - Visual */}
            <div className="relative h-96 bg-card rounded-2xl border border-border flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-grp/10 to-grp-glow/10" />
              <div className="relative z-10 text-center">
                <Shield className="w-24 h-24 text-grp mx-auto mb-4 animate-float" />
                <p className="text-xl font-semibold text-foreground">Your ride is guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need for a safe, fast, and reliable ride experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="animate-scale-in" style={{ animationDelay: `${idx * 50}ms` }}>
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <DashboardMetrics />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-grp/10 to-grp-glow/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Ready to Experience the Difference?</h2>
          <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
            Join thousands of riders and drivers who have switched to UrbanGo Cabs for guaranteed safety and reliability.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="grp"
              onClick={() => navigate('/auth')}
              className="gap-2"
            >
              Sign Up as Rider
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="grp-outline"
              onClick={() => navigate('/auth')}
            >
              Become a Driver
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
