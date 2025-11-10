import { NextRequest, NextResponse } from "next/server";
import { common } from "@faremeter/middleware";
import {
  x402Exact,
  isKnownCluster,
  isKnownSPLToken,
  type KnownCluster,
  type KnownSPLToken,
} from "@faremeter/info/solana";
import axios from "axios";
import Groq from "groq-sdk/index.mjs";

const PAYTO_ADDRESS = process.env.PAYTO_ADDRESS!;
const FACILITATOR_URL =
  process.env.FAREMETER_FACILITATOR_URL || "https://facilitator.corbits.dev";
const NETWORK = process.env.FAREMETER_NETWORK || "devnet";
const ASSET = process.env.ASSET || "USDC";
const AMOUNT = process.env.PAYMENT_AMOUNT || "1000";
const GROQ_API_KEY = process.env.GROQ_API_TOKEN

const NEWSAPI_KEY = process.env.NEWSAPI_KEY!;

if (!NEWSAPI_KEY) {
  throw new Error("NEWSAPI_KEY must be set in environment");
}
if (!isKnownCluster(NETWORK)) {
  throw new Error(
    `Invalid FAREMETER_NETWORK: ${NETWORK}. Must be devnet, testnet, or mainnet-beta`,
  );
}

if (!isKnownSPLToken(ASSET)) {
  throw new Error(`Invalid ASSET: ${ASSET}. Must be USDC`);
}

const network = NETWORK as KnownCluster;
const asset = ASSET as KnownSPLToken;

const groq = new Groq({
  apiKey: GROQ_API_KEY,
});

async function summarizeArticles(articles: string[], topic: string): Promise<string> {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a professional news summarizer. Provide clear, concise summaries in 2-3 sentences.",
      },
      {
        role: "user",
        content: `Summarize these news articles about "${topic}" in 2-3 concise sentences:\n\n${articles.join("\n\n")}`,
      },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
    max_tokens: 200,
  });

  return completion.choices[0]?.message?.content || "No summary available.";
}




const { getPaymentRequiredResponse } =
  common.createPaymentRequiredResponseCache();

export async function GET(req: NextRequest) {
  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headers[key.toLowerCase()] = value;
  });

  const url = new URL(req.url);
  const resource = url.toString();
  const topic = url.searchParams.get("topic") || "AI";


  let paymentResponse: { status: number; body: any } | undefined;

  const paymentRequirements = x402Exact({
    network,
    asset,
    amount: AMOUNT,
    payTo: PAYTO_ADDRESS,
  });

  const accepts = paymentRequirements.map((req) => ({
    ...req,
    resource,
    description: "Access to protected API endpoint",
    mimeType: "application/json",
  }));

  const middlewareResponse = await common.handleMiddlewareRequest({
    facilitatorURL: FACILITATOR_URL,
    accepts,
    resource,
    getPaymentRequiredResponse,
    getHeader: (key: string) => headers[key.toLowerCase()] || headers[key],
    sendJSONResponse: (status: number, body: any) => {
      paymentResponse = { status, body };
      return body;
    },
    
  }
);


  console.log("middleware", middlewareResponse)

  console.log("paymentResponse", paymentResponse)

  if (middlewareResponse || paymentResponse) {
    return NextResponse.json(paymentResponse!.body, {
      status: paymentResponse!.status,
    });
  }



  try {
    interface NewsResp {
      articles: { title: string; description: string }[];
    }

    const { data }: { data: NewsResp } = await axios.get(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        topic
      )}&apiKey=${NEWSAPI_KEY}`
    );

    const articles = data.articles
      .slice(0, 10)
      .map((a) => `${a.title}: ${a.description}`);

    const summary = await summarizeArticles(articles, topic);


    return NextResponse.json({
      articles,
      topic: topic,
      summary: summary,
      timestamp: new Date().toISOString(),
      paid: true,
    });
  } catch (error: any) {
    console.error("News API error:", error.message);
    return NextResponse.json(
      {
        error: "Failed to fetch news",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
