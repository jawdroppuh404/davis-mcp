export const verifiedAt = "2026-09-23";

export const sourceUrls = {
  home: "https://davisheatingair.com/",
  pricing: "https://davisheatingair.com/about-us/pricing/",
  schedule: "https://davisheatingair.com/schedule-service/",
  serviceAreas: "https://davisheatingair.com/service-areas/",
  heating: "https://davisheatingair.com/heating/",
  cooling: "https://davisheatingair.com/cooling/",
  boilers: "https://davisheatingair.com/heating/boilers/",
  indoorAirQuality: "https://davisheatingair.com/indoor-air-quality/",
  commercial: "https://davisheatingair.com/heating/commercial-hvac-in-cherry-hill-nj/",
  contact: "https://davisheatingair.com/contact/",
  privacy: "https://davisheatingair.com/privacy-policy/",
  terms: "https://davisheatingair.com/terms-and-conditions/",
} as const;

export const business = {
  name: "Davis Heating & Air",
  address: "600 Deer Rd. Unit 11B, Cherry Hill Township, NJ 08034",
  emergencyAvailability: "24/7 emergency service",
  officeHours: "Monday–Friday, 8 AM–4 PM; Saturday–Sunday, emergency only",
  serviceSummary:
    "Residential and commercial HVAC service in South Jersey, including heating, air conditioning, boilers, and indoor air quality.",
  sourceUrl: sourceUrls.home,
  contactUrl: sourceUrls.contact,
  lastVerified: verifiedAt,
} as const;

export const serviceAreas = [
  { city: "Cherry Hill", aliases: ["cherry hill", "cherry hill township"], url: sourceUrls.home },
  { city: "Audubon", aliases: ["audubon"], url: "https://davisheatingair.com/service-areas/audubon/" },
  { city: "Burlington", aliases: ["burlington"], url: "https://davisheatingair.com/service-areas/burlington/" },
  { city: "Delran", aliases: ["delran"], url: "https://davisheatingair.com/service-areas/delran/" },
  { city: "Haddonfield", aliases: ["haddonfield"], url: "https://davisheatingair.com/service-areas/haddonfield/" },
  { city: "Marlton", aliases: ["marlton"], url: "https://davisheatingair.com/service-areas/marlton/" },
  { city: "Moorestown", aliases: ["moorestown"], url: "https://davisheatingair.com/service-areas/moorestown/" },
  { city: "Mount Laurel", aliases: ["mount laurel", "mt laurel"], url: "https://davisheatingair.com/service-areas/mount-laurel/" },
  { city: "Riverton", aliases: ["riverton"], url: "https://davisheatingair.com/service-areas/riverton/" },
  { city: "Willingboro", aliases: ["willingboro"], url: "https://davisheatingair.com/service-areas/willingboro/" },
] as const;

export type PriceItem = {
  category: "installation" | "standard_repair" | "mini_split_repair";
  name: string;
  price: string;
  package?: string;
  keywords: string[];
};

