# GitHub Copilot Instructions — LangChain AI Orchestration Showcase

You are working on a LangChain.js showcase by Cherry Shanaley.

## Always
- Use LCEL (LangChain Expression Language): `prompt | llm | parser`
- Define chains in `lib/chains/`, prompts in `lib/prompts/`
- Enable LangSmith tracing via env vars
- Use `RecursiveCharacterTextSplitter` for document chunking
- Set explicit window size on memory implementations

## Never
- Use deprecated `LLMChain` class
- Hardcode prompt strings inside chain files
- Create unbounded memory (no `k` limit)
- Skip LangSmith tracing setup

## Pattern: LCEL chain
```typescript
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
const chain = ChatPromptTemplate.fromTemplate('{question}') | new ChatOpenAI() | new StringOutputParser();
const result = await chain.invoke({ question: 'What is LangChain?' });
```
