
import React, { useState, useRef } from "react";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowDownIcon, 
  ArrowUpIcon, 
  PieChartIcon, 
  BarChartIcon, 
  LineChartIcon,
  Download,
  Calendar,
  Plus
} from "lucide-react";
import { categoryCount, sourceDistribution, weeklyPublications, categoryTrends } from "@/data/mockDiscoveries";
import { toast } from "sonner";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

type TimeRange = 'lastWeek' | 'lastMonth' | 'last3Months' | 'lastYear' | 'allTime';

const Insights = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('lastMonth');
  const [loading, setLoading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const categoryData = Object.entries(categoryCount).map(([name, value]) => ({ name, value }));
  const sourceData = Object.entries(sourceDistribution).map(([name, value]) => ({ name, value }));

  // Analytics summary data
  const totalPublications = Object.values(categoryCount).reduce((sum, count) => sum + count, 0);
  const topCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0];
  const weeklyGrowth = ((weeklyPublications[weeklyPublications.length - 1].count / 
                        weeklyPublications[weeklyPublications.length - 2].count) - 1) * 100;

  // Filter data based on selected time range
  const getFilteredData = () => {
    // This is a simplified implementation - in a real app, you would filter based on actual dates
    switch (selectedTimeRange) {
      case 'lastWeek':
        return weeklyPublications.slice(-2);
      case 'lastMonth':
        return weeklyPublications.slice(-4);
      case 'last3Months':
        return weeklyPublications.slice(-12);
      case 'lastYear':
        return weeklyPublications;
      default:
        return weeklyPublications;
    }
  };

  const filteredWeeklyData = getFilteredData();

  const handleTimeRangeChange = (range: TimeRange) => {
    setSelectedTimeRange(range);
    toast.info(`Analytics updated for ${getRangeLabel(range)}`);
  };

  const getRangeLabel = (range: TimeRange): string => {
    switch (range) {
      case 'lastWeek': return 'Last Week';
      case 'lastMonth': return 'Last Month';
      case 'last3Months': return 'Last 3 Months';
      case 'lastYear': return 'Last Year';
      case 'allTime': return 'All Time';
    }
  };

  const downloadPDF = async () => {
    if (!reportRef.current) return;
    
    setLoading(true);
    
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('aigen-analytics-report.pdf');
      
      toast.success("Report downloaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to download report");
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    setLoading(true);
    
    try {
      // Prepare category data
      let csvContent = "Category,Count\n";
      categoryData.forEach(({ name, value }) => {
        csvContent += `${name},${value}\n`;
      });
      
      // Prepare weekly data
      csvContent += "\nWeek,Publication Count\n";
      weeklyPublications.forEach(({ name, count }) => {
        csvContent += `${name},${count}\n`;
      });
      
      // Create a download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'aigen-analytics-data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("CSV data exported successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to export CSV data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">AI Research Insights & Analytics</h1>
        <p className="text-muted-foreground">
          Explore trends and patterns in AI research and development based on our curated data
        </p>
      </div>

      <div className="flex justify-between items-center mt-8 mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {getRangeLabel(selectedTimeRange)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => handleTimeRangeChange('lastWeek')}>
              Last Week
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleTimeRangeChange('lastMonth')}>
              Last Month
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleTimeRangeChange('last3Months')}>
              Last 3 Months
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleTimeRangeChange('lastYear')}>
              Last Year
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleTimeRangeChange('allTime')}>
              All Time
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Report
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={downloadPDF} disabled={loading}>
              Download PDF Report
            </DropdownMenuItem>
            <DropdownMenuItem onClick={downloadCSV} disabled={loading}>
              Export Data (CSV)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Analytics Summary */}
      <div ref={reportRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <Card className="bg-card shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Publications
              </CardTitle>
              <PieChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPublications}</div>
              <p className="text-xs text-muted-foreground">
                {getRangeLabel(selectedTimeRange)}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Top Category
              </CardTitle>
              <BarChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{topCategory[0]}</div>
              <p className="text-xs text-muted-foreground">
                {topCategory[1]} publications
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Weekly Growth
              </CardTitle>
              <LineChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold">{weeklyGrowth.toFixed(1)}%</div>
                {weeklyGrowth >= 0 ? (
                  <ArrowUpIcon className="ml-2 h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownIcon className="ml-2 h-4 w-4 text-red-500" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Compared to last week
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Sources
              </CardTitle>
              <PieChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.keys(sourceDistribution).length}</div>
              <p className="text-xs text-muted-foreground">
                Active AI research sources
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <Card className="md:col-span-2 bg-card shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Weekly Publications</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={filteredWeeklyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Categories Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Source Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sourceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 bg-card shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Category Trends</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={categoryTrends}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="NLP" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="CV" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="Multimodal" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Download Section */}
      <div className="my-10 bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-lg border backdrop-blur-sm text-center">
        <h3 className="text-2xl font-bold mb-4">Need Detailed Analytics?</h3>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
          Download our comprehensive analytics report with in-depth insights into AI research trends.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={downloadPDF} disabled={loading}>
            {loading ? 'Processing...' : 'Download PDF Report'}
          </Button>
          <Button variant="outline" onClick={downloadCSV} disabled={loading}>
            {loading ? 'Processing...' : 'Export Data (CSV)'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Insights;
