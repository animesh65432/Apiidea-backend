"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = require("./service");
function generateProjectIdeasWithDiagram(api) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prompt = `
Based on the API endpoint: ${api}, generate 3 unique project ideas.

Each project should be structured as a key-value pair inside a single JavaScript object. Use the following format:

{
  "project1": {
    "name": "Name of the project",
    "description": "Clear explanation of what this project does and how it uses the API.",
    "starterCode": "// Starter code in JavaScript or TypeScript",
    "diagram": "A textual diagram showing system flow (e.g., with boxes and arrows like Mermaid or ASCII style)"
  },
  "project2": {
    ...
  },
  "project3": {
    ...
  }
}

IMPORTANT:
- Do not list all titles first. Each project should be rendered as a full object under a project key.
- Include all fields for each project.
- The diagram should be readable, simple, and show the relationship between components (like UI → Backend → API).
`;
            const response = yield service_1.AI_Model.generateContent(prompt);
            const resultText = yield response.response.text();
            console.log(resultText);
        }
        catch (error) {
            console.error("Error generating project ideas:", error);
        }
    });
}
generateProjectIdeasWithDiagram("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m");
