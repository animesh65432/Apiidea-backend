import { AI_Model } from "../service"

async function generateProjectIdeasWithDiagram(api: string): Promise<{ name: string, description: string, starterCode: string, diagram: string }[]> {
    try {
        const prompt = `
Based on the API endpoint: ${api}, generate 3 unique project ideas.
Return the ideas as an array of objects with the following structure:

[
  {
    "name": "Name of the project",
    "description": "Clear explanation of what this project does and how it uses the API.",
    "starterCode": "// Starter code in JavaScript or TypeScript  and don't use comments and extra line please make code at least 50 line code",
    "diagram": "A simple flow diagram using just text and arrows (→) on a single line. Example: 'User → UI → API → Database'"
  },
  {
    // second project
  },
  {
    // third project
  }
]

IMPORTANT:
- Return exactly 3 projects in an array format
- Include all fields (name, description, starterCode, diagram) for each project
- The diagram should be a SINGLE LINE showing the flow between components using arrow characters (→)
- Use only simple arrows and text for the diagram, no ASCII art or multiline diagrams
- The diagram should clearly show the relationship between components (like UI → Backend → API)
- Return ONLY valid JSON in array format without any additional text, explanations, or markdown formatting
`;

        const response = await AI_Model.generateContent(prompt);
        const resultText = await response.response.text();

        // Look for array format JSON (starts with [ and ends with ])
        const jsonMatch = resultText.match(/\[[\s\S]*\]/);

        if (!jsonMatch) {
            throw new Error("Could not find valid JSON array in the response");
        }

        const jsonString = jsonMatch[0];
        console.log("Extracted JSON array:", jsonString);

        try {
            const parsed = JSON.parse(jsonString);

            // Validate that we got an array with the proper structure
            if (!Array.isArray(parsed)) {
                throw new Error("Parsed result is not an array");
            }

            // Ensure we have exactly 3 projects with required fields
            if (parsed.length !== 3) {
                console.warn(`Expected 3 projects, but got ${parsed.length}`);
            }

            // Verify each project has the required fields
            parsed.forEach((project, index) => {
                const requiredFields = ['name', 'description', 'starterCode', 'diagram'];
                for (const field of requiredFields) {
                    if (!project[field]) {
                        console.warn(`Project ${index + 1} is missing the ${field} field`);
                    }
                }

                // Ensure diagram is a single line
                if (project.diagram && project.diagram.includes('\n')) {
                    console.warn(`Project ${index + 1} diagram contains line breaks, fixing...`);
                    project.diagram = project.diagram.replace(/\n/g, ' ').trim();
                }
            });

            return parsed;
        } catch (parseError) {
            console.error("JSON parsing error:", parseError);
            throw new Error("Failed to parse JSON array");
        }
    } catch (error) {
        console.error("Error generating project ideas:", error);
        // Return a single fallback project in the array format
        return [
            {
                name: "N/A",
                description: "Failed to generate content: " + (error instanceof Error ? error.message : String(error)),
                starterCode: "",
                diagram: "User → Error → Fallback"
            }
        ];
    }
}

export { generateProjectIdeasWithDiagram }