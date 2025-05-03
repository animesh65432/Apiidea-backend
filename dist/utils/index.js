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
exports.generateProjectIdeasWithDiagram = generateProjectIdeasWithDiagram;
const service_1 = require("../service");
function generateProjectIdeasWithDiagram(api) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prompt = `
Based on the API endpoint: ${api}, generate 3 unique project ideas.
Return the ideas as an array of objects with the following structure:

[
  {
    "name": "Name of the project",
    "description": "Clear explanation of what this project does and how it uses the API.",
    "starterCode": "// Starter code in JavaScript or TypeScript that demonstrates how to use the API and statrtcode for these app in these app atleast 80 lines",
    "diagram": "A simple flow diagram using just text and arrows (→) on a single line. Example: 'User → UI → API → Database'"
  }
]

IMPORTANT:
- Return exactly 3 projects in an array format
- Include all fields (name, description, starterCode, diagram) for each project
- The starterCode should be properly escaped JSON string without line breaks in the JSON itself (use \\n for line breaks in code)
- The diagram should be a SINGLE LINE showing the flow between components using arrow characters (→)
- Use only simple arrows and text for the diagram, no ASCII art or multiline diagrams
- Return ONLY valid JSON in array format without any additional text, explanations, or markdown formatting
`;
            const response = yield service_1.AI_Model.generateContent(prompt);
            const resultText = yield response.response.text();
            let jsonString = "";
            let bracketCount = 0;
            let startIndex = -1;
            for (let i = 0; i < resultText.length; i++) {
                if (resultText[i] === '[') {
                    startIndex = i;
                    break;
                }
            }
            if (startIndex === -1) {
                throw new Error("Could not find valid JSON array in the response");
            }
            for (let i = startIndex; i < resultText.length; i++) {
                const char = resultText[i];
                if (char === '[')
                    bracketCount++;
                if (char === ']')
                    bracketCount--;
                jsonString += char;
                if (bracketCount === 0 && jsonString.length > 1) {
                    break;
                }
            }
            console.log("Extracted JSON array:", jsonString);
            try {
                const parsed = JSON.parse(jsonString);
                if (!Array.isArray(parsed)) {
                    throw new Error("Parsed result is not an array");
                }
                const validatedProjects = parsed.map((project, index) => {
                    const requiredFields = ['name', 'description', 'starterCode', 'diagram'];
                    const validatedProject = {};
                    for (const field of requiredFields) {
                        validatedProject[field] = project[field] ||
                            (field === 'name' ? `Project ${index + 1}` :
                                field === 'description' ? 'No description provided' :
                                    field === 'starterCode' ? '// No starter code provided' :
                                        'User → API');
                    }
                    if (validatedProject.diagram.includes('\n')) {
                        validatedProject.diagram = validatedProject.diagram.replace(/\n/g, ' ').trim();
                    }
                    return validatedProject;
                });
                const finalProjects = validatedProjects.slice(0, 3);
                while (finalProjects.length < 3) {
                    finalProjects.push({
                        name: `Additional Project ${finalProjects.length + 1}`,
                        description: `A simple project using the ${api} API.`,
                        starterCode: `async function fetchData() {\n  const response = await fetch('${api}');\n  const data = await response.json();\n  return data;\n}\n\nfetchData().then(console.log).catch(console.error);`,
                        diagram: `User → UI → ${api} → Display Results`
                    });
                }
                return finalProjects;
            }
            catch (parseError) {
                console.error("JSON parsing error:", parseError);
                throw new Error(`Failed to parse JSON array: ${parseError}`);
            }
        }
        catch (error) {
            console.error("Error generating project ideas:", error);
            return [
                {
                    name: `${api} Data Viewer`,
                    description: `A simple application that fetches and displays data from the ${api} API.`,
                    starterCode: `async function fetchData() {\n  const response = await fetch('${api}');\n  const data = await response.json();\n  console.log(data);\n  document.getElementById('results').textContent = JSON.stringify(data, null, 2);\n}\n\ndocument.getElementById('fetchButton').addEventListener('click', fetchData);\n`,
                    diagram: `User → UI → ${api} → Display Results`
                },
                {
                    name: `${api} Data Explorer`,
                    description: `An interactive tool to explore and filter data from the ${api} API.`,
                    starterCode: `let cachedData = [];\n\nasync function fetchAllData() {\n  const response = await fetch('${api}');\n  cachedData = await response.json();\n  renderData(cachedData);\n}\n\nfunction renderData(data) {\n  const container = document.getElementById('results');\n  container.innerHTML = '';\n  data.forEach(item => {\n    const div = document.createElement('div');\n    div.textContent = JSON.stringify(item);\n    container.appendChild(div);\n  });\n}\n\ndocument.getElementById('fetchButton').addEventListener('click', fetchAllData);\n`,
                    diagram: `User → UI → ${api} → Data Processing → Interactive Display`
                },
                {
                    name: `${api} Dashboard`,
                    description: `A dashboard that visualizes key metrics and insights from the ${api} API.`,
                    starterCode: `async function fetchAndVisualize() {\n  const response = await fetch('${api}');\n  const data = await response.json();\n  \n  // Process data for visualization\n  const processedData = processData(data);\n  \n  // Render charts\n  renderCharts(processedData);\n}\n\nfunction processData(data) {\n  // Example processing logic\n  return {\n    counts: data.reduce((acc, item) => {\n      acc[item.category] = (acc[item.category] || 0) + 1;\n      return acc;\n    }, {}),\n    totals: data.reduce((sum, item) => sum + (item.value || 0), 0)\n  };\n}\n\nfunction renderCharts(data) {\n  document.getElementById('summary').textContent = \`Total: \${data.totals}\`;\n  \n  const categories = Object.keys(data.counts);\n  categories.forEach(category => {\n    const div = document.createElement('div');\n    div.textContent = \`\${category}: \${data.counts[category]}\`;\n    document.getElementById('charts').appendChild(div);\n  });\n}\n\ndocument.getElementById('analyzeButton').addEventListener('click', fetchAndVisualize);\n`,
                    diagram: `User → Dashboard UI → ${api} → Data Analysis → Charts & Metrics`
                }
            ];
        }
    });
}
