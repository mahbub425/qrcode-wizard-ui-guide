import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  Download, 
  Edit, 
  Eye, 
  Plus, 
  Save, 
  Trash2,
  CheckCircle2,
  Calendar,
  FileText
} from "lucide-react";

// Mock data
const billingHistory = [
  {
    id: 1,
    date: '2024-01-15',
    plan: 'Premium',
    amount: 'BDT 1,200',
    expiryDate: '2024-02-15',
    status: 'paid',
    invoiceUrl: '/invoice-001.pdf'
  },
  {
    id: 2,
    date: '2023-12-15',
    plan: 'Basic',
    amount: 'BDT 400',
    expiryDate: '2024-01-15',
    status: 'paid',
    invoiceUrl: '/invoice-002.pdf'
  },
  {
    id: 3,
    date: '2023-11-15',
    plan: 'Basic',
    amount: 'BDT 400',
    expiryDate: '2023-12-15',
    status: 'paid',
    invoiceUrl: '/invoice-003.pdf'
  },
];

const paymentMethods = [
  {
    id: 1,
    type: 'card',
    brand: 'Visa',
    last4: '4242',
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true
  },
  {
    id: 2,
    type: 'card',
    brand: 'Mastercard',
    last4: '5555',
    expiryMonth: 8,
    expiryYear: 2024,
    isDefault: false
  }
];

export default function Billing() {
  const [billingInfo, setBillingInfo] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    organization: 'ABC Company',
    vatId: 'VAT123456789',
    address: '123 Main Street, Dhaka, Bangladesh'
  });
  
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setBillingInfo(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Implementation for saving billing information
    setHasChanges(false);
    toast({
      title: "Billing Information Saved",
      description: "Your billing information has been updated successfully.",
    });
  };

  const handleDownloadInvoice = (invoiceUrl: string) => {
    // Implementation for downloading invoice
    toast({
      title: "Download Started",
      description: "Invoice download will begin shortly.",
    });
  };

  const handleAddPaymentMethod = () => {
    // Implementation for adding payment method
    toast({
      title: "Redirect to Payment Setup",
      description: "You will be redirected to add a new payment method.",
    });
  };

  const handleRemovePaymentMethod = (id: number) => {
    // Implementation for removing payment method
    toast({
      title: "Payment Method Removed",
      description: "The payment method has been removed successfully.",
    });
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-muted-foreground">Manage your billing information and payment history</p>
      </div>

      {/* Billing Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Edit className="mr-2 h-5 w-5" />
            Billing Information
          </CardTitle>
          <CardDescription>
            Update your billing details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={billingInfo.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={billingInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="organization">Organization</Label>
              <Input
                id="organization"
                value={billingInfo.organization}
                onChange={(e) => handleInputChange('organization', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="vatId">VAT/Tax ID</Label>
              <Input
                id="vatId"
                value={billingInfo.vatId}
                onChange={(e) => handleInputChange('vatId', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Billing Address</Label>
            <Textarea
              id="address"
              value={billingInfo.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              rows={3}
            />
          </div>

          {hasChanges && (
            <div className="flex items-center space-x-2 p-4 bg-muted rounded-lg">
              <div className="flex-1">
                <p className="text-sm font-medium">You have unsaved changes</p>
                <p className="text-xs text-muted-foreground">Don't forget to save your changes</p>
              </div>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Payment Methods
              </CardTitle>
              <CardDescription>
                Manage your payment methods and billing preferences
              </CardDescription>
            </div>
            <Button onClick={handleAddPaymentMethod}>
              <Plus className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {method.brand} •••• {method.last4}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Expires {method.expiryMonth}/{method.expiryYear}
                    </p>
                  </div>
                  {method.isDefault && (
                    <Badge variant="secondary">Default</Badge>
                  )}
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleRemovePaymentMethod(method.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Billing History
          </CardTitle>
          <CardDescription>
            View your past invoices and payment history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingHistory.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{invoice.plan}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{invoice.amount}</TableCell>
                  <TableCell>{new Date(invoice.expiryDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={invoice.status === 'paid' ? 'default' : 'destructive'}
                      className="capitalize"
                    >
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedInvoice(invoice)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Invoice Details</DialogTitle>
                            <DialogDescription>
                              Invoice for {selectedInvoice?.plan} plan
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="font-medium text-muted-foreground">Date</p>
                                <p>{selectedInvoice && new Date(selectedInvoice.date).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <p className="font-medium text-muted-foreground">Amount</p>
                                <p>{selectedInvoice?.amount}</p>
                              </div>
                              <div>
                                <p className="font-medium text-muted-foreground">Plan</p>
                                <p>{selectedInvoice?.plan}</p>
                              </div>
                              <div>
                                <p className="font-medium text-muted-foreground">Status</p>
                                <Badge variant="default" className="capitalize">
                                  {selectedInvoice?.status}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                className="flex-1"
                                onClick={() => handleDownloadInvoice(selectedInvoice?.invoiceUrl)}
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadInvoice(invoice.invoiceUrl)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Current Subscription Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Current Subscription
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-medium">Premium Plan</p>
              <p className="text-sm text-muted-foreground">
                Active until February 15, 2024 • BDT 1,200/month
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => window.location.href = '/plans'}>
                View Plans
              </Button>
              <Button>
                Manage Subscription
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}