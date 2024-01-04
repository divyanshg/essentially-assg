import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import {
    Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';

const API_URL = "http://localhost:3000/api";

type Stock = {
  ticker: string;
  name: string;
  active: boolean;
  currency_name: string;
  refreshInterval: number;
  currPrice: number;
};

export function StocksList() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [stockNum, setStockNum] = useState<number>(20);

  const fetchData = useCallback(async () => {
    console.log(stockNum);
    const { data } = await axios.get(
      `${API_URL}/stocks?numberOfStocks=${stockNum}`
    );

    return data;
  }, [stockNum]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData().then((data) => {
        setStocks(data);
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchData]);

  return (
    <div>
      <div className="px-4 my-4">
        <label htmlFor="stockNum">
          Enter number of stocks to fetch (max 20)
        </label>
        <div className="mt-2 w-[300px] border border-gray-200 rounded-lg">
          <input
            type="number"
            name="stockNum"
            id="stockNum"
            placeholder="Enter number of stocks to fetch"
            max={20}
            min={0}
            onChange={(e) => setStockNum(parseInt(e.target.value))}
            value={stockNum}
            className="w-full p-2 rounded-lg"
          />
        </div>
      </div>
      <Table>
        <TableCaption>Showing {stocks.length} / 20 stocks</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">Name</TableHead>
            <TableHead>Is Active</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>Refresh Interval</TableHead>
            <TableHead className="text-right">Curr. Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((stock) => (
            <TableRow key={stock.ticker}>
              <TableCell className="font-medium w-[400px]">
                <span>{stock.name}</span>
                <br />
                <span className="font-light text-gray-600">
                  ({stock.ticker})
                </span>
              </TableCell>
              <TableCell>{stock.active ? "true" : "false"}</TableCell>
              <TableCell>{stock.currency_name.toUpperCase()}</TableCell>
              <TableCell>{stock.refreshInterval}s</TableCell>
              <TableCell className="font-bold text-right">
                ${stock.currPrice}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
