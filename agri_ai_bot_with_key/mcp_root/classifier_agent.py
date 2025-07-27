class ClassifierAgent:
    async def run(self, query):
        if "disease" in query.lower():
            return "crop_disease"
        elif "scheme" in query.lower():
            return "gov_scheme"
        elif "advice" in query.lower():
            return "smart_crop"
        else:
            return "unknown"

classifier_agent = ClassifierAgent()