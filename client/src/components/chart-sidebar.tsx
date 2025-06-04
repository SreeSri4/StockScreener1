import { useState, useEffect, useRef, memo } from "react";
import { X, ExternalLink, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const TradingViewWidget = memo(({ symbol }: { symbol: string }) => {
  const container = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (container.current) {
      try {
        // Clear previous content
        container.current.innerHTML = '';
        
        // Create widget container
        const widgetContainer = document.createElement("div");
        widgetContainer.className = "tradingview-widget-container__widget";
        container.current.appendChild(widgetContainer);

        // Create script element
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.onload = () => {
          try {
            new (window as any).TradingView.widget({
              container_id: widgetContainer.id,
              autosize: true,
              symbol: `BSE:${symbol}`,
              interval: "D",
              timezone: "Asia/Kolkata",
              theme: "dark",
              style: "9",
              locale: "en",
              enable_publishing: false,
              allow_symbol_change: true,
              studies: [
                  "STD;SMA",
                  "STD;Relative%1Volume%1at%1Time"
              ],
              hide_top_toolbar: false,
              hide_legend: false,
              save_image: false,
              height: "100%",
              width: "100%",
            });
          } catch (err) {
            console.error("Error initializing TradingView widget:", err);
            setError(true);
          }
        };
        script.onerror = () => {
          console.error("Failed to load TradingView script");
          setError(true);
        };
        
        // Add unique ID to widget container
        widgetContainer.id = `tradingview_${Math.random().toString(36).substring(7)}`;
        
        // Append script
        document.head.appendChild(script);
        
        return () => {
          // Cleanup
          if (script.parentNode) {
            script.parentNode.removeChild(script);
          }
        };
      } catch (err) {
        console.error("Error setting up TradingView widget:", err);
        setError(true);
      }
    }
  }, [symbol]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gray-50">
        <TrendingUp className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Unable to Load Chart
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          There was an error loading the TradingView chart. You can view it directly on TradingView.
        </p>
        <Button
          onClick={() => window.open(`https://in.tradingview.com/chart/?symbol=NSE:${symbol}`, '_blank')}
          className="inline-flex items-center"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Open in TradingView
        </Button>
      </div>
    );
  }

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }} />
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
