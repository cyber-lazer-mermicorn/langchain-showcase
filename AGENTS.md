# LangChain AI Orchestration Showcase — Agent Doctrine

## What this repo is
Production-grade LangChain.js showcase: chains, agents, RAG pipelines, memory, LangSmith tracing.
By Cherry Shanaley (Chan), AI Solutions Engineer.

## Tech stack
- **Framework:** Next.js 15 (App Router)
- **AI Orchestration:** LangChain.js (latest)
- **Observability:** LangSmith
- **Vector Store:** Supabase pgvector
- **Deployment:** Vercel
- **Language:** TypeScript (strict)

## Coding rules
- TypeScript strict — no `any`
- All chains/agents defined in `lib/chains/` — never inline in route handlers
- LangSmith tracing enabled in all environments via `LANGCHAIN_TRACING_V2=true`
- Memory implementations in `lib/memory/` — use `BufferWindowMemory` with explicit `k` window
- Prompts defined as `ChatPromptTemplate` in `lib/prompts/` — never hardcode prompt strings in chains
- Document loaders in `lib/loaders/` — always chunk with `RecursiveCharacterTextSplitter`
- No `LLMChain` (deprecated) — use LCEL pipe syntax: `prompt | llm | parser`

## Commands
```bash
npm install && npm run dev
npm run test
LANGCHAIN_TRACING_V2=true npm run dev   # with tracing
```

## Do not
- Use deprecated `LLMChain` — use LCEL
- Inline prompt strings in chain definitions
- Disable LangSmith tracing in production
- Use unbounded memory — always set window size
