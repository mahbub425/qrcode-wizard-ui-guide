import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Globe, 
  User, 
  MapPin, 
  Share2, 
  FileText, 
  Video, 
  Type,
  Link,
  ArrowRight,
  ArrowLeft,
  Upload,
  Download,
  Eye,
  Palette,
  Frame,
  Star,
  CheckCircle2
} from "lucide-react";

type QRType = {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  category: 'dynamic' | 'static';
};

type QRStep = 'select' | 'setup' | 'customize' | 'done';

const qrTypes: QRType[] = [
  // Dynamic QR Types
  { id: 'website', name: 'Website URL', icon: Globe, description: 'Link to any website', category: 'dynamic' },
  { id: 'vcard', name: 'vCard', icon: User, description: 'Contact information', category: 'dynamic' },
  { id: 'maps', name: 'Google Map', icon: MapPin, description: 'Location or address', category: 'dynamic' },
  { id: 'social', name: 'Social Media', icon: Share2, description: 'Social media profiles', category: 'dynamic' },
  { id: 'pdf', name: 'PDF', icon: FileText, description: 'PDF document', category: 'dynamic' },
  { id: 'video', name: 'Video', icon: Video, description: 'Video content', category: 'dynamic' },
  { id: 'text', name: 'Plain Text', icon: Type, description: 'Simple text message', category: 'dynamic' },
  // Static QR Types
  { id: 'static-url', name: 'URL', icon: Link, description: 'Simple web link', category: 'static' },
  { id: 'static-text', name: 'Text', icon: Type, description: 'Plain text only', category: 'static' },
];

const downloadFormats = ['JPG', 'PNG', 'SVG', 'PDF'];

