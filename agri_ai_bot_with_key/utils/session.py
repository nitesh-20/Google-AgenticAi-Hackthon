class InMemorySessionService:
    def __init__(self):
        self.sessions = {}

session_service = InMemorySessionService()