import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, companyData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are SwipeHire's AI Hiring Assistant, an expert HR consultant that helps companies identify talent gaps and build stronger teams.

Your capabilities:
1. Analyze company data to identify skill gaps
2. Recommend hiring priorities based on industry trends
3. Provide actionable insights with data visualizations

When providing hiring recommendations, ALWAYS structure your response to include:
1. A brief analysis summary
2. Key findings and gaps identified
3. Recommended roles to hire (with priority levels: high, medium, low)
4. Skills distribution data for visualization

IMPORTANT: When you provide data for charts, format it as JSON within <chart-data> tags like this:
<chart-data type="skills-gap">
{"data": [{"name": "Frontend", "current": 3, "needed": 5}, {"name": "Backend", "current": 4, "needed": 6}]}
</chart-data>

<chart-data type="priority-roles">
{"data": [{"name": "Senior React Dev", "priority": "high", "value": 90}, {"name": "DevOps Engineer", "priority": "high", "value": 85}]}
</chart-data>

<chart-data type="department-distribution">
{"data": [{"name": "Engineering", "value": 45}, {"name": "Design", "value": 20}, {"name": "Product", "value": 15}]}
</chart-data>

Company context provided: ${JSON.stringify(companyData || {})}

Be concise, data-driven, and actionable in your responses.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Usage limit reached. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Hiring assistant error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});