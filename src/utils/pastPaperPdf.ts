import { PastPaperItem } from '../data/examPrepData';

function sanitizePdfAscii(text: string): string {
  return text
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, '-')
    .replace(/·/g, '|')
    .replace(/°/g, ' deg')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/⁺/g, '+')
    .replace(/⁻/g, '-')
    .replace(/₀/g, '0')
    .replace(/₁/g, '1')
    .replace(/₂/g, '2')
    .replace(/₃/g, '3')
    .replace(/₄/g, '4')
    .replace(/₅/g, '5')
    .replace(/₆/g, '6')
    .replace(/×/g, 'x')
    .replace(/→/g, '->')
    .replace(/ω/g, 'w')
    .replace(/θ/g, 'theta')
    .replace(/−/g, '-')
    .replace(/≈/g, '~=')
    .replace(/[^\x20-\x7E]/g, ' ');
}

function escapePdfString(text: string): string {
  return sanitizePdfAscii(text)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

function wrapText(text: string, maxChars = 86): string[] {
  const clean = sanitizePdfAscii(text).trim();
  if (!clean) return [''];
  const words = clean.split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    if (!current) {
      current = word;
    } else if (current.length + 1 + word.length <= maxChars) {
      current += ' ' + word;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

interface PdfLine {
  text: string;
  bold?: boolean;
  size?: number;
  spaceBefore?: number;
}

function buildPaperLines(paper: PastPaperItem): PdfLine[] {
  const lines: PdfLine[] = [
    { text: 'GOVERNMENT GIRLS ZUBAIDA COLLEGE, HYDERABAD', bold: true, size: 13 },
    { text: 'Examination Preparation & Past Papers Archive (Estd. 1953)', size: 10 },
    { text: '--------------------------------------------------------------------------------', size: 9, spaceBefore: 4 },
    { text: `${paper.subject} (${paper.levelLabel})`, bold: true, size: 12, spaceBefore: 6 },
    {
      text: `Code: ${paper.code} | ${paper.boardOrUniversity} | Session ${paper.year}`,
      size: 9,
      spaceBefore: 2,
    },
    {
      text: `Stream: ${paper.streamLabel} | Max Marks: ${paper.maxMarks} | Duration: ${paper.duration}`,
      size: 9,
      spaceBefore: 2,
    },
    {
      text: `Syllabus Focus: ${paper.topicsCovered.join(', ')}`,
      size: 9,
      spaceBefore: 4,
    },
    { text: 'SECTION A - MULTIPLE CHOICE QUESTIONS (OBJECTIVE)', bold: true, size: 11, spaceBefore: 10 },
  ];

  paper.sectionA.forEach((mcq, idx) => {
    wrapText(`${idx + 1}. ${mcq.question}`, 84).forEach((l) => lines.push({ text: l, size: 10, spaceBefore: 2 }));
    wrapText(`   Options: ${mcq.options.map((o, i) => `(${String.fromCharCode(97 + i)}) ${o}`).join('   ')}`, 84).forEach((l) =>
      lines.push({ text: l, size: 9 })
    );
    lines.push({ text: `   [Key Answer: ${mcq.correctAnswer}]`, bold: true, size: 9 });
  });

  lines.push({ text: 'SECTION B - SHORT-ANSWER QUESTIONS', bold: true, size: 11, spaceBefore: 10 });
  paper.sectionB.forEach((q, idx) => {
    wrapText(`${idx + 1}. ${q}`, 84).forEach((l) => lines.push({ text: l, size: 10, spaceBefore: 2 }));
  });

  lines.push({ text: 'SECTION C - DESCRIPTIVE / NUMERICAL QUESTIONS', bold: true, size: 11, spaceBefore: 10 });
  paper.sectionC.forEach((q, idx) => {
    wrapText(`${idx + 1}. ${q}`, 84).forEach((l) => lines.push({ text: l, size: 10, spaceBefore: 2 }));
  });

  if (paper.practicalSection && paper.practicalSection.length > 0) {
    lines.push({ text: 'SECTION D - WRITTEN PRACTICAL QUESTIONS (INCLUDED IN PAPER)', bold: true, size: 11, spaceBefore: 10 });
    paper.practicalSection.forEach((q, idx) => {
      wrapText(`${idx + 1}. ${q}`, 84).forEach((l) => lines.push({ text: l, size: 10, spaceBefore: 2 }));
    });
  }

  lines.push({ text: 'EXAMINER MARKING TIPS & PREPARATION NOTES', bold: true, size: 11, spaceBefore: 10 });
  paper.markingTips.forEach((tip, idx) => {
    wrapText(`* (${idx + 1}) ${tip}`, 84).forEach((l) => lines.push({ text: l, size: 9, spaceBefore: 2 }));
  });

  return lines;
}

export function createPastPaperPdfBlob(paper: PastPaperItem): Blob {
  const allLines = buildPaperLines(paper);
  const pages: string[][] = [];
  let currentCommands: string[] = [];
  let y = 755;

  const pushPage = () => {
    if (currentCommands.length > 0) {
      pages.push(currentCommands);
      currentCommands = [];
    }
    y = 755;
  };

  for (const item of allLines) {
    const size = item.size ?? 10;
    const step = size + 4;
    const needed = step + (item.spaceBefore ?? 0);
    if (y - needed < 55) {
      pushPage();
    }
    y -= item.spaceBefore ?? 0;
    const fontRef = item.bold ? '/F2' : '/F1';
    currentCommands.push(`BT ${fontRef} ${size} Tf 50 ${y} Td (${escapePdfString(item.text)}) Tj ET`);
    y -= step;
  }
  pushPage();

  // Construct valid minimal multi-page PDF structure
  // Object 1: Catalog, Object 2: Pages, Object 3: F1 Regular, Object 4: F2 Bold
  // Page i uses objects (5 + 2*i) for Page and (6 + 2*i) for Content stream
  const objects: string[] = [];
  const pageObjectIds: number[] = [];

  pages.forEach((_, idx) => {
    pageObjectIds.push(5 + idx * 2);
  });

  objects[1] = '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n';
  objects[2] = `2 0 obj\n<< /Type /Pages /Kids [${pageObjectIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pages.length} >>\nendobj\n`;
  objects[3] = '3 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n';
  objects[4] = '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n';

  pages.forEach((cmds, idx) => {
    const pageId = 5 + idx * 2;
    const contentId = pageId + 1;
    const stream = cmds.join('\n');
    objects[pageId] = `${pageId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>\nendobj\n`;
    objects[contentId] = `${contentId} 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj\n`;
  });

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [0];
  for (let id = 1; id < objects.length; id += 1) {
    offsets[id] = pdf.length;
    pdf += objects[id];
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length}\n`;
  pdf += '0000000000 65535 f \n';
  for (let id = 1; id < objects.length; id += 1) {
    pdf += `${String(offsets[id]).padStart(10, '0')} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return new Blob([pdf], { type: 'application/pdf' });
}

export function triggerPastPaperDownload(paper: PastPaperItem) {
  const blob = createPastPaperPdfBlob(paper);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = paper.fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
