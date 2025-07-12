import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Calendar, Download, Filter, Search, TrendingUp, TrendingDown, MapPin, Users } from "lucide-react";

// Mock data
const scanData = [
  { date: '2024-01-01', current: 120, previous: 80 },
  { date: '2024-01-02', current: 150, previous: 90 },
  { date: '2024-01-03', current: 180, previous: 110 },
  { date: '2024-01-04', current: 200, previous: 120 },
  { date: '2024-01-05', current: 170, previous: 100 },
  { date: '2024-01-06', current: 220, previous: 140 },
  { date: '2024-01-07', current: 250, previous: 160 },
];

const uniqueScansData = [
  { date: '2024-01-01', current: 80, previous: 60 },
  { date: '2024-01-02', current: 95, previous: 70 },
  { date: '2024-01-03', current: 110, previous: 85 },
  { date: '2024-01-04', current: 130, previous: 90 },
  { date: '2024-01-05', current: 115, previous: 75 },
  { date: '2024-01-06', current: 145, previous: 100 },
  { date: '2024-01-07', current: 160, previous: 120 },
];

const topPerformingQRs = [
  { rank: 1, name: 'Restaurant Menu', scans: 2450, percentage: 25.2 },
  { rank: 2, name: 'Business Card', scans: 1890, percentage: 19.4 },
  { rank: 3, name: 'Website Link', scans: 1567, percentage: 16.1 },
  { rank: 4, name: 'Contact Info', scans: 1234, percentage: 12.7 },
  { rank: 5, name: 'Event Details', scans: 987, percentage: 10.1 },
];

const locationData = [
  { country: 'Bangladesh', city: 'Dhaka', count: 1234, percentage: 35.2 },
  { country: 'Bangladesh', city: 'Chittagong', count: 567, percentage: 16.2 },
  { country: 'India', city: 'Mumbai', count: 432, percentage: 12.3 },
  { country: 'USA', city: 'New York', count: 321, percentage: 9.1 },
  { country: 'UK', city: 'London', count: 289, percentage: 8.2 },
];

export default function Analytics() {
  const [dateRange, setDateRange] = useState('7');
  const [searchQuery, setSearchQuery] = useState('');
  const [qrTypeFilter, setQRTypeFilter] = useState('all');

  const totalScans = scanData.reduce((sum, item) => sum + item.current, 0);
  const totalUniqueScans = uniqueScansData.reduce((sum, item) => sum + item.current, 0);
  const previousTotalScans = scanData.reduce((sum, item) => sum + item.previous, 0);
  const previousTotalUniqueScans = uniqueScansData.reduce((sum, item) => sum + item.previous, 0);

  const scansGrowth = ((totalScans - previousTotalScans) / previousTotalScans * 100).toFixed(1);
  const uniqueScansGrowth = ((totalUniqueScans - previousTotalUniqueScans) / previousTotalUniqueScans * 100).toFixed(1);

  const handleExportCSV = () => {
    // Implementation for CSV export
    console.log('Exporting CSV...');
  };

  const handleExportPDF = () => {
    // Implementation for PDF export
    console.log('Exporting PDF...');
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Track your QR code performance and insights</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={handleExportPDF}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Date Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Today</SelectItem>
                  <SelectItem value="7">Last 7 Days</SelectItem>
                  <SelectItem value="30">Last 30 Days</SelectItem>
                  <SelectItem value="90">Last 90 Days</SelectItem>
                  <SelectItem value="180">Last 180 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Search by Name</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search QR codes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">QR Type</label>
              <Select value={qrTypeFilter} onValueChange={setQRTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="dynamic">Dynamic</SelectItem>
                  <SelectItem value="static">Static</SelectItem>
                  <SelectItem value="website">Website URL</SelectItem>
                  <SelectItem value="vcard">vCard</SelectItem>
                  <SelectItem value="text">Text</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total Scans Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Total Scans</span>
              <div className="flex items-center space-x-2">
                {parseFloat(scansGrowth) > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${parseFloat(scansGrowth) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {scansGrowth}%
                </span>
              </div>
            </CardTitle>
            <CardDescription>
              Current vs Previous Period Comparison
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={scanData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="current" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Current Period"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="previous" 
                    stroke="hsl(var(--muted-foreground))" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Previous Period"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Unique Scans Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Unique Scans</span>
              <div className="flex items-center space-x-2">
                {parseFloat(uniqueScansGrowth) > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${parseFloat(uniqueScansGrowth) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {uniqueScansGrowth}%
                </span>
              </div>
            </CardTitle>
            <CardDescription>
              Current vs Previous Period Comparison
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={uniqueScansData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="current" fill="hsl(var(--primary))" name="Current Period" />
                  <Bar dataKey="previous" fill="hsl(var(--muted))" name="Previous Period" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing QR Codes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Top Performing QR Codes
            </CardTitle>
            <CardDescription>Ranked by total scan count</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Scans</TableHead>
                  <TableHead>% of Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPerformingQRs.map((qr) => (
                  <TableRow key={qr.rank}>
                    <TableCell>
                      <Badge variant={qr.rank <= 3 ? "default" : "secondary"}>
                        #{qr.rank}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{qr.name}</TableCell>
                    <TableCell>{qr.scans.toLocaleString()}</TableCell>
                    <TableCell>{qr.percentage}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Location-based Scans */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Location-based Scans
            </CardTitle>
            <CardDescription>Scans by geographic location</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Country</TableHead>
                  <TableHead>City/State</TableHead>
                  <TableHead>Count</TableHead>
                  <TableHead>%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {locationData.map((location, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{location.country}</TableCell>
                    <TableCell>{location.city}</TableCell>
                    <TableCell>{location.count.toLocaleString()}</TableCell>
                    <TableCell>{location.percentage}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">Total QR Codes</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">Total Scans</p>
                <p className="text-2xl font-bold">{totalScans.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">Unique Scans</p>
                <p className="text-2xl font-bold">{totalUniqueScans.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">Avg. Daily Scans</p>
                <p className="text-2xl font-bold">{Math.round(totalScans / 7)}</p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}