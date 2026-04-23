import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Anderson',
    role: 'Regular Rider',
    avatar: '👩‍💼',
    rating: 5,
    comment: 'UrbanGo Cabs completely changed how I book rides. Fast, reliable, and always safe!'
  },
  {
    name: 'Rajesh Kumar',
    role: 'Verified Driver',
    avatar: '👨‍💼',
    rating: 5,
    comment: 'The UrbanGo protocol gives me peace of mind. Amazing earning potential!'
  },
  {
    name: 'Emma Wilson',
    role: 'Business User',
    avatar: '👩‍💻',
    rating: 4.8,
    comment: 'Never had a cancelled ride with UrbanGo Cabs. Perfect for my daily commute.'
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Loved by Users</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Join thousands of riders and drivers who trust UrbanGo Cabs for their journeys
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="group bg-card border border-border rounded-2xl p-6 hover:border-grp/50 transition-all duration-300 hover:shadow-lg hover:shadow-grp/20"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(testimonial.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-foreground mb-6 leading-relaxed italic">
                "{testimonial.comment}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-grp to-grp-glow flex items-center justify-center text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
