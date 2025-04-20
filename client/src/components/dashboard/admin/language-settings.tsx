
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
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Check, Plus, UploadCloud, Trash2 } from "lucide-react";

export default function LanguageSettings() {
  // Mock data - in a real app, this would come from API
  const [languages, setLanguages] = useState([
    { code: "en", name: "English", isDefault: true, enabled: true, completion: 100 },
    { code: "af", name: "Afrikaans", isDefault: false, enabled: true, completion: 85 },
    { code: "ow", name: "Oshiwambo", isDefault: false, enabled: true, completion: 70 },
    { code: "he", name: "Herero", isDefault: false, enabled: false, completion: 30 },
    { code: "de", name: "German", isDefault: false, enabled: false, completion: 0 },
  ]);
  
  const [translations, setTranslations] = useState({
    "welcome_message": {
      "en": "Welcome to our service platform",
      "af": "Welkom by ons diensplatform",
      "ow": "Ounene ku platform yetu yokupondola",
      "he": "Pending translation...",
      "de": ""
    },
    "booking_confirmation": {
      "en": "Your booking has been confirmed",
      "af": "Jou bespreking is bevestig",
      "ow": "Ekwatanepo lyoye olya kolekwa",
      "he": "Pending translation...",
      "de": ""
    }
  });
  
  const [selectedPhrase, setSelectedPhrase] = useState("welcome_message");
  
  const toggleLanguage = (langCode) => {
    setLanguages(languages.map(lang => 
      lang.code === langCode ? { ...lang, enabled: !lang.enabled } : lang
    ));
  };
  
  const setDefaultLanguage = (langCode) => {
    setLanguages(languages.map(lang => ({ 
      ...lang, 
      isDefault: lang.code === langCode 
    })));
  };
  
  const updateTranslation = (langCode, value) => {
    setTranslations({
      ...translations,
      [selectedPhrase]: {
        ...translations[selectedPhrase],
        [langCode]: value
      }
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Language Settings
          </CardTitle>
          <CardDescription>
            Manage supported languages and translations for the platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Language</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Completion</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Default</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-background divide-y divide-border">
                {languages.map((language) => (
                  <tr key={language.code}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{language.name}</span>
                        <span className="ml-1 text-xs text-muted-foreground">({language.code})</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <Switch 
                          checked={language.enabled} 
                          onCheckedChange={() => toggleLanguage(language.code)}
                          id={`lang-${language.code}`}
                        />
                        <Label htmlFor={`lang-${language.code}`} className="ml-2">
                          {language.enabled ? 'Enabled' : 'Disabled'}
                        </Label>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-muted rounded-full h-2.5 mr-2">
                          <div 
                            className="bg-primary h-2.5 rounded-full" 
                            style={{ width: `${language.completion}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground">{language.completion}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          name="default-language" 
                          checked={language.isDefault}
                          onChange={() => setDefaultLanguage(language.code)}
                          className="rounded-full h-4 w-4 text-primary"
                        />
                        {language.isDefault && <span className="ml-2 text-xs text-muted-foreground">Default</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-end">
            <Button variant="outline" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Add Language
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Translation Manager</CardTitle>
          <CardDescription>
            Edit and manage translations for all supported languages
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="phrases">
            <TabsList>
              <TabsTrigger value="phrases">Common Phrases</TabsTrigger>
              <TabsTrigger value="interface">Interface Elements</TabsTrigger>
              <TabsTrigger value="emails">Email Templates</TabsTrigger>
              <TabsTrigger value="import">Import/Export</TabsTrigger>
            </TabsList>
            
            <TabsContent value="phrases" className="space-y-4 pt-4">
              <div className="flex gap-4">
                <div className="w-1/3 border rounded-md">
                  <div className="p-3 border-b bg-muted/50">
                    <h3 className="text-sm font-medium">Phrases</h3>
                  </div>
                  <div className="divide-y">
                    {Object.keys(translations).map((key) => (
                      <div 
                        key={key}
                        className={`p-3 cursor-pointer hover:bg-muted/50 ${selectedPhrase === key ? 'bg-muted/50' : ''}`}
                        onClick={() => setSelectedPhrase(key)}
                      >
                        <div className="text-sm font-medium">{key.replace(/_/g, ' ')}</div>
                        <div className="text-xs text-muted-foreground truncate">{translations[key].en}</div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t">
                    <Button variant="ghost" size="sm" className="w-full flex items-center justify-center gap-1">
                      <Plus className="h-4 w-4" />
                      Add New Phrase
                    </Button>
                  </div>
                </div>
                
                <div className="w-2/3 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium capitalize">{selectedPhrase.replace(/_/g, ' ')}</h3>
                    <Button variant="outline" size="sm">Save All</Button>
                  </div>
                  
                  <div className="space-y-4">
                    {languages.filter(lang => lang.enabled).map((language) => (
                      <div key={language.code} className="space-y-2">
                        <Label className="flex items-center">
                          <span className="mr-2">{language.name}</span>
                          {language.isDefault && <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Default</span>}
                        </Label>
                        <Textarea 
                          value={translations[selectedPhrase][language.code] || ''} 
                          onChange={(e) => updateTranslation(language.code, e.target.value)}
                          rows={2}
                          placeholder={`Enter ${language.name} translation`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="import" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Import Translations</CardTitle>
                  <CardDescription>
                    Upload translation files in JSON or CSV format
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed rounded-md p-6 text-center">
                    <UploadCloud className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop your translation files here, or click to browse
                    </p>
                    <Button variant="outline" size="sm">Select Files</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Export Translations</CardTitle>
                  <CardDescription>
                    Download current translations in your preferred format
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Format</h4>
                        <p className="text-sm text-muted-foreground">Select the export file format</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">JSON</Button>
                        <Button variant="outline" size="sm">CSV</Button>
                        <Button variant="outline" size="sm">Excel</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Languages</h4>
                        <p className="text-sm text-muted-foreground">Select which languages to export</p>
                      </div>
                      <Button variant="outline" size="sm">All Languages</Button>
                    </div>
                    
                    <Button>Export Translations</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
