export class StoryPromptBuilder {
  private childName: string;
  private childAge: number;
  private readingLevel: "beginner" | "intermediate" | "advanced";
  private petName?: string;
  private petType?: string;
  private storyTheme: string;
  private additionalDetails?: string;

  constructor(data: {
    childName: string;
    childAge: number;
    readingLevel: "beginner" | "intermediate" | "advanced";
    petName?: string;
    petType?: string;
    storyTheme: string;
    additionalDetails?: string;
  }) {
    this.childName = data.childName;
    this.childAge = data.childAge;
    this.readingLevel = data.readingLevel;
    this.petName = data.petName;
    this.petType = data.petType;
    this.storyTheme = data.storyTheme;
    this.additionalDetails = data.additionalDetails;
  }

  build(): string {
    const ageRange =
      this.readingLevel === "beginner"
        ? "ages 3-5"
        : this.readingLevel === "intermediate"
          ? "ages 6-8"
          : "ages 9-12";

    let prompt = `Create a children's story with the following details:
          - Main character: ${this.childName}, who is ${this.childAge} years old
          - Reading level: ${this.readingLevel} (${ageRange})
          - Theme: ${this.storyTheme}`;

    if (this.petName && this.petType) {
      prompt += `\n- Pet: ${this.petName} the ${this.petType}`;
    }

    if (this.additionalDetails) {
      prompt += `\n- Additional details: ${this.additionalDetails}`;
    }

    prompt +=
      "\nPlease structure the story in JSON format with a title and content array. The content array should alternate between text and places for illustrations.";

    return prompt;
  }
}
