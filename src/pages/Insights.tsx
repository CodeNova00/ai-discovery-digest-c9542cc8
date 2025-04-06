
import React from "react";
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
  LineChartIcon 
} from "lucide-react";
import { categoryCount, sourceDistribution, weeklyPublications, categoryTrends } from "@/data/mockDiscoveries";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Insights = () => {
  const categoryData = Object.entries(categoryCount).map(([name, value]) => ({ name, value }));
  const sourceData = Object.entries(sourceDistribution).map(([name, value]) => ({ name, value }));

  // Analytics summary data
  const totalPublications = Object.values(categoryCount).reduce((sum, count) => sum + count, 0);
  const topCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0];
  const weeklyGrowth = ((weeklyPublications[weeklyPublications.length - 1].count / 
                        weeklyPublications[weeklyPublications.length - 2].count) - 1) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">AI Research Insights & Analytics</h1>
        <p className="text-muted-foreground">
          Explore trends and patterns in AI research and development based on our curated data
        </p>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Publications
            </CardTitle>
            <PieChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPublications}</div>
            <p className="text-xs text-muted-foreground">
              Last 2 months
            </p>
          </CardContent>
        </Card>
        <Card>
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
        <Card>
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
        <Card>
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
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Publications</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={weeklyPublications}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
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

        <Card>
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

        <Card className="md:col-span-2">
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

      {/* Download Section */}
      <div className="my-10 bg-card p-8 rounded-lg border text-center">
        <h3 className="text-2xl font-bold mb-4">Need Detailed Analytics?</h3>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
          Download our comprehensive analytics report with in-depth insights into AI research trends.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button>Download PDF Report</Button>
          <Button variant="outline">Export Data (CSV)</Button>
        </div>
      </div>
    </div>
  );
};

export default Insights;