export default function CreateQR() {
  const [currentStep, setCurrentStep] = useState<QRStep>('select');
  const [selectedType, setSelectedType] = useState<QRType | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [qrName, setQRName] = useState('');
  const { toast } = useToast();

  const progress = {
    select: 25,
    setup: 50,
    customize: 75,
    done: 100
  };

  const handleTypeSelect = (type: QRType) => {
    setSelectedType(type);
    setCurrentStep('setup');
  };

  const handleSetupNext = () => {
    setCurrentStep('customize');
  };

  const handleCustomizeNext = () => {
    setQRName(`${selectedType?.name} QR - ${new Date().toLocaleDateString()}`);
    setCurrentStep('done');
  };

  const handleDownload = (format: string) => {
    toast({
      title: "Download Started",
      description: `Downloading QR code as ${format}`,
    });
  };

  const renderSetupForm = () => {
    if (!selectedType) return null;

    switch (selectedType.id) {
      case 'website':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="url">Website URL</Label>
              <Input 
                id="url" 
                placeholder="https://example.com" 
                value={formData.url || ''}
                onChange={(e) => setFormData({...formData, url: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="title">Title (Optional)</Label>
              <Input 
                id="title" 
                placeholder="Enter a title for your QR code"
                value={formData.title || ''}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
          </div>
        );

      case 'vcard':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="+1234567890" />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input id="company" placeholder="Company Name" />
            </div>
          </div>
        );

      case 'maps':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" placeholder="Enter full address" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lat">Latitude (Optional)</Label>
                <Input id="lat" placeholder="40.7128" />
              </div>
              <div>
                <Label htmlFor="lng">Longitude (Optional)</Label>
                <Input id="lng" placeholder="-74.0060" />
              </div>
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="platform">Platform</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="profileUrl">Profile URL</Label>
              <Input id="profileUrl" placeholder="https://facebook.com/username" />
            </div>
          </div>
        );

      case 'pdf':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="pdfFile">Upload PDF</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PDF files up to 10MB</p>
              </div>
            </div>
            <div>
              <Label htmlFor="pdfTitle">Document Title</Label>
              <Input id="pdfTitle" placeholder="Enter document title" />
            </div>
          </div>
        );

      case 'video':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input id="videoUrl" placeholder="https://youtube.com/watch?v=..." />
            </div>
            <div>
              <Label htmlFor="videoTitle">Video Title</Label>
              <Input id="videoTitle" placeholder="Enter video title" />
            </div>
          </div>
        );

      case 'text':
      case 'static-text':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="textContent">Text Content</Label>
              <Textarea 
                id="textContent" 
                placeholder="Enter your text message"
                rows={4}
              />
            </div>
          </div>
        );

      case 'static-url':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="staticUrl">URL</Label>
              <Input id="staticUrl" placeholder="https://example.com" />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Setup form for {selectedType.name} coming soon...</p>
          </div>
        );
    }
  };

  if (currentStep === 'select') {
    return (
      <div className="container mx-auto py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Create New QR Code</h1>
          <p className="text-muted-foreground">Choose the type of QR code you want to create</p>
          <Progress value={progress.select} className="w-full max-w-md mx-auto" />
        </div>

        <Tabs defaultValue="dynamic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dynamic">Dynamic QR Codes</TabsTrigger>
            <TabsTrigger value="static">Static QR Codes</TabsTrigger>
          </TabsList>

          <TabsContent value="dynamic" className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold">Dynamic QR Codes</h2>
              <p className="text-sm text-muted-foreground">Editable content with advanced analytics</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {qrTypes.filter(type => type.category === 'dynamic').map((type) => (
                <Card 
                  key={type.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleTypeSelect(type)}
                >
                  <CardHeader className="text-center">
                    <type.icon className="mx-auto h-12 w-12 text-primary" />
                    <CardTitle className="text-lg">{type.name}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="static" className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold">Static QR Codes</h2>
              <p className="text-sm text-muted-foreground">Fixed content with basic analytics</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {qrTypes.filter(type => type.category === 'static').map((type) => (
                <Card 
                  key={type.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleTypeSelect(type)}
                >
                  <CardHeader className="text-center">
                    <type.icon className="mx-auto h-12 w-12 text-primary" />
                    <CardTitle className="text-lg">{type.name}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  if (currentStep === 'setup') {
    return (
      <div className="container mx-auto py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Setup Your QR Code</h1>
          <p className="text-muted-foreground">Configure the content for your {selectedType?.name} QR code</p>
          <Progress value={progress.setup} className="w-full max-w-md mx-auto" />
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center space-x-3">
              {selectedType && <selectedType.icon className="h-6 w-6 text-primary" />}
              <div>
                <CardTitle>{selectedType?.name} QR Code</CardTitle>
                <CardDescription>
                  <Badge variant={selectedType?.category === 'dynamic' ? 'default' : 'secondary'}>
                    {selectedType?.category}
                  </Badge>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderSetupForm()}
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep('select')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={handleSetupNext}>
                Next: Customize
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentStep === 'customize') {
    return (
      <div className="container mx-auto py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Customize Your QR Code</h1>
          <p className="text-muted-foreground">Make your QR code unique with templates and styling</p>
          <Progress value={progress.customize} className="w-full max-w-md mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="mr-2 h-5 w-5" />
                  Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {['Classic', 'Modern', 'Minimal', 'Bold', 'Elegant', 'Colorful'].map((template) => (
                    <div key={template} className="aspect-square bg-muted rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted/80">
                      <span className="text-xs font-medium">{template}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="mr-2 h-5 w-5" />
                  Logo Upload
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Upload your logo</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG up to 2MB</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="mr-2 h-5 w-5" />
                  Style Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Eye Pattern</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {['Square', 'Round', 'Dot', 'Leaf'].map((pattern) => (
                      <div key={pattern} className="aspect-square bg-muted rounded flex items-center justify-center cursor-pointer hover:bg-muted/80">
                        <span className="text-xs">{pattern}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Data Pattern</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {['Square', 'Round', 'Diamond', 'Star'].map((pattern) => (
                      <div key={pattern} className="aspect-square bg-muted rounded flex items-center justify-center cursor-pointer hover:bg-muted/80">
                        <span className="text-xs">{pattern}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Frame className="mr-2 h-5 w-5" />
                  Frame & Background
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Frame Style</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frame" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Frame</SelectItem>
                      <SelectItem value="square">Square Frame</SelectItem>
                      <SelectItem value="rounded">Rounded Frame</SelectItem>
                      <SelectItem value="circle">Circle Frame</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Background Color</Label>
                  <div className="grid grid-cols-6 gap-2 mt-2">
                    {['white', 'black', 'blue', 'red', 'green', 'purple'].map((color) => (
                      <div key={color} className={`aspect-square rounded cursor-pointer border-2 border-muted-foreground/25 bg-${color}`}></div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="mr-2 h-5 w-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-white border rounded-lg flex items-center justify-center p-8">
                  <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                    <div className="grid grid-cols-8 gap-1">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`aspect-square ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'} rounded-sm`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">QR Code Preview</p>
                  <p className="text-xs text-muted-foreground">{selectedType?.name}</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep('setup')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={handleCustomizeNext}>
                Generate QR Code
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'done') {
    return (
      <div className="container mx-auto py-8 space-y-8">
        <div className="text-center space-y-4">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="text-3xl font-bold">Congratulations!</h1>
          <p className="text-muted-foreground">Your QR Code is Ready</p>
          <Progress value={progress.done} className="w-full max-w-md mx-auto" />
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="qrName">QR Code Name</Label>
                  <Input 
                    id="qrName"
                    value={qrName}
                    onChange={(e) => setQRName(e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Auto-saved</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Download Options</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {downloadFormats.map((format) => (
                      <Button 
                        key={format}
                        variant="outline" 
                        onClick={() => handleDownload(format)}
                        className="flex items-center justify-center"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        {format}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setCurrentStep('select');
                      setSelectedType(null);
                      setFormData({});
                    }}
                  >
                    Create Another
                  </Button>
                  <Button onClick={() => window.location.href = '/qr-codes'}>
                    View All QR Codes
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Preview</h3>
                <div className="aspect-square bg-white border rounded-lg flex items-center justify-center p-8 shadow-sm">
                  <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                    <div className="grid grid-cols-12 gap-1">
                      {Array.from({ length: 144 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`aspect-square ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'} rounded-sm`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">{qrName}</p>
                  <p className="text-xs text-muted-foreground">{selectedType?.name} • {selectedType?.category}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}