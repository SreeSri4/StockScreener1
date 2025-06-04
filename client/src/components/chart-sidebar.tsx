import { useState, useEffect, useRef, memo } from "react";
import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const TradingViewWidget = memo(({ symbol }: { symbol: string }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = '';
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: `NSE:${symbol}`,
        interval: "D",
        timezone: "Asia/Kolkata",
        theme: "light",
        style: "1",
        locale: "en",
        enable_publishing: false,
        allow_symbol_change: true,
        support_host: "https://www.tradingview.com"
      });
      container.current.appendChild(script);
    }
  }, [symbol]);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
    </div>
  );
});

TradingViewWidget.displayName = "TradingViewWidget";

interface ChartSidebarProps {
  symbol: string | null;
  onClose: () => void;
}

export function ChartSidebar({ symbol, onClose }: ChartSidebarProps) {
  if (!symbol) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-[calc(100%-2rem)] md:w-[750px] bg-white shadow-2xl border-l border-gray-200 z-50 flex flex-col">
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

      {/* Chart content */}
      <div className="flex-1 w-full h-[calc(100%-64px)]">
        <TradingViewWidget symbol={symbol} />
      </div>
    </div>
  );
}