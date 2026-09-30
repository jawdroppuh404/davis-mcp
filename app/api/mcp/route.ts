import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import {
  bookingOptions,
  business,
  findServiceArea,
  informationPages,
  normalize,
  searchPrices,
  serviceAreas,
  sourceUrls,
  verifiedAt,
} from "@/src/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function summarizeToolReply(reply: unknown): Record<string, string | number> {
  if (!reply || typeof reply !== "object" || !("structuredContent" in reply)) return {};
  const structuredContent = reply.structuredContent;
  if (!structuredContent || typeof structuredContent !== "object") return {};

  const data = structuredContent as Record<string, unknown>;
  const items = Array.isArray(data.matches)
    ? data.matches
    : Array.isArray(data.cities)
      ? data.cities
      : undefined;

  return {
    ...(items ? { result_count: items.length } : {}),
    ...(typeof data.status === "string" ? { outcome: data.status } : {}),
    ...(typeof data.requestType === "string" ? { request_type: data.requestType } : {}),
  };
}

async function trackToolCall<T>(tool: string, run: () => Promise<T>): Promise<T> {
  const startedAt = Date.now();
  let callStatus: "success" | "error" = "success";
  let errorType: string | undefined;

  try {
    const reply = await run();
    console.info(JSON.stringify({
      event: "mcp_tool_call",
      tool,
      day_utc: new Date().toISOString().slice(0, 10),
      call_status: callStatus,
      duration_ms: Date.now() - startedAt,
      ...summarizeToolReply(reply),
    }));
    return reply;
  } catch (error) {
    callStatus = "error";
    errorType = error instanceof Error ? error.name : "UnknownError";
    throw error;
  } finally {
    if (callStatus === "error") {
      console.info(JSON.stringify({
        event: "mcp_tool_call",
        tool,
        day_utc: new Date().toISOString().slice(0, 10),
        call_status: callStatus,
        duration_ms: Date.now() - startedAt,
        error_type: errorType,
      }));
    }
  }
}

