import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate, PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';

const model = new ChatOpenAI({ modelName: 'gpt-4-turbo-preview', temperature: 0.7 });

// Simple chain
export async function simpleChain(input: string) {
  try {
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', 'You are a helpful assistant.'],
      ['human', '{input}'],
    ]);
    const chain = prompt.pipe(model).pipe(new StringOutputParser());
    return await chain.invoke({ input });
  } catch (error: any) {
    throw new Error(`Chain error: ${error?.message || 'Unknown error'}`);
  }
}

// RAG chain
export async function ragChain(question: string, context: string) {
  try {
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', 'Answer based on context: {context}'],
      ['human', '{question}'],
    ]);
    const chain = prompt.pipe(model).pipe(new StringOutputParser());
    return await chain.invoke({ question, context });
  } catch (error: any) {
    throw new Error(`RAG chain error: ${error?.message || 'Unknown error'}`);
  }
}

// Multi-step chain
export async function multiStepChain(input: string) {
  try {
    const analyzePrompt = PromptTemplate.fromTemplate('Analyze: {input}');
    const summarizePrompt = PromptTemplate.fromTemplate('Summarize: {analysis}');

    const chain = RunnableSequence.from([
      { analysis: analyzePrompt.pipe(model).pipe(new StringOutputParser()) },
      { summary: summarizePrompt.pipe(model).pipe(new StringOutputParser()) },
    ]);

    return await chain.invoke({ input });
  } catch (error: any) {
    throw new Error(`Multi-step chain error: ${error?.message || 'Unknown error'}`);
  }
}
