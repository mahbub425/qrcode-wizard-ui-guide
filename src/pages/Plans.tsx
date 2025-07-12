import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Check, 
  Crown, 
  Star, 
  Zap, 
  Building2,
  ArrowRight,
  Clock
} from "lucide-react";

type Plan = {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  icon: React.ComponentType<any>;
  isPopular?: boolean;
  isEnterprise?: boolean;
  color: string;
};

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 'Free',
    period: 'Forever',
    description: 'Perfect for personal use and testing',
    icon: Star,
    color: 'text-blue-500',
    features: [
      'Unlimited static QR codes',
      '2 dynamic QR codes/month',
      'Basic analytics (total scan count)',
      'Standard support',
      'PNG/JPG downloads'
    ]
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 'BDT 400',
    period: 'per month',
    description: 'Great for small businesses and freelancers',
    icon: Zap,
    color: 'text-green-500',
    isPopular: true,
    features: [
      'Everything in Free',
      '10 dynamic QR codes',
      'Unlimited scans',
      'Basic customization (color, logo)',
      'Standard analytics (scan time and location)',
      'Email support',
      'All download formats (PNG, JPG, SVG, PDF)'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 'BDT 1,200',
    period: 'per month',
    description: 'Perfect for growing businesses with advanced needs',
    icon: Crown,
    color: 'text-purple-500',
    features: [
      'Everything in Basic',
      '50 dynamic QR codes',
      'Advanced analytics (detailed location and device info)',
      'Advanced customization options',
      'Bulk creation and management',
      'API access',
      'Priority support',
      'Custom domains',
      'Team collaboration'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: 'from BDT 3,000/month',
    description: 'For large organizations with enterprise requirements',
    icon: Building2,
    color: 'text-orange-500',
    isEnterprise: true,
    features: [
      'Everything in Premium',
      'Unlimited dynamic QR codes',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced security features',
      'SLA guarantee',
      '24/7 phone support',
      'Custom reporting',
      'White-label solutions',
      'Training and onboarding'
    ]
  }
];

export default function Plans() {
  const [currentPlan] = useState('basic'); // Mock current plan
  const [isYearly, setIsYearly] = useState(false);
  const { toast } = useToast();

  const handlePlanAction = (planId: string) => {
    if (planId === currentPlan) {
      return; // Current plan, no action needed
    }

    if (planId === 'enterprise') {
      toast({
        title: "Contact Sales",
        description: "Our team will reach out to discuss your enterprise needs.",
      });
      return;
    }

    // For other plans, redirect to checkout
    toast({
      title: "Redirecting to Checkout",
      description: `Setting up your ${plans.find(p => p.id === planId)?.name} plan...`,
    });
    
    // Simulate redirect to checkout
    setTimeout(() => {
      window.location.href = `/checkout?plan=${planId}`;
    }, 1000);
  };

  const getButtonText = (planId: string) => {
    if (planId === currentPlan) {
      return 'Active';
    }
    
    if (planId === 'enterprise') {
      return 'Contact Sales';
    }

    // Check if plan is expiring soon (mock logic)
    const isExpiring = currentPlan === 'basic' && new Date() > new Date('2024-02-01');
    
    if (isExpiring && planId === currentPlan) {
      return 'Renew';
    }

    return 'Buy Now';
  };

  const getButtonVariant = (planId: string) => {
    if (planId === currentPlan) {
      return 'secondary';
    }
    return 'default';
  };

  const isButtonDisabled = (planId: string) => {
    return planId === currentPlan;
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Choose Your Plan</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select the perfect plan for your QR code needs. Upgrade or downgrade at any time.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center space-x-4 p-1 bg-muted rounded-lg w-fit mx-auto">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-4 py-2 rounded-md transition-colors ${!isYearly ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-4 py-2 rounded-md transition-colors ${isYearly ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}
          >
            Yearly
            <Badge className="ml-2" variant="secondary">Save 20%</Badge>
          </button>
        </div>
      </div>

      {/* Current Plan Status */}
      {currentPlan && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Crown className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Current Plan: {plans.find(p => p.id === currentPlan)?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Active until February 15, 2024
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-orange-500" />
                <span className="text-sm text-orange-500 font-medium">Expires in 15 days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative transition-all duration-200 hover:shadow-lg ${
              plan.isPopular ? 'border-primary shadow-md scale-105' : ''
            } ${currentPlan === plan.id ? 'ring-2 ring-primary' : ''}`}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center space-y-4">
              <div className={`mx-auto p-3 rounded-full bg-muted w-fit`}>
                <plan.icon className={`h-6 w-6 ${plan.color}`} />
              </div>
              
              <div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </div>
              
              <div className="space-y-1">
                <div className="text-3xl font-bold">
                  {plan.price}
                  {plan.price !== 'Free' && plan.price !== 'Custom' && isYearly && (
                    <span className="text-lg text-muted-foreground line-through ml-2">
                      {plan.price.replace('400', '480').replace('1,200', '1,440')}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {isYearly && plan.price !== 'Free' && plan.price !== 'Custom' 
                    ? 'per year' 
                    : plan.period
                  }
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3 text-sm">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={getButtonVariant(plan.id)}
                disabled={isButtonDisabled(plan.id)}
                onClick={() => handlePlanAction(plan.id)}
              >
                {getButtonText(plan.id)}
                {!isButtonDisabled(plan.id) && (
                  <ArrowRight className="ml-2 h-4 w-4" />
                )}
              </Button>

              {currentPlan === plan.id && (
                <div className="text-center">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Check className="mr-1 h-3 w-3" />
                    Current Plan
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Can I change my plan anytime?</h4>
              <p className="text-sm text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">What payment methods do you accept?</h4>
              <p className="text-sm text-muted-foreground">
                We accept all major credit cards, debit cards, and local payment methods in Bangladesh.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Is there a free trial?</h4>
              <p className="text-sm text-muted-foreground">
                Our Free plan gives you access to basic features forever. Paid plans can be tried with our 7-day money-back guarantee.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">What happens to my QR codes if I downgrade?</h4>
              <p className="text-sm text-muted-foreground">
                Your existing QR codes remain active, but you'll be limited to your new plan's monthly creation limits.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enterprise Contact */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-8 text-center">
          <Building2 className="mx-auto h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Need an Enterprise Solution?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Get custom pricing and features tailored to your organization's needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => handlePlanAction('enterprise')}>
              Contact Sales Team
            </Button>
            <Button variant="outline" size="lg">
              Schedule Demo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}