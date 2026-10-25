export type ToolCategory = "Calculators" | "Text & Developer" | "Productivity" | "Image & Files";

export type SiteTool = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: ToolCategory;
  icon: string;
  keywords: string[];
};

export const tools: SiteTool[] = [
  { slug: "bmi-calculator", name: "BMI Calculator", shortDescription: "Estimate body mass index from height and weight.", description: "Calculate body mass index (BMI) using your height and weight. BMI is a screening measure, not a diagnosis, and does not account for every aspect of health or body composition.", category: "Calculators", icon: "activity", keywords: ["health", "weight", "height", "body mass index"] },
  { slug: "age-calculator", name: "Age Calculator", shortDescription: "Calculate your age in years, months, and days.", description: "Calculate the calendar difference between a date of birth and today, or another date you choose.", category: "Calculators", icon: "calendar-days", keywords: ["birthday", "date", "years", "months"] },
  { slug: "percentage-calculator", name: "Percentage Calculator", shortDescription: "Find a percentage, percentage change, or share of a value.", description: "Quickly calculate what percentage one number is of another, or find a percentage of a value.", category: "Calculators", icon: "percent", keywords: ["math", "school", "increase", "decrease"] },
  { slug: "gst-calculator", name: "GST Calculator", shortDescription: "Add or extract GST and see the tax amount clearly.", description: "Estimate a goods and services tax amount using a rate you select. Confirm the correct rate for your goods or services before using the result for billing or tax filing.", category: "Calculators", icon: "receipt-text", keywords: ["India", "tax", "bill", "inclusive", "exclusive"] },
  { slug: "discount-calculator", name: "Discount Calculator", shortDescription: "Find the savings and final price after a discount.", description: "Calculate the amount saved and the final price after applying a percentage discount.", category: "Calculators", icon: "tags", keywords: ["sale", "shopping", "savings"] },
  { slug: "emi-calculator", name: "EMI Calculator", shortDescription: "Estimate monthly loan payments and total interest.", description: "Estimate the monthly instalment, total repayment, and interest for a reducing-balance loan. Lenders may use different fees, dates, and rounding rules.", category: "Calculators", icon: "landmark", keywords: ["loan", "monthly payment", "interest", "finance"] },
  { slug: "compound-interest-calculator", name: "Compound Interest Calculator", shortDescription: "Project growth with a chosen rate and compounding frequency.", description: "Estimate the future value of a principal amount when interest compounds at a fixed rate. Actual returns vary and are not guaranteed.", category: "Calculators", icon: "chart-no-axes-combined", keywords: ["investment", "savings", "return"] },
  { slug: "word-counter", name: "Word Counter", shortDescription: "Count words, characters, sentences, and paragraphs.", description: "Count words, characters, sentences, and paragraphs in text you type or paste. Text is processed in your browser.", category: "Text & Developer", icon: "type", keywords: ["writing", "essay", "characters", "paragraph"] },
  { slug: "case-converter", name: "Text Case Converter", shortDescription: "Convert text to uppercase, lowercase, title case, or sentence case.", description: "Convert pasted text to common letter cases, then copy the result for use in documents, titles, and messages.", category: "Text & Developer", icon: "case-sensitive", keywords: ["uppercase", "lowercase", "title case"] },
  { slug: "json-formatter", name: "JSON Formatter & Validator", shortDescription: "Validate JSON and format or minify it in your browser.", description: "Check whether JSON text is valid and format it for readability or minify it for compact storage. No server upload is needed.", category: "Text & Developer", icon: "braces", keywords: ["developer", "format", "minify", "validate", "api"] },
  { slug: "password-generator", name: "Password Generator", shortDescription: "Generate a random password in your browser.", description: "Generate a random password with a configurable length and character groups using the browser's cryptographic random generator. Store passwords in a trusted password manager.", category: "Productivity", icon: "shield-check", keywords: ["security", "random", "strong password"] },
  { slug: "random-number-generator", name: "Random Number Generator", shortDescription: "Generate random integers inside a range.", description: "Generate one or more random integers between a minimum and maximum value, inclusive.", category: "Productivity", icon: "dices", keywords: ["lottery", "dice", "random picker"] },
  { slug: "unit-converter", name: "Length Unit Converter", shortDescription: "Convert millimetres, metres, kilometres, inches, feet, and miles.", description: "Convert common units of length using fixed conversion factors. Results are rounded for readability.", category: "Calculators", icon: "ruler", keywords: ["cm", "metres", "feet", "inches", "miles"] },
  { slug: "temperature-converter", name: "Temperature Converter", shortDescription: "Convert Celsius, Fahrenheit, and Kelvin.", description: "Convert temperatures between Celsius, Fahrenheit, and Kelvin with the standard conversion formulas.", category: "Calculators", icon: "thermometer", keywords: ["celsius", "fahrenheit", "kelvin"] },
  { slug: "image-compressor", name: "Image Compressor", shortDescription: "Reduce image file size in your browser and download the result.", description: "Compress a supported image to JPEG using your browser. Images are processed locally and are not uploaded by this tool. Compression may change image format and quality.", category: "Image & Files", icon: "file-image", keywords: ["photo", "jpg", "jpeg", "image size"] },
  { slug: "todo-list", name: "Simple To-Do List", shortDescription: "Add, complete, and remove tasks saved in this browser.", description: "Keep a lightweight task list in local browser storage. Tasks remain on this device and are not synced between browsers.", category: "Productivity", icon: "list-checks", keywords: ["tasks", "checklist", "planner"] },
];

export const toolCategories: Array<"All tools" | ToolCategory> = ["All tools", "Calculators", "Text & Developer", "Productivity", "Image & Files"];

export function getTool(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}