export const priceItems: PriceItem[] = [
  { category: "installation", name: "AC System (SEER rated)", package: "Bronze", price: "$5,000–$12,000 installed", keywords: ["ac", "air conditioning", "air conditioner", "cooling", "replacement", "installation"] },
  { category: "installation", name: "AC System (SEER rated)", package: "Silver or Gold", price: "See Furnace & AC systems", keywords: ["ac", "air conditioning", "air conditioner", "cooling", "replacement", "installation"] },
  { category: "installation", name: "Heat Pump (15 SEER2)", package: "Bronze", price: "$10,000–$25,000 installed", keywords: ["heat pump", "heating", "cooling", "replacement", "installation"] },
  { category: "installation", name: "Heat Pump (15 SEER2)", package: "Silver", price: "$12,500–$25,000 installed", keywords: ["heat pump", "heating", "cooling", "replacement", "installation"] },
  { category: "installation", name: "Heat Pump (15 SEER2)", package: "Gold", price: "See 17 SEER2 heat pump range", keywords: ["heat pump", "heating", "cooling", "replacement", "installation"] },
  { category: "installation", name: "Heat Pump (17 SEER2)", package: "Bronze or Silver", price: "See 15 SEER2 heat pump range", keywords: ["heat pump", "heating", "cooling", "replacement", "installation"] },
  { category: "installation", name: "Heat Pump (17 SEER2)", package: "Gold", price: "$16,500–$25,000 installed", keywords: ["heat pump", "heating", "cooling", "replacement", "installation"] },
  { category: "installation", name: "Furnace & AC (80% AFUE)", package: "Bronze", price: "$10,000–$14,000 installed", keywords: ["furnace", "heating", "ac", "air conditioning", "replacement", "installation"] },
  { category: "installation", name: "Furnace & AC (80% AFUE)", package: "Silver", price: "$13,500–$15,000 installed", keywords: ["furnace", "heating", "ac", "air conditioning", "replacement", "installation"] },
  { category: "installation", name: "Furnace & AC (80% AFUE)", package: "Gold", price: "$14,000–$20,000 installed", keywords: ["furnace", "heating", "ac", "air conditioning", "replacement", "installation"] },
  { category: "installation", name: "Furnace & AC (90%+ AFUE)", package: "Bronze", price: "$13,500–$17,000 installed", keywords: ["furnace", "heating", "ac", "air conditioning", "replacement", "installation"] },
  { category: "installation", name: "Furnace & AC (90%+ AFUE)", package: "Silver", price: "$14,200–$18,000 installed", keywords: ["furnace", "heating", "ac", "air conditioning", "replacement", "installation"] },
  { category: "installation", name: "Furnace & AC (90%+ AFUE)", package: "Gold", price: "$18,000–$25,000 installed", keywords: ["furnace", "heating", "ac", "air conditioning", "replacement", "installation"] },
  { category: "installation", name: "Ductless Mini-Split", package: "Bronze", price: "$7,000–$9,000 installed", keywords: ["mini split", "ductless", "replacement", "installation"] },
  { category: "installation", name: "Ductless Mini-Split", package: "Silver", price: "$8,200–$9,500 installed", keywords: ["mini split", "ductless", "replacement", "installation"] },
  { category: "installation", name: "Ductless Mini-Split", package: "Gold", price: "$9,000–$13,000 installed", keywords: ["mini split", "ductless", "replacement", "installation"] },
  { category: "installation", name: "Boiler (standard gas)", package: "All packages", price: "$9,000–$12,000 installed", keywords: ["boiler", "gas boiler", "heating", "replacement", "installation"] },
  { category: "installation", name: "Boiler (high-efficiency combo)", package: "All packages", price: "$12,000–$20,000 installed", keywords: ["boiler", "high efficiency", "heating", "replacement", "installation"] },
  { category: "installation", name: "Additional ductless indoor head", price: "$900–$2,000 installed per head", keywords: ["mini split", "ductless", "indoor head", "zone", "installation"] },

  { category: "standard_repair", name: "Blower Motor – ECM", price: "$875–$1,900", keywords: ["furnace", "heating", "blower", "airflow", "motor", "ecm"] },
  { category: "standard_repair", name: "Blower Motor – PSC", price: "$600–$1,200", keywords: ["furnace", "heating", "blower", "airflow", "motor", "psc"] },
  { category: "standard_repair", name: "Blower Wheel", price: "$175–$350", keywords: ["furnace", "heating", "blower", "airflow", "wheel"] },
  { category: "standard_repair", name: "Condenser Fan Motor", price: "$600–$1,100", keywords: ["ac", "air conditioning", "cooling", "condenser", "fan", "motor"] },
  { category: "standard_repair", name: "Inducer Draft Motor", price: "$700–$1,500", keywords: ["furnace", "heating", "inducer", "draft", "motor"] },
  { category: "standard_repair", name: "Compressor Replacement", price: "$2,500–$4,000", keywords: ["ac", "air conditioning", "cooling", "compressor"] },
  { category: "standard_repair", name: "Contactor Replacement", price: "$370–$475", keywords: ["ac", "electrical", "contactor", "switch"] },
  { category: "standard_repair", name: "Dual Run Capacitor", price: "$320–$370", keywords: ["ac", "electrical", "capacitor", "dual run"] },
  { category: "standard_repair", name: "Single Run Capacitor", price: "$225–$300", keywords: ["ac", "electrical", "capacitor", "single run"] },
  { category: "standard_repair", name: "Flame Sensor", price: "$300–$350", keywords: ["furnace", "heating", "flame", "sensor", "ignition"] },
  { category: "standard_repair", name: "Furnace Control Board", price: "$725–$1,500", keywords: ["furnace", "heating", "control board", "circuit board", "electrical"] },
  { category: "standard_repair", name: "Heating Element / Heat Strip", price: "$400–$1,000", keywords: ["furnace", "heating", "heat strip", "heating element"] },
  { category: "standard_repair", name: "Hot Surface Ignitor", price: "$370–$575", keywords: ["furnace", "heating", "ignitor", "igniter", "ignition"] },
  { category: "standard_repair", name: "Limit Switch / Rollout Switch", price: "$225–$300", keywords: ["furnace", "heating", "limit switch", "rollout switch", "safety switch"] },
  { category: "standard_repair", name: "Pressure Switch", price: "$375–$600", keywords: ["furnace", "heating", "pressure switch"] },
  { category: "standard_repair", name: "Safety Float Switch", price: "$325–$400", keywords: ["ac", "air conditioning", "drain", "float switch", "safety"] },
  { category: "standard_repair", name: "Thermostat", price: "$425–$800", keywords: ["furnace", "heating", "ac", "air conditioning", "thermostat", "controls"] },
  { category: "standard_repair", name: "Media Filter Replacement", price: "$50–$60", keywords: ["filter", "media filter", "airflow", "indoor air quality"] },
  { category: "standard_repair", name: "Pull & Clean Evaporator Coil", price: "$2,000–$3,000", keywords: ["ac", "air conditioning", "evaporator coil", "coil cleaning"] },

  { category: "mini_split_repair", name: "Indoor Coil Cleaning", price: "$175–$325", keywords: ["mini split", "ductless", "indoor", "coil", "cleaning"] },
  { category: "mini_split_repair", name: "Outdoor Coil Cleaning", price: "$275–$425", keywords: ["mini split", "ductless", "outdoor", "coil", "cleaning"] },
  { category: "mini_split_repair", name: "Line Set Replacement", price: "$600–$1,500", keywords: ["mini split", "ductless", "line set", "refrigerant line"] },
  { category: "mini_split_repair", name: "Main Control Board", price: "$725–$1,600", keywords: ["mini split", "ductless", "control board", "electrical"] },
  { category: "mini_split_repair", name: "Nitrogen Leak Search", price: "$400–$600", keywords: ["mini split", "ductless", "leak", "nitrogen", "refrigerant"] },
  { category: "mini_split_repair", name: "Outdoor Fan Blade", price: "$300–$600", keywords: ["mini split", "ductless", "outdoor", "fan blade", "fan"] },
  { category: "mini_split_repair", name: "Outdoor Fan Motor", price: "$600–$1,100", keywords: ["mini split", "ductless", "outdoor", "fan motor", "fan"] },
  { category: "mini_split_repair", name: "Refrigerant Leak Repair", price: "$800–$1,600", keywords: ["mini split", "ductless", "refrigerant", "leak"] },
  { category: "mini_split_repair", name: "Refrigerant Recharge", price: "$500–$1,100", keywords: ["mini split", "ductless", "refrigerant", "recharge", "freon"] },
  { category: "mini_split_repair", name: "Remote / IR Receiver", price: "Call for pricing", keywords: ["mini split", "ductless", "remote", "ir receiver", "infrared"] },
  { category: "mini_split_repair", name: "Reversing Valve", price: "$2,500–$4,500", keywords: ["mini split", "ductless", "reversing valve", "heat pump"] },
  { category: "mini_split_repair", name: "Thermistor Replacement", price: "$200–$400", keywords: ["mini split", "ductless", "thermistor", "sensor"] },
];

