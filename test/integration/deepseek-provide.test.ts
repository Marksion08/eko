import { DeepseekProvider } from '../../src/services/llm/deepseek-provider';
import { Message } from '../../src/types/llm.types';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

async function main() {
  // Initialize the provider
  const provider = new DeepseekProvider(process.env.DEEPSEEK_API_KEY || '', 'deepseek-chat');

  // Prepare messages
  const messages: Message[] = [
    {
      role: 'system',
      content: 'You are a helpful assistant.',
    },
    {
      role: 'user',
      content: 'What is the capital of France?',
    },
  ];

  try {
    // Generate text
    console.log('Generating text...');
    const response = await provider.generateText(messages, {
      temperature: 0.7,
      maxTokens: 100,
    });
    console.log('Response:', response.textContent);

    // Generate stream
    console.log('\nGenerating stream...');
    await provider.generateStream(
      messages,
      {
        temperature: 0.7,
        maxTokens: 100,
      },
      {
        onStart: () => console.log('Stream started'),
        onContent: (content) => process.stdout.write(content),
        onComplete: (response) => console.log('\nStream completed'),
        onError: (error) => console.error('Stream error:', error),
      }
    );
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the example
main();