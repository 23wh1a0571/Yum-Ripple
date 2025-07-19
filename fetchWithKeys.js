// File: src/utils/fetchWithKeys.js
const apiKeys = [
  "6a7953dfe924405c9156c409b0cd1fb4",
  "5575f182c26b46b8b3cc772222b34519",
  "23bd2600d2ff4ef383a5d51f0ec0e296",
  "913adba28865444e8df25c7e65d07279",
  "abdbef560a8a467da1f1a9395b73d2ba",
  "4857c561962d41f7995570839c2406f5",
];

export const fetchWithKeys = async (urlFn) => {
  for (const key of apiKeys) {
    try {
      const url = urlFn(key);
      console.log("🔍 Trying:", url);
      const res = await fetch(url);
      const data = await res.json();

      if (data.status === "failure") {
        console.warn(`❌ API error with key ${key}: ${data.message}`);
        continue;
      }

      console.log("✅ Success with key:", key);
      return data;
    } catch (err) {
      console.error("⚠️ Network error:", err.message);
    }
  }

  throw new Error("All API keys exhausted or invalid.");
};