const handler = createMcpHandler((server) => {
  server.registerTool(
    "get_davis_business_info",
    {
      title: "Get Davis Heating & Air information",
      description:
        "Use when the user asks about Davis Heating & Air's contact details, location, business hours, emergency service, or general HVAC services in South Jersey.",
      inputSchema: z.object({}),
      annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false },
    },
    async () => trackToolCall("get_davis_business_info", async () => {
      const result = {
        business,
        serviceTypes: ["Residential HVAC", "Commercial HVAC", "Heating", "Air conditioning", "Boilers", "Indoor air quality"],
        sourceUrls: [sourceUrls.home, sourceUrls.contact],
        lastVerified: verifiedAt,
      };
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }], structuredContent: result };
    }),
  );

  server.registerTool(
    "check_davis_service_area",
    {
      title: "Check Davis service area",
      description:
        "Use when the user asks whether Davis Heating & Air serves a specific South Jersey city, town, or ZIP code. A named city/town match is confirmed against Davis's explicit list. ZIP codes and unlisted places are unconfirmed because Davis publishes no ZIP-level coverage map and also mentions surrounding areas.",
      inputSchema: z.object({
        location: z.string().min(2).max(80).describe("City, town, or ZIP code only, such as Cherry Hill, NJ. Do not provide a street address."),
        service: z.string().optional().describe("HVAC service the customer is asking about, if known."),
      }),
      annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false },
    },
    async ({ location, service }) => trackToolCall("check_davis_service_area", async () => {
      const trimmedLocation = location.trim();
      if (/^\d+\s/.test(trimmedLocation) && !/^\d{5}(?:-\d{4})?$/.test(trimmedLocation)) {
        const result = {
          status: "city_or_zip_needed" as const,
          message: "For privacy, provide only a city, town, or ZIP code—not a street address.",
          sourceUrl: sourceUrls.serviceAreas,
        };
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }], structuredContent: result };
      }
      const coverage = findServiceArea(location);
      const result = { ...coverage, service: service ?? null };
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }], structuredContent: result };
    }),
  );

  server.registerTool(
    "search_davis_pricing",
    {
      title: "Search Davis published prices",
      description:
        "Use when the user asks about Davis Heating & Air's published HVAC installation or repair price ranges. Search by equipment or part (for example furnace, inducer motor, boiler, AC, or mini-split). Return only listed prices, state that they are not a diagnosis or guaranteed quote, and include the source page.",
      inputSchema: z.object({
        query: z.string().min(2).describe("Equipment, service, or repair part to search for."),
      }),
      annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false },
    },
    async ({ query }) => trackToolCall("search_davis_pricing", async () => {
      const result = {
        ...searchPrices(query),
        sourceUrl: sourceUrls.pricing,
        lastVerified: verifiedAt,
      };
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }], structuredContent: result };
    }),
  );

  server.registerTool(
    "get_davis_booking_options",
    {
      title: "Get Davis booking link",
      description:
        "Use when the user wants to book a Davis Heating & Air service call, a free estimate for a new unit, or maintenance. Route repairs to Service Call; the free-estimate link is only for new units; choose the member or non-member maintenance link based on the user's status. Returns the public Google Calendar booking page for the customer to complete.",
      inputSchema: z.object({
        requestType: z.enum(["service_call", "new_unit_estimate", "care_club_maintenance", "non_member_maintenance"]),
      }),
      annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false },
    },
    async ({ requestType }) => trackToolCall("get_davis_booking_options", async () => {
      const option = bookingOptions[requestType];
      const result = { ...option, requestType, sourceUrl: sourceUrls.schedule, lastVerified: verifiedAt };
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }], structuredContent: result };
    }),
  );

  server.registerTool(
    "search_davis_information",
    {
      title: "Find Davis service information",
      description:
        "Use when the user asks for Davis-specific information about heating, cooling, boilers, indoor air quality, commercial HVAC, service areas, pricing, or scheduling. Returns relevant official Davis pages; do not invent policies or repair guidance that are not on those pages.",
      inputSchema: z.object({
        query: z.string().min(2).describe("Topic or service to find on Davis Heating & Air's public site."),
      }),
      annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false },
    },
    async ({ query }) => trackToolCall("search_davis_information", async () => {
      const normalizedQuery = normalize(query);
      const tokens = normalizedQuery.split(" ").filter((token) => token.length > 1);
      const matches = informationPages
        .map((page) => {
          const searchable = normalize(`${page.title} ${page.summary} ${page.keywords.join(" ")}`);
          const score = page.keywords.reduce((total, keyword) => total + (normalizedQuery.includes(normalize(keyword)) ? 3 : 0), 0)
            + tokens.reduce((total, token) => total + (searchable.split(" ").includes(token) ? 1 : 0), 0);
          return { page, score };
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map(({ page }) => ({ title: page.title, summary: page.summary, url: page.url }));
      const result = {
        query,
        matches,
        message: matches.length ? "Results are official Davis Heating & Air pages." : "No matching Davis page was found in this small index. Search the Davis website or contact the company.",
        sourceUrl: sourceUrls.home,
        lastVerified: verifiedAt,
      };
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }], structuredContent: result };
    }),
  );

  server.registerTool(
    "list_davis_service_areas",
    {
      title: "List Davis service areas",
      description:
        "Use when the user asks which cities Davis Heating & Air lists as service areas. This is the explicit city list from the public site; Davis also says it serves surrounding areas.",
      inputSchema: z.object({}),
      annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false },
    },
    async () => trackToolCall("list_davis_service_areas", async () => {
      const result = {
        cities: serviceAreas.map(({ city, url }) => ({ city, url })),
        surroundingAreas: "The website also says 'and surrounding areas'; contact Davis to confirm an unlisted location.",
        sourceUrl: sourceUrls.serviceAreas,
        lastVerified: verifiedAt,
      };
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }], structuredContent: result };
    }),
  );
}, {
  serverInfo: { name: "Davis Heating & Air", version: "0.1.0" },
  instructions:
    "This server provides read-only access to public information from Davis Heating & Air's website: South Jersey service areas, published price ranges, services, and existing Google Calendar booking links. Use it for Davis-specific questions, such as whether Davis lists Cherry Hill or what it publishes for a furnace repair. Treat prices as published ranges, not diagnoses or quotes. Only explicitly listed city/town matches are confirmed; ZIP codes and other places are unconfirmed because Davis publishes no ZIP-level coverage map and also mentions surrounding areas. Booking tools return links for the customer to complete; they do not make appointments. Include the source links and disclose when information is unconfirmed.",
});

export { handler as GET, handler as POST };
