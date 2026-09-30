export default function HomePage() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", margin: "3rem auto", maxWidth: 760, padding: "0 1.25rem", lineHeight: 1.6 }}>
      <p style={{ color: "#555", fontSize: ".9rem", letterSpacing: ".08em", textTransform: "uppercase" }}>South Jersey HVAC information</p>
      <h1>Davis Heating &amp; Air MCP server</h1>
      <p>This experimental, read-only MCP server helps compatible AI assistants find public Davis Heating &amp; Air information and the company’s existing appointment links.</p>
      <h2>What an assistant can look up</h2>
      <ul>
        <li>Davis’s listed service areas and whether a town is explicitly named</li>
        <li>Published installation and repair price ranges</li>
        <li>Heating, cooling, boiler, indoor air quality, and commercial HVAC pages</li>
        <li>Existing service call, new-unit estimate, and maintenance booking links</li>
      </ul>
      <h2>Connect</h2>
      <p>For an MCP-compatible AI assistant, use this server URL:</p>
      <p><code>https://davis-heating-air-mcp.vercel.app/api/mcp</code></p>
      <p>This is an MCP API endpoint, not a webpage. Opening it in a browser sends a regular web request and may show “Method not allowed.” Copy the URL into an MCP-compatible assistant’s remote-server connection settings instead.</p>
      <p>Service-area matches and prices include links to Davis’s public website. Booking links open Davis’s Google Calendar scheduler; this server does not collect customer information or create appointments.</p>
      <h2>Sources</h2>
      <ul>
        <li><a href="https://davisheatingair.com/service-areas/">Davis service areas</a></li>
        <li><a href="https://davisheatingair.com/about-us/pricing/">Davis published pricing</a></li>
        <li><a href="https://davisheatingair.com/schedule-service/">Davis scheduling options</a></li>
        <li><a href="https://davisheatingair.com/">Davis Heating &amp; Air website</a></li>
      </ul>
      <p style={{ color: "#555", fontSize: ".9rem" }}>Prototype using publicly available website information. Verify business details with Davis before relying on them.</p>
    </main>
  );
}
