import { BarChart3, QrCode, Users, Eye, TrendingUp, Plus, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const stats = [
    {
      title: "Total QR Codes",
      value: "1,234",
      change: "+12%",
      icon: QrCode,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Active QRs",
      value: "987",
      change: "+8%",
      icon: Eye,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Total Scans",
      value: "45,678",
      change: "+23%",
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Growth Rate",
      value: "12.5%",
      change: "+2.1%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  const recentActivity = [
    { name: "Website QR - Landing Page", scans: 1234, type: "Dynamic", status: "Active" },
    { name: "vCard - John Doe", scans: 856, type: "Dynamic", status: "Active" },
    { name: "Menu QR - Restaurant", scans: 654, type: "Static", status: "Active" },
    { name: "Social Media Links", scans: 432, type: "Dynamic", status: "Inactive" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your QR code overview.</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4 mr-2" />
          Create QR Code
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-success mr-1" />
                    <span className="text-sm text-success font-medium">{stat.change}</span>
                    <span className="text-sm text-muted-foreground ml-1">from last month</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent QR Codes</CardTitle>
            <CardDescription>Your most recently created and active QR codes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <QrCode className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.scans} scans</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={item.type === "Dynamic" ? "default" : "secondary"}>
                      {item.type}
                    </Badge>
                    <Badge variant={item.status === "Active" ? "default" : "secondary"}>
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subscription Status */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Status</CardTitle>
            <CardDescription>Your current plan usage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">QR Codes Used</span>
                <span className="font-medium">1,234 / 2,000</span>
              </div>
              <Progress value={62} className="h-2" />
            </div>

            <div className="p-4 bg-gradient-primary rounded-lg text-white">
              <h3 className="font-semibold">Premium Plan</h3>
              <p className="text-sm opacity-90">Valid until Dec 31, 2024</p>
              <Button variant="secondary" size="sm" className="mt-3 w-full">
                Upgrade Plan
              </Button>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Quick Actions</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}