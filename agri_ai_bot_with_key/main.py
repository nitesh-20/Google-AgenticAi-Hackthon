import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from mcp_root.agent import mcp_router

# Import AgroAI agent (placeholder, update import as needed)
try:
    from mcp_root.sub_mcps.mcp3_crop_advisory.agent import handle_agroai_query
except ImportError:
    # Placeholder function if not implemented
    async def handle_agroai_query(query: str):
        return {"response": f"AgroAI response for: {query}"}

load_dotenv()
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/query")
async def text_query(query: str = Form(...)):
    result = await mcp_router.route_text(query)
    return JSONResponse(content=result)

# AgroAI Chatbot endpoint
@app.post("/agroai_chat")
async def agroai_chat(query: str = Form(...)):
    """
    Endpoint for AgroAI chatbot queries. Accepts a text query and returns the Gemini/AgroAI agent's response.
    """
    result = await mcp_router.route_text(query)
    return JSONResponse(content=result)

@app.post("/image")
async def image_query(file: UploadFile = File(...)):
    result = await mcp_router.route_image(file)
    return JSONResponse(content=result)

@app.post("/voice")
async def voice_query(file: UploadFile = File(...)):
    result = await mcp_router.route_voice(file)
    return JSONResponse(content=result)