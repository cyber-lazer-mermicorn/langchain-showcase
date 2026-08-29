# Architecture

## Overview
LangChain.js showcase demonstrating LCEL chains, RAG pipelines, memory, agents, and LangSmith observability.

## Layers

| Layer | Path | Responsibility |
|---|---|---|
| Chains | `lib/chains/` | LCEL chain definitions |
| Prompts | `lib/prompts/` | `ChatPromptTemplate` definitions |
| Memory | `lib/memory/` | Windowed memory implementations |
| Loaders | `lib/loaders/` | Document loaders + splitters |
| API Routes | `app/api/` | Thin handlers invoking chains |
| Tests | `__tests__/` | Chain unit tests with mocked LLM |

## Key patterns

### LCEL
All chains use the pipe operator: `prompt | llm | parser`. No `LLMChain`, no `SequentialChain`.

### RAG pipeline
Documents → `RecursiveCharacterTextSplitter` → OpenAI embeddings → Supabase pgvector. Retrieval via `SupabaseVectorStore.asRetriever()`. Chain: `retriever | formatDocs | prompt | llm | parser`.

### Observability
`LANGCHAIN_TRACING_V2=true` + `LANGCHAIN_API_KEY` enables full LangSmith traces. Every chain run is traceable by project name (`LANGCHAIN_PROJECT`).
