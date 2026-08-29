# LangChain AI Orchestration Showcase

**What this proves:** Production-pattern LangChain.js orchestration — LCEL chains,
bounded memory conversations, RAG pipelines, tool-calling agents, and LangSmith
observability. Every pattern is runnable and has a test vector.

**Portfolio:** [cyber-lazer-mermicorn](https://github.com/cyber-lazer-mermicorn) · Cherry Shanaley

---

## Key patterns

| Pattern | Location | What it proves |
|---|---|---|
| LCEL chain | `lib/chains/` | Composable pipe syntax, typed I/O |
| Bounded memory | `lib/memory/` | Window memory with explicit `k` limit |
| RAG pipeline | `lib/retrievers/` | Chunking, embedding, retrieval |
| Tool-calling agent | `lib/tools/` | Structured tool definitions, safe boundaries |
| LangSmith tracing | env config | Full observability on every chain run |

## Run locally

```bash
npm install
cp .env.example .env   # add OPENAI_API_KEY + LANGCHAIN_API_KEY
npm run demo           # runs all chain demos
npm test               # Vitest suite
```

## Evidence

- Each chain in `lib/chains/` exports `runDemo()` — call it, see output
- LangSmith traces link in console output when `LANGCHAIN_TRACING_V2=true`
- Test suite validates deterministic inputs — run `npm test` to verify

## Honest scope

Showcase-grade: patterns are correct, boundaries are explicit, no production
infrastructure (rate limiting, auth, persistence) is included.
