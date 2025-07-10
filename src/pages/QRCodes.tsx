import { useState } from "react";
import { Search, Filter, Download, Edit, Trash2, Eye, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const qrCodes = [
  {
    id: "1",
    name: "Website QR - Landing Page",
    type: "Dynamic",
    createdDate: "2024-01-15",
    scans: 1234,
    status: "Active"
  },
  {
    id: "2", 
    name: "vCard - John Doe",
    type: "Dynamic",
    createdDate: "2024-01-12",
    scans: 856,
    status: "Active"
  },
  {
    id: "3",
    name: "Menu QR - Restaurant", 
    type: "Static",
    createdDate: "2024-01-10",
    scans: 654,
    status: "Active"
  },
  {
    id: "4",
    name: "Social Media Links",
    type: "Dynamic", 
    createdDate: "2024-01-08",
    scans: 432,
    status: "Inactive"
  },
  {
    id: "5",
    name: "Contact Info QR",
    type: "Static",
    createdDate: "2024-01-05",
    scans: 298,
    status: "Active"
  }
];

export default function QRCodes() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(qrCodes.map(qr => qr.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id));
    }
  };

  const filteredQRCodes = qrCodes.filter(qr => {
    const matchesSearch = qr.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || qr.type.toLowerCase() === typeFilter;
    const matchesStatus = statusFilter === "all" || qr.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My QR Codes</h1>
          <p className="text-muted-foreground">Manage and track all your QR codes in one place.</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4 mr-2" />
          Create New QR
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search QR codes..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="dynamic">Dynamic</SelectItem>
                <SelectItem value="static">Static</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bulk Actions */}
          {selectedItems.length > 0 && (
            <div className="flex items-center gap-2 mt-4 p-3 bg-primary/10 rounded-lg">
              <span className="text-sm font-medium">
                {selectedItems.length} item(s) selected
              </span>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* QR Codes Table */}
      <Card>
        <CardHeader>
          <CardTitle>QR Codes ({filteredQRCodes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedItems.length === qrCodes.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>QR Code Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Scan Count</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQRCodes.map((qr) => (
                <TableRow key={qr.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox 
                      checked={selectedItems.includes(qr.id)}
                      onCheckedChange={(checked) => handleSelectItem(qr.id, checked === true)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{qr.name}</TableCell>
                  <TableCell>
                    <Badge variant={qr.type === "Dynamic" ? "default" : "secondary"}>
                      {qr.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{qr.createdDate}</TableCell>
                  <TableCell>{qr.scans.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={qr.status === "Active" ? "default" : "secondary"}>
                      {qr.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}