export const bookingOptions = {
  service_call: {
    title: "Service Call",
    url: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ33Isw-seIZc3r_3XyZRYWoxgHHBc51VZQg_7XKuuE-P-OrJGZvsraGrPy7_N1SzlaIyLbOZYpM",
    eligibility: "For a repair or service visit.",
  },
  new_unit_estimate: {
    title: "Free Estimate (New Units Only)",
    url: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1lrCy4LzEhXIwZ9bVS6EuVdpYn331k7CQxooP1qHKe_4hkXtqdREw_eLlvZElm5EqZEezwj2XT",
    eligibility: "The website specifies this free-estimate booking link is for new units only.",
  },
  care_club_maintenance: {
    title: "Davis Comfort Elite / Total Home Care Club",
    url: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3KhX_ztbIVRtgSjz4bCvYqCZAxMEIpo3QiqdUZo_bVflNtbOqWnLFpdflufhzcm_FwAVZpdwOx",
    eligibility: "For Davis Comfort Elite / Total Home Care Club members.",
  },
  non_member_maintenance: {
    title: "Maintenance (Non-Elite / Total Home Care Club Members)",
    url: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ18XUfkhMxemLgKBjvPN5Bj7spII8gdJ6ATF6ci2eT6U4a6voIBSC4tsEijMRO2F3wt3o4bi4cx",
    eligibility: "For maintenance customers who are not Elite / Total Home Care Club members.",
  },
} as const;

