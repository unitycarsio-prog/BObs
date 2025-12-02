import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRoast = async (level: string): Promise<string> => {
  try {
    const prompt = `
      You are the best friend of a guy named "Aayan" (nickname: Aayan bobs). 
      It is his birthday (Born December 2, 2011).
      Your goal is to write a short, funny, slang-heavy message for him.
      
      Rules:
      1. NO emotional stuff. No "cherish our friendship" or "best wishes".
      2. Use Gen Z/Gen Alpha slang (e.g., "no cap", "bet", "fanum tax", "skibidi", "Ohio", "sigma", "mogging").
      3. Call him "Aayan bobs".
      4. If the level is 'SAVAGE', roast him about being a 2011 baby (Gen Alpha).
      5. If the level is 'LIGHT', just hype him up in a funny way.
      6. Keep it under 2 sentences.
      
      Level requested: ${level}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Bro, the AI gave up on you. That's an L.";
  } catch (error) {
    console.error("Gemini crashed trying to roast Aayan:", error);
    return "Gemini is down, but you're still down bad. Happy bday.";
  }
};

export const generateHype = async (): Promise<string> => {
  try {
    const prompt = `
      You are Aayan Bobs' personal hype man.
      Write a SHORT, POSITIVE, WHOLESOME birthday message using Gen Z slang.
      Focus on him being a "W friend", "Goated", "Legend", or having "Aura".
      
      Rules:
      1. Keep it cool. No sappy essays.
      2. Use slang like: "W mans", "Goated", "Valid", "Him", "Chef's kiss".
      3. It's his birthday. Hype him up.
      
      Example: "Aayan is actually Him. Lowkey the funniest guy in the server. W Birthday."
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Aayan is a W friend. No cap.";
  } catch (error) {
    console.error("Gemini hype error:", error);
    return "You dropped this king 👑";
  }
};

export const generateRumor = async (): Promise<string> => {
  try {
    const prompt = `
      Generate a completely fake, ridiculous, and chaotic rumor about "Aayan Bobs". 
      Use Gen Z slang. Make it sound like "tea" or "gossip".
      Examples: 
      - "I heard Aayan got fanum taxed by a toddler at McDonalds."
      - "Sources say Aayan thinks he's the main character but he's actually an NPC."
      - "Word on the street is Aayan has negative rizz."
      
      Keep it short, funny, and ABSOLUTELY NO EMOTIONAL WRITING.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "I heard Aayan tried to download RAM and failed.";
  } catch (error) {
    console.error("Gemini error:", error);
    return "I heard Aayan broke the internet (literally, the wifi is down).";
  }
};

export const generateArchiveEntry = async (): Promise<{title: string, content: string}> => {
  try {
    const prompt = `
      Write a short, funny, fictional "historical record" or "diary entry" about Aayan Bobs from the "Archives".
      It should be 100% fake, ridiculous, and use Gen Z slang.
      He was born Dec 2, 2011.
      
      Examples:
      Title: "The Great fumble of 2023"
      Content: "Aayan tried to talk to a girl and forgot his own name. He literally said 'Hello, I am potato'. Historic L."

      Title: "The Gym Arc"
      Content: "Aayan went to the gym once, took 50 selfies, and never went back. He claims it was 'bulking season'."
      
      Return JSON with 'title' and 'content'.
      NO EMOTIONAL WRITING.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING },
          },
          required: ["title", "content"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No text returned");
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini archive error:", error);
    return {
      title: "File Corrupted",
      content: "The simulation failed to load this memory because Aayan's aura was too weak."
    };
  }
};

// Chatbot Instance
let chatSession: any = null;

export const getChatResponse = async (message: string): Promise<string> => {
  try {
    if (!chatSession) {
      chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: `
            You are "BobsBot", an AI dedicated to roasting and discussing Aayan Bobs. 
            He is your best friend but you have ZERO chill.
            
            Personality:
            - Heavy Gen Z/Alpha slang (no cap, fr, bet, finna, opps, crash out, glaze, skibidi, ohio).
            - You think Aayan is "mid" or an "NPC".
            - You are funny, chaotic, and informal.
            - NEVER be polite. NEVER write long paragraphs. Keep it snappy like a text message.
            - Context: He was born Dec 2, 2011. He is a 2011 baby.
            - If asked about his age: "He's literally a Gen Alpha kid born in 2011."
            - If asked about his skills: "Skill issue detected."
          `,
        },
      });
    }

    const response = await chatSession.sendMessage({ message });
    return response.text || "Error 404: Aayan's brain not found.";
  } catch (error) {
    console.error("Chat error:", error);
    // Reset session on error just in case
    chatSession = null;
    return "My wifi is tweaking just like Aayan.";
  }
};