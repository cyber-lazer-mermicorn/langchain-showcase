import { ChatOpenAI } from '@langchain/openai';
import { AgentExecutor, createOpenAIFunctionsAgent } from 'langchain/agents';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { DynamicTool } from '@langchain/core/tools';

const model = new ChatOpenAI({ modelName: 'gpt-4-turbo-preview', temperature: 0.7 });

// Custom tools
const tools = [
  new DynamicTool({
    name: 'search',
    description: 'Search for information',
    func: async (query: string) => `Results for: ${query}`,
  }),
  new DynamicTool({
    name: 'calculate',
    description: 'Calculate math expression',
    func: async (expr: string) => eval(expr).toString(),
  }),
];

// Create agent
export async function createAgent() {
  try {
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', 'You are a helpful assistant.'],
      new MessagesPlaceholder('chat_history'),
      ['human', '{input}'],
      new MessagesPlaceholder('agent_scratchpad'),
    ]);

    const agent = await createOpenAIFunctionsAgent({
      llm: model,
      tools,
      prompt,
    });

    return new AgentExecutor({ agent, tools, verbose: true });
  } catch (error: any) {
    throw new Error(`Agent creation error: ${error?.message || 'Unknown error'}`);
  }
}

// Run agent
export async function runAgent(input: string) {
  try {
    const executor = await createAgent();
    return await executor.invoke({ input, chat_history: [] });
  } catch (error: any) {
    throw new Error(`Agent run error: ${error?.message || 'Unknown error'}`);
  }
}
