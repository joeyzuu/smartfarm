import { GoogleGenAI } from '@google/genai';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

// Initialize the GoogleGenAI client.
// It automatically looks for the GEMINI_API_KEY environment variable.
const ai = new GoogleGenAI({});

// The main chat function
async function runChat() {
    console.log("--- Gemini CLI Chat Assistant ---");
    console.log("Ask me anything about farming, soil, or crops!");
    console.log("Type 'exit' to quit the chat.\n");

    const rl = readline.createInterface({ input, output });

    // Use gemini-2.5-flash for fast, general-purpose chat
    const chat = ai.chats.create({ model: "gemini-2.5-flash" });

    while (true) {
        const userInput = await rl.question('You: ');

        if (userInput.toLowerCase() === 'exit') {
            console.log("Goodbye! 👋");
            rl.close();
            break;
        }

        if (!userInput.trim()) {
            console.log("Please enter a message.");
            continue;
        }

        try {
            // Send the user's message to the chat
            const response = await chat.sendMessage({ message: userInput });
            
            // Print the model's response text
            console.log(`\nGemini: ${response.text}\n`);

        } catch (error) {
            console.error("\n❌ An error occurred while fetching the response. Check your API key and network connection.");
            console.error(error.message);
            console.log("");
        }
    }
}

runChat();