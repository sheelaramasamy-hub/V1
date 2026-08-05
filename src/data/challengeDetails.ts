import type { ChallengeDetail } from "../types/trackDetail";

const HIAD_PROCESS: ChallengeDetail["processSteps"] = [
  { title: "Register", description: "Create your participant profile." },
  { title: "Build", description: "Develop inside an isolated Azure environment." },
  { title: "Win", description: "Earn XP, badges, and recognition." },
];

const HTS_PROCESS: ChallengeDetail["processSteps"] = [
  { title: "Register", description: "Create your participant profile and pick a track." },
  { title: "Progress", description: "Clear milestones at your own pace inside the sandbox." },
  { title: "Certify", description: "Earn XP, badges, and a completion credential." },
];

const HTB_PROCESS: ChallengeDetail["processSteps"] = [
  { title: "Team up", description: "Form or get matched into a team of 3-5." },
  { title: "Build", description: "Design and ship a working solution across the event." },
  { title: "Present", description: "Demo to a judging panel for recognition and prizes." },
];

/**
 * Track detail content, keyed by catalogue challenge id.
 *
 * `multi-agent-rfp` is authored to match the reference detail page exactly. The rest carry
 * shorter, real content in the same shape — enough that every catalogue card links to a working
 * page, without pretending every event has been fleshed out to the same depth.
 */
