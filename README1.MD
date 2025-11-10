# x402-news-agent

**Pay-per-use AI news summarization agent** powered by **Faremeter's x402 protocol** on **Solana Devnet**.  
No subscriptions. No logins. Just **micro-payments via Phantom wallet**.

> **Search any topic → Pay 0.001 USDC → Get AI-summarized news instantly**

---

## Features

- **x402-compliant micropayments** (USDC on Solana Devnet)
- **Phantom wallet** integration with `createFareMeterClient()`
- **Groq Llama 3.3 70B** for real-time article summarization
- **NewsAPI.org** as real-time data source
- Beautiful **glassmorphism UI** with live payment & network status
- **Zero trust**: Payment validated on-chain before response

---

## Prerequisites

- Node.js ≥18
- [Phantom Wallet](https://phantom.app) (browser extension)
- Devnet USDC in your wallet

---

## Repository

```bash
git clone https://github.com/vishal-kanna/x402-news-agent.git
cd x402-news-agent
```

> Replace `yourusername` with your actual GitHub handle.

---

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Faremeter x402 Configuration
PAYTO_ADDRESS=your_solana_receive_address
FAREMETER_FACILITATOR_URL=https://facilitator.corbits.dev
FAREMETER_NETWORK=devnet
ASSET=USDC
PAYMENT_AMOUNT=1000          # 0.001 USDC (1000 lamports)

# AI & Data
GROQ_API_TOKEN=your_groq_api_key_here
NEWSAPI_KEY=your_newsapi_org_key_here
```

> Get API keys:
> - [Groq Console](https://console.groq.com/keys)
> - [NewsAPI.org](https://newsapi.org/register)

---

### 3. Fund Your Wallet (Devnet)

1. Open **Phantom** → Settings → **Developer Settings**
2. Switch to **Solana Devnet**
3. Get **USDC** from: [https://faucet.circle.com](https://faucet.circle.com)

---

### 4. Run Locally

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## How It Works

### Client Flow (`app/page.tsx`)

```tsx
const fetchWithPayment = await createFareMeterClient();
const res = await fetchWithPayment(`/news?topic=${topic}`, { method: "GET" });
```

1. First request → `402 Payment Required`
2. `createFareMeterClient()` detects → opens Phantom
3. User approves **0.001 USDC**
4. Payment proof sent via `x402` header
5. Server validates → returns AI-summarized news

---

### Server Protection (`app/api/news/route.ts`)

```ts
const paymentRequirements = x402Exact({
  network: "devnet",
  asset: "USDC",
  amount: "1000",
  payTo: PAYTO_ADDRESS,
});

const middlewareResponse = await common.handleMiddlewareRequest({
  facilitatorURL: FACILITATOR_URL,
  accepts,
  resource,
  getPaymentRequiredResponse,
  getHeader,
  sendJSONResponse,
});
```

- Uses **Corbits Facilitator** for reliable payment verification
- Only executes AI logic **after** confirmed payment
- Returns `402` with payment instructions if unpaid

---

### AI Summarization

```ts
const summary = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: [
    { role: "system", content: "Summarize in 2-3 concise sentences." },
    { role: "user", content: `Summarize news on "${topic}":\n\n${articles.join("\n\n")}` }
  ],
});
```

- Fetches top 10 articles
- Generates **concise, professional summary**
- Includes full titles + descriptions

---

## API Response

```json
{
  "articles": [
    "Google unveils new AI model: Breakthrough in reasoning capabilities..."
  ],
  "topic": "AI advancements",
  "summary": "Google and OpenAI released major AI updates this week...",
  "timestamp": "2025-11-10T09:51:00.000Z",
  "paid": true,
  "cost": "0.001 USDC",
  "articleCount": 10,
  "network": "Devnet"
}
```

---

## Project Structure

```
x402-news-agent/
├── app/
│   ├── page.tsx              → Main UI (Home)
│   └── api/news/route.ts     → x402-protected API
├── lib/
│   └── faremeter-client.ts   → x402 fetch wrapper
├── public/
├── .env.example
└── README.md
```

---