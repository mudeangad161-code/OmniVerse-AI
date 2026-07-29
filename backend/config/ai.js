const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: "https://integrate.api.nvidia.com/v1",
});

module.exports = client;
console.log("API Key exists:", !!process.env.NVIDIA_API_KEY);
console.log(
  "API Key prefix:",
  process.env.NVIDIA_API_KEY?.substring(0, 10)
);