export const CHALLENGE_DETAILS: Record<string, ChallengeDetail> = {
  "multi-agent-rfp": {
    code: "FY27-C1-H01",
    scenarioQuote:
      "Adventure Works Retail, Bid Manager: “We lose deals on turnaround, not on price. A response takes eleven days and four people, and half of that is one person waiting on another to draft a section.”",
    scenarioBody: [
      "A single prompt cannot write a good RFP response. In one guided session you will build a crew of agents with distinct jobs — researcher, drafter, pricing analyst, critic — using Azure AI Foundry and AutoGen, and watch the critic loop measurably improve the output.",
      "Participants work through this real-world scenario inside an isolated Azure sandbox. The Hackable scoring engine validates each checkpoint automatically — no manual grading required for standard milestones.",
    ],
    intendedAudience:
      "Developers comfortable with Python who want a working multi-agent pattern rather than a demo. Individual event.",
    prerequisites: ["Python basics", "An Azure OpenAI deployment"],
    techTags: ["AI Foundry", "AutoGen", "Azure OpenAI"],
    deliverables: ["Measure the lift", "Catch hallucinations"],
    prizes: ["Completion badge", "Sample repository to reuse in client work"],
    tracks: [
      {
        id: "roles-and-orchestration",
        index: 1,
        title: "Build the crew",
        subtitle: "Roles and orchestration",
        description:
          "Stand up four agents with distinct jobs and wire the hand-offs between them into one AutoGen conversation.",
        milestones: [
          { id: "set-up-workspace", title: "Set up the workspace", estimateMinutes: 30, xp: 150 },
          { id: "define-four-agents", title: "Define four agents", estimateMinutes: 60, xp: 200 },
          { id: "wire-the-conversation", title: "Wire the conversation", estimateMinutes: 60, xp: 200 },
          { id: "add-the-critic-loop", title: "Add the critic loop", estimateMinutes: 45, xp: 200 },
          { id: "measure-the-lift", title: "Measure the lift", estimateMinutes: 45, xp: 250 },
        ],
      },
      {
        id: "ground-it-in-truth",
        index: 2,
        title: "Ground it in truth",
        subtitle: "Retrieval and pricing",
        description: "Stop the crew inventing capabilities and prices you do not have.",
        milestones: [
          { id: "index-your-collateral", title: "Index your collateral", estimateMinutes: 60, xp: 200 },
          { id: "ground-the-drafter", title: "Ground the drafter", estimateMinutes: 60, xp: 200 },
          { id: "constrain-the-pricing", title: "Constrain the pricing", estimateMinutes: 45, xp: 200 },
          { id: "re-run-the-critic-loop", title: "Re-run the critic loop", estimateMinutes: 45, xp: 200 },
        ],
      },
    ],
    processTitle: "How Hackable Runs This Event",
    processDescription: "Hack in a Day — a single guided session — scope, build, and demo in about four hours.",
    processSteps: HIAD_PROCESS,
    relatedIds: ["meeting-to-action", "agent-maker-league", "retail-copilot-experience"],
  },

  "meeting-to-action": {
    code: "FY27-C1-H02",
    scenarioQuote:
      "Contoso Consulting, Engagement Lead: “Every meeting produces three follow-ups and none of them land in a system anyone checks.”",
    scenarioBody: [
      "Build an agent that listens to a meeting transcript, extracts commitments with owners and dates, and files them straight into the team's task tracker — no copy-paste, no dropped actions.",
    ],
    prerequisites: ["Comfort with prompt engineering basics"],
    techTags: ["Azure AI Foundry", "Microsoft Graph"],
    deliverables: ["A working transcript-to-task pipeline"],
    prizes: ["Completion badge"],
    tracks: [
      {
        id: "capture-and-file",
        index: 1,
        title: "Capture and file",
        subtitle: "Extraction and routing",
        description: "Turn a raw transcript into filed, owned action items.",
        milestones: [
          { id: "parse-the-transcript", title: "Parse the transcript", estimateMinutes: 30, xp: 150 },
          { id: "extract-commitments", title: "Extract commitments", estimateMinutes: 45, xp: 200 },
          { id: "route-to-tracker", title: "Route to the tracker", estimateMinutes: 45, xp: 200 },
        ],
      },
    ],
    processTitle: "How Hackable Runs This Event",
    processDescription: "Hack in a Day — a single guided session — scope, build, and demo in about four hours.",
    processSteps: HIAD_PROCESS,
    relatedIds: ["multi-agent-rfp", "agent-maker-league"],
  },

  "agent-maker-league": {
    code: "FY27-C1-H03",
    scenarioQuote:
      "Northwind Traders, IT Director: “Every team wants a Copilot Studio agent. Nobody agrees on what 'production-ready' means.”",
    scenarioBody: [
      "Five levels, one agent: start from a single-topic bot and work up to a governed, tool-calling agent ready to hand to a business team.",
    ],
    intendedAudience: "Makers new to Copilot Studio who want a structured path from prototype to production.",
    prerequisites: ["A Microsoft 365 developer tenant"],
    techTags: ["Copilot Studio", "Power Platform", "Dataverse"],
    deliverables: ["A five-level, production-ready agent"],
    prizes: ["Completion badge", "Leaderboard placement"],
    tracks: [
      {
        id: "five-level-path",
        index: 1,
        title: "Climb the five levels",
        subtitle: "Prototype to production",
        description: "Progress an agent through five graded levels of capability and governance.",
        milestones: [
          { id: "level-1-single-topic", title: "Level 1 — Single-topic bot", estimateMinutes: 45, xp: 150 },
          { id: "level-2-multi-topic", title: "Level 2 — Multi-topic routing", estimateMinutes: 60, xp: 200 },
          { id: "level-3-tool-calling", title: "Level 3 — Tool calling", estimateMinutes: 90, xp: 250 },
          { id: "level-4-dataverse", title: "Level 4 — Dataverse grounding", estimateMinutes: 90, xp: 250 },
          { id: "level-5-governance", title: "Level 5 — Governance and handoff", estimateMinutes: 75, xp: 300 },
        ],
      },
    ],
    processTitle: "How Hackable Runs This Event",
    processDescription: "Hack to Skill — progress through graded levels at your own pace across the event window.",
    processSteps: HTS_PROCESS,
    relatedIds: ["multi-agent-rfp", "meeting-to-action"],
  },

  "retail-copilot-experience": {
    code: "FY27-C1-H04",
    scenarioQuote:
      "Fabrikam Retail, Store Ops Lead: “Associates ask the same five questions a hundred times a shift. None of them have time to search a wiki.”",
    scenarioBody: [
      "Build a store-associate copilot grounded in product and policy data, tuned to answer in seconds on the shop floor.",
    ],
    prerequisites: ["Basic familiarity with Copilot Studio"],
    techTags: ["Copilot Studio", "Azure AI Search"],
    deliverables: ["A grounded store-associate copilot"],
    prizes: ["Completion badge"],
    tracks: [
      {
        id: "ground-and-ship",
        index: 1,
        title: "Ground and ship",
        subtitle: "Retrieval-grounded answers",
        description: "Connect a copilot to real product and policy data and ship a usable experience.",
        milestones: [
          { id: "index-product-catalog", title: "Index the product catalog", estimateMinutes: 45, xp: 150 },
          { id: "wire-grounded-answers", title: "Wire grounded answers", estimateMinutes: 60, xp: 200 },
          { id: "handle-escalations", title: "Handle escalations", estimateMinutes: 45, xp: 200 },
        ],
      },
    ],
    processTitle: "How Hackable Runs This Event",
    processDescription: "Hack in a Day — a single guided session — scope, build, and demo in about four hours.",
    processSteps: HIAD_PROCESS,
    relatedIds: ["multi-agent-rfp", "copilot-studio-agent-sprint"],
  },

  "copilot-studio-agent-sprint": {
    code: "FY27-C1-H05",
    scenarioQuote:
      "Contoso Manufacturing, Plant Manager: “Line technicians need a single place to ask about a fault code — not three portals.”",
    scenarioBody: [
      "Sprint an agent that answers fault-code and maintenance questions on the plant floor, grounded in equipment manuals.",
    ],
    prerequisites: ["A Microsoft 365 developer tenant"],
    techTags: ["Copilot Studio", "Azure AI Search"],
    deliverables: ["A manuals-grounded maintenance agent"],
    prizes: ["Completion badge"],
    tracks: [
      {
        id: "manuals-to-answers",
        index: 1,
        title: "Manuals to answers",
        subtitle: "Grounding and hand-off",
        description: "Turn a shelf of equipment manuals into an agent technicians actually use.",
        milestones: [
          { id: "index-the-manuals", title: "Index the manuals", estimateMinutes: 45, xp: 150 },
          { id: "wire-fault-code-lookup", title: "Wire fault-code lookup", estimateMinutes: 60, xp: 200 },
          { id: "add-technician-handoff", title: "Add technician hand-off", estimateMinutes: 45, xp: 200 },
        ],
      },
    ],
    processTitle: "How Hackable Runs This Event",
    processDescription: "Hack in a Day — a single guided session — scope, build, and demo in about five hours.",
    processSteps: HIAD_PROCESS,
    relatedIds: ["retail-copilot-experience", "multi-agent-rfp"],
  },

  "secure-data-estate-sprint": {
    code: "FY27-C1-H06",
    scenarioQuote:
      "Woodgrove Bank, CISO: “We cannot say with confidence where our sensitive data actually lives.”",
    scenarioBody: [
      "Sprint through Microsoft Purview to classify, label, and lock down a sensitive data estate in one guided session.",
    ],
    prerequisites: ["An Microsoft 365 E5 or Purview trial tenant"],
    techTags: ["Microsoft Purview", "Microsoft Entra"],
    deliverables: ["A classified and labelled data estate"],
    prizes: ["Completion badge"],
    tracks: [
      {
        id: "classify-and-protect",
        index: 1,
        title: "Classify and protect",
        subtitle: "Purview data governance",
        description: "Discover, classify, and apply protection to sensitive data at rest.",
        milestones: [
          { id: "run-data-discovery", title: "Run data discovery", estimateMinutes: 60, xp: 150 },
          { id: "apply-sensitivity-labels", title: "Apply sensitivity labels", estimateMinutes: 60, xp: 200 },
          { id: "enforce-access-policy", title: "Enforce access policy", estimateMinutes: 60, xp: 200 },
        ],
      },
    ],
    processTitle: "How Hackable Runs This Event",
    processDescription: "Hack in a Day — a single guided session — scope, build, and demo in about six hours.",
    processSteps: HIAD_PROCESS,
    relatedIds: ["zero-trust-security-build", "multi-agent-rfp"],
  },

  "power-platform-case-management": {
    code: "FY27-C1-S01",
    scenarioQuote:
      "Contoso Health Plan, Ops Manager: “Our case workers track everything in shared spreadsheets that go stale within a day.”",
    scenarioBody: [
      "Build a case-management app on Power Platform and Dataverse over the course of a week, progressing from a data model to a working, role-aware app.",
    ],
    intendedAudience: "Makers comfortable with Power Apps who want a structured, milestone-graded build.",
    prerequisites: ["A Power Platform developer environment"],
    techTags: ["Power Apps", "Dataverse", "Power Automate"],
    deliverables: ["A working case-management app"],
    prizes: ["Completion badge"],
    tracks: [
      {
        id: "case-app-build",
        index: 1,
        title: "Build the case app",
        subtitle: "Data model to working app",
        description: "Model cases in Dataverse and layer a role-aware app and automations on top.",
        milestones: [
          { id: "model-the-case-entity", title: "Model the case entity", estimateMinutes: 60, xp: 150 },
          { id: "build-the-intake-form", title: "Build the intake form", estimateMinutes: 90, xp: 200 },
          { id: "add-status-automation", title: "Add status automation", estimateMinutes: 90, xp: 200 },
          { id: "set-role-based-views", title: "Set role-based views", estimateMinutes: 60, xp: 200 },
        ],
      },
    ],
    processTitle: "How Hackable Runs This Event",
    processDescription: "Hack to Skill — progress through graded milestones at your own pace across the week.",
    processSteps: HTS_PROCESS,
    relatedIds: ["healthcare-agent-workflow-sprint", "multi-agent-rfp"],
  },

  "healthcare-agent-workflow-sprint": {
    code: "FY27-C1-S02",
    scenarioQuote:
      "Fabrikam Health, Clinic Director: “Intake takes fifteen minutes of a nurse's time before a patient is even seen.”",
    scenarioBody: [
      "Build an intake-assistant agent workflow over the course of a week, from a scoped conversation flow to a clinician hand-off that actually saves time.",
    ],
    intendedAudience: "Developers building healthcare-adjacent copilots for the first time.",
    prerequisites: ["An Azure OpenAI deployment"],
    techTags: ["Azure AI Foundry", "Microsoft Copilot Studio"],
    deliverables: ["A working intake-assistant workflow"],
    prizes: ["Completion badge"],
    tracks: [
      {
        id: "intake-workflow",
        index: 1,
        title: "Build the intake flow",
        subtitle: "Conversation to hand-off",
        description: "Design a scoped intake conversation and hand structured data to the clinician's system.",
        milestones: [
          { id: "scope-the-intake-flow", title: "Scope the intake flow", estimateMinutes: 60, xp: 150 },
          { id: "build-the-conversation", title: "Build the conversation", estimateMinutes: 90, xp: 200 },
          { id: "structure-the-handoff", title: "Structure the hand-off", estimateMinutes: 60, xp: 200 },
        ],
      },
    ],
    processTitle: "How Hackable Runs This Event",
    processDescription: "Hack to Skill — progress through graded milestones at your own pace across the week.",
    processSteps: HTS_PROCESS,
    relatedIds: ["power-platform-case-management", "multi-agent-rfp"],
  },

  "azure-landing-zone-challenge": {
    code: "FY27-C1-S03",
    scenarioQuote:
      "Contoso Global, Cloud Architect: “Every subscription we spin up drifts from the last one within a month.”",
    scenarioBody: [
      "Stand up a governed Azure landing zone over the course of a week — network topology, policy, and identity, built to a repeatable pattern.",
    ],
    prerequisites: ["An Azure subscription with Owner access"],
    techTags: ["Azure Policy", "Azure Virtual Network", "Microsoft Entra"],
    deliverables: ["A governed, repeatable landing zone"],
    prizes: ["Completion badge"],
    tracks: [
      {
        id: "landing-zone-build",
        index: 1,
        title: "Stand up the landing zone",
        subtitle: "Network, policy, identity",
        description: "Build the three pillars of a governed landing zone as a repeatable pattern.",
        milestones: [
          { id: "design-network-topology", title: "Design the network topology", estimateMinutes: 90, xp: 200 },
          { id: "apply-governance-policy", title: "Apply governance policy", estimateMinutes: 90, xp: 200 },
          { id: "configure-identity-boundaries", title: "Configure identity boundaries", estimateMinutes: 60, xp: 200 },
        ],
      },
    ],
    processTitle: "How Hackable Runs This Event",
    processDescription: "Hack to Skill — progress through graded milestones at your own pace across the week.",
    processSteps: HTS_PROCESS,
    relatedIds: ["secure-data-estate-sprint", "fabric-analytics-foundations-build"],
  },

  "fabric-analytics-foundations-build": {
    code: "FY27-C1-B01",
    scenarioQuote:
      "Fabrikam Retail, VP Analytics: “We have five reporting tools and no team trusts a single number from any of them.”",
    scenarioBody: [
      "Over six weeks, a team designs and ships a unified analytics foundation on Microsoft Fabric — a single source of truth from ingestion to a governed semantic model.",
    ],
    intendedAudience: "Teams of 3-5 with at least one member comfortable with data modelling.",
    prerequisites: ["A Microsoft Fabric capacity or trial"],
    techTags: ["Microsoft Fabric", "OneLake", "Power BI"],
    deliverables: ["A governed analytics foundation"],
    prizes: ["Judged recognition", "Sample repository to reuse in client work"],
    tracks: [
      {
        id: "fabric-foundation-build",
        index: 1,
        title: "Ship the foundation",
        subtitle: "Ingestion to semantic model",
        description: "Take retail data from raw ingestion through to a governed, reportable semantic model.",
        milestones: [
          { id: "design-the-lakehouse", title: "Design the lakehouse", estimateMinutes: 120, xp: 250 },
          { id: "build-ingestion-pipelines", title: "Build ingestion pipelines", estimateMinutes: 180, xp: 300 },
          { id: "model-the-semantic-layer", title: "Model the semantic layer", estimateMinutes: 180, xp: 300 },
          { id: "publish-governed-reports", title: "Publish governed reports", estimateMinutes: 120, xp: 250 },
        ],
      },
    ],
    processTitle: "How Hackable Runs This Event",
    processDescription: "Hack to Build — a team ships a working solution across the six-week event.",
    processSteps: HTB_PROCESS,
    relatedIds: ["sustainability-data-studio", "azure-landing-zone-challenge"],
  },

  "zero-trust-security-build": {
    code: "FY27-C1-B02",
    scenarioQuote:
      "Woodgrove Bank, Head of Security Engineering: “We trust the network perimeter. We should trust nothing.”",
    scenarioBody: [
      "Over five weeks, a team designs and ships a Zero Trust reference architecture — identity, device, and network controls that assume breach.",
    ],
    intendedAudience: "Teams of 3-5 with security engineering experience.",
    prerequisites: ["An Azure subscription with Owner access", "A Microsoft Entra ID P2 tenant"],
    techTags: ["Microsoft Entra", "Microsoft Defender", "Azure Firewall"],
    deliverables: ["A Zero Trust reference architecture"],
    prizes: ["Judged recognition"],
    tracks: [
      {
        id: "zero-trust-build",
        index: 1,
        title: "Ship the reference architecture",
        subtitle: "Identity, device, network",
        description: "Layer conditional access, device compliance, and micro-segmentation into one architecture.",
        milestones: [
          { id: "design-conditional-access", title: "Design conditional access", estimateMinutes: 120, xp: 250 },
          { id: "enforce-device-compliance", title: "Enforce device compliance", estimateMinutes: 120, xp: 250 },
          { id: "segment-the-network", title: "Segment the network", estimateMinutes: 150, xp: 300 },
        ],
      },
    ],
    processTitle: "How Hackable Runs This Event",
    processDescription: "Hack to Build — a team ships a working solution across the five-week event.",
    processSteps: HTB_PROCESS,
    relatedIds: ["secure-data-estate-sprint", "fabric-analytics-foundations-build"],
  },

  "sustainability-data-studio": {
    code: "FY27-C1-B03",
    scenarioQuote:
      "Contoso Manufacturing, Sustainability Lead: “We report emissions once a quarter, from data that is already stale by the time it is published.”",
    scenarioBody: [
      "Over five weeks, a team builds a sustainability data studio on Fabric — near-real-time emissions tracking from plant sensors to an executive dashboard.",
    ],
    intendedAudience: "Teams of 3-5 with at least one member comfortable with data engineering.",
    prerequisites: ["A Microsoft Fabric capacity or trial"],
    techTags: ["Microsoft Fabric", "Azure IoT", "Power BI"],
    deliverables: ["A near-real-time emissions dashboard"],
    prizes: ["Judged recognition"],
    tracks: [
      {
        id: "sustainability-studio-build",
        index: 1,
        title: "Build the studio",
        subtitle: "Sensor data to dashboard",
        description: "Stream plant sensor data into Fabric and surface it as a live sustainability dashboard.",
        milestones: [
          { id: "stream-sensor-data", title: "Stream sensor data", estimateMinutes: 150, xp: 250 },
          { id: "compute-emissions-metrics", title: "Compute emissions metrics", estimateMinutes: 150, xp: 300 },
          { id: "publish-the-dashboard", title: "Publish the dashboard", estimateMinutes: 120, xp: 250 },
        ],
      },
    ],
    processTitle: "How Hackable Runs This Event",
    processDescription: "Hack to Build — a team ships a working solution across the five-week event.",
    processSteps: HTB_PROCESS,
    relatedIds: ["fabric-analytics-foundations-build", "zero-trust-security-build"],
  },
};
