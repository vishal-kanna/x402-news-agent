"use client";
import { useState } from "react";
import { createFareMeterClient } from "@/lib/faremeter-client";

interface NewsResponse {
  articles: string[];
  topic: string;
  timestamp: string;
  paid: boolean;
  cost?: string;        // optional – will be shown if returned
  articleCount?: number; // optional – will be shown if returned
  network?: string;     // optional – will be shown if returned
}

export default function Home() {
  const [response, setResponse] = useState<NewsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [topic, setTopic] = useState("AI advancements");

  const handleFetchNews = async () => {
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const fetchWithPayment = await createFareMeterClient();
      const res = await fetchWithPayment(
        `/news?topic=${encodeURIComponent(topic)}`,
        { method: "GET" }
      );

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      setResponse(data);
    } catch (err: any) {
      console.error("Full error:", err);
      setError(err.message || err.toString() || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Default values (only used when API doesn't return them)
  const cost = response?.cost ?? "0.01 USDC";
  const articleCount = response?.articleCount ?? response?.articles?.length ?? 0;
  const network = response?.network ?? "Devnet";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white overflow-hidden relative">
      {/* Animated background blobs */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 animate-pulse"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-ping"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl animate-ping delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              FareMeter News
            </h1>
            <p className="text-sm text-gray-300 mt-1">Pay-per-use news API powered by Solana</p>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 rounded-full text-sm font-bold text-black">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            {network} Live
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">

        {/* Dynamic Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Cost per Query", value: cost, grad: "from-cyan-400 to-blue-400" },
            { label: "Articles Returned", value: `${articleCount} Articles`, grad: "from-purple-400 to-pink-400" },
            { label: "Network", value: network, grad: "from-emerald-400 to-teal-400" },
          ].map((c, i) => (
            <div
              key={i}
              className="glass p-6 rounded-2xl border border-white/10 hover:shadow-xl transition-shadow"
            >
              <p className="text-sm text-gray-400 mb-1">{c.label}</p>
              <p className={`text-2xl font-bold bg-gradient-to-r ${c.grad} bg-clip-text text-transparent`}>
                {c.value}
              </p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="glass p-8 rounded-2xl border border-white/10">
          <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
            <span className="text-2xl">Search</span> Topic
          </h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., AI, blockchain, climate..."
              className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
            />
            <button
              onClick={handleFetchNews}
              disabled={loading || !topic.trim()}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2
                ${loading || !topic.trim()
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-md hover:shadow-lg"
                }`}
            >
              {loading ? "Processing..." : `Fetch News (Pay ${cost})`}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="glass p-5 rounded-xl border border-red-500/40 bg-red-900/20">
            <p className="text-red-300 flex items-center gap-2">
              <span>Error:</span> {error}
            </p>
          </div>
        )}

        {/* Success */}
        {response && (
          <div className="glass p-8 rounded-2xl border border-cyan-500/40">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-semibold">{response.topic}</h3>
              <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-black text-xs font-bold rounded-full">
                Paid
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              Retrieved: {new Date(response.timestamp).toLocaleString()}
            </p>
            <div className="space-y-4">
              {response.articles.map((a, i) => (
                <div
                  key={i}
                  className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-400/50 transition-all flex gap-3 items-start"
                >
                  <span className="text-cyan-400 font-bold">{i + 1}.</span>
                  <p className="text-gray-200">{a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Setup Guide */}
        <div className="glass p-6 rounded-xl border border-white/10 text-xs text-gray-400">
          <h3 className="text-base font-semibold text-white mb-3">Quick Setup</h3>
          <ol className="space-y-1">
            <li>1. Install <a href="https://phantom.app" target="_blank" className="text-cyan-400 hover:underline">Phantom</a></li>
            <li>2. Switch to <strong>Devnet</strong></li>
            <li>3. Get USDC from <a href="https://faucet.circle.com" target="_blank" className="text-cyan-400 hover:underline">Circle Faucet</a></li>
            <li>4. Approve payment in Phantom</li>
          </ol>
        </div>
      </main>

      {/* Glass style */}
      <style jsx>{`
        .glass {
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .delay-1000 { animation-delay: 1s; }
      `}</style>
    </div>
  );
}