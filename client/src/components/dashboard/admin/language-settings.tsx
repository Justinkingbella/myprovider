
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Globe, Check, Plus, Eye, Edit, Trash, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function LanguageSettings() {
  const [openLanguageDialog, setOpenLanguageDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<any>(null);

  // Mock data for languages
  const languages = [
    { 
      id: 1, 
      name: "English", 
      code: "en", 
      isDefault: true, 
      isActive: true, 
      translationProgress: 100,
      direction: "ltr"
    },
    { 
      id: 2, 
      name: "Afrikaans", 
      code: "af", 
      isDefault: false, 
      isActive: true, 
      translationProgress: 95,
      direction: "ltr"
    },
    { 
      id: 3, 
      name: "Oshiwambo", 
      code: "ng", 
      isDefault: false, 
      isActive: true, 
      translationProgress: 85,
      direction: "ltr"
    },
    { 
      id: 4, 
      name: "Otjiherero", 
      code: "hz", 
      isDefault: false, 
      isActive: false, 
      translationProgress: 60,
      direction: "ltr"
    },
    { 
      id: 5, 
      name: "Damara/Nama", 
      code: "naq", 
      isDefault: false, 
      isActive: false, 
      translationProgress: 45,
      direction: "ltr"
    },
    { 
      id: 6, 
      name: "Portuguese", 
      code: "pt", 
      isDefault: false, 
      isActive: true, 
      translationProgress: 80,
      direction: "ltr"
    },
  ];

  const handleAddLanguage = () => {
    setIsEditing(false);
    setSelectedLanguage(null);
    setOpenLanguageDialog(true);
  };

  const handleEditLanguage = (language: any) => {
    setIsEditing(true);
    setSelectedLanguage(language);
    setOpenLanguageDialog(true);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Language Settings</CardTitle>
          <CardDescription>
            Manage the languages supported by your platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="multi-language" defaultChecked />
                  <Label htmlFor="multi-language">Enable Multi-language Support</Label>
                </div>
                <p className="text-sm text-muted-foreground">Allow users to switch between languages</p>
              </div>
              <Button onClick={handleAddLanguage}>
                <Plus className="mr-2 h-4 w-4" /> Add Language
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Language</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {languages.map((language) => (
                    <TableRow key={language.id}>
                      <TableCell className="font-medium">{language.name}</TableCell>
                      <TableCell>{language.code}</TableCell>
                      <TableCell>
                        {language.isActive ? (
                          <Badge className="bg-green-500">Active</Badge>
                        ) : (
                          <Badge variant="outline">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {language.isDefault && (
                          <Check className="h-4 w-4 text-green-500" />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-24 rounded-full bg-gray-200">
                            <div 
                              className="h-2 rounded-full bg-green-500" 
                              style={{ width: `${language.translationProgress}%` }}
                            />
                          </div>
                          <span className="text-xs">{language.translationProgress}%</span>
                        </div>
                      </TableCell>
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
                            <DropdownMenuItem onClick={() => handleEditLanguage(language)}>
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" /> View Translations
                            </DropdownMenuItem>
                            {!language.isDefault && (
                              <DropdownMenuItem>
                                <Check className="mr-2 h-4 w-4" /> Make Default
                              </DropdownMenuItem>
                            )}
                            {language.isActive ? (
                              <DropdownMenuItem>
                                <Trash className="mr-2 h-4 w-4" /> Deactivate
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>
                                <Check className="mr-2 h-4 w-4" /> Activate
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language dialog */}
      <Dialog open={openLanguageDialog} onOpenChange={setOpenLanguageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Language" : "Add New Language"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Update language settings" : "Add a new language to your platform"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="language-name" className="text-right">
                Language Name
              </Label>
              <Input
                id="language-name"
                defaultValue={selectedLanguage?.name || ""}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="language-code" className="text-right">
                Language Code
              </Label>
              <Input
                id="language-code"
                defaultValue={selectedLanguage?.code || ""}
                className="col-span-3"
                placeholder="e.g., en, fr, es"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Direction</Label>
              <div className="col-span-3">
                <Tabs defaultValue={selectedLanguage?.direction || "ltr"} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="ltr">Left to Right</TabsTrigger>
                    <TabsTrigger value="rtl">Right to Left</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-4">
                <Separator />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div></div>
              <div className="col-span-3 space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="language-active" 
                    defaultChecked={selectedLanguage?.isActive ?? true} 
                  />
                  <Label htmlFor="language-active">Language is active</Label>
                </div>
                {!selectedLanguage?.isDefault && (
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="language-default"
                      defaultChecked={selectedLanguage?.isDefault ?? false}
                    />
                    <Label htmlFor="language-default">Set as default language</Label>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setOpenLanguageDialog(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={() => setOpenLanguageDialog(false)}>
              {isEditing ? "Update Language" : "Add Language"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
