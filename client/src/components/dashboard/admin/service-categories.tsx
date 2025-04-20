
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MoreHorizontal, Search, PlusCircle, Edit, Trash, Tag, Settings } from "lucide-react";

export default function ServiceCategories() {
  const [search, setSearch] = useState("");
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  
  // Form state
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("");

  // Mock data for the UI
  const categories = [
    { id: 1, name: "Home Cleaning", description: "Professional cleaning services for homes", icon: "🧹", providerCount: 45, baseCommission: 10 },
    { id: 2, name: "Plumbing", description: "Plumbing repair and installation services", icon: "🔧", providerCount: 32, baseCommission: 15 },
    { id: 3, name: "Electrical", description: "Electrical installation and repair services", icon: "⚡", providerCount: 27, baseCommission: 15 },
    { id: 4, name: "Garden & Outdoor", description: "Gardening and outdoor maintenance", icon: "🌱", providerCount: 18, baseCommission: 12 },
    { id: 5, name: "Personal Errands", description: "Services for daily errands and tasks", icon: "🛍️", providerCount: 38, baseCommission: 8 },
    { id: 6, name: "Beauty & Wellness", description: "Beauty, hair and wellness services", icon: "💅", providerCount: 56, baseCommission: 10 },
  ];

  const handleAddCategory = () => {
    setIsEditing(false);
    setCategoryName("");
    setCategoryDescription("");
    setCategoryIcon("");
    setOpenCategoryDialog(true);
  };

  const handleEditCategory = (category: any) => {
    setSelectedCategory(category);
    setCategoryName(category.name);
    setCategoryDescription(category.description);
    setCategoryIcon(category.icon);
    setIsEditing(true);
    setOpenCategoryDialog(true);
  };

  const handleSaveCategory = () => {
    // Logic to save the category would go here
    setOpenCategoryDialog(false);
  };

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(search.toLowerCase()) || 
    category.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Service Categories</CardTitle>
          <CardDescription>
            Manage the service categories available on your platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search categories..."
                  className="pl-8"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button onClick={handleAddCategory}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Category
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Icon</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead>Providers</TableHead>
                    <TableHead>Commission %</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No categories found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>{category.icon}</TableCell>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell className="hidden md:table-cell">{category.description}</TableCell>
                        <TableCell>{category.providerCount}</TableCell>
                        <TableCell>{category.baseCommission}%</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit category
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" /> Adjust commission
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash className="mr-2 h-4 w-4" /> Delete category
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category dialog */}
      <Dialog open={openCategoryDialog} onOpenChange={setOpenCategoryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Category" : "Add New Category"}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? "Update the details of an existing service category." 
                : "Create a new service category for your platform."
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category-name" className="text-right">
                Name
              </Label>
              <Input
                id="category-name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category-icon" className="text-right">
                Icon
              </Label>
              <Input
                id="category-icon"
                value={categoryIcon}
                onChange={(e) => setCategoryIcon(e.target.value)}
                placeholder="Emoji or icon code"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="category-description" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="category-description"
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            {isEditing && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category-commission" className="text-right">
                  Commission %
                </Label>
                <Input
                  id="category-commission"
                  type="number"
                  defaultValue={selectedCategory?.baseCommission || 10}
                  className="col-span-3"
                />
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setOpenCategoryDialog(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSaveCategory}>
              {isEditing ? "Update Category" : "Add Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
