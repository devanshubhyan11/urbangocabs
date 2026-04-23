import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Star, MessageCircle, Flag } from 'lucide-react';

interface DriverReview {
  id: string;
  driverName: string;
  rating: number;
  date: string;
  comment: string;
  rideType: string;
}

export default function RatingsReviewsScreen() {
  const navigate = useNavigate();
  const [myRating, setMyRating] = useState(0);
  const [myComment, setMyComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const myReviews: DriverReview[] = [
    {
      id: '1',
      driverName: 'Sarah Johnson',
      rating: 5,
      date: 'Jan 28, 2026',
      comment: 'Great driver! Very professional and friendly. Car was clean.',
      rideType: 'Quick Ride',
    },
    {
      id: '2',
      driverName: 'Mike Chen',
      rating: 4,
      date: 'Jan 27, 2026',
      comment: 'Good ride, arrived on time.',
      rideType: 'Safe Ride',
    },
  ];

  const handleSubmitReview = () => {
    if (myRating > 0 && myComment.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setMyRating(0);
        setMyComment('');
        setSubmitted(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-grp to-grp-glow p-6 text-white sticky top-0 z-10 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Ratings & Reviews</h1>
            <p className="text-grp-foreground/90">Rate your driving experience</p>
          </div>
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => navigate('/home')}
          >
            ← Back
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Your Rating */}
        <Card className="p-6 mb-8 border-grp/50 bg-gradient-to-br from-grp/10 to-grp-glow/10">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Rate Your Last Ride
          </h3>

          {submitted ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-2">✓</div>
              <p className="text-green-600 font-medium">Thank you for your review!</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Rating</label>
                <div className="flex gap-3 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setMyRating(star)}
                      className={`text-3xl transition-transform hover:scale-110 ${
                        star <= myRating ? 'text-yellow-500' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Your Comment (Optional)
                </label>
                <textarea
                  placeholder="Tell us about your experience..."
                  value={myComment}
                  onChange={(e) => setMyComment(e.target.value)}
                  className="w-full mt-2 px-3 py-2 rounded-lg border border-border/50 bg-background text-sm min-h-20"
                />
              </div>

              <Button
                onClick={handleSubmitReview}
                disabled={myRating === 0}
                className="w-full bg-grp hover:bg-grp/90"
              >
                Submit Review
              </Button>
            </div>
          )}
        </Card>

        {/* Your Reviews */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Your Reviews</h3>
          <div className="space-y-4">
            {myReviews.map((review) => (
              <Card
                key={review.id}
                className="p-5 border-border/50 hover:border-grp/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-grp to-grp-glow flex items-center justify-center text-white font-semibold">
                      {review.driverName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{review.driverName}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.rating
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-700">
                    {review.rideType}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{review.comment}</p>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-1 text-xs">
                    <MessageCircle className="w-3 h-3" />
                    Reply
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1 text-xs">
                    <Flag className="w-3 h-3" />
                    Report
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
