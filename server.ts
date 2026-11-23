import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

interface ChatHistoryTurn {
  role: 'user' | 'model';
  text: string;
}

interface CounselorRequestBody {
  message?: string;
  history?: ChatHistoryTurn[];
  stream?: string;
  subjects?: string[];
  language?: 'en' | 'ur' | 'sd';
}

function buildCounselorSystemInstruction(
  stream?: string,
  subjects?: string[],
  language?: 'en' | 'ur' | 'sd'
): string {
  const languageDirective =
    language === 'ur'
      ? 'Respond primarily in clear, encouraging Urdu (اردو) unless the student writes in English or Sindhi, while keeping official degree abbreviations (e.g., BBA, BSCS, CA, ACCA, ADC, BS Zoology) recognizable.'
      : language === 'sd'
        ? 'Respond primarily in clear, encouraging Sindhi (سنڌي) unless the student writes in English or Urdu, while keeping official degree abbreviations (e.g., BBA, BSCS, CA, ACCA, ADC, BS Zoology) recognizable.'
        : 'Respond in clear, encouraging English (or match the language the student writes in if they write in Urdu or Sindhi).';

  const contextLines = [
    stream ? `Student's selected stream: ${stream}` : '',
    subjects && subjects.length > 0
      ? `Student's selected subjects: ${subjects.join(', ')}`
      : '',
  ]
    .filter(Boolean)
    .join('\n');

  return `You are the Academic & Career Guidance Counselor for Government Girls Zubaida College (GGZC), Hyderabad, Sindh, Pakistan (established 1953, affiliated with BISE Hyderabad and University of Sindh, Jamshoro).

Your role is to advise female Intermediate (Class XI & XII) and Undergraduate (BS & Associate Degree) students on university degrees, professional certifications, entry tests, and career opportunities tailored specifically to their Commerce, Science, Computer Science, or Humanities subjects.

OFFICIAL GGZC HYDERABAD CURRICULUM & DEGREE PATHWAYS:
1. Commerce Group (I.Com):
   - Core Subjects: Principles of Accounting (XI, XII), Principles of Commerce (XI), Banking and Money (XII), Economics / Commercial Geography (XI, XII), English (XI, XII), Islamiyat (XI), Pakistan Studies (XII).
   - Direct Progression at GGZC: 2-Year Associate Degree in Commerce (ADC / AD Commerce) affiliated with University of Sindh.
   - University & Professional Paths: BBA / BS Accounting & Finance / BS Commerce / FinTech / Supply Chain Management (University of Sindh Jamshoro, IBA Karachi, LUMS, SZABIST Hyderabad), Chartered Accountancy (CA via ICAP), ACCA, Cost & Management Accounting (ICMAP), State Bank of Pakistan (SBP) & commercial banking tracks, Taxation & Audit, E-Commerce & Digital Entrepreneurship.

2. Pre-Medical Group (BISE Hyderabad):
   - Core Subjects: Biology (Botany & Zoology), Chemistry, Physics, English, Islamiyat (XI), Pakistan Studies (XII).
   - Direct Progression at GGZC: 4-Year BS Zoology (University of Sindh affiliated) or 2-Year Associate Degree in Science (ADS - Physiology & Health Sciences).
   - University & Professional Paths: MBBS & BDS via MDCAT (LUMHS Jamshoro, JSMU, PUMHSW Nawabshah), Pharm-D (Doctor of Pharmacy), DPT (Doctor of Physical Therapy), BS Nursing, BS Biotechnology, BS Biochemistry, BS Microbiology, Human Nutrition & Dietetics, Medical Lab Technology (MLT), Public Health.

3. Pre-Engineering & General Science (Computer Science) Group:
   - Core Subjects: Mathematics, Physics, Chemistry (Pre-Eng) OR Computer Science (C++, Databases, Networking) & Mathematics (CS Group).
   - University & Professional Paths: BS Computer Science, BS Software Engineering, BS Artificial Intelligence, BS Data Science, BS Cyber Security, BE Electrical / Civil / Electronics / Computer Systems (MUET Jamshoro, NED Karachi, QUEST Nawabshah, University of Sindh), Architecture, BS Mathematics / Physics / Statistics.

4. Humanities & Associate Degree (ADA / ADS / ADC):
   - Paths: B.Ed & Educational Leadership, BS Psychology, BS English, Law (5-Year LLB), Media & Mass Communication, Sindh Public Service Commission (SPSC) & CSS Civil Services preparation.

RESPONSE GUIDELINES:
- ${languageDirective}
- Structure your advice cleanly with short headings or bullet points covering:
  1) Top Matching Degree Programs (highlighting on-campus GGZC BS/ADP options where relevant)
  2) Recommended Local Universities & Entry Tests (e.g., University of Sindh Jamshoro, MUET, LUMHS, SZABIST Hyderabad, ICAP/ACCA)
  3) Career Roles & Growth Areas
  4) One Practical Next Step (exam prep, merit focus, or portfolio/skill tip)
- Keep answers focused, accurate, practical, and under ~260 words unless the student asks for a detailed comparison.
- Never invent fake fee numbers or guaranteed admission cutoffs; refer students to official SECCAP, BISE Hyderabad, University of Sindh, or the GGZC Degree Admission Cell for current-year cutoffs.
${contextLines ? `\nCURRENT STUDENT CONTEXT:\n${contextLines}` : ''}`;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.post('/api/career-counselor', async (req: Request, res: Response) => {
    const body = (req.body || {}) as CounselorRequestBody;
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!message) {
      res.status(400).json({ error: 'Please enter a career or degree question.' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(500).json({
        error:
          'AI Career Counselor is awaiting a Gemini API key in Settings > Secrets.',
      });
      return;
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemInstruction = buildCounselorSystemInstruction(
        body.stream,
        Array.isArray(body.subjects) ? body.subjects : undefined,
        body.language
      );

      const safeHistory = Array.isArray(body.history)
        ? body.history
            .filter(
              (turn) =>
                turn &&
                (turn.role === 'user' || turn.role === 'model') &&
                typeof turn.text === 'string' &&
                turn.text.trim().length > 0
            )
            .slice(-10)
            .map((turn) => ({
              role: turn.role,
              parts: [{ text: turn.text.trim() }],
            }))
        : [];

      const chat = ai.chats.create({
        model: 'gemini-4-hydrogen',
        history: safeHistory,
        config: {
          systemInstruction,
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        },
      });

      const response = await chat.sendMessage({ message });
      const reply = response.text?.trim();

      if (!reply) {
        res.status(502).json({
          error: 'The counselor did not return a response. Please try asking again.',
        });
        return;
      }

      res.json({ reply });
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : String(err);
      console.error('Gemini Career Counselor error:', errMessage);

      if (errMessage.includes('PERMISSION_DENIED') || errMessage.includes('API_KEY_INVALID') || errMessage.includes('403') || errMessage.includes('400')) {
        res.status(401).json({
          error:
            'Please verify your Gemini API key in Settings > Secrets.',
        });
        return;
      }

      if (errMessage.includes('RESOURCE_EXHAUSTED') || errMessage.includes('429')) {
        res.status(429).json({
          error:
            'Counselor service is temporarily busy. Please wait a moment and try again.',
        });
        return;
      }

      res.status(500).json({
        error: 'Unable to reach the AI Career Counselor right now. Please try again shortly.',
      });
    }
  });

  interface TutorRequestBody {
    message?: string;
    history?: ChatHistoryTurn[];
    subject?: string;
    level?: string;
    mode?: 'concept' | 'exam-answer' | 'practical' | 'quiz';
    language?: 'en' | 'ur' | 'sd';
  }

  function buildSubjectTutorSystemInstruction(
    subject?: string,
    level?: string,
    mode?: TutorRequestBody['mode'],
    language?: 'en' | 'ur' | 'sd'
  ): string {
    const languageDirective =
      language === 'ur'
        ? 'Respond primarily in clear, supportive Urdu (اردو) unless the student writes in English or Sindhi. Keep standard scientific formulas, C++/SQL syntax, and accounting terms in English alongside Urdu explanations.'
        : language === 'sd'
          ? 'Respond primarily in clear, supportive Sindhi (سنڌي) unless the student writes in English or Urdu. Keep standard scientific formulas, C++/SQL syntax, and accounting terms in English alongside Sindhi explanations.'
          : 'Respond in clear, encouraging English (or match the student’s language if they write in Urdu or Sindhi).';

    const modeDirective =
      mode === 'exam-answer'
        ? 'Format the response as a high-scoring BISE Hyderabad / University of Sindh written exam answer: concise Definition, numbered Key Points/Headings, Formula/Diagram notes (if applicable), and a brief Marking Tip.'
        : mode === 'practical'
          ? 'Focus on the new Sindh Textbook Board (Jamshoro) unified paper pattern where Practical-Based Questions appear directly inside the written exam paper: cover Apparatus/Requirements, Principle/Formula, Step-by-Step Procedure or Observation Table / C++ or SQL dry-run, and Precautions.'
          : mode === 'quiz'
            ? 'Generate 3 realistic BISE Hyderabad / University of Sindh style Multiple Choice Questions (MCQs) on the requested topic with options (a)–(d), followed by a clearly separated Answer Key with a 1-sentence explanation for each.'
            : 'Explain the concept step by step from fundamentals, include one clear worked example or real-life analogy, and finish with one quick check-yourself question.';

    return `You are the AI Subject Tutor for Government Girls Zubaida College (GGZC), Hyderabad, Sindh, Pakistan (affiliated with BISE Hyderabad for Class XI–XII and University of Sindh, Jamshoro for BS Zoology & Associate Degree programs).

SELECTED CONTEXT:
- Subject: ${subject || 'General College Subject'}
- Academic Level: ${level || 'Intermediate (Class XI–XII) / Undergraduate'}
- Study Mode: ${mode || 'concept'}

TUTORING RULES:
- ${languageDirective}
- ${modeDirective}
- Align strictly with Sindh Textbook Board (Jamshoro) and BISE Hyderabad / University of Sindh syllabi.
- For numericals (Physics, Chemistry, Mathematics, Accounting), show every formula, substitution, and unit clearly.
- For Computer Science, use clean code blocks for C++ or SQL and explain line-by-line output clearly.
- Keep responses focused, accurate, encouraging, and well-structured (~180–320 words unless a multi-step numerical requires slightly more).
- If a student shares an incorrect attempt or misconception, gently point out the exact step where it went off track and guide them to the right method.`;
  }

  app.post('/api/subject-tutor', async (req: Request, res: Response) => {
    const body = (req.body || {}) as TutorRequestBody;
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!message) {
      res.status(400).json({ error: 'Please enter a subject question or topic.' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(500).json({
        error: 'AI Subject Tutor is awaiting a Gemini API key in Settings > Secrets.',
      });
      return;
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemInstruction = buildSubjectTutorSystemInstruction(
        body.subject,
        body.level,
        body.mode,
        body.language
      );

      const safeHistory = Array.isArray(body.history)
        ? body.history
            .filter(
              (turn) =>
                turn &&
                (turn.role === 'user' || turn.role === 'model') &&
                typeof turn.text === 'string' &&
                turn.text.trim().length > 0
            )
            .slice(-10)
            .map((turn) => ({
              role: turn.role,
              parts: [{ text: turn.text.trim() }],
            }))
        : [];

      const chat = ai.chats.create({
        model: 'gemini-4-hydrogen',
        history: safeHistory,
        config: {
          systemInstruction,
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        },
      });

      const response = await chat.sendMessage({ message });
      const reply = response.text?.trim();

      if (!reply) {
        res.status(502).json({
          error: 'The tutor did not return a response. Please try asking again.',
        });
        return;
      }

      res.json({ reply });
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : String(err);
      console.error('Gemini Subject Tutor error:', errMessage);

      if (
        errMessage.includes('PERMISSION_DENIED') ||
        errMessage.includes('API_KEY_INVALID') ||
        errMessage.includes('403') ||
        errMessage.includes('400')
      ) {
        res.status(401).json({
          error: 'Please verify your Gemini API key in Settings > Secrets.',
        });
        return;
      }

      if (errMessage.includes('RESOURCE_EXHAUSTED') || errMessage.includes('429')) {
        res.status(429).json({
          error: 'Tutor service is temporarily busy. Please wait a moment and try again.',
        });
        return;
      }

      res.status(500).json({
        error: 'Unable to reach the AI Subject Tutor right now. Please try again shortly.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      const indexFile = path.join(distDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build output not found. Run npm run build first.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
