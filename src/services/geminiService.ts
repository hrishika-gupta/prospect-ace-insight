
import { GoogleGenerativeAI } from '@google/generative-ai';

interface ResearchInput {
  companyName: string;
  website: string;
  linkedinData?: string;
}

interface ResearchOutput {
  companySummary: string;
  recentUpdates: string;
  techStack: string;
  hiringFocus: string;
  painPoints: string;
  whatfixInsight: string;
  emailTemplate: string;
  linkedinTemplate: string;
}

export class GeminiResearchService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
  }

  async generateResearch(input: ResearchInput): Promise<ResearchOutput> {
    const prompt = this.buildAdvancedPrompt(input);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return this.parseResponse(text);
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to generate research. Please check your API key and try again.');
    }
  }

  private buildAdvancedPrompt(input: ResearchInput): string {
    return `You are an elite business intelligence analyst specializing in strategic account research for enterprise sales. Your mission is to generate deep, actionable insights that make a BDR sound like they've studied the company for hours.

COMPANY TO RESEARCH:
- Company: ${input.companyName}
- Website: ${input.website}
${input.linkedinData ? `- Additional Context: ${input.linkedinData}` : ''}

ANALYSIS FRAMEWORK:
You must think like a strategic consultant, not just summarize basic facts. Infer business challenges, competitive dynamics, and growth trajectory based on available signals.

REQUIRED OUTPUT SECTIONS (respond with exactly these section headers):

**COMPANY_SUMMARY**
Provide a sophisticated 2-3 sentence analysis covering:
- Core business model and competitive positioning
- Industry context and market dynamics
- Stage of company maturity and strategic focus

**RECENT_UPDATES**
Research and infer recent developments (last 6-12 months):
- Funding rounds, acquisitions, or major partnerships
- Product launches or significant feature releases
- Leadership changes or organizational shifts
- Market expansion or strategic pivots
If no specific news is available, make educated inferences based on company stage and industry trends.

**TECH_STACK**
Analyze and predict their technology infrastructure:
- Core development stack (based on job postings, website tech, industry standards)
- Integration patterns and likely third-party tools
- Technical challenges they likely face at their scale
- Modernization needs or technical debt signals

**HIRING_FOCUS**
Decode their strategic priorities through hiring patterns:
- Key roles they're likely prioritizing (engineering, sales, ops)
- Skills gaps that indicate growth areas or challenges
- Team expansion signals and what they reveal about roadmap
- Internal capability building vs external partnership trends

**PAIN_POINTS**
Generate intelligent hypotheses about their challenges:
- Operational bottlenecks at their current scale
- Customer experience friction points
- Process inefficiencies in their likely workflows
- Technology gaps or integration challenges
- Growth constraints or scalability issues

**WHATFIX_OPPORTUNITY**
Craft a specific, strategic insight:
- Identify ONE key area where Whatfix could create significant impact
- Connect their likely pain points to Whatfix's capabilities
- Quantify potential value (time savings, efficiency gains, etc.)
- Position Whatfix as strategic enabler, not just a tool

**EMAIL_TEMPLATE**
Write a compelling, research-driven email (150-200 words):
- Reference specific company context or recent developments
- Demonstrate understanding of their industry/challenges
- Position Whatfix strategically, not generically
- Include a soft, consultative call-to-action
- Sound like peer-to-peer, not vendor-to-prospect

**LINKEDIN_TEMPLATE**
Create a conversational LinkedIn DM (50-75 words):
- Lead with relevant company insight or congratulation
- Be casual but informed
- Focus on value, not product features
- End with easy engagement opportunity

CRITICAL INSTRUCTIONS:
- Be specific, not generic
- Show deep business understanding
- Make intelligent inferences when facts aren't available
- Sound like an insider, not someone reading their website
- Focus on strategic value, not feature lists
- Use confident, consultative language
- Avoid obvious statements or surface-level observations

Begin your analysis:`;
  }

  private parseResponse(text: string): ResearchOutput {
    const sections = {
      companySummary: this.extractSection(text, 'COMPANY_SUMMARY'),
      recentUpdates: this.extractSection(text, 'RECENT_UPDATES'),
      techStack: this.extractSection(text, 'TECH_STACK'),
      hiringFocus: this.extractSection(text, 'HIRING_FOCUS'),
      painPoints: this.extractSection(text, 'PAIN_POINTS'),
      whatfixInsight: this.extractSection(text, 'WHATFIX_OPPORTUNITY'),
      emailTemplate: this.extractSection(text, 'EMAIL_TEMPLATE'),
      linkedinTemplate: this.extractSection(text, 'LINKEDIN_TEMPLATE'),
    };

    // Fallback to mock data if parsing fails
    return {
      companySummary: sections.companySummary || "Advanced AI analysis of company positioning and strategic focus.",
      recentUpdates: sections.recentUpdates || "Recent developments and strategic initiatives based on market intelligence.",
      techStack: sections.techStack || "Technology infrastructure analysis based on hiring patterns and industry standards.",
      hiringFocus: sections.hiringFocus || "Strategic hiring priorities indicating growth areas and capability gaps.",
      painPoints: sections.painPoints || "Intelligent hypotheses about operational challenges and growth constraints.",
      whatfixInsight: sections.whatfixInsight || "Strategic opportunity for Whatfix to drive measurable business impact.",
      emailTemplate: sections.emailTemplate || "Personalized outreach message based on comprehensive company analysis.",
      linkedinTemplate: sections.linkedinTemplate || "Conversational LinkedIn message demonstrating strategic understanding.",
    };
  }

  private extractSection(text: string, sectionName: string): string {
    const regex = new RegExp(`\\*\\*${sectionName}\\*\\*\\s*([\\s\\S]*?)(?=\\*\\*[A-Z_]+\\*\\*|$)`, 'i');
    const match = text.match(regex);
    return match ? match[1].trim() : '';
  }
}
