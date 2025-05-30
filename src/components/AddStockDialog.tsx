
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  reason: string;
}

interface AddStockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (stock: Stock) => void;
}

export const AddStockDialog = ({ open, onOpenChange, onAdd }: AddStockDialogProps) => {
  const [symbol, setSymbol] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock stock data - in real app this would fetch from API
    const mockStock: Stock = {
      symbol: symbol.toUpperCase(),
      name: `${symbol.toUpperCase()} Corporation`,
      price: Math.random() * 500 + 50,
      change: (Math.random() - 0.5) * 20,
      changePercent: (Math.random() - 0.5) * 5,
      reason: reason
    };

    onAdd(mockStock);
    setSymbol("");
    setReason("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Stock to Watchlist</DialogTitle>
          <DialogDescription>
            Tell our AI why you're interested in this stock for personalized alerts.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="symbol">Stock Symbol</Label>
            <Input
              id="symbol"
              placeholder="e.g., AAPL, GOOGL, TSLA"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Why are you interested?</Label>
            <Textarea
              id="reason"
              placeholder="e.g., Interested in their AI strategy and potential market expansion..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              rows={3}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Add to Watchlist
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
