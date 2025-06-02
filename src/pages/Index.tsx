
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Bell, Plus, User, LogOut, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { StockCard } from "@/components/StockCard";
import { AddStockDialog } from "@/components/AddStockDialog";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Stock Watch CRM
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 text-base">
              Professional investment tracking for DIY retail investors
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Personalized investment insights</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Advanced portfolio analytics</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Smart watchlist management</span>
              </div>
            </div>
            <Button asChild className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium py-3 rounded-xl shadow-lg">
              <Link to="/signin">
                Get Started
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.givenName || 'Investor'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what's happening with your portfolio today
          </p>
        </div>

        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Portfolio Value</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">$124,590</p>
                </div>
                <div className="flex items-center text-emerald-600 dark:text-emerald-400">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">+2.4%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Day's Change</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">+$1,847</p>
                </div>
                <div className="flex items-center text-emerald-600 dark:text-emerald-400">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">+1.5%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Positions</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                </div>
                <Badge variant="outline" className="border-indigo-200 text-indigo-700 dark:border-indigo-800 dark:text-indigo-300">
                  Watchlist: {watchlist.length}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Watchlist Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Watchlist</h2>
              <p className="text-gray-600 dark:text-gray-400">Track stocks with AI-powered insights</p>
            </div>
            <Button 
              onClick={() => setShowAddStock(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Stock
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {watchlist.map((stock) => (
              <Card key={stock.symbol} className="border-0 shadow-sm bg-white dark:bg-gray-900 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{stock.symbol}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900 dark:text-white">${stock.price}</p>
                      <div className={`flex items-center text-sm font-medium ${
                        stock.change >= 0 
                          ? 'text-emerald-600 dark:text-emerald-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {stock.change >= 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {stock.change >= 0 ? '+' : ''}{stock.change} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%)
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    {stock.reason}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
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
    </AppLayout>
  );
};

export default Index;
