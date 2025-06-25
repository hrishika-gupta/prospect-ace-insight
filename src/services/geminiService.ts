
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
    const prompt = this.buildStrategicPrompt(input);
    
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

  private buildStrategicPrompt(input: ResearchInput): string {
    return `🎯 MISSION: You are a senior enterprise strategist at Whatfix conducting executive-level pre-call research for ultra-personalized outreach.

RESEARCH TARGET:
Company: ${input.companyName}
Website: ${input.website}
${input.linkedinData ? `Additional Context: ${input.linkedinData}` : ''}

CONTEXT: Whatfix is a Digital Adoption Platform + Product Analytics solution that helps enterprises onboard users, reduce support tickets, and accelerate software adoption.

🔍 ANALYSIS FRAMEWORK:
Think like a McKinsey consultant preparing a deal strategy document. Provide deep business intelligence, not Wikipedia summaries. Make intelligent inferences based on company signals, industry dynamics, and growth patterns.

📋 REQUIRED OUTPUT SECTIONS (use exactly these headers):

**COMPANY_OVERVIEW**
Provide a detailed 3-4 sentence analysis covering:
- Core business model and their specific role in the value chain
- Industry positioning and competitive landscape context
- Geographic footprint and operational complexity
- Business maturity stage and strategic focus areas

**PRODUCT_PORTFOLIO**
Analyze their offering structure:
- Major product/service lines and business model (subscription, transactional, hybrid)
- Channel strategy (direct, partner, reseller networks)
- Customer segments and go-to-market approach
- Unique operational characteristics or market differentiators

**RECENT_EVENTS**
Research and chronologically list recent developments (last 12-18 months):
- Funding rounds, acquisitions, or strategic partnerships
- Product launches, feature releases, or platform updates
- Leadership changes or organizational restructuring
- Market expansion, ESG initiatives, or regulatory compliance updates
Format: [Date] - [Event] → Strategic Insight: [What this signals about priorities/direction]

**TECH_STACK**
Intelligent analysis of their technology infrastructure:
- Core systems they likely use (ERP, CRM, analytics platforms)
- Integration patterns based on their business model and scale
- Digital transformation stage and modernization needs
- Technology challenges at their current scale and complexity

**HIRING_FOCUS**
Decode strategic priorities through talent acquisition:
- Key roles being prioritized (from careers pages, LinkedIn, job boards)
- Skills gaps indicating growth areas or operational challenges
- Team expansion signals and what they reveal about roadmap
- Internal capability building vs external partnership strategies

**PAIN_POINTS**
Generate strategic hypotheses about their challenges:
- Operational bottlenecks given their business model and scale
- Customer experience friction points across their value chain
- Process inefficiencies in complex operations or integrations
- Technology debt or system integration challenges
- Growth constraints, compliance burdens, or scalability issues

**WHATFIX_OPPORTUNITY**
Craft specific, quantified value propositions:
- Identify 2-3 key areas where Whatfix DAP + Analytics creates measurable impact
- Connect their likely pain points to specific Whatfix capabilities
- Quantify potential outcomes (% reduction in tickets, faster onboarding, etc.)
- Position Whatfix as strategic enabler for their growth/efficiency goals

**EMAIL_TEMPLATE**
Write a consultative email (150-180 words):
- Open with specific company insight or recent development reference
- Demonstrate deep understanding of their business challenges
- Position Whatfix strategically with quantified value
- Include soft, peer-to-peer call-to-action
- Sound like a strategic advisor, not a vendor

**LINKEDIN_TEMPLATE**
Create a conversational LinkedIn DM (60-80 words):
- Lead with relevant company congratulation or insight
- Be personable but professionally informed
- Focus on strategic value, not product features
- End with easy engagement opportunity (not meeting request)

🎯 EXECUTION STANDARDS:
- Be specific and analytical, avoid generic business speak
- Make intelligent inferences when direct data isn't available
- Use confident, consultative language befitting enterprise strategy
- Include quantified insights and business metrics where possible
- Demonstrate insider knowledge without stating obvious facts
- Focus on strategic implications, not surface-level observations

Begin your strategic analysis:`;
  }

  private parseResponse(text: string): ResearchOutput {
    const sections = {
      companySummary: this.extractSection(text, 'COMPANY_OVERVIEW'),
      recentUpdates: this.extractSection(text, 'RECENT_EVENTS'),
      techStack: this.extractSection(text, 'TECH_STACK'),
      hiringFocus: this.extractSection(text, 'HIRING_FOCUS'),
      painPoints: this.extractSection(text, 'PAIN_POINTS'),
      whatfixInsight: this.extractSection(text, 'WHATFIX_OPPORTUNITY'),
      emailTemplate: this.extractSection(text, 'EMAIL_TEMPLATE'),
      linkedinTemplate: this.extractSection(text, 'LINKEDIN_TEMPLATE'),
    };

    // Enhanced fallback with strategic context
    return {
      companySummary: sections.companySummary || "Strategic analysis of company positioning, value chain role, and competitive dynamics within their industry ecosystem.",
      recentUpdates: sections.recentUpdates || "Recent strategic developments, partnerships, and initiatives indicating company direction and growth priorities.",
      techStack: sections.techStack || "Technology infrastructure analysis based on business model complexity, scale requirements, and digital transformation stage.",
      hiringFocus: sections.hiringFocus || "Strategic hiring priorities revealing internal capability gaps, growth areas, and operational optimization needs.",
      painPoints: sections.painPoints || "Intelligent hypotheses about operational challenges, growth constraints, and efficiency opportunities at their current scale.",
      whatfixInsight: sections.whatfixInsight || "Strategic opportunity for Whatfix to drive measurable business impact through digital adoption acceleration and analytics-driven optimization.",
      emailTemplate: sections.emailTemplate || "Personalized outreach message demonstrating strategic understanding of their business challenges and Whatfix value alignment.",
      linkedinTemplate: sections.linkedinTemplate || "Conversational LinkedIn message showing industry insight and strategic value proposition relevance.",
    };
  }

  private extractSection(text: string, sectionName: string): string {
    const regex = new RegExp(`\\*\\*${sectionName}\\*\\*\\s*([\\s\\S]*?)(?=\\*\\*[A-Z_]+\\*\\*|$)`, 'i');
    const match = text.match(regex);
    return match ? match[1].trim() : '';
  }
}
