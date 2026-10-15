// Portfolio content based on the supplied résumé, screenshots, self-report and public GitHub repositories.
// Example endpoints, diagrams and suggested improvements are explicitly marked as illustrative.
export type CaseStudySection = { id: string; title: string; paragraphs: string[]; points: string[]; code: string; note: string };
export type Project = { slug: string; title: string; subtitle: string; group: string; year: string; summary: string; theme: string; technologies: string[]; flow: string[]; verified: string[]; caveat: string; sections: CaseStudySection[]; questions: {q: string; a: string}[]; repo?: string | null; live?: string | null };
export const projects: Project[] = [
  {
    "slug": "poweriq-ai",
    "title": "PowerIQ-AI",
    "subtitle": "Industrial energy intelligence, from raw telemetry to decisions",
    "group": "Featured / Industrial IoT",
    "year": "2025",
    "summary": "An industrial energy monitoring backend that turns device telemetry into power, consumption, cost and health insights for operations teams.",
    "theme": "lime",
    "technologies": [
      "Python",
      "FastAPI",
      "REST APIs",
      "Industrial IoT",
      "Time-series analytics",
      "Energy KPIs"
    ],
    "flow": [
      "Industrial meters & sensors",
      "Ingestion / validation",
      "KPI processing",
      "Alert evaluation",
      "REST APIs",
      "Operations dashboard"
    ],
    "verified": [
      "Designed modular FastAPI services for industrial sensor telemetry, energy KPIs and versioned REST endpoints.",
      "Implemented threshold-based alerting and device-health APIs covering electrical parameters, solar utilisation and demand patterns."
    ],
    "caveat": "The résumé establishes the FastAPI backend work. The architecture illustration, field names and API samples are representative, not exports of a private production system.",
    "sections": [
      {
        "id": "problem-and-operational-context",
        "title": "Problem and operational context",
        "paragraphs": [
          "A factory can have dozens of meters and energy sources that produce readings at different frequencies. Individual readings are not inherently useful to a plant engineer: they need a coherent answer to what changed, where consumption increased, which devices are unhealthy, and whether a demand or power-quality threshold has been crossed.",
          "PowerIQ-AI was framed as an operational intelligence layer rather than another raw-data table. The platform creates a path from a timestamped device observation to an interpretable metric and, where appropriate, a timely alert. The central engineering challenge is preserving the relationship between device, time window, measurement unit, and customer context.",
          "The intended audience includes facilities engineers, energy managers, and operations teams comparing devices, shifts, sites and historical periods."
        ],
        "points": [
          "Convert noisy, irregular sensor readings into consistent time-based signals.",
          "Surface energy consumption, cost forecasting and power-quality KPIs.",
          "Make alert decisions traceable back to their source measurements.",
          "Return understandable, bounded data via versioned APIs."
        ],
        "code": "",
        "note": ""
      },
      {
        "id": "ingestion-contract-and-validation",
        "title": "Ingestion contract and validation",
        "paragraphs": [
          "An ingestion service should accept a device identifier, observed timestamp, measurement name, value and unit. Device ownership is resolved from server-side identity rather than trusted from arbitrary client fields. If a meter reports power in kW and another reports W, a normalisation step converts both into a canonical unit before aggregation.",
          "Validation guards against negative cumulative energy, timestamps far into the future, impossible voltage ranges, missing device registration and duplicate retries. Failed validation should create an observable rejection rather than silently modifying a reading.",
          "A practical distinction is observed_at (when the device sampled) versus received_at (when the server got the data). That difference determines whether a late packet should correct a historical bucket or be treated as a real-time event."
        ],
        "points": [],
        "code": "// Illustrative telemetry event; not a production payload\n{\n  \"deviceId\": \"meter-028\",\n  \"observedAt\": \"2025-09-14T10:15:00Z\",\n  \"measurements\": {\"activePowerKw\": 18.6, \"voltageV\": 231.5, \"energyKwh\": 4288.7},\n  \"quality\": \"measured\"\n}",
        "note": "This is an example schema to explain the design, not a claim that these exact field names were deployed."
      },
      {
        "id": "calculating-meaningful-kpis",
        "title": "Calculating meaningful KPIs",
        "paragraphs": [
          "Cumulative meter readings become interval energy by subtracting two valid consecutive readings: ΔE = E(t₂) − E(t₁). To calculate average power over a time interval, divide interval energy by elapsed hours. When inputs are instantaneous power samples instead, consumption needs numerical integration or a time-weighted approximation; adding raw kW values is not energy.",
          "Cost projection depends on the tariff model. A simple educational model multiplies interval kWh by a rate, but a real industrial tariff may include time-of-use periods, demand charges, reactive penalties and taxes. The API contract should expose which assumptions went into each metric so a forecast is not confused with an invoice.",
          "Power quality is richer than a single voltage reading. Monitoring can include phase imbalance, power factor, frequency and excursions relative to defined acceptable ranges. A KPI layer should carry both values and calculation metadata."
        ],
        "points": [
          "Energy delta: ΔkWh = final cumulative kWh − initial cumulative kWh.",
          "Instantaneous three-phase power requires voltage, current and power factor with the appropriate connection assumptions.",
          "Demand peaks are computed over contractual aggregation windows, not simply the highest raw sample.",
          "Missing observations should produce an explicit data-quality indicator rather than fabricated zero usage."
        ],
        "code": "",
        "note": ""
      },
      {
        "id": "alerting-and-device-health",
        "title": "Alerting and device health",
        "paragraphs": [
          "Threshold checks are straightforward only until a device oscillates around the limit. Without hysteresis, debounce periods and deduplication, a fluctuating meter can create dozens of alerts. A more resilient state model moves an alert through normal → pending → active → resolved and stores why each transition happened.",
          "Device health must be separated from equipment health. A meter that has stopped reporting is not proof the underlying machine is off or malfunctioning. A stale-telemetry alert should say “no recent measurements” instead of reporting an electrical fault.",
          "The documented work includes threshold-based alerting and device-health APIs. The richer state machine here describes how those responsibilities can be designed robustly."
        ],
        "points": [
          "Evaluate device-specific thresholds and units.",
          "Apply consecutive-sample confirmation or a time window.",
          "Deduplicate the active incident by tenant, device, metric and rule.",
          "Record an audit trail for triggered, acknowledged and resolved states."
        ],
        "code": "",
        "note": ""
      },
      {
        "id": "api-and-dashboard-boundary",
        "title": "API and dashboard boundary",
        "paragraphs": [
          "REST endpoints form a clean contract between analytics services and the React or other dashboard layer. The dashboard should request server-computed summaries for a date window rather than download every raw reading and attempt heavy calculations in the browser.",
          "A route might return series data, device metadata, aggregates and quality flags separately. Pagination and a strict maximum time range protect the service from accidental full-history queries. Versioned endpoints preserve existing clients when KPI definitions evolve."
        ],
        "points": [],
        "code": "// Illustrative API design, not a confirmed route list\nGET /api/v1/sites/:siteId/energy?from=...&to=...&granularity=hour\nGET /api/v1/devices/:deviceId/health\nGET /api/v1/alerts?state=active&limit=50\nPOST /api/v1/alerts/:alertId/acknowledge",
        "note": ""
      },
      {
        "id": "isolation,-performance-and-correctness",
        "title": "Isolation, performance and correctness",
        "paragraphs": [
          "For a multi-site dashboard, the most dangerous bug is a query that filters by device ID but omits the owning tenant or site. Scoping belongs in backend access checks and query construction, not only in hidden frontend navigation. Timestamp indexes combined with tenant and device keys are usually more useful than indexing every numeric metric.",
          "Workload separation matters as the number of meters grows. Ingestion should remain fast even if one historical report is expensive; aggregation jobs and dashboard queries can consume precomputed time buckets. Idempotent ingestion prevents network retries from counting the same energy event twice.",
          "Testing focuses on edge cases: meter resets, out-of-order packets, gaps, daylight saving boundaries in UI presentation, duplicate samples, and disconnected devices."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "engineering-trade-offs",
        "title": "Engineering trade-offs",
        "paragraphs": [
          "The trade-off between raw detail and pre-aggregation is fundamental. Keeping every reading allows later recalculation but increases storage and query cost; daily and hourly rollups improve dashboard latency but need a clear policy for late-arriving updates. An effective architecture keeps raw evidence and derives rollups as recomputable materialised views.",
          "Similarly, real-time delivery is not a binary requirement. For operational monitoring, a few seconds of freshness with correct measurements may be more valuable than streaming every event into an overloaded browser. The design should communicate the freshness watermark."
        ],
        "points": [
          "Raw telemetry provides auditability; derived buckets provide speed.",
          "Simple threshold alerts are understandable; adaptive thresholds can reduce noise but require explainability.",
          "Event-time windows preserve measurement meaning; ingestion-time ordering simplifies operations but can distort delayed data."
        ],
        "code": "",
        "note": ""
      },
      {
        "id": "what-i-would-validate-next",
        "title": "What I would validate next",
        "paragraphs": [
          "A production readiness review would measure ingestion acceptance rate, end-to-end freshness, p95 KPI query latency, alert false-positive rate, and stale device count. A trace from one API response back through its rollup and source samples is a strong debugging tool.",
          "An incremental next step is to publish a synthetic demo with labelled sample data. It would prove the presentation without exposing client telemetry, proprietary API paths or customer identities."
        ],
        "points": [],
        "code": "",
        "note": ""
      }
    ],
    "questions": [
      {
        "q": "How do you calculate energy consumption?",
        "a": "Prefer cumulative kWh delta for reliable meters; otherwise integrate kW over time. Treat resets and missing readings explicitly."
      },
      {
        "q": "How do you stop duplicate alerts?",
        "a": "Use a stable incident key and alert lifecycle with hysteresis, debounce and idempotent transitions."
      },
      {
        "q": "How do you protect multi-tenant data?",
        "a": "Resolve tenant from authenticated identity and scope every query and cache key server-side."
      }
    ],
    "repo": null,
    "live": null
  },
  {
    "slug": "gensetiq-ai",
    "title": "GensetIQ-AI",
    "subtitle": "Monitoring and operational intelligence for generator fleets",
    "group": "Internship / Industrial IoT",
    "year": "Internship work",
    "summary": "Generator-set monitoring concepts: running state, fuel usage, faults, maintenance signals and fleet-level operations.",
    "theme": "orange",
    "technologies": [
      "Generator telemetry",
      "IoT concepts",
      "Operational analytics",
      "Fault states",
      "Fleet monitoring"
    ],
    "flow": [
      "Generator controller",
      "Telemetry gateway",
      "Ingestion & state normalisation",
      "Runtime / fuel / fault metrics",
      "Alerts & history",
      "Fleet operations view"
    ],
    "verified": [
      "User reports contributing to a generator-set monitoring platform during an internship."
    ],
    "caveat": "This additional internship project was described by the owner but does not appear in the supplied résumé. The details below are an illustrative engineering breakdown; specific features and personal ownership require confirmation.",
    "sections": [
      {
        "id": "product-overview",
        "title": "Product overview",
        "paragraphs": [
          "GensetIQ-AI can be understood as a central view of distributed diesel generator sets. A generator may operate at a factory, retail site or backup-power location; without consolidated telemetry, teams depend on manual logs, phone calls or sporadic inspections to understand equipment status.",
          "The product story is most compelling when described around operational questions: Which units are running right now? Which are unavailable? Which have an active fault? How many hours did a particular unit run? Has a fuel or maintenance signal changed enough to warrant an inspection?",
          "This is a reconstruction of the likely domain workflow from the brief project description, not a claim that every capability was present in a specific deployed build."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "signals-and-state-interpretation",
        "title": "Signals and state interpretation",
        "paragraphs": [
          "An engine controller might expose run status, engine hours, power output, fuel level, battery voltage, oil pressure, coolant temperature and alarm codes. Those values have different semantics. “Running” is a state, cumulative hours are a counter, fuel level is a sampled quantity, and alarm codes are events. Mixing them into one generic numerical pipeline makes reasoning and alerting fragile.",
          "A robust service normalises each class differently. State changes should have event timestamps and sequence awareness. Cumulative counters should be monotonic unless there is evidence of reset or replacement. Fault signals should preserve the original controller code alongside a user-readable description."
        ],
        "points": [
          "State signal: OFF, STARTING, RUNNING, STOPPING, FAULT, UNKNOWN.",
          "Counter signal: controller engine-hours or cumulative energy generated.",
          "Sample signal: kW load, coolant temperature, battery voltage or fuel level.",
          "Event signal: fault raised, fault cleared, maintenance acknowledged."
        ],
        "code": "",
        "note": ""
      },
      {
        "id": "runtime-and-fuel-calculation",
        "title": "Runtime and fuel calculation",
        "paragraphs": [
          "A common interview problem is computing runtime from state transitions. If the generator enters RUNNING at t₁ and leaves RUNNING at t₂, that interval contributes t₂−t₁ to runtime. Partial windows require clamping at the report boundaries, and unknown state gaps should not automatically be considered running.",
          "Fuel usage is trickier. A decreasing fuel-level percentage is not a reliable litres-consumed measurement without a calibrated tank capacity and an understanding of sensor noise, refilling and slosh. If a fuel-flow meter is present it may provide a stronger signal. Always disclose when a derived metric is an estimate.",
          "For fleet reports, group by generator and site first, calculate per-generator intervals, and only then produce organisation totals. This prevents overlapping states from different devices being confused."
        ],
        "points": [],
        "code": "// Example only: runtime from state transitions\nfor (const segment of orderedSegments) {\n  if (segment.state !== \"RUNNING\") continue;\n  runtimeMs += Math.max(0, segment.end - segment.start);\n}\n// Gaps with UNKNOWN state are excluded, not invented.",
        "note": ""
      },
      {
        "id": "operational-dashboards",
        "title": "Operational dashboards",
        "paragraphs": [
          "The fleet overview should surface units requiring attention before showing decorative charts. A useful layout combines status counts, fault severity, sites with no recent telemetry, top runtime units, maintenance-due indicators and recent incidents.",
          "A drill-down unit view can explain the latest reading, recent state timeline, running-hour counter, load trend, fuel estimates and related maintenance history. The same timestamp and time-zone conventions should be used throughout; otherwise the dashboard can seem contradictory.",
          "An important UX distinction is alarm acknowledged versus alarm resolved. Acknowledging confirms someone has seen the incident; resolving means the triggering condition is no longer present."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "failure-modes-and-edge-cases",
        "title": "Failure modes and edge cases",
        "paragraphs": [
          "If a generator stops communicating, the platform must not conclude it has stopped running. The correct state may be UNKNOWN with an independent telemetry-gap warning. Retried packets should not create double runtime segments, and late packets may require recomputation of earlier intervals.",
          "Maintenance scheduling can be calendar-based, engine-hour-based, or both. A proposed design records the rule version and the last completed service so an operator understands why maintenance is due."
        ],
        "points": [
          "Missing OFF events and the resulting open-ended running intervals.",
          "Counter rollovers, device replacement, and clock drift.",
          "Fuel refills that look like negative consumption.",
          "The same fault appearing repeatedly during a network outage.",
          "Per-site roles restricting visibility of sensitive operational data."
        ],
        "code": "",
        "note": ""
      },
      {
        "id": "architecture-reconstruction",
        "title": "Architecture reconstruction",
        "paragraphs": [
          "A reasonable architecture is controller or gateway → ingestion API → validated events → time-aware storage → derived metrics and incidents → REST endpoints → fleet UI. Each box has one responsibility and a clear failure boundary.",
          "For resilience, ingest quickly and process expensive fleet summaries outside the request path. Maintain a last-seen timestamp separately from the last-known state, and preserve controller identifiers so the operator can trace a displayed status to its source.",
          "The diagram here is deliberately labelled as conceptual; the original stack, infrastructure and personally implemented services were not independently established."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "security,-scale-and-visibility",
        "title": "Security, scale and visibility",
        "paragraphs": [
          "Industrial telemetry should have authenticated ingestion credentials with device-scoped permissions, rotating keys where supported, and explicit access control for site views. Server logs should avoid secrets and customer-identifying raw payloads.",
          "Operational metrics to instrument include ingestion lag, disconnected units, failed parsing, unexpected state transitions and freshness by site. Simple device-time indexes and downsampled trend series can keep fleet dashboards responsive as device count increases."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "how-i-would-present-this-in-an-interview",
        "title": "How I would present this in an interview",
        "paragraphs": [
          "I would begin with the generator domain and the difference between equipment health and connection health. Then I would walk through one event: a running-status transition travels through ingestion, persistence, runtime calculation and the dashboard.",
          "Because I no longer have complete implementation notes, I would be precise about which parts I personally coded, which parts I helped integrate, and which elements are representative best-practice design. A well-explained trade-off is more persuasive than claiming undocumented scale or features."
        ],
        "points": [],
        "code": "",
        "note": ""
      }
    ],
    "questions": [
      {
        "q": "What if an OFF event never arrives?",
        "a": "Keep the runtime segment open only within an explicit freshness policy; mark missing data as unknown and do not silently overcount."
      },
      {
        "q": "How do you distinguish a generator fault from a network fault?",
        "a": "Track controller fault signals separately from telemetry freshness, with independent alerts."
      },
      {
        "q": "How would you estimate fuel consumption?",
        "a": "Prefer calibrated sensors or flow counters; otherwise state assumptions and confidence clearly."
      }
    ],
    "repo": null,
    "live": null
  },
  {
    "slug": "rag-pipeline",
    "title": "Grounded RAG Pipeline",
    "subtitle": "Hybrid retrieval decisions, reranking and Gemini generation",
    "group": "Featured / AI Engineering",
    "year": "2025",
    "summary": "A document question-answering system pairing embeddings and Qdrant search with Cohere reranking and Gemini responses backed by retrieved context.",
    "theme": "violet",
    "technologies": [
      "Python",
      "Qdrant",
      "Cohere Rerank",
      "Gemini Flash",
      "all-MiniLM-L6-v2",
      "RAG"
    ],
    "flow": [
      "Documents",
      "1000-character chunks",
      "MiniLM embeddings",
      "Qdrant top-k search",
      "Cohere reranking",
      "Gemini + cited answer"
    ],
    "verified": [
      "Chunked documents into ~1,000-character windows and embedded passages with all-MiniLM-L6-v2.",
      "Used Qdrant, Cohere reranking and Gemini generation with inline source references.",
      "Profiled token usage and selected Gemini Flash for cost/latency efficiency."
    ],
    "caveat": "The pipeline components and qualitative efficiency work come from the résumé. Exact evaluation scores, savings percentages and retrieval thresholds were not supplied.",
    "sections": [
      {
        "id": "why-retrieval-augmentation",
        "title": "Why retrieval augmentation",
        "paragraphs": [
          "A foundation model can answer general questions but cannot reliably cite or recall a private document it has never seen. This project adds a retrieval step to select relevant passages at question time, limiting the answer space to material that was actually provided.",
          "The application deliberately separates indexing from question answering. Ingestion converts documents into searchable units. Query-time retrieval gathers candidate passages, reranking selects the highest-quality evidence, and Gemini turns that evidence into a readable response."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "offline-indexing",
        "title": "Offline indexing",
        "paragraphs": [
          "During indexing, the document loader extracts text and preserves source metadata such as filename, section or page when available. The text is divided into roughly 1,000-character chunks, then passed to all-MiniLM-L6-v2 to produce fixed-length semantic vectors.",
          "Chunk size influences both recall and interpretability. Too small and a paragraph may lose the premise needed for a correct answer; too large and one vector represents several unrelated ideas. Overlap can reduce boundary loss, but also increases storage and causes near-duplicate retrievals.",
          "Index versioning matters: changing the embedding model or preprocessing should trigger a coordinated reindex because vector spaces from different models are not interchangeable."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "vector-search-and-reranking",
        "title": "Vector search and reranking",
        "paragraphs": [
          "A user query is embedded with the same model used for documents. Qdrant finds approximate nearest-neighbour candidates by vector similarity, providing a high-recall shortlist at relatively low cost. Similarity is not a complete measure of answer usefulness, particularly when a passage shares vocabulary but does not answer the question.",
          "The Cohere reranker then scores the query-passage pairs and orders them according to relevance. This two-stage design spends the more expensive cross-encoder-style comparison only on a small candidate set rather than the full corpus.",
          "The result is a more targeted context window: not simply the closest chunks, but the chunks most likely to support an answer."
        ],
        "points": [
          "First stage optimises recall through semantic vector search.",
          "Second stage optimises precision by considering query and passage together.",
          "Context packing should remove duplicates and account for the LLM token budget.",
          "A score threshold or answerability check can trigger “insufficient evidence.”"
        ],
        "code": "",
        "note": ""
      },
      {
        "id": "prompt-assembly-and-citations",
        "title": "Prompt assembly and citations",
        "paragraphs": [
          "The generation prompt distinguishes system instructions, the user question, and retrieved evidence blocks. Each evidence block receives a stable citation handle associated with a source document and passage. Gemini is instructed to explain conclusions using only relevant retrieved information, and to acknowledge missing evidence.",
          "Citations are not proof by themselves: they must point to the exact supporting chunk and the UI must let a reader inspect the quoted source. A robust system validates cited IDs against the retrieval set instead of trusting arbitrary IDs generated by the model."
        ],
        "points": [],
        "code": "// Illustrative assembled context, not an exact original prompt\n[Source S1 | handbook.pdf | section 3]\n...retrieved text...\n\n[Source S2 | policy.md | heading: Scope]\n...retrieved text...\n\nQuestion: What are the documented requirements?\nInstruction: Answer only from sources. Cite S1/S2 where relevant.",
        "note": ""
      },
      {
        "id": "reducing-hallucinations",
        "title": "Reducing hallucinations",
        "paragraphs": [
          "Grounding improves traceability but cannot guarantee correctness. A model can misread a retrieved passage, mix two policies or invent a citation that appears plausible. This is why retrieval quality, prompt rules, citation validation and answerability checks should be tested separately.",
          "An evaluation harness should include questions with direct answers, cross-section synthesis, conflicting documents, irrelevant queries and intentionally unanswerable questions. Measuring evidence correctness and citation support is more informative than judging eloquence alone."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "cost-and-latency",
        "title": "Cost and latency",
        "paragraphs": [
          "The pipeline trades stages for answer quality: embedding → vector search → reranking → generation. Each adds latency, so profiling is essential. The résumé reports token-usage profiling and moving generation to Gemini Flash to reduce cost and latency without abandoning the retrieval architecture.",
          "Useful optimisation levers include caching identical embeddings, keeping candidate counts bounded, deduplicating passages, shortening prompt boilerplate, and logging usage per stage. A faster model can still produce poor results if retrieval packs irrelevant context."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "security-and-data-lifecycle",
        "title": "Security and data lifecycle",
        "paragraphs": [
          "Document content is often more sensitive than the question. A deployed variant should enforce collection-level or payload-level access checks before retrieval, redact secrets from logs, track document versions, and support deletion/reindexing when material is updated.",
          "If multiple teams share the vector database, every search must apply an authorised scope filter. Adding the user ID only to the final prompt is not a security boundary. Citation links also must respect access permissions."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "trade-offs-and-next-iteration",
        "title": "Trade-offs and next iteration",
        "paragraphs": [
          "Character-based chunks are simple and reproducible, but headings and sentence boundaries can be lost. A natural improvement is section-aware chunking that preserves headings as metadata. Hybrid keyword-plus-vector retrieval can also help exact technical identifiers that semantic similarity misses.",
          "Before adding more models, I would build an evaluation set with expected supporting passages. Retrieval recall@k, reranked precision, answer faithfulness, citation accuracy and end-to-end p95 latency should guide changes rather than intuition."
        ],
        "points": [],
        "code": "",
        "note": ""
      }
    ],
    "questions": [
      {
        "q": "Why rerank after Qdrant?",
        "a": "Vector search quickly recalls candidates; the reranker compares each candidate to the question more carefully, improving the final context."
      },
      {
        "q": "Why not put all documents in the prompt?",
        "a": "It is expensive, limited by context length and often lowers relevance. Retrieval keeps the evidence focused."
      },
      {
        "q": "Can RAG eliminate hallucinations?",
        "a": "No. It offers evidence grounding and auditability, but needs abstention, evaluation and citation checks."
      }
    ],
    "repo": null,
    "live": null
  },
  {
    "slug": "traffic-vision",
    "title": "Real-Time Traffic Speed Monitoring",
    "subtitle": "Computer vision, multi-object tracking and geometric speed estimation",
    "group": "Featured / Computer Vision",
    "year": "2024",
    "summary": "An end-to-end video analysis pipeline to detect vehicles, maintain identities, estimate speed across calibrated lines and log overspeed events.",
    "theme": "blue",
    "technologies": [
      "Python",
      "YOLOv8",
      "SORT",
      "OpenCV",
      "TensorFlow",
      "Video analytics"
    ],
    "flow": [
      "Video frames",
      "YOLOv8 detections",
      "SORT vehicle IDs",
      "Line-crossing timestamps",
      "Speed estimate",
      "Violation evidence"
    ],
    "verified": [
      "Combined YOLOv8 detection with SORT tracking and a dual-line speed-estimation approach.",
      "Logged overspeed events with vehicle IDs, estimated speeds and annotated frame snapshots.",
      "Implemented the video pipeline with Python/OpenCV/TensorFlow tooling."
    ],
    "caveat": "The résumé describes the system; calibration specifics and real-world accuracy metrics were not supplied. Computed speeds should be presented as estimates, not certified enforcement measurements.",
    "sections": [
      {
        "id": "the-core-engineering-problem",
        "title": "The core engineering problem",
        "paragraphs": [
          "Object detection tells you where a vehicle appears in a frame but not how fast it travels. Speed estimation requires associating the same physical object across frames and converting observed movement into physical distance over time. Camera perspective and timing accuracy determine how credible that estimate can be.",
          "A practical pipeline combines detection, identity tracking, geometry, event detection and persistence. Each stage can fail independently, which makes explicit interfaces and visual debugging invaluable."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "frame-ingestion-and-detections",
        "title": "Frame ingestion and detections",
        "paragraphs": [
          "OpenCV reads video frames from a recorded file or capture source. Frames are timestamped using reliable media time rather than assuming the declared frame rate is always exact. YOLOv8 detects likely vehicles, returning boxes, class labels and confidence values.",
          "A detection filter can discard classes outside the monitoring scope, low-confidence boxes and observations in irrelevant regions. In crowded scenes, occlusion and motion blur can cause detections to disappear for a few frames; tracking is responsible for dealing with those gaps."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "sort-tracking-and-identity-continuity",
        "title": "SORT tracking and identity continuity",
        "paragraphs": [
          "SORT associates detections across time using state estimation and box overlap matching. Its job is to maintain a stable ID long enough to know when the same car crosses two measurement lines. Without tracking, the system might time line one for one car and line two for another, producing nonsense.",
          "Tracking IDs are local algorithmic identifiers, not vehicle registrations or license plates. Identity switches may occur when cars overlap. Speed events should therefore carry confidence and validity rules, and tracking quality should be monitored alongside detection quality."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "dual-line-speed-estimation",
        "title": "Dual-line speed estimation",
        "paragraphs": [
          "Define two reference lines in the image corresponding to real-world positions with measured separation. Track a consistent anchor point on the vehicle, such as the bottom-centre of the detection box, and record the timestamp when it crosses each line. Then speed is physical distance divided by elapsed time.",
          "For separation d metres and elapsed time Δt seconds: speed in km/h = (d / Δt) × 3.6. For example, 12 metres across 0.6 seconds yields roughly 72 km/h. That arithmetic is straightforward; the difficult part is ensuring the projected line separation truly corresponds to 12 metres on the road plane."
        ],
        "points": [
          "Calibrate lines using surveyed road distance or homography.",
          "Use frame timestamps, not wall-clock API processing duration.",
          "Avoid multiple triggers for a vehicle jittering near the same line.",
          "Reject zero, negative or implausibly short crossing intervals."
        ],
        "code": "# Illustrative calculation, not source copied from the project\ndistance_m = 12.0\nelapsed_s = 0.6\nspeed_kmh = (distance_m / elapsed_s) * 3.6\n# 72.0 km/h",
        "note": ""
      },
      {
        "id": "geometry-and-calibration",
        "title": "Geometry and calibration",
        "paragraphs": [
          "A camera sees the road with perspective: ten pixels near the horizon represent a very different physical distance from ten pixels in the foreground. Measuring image-space displacement alone is therefore not a general physical speed measurement.",
          "For a fixed surveillance camera, reference lines and a road-plane homography can map anchor points into calibrated coordinates. The design should document camera height, tilt, field of view, line placement and the real-world measured distance. A camera move invalidates the calibration.",
          "The résumé confirms a dual-line approach; the exact calibration method remains a design topic unless original settings or recordings are available."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "overspeed-events-and-evidence",
        "title": "Overspeed events and evidence",
        "paragraphs": [
          "When a valid tracked vehicle exceeds a configured speed threshold, the violation handler records the estimated speed, local track ID, timestamp and a snapshot with annotation. The same car should not generate a new event on every subsequent frame.",
          "Evidence data should explain the estimate: line locations, crossing times, calibration version, threshold and processing model version. This enables later debugging and avoids treating a bare speed value as unquestionable fact."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "latency-and-throughput",
        "title": "Latency and throughput",
        "paragraphs": [
          "Sub-second processing requires measuring both inference duration and complete-frame pipeline latency. Model resolution, device hardware, video frame rate, number of tracked objects, rendering overhead and disk writes all affect throughput.",
          "When processing falls behind, the system must choose whether to queue frames and increase delay, drop frames while keeping accurate timestamps, or reduce model frequency with tracking interpolation. Blindly assuming constant FPS when dropping frames biases the result."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "testing-failure-cases",
        "title": "Testing failure cases",
        "paragraphs": [
          "Unit tests can verify unit conversion, line-crossing order and idempotent event creation. Video-based tests should cover motorcycles versus cars, overlapping detections, low light, parked vehicles, lane changes and vehicles entering halfway through the measurement region.",
          "A credible improvement plan includes comparison with a known-speed reference and error distribution across different lanes, lighting and speeds. This is distinct from saying the system is legally suitable for issuing fines."
        ],
        "points": [],
        "code": "",
        "note": ""
      }
    ],
    "questions": [
      {
        "q": "Why use SORT?",
        "a": "To connect a sequence of detections to one vehicle so line-crossing timestamps can be associated correctly."
      },
      {
        "q": "Where does physical distance come from?",
        "a": "A measured road segment or a calibrated road-plane mapping; pixel distance alone is not enough."
      },
      {
        "q": "What causes wrong speeds?",
        "a": "ID switches, timestamp errors, camera motion, poor calibration and line-crossing jitter."
      }
    ],
    "repo": null,
    "live": null
  },
  {
    "slug": "media-sync-engine",
    "title": "Media Sync Engine",
    "subtitle": "AI-generated sports commentary synchronized to video highlights",
    "group": "Featured / Generative AI",
    "year": "2025",
    "summary": "A multimodal processing chain converting sports frames into text descriptions, broadcast-style scripts and aligned voiceovers for highlight videos.",
    "theme": "pink",
    "technologies": [
      "FastAPI",
      "BLIP",
      "Llama 3",
      "Ollama",
      "gTTS",
      "MoviePy",
      "Streamlit"
    ],
    "flow": [
      "Video upload",
      "Frame sampling / BLIP",
      "Llama 3 narration script",
      "gTTS speech audio",
      "MoviePy synchronisation",
      "Narrated highlight reel"
    ],
    "verified": [
      "Described frames with BLIP and transformed the descriptions into commentary with Llama 3 through Ollama.",
      "Generated audio with gTTS and synchronised it using MoviePy.",
      "Built FastAPI asynchronous processing endpoints and a Streamlit upload/preview client."
    ],
    "caveat": "The résumé describes the processing chain. Specific temporal alignment algorithms, language coverage and quality benchmark scores were not supplied.",
    "sections": [
      {
        "id": "product-and-user-journey",
        "title": "Product and user journey",
        "paragraphs": [
          "Creating an exciting highlight video traditionally requires someone to watch footage, identify important moments, write narration, record a voice and align the audio in an editor. Media Sync Engine explores a programmable alternative for generating a first-pass commentary track.",
          "A user supplies a video in a Streamlit interface. The backend processes it asynchronously and returns an output that combines the video with a synthetic narration. The problem is inherently multimodal: visual recognition, natural-language generation, speech synthesis and video editing must agree on event timing."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "frame-sampling-and-visual-context",
        "title": "Frame sampling and visual context",
        "paragraphs": [
          "Processing every frame with a heavy vision-language model is rarely economical. A frame-sampling stage selects representative images and keeps their timestamps. BLIP generates short scene descriptions that can be assembled into a timeline of observations.",
          "A caption such as “several players stand near a goal” is not necessarily enough to claim a score happened. Vision-language models can omit the ball, confuse jerseys or hallucinate action. The prompt should distinguish observed descriptions from inferred sports narration."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "script-generation-with-llama-3",
        "title": "Script generation with Llama 3",
        "paragraphs": [
          "The sampled descriptions become structured input to Llama 3 through Ollama. Instead of asking for a free-form paragraph, the generator benefits from a constrained format: scene time, suggested commentary, estimated spoken duration and tone. This gives the renderer something to align.",
          "Broadcast-style writing is a stylistic objective, not permission to invent players, scorelines or match context. A conservative generation mode can use enthusiastic but non-specific language when the visual signal is ambiguous."
        ],
        "points": [],
        "code": "// Example intermediate representation (illustrative)\n{\n  \"startSec\": 22.4,\n  \"endSec\": 26.9,\n  \"visual\": \"player approaches goalmouth\",\n  \"narration\": \"A quick move into the attacking area!\",\n  \"needsVerification\": true\n}",
        "note": ""
      },
      {
        "id": "from-text-to-speech",
        "title": "From text to speech",
        "paragraphs": [
          "gTTS converts the chosen narration into audio. Text length and natural speech speed determine duration, which may be longer than the visual segment being described. This forces an explicit editing decision: trim narration, extend the clip, shift the narration start, or leave intentional silence.",
          "The generated speech should be normalised for volume and checked for clipping before muxing with video. If original audio is retained, ducking during speech improves intelligibility."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "timeline-synchronisation",
        "title": "Timeline synchronisation",
        "paragraphs": [
          "MoviePy assembles the final media by positioning audio clips on a shared timeline and exporting the combined artifact. Unlike simply concatenating audio, synchronisation needs to consider scene boundaries and overlap.",
          "A robust timeline builder sorts segments, validates that no narration starts before time zero, handles audio longer than the scene and prevents the final clip from ending prematurely. Generated output durations should be verified against the original video duration and media metadata."
        ],
        "points": [
          "Keep video and narration timestamps in seconds under one reference clock.",
          "Avoid double-speaking segments when captions overlap.",
          "Provide a graceful fallback when one generation step fails.",
          "Treat source audio as a separate track with intentional mixing."
        ],
        "code": "",
        "note": ""
      },
      {
        "id": "asynchronous-api-design",
        "title": "Asynchronous API design",
        "paragraphs": [
          "Video processing can take longer than a normal HTTP request timeout. A FastAPI endpoint should accept an upload, validate file type and size, create a job ID, and let the client query job progress. The résumé states async processing endpoints; an explicit job-state model is a sensible way to reason about them.",
          "A job may move through uploaded → extracting → describing → scripting → synthesising → rendering → complete or failed. The UI can show those stages without implying a task completed instantly."
        ],
        "points": [],
        "code": "# Illustrative REST contract, not verified deployed endpoints\nPOST /api/videos/jobs\nGET  /api/videos/jobs/{job_id}\nGET  /api/videos/jobs/{job_id}/artifact",
        "note": ""
      },
      {
        "id": "reliability,-cost-and-safety",
        "title": "Reliability, cost and safety",
        "paragraphs": [
          "The main bottlenecks are decoding frames, image caption inference, LLM generation and final encoding. Practical controls include sampling limits, bounded uploads, intermediate file cleanup and worker concurrency limits. Reusing source video directly during rendering can reduce unnecessary re-encoding.",
          "Sports commentary also needs content discipline. Unknown teams, players and outcomes should not be invented. Human review remains valuable before publishing automatically generated narration."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "improvements-and-evaluation",
        "title": "Improvements and evaluation",
        "paragraphs": [
          "An improved pipeline could use shot detection rather than uniform sampling, sport-specific event detectors and structured confidence estimates. A preview editor could let the user change narration lines before synthesis.",
          "Evaluation can measure scene-to-commentary correctness, speech alignment offset, manual corrections per minute of video and total processing time. These metrics describe actual product usefulness better than calling an output “AI-powered.”"
        ],
        "points": [],
        "code": "",
        "note": ""
      }
    ],
    "questions": [
      {
        "q": "Why not caption every frame?",
        "a": "Computational cost and repetition. Sample strategically or use scene detection, but preserve timestamps."
      },
      {
        "q": "What if generated audio is too long?",
        "a": "Regenerate shorter narration, time-stretch carefully or adjust segment timing; do not blindly crop important speech."
      },
      {
        "q": "Why use an async API?",
        "a": "Video inference and encoding can exceed ordinary request durations; a job lifecycle gives predictable progress and retries."
      }
    ],
    "repo": null,
    "live": null
  },
  {
    "slug": "investor-startup-network",
    "title": "Startup × Investor Discovery",
    "subtitle": "A two-sided marketplace concept for startup discovery and introductions",
    "group": "Internship / Marketplace",
    "year": "Internship project",
    "summary": "An internship project described as an AngelList-like product connecting startup profiles with interested investors.",
    "theme": "teal",
    "technologies": [
      "Two-sided marketplace",
      "Profiles & discovery",
      "Search and filtering",
      "Access control",
      "Product thinking"
    ],
    "flow": [
      "Startup profile",
      "Searchable company directory",
      "Investor discovery filters",
      "Interest / introduction request",
      "Controlled communication",
      "Relationship status"
    ],
    "verified": [
      "User recalls working on an internship project where investors could discover startups, broadly comparable to AngelList."
    ],
    "caveat": "Product title is descriptive, not the historical brand name. Exact codebase, company, personally shipped screens, algorithms, stack, integrations and business outcomes are unknown. All workflows below are illustrative.",
    "sections": [
      {
        "id": "what-the-product-was-about",
        "title": "What the product was about",
        "paragraphs": [
          "The product concept is a two-sided discovery experience: founders need to explain what they are building, and investors need a structured way to find companies in a relevant sector, geography or stage. The value is not merely displaying profiles; it is reducing the time between identifying a plausible match and starting a useful conversation.",
          "The user recalls that the internship project resembled AngelList, but has not provided code or specifications. This page therefore documents a representative product model and technical discussion points rather than claiming an exact implementation."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "different-users-and-their-goals",
        "title": "Different users and their goals",
        "paragraphs": [
          "A founder wants an accurate company profile, controlled visibility and a way to know whether an investor has expressed interest. An investor wants filtering, credible company descriptions, updates and a low-friction method to request contact. A platform administrator needs to moderate suspicious accounts and maintain data quality.",
          "These needs lead naturally to distinct permissions and UI journeys. Sharing the same account schema for every role without role-aware resource checks would be a common source of mistakes."
        ],
        "points": [
          "Founder: create or edit startup profile; respond to relevant inbound interest.",
          "Investor: discover startups, save search criteria, express interest.",
          "Moderator: review reports and authenticity signals.",
          "Guest: browse only intentionally public information."
        ],
        "code": "",
        "note": ""
      },
      {
        "id": "discovery-and-filtering",
        "title": "Discovery and filtering",
        "paragraphs": [
          "A useful discovery page separates structured fields—industry, location, funding stage, business model—from narrative descriptions. Structured facets make filtering predictable, while text search provides flexibility for ambiguous terms.",
          "The ranking function should be explainable and avoid implying investment suitability. A baseline can sort by relevance and completeness, then add recency or user preferences. Paid placement, if ever introduced, must be clearly labelled."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "illustrative-domain-model",
        "title": "Illustrative domain model",
        "paragraphs": [
          "A normalized model might include users, startup profiles, investor profiles, startup team membership, discovery preferences, interest requests and messages. A startup may have multiple founders; ownership should therefore be a membership relation, not a single unchangeable user ID.",
          "The investor-to-startup “interest” entity is distinct from financial investment. It records a communication intention and perhaps a workflow status. The platform should never equate a saved startup or a conversation request with money committed."
        ],
        "points": [],
        "code": "// Illustrative data model — not recovered from the internship\nStartup { id, name, sector, stage, location, visibility }\nInvestor { id, focusSectors[], preferredStages[], geography[] }\nInterest { id, investorId, startupId, status, createdAt }\n// status: requested | accepted | declined | withdrawn",
        "note": ""
      },
      {
        "id": "secure-introductions-and-privacy",
        "title": "Secure introductions and privacy",
        "paragraphs": [
          "An introduction flow needs clear consent. Founders should control the visibility of private contact data, and investors should be authenticated before sending requests. Spam controls might include rate limits, reporting tools and review of repeated outbound contact attempts.",
          "Sensitive founder details and documents require explicit authorization. The backend must check membership or investor permissions on each request; hiding an “Edit startup” button in the frontend is not security."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "ui-and-backend-contracts",
        "title": "UI and backend contracts",
        "paragraphs": [
          "A typical product journey is browse startups → open profile → save or express interest → review request status. Server-side filtering and pagination keep discovery usable when the directory grows. The detail page should make it obvious which fields are self-reported rather than platform-verified.",
          "One design challenge is avoiding a search system that exposes private or unapproved startup records. Authorization and visibility belong directly in the search query, not applied only after a broad result has been returned."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "marketplace-cold-start",
        "title": "Marketplace cold start",
        "paragraphs": [
          "Two-sided products have a chicken-and-egg problem: investors need interesting startups, but founders may hesitate to join without investors. Product teams can improve quality by onboarding a focused niche, maintaining profile completeness and encouraging helpful, low-volume introductions instead of chasing vanity counts.",
          "Success metrics can include qualified profile views, accepted introduction requests and response latency. Those metrics should be measured with appropriate privacy safeguards, rather than assumed from screenshots."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "how-to-describe-this-responsibly",
        "title": "How to describe this responsibly",
        "paragraphs": [
          "In an interview, I would state that I contributed to an internship project involving startup–investor discovery, then explain the subset I can personally verify—such as a page, endpoint or data flow—once I have checked my old work.",
          "The architecture, schema and workflows shown here are documentation-grade examples of how the product category works. They are not evidence that I built a matching algorithm, payments, KYC verification or a funding platform."
        ],
        "points": [],
        "code": "",
        "note": ""
      }
    ],
    "questions": [
      {
        "q": "How would you model interest?",
        "a": "As a permissioned introduction request with status and history, not a record of actual investment."
      },
      {
        "q": "What is difficult about a two-sided marketplace?",
        "a": "Balanced supply and demand, trust, spam control, useful search and consent-aware introductions."
      },
      {
        "q": "How would you prevent private profile leakage?",
        "a": "Enforce visibility and role scopes inside database queries and every detail endpoint."
      }
    ],
    "repo": null,
    "live": null
  },
  {
    "slug": "notes-workspace",
    "title": "Notes Workspace",
    "subtitle": "A React front end backed by a separately maintained Node API",
    "group": "GitHub / Full-stack",
    "year": "Public repository",
    "summary": "An inspected public repository pair: a Vite/React notes interface and an Express/Mongoose backend with token-auth dependencies.",
    "theme": "blue",
    "technologies": [
      "React",
      "Vite",
      "Axios",
      "React Router",
      "Express",
      "Mongoose",
      "JWT"
    ],
    "flow": [
      "React/Vite client",
      "Axios request layer",
      "Express routes",
      "Authentication middleware",
      "MongoDB models",
      "Notes data"
    ],
    "verified": [
      "Public repositories contain note-app (Node/Express/Mongoose) and note-app-frontendReact (Vite/React).",
      "The backend dependency list includes bcrypt, jsonwebtoken, cookie-parser and mongoose.",
      "The frontend dependency list includes Axios, React Router, react-hot-toast and Sass."
    ],
    "caveat": "The stack and repository structure were inspected publicly. Specific screens, data rules and runtime behaviour should be verified in the code before asserting they were shipped. The flow is a representative interpretation.",
    "sections": [
      {
        "id": "repository-structure",
        "title": "Repository structure",
        "paragraphs": [
          "The notes project is split into two public GitHub repositories. The backend has controllers, routes, middlewares, models, utilities and its own Express entry points. The front end is a Vite/React application with Axios, React Router, toast notifications and Sass in package dependencies.",
          "That split demonstrates an important full-stack concept: the user interface should not own database or authentication rules. It requests operations over HTTP, and the backend decides whether an operation is authorised and persists the result."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "frontend-architecture",
        "title": "Frontend architecture",
        "paragraphs": [
          "In a notes client, components should own display and input state while a dedicated API layer owns HTTP calls. A router distinguishes sign-in, list and detail views when those routes exist. Toast notifications are useful for success or error feedback but should not be the only place an error is explained.",
          "A note editor needs to handle unsaved changes, blank submissions, network retries and permission errors. Optimistic updates can feel immediate but must reconcile with server failures. The inspected packages show the libraries available; the exact screens are not independently documented."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "backend-request-lifecycle",
        "title": "Backend request lifecycle",
        "paragraphs": [
          "A typical HTTP path is router → authentication middleware → controller → Mongoose model → JSON response. Password hashing and JWT libraries appear in the backend dependency manifest, so identity-related responsibilities are plausible; however, dependency presence alone does not certify a complete security implementation.",
          "The API needs clear response semantics: use 401 when authentication is missing or invalid, 403 when an authenticated user is not permitted, 404 when a note is unavailable, and validation errors for malformed input."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "note-ownership-and-data-isolation",
        "title": "Note ownership and data isolation",
        "paragraphs": [
          "Notes are user-owned resources. A safe query includes both the note identifier and an authenticated owner criterion rather than fetching a note by ID and trusting the client to decide who may see it.",
          "For example, updating one note should require id + ownerId in the database predicate. Applying this pattern consistently prevents an insecure direct object reference where changing the URL reveals another user’s content."
        ],
        "points": [],
        "code": "// Illustrative protection pattern\nconst note = await Note.findOneAndUpdate(\n  { _id: noteId, ownerId: req.user.id },\n  { $set: validatedFields },\n  { new: true }\n);",
        "note": ""
      },
      {
        "id": "error-handling-and-session-management",
        "title": "Error handling and session management",
        "paragraphs": [
          "JWT security depends on validating signatures, expiration and token source. Tokens should not leak into logs or be placed in publicly cacheable responses. If authentication uses cookies, the application also needs to consider SameSite, Secure, HttpOnly and cross-site request forgery risk.",
          "The frontend can centrally intercept expired sessions and guide a user back to sign-in. It should not silently overwrite unsaved notes when a session expires."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "design-decisions-and-next-improvements",
        "title": "Design decisions and next improvements",
        "paragraphs": [
          "A full-stack notes app is a good place to demonstrate form state, API contracts, access control and persistence. Useful additions would be full-text search, paging, drafts with conflict detection, basic tests and an easily reproducible local setup.",
          "The portfolio links directly to the inspected repositories, so a reviewer can evaluate the code rather than relying on a claimed feature matrix."
        ],
        "points": [],
        "code": "",
        "note": ""
      }
    ],
    "questions": [
      {
        "q": "Why split frontend and backend?",
        "a": "Independent UI and data responsibilities, testable contracts and server-enforced permissions."
      },
      {
        "q": "How do you prevent users editing each other’s notes?",
        "a": "Scope note queries to the authenticated owner in the backend."
      },
      {
        "q": "What should the client do on 401?",
        "a": "Preserve local state where possible, redirect to sign-in and explain the failed save."
      }
    ],
    "repo": "https://github.com/rohit200x/note-app",
    "live": "https://note-app-frontend-react.vercel.app/"
  },
  {
    "slug": "todo-api",
    "title": "Task Management API",
    "subtitle": "A server-side Node application with routes, models and authentication dependencies",
    "group": "GitHub / Backend",
    "year": "Public repository",
    "summary": "A public Express/Mongoose backend demonstrating modular API structure and security-related dependencies.",
    "theme": "orange",
    "technologies": [
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "JWT",
      "bcrypt"
    ],
    "flow": [
      "HTTP request",
      "Express route",
      "Middleware",
      "Controller",
      "Mongoose model",
      "Database response"
    ],
    "verified": [
      "Public toDoApp repository exposes controllers, data, middlewares, models, routes and utility modules.",
      "Manifest includes Express, Mongoose, JWT, bcrypt and cookie-parser."
    ],
    "caveat": "The codebase layout and dependencies were inspected. Specific task CRUD operations, endpoint names, user roles and production behaviour have not been independently verified here.",
    "sections": [
      {
        "id": "what-is-visible-in-the-repository",
        "title": "What is visible in the repository",
        "paragraphs": [
          "The repository contains a server entry point and separates routing, controller logic, persistence models, middleware and utility helpers into folders. Its package manifest uses Node ES modules with Express, Mongoose and common authentication-support libraries.",
          "This decomposition is useful because HTTP concerns, request validation and database mutations can evolve independently instead of becoming one large server file."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "request-flow",
        "title": "Request flow",
        "paragraphs": [
          "A canonical request enters Express, passes through parser and authentication middleware, matches a route, and reaches a controller. The controller validates input, calls model operations and returns a structured response.",
          "In a task API, consistency matters: create should validate the minimum fields, update should only accept allowable changes, and delete should be scoped to the correct owner. These are general design rules, not a claim about exact endpoints in this repository."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "persistence-and-model-boundaries",
        "title": "Persistence and model boundaries",
        "paragraphs": [
          "Mongoose maps application documents to MongoDB collections. A model schema should define required fields, data types, defaults and indexes; the controller should enforce business operations beyond simple shape validation.",
          "Index choices follow read patterns. For example, a user-scoped task list might need owner + creation timestamp; indexing every field indiscriminately increases write cost."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "authentication-and-authorisation",
        "title": "Authentication and authorisation",
        "paragraphs": [
          "The dependency manifest includes bcrypt and jsonwebtoken. Bcrypt can hash passwords for safe comparison, while JWTs can carry signed claims. Neither library automatically implements safe authentication; handlers still need strong input validation, secret management and appropriate token expiry.",
          "Authorisation is a different problem: an authenticated user may still be forbidden to access another person’s record. Every resource query should include an access scope."
        ],
        "points": [],
        "code": "// Illustrative middleware ordering\napp.use(express.json());\napp.use(\"/api\", authMiddleware, routes);\napp.use(errorHandler);",
        "note": ""
      },
      {
        "id": "error-semantics-and-tests",
        "title": "Error semantics and tests",
        "paragraphs": [
          "A coherent API returns stable JSON errors and uses correct HTTP status codes. Test cases should include bad IDs, malformed JSON, expired tokens, cross-account access attempts and duplicate requests.",
          "Integration tests with a disposable test database can catch route/model mismatches that unit tests miss. A clear README with startup commands would lower friction for employers reviewing the repository."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "how-i-would-harden-it",
        "title": "How I would harden it",
        "paragraphs": [
          "A production hardening pass would review secret handling, schema validation, rate limiting, CORS policy, pagination, audit logs and transactional integrity where multi-document operations exist.",
          "It would also separate environment configuration from committed source and document why particular middleware is installed. This checklist is a forward-looking recommendation, not a deployment claim."
        ],
        "points": [],
        "code": "",
        "note": ""
      }
    ],
    "questions": [
      {
        "q": "Why use a controller layer?",
        "a": "To keep routing declarative and isolate input handling from business operations."
      },
      {
        "q": "Does JWT solve authorisation?",
        "a": "No. JWT validates identity/claims; every resource access still needs explicit permission checks."
      },
      {
        "q": "Which index might help task listing?",
        "a": "An index aligned to owner and sort/filter fields, selected after inspecting real query patterns."
      }
    ],
    "repo": "https://github.com/rohit200x/toDoApp",
    "live": null
  },
  {
    "slug": "foodapp",
    "title": "FoodApp",
    "subtitle": "An early full-stack application organised around a MERN project structure",
    "group": "GitHub / Web application",
    "year": "Public repository",
    "summary": "A publicly visible FoodApp codebase with a MERN application directory and a published deployment link on GitHub.",
    "theme": "pink",
    "technologies": [
      "JavaScript",
      "MERN",
      "Web application",
      "Client/server architecture",
      "Vercel"
    ],
    "flow": [
      "Web UI",
      "Application logic",
      "MERN application folder",
      "API / data layer",
      "Rendered experience"
    ],
    "verified": [
      "Public FoodApp repository has a mernapp application folder and a Vercel deployment URL in its About section."
    ],
    "caveat": "The app behaviour and implemented ordering, checkout or payment features were not confirmed. This page intentionally avoids claiming those features.",
    "sections": [
      {
        "id": "repository-evidence",
        "title": "Repository evidence",
        "paragraphs": [
          "The public FoodApp repository is a JavaScript project containing a mernapp folder and root package metadata. Its GitHub About field lists a Vercel deployment address. Those are verifiable artifacts; the exact product flows should be checked in the source code and live application before making stronger claims.",
          "The project is useful as a portfolio appendix because it shows breadth beyond industrial systems and AI pipelines, while more technically documented work remains above it."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "client-side-responsibilities",
        "title": "Client-side responsibilities",
        "paragraphs": [
          "A typical food discovery interface can be decomposed into navigation, item presentation, filters and state transitions. A good frontend keeps product-display components independent from network calls and validates server responses before rendering.",
          "If a cart or ordering flow exists in the source, the review should document its real components and state ownership instead of inferring them from the repository name."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "data-and-api-boundaries",
        "title": "Data and API boundaries",
        "paragraphs": [
          "In a MERN-style stack, the browser should never be trusted as the source of truth for prices, inventory or authorisation. A backend defines domain rules, applies validation, and persists state where necessary.",
          "List APIs benefit from pagination and stable sorting. Image loading should use size-appropriate assets and accessible alternative text."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "reliable-ux-and-testing",
        "title": "Reliable UX and testing",
        "paragraphs": [
          "Web application quality is visible in small states: loading, empty results, errors, keyboard navigation and mobile layouts. Network operations need predictable feedback and a way for users to recover from a failed request.",
          "A portfolio reviewer should be able to run the project locally using reproducible package installation instructions, sample environment variables and clearly separated frontend/backend commands."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "next-documentation-pass",
        "title": "Next documentation pass",
        "paragraphs": [
          "A valuable next step is to review the mernapp folder, record the exact routes and data models, then replace generic domain notes with screenshots and real workflow diagrams.",
          "The live address is presented as a repository-listed link, not as a claim that the deployment was independently function-tested during this rebuild."
        ],
        "points": [],
        "code": "",
        "note": ""
      }
    ],
    "questions": [
      {
        "q": "What is verifiably shown?",
        "a": "The repository, MERN application folder and published Vercel URL."
      },
      {
        "q": "Why avoid claiming payment features?",
        "a": "A repository name alone does not demonstrate a specific checkout or payment integration."
      }
    ],
    "repo": "https://github.com/rohit200x/FoodApp",
    "live": "https://food-app-iota-lovat.vercel.app/"
  },
  {
    "slug": "ultron-communications",
    "title": "Ultron Communication App",
    "subtitle": "Real-time messaging and calling architecture study",
    "group": "Additional / UI & Systems",
    "year": "Previously discussed",
    "summary": "A communications application previously described with Next.js, React, TypeScript, Stream Chat and ZEGOCLOUD.",
    "theme": "violet",
    "technologies": [
      "Next.js",
      "React",
      "TypeScript",
      "Stream Chat",
      "ZEGOCLOUD",
      "Real-time UX"
    ],
    "flow": [
      "Sign-in",
      "Identity & session",
      "Messaging SDK",
      "Call signaling",
      "Audio/video session",
      "UI state updates"
    ],
    "verified": [
      "The supplied screenshots reference a communications app called Ultron and name Next.js, React, TypeScript, Stream Chat and ZEGOCLOUD."
    ],
    "caveat": "This project is visible only in previous discussion screenshots, not in the supplied résumé or inspected repositories. Personal implementation scope and actual features are not verified; the workflow below is architectural explanation, not deployment evidence.",
    "sections": [
      {
        "id": "product-goal",
        "title": "Product goal",
        "paragraphs": [
          "A unified communications interface lets authenticated users exchange messages and start voice or video sessions. The experience appears simple, but realtime systems must coordinate identity, transport, delivery acknowledgments, reconnects, presence and UI transitions.",
          "The screenshots describe Ultron and list Next.js, React, TypeScript, Stream Chat and ZEGOCLOUD. They do not establish a complete codebase or individual feature ownership."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "identity-and-authorisation",
        "title": "Identity and authorisation",
        "paragraphs": [
          "Login is not the same as permission to read any chat. The app server should authenticate a user, issue provider-compatible credentials server-side, and restrict channel membership. Provider secrets must stay off the browser.",
          "Every action—viewing a conversation, uploading a file, starting a call—needs an appropriate permission decision. A frontend channel ID is not sufficient proof of access."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "messaging-system",
        "title": "Messaging system",
        "paragraphs": [
          "A managed chat SDK can handle transport, event fan-out and certain real-time states, letting an application focus on identity, business rules and user experience. The client still needs to distinguish message pending, sent, delivered, read and failed states if supported.",
          "Offline reconnection deserves special attention: pending messages may be retried, events may arrive late, and optimistic UI must reconcile provider IDs without creating duplicate bubbles."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "calls-and-webrtc-concepts",
        "title": "Calls and WebRTC concepts",
        "paragraphs": [
          "An audio/video SDK coordinates access to microphones and cameras, session signaling, media negotiation and participant state. WebRTC is often relevant to realtime media, but the exact internals are SDK-dependent.",
          "Dropped connections should trigger reconnection UX rather than silently displaying an active call. Permissions, muted-state synchronization and device switching are all part of the experience."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "threat-model-and-scale",
        "title": "Threat model and scale",
        "paragraphs": [
          "Security considerations include token leakage, unauthorised channel access, call-room guessing, cross-tenant file access and rate limits. Observability should track join failures, message send failures and dropped-call rates without logging private conversation content.",
          "Scale pressure is generally addressed by delegating real-time fanout to a managed provider, while keeping the application’s own identity and policy model coherent."
        ],
        "points": [],
        "code": "",
        "note": ""
      },
      {
        "id": "how-i-would-discuss-the-stack",
        "title": "How I would discuss the stack",
        "paragraphs": [
          "Next.js provides application structure, React renders interactive views, TypeScript documents contracts, Stream Chat provides messaging primitives and ZEGOCLOUD provides audio/video services. Those are technology roles, not proof of any particular implemented workflow.",
          "If Ultron is included in a job conversation, first confirm the exact features personally built and show source or screenshots if they can be shared."
        ],
        "points": [],
        "code": "",
        "note": ""
      }
    ],
    "questions": [
      {
        "q": "Why use an SDK?",
        "a": "Realtime fan-out and media negotiation are complex; SDKs can reduce infrastructure scope while leaving identity and UX with the app."
      },
      {
        "q": "How do you secure a channel?",
        "a": "Issue credentials server-side and enforce membership, not merely an obscured frontend route."
      }
    ],
    "repo": null,
    "live": null
  }
];
export const featured = projects.slice(0, 6);
export function getProject(slug: string) { return projects.find(project => project.slug === slug); }
