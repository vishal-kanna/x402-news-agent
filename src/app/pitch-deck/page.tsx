"use client";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  Shield,
  DollarSign,
  Coins,
  Sparkles,
  TrendingUp,
  Globe,
  Lock,
} from "lucide-react";
import Link from "next/link";

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "x402 News Agent",
      subtitle: "Micropayments Meet AI News",
      content: (
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-block p-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
            <p className="text-2xl text-gray-300 max-w-2xl mx-auto">
              Pay-per-use AI news summarization powered by Solana micropayments
            </p>
            <div className="flex items-center justify-center gap-3 text-cyan-400">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              <span className="text-lg">Live on Devnet</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { label: "Cost per Query", value: "0.001 USDC" },
              { label: "Response Time", value: "<3 seconds" },
              { label: "Protocol", value: "x402 Standard" },
            ].map((stat, i) => (
              <div
                key={i}
                className="glass p-6 rounded-xl border border-white/20 text-center"
              >
                <p className="text-sm text-gray-400 mb-2">{stat.label}</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "The Problem",
      subtitle: "Traditional API Payment Models Are Broken",
      content: (
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="grid gap-4">
            {[
              {
                icon: <DollarSign className="w-8 h-8" />,
                title: "Expensive Subscriptions",
                desc: "Users pay $50-500/month regardless of actual usage",
                color: "from-red-500 to-orange-500",
              },
              {
                icon: <Lock className="w-8 h-8" />,
                title: "Gatekeeping",
                desc: "Credit cards, KYC, and accounts block billions from access",
                color: "from-orange-500 to-yellow-500",
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "No Granularity",
                desc: "All-or-nothing pricing prevents casual, one-time usage",
                color: "from-yellow-500 to-red-500",
              },
            ].map((problem, i) => (
              <div
                key={i}
                className="glass p-6 rounded-xl border border-white/10 flex gap-4 items-start hover:border-red-500/50 transition-all"
              >
                <div
                  className={`p-3 bg-gradient-to-br ${problem.color} rounded-lg text-white`}
                >
                  {problem.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {problem.title}
                  </h3>
                  <p className="text-gray-400">{problem.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "The Solution",
      subtitle: "x402: HTTP 402 Payment Required",
      content: (
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="glass p-8 rounded-2xl border border-cyan-500/50">
            <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              How x402 Protocol Works
            </h3>
            <div className="grid gap-4">
              {[
                {
                  step: "1",
                  text: "Client requests protected resource",
                  time: "0ms",
                },
                {
                  step: "2",
                  text: "Server returns 402 with payment instructions",
                  time: "50ms",
                },
                {
                  step: "3",
                  text: "Phantom wallet prompts user approval",
                  time: "User action",
                },
                {
                  step: "4",
                  text: "0.001 USDC transferred on Solana",
                  time: "400ms",
                },
                {
                  step: "5",
                  text: "Payment proof validated via Facilitator",
                  time: "200ms",
                },
                {
                  step: "6",
                  text: "AI-summarized news delivered",
                  time: "2000ms",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{item.text}</p>
                  </div>
                  <div className="text-sm text-cyan-400 font-mono">
                    {item.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Technology Stack",
      subtitle: "Built on Cutting-Edge Infrastructure",
      content: (
        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              category: "Blockchain",
              icon: <Coins className="w-10 h-10" />,
              items: [
                "Solana Devnet",
                "USDC (Circle)",
                "Phantom Wallet",
                "Sub-second finality",
              ],
              color: "from-purple-500 to-indigo-600",
            },
            {
              category: "Payment Protocol",
              icon: <Shield className="w-10 h-10" />,
              items: [
                "x402 Standard",
                "Faremeter SDK",
                "Corbits Facilitator",
                "On-chain verification",
              ],
              color: "from-cyan-500 to-blue-600",
            },
            {
              category: "AI & Data",
              icon: <Sparkles className="w-10 h-10" />,
              items: [
                "Groq Llama 3.3 70B",
                "NewsAPI.org",
                "Real-time summarization",
                "2-3 sentence outputs",
              ],
              color: "from-emerald-500 to-teal-600",
            },
            {
              category: "Frontend",
              icon: <Globe className="w-10 h-10" />,
              items: [
                "Next.js 14",
                "React 18",
                "TypeScript",
                "Glassmorphism UI",
              ],
              color: "from-pink-500 to-rose-600",
            },
          ].map((tech, i) => (
            <div
              key={i}
              className="glass p-6 rounded-xl border border-white/20 hover:border-white/40 transition-all"
            >
              <div
                className={`inline-block p-3 bg-gradient-to-br ${tech.color} rounded-lg mb-4`}
              >
                {tech.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                {tech.category}
              </h3>
              <ul className="space-y-2">
                {tech.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-gray-300">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Key Features",
      subtitle: "Why x402 News Agent Stands Out",
      content: (
        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: <Zap className="w-8 h-8" />,
              title: "Instant Payments",
              desc: "Solana's 400ms block time enables real-time transactions",
              color: "from-yellow-400 to-orange-500",
            },
            {
              icon: <DollarSign className="w-8 h-8" />,
              title: "True Micropayments",
              desc: "$0.001 per query — impossible with traditional systems",
              color: "from-green-400 to-emerald-500",
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: "Zero Trust",
              desc: "Payment verified on-chain before any data is released",
              color: "from-blue-400 to-cyan-500",
            },
            {
              icon: <Globe className="w-8 h-8" />,
              title: "No Barriers",
              desc: "No signup, no KYC, no credit card required",
              color: "from-purple-400 to-pink-500",
            },
            {
              icon: <Sparkles className="w-8 h-8" />,
              title: "AI-Powered",
              desc: "Groq's Llama 3.3 70B delivers professional summaries",
              color: "from-cyan-400 to-blue-500",
            },
            {
              icon: <TrendingUp className="w-8 h-8" />,
              title: "Scalable Economics",
              desc: "Pay only for what you use — perfect for casual users",
              color: "from-pink-400 to-rose-500",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="glass p-6 rounded-xl border border-white/10 hover:border-white/30 transition-all"
            >
              <div
                className={`inline-block p-3 bg-gradient-to-br ${feature.color} rounded-lg mb-4`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      ),
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white overflow-hidden relative">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 animate-pulse"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-ping"></div>
        <div
          className="absolute bottom-20 right-20 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl animate-ping"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">x402 News Agent</h1>
              <p className="text-xs text-gray-400">Pitch Deck</p>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            Slide {currentSlide + 1} / {slides.length}
          </div>
        </div>
      </header>

      {/* Back to Search – ALWAYS FULLY VISIBLE */}
      <div className="absolute top-[100px] left-6 z-50">
        <Link
          href="/"
          className={`
      flex items-center gap-2
      px-6 py-2.5               /* generous horizontal padding */
      min-w-[180px]             /* never shrink below this */
      justify-center            /* center icon + text */
      bg-white/10 backdrop-blur-md
      border border-white/20
      rounded-full
      text-white font-medium text-sm
      hover:bg-white/20 hover:border-cyan-400
      transition-all duration-200
      group
    `}
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="whitespace-nowrap">Back to Search</span>
        </Link>
      </div>

      {/* Main slide content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="min-h-[70vh]">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {slides[currentSlide].title}
            </h2>
            <p className="text-2xl text-gray-400">
              {slides[currentSlide].subtitle}
            </p>
          </div>
          <div className="animate-fadeIn">{slides[currentSlide].content}</div>
        </div>
      </main>

      {/* Navigation */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="glass flex items-center gap-4 px-6 py-4 rounded-full border border-white/20">
          <button
            onClick={prevSlide}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentSlide
                    ? "bg-cyan-400 w-8"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-xs text-gray-400">
        <p>
          Built by{" "}
          <a
            href="https://x.com/v_potpelliwar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline"
          >
            @v_potpelliwar
          </a>{" "}
          | India | November 10, 2025
        </p>
      </footer>

      <style jsx>{`
        .glass {
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
