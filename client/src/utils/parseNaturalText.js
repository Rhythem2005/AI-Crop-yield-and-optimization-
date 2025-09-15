// import { GoogleGenerativeAI } from "@google/generative-ai";

// if (!process.env.REACT_APP_GEMINI_KEY) {
//   throw new Error("REACT_APP_GEMINI_KEY is required in .env");
// }

// const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash", // lightweight + fast model for parsing
// });

// export const parseNaturalTextToJSON = async (userText) => {
//   const prompt = `
// Convert the following user input about crop details into a JSON object matching this structure:
// {
//   "Crop": "string",
//   "State": "string",
//   "Year": int,
//   "N": float,
//   "P": float,
//   "K": float,
//   "pH": float,
//   "soil_type": "string",
//   "Rainfall": float,
//   "Temp": float,
//   "Humidity": float,
//   "Fertilizer_Type": "string",
//   "Fertilizer_Amount": float,
//   "Pesticide_Amount": float,
//   "sowing_date": "YYYY-MM-DD",
//   "area": float
// }

// User input:
// ${userText}

// ⚠️ Important: Return ONLY valid JSON (no extra text, no explanations).
// `;

//   try {
//     const result = await model.generateContent(prompt);

//     const response = await result.response;
//     const text = response.text();

//     // Try parsing the response as JSON
//     return JSON.parse(text);
//   } catch (err) {
//     console.error("Failed to parse text with Gemini:", err);
//     return null;
//   }
// };
