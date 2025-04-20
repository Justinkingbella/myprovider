
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, Edit, Send, Check, AlertTriangle } from "lucide-react";

export default function CustomerReviews() {
  const [activeTab, setActiveTab] = useState("pending");
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // Mock data for reviews
  const pendingReviews = [
    {
      id: 1,
      provider: "CleanCo Services",
      service: "Home Deep Cleaning",
      date: "2023-07-10",
      status: "completed"
    },
    {
      id: 2,
      provider: "Express Plumbers",
      service: "Plumbing Repairs",
      date: "2023-07-05",
      status: "completed"
    }
  ];

  const submittedReviews = [
    {
      id: 101,
      provider: "Green Thumb Gardening",
      service: "Garden Maintenance",
      date: "2023-06-28",
      rating: 5,
      comment: "Excellent service, very professional and thorough. Would definitely recommend and use again."
    },
    {
      id: 102,
      provider: "PowerPro Electrical",
      service: "Electrical Installations",
      date: "2023-06-15",
      rating: 4,
      comment: "Good service, arrived on time and fixed the issue quickly."
    }
  ];

  const handleLeaveReview = (booking: any) => {
    setSelectedBooking(booking);
    setRating(0);
    setReviewText("");
    setReviewDialogOpen(true);
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    
    // In a real app, this would send the review to the backend
    alert(`Review submitted: ${rating} stars for ${selectedBooking.service}`);
    setReviewDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Reviews</CardTitle>
        <CardDescription>
          View and manage your reviews for service providers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending">Pending Reviews</TabsTrigger>
            <TabsTrigger value="submitted">Submitted Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="space-y-4">
            {pendingReviews.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                No pending reviews at the moment.
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingReviews.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.service}</TableCell>
                        <TableCell>{booking.provider}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell className="text-right">
                          <Button onClick={() => handleLeaveReview(booking)}>
                            <Star className="mr-2 h-4 w-4" />
                            Leave Review
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="submitted" className="space-y-4">
            {submittedReviews.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                You haven't submitted any reviews yet.
              </div>
            ) : (
              <div className="space-y-4">
                {submittedReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{review.service}</h4>
                          <p className="text-sm text-muted-foreground">
                            {review.provider} • {review.date}
                          </p>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-2 text-sm">{review.comment}</p>
                      <div className="flex justify-end mt-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-3 w-3 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Review dialog */}
        <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Leave a Review</DialogTitle>
              <DialogDescription>
                Share your experience with {selectedBooking?.provider}
              </DialogDescription>
            </DialogHeader>
            
            {selectedBooking && (
              <div className="space-y-4 py-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Service</p>
                  <p>{selectedBooking.service}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Provider</p>
                  <p>{selectedBooking.provider}</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Your Rating</p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleRatingChange(value)}
                        className="focus:outline-none"
                      >
                        <Star 
                          className={`h-8 w-8 ${value <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Your Review</p>
                  <Textarea
                    placeholder="Share details of your experience..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={5}
                  />
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitReview}>
                <Send className="mr-2 h-4 w-4" />
                Submit Review
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
