import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartData {
  type: string;
  data: any[];
}

interface AssistantChartsProps {
  charts: ChartData[];
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--match))', 'hsl(var(--success))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

export function AssistantCharts({ charts }: AssistantChartsProps) {
  const renderChart = (chart: ChartData, index: number) => {
    switch (chart.type) {
      case 'skills-gap':
        return (
          <Card key={index} className="mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Skills Gap Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chart.data} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis type="number" className="text-xs" />
                    <YAxis dataKey="name" type="category" width={80} className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="current" fill="hsl(var(--muted-foreground))" name="Current" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="needed" fill="hsl(var(--primary))" name="Needed" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-2 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-muted-foreground" />
                  <span className="text-muted-foreground">Current</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-primary" />
                  <span className="text-muted-foreground">Needed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'priority-roles':
        return (
          <Card key={index} className="mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Priority Roles to Hire</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chart.data}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="name" className="text-xs" tick={{ fontSize: 10 }} />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar 
                      dataKey="value" 
                      fill="hsl(var(--match))" 
                      radius={[4, 4, 0, 0]}
                      name="Priority Score"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        );

      case 'department-distribution':
        return (
          <Card key={index} className="mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Team Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chart.data}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {chart.data.map((_, i) => (
                        <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {charts.map((chart, index) => renderChart(chart, index))}
    </div>
  );
}