import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Bell, Plus, User, LogOut } from "lucide-react";
import { StockCard } from "@/components/StockCard";
import { AddStockDialog } from "@/components/AddStockDialog";
import { useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const { logout, isAuthenticated, isLoading, user } = useKindeAuth();
  const [showAddStock, setShowAddStock] = useState(false);
  const [watchlist, setWatchlist] = useState([
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 175.43,
      change: 2.15,
      changePercent: 1.24,
      reason: "Interested in their AI and services growth potential"
    },
    {
      symbol: "NVDA", 
      name: "NVIDIA Corporation",
      price: 445.67,
      change: -8.32,
      changePercent: -1.83,
      reason: "Monitoring AI chip demand and competition"
    }
  ]);

  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Smart Stock Whisperer</CardTitle>
            <CardDescription>
              AI-powered stock alerts tailored to your investment interests
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Personalized news alerts</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm">AI-powered insights</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-purple-600" />
                <span className="text-sm">Custom watchlists</span>
              </div>
            </div>
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
              <Link to="/signin">
                Sign In to Get Started
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Smart Stock Whisperer</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-200">
                Premium Plan
              </Badge>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">{user?.givenName || 'User'}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your Watchlist</h2>
            <p className="text-gray-600">Track stocks with AI-powered insights</p>
          </div>
          <Button 
            onClick={() => setShowAddStock(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Stock
          </Button>
        </div>

        {/* Stock Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlist.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>

        {/* Add Stock Dialog */}
        <AddStockDialog 
          open={showAddStock} 
          onOpenChange={setShowAddStock}
          onAdd={(stock) => {
            setWatchlist([...watchlist, stock]);
            setShowAddStock(false);
          }}
        />
      </div>
    </div>
  );
};

export default Index;
