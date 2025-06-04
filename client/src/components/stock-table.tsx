import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { formatPrice, formatVolume, formatMarketCap, formatChange } from "@/lib/utils";
import type { StockResponse } from "@shared/schema";

type SortColumn = "symbol" | "name" | "price" | "change" | "volume" | "marketCap";
type SortDirection = "asc" | "desc";

interface StockTableProps {
  data: StockResponse["stocks"];
}

export function StockTable({ data }: StockTableProps) {
  const [sortColumn, setSortColumn] = useState<SortColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;

    let aVal: any = a[sortColumn];
    let bVal: any = b[sortColumn];

    // Handle numeric sorting
    if (sortColumn === "price" || sortColumn === "change") {
      aVal = parseFloat(aVal);
      bVal = parseFloat(bVal);
    } else if (sortColumn === "volume" || sortColumn === "marketCap") {
      aVal = Number(aVal);
      bVal = Number(bVal);
    }

    if (sortDirection === "asc") {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const getSortIcon = (column: SortColumn) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400" />;
    }
    return sortDirection === "asc" ? 
      <ArrowUp className="ml-2 h-4 w-4 text-blue-500" /> : 
      <ArrowDown className="ml-2 h-4 w-4 text-blue-500" />;
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-6 py-3">
              <Button
                variant="ghost"
                className="h-auto p-0 font-medium text-xs text-gray-500 uppercase tracking-wider hover:bg-gray-100"
                onClick={() => handleSort("symbol")}
              >
                Symbol
                {getSortIcon("symbol")}
              </Button>
            </TableHead>
            <TableHead className="px-6 py-3 hidden sm:table-cell">
              <Button
                variant="ghost"
                className="h-auto p-0 font-medium text-xs text-gray-500 uppercase tracking-wider hover:bg-gray-100"
                onClick={() => handleSort("name")}
              >
                Company Name
                {getSortIcon("name")}
              </Button>
            </TableHead>
            <TableHead className="px-6 py-3">
              <Button
                variant="ghost"
                className="h-auto p-0 font-medium text-xs text-gray-500 uppercase tracking-wider hover:bg-gray-100"
                onClick={() => handleSort("price")}
              >
                Price
                {getSortIcon("price")}
              </Button>
            </TableHead>
            <TableHead className="px-6 py-3">
              <Button
                variant="ghost"
                className="h-auto p-0 font-medium text-xs text-gray-500 uppercase tracking-wider hover:bg-gray-100"
                onClick={() => handleSort("change")}
              >
                Change
                {getSortIcon("change")}
              </Button>
            </TableHead>
            <TableHead className="px-6 py-3 hidden md:table-cell">
              <Button
                variant="ghost"
                className="h-auto p-0 font-medium text-xs text-gray-500 uppercase tracking-wider hover:bg-gray-100"
                onClick={() => handleSort("volume")}
              >
                Volume
                {getSortIcon("volume")}
              </Button>
            </TableHead>
            <TableHead className="px-6 py-3 hidden lg:table-cell">
              <Button
                variant="ghost"
                className="h-auto p-0 font-medium text-xs text-gray-500 uppercase tracking-wider hover:bg-gray-100"
                onClick={() => handleSort("marketCap")}
              >
                Market Cap
                {getSortIcon("marketCap")}
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((stock) => {
            const changeNum = parseFloat(stock.change);
            const changeClass = changeNum >= 0 ? "text-green-600" : "text-red-600";
            
            return (
              <TableRow key={stock.id} className="hover:bg-gray-50 transition-colors duration-150">
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{stock.symbol}</div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                  <div className="text-sm text-gray-900">{stock.name}</div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {formatPrice(stock.price)}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-medium ${changeClass}`}>
                    {formatChange(stock.change, stock.changePercent)}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <div className="text-sm text-gray-900">{formatVolume(stock.volume)}</div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                  <div className="text-sm text-gray-900">{formatMarketCap(stock.marketCap)}</div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
