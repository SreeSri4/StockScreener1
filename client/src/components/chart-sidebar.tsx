import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChartSidebarProps {
  symbol: string | null;
  onClose: () => void;
}

export function ChartSidebar({ symbol, onClose }: ChartSidebarProps) {
  if (!symbol) return null;

  const chartUrl = `https://in.tradingview.com/chart/?symbol=NSE:${symbol}&interval=1D`;

  return (
    <div className="fixed right-0 top-0 h-full w-1/2 bg-white shadow-2xl border-l border-gray-200 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-gray-900">Chart: {symbol}</h3>
          <span className="text-sm text-gray-500">NSE</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Chart iframe */}
      <div className="flex-1 relative">
        <iframe
          src={chartUrl}
          className="w-full h-full border-0"
          title={`${symbol} Chart`}
          allow="fullscreen"
          style={{ minHeight: "600px" }}
        />
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-500 text-center">
          Chart powered by TradingView
        </p>
      </div>
    </div>
  );
}