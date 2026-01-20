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
          {/* Header - Dark purple/black like screenshot */}
          <div className="bg-[#1e1a2e] text-white px-4 py-3">
            <div className="text-sm font-medium mb-2">{currentStock.name}</div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">${formatPrice(numPrice)}</span>
              <span className="text-xs text-gray-400">ARCX</span>
              <span className="text-green-400 text-sm font-medium">+$2.67 (4.60%)</span>
              <span className="ml-auto text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </span>
            </div>
          </div>

          {/* Bid/Ask/Volume */}
          <div className="grid grid-cols-3 px-4 py-3 border-b text-xs">
            <div>
              <div className="text-gray-500 uppercase text-[10px] font-medium">Bid <span className="text-gray-400">ARCX</span></div>
              <div className="font-medium text-gray-900">{currentStock.bid}</div>
            </div>
            <div>
              <div className="text-gray-500 uppercase text-[10px] font-medium">Ask <span className="text-gray-400">ARCX</span></div>
              <div className="font-medium text-gray-900">{currentStock.ask}</div>
            </div>
            <div>
              <div className="text-gray-500 uppercase text-[10px] font-medium">Volume</div>
              <div className="font-medium text-gray-900">{currentStock.volume}</div>
            </div>
          </div>

          {/* Order Type Dropdowns */}
          <div className="grid grid-cols-2 gap-3 px-4 py-3 border-b">
            <div>
              <label className="text-gray-500 uppercase text-[10px] font-medium block mb-1">Order Type</label>
              <select className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Conditional</option>
                <option>Market</option>
                <option>Limit</option>
              </select>
            </div>
            <div>
              <label className="text-gray-500 uppercase text-[10px] font-medium block mb-1">Conditional Type</label>
              <select className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>OCO</option>
                <option>OTO</option>
              </select>
            </div>
          </div>

          {/* Order A and B Headers */}
          <div className="grid grid-cols-2 border-b">
            <div className="px-4 py-3 border-r">
              <div className="font-bold text-sm text-gray-900">Order A</div>
              <div className="text-xs text-gray-500 mt-1">If Order A executes then Order B will be cancelled</div>
            </div>
            <div className="px-4 py-3">
              <div className="font-bold text-sm text-gray-900">Order B</div>
              <div className="text-xs text-gray-500 mt-1">If Order B executes then Order A will be cancelled</div>
            </div>
          </div>

          {/* Order Details with form fields */}
          <div className="grid grid-cols-2 border-b">
            <div className="px-4 py-3 border-r space-y-3">
              <div>
                <label className="text-gray-500 uppercase text-[10px] font-medium block mb-1">Action</label>
                <select className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Sell</option>
                  <option>Buy</option>
                </select>
              </div>
              <div>
                <label className="text-gray-500 uppercase text-[10px] font-medium block mb-1">Quantity</label>
                <input type="text" value={numShares} readOnly className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-50 text-gray-900" />
              </div>
              <div>
                <label className="text-gray-500 uppercase text-[10px] font-medium block mb-1">Order Type</label>
                <select className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Limit</option>
                  <option>Market</option>
                </select>
              </div>
              <div>
                <label className="text-gray-500 uppercase text-[10px] font-medium block mb-1">Limit Price</label>
                <input type="text" value={`$${formatPrice(limitPriceA)}`} readOnly className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-50 text-gray-900" />
                <div className="text-xs text-gray-500 mt-1">+0.8% from buy</div>
              </div>
              <div>
                <label className="text-gray-500 uppercase text-[10px] font-medium block mb-1">Time in Force</label>
                <select className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>GTC</option>
                  <option>Day</option>
                </select>
              </div>
            </div>
            <div className="px-4 py-3 space-y-3">
              <div>
                <label className="text-gray-500 uppercase text-[10px] font-medium block mb-1">Action</label>
                <select className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Sell</option>
                  <option>Buy</option>
                </select>
              </div>
              <div>
                <label className="text-gray-500 uppercase text-[10px] font-medium block mb-1">Quantity</label>
                <input type="text" value={numShares} readOnly className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-50 text-gray-900" />
              </div>
              <div>
                <label className="text-gray-500 uppercase text-[10px] font-medium block mb-1">Order Type</label>
                <select className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Stop Loss</option>
                  <option>Stop Limit</option>
                </select>
              </div>
              <div>
                <label className="text-gray-500 uppercase text-[10px] font-medium block mb-1">Stop Price</label>
                <input type="text" value={`$${formatPrice(stopPriceA)}`} readOnly className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-50 text-gray-900" />
                <div className="text-xs text-gray-500 mt-1">-2% from buy</div>
              </div>
              <div>
                <label className="text-gray-500 uppercase text-[10px] font-medium block mb-1">Time in Force</label>
                <select className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>GTC</option>
                  <option>Day</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cost Basis & Potential Gain/Loss */}
          <div className="px-4 py-3 space-y-2 border-t">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 text-sm">Cost Basis:</span>
              <span className="font-semibold text-gray-900">${formatCurrency(costBasis)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 text-sm">Potential Gain (A):</span>
              <span className="font-semibold text-green-600">+${formatCurrency(profitA)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 text-sm">Potential Loss (B):</span>
              <span className="font-semibold text-red-600">-${formatCurrency(Math.abs(lossA))}</span>
            </div>
          </div>

          {/* Preview Button */}
          <div className="p-4 pt-2">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Preview order
            </button>
          </div>
        </div>

        {/* Right Screen - 1% / 2% */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Header - Dark purple/black like screenshot */}
          <div className="bg-[#1e1a2e] text-white px-4 py-3">
            <div className="text-sm font-medium mb-2">{currentStock.name}</div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">${formatPrice(numPrice)}</span>
              <span className="text-xs text-gray-400">ARCX</span>
              <span className="text-green-400 text-sm font-medium">+$2.67 (4.60%)</span>
              <span className="ml-auto text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </span>
            </div>
          </div>

          {/* Bid/Ask/Volume */}
          <div className="grid grid-cols-3 px-4 py-3 border-b text-xs">
            <div>
              <div className="text-gray-500 uppercase text-[10px] font-medium">Bid <span className="text-gray-400">ARCX</span></div>
              <div className="font-medium text-gray-900">{currentStock.bid}</div>
            </div>
            <div>
              <div className="text-gray-500 uppercase text-[10px] font-medium">Ask <span className="text-gray-400">ARCX</span></div>
              <div className="font-medium text-gray-900">{currentStock.ask}</div>
            </div>
            <div>
              <div className="text-gray-500 uppercase text-[10px] font-medium">Volume</div>
              <div className="font-medium text-gray-900">{currentStock.volume}</div>
            </div>
          </div>

          {/* Order Type Dropdowns */}
          <div className="grid grid-cols-2 gap-3 px-4 py-3 border-b">
            <div>
              <label className="text-gray-500 uppercase text-[10px] font-medium block mb-1">Order Type</label>
              <select className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Conditional</option>
                <option>Market</option>
                <option>Limit</option>
              </select>
            </div>
            <div>
              <label className="text-gray-500 uppercase text-[10px] font-medium block mb-1">Conditional Type</label>
              <select className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>OCO</option>
                <option>OTO</option>
              </select>
            </div>
          </div>

          {/* Order A and B Headers */}
          <div className="grid grid-cols-2 border-b">
            <div className="px-4 py-3 border-r">
              <div className="font-bold text-sm text-gray-900">Order A</div>
              <div className="text-xs text-gray-500 mt-1">If Order A executes then Order B will be cancelled</div>
            </div>
            <div className="px-4 py-3">
              <div className="font-bold text-sm text-gray-900">Order B</div>
              <div className="text-xs text-gray-500 mt-1">If Order B executes then Order A will be cancelled</div>
            </div>
          </div>

          {/* Order Details with form fields */}
          <div className="grid grid-cols-2 border-b">
            <div className="px-4 py-3 border-r space-y-3">
              <div>
                <label className="text-gray-500 uppercase text-[10px] font-medium block mb-1">Action</label>
                <select className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Sell</option>
                  <option>Buy</option>
                </select>
              </div>
              <div>
                <label className="text-gray-500 uppercase text-[10px] font-medium block mb-1">Quantity</label>
                <input type="text" value={numShares} readOnly className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-50 text-gray-900" />
              </div>
              <div>
                <label className="text-gray-500 uppercase text-[10px] font-medium block mb-1">Order Type</label>
                <select className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Limit</option>
                  <option>Market</option>
                </select>
              </div>
              <div>
                <label className="text-gray-500 uppercase text-[10px] font-medium block mb-1">Limit Price</label>
                <input type="text" value={`$${formatPrice(limitPriceB)}`} readOnly className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-50 text-gray-900" />
                <div className="text-xs text-gray-500 mt-1">+1% from buy</div>
              </div>
              <div>
                <label className="text-gray-500 uppercase text-[10px] font-medium block mb-1">Time in Force</label>
                <select className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>GTC</option>
                  <option>Day</option>
                </select>
              </div>
            </div>
            <div className="px-4 py-3 space-y-3">
              <div>
                <label className="text-gray-500 uppercase text-[10px] font-medium block mb-1">Action</label>
                <select className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Sell</option>
                  <option>Buy</option>
                </select>
              </div>
              <div>
                <label className="text-gray-500 uppercase text-[10px] font-medium block mb-1">Quantity</label>
                <input type="text" value={numShares} readOnly className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-50 text-gray-900" />
              </div>
              <div>
                <label className="text-gray-500 uppercase text-[10px] font-medium block mb-1">Order Type</label>
                <select className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Stop Loss</option>
                  <option>Stop Limit</option>
                </select>
              </div>
              <div>
                <label className="text-gray-500 uppercase text-[10px] font-medium block mb-1">Stop Price</label>
                <input type="text" value={`$${formatPrice(stopPriceB)}`} readOnly className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-50 text-gray-900" />
                <div className="text-xs text-gray-500 mt-1">-2% from buy</div>
              </div>
              <div>
                <label className="text-gray-500 uppercase text-[10px] font-medium block mb-1">Time in Force</label>
                <select className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>GTC</option>
                  <option>Day</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cost Basis & Potential Gain/Loss */}
          <div className="px-4 py-3 space-y-2 border-t">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 text-sm">Cost Basis:</span>
              <span className="font-semibold text-gray-900">${formatCurrency(costBasis)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 text-sm">Potential Gain (A):</span>
              <span className="font-semibold text-green-600">+${formatCurrency(profitB)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 text-sm">Potential Loss (B):</span>
              <span className="font-semibold text-red-600">-${formatCurrency(Math.abs(lossB))}</span>
            </div>
          </div>

          {/* Preview Button */}
          <div className="p-4 pt-2">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Preview order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
