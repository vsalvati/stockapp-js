"use client";

import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState<string>("");

  const numValue = parseFloat(value);
  const onePercentAbove = !isNaN(numValue) ? numValue * 1.01 : null;
  const twoPercentBelow = !isNaN(numValue) ? numValue * 0.98 : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-md flex-col items-center gap-8 p-8 bg-white shadow-lg rounded-xl dark:bg-zinc-900">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Value Calculator
        </h1>
        
        <div className="w-full">
          <label 
            htmlFor="value-input" 
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
          >
            Enter a value
          </label>
          <input
            id="value-input"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g. 100"
            className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
          />
        </div>

        <div className="w-full grid grid-cols-1 gap-4">
          <div className="p-4 bg-green-50 rounded-lg dark:bg-green-900/20">
            <p className="text-sm text-green-700 dark:text-green-400 font-medium">1% Above</p>
            <p className="text-2xl font-semibold text-green-900 dark:text-green-100">
              {onePercentAbove !== null ? onePercentAbove.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "-"}
            </p>
          </div>
          
          <div className="p-4 bg-red-50 rounded-lg dark:bg-red-900/20">
            <p className="text-sm text-red-700 dark:text-red-400 font-medium">2% Below</p>
            <p className="text-2xl font-semibold text-red-900 dark:text-red-100">
              {twoPercentBelow !== null ? twoPercentBelow.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "-"}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
