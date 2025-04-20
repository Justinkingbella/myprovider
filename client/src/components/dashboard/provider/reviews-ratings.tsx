
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  StarHalf,
  Calendar,
  ThumbsUp,
  MessageSquare,
  Filter
} from "lucide-react";

export default function ReviewsRatings() {
  const [activeTab, setActiveTab] = useState("all");

  // Mock review data
  const reviews = [
    {
      id: 1,
      customer: {
        name: "Jane Smith",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg"
      },
      rating: 5,
      comment: "Excellent service! Very professional and did a thorough job cleaning my home. Will definitely book again.",
      date: "Jul 10, 2023",
      service: "Home Cleaning",
      reply: ""
    },
    {
      id: 2,
      customer: {
        name: "Michael Brown",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg"
      },
      rating: 4,
      comment: "Very good furniture assembly service. Was slightly delayed but called ahead to inform me. Good communication overall.",
      date: "Jul 8, 2023",
      service: "Furniture Assembly",
      reply: "Thank you for your understanding regarding the delay. We always strive to communicate promptly with our customers."
    },
    {
      id: 3,
      customer: {
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg"
      },
      rating: 5,
      comment: "Fixed my electrical issues quickly and explained what caused the problem. Very knowledgeable and friendly.",
      date: "Jul 5, 2023",
      service: "Electrical Repair",
      reply: ""
    },
    {
      id: 4,
      customer: {
        name: "Robert Williams",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg"
      },
      rating: 3,
      comment: "The plumbing service was adequate. Fixed the issue but left some mess that I had to clean up afterwards.",
      date: "Jul 1, 2023",
      service: "Plumbing",
      reply: "We apologize for the inconvenience caused. We'll improve on ensuring cleanliness after completing our services."
    }
  ];

  // Filter reviews based on active tab
  const filteredReviews = activeTab === "all" 
    ? reviews 
    : activeTab === "positive" 
      ? reviews.filter(review => review.rating >= 4)
      : reviews.filter(review => review.rating < 4);

  // Calculate average rating
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  // Rating distribution
  const ratingCounts = [0, 0, 0, 0, 0]; // 1 to 5 stars
  reviews.forEach(review => {
    ratingCounts[review.rating - 1]++;
  });

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  const handleReplyToReview = (reviewId: number) => {
    alert(`Reply to review #${reviewId}`);
    // In a real implementation, this would open a modal or form to enter a reply
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews & Ratings</CardTitle>
        <CardDescription>
          View customer reviews and ratings for your services.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {/* Rating summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <h3 className="text-xl font-bold">Overall Rating</h3>
                  <div className="text-5xl font-bold my-2">{averageRating.toFixed(1)}</div>
                  <div className="flex items-center mb-2">
                    {renderStars(averageRating)}
                  </div>
                  <p className="text-sm text-muted-foreground">Based on {reviews.length} reviews</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 md:col-span-2">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Rating Distribution</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = ratingCounts[stars - 1];
                    const percentage = (count / reviews.length) * 100 || 0;
                    
                    return (
                      <div key={stars} className="flex items-center">
                        <div className="w-12 text-sm">{stars} stars</div>
                        <div className="flex-1 mx-2">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-yellow-400"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-12 text-sm text-right">{count} ({percentage.toFixed(0)}%)</div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Reviews list */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Customer Reviews</h3>
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="positive">Positive</TabsTrigger>
                    <TabsTrigger value="negative">Negative</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <Avatar>
                              <AvatarImage src={review.customer.avatar} alt={review.customer.name} />
                              <AvatarFallback>{review.customer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold">{review.customer.name}</h4>
                              <div className="flex items-center space-x-1 mt-1">
                                {renderStars(review.rating)}
                              </div>
                              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>{review.date}</span>
                                <span className="mx-1">•</span>
                                <span>{review.service}</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-blue-50 text-blue-800">
                            {review.rating} / 5
                          </Badge>
                        </div>
                        
                        <div>
                          <p className="text-sm">{review.comment}</p>
                        </div>
                        
                        {review.reply && (
                          <div className="bg-slate-50 p-3 rounded-md">
                            <div className="flex items-center mb-2">
                              <MessageSquare className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span className="text-sm font-medium">Your Reply</span>
                            </div>
                            <p className="text-sm">{review.reply}</p>
                          </div>
                        )}
                        
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Thank
                          </Button>
                          {!review.reply && (
                            <Button variant="outline" size="sm" onClick={() => handleReplyToReview(review.id)}>
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Reply
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No reviews found.
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
