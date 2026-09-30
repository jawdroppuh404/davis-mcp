# Davis Heating & Air MCP server

A Vercel-ready, read-only MCP server backed by public Davis Heating & Air website information. It exposes service-area lookup, published pricing search, business details, official page search, and the existing Google Calendar booking links.

**Live MCP URL:** <https://davis-heating-air-mcp.vercel.app/api/mcp>  
**Landing page:** <https://davis-heating-air-mcp.vercel.app>

## Scope and safety

- No customer information is collected. Service-area lookup accepts a city, town, or ZIP code only; it rejects street-address-like inputs. Only a city or town explicitly listed by Davis is confirmed; ZIP codes are unconfirmed because Davis publishes no ZIP-level coverage map.
- No appointments are created, changed, or canceled.
- No Google Calendar API credentials, CRM credentials, or database are required.
- Prices are published ranges, not diagnoses or quotes. The tools return the site's caveat and pricing-page link.
- Only cities explicitly listed on the website are reported as listed. Unlisted locations are marked for confirmation because the site also says “and surrounding areas.”
- Booking tools return public calendar links for the customer to complete.

The source facts and current booking URLs were reviewed on **2026-09-23**. This public prototype uses information from Davis's website; have Davis verify the details before treating it as an official customer integration. Recent site/search renderings showed different phone numbers, so this build links to Davis's contact page instead of hard-coding a number.

## Tools

| Tool | Purpose |
| --- | --- |
| `get_davis_business_info` | Contact details, location, hours, emergency service, and service types |
| `check_davis_service_area` | Check a named city/town or report an unlisted location as unconfirmed |
| `list_davis_service_areas` | Return the currently listed towns |
| `search_davis_pricing` | Search published installation and repair ranges |
| `get_davis_booking_options` | Return the correct public Google Calendar booking link |
| `search_davis_information` | Find matching official Davis website pages |

## Local development

Requires Node.js 20.9 or later.

```sh
npm install
npm run dev
```

The MCP endpoint is `http://localhost:3000/api/mcp`. The health endpoint is `http://localhost:3000/api/health`.

Opening the MCP URL directly in a browser is not a connection test: a browser navigation sends a regular GET request. Configure the URL in an MCP-compatible client, which performs the MCP initialization handshake.

## Interaction tracking

Each completed or failed MCP tool call writes one structured Vercel runtime log with the tool name, UTC day, success/error status, and duration. Search and list tools also record the number of matched/listed items; service-area checks record only the coarse coverage outcome; booking lookups record the booking type. The logs do not include query text, tool arguments, returned content, customer identity, or a final answer written by the AI assistant.

To view them, open the Vercel project’s **Logs** page and search for `mcp_tool_call`; group or export by `day_utc` and `tool` for daily counts while the log entries are retained. Vercel also records the underlying HTTP function invocations, which include MCP setup/discovery requests and browser requests, so those totals are not the same as tool-call counts. This project is currently on the Hobby plan, where runtime logs are retained for one hour. This implementation does not save events to a separate database or produce a long-term analytics chart. Persistent daily totals would require a durable event store or a Vercel plan that supports custom analytics events.

## Vercel deployment

- Vercel project: `davis-heating-air-mcp` (personal Vercel team).
- Production deployment is ready at <https://davis-heating-air-mcp.vercel.app>.
- The custom Davis domain is not connected. If Davis approves, a subdomain such as `mcp.davisheatingair.com` can later be mapped to the project; the MCP URL would then be `https://mcp.davisheatingair.com/api/mcp`.
- This deployment was made from the Vercel CLI. Git-based automatic deployments are not configured; run `vercel --prod` from this directory to publish later changes.
- The server is not yet submitted to an MCP directory. The official MCP Registry supports remote Streamable HTTP servers, but publishing requires a verified namespace and an authorized publisher account. Directory registration can improve discovery in clients that consume the registry; it cannot make every personal agent automatically select the server.

## Before official customer use

- Have Davis verify the address, hours, city list, each price range, and each booking link.
- Decide who owns updates when website facts change. Prices and booking URLs should be reviewed regularly.
- Configure Vercel deployment protection for previews. For the public endpoint, add appropriate rate limits and monitor errors and availability.
- The application does not write tool inputs to a database or log them. Configure Vercel log access and retention deliberately; do not add request-body logging.
- Exercise examples such as “furnace repair in Cherry Hill,” an unlisted town, a new-unit estimate, and member versus non-member maintenance with an MCP client before directory submission.

## Later integrations

Callback requests need a Davis-approved CRM or dispatch destination, data-retention and consent language, and abuse controls. Direct booking needs a confirmed supported booking interface and verified scheduling/dispatch rules. Neither integration is included here.
