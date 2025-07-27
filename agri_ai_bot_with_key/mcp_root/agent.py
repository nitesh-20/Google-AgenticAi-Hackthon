from mcp_root.classifier_agent import classifier_agent
from mcp_root.sub_mcps.mcp1_crop_disease.agent import handle_crop_image as mcp1_agent
from mcp_root.sub_mcps.mcp2_gov_scheme.agent import handle_scheme_query as mcp2_agent
from mcp_root.sub_mcps.mcp3_crop_advisory.agent import handle_crop_advice as mcp3_agent

import os
import httpx

class MCPRouter:
    async def route_text(self, query: str):
        classification = await classifier_agent.run(query)
        if classification == "crop_disease":
            return await mcp1_agent(query)
        elif classification == "gov_scheme":
            return await mcp2_agent(query)
        elif classification == "smart_crop":
            return await mcp3_agent(query)
        # Fallback to Gemini if no classification matched
        gemini_response = await self.ask_gemini(query)
        return {"response": gemini_response}

    async def ask_gemini(self, query: str) -> str:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            return "Gemini API key not set. Please set GEMINI_API_KEY in your .env file."
        url = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=" + api_key
        headers = {"Content-Type": "application/json"}
        data = {
            "contents": [
                {"parts": [{"text": query}]}
            ]
        }
        try:
            async with httpx.AsyncClient() as client:
                resp = await client.post(url, headers=headers, json=data, timeout=20)
                resp.raise_for_status()
                result = resp.json()
                # Gemini response parsing
                return result.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "Sorry, no answer from Gemini.")
        except Exception as e:
            return f"Gemini API error: {str(e)}"

    async def route_image(self, file):
        return await mcp1_agent(file)

    async def route_voice(self, file):
        from shared.voice_to_text import convert_voice_to_text
        text = await convert_voice_to_text(file)
        return await self.route_text(text)

mcp_router = MCPRouter()