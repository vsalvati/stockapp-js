"use client";

import { useState } from "react";

export default function Home() {
  const [ticker, setTicker] = useState<string>("SOXL");
  const [shares, setShares] = useState<string>("500");
  const [buyPrice, setBuyPrice] = useState<string>("60.75");

  const stockData: Record<string, { name: string; bid: string; ask: string; volume: string }> = {
    "SOXL": {
      name: "Direxion Daily Semiconductor Bull 3X Shares",
      bid: "60.70 x 300",
      ask: "60.75 x 400",
      volume: "58,559,515"
    },
    "TSLA": {
      name: "Tesla, Inc.",
      bid: "239.90 x 500",
      ask: "240.15 x 400",
      volume: "88,100,000"
    },
    "AAPL": {
      name: "Apple Inc.",
      bid: "185.85 x 600",
      ask: "185.92 x 500",
      volume: "52,400,000"
    }
  };

  const currentStock = stockData[ticker] || {
    name: "Unknown Symbol",
    bid: "- x -",
    ask: "- x -",
    volume: "-"
  };

  const numShares = parseFloat(shares) || 0;
  const numPrice = parseFloat(buyPrice) || 0;

  // Cost basis
  const costBasis = numShares * numPrice;

  // Left screen: 0.8% limit, 2% stop
  const limitPriceA = numPrice * 1.008;
  const stopPriceA = numPrice * 0.98;
  const estimatedValueA = numShares * limitPriceA;
  const estimatedValueAStop = numShares * stopPriceA;
  const profitA = estimatedValueA - costBasis;
  const lossA = estimatedValueAStop - costBasis;

  // Right screen: 1% limit, 2% stop
  const limitPriceB = numPrice * 1.01;
  const stopPriceB = numPrice * 0.98;
  const estimatedValueB = numShares * limitPriceB;
  const estimatedValueBStop = numShares * stopPriceB;
  const profitB = estimatedValueB - costBasis;
  const lossB = estimatedValueBStop - costBasis;

  const formatPrice = (value: number) => {
    return value.toFixed(2);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Input Section */}
      <div className="max-w-4xl mx-auto mb-6 bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 uppercase">Symbol</label>
            <input
              type="text"
              value={ticker}
              onChange={(e) => {
                const val = e.target.value.toUpperCase();
                setTicker(val);
              }}
              className="w-full mt-1 p-2 text-lg font-semibold text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 uppercase">Quantity</label>
            <input
              type="number"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              className="w-full mt-1 p-2 text-lg text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 uppercase">Buy Price</label>
            <input
              type="number"
              step="0.01"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              className="w-full mt-1 p-2 text-lg text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Two OCO Screens Side by Side */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4">
        {/* Left Screen - 0.8% / 2% */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Header */}
          <div className="bg-green-600 text-white px-4 py-3">
            <div className="text-sm font-medium">{currentStock.name}</div>
          </div>

          {/* Price Info */}
          <div className="px-4 py-3 border-b">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">${formatPrice(numPrice)}</span>
              <span className="text-xs text-gray-600">ARCX</span>
              <span className="text-green-600 text-sm font-medium">+$2.67 (4.60%)</span>
            </div>
          </div>

          {/* Bid/Ask/Volume */}
          <div className="grid grid-cols-3 px-4 py-2 border-b text-xs">
            <div>
              <div className="text-gray-700 uppercase font-semibold">Bid <span className="text-gray-600">ARCX</span></div>
              <div className="font-medium">{currentStock.bid}</div>
            </div>
            <div>
              <div className="text-gray-700 uppercase font-semibold">Ask <span className="text-gray-600">ARCX</span></div>
              <div className="font-medium">{currentStock.ask}</div>
            </div>
            <div>
              <div className="text-gray-700 uppercase font-semibold">Volume</div>
              <div className="font-medium">{currentStock.volume}</div>
            </div>
          </div>

          {/* Order Type */}
          <div className="grid grid-cols-2 px-4 py-2 border-b text-xs">
            <div>
              <div className="text-gray-700 uppercase font-semibold">Type</div>
              <div className="font-medium">Conditional</div>
            </div>
            <div>
              <div className="text-gray-700 uppercase font-semibold">Conditional Type</div>
              <div className="px-2 py-0.5 bg-gray-100 rounded text-center font-medium inline-block">OCO</div>
            </div>
          </div>

          {/* Order A and B Headers */}
          <div className="grid grid-cols-2 border-b">
            <div className="px-4 py-2 border-r">
              <div className="font-bold text-sm">Order A</div>
              <div className="text-xs text-gray-600">If Order A executes then Order B will be cancelled</div>
            </div>
            <div className="px-4 py-2">
              <div className="font-bold text-sm">Order B</div>
              <div className="text-xs text-gray-600">If Order B executes then Order A will be cancelled</div>
            </div>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-2 border-b">
            <div className="px-4 py-2 border-r space-y-3">
              <div>
                <div className="text-xs text-gray-700 uppercase font-semibold">Action</div>
                <div className="font-medium">Sell</div>
              </div>
              <div>
                <div className="text-xs text-gray-700 uppercase font-semibold">Quantity</div>
                <div className="font-medium">{numShares}</div>
              </div>
              <div>
                <div className="text-xs text-gray-700 uppercase font-semibold">Order Type</div>
                <div className="font-medium">Limit</div>
              </div>
              <div>
                <div className="text-xs text-gray-700 uppercase font-semibold">Limit Price</div>
                <div className="font-medium text-green-600">${formatPrice(limitPriceA)}</div>
                <div className="text-xs text-gray-600">+0.8% from buy</div>
              </div>
              <div>
                <div className="text-xs text-gray-700 uppercase font-semibold">Time in Force</div>
                <div className="font-medium">GTC</div>
              </div>
            </div>
            <div className="px-4 py-2 space-y-3">
              <div>
                <div className="text-xs text-gray-700 uppercase font-semibold">Action</div>
                <div className="font-medium">Sell</div>
              </div>
              <div>
                <div className="text-xs text-gray-700 uppercase font-semibold">Quantity</div>
                <div className="font-medium">{numShares}</div>
              </div>
              <div>
                <div className="text-xs text-gray-700 uppercase font-semibold">Order Type</div>
                <div className="font-medium">Stop Loss</div>
              </div>
              <div>
                <div className="text-xs text-gray-700 uppercase font-semibold">Stop Price</div>
                <div className="font-medium text-red-600">${formatPrice(stopPriceA)}</div>
                <div className="text-xs text-gray-600">-2% from buy</div>
              </div>
              <div>
                <div className="text-xs text-gray-700 uppercase font-semibold">Time in Force</div>
                <div className="font-medium">GTC</div>
              </div>
            </div>
          </div>

          {/* Cost Basis & Estimated Values */}
          <div className="px-4 py-3 space-y-2 border-b bg-gray-50">
            <div className="flex justify-between">
              <span className="text-gray-800 font-semibold">Cost Basis:</span>
              <span className="font-semibold text-gray-900">${formatCurrency(costBasis)}</span>
            </div>
          </div>
          <div className="px-4 py-3 space-y-2 border-b">
            <div className="flex justify-between">
              <span className="text-gray-800">Estimated value (A):</span>
              <span className="font-semibold text-green-600">${formatCurrency(estimatedValueA)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-800">Potential Profit (A):</span>
              <span className="font-semibold text-green-600">+${formatCurrency(profitA)}</span>
            </div>
            <hr className="my-2 border-gray-200" />
            <div className="flex justify-between">
              <span className="text-gray-800">Estimated value (B):</span>
              <span className="font-semibold text-red-600">${formatCurrency(estimatedValueAStop)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-800">Potential Loss (B):</span>
              <span className="font-semibold text-red-600">-${formatCurrency(Math.abs(lossA))}</span>
            </div>
          </div>

          {/* Preview Button */}
          <div className="p-4">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition">
              Preview order
            </button>
          </div>
        </div>

        {/* Right Screen - 1% / 2% */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Header */}
          <div className="bg-green-600 text-white px-4 py-3">
            <div className="text-sm font-medium">{currentStock.name}</div>
          </div>

          {/* Price Info */}
          <div className="px-4 py-3 border-b">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">${formatPrice(numPrice)}</span>
              <span className="text-xs text-gray-600">ARCX</span>
              <span className="text-green-600 text-sm font-medium">+$2.67 (4.60%)</span>
            </div>
          </div>

          {/* Bid/Ask/Volume */}
          <div className="grid grid-cols-3 px-4 py-2 border-b text-xs">
            <div>
              <div className="text-gray-700 uppercase font-semibold">Bid <span className="text-gray-600">ARCX</span></div>
              <div className="font-medium">{currentStock.bid}</div>
            </div>
            <div>
              <div className="text-gray-700 uppercase font-semibold">Ask <span className="text-gray-600">ARCX</span></div>
              <div className="font-medium">{currentStock.ask}</div>
            </div>
            <div>
              <div className="text-gray-700 uppercase font-semibold">Volume</div>
              <div className="font-medium">{currentStock.volume}</div>
            </div>
          </div>

          {/* Order Type */}
          <div className="grid grid-cols-2 px-4 py-2 border-b text-xs">
            <div>
              <div className="text-gray-700 uppercase font-semibold">Type</div>
              <div className="font-medium">Conditional</div>
            </div>
            <div>
              <div className="text-gray-700 uppercase font-semibold">Conditional Type</div>
              <div className="px-2 py-0.5 bg-gray-100 rounded text-center font-medium inline-block">OCO</div>
            </div>
          </div>

          {/* Order A and B Headers */}
          <div className="grid grid-cols-2 border-b">
            <div className="px-4 py-2 border-r">
              <div className="font-bold text-sm">Order A</div>
              <div className="text-xs text-gray-600">If Order A executes then Order B will be cancelled</div>
            </div>
            <div className="px-4 py-2">
              <div className="font-bold text-sm">Order B</div>
              <div className="text-xs text-gray-600">If Order B executes then Order A will be cancelled</div>
            </div>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-2 border-b">
            <div className="px-4 py-2 border-r space-y-3">
              <div>
                <div className="text-xs text-gray-700 uppercase font-semibold">Action</div>
                <div className="font-medium">Sell</div>
              </div>
              <div>
                <div className="text-xs text-gray-700 uppercase font-semibold">Quantity</div>
                <div className="font-medium">{numShares}</div>
              </div>
              <div>
                <div className="text-xs text-gray-700 uppercase font-semibold">Order Type</div>
                <div className="font-medium">Limit</div>
              </div>
              <div>
                <div className="text-xs text-gray-700 uppercase font-semibold">Limit Price</div>
                <div className="font-medium text-green-600">${formatPrice(limitPriceB)}</div>
                <div className="text-xs text-gray-600">+1% from buy</div>
              </div>
              <div>
                <div className="text-xs text-gray-700 uppercase font-semibold">Time in Force</div>
                <div className="font-medium">GTC</div>
              </div>
            </div>
            <div className="px-4 py-2 space-y-3">
              <div>
                <div className="text-xs text-gray-700 uppercase font-semibold">Action</div>
                <div className="font-medium">Sell</div>
              </div>
              <div>
                <div className="text-xs text-gray-700 uppercase font-semibold">Quantity</div>
                <div className="font-medium">{numShares}</div>
              </div>
              <div>
                <div className="text-xs text-gray-700 uppercase font-semibold">Order Type</div>
                <div className="font-medium">Stop Loss</div>
              </div>
              <div>
                <div className="text-xs text-gray-700 uppercase font-semibold">Stop Price</div>
                <div className="font-medium text-red-600">${formatPrice(stopPriceB)}</div>
                <div className="text-xs text-gray-600">-2% from buy</div>
              </div>
              <div>
                <div className="text-xs text-gray-700 uppercase font-semibold">Time in Force</div>
                <div className="font-medium">GTC</div>
              </div>
            </div>
          </div>

          {/* Cost Basis & Estimated Values */}
          <div className="px-4 py-3 space-y-2 border-b bg-gray-50">
            <div className="flex justify-between">
              <span className="text-gray-800 font-semibold">Cost Basis:</span>
              <span className="font-semibold text-gray-900">${formatCurrency(costBasis)}</span>
            </div>
          </div>
          <div className="px-4 py-3 space-y-2 border-b">
            <div className="flex justify-between">
              <span className="text-gray-800">Estimated value (A):</span>
              <span className="font-semibold text-green-600">${formatCurrency(estimatedValueB)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-800">Potential Profit (A):</span>
              <span className="font-semibold text-green-600">+${formatCurrency(profitB)}</span>
            </div>
            <hr className="my-2 border-gray-200" />
            <div className="flex justify-between">
              <span className="text-gray-800">Estimated value (B):</span>
              <span className="font-semibold text-red-600">${formatCurrency(estimatedValueBStop)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-800">Potential Loss (B):</span>
              <span className="font-semibold text-red-600">-${formatCurrency(Math.abs(lossB))}</span>
            </div>
          </div>

          {/* Preview Button */}
          <div className="p-4">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition">
              Preview order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
