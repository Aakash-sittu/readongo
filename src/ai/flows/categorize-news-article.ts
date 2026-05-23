'use server';
/**
 * @fileOverview A Genkit flow for categorizing news articles into relevant sectors.
 *
 * - categorizeNewsArticle - A function that categorizes a news article.
 * - CategorizeNewsArticleInput - The input type for the categorizeNewsArticle function.
 * - CategorizeNewsArticleOutput - The return type for the categorizeNewsArticle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeNewsArticleInputSchema = z.object({
  title: z.string().describe('The title or headline of the news article.'),
  url: z.string().url().describe('The URL of the news article.'),
  summary: z.string().describe('A one-sentence summary of the news article.'),
});
export type CategorizeNewsArticleInput = z.infer<typeof CategorizeNewsArticleInputSchema>;

const CategorizeNewsArticleOutputSchema = z.object({
  category: z.string().describe('The assigned category for the news article (e.g., "AI/ML", "Tech", "Product").'),
});
export type CategorizeNewsArticleOutput = z.infer<typeof CategorizeNewsArticleOutputSchema>;

export async function categorizeNewsArticle(input: CategorizeNewsArticleInput): Promise<CategorizeNewsArticleOutput> {
  return categorizeNewsArticleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeNewsArticlePrompt',
  input: {schema: CategorizeNewsArticleInputSchema},
  output: {schema: CategorizeNewsArticleOutputSchema},
  prompt: `You are an expert news article categorizer specializing in technology and business.
Your task is to analyze the provided news article's title and summary and assign it to a single, concise category.
Consider categories such as 'AI/ML', 'Tech', 'Product', 'Software Development', 'Cybersecurity', 'Fintech', 'Hardware', 'Biotech', 'E-commerce', 'Cloud Computing', 'Data Science', 'Startups', 'Venture Capital', 'Gaming', 'Automotive Tech', 'Space Exploration', 'Green Tech', 'Robotics', 'Web3'. If none of these fit perfectly, use your best judgment to create a new, fitting category that is concise and descriptive.

Article Title: {{{title}}}
Article Summary: {{{summary}}} 

Provide ONLY the category name in the 'category' field of the JSON output. Do not include any other text or explanation outside the JSON.`,
});

const categorizeNewsArticleFlow = ai.defineFlow(
  {
    name: 'categorizeNewsArticleFlow',
    inputSchema: CategorizeNewsArticleInputSchema,
    outputSchema: CategorizeNewsArticleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
