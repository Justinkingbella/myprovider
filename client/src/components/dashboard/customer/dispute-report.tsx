
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle, FileText, Upload, SendHorizontal } from "lucide-react";

export default function DisputeReport() {
  const [issueType, setIssueType] = useState("");
  const [bookingRef, setBookingRef] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [activeDisputes, setActiveDisputes] = useState([
    {
      id: 1,
      bookingRef: "BK-20230615-001",
      service: "Electrical Installations",
      provider: "PowerPro Electrical",
      issueType: "Quality of Service",
      status: "under_review",
      createdAt: "2023-06-18"
    }
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!issueType || !bookingRef || !description) {
      alert("Please fill in all required fields");
      return;
    }
    
    // In a real app, you would send this data to your backend
    alert("Dispute report submitted successfully");
    
    // Reset form
    setIssueType("");
    setBookingRef("");
    setDescription("");
    setImages([]);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "under_review":
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Under Review</span>;
      case "resolved":
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Resolved</span>;
      case "escalated":
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Escalated</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Report an Issue</CardTitle>
          <CardDescription>
            If you've experienced any problems with a service, you can report it here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="issue-type">Issue Type</Label>
              <Select value={issueType} onValueChange={setIssueType} required>
                <SelectTrigger id="issue-type">
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quality">Quality of Service</SelectItem>
                  <SelectItem value="behavior">Provider Behavior</SelectItem>
                  <SelectItem value="pricing">Pricing Discrepancy</SelectItem>
                  <SelectItem value="lateness">Provider was Late/No-show</SelectItem>
                  <SelectItem value="damage">Property Damage</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="booking-ref">Booking Reference</Label>
              <Input 
                id="booking-ref" 
                placeholder="e.g., BK-20230615-001" 
                value={bookingRef}
                onChange={(e) => setBookingRef(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Describe the Issue</Label>
              <Textarea 
                id="description" 
                placeholder="Please provide details about the issue..." 
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="evidence">Attach Evidence (optional)</Label>
              <div className="flex items-center justify-center w-full">
                <label 
                  htmlFor="dropzone-file" 
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG or PDF (MAX. 5MB)
                    </p>
                  </div>
                  <input 
                    id="dropzone-file" 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileChange}
                    multiple
                    accept="image/png, image/jpeg, application/pdf"
                  />
                </label>
              </div>
              
              {/* Display selected files */}
              {images.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {images.map((file, index) => (
                    <div key={index} className="px-3 py-1 rounded-full bg-muted text-xs flex items-center">
                      <FileText className="w-3 h-3 mr-1" />
                      {file.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <Button type="submit" className="w-full">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Submit Report
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {activeDisputes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Active Disputes</CardTitle>
            <CardDescription>
              Track the status of your submitted issues and disputes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeDisputes.map((dispute) => (
                <div key={dispute.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{dispute.service}</h4>
                      <p className="text-sm text-muted-foreground">Provider: {dispute.provider}</p>
                      <p className="text-sm text-muted-foreground">Reference: {dispute.bookingRef}</p>
                      <p className="text-sm text-muted-foreground">Reported: {dispute.createdAt}</p>
                      <p className="text-sm mt-1">Issue: {dispute.issueType}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      {getStatusBadge(dispute.status)}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="link" size="sm" className="mt-2">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Dispute Details</DialogTitle>
                            <DialogDescription>
                              Reference: {dispute.bookingRef}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Service</p>
                                <p>{dispute.service}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Provider</p>
                                <p>{dispute.provider}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Issue Type</p>
                                <p>{dispute.issueType}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Status</p>
                                <p>{getStatusBadge(dispute.status)}</p>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Description</p>
                              <p className="text-sm">
                                The electrical installation was not properly done. There are exposed wires and the socket is loose.
                              </p>
                            </div>
                            
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Admin Response</p>
                              <p className="text-sm">
                                We have received your report and are investigating the issue. An admin will contact you shortly.
                              </p>
                            </div>
                            
                            <div className="pt-2">
                              <Label htmlFor="additional-info">Add Additional Information</Label>
                              <div className="flex items-center gap-2 mt-2">
                                <Input id="additional-info" placeholder="Add more details if needed..." />
                                <Button size="icon">
                                  <SendHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
