
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Bell, MoreVertical } from "lucide-react";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  reason: string;
}

interface StockCardProps {
  stock: Stock;
}

export const StockCard = ({ stock }: StockCardProps) => {
  const isPositive = stock.change >= 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-bold">{stock.symbol}</CardTitle>
          <p className="text-sm text-gray-600">{stock.name}</p>
        </div>
        <Button variant="ghost" size="sm">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">${stock.price.toFixed(2)}</div>
          <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="font-medium">
              {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-1">Your Interest:</p>
          <p className="text-sm text-gray-600">{stock.reason}</p>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            <Bell className="w-3 h-3 mr-1" />
            Daily Alerts
          </Badge>
          <Button variant="outline" size="sm">
            View Insights
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