export const informationPages = [
  { title: "Heating services", summary: "Davis Heating & Air heating service information.", url: sourceUrls.heating, keywords: ["furnace", "heating", "heat", "heater", "repair", "maintenance"] },
  { title: "Air conditioning", summary: "Davis Heating & Air cooling and air-conditioning information.", url: sourceUrls.cooling, keywords: ["ac", "air conditioning", "air conditioner", "cooling", "repair", "maintenance"] },
  { title: "Boilers", summary: "Davis Heating & Air boiler service information.", url: sourceUrls.boilers, keywords: ["boiler", "gas boiler", "heating", "repair", "maintenance"] },
  { title: "Indoor air quality", summary: "Davis Heating & Air indoor-air-quality services.", url: sourceUrls.indoorAirQuality, keywords: ["air quality", "purification", "filter", "indoor air"] },
  { title: "Commercial HVAC", summary: "Davis Heating & Air commercial HVAC services.", url: sourceUrls.commercial, keywords: ["commercial", "business", "hvac"] },
  { title: "Published pricing", summary: "Current public installation and repair price ranges.", url: sourceUrls.pricing, keywords: ["price", "pricing", "cost", "repair", "replacement", "installation", "estimate"] },
  { title: "Service areas", summary: "Davis Heating & Air service-area information.", url: sourceUrls.serviceAreas, keywords: ["area", "town", "city", "zip", "coverage", "service area"] },
  { title: "Schedule service", summary: "Choose the booking route for service, a new-unit estimate, or maintenance.", url: sourceUrls.schedule, keywords: ["schedule", "book", "appointment", "service call", "estimate", "maintenance"] },
  { title: "Contact Davis Heating & Air", summary: "Contact details and ways to reach Davis Heating & Air.", url: sourceUrls.contact, keywords: ["contact", "phone", "call", "hours", "address"] },
] as const;

export function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/\bnj\b/g, " ")
    .replace(/\btownship\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function findServiceArea(location: string) {
  const normalizedLocation = normalize(location);
  const match = serviceAreas.find((area) =>
    area.aliases.some((alias) => normalizedLocation.includes(normalize(alias))),
  );

  if (match) {
    return {
      status: "listed" as const,
      location: match.city,
      message: `${match.city} is listed among Davis Heating & Air service areas. Confirm service availability for the specific equipment and job when booking.`,
      sourceUrl: match.url,
      serviceAreasUrl: sourceUrls.serviceAreas,
      lastVerified: verifiedAt,
    };
  }

  return {
    status: "confirm_with_davis" as const,
    message:
      "This location is not individually named in the published service-area list. The site also says Davis serves surrounding areas, so contact Davis to confirm rather than treating this as out of area.",
    contactUrl: business.contactUrl,
    sourceUrl: sourceUrls.serviceAreas,
    lastVerified: verifiedAt,
  };
}

const ignoredTerms = new Set(["a", "an", "and", "for", "how", "is", "it", "me", "much", "of", "price", "pricing", "repair", "repairs", "service", "the", "what", "cost", "quote"]);

export function searchPrices(query: string) {
  const normalizedQuery = normalize(query);
  const queryTokens = normalizedQuery.split(" ").filter((token) => token.length > 1 && !ignoredTerms.has(token));
  const asksRepair = /\b(repair|repairs|fix|broken|not working)\b/i.test(query);
  const asksInstallation = /\b(install|installation|replace|replacement|new system|new unit)\b/i.test(query);
  const asksMiniSplit = /mini[ -]?split|ductless/i.test(query);

  let candidates = priceItems;
  if (asksRepair) candidates = candidates.filter((item) => item.category !== "installation");
  if (asksInstallation) candidates = candidates.filter((item) => item.category === "installation");
  if (asksMiniSplit) candidates = candidates.filter((item) => item.name.toLowerCase().includes("mini") || item.name.toLowerCase().includes("ductless") || item.category === "mini_split_repair");

  const scored = candidates
    .map((item) => {
      const searchable = normalize(`${item.name} ${item.package ?? ""} ${item.keywords.join(" ")}`);
      let score = 0;
      for (const keyword of item.keywords) {
        if (normalizedQuery.includes(normalize(keyword))) score += normalize(keyword).includes(" ") ? 3 : 2;
      }
      for (const token of queryTokens) {
        if (searchable.split(" ").includes(token)) score += 1;
      }
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0 && asksRepair) {
    const fallback = candidates.filter((item) => item.category !== "installation").slice(0, 12);
    return {
      query,
      matches: fallback,
      message: "No specific part matched the query. These are examples of repair items with published prices; they are not a diagnosis or quote.",
      truncated: fallback.length < candidates.length,
    };
  }

  const matches = scored.slice(0, 12).map(({ item }) => item);
  return {
    query,
    matches,
    message:
      matches.length > 0
        ? "These are published price ranges for the named items, not a diagnosis or a quote for the customer's system. Davis says the final price depends on home size, system count, access, and project scope."
        : "No matching item was found in the published price list. Refer to the pricing page or contact Davis for a tailored quote.",
    truncated: scored.length > matches.length,
  };
}
