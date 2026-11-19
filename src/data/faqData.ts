import type { PortalLanguage } from './translations';

export interface FAQItem {
  id: string;
  category: 'admissions' | 'uniform' | 'documents' | 'campus';
  categoryLabel: string;
  question: string;
  answer: string;
  keyPoints?: string[];
  importantNotice?: string;
}

export const DETAILED_FAQS: FAQItem[] = [
  {
    id: 'faq-seccap-process',
    category: 'admissions',
    categoryLabel: 'Admissions & SECCAP',
    question: 'How do I apply for Intermediate Class XI admission at Govt Girls Zubaida College?',
    answer:
      'Admissions to Class XI (First Year) across all groups (Pre-Medical, Pre-Engineering, Computer Science, Commerce, and Humanities) are conducted online through the Sindh Electronic Centralized College Admission Program (SECCAP).',
    keyPoints: [
      'Visit the official portal at seccap.dgcs.gos.pk.',
      "Click 'New Application' and enter your Class IX / SSC Roll Number and NADRA B-Form number.",
      "Select 'Govt Girls Zubaida College Hyderabad' as your primary college choice.",
      'Choose your preferred academic faculty stream (e.g. Computer Science, Pre-Medical).',
      'Print your submitted online application and wait for the official SECCAP placement merit list.',
    ],
    importantNotice:
      'Admission into Class XI is granted purely on merit based on your Class IX/X board examination marks.',
  },
  {
    id: 'faq-admission-fee',
    category: 'admissions',
    categoryLabel: 'Admissions & SECCAP',
    question: 'Is there any admission or monthly tuition fee for Intermediate students?',
    answer:
      'No. Under the educational directive of the College Education Department, Government of Sindh, admission to Intermediate Class XI and XII in public colleges is 100% free of tuition fees for eligible candidates admitted through the centralized SECCAP system.',
    keyPoints: [
      'Zero tuition fee for qualified students enrolled through SECCAP.',
      'Free textbook bank sets available through the College Central Library.',
      'Only nominal board examination registration fees payable directly to BISE Hyderabad as per board schedule.',
    ],
  },
  {
    id: 'faq-degree-admissions',
    category: 'admissions',
    categoryLabel: 'Admissions & University Programs',
    question: 'What is the admission procedure for the 4-Year BS Zoology Degree Program?',
    answer:
      'Admissions to the 4-Year BS Zoology Undergraduate Degree Program are conducted under affiliation with the University of Sindh, Jamshoro.',
    keyPoints: [
      'Eligibility requires Intermediate (HSC) Pre-Medical or equivalent biological science stream with at least 45% marks.',
      'Admission forms are issued at the College Degree Admission Desk following the University of Sindh schedule.',
      'Curriculum covers animal diversity, cellular genetics, physiology, entomology, fisheries, and advanced biological laboratory training.',
    ],
  },
  {
    id: 'faq-ad-commerce-programs',
    category: 'admissions',
    categoryLabel: 'Admissions & University Programs',
    question: 'What are the Associate Degree Programs (AD Commerce, AD Science, AD Arts)?',
    answer:
      'Zubaida College offers 2-Year Associate Degree Programs (ADP) affiliated with University of Sindh Jamshoro, including our popular Associate Degree in Commerce (AD Commerce / ADC).',
    keyPoints: [
      'AD Commerce (2 Years / 4 Semesters) provides comprehensive skills in Advanced Accounting, Auditing, Business Taxation, Costing, and Banking.',
      'Enables direct employment as junior accountants, audit assistants, tax associates, or lateral transition into 5th semester BS Commerce / BBA.',
      'AD Science (ADS) and AD Arts (ADA) pathways are also available for pre-medical/pre-engineering and humanities graduates.',
    ],
  },
  {
    id: 'faq-uniform-daily',
    category: 'uniform',
    categoryLabel: 'Uniform & Dress Code',
    question: 'What is the mandatory daily uniform for students at Govt Girls Zubaida College?',
    answer:
      'All enrolled students are required to wear the official college uniform from their very first day on campus. The prescribed uniform reflects simplicity, equality, discipline, and Islamic modesty.',
    keyPoints: [
      'Qameez: Simple, modest white cotton or lawn qameez with appropriate knee length and modest full or three-quarter sleeves.',
      'Shalwar: Plain white cotton shalwar (tight trousers, tights, or bell-bottom cuts are strictly prohibited).',
      'Dupatta / Scarf: Prescribed college white dupatta or white headscarf (chador/hijab) neatly pinned.',
      'College Badge: Official metal college crest pin worn on the left chest side.',
      'Footwear: Plain black or dark closed shoes or flat sandals. High heels and loud footwear are not permitted.',
    ],
    importantNotice:
      'Every student must wear her college uniform whenever entering the campus, taking examinations, or visiting college administrative offices.',
  },
  {
    id: 'faq-uniform-winter',
    category: 'uniform',
    categoryLabel: 'Uniform & Dress Code',
    question: 'What is the prescribed winter uniform and sweater regulation?',
    answer:
      'During winter months (November through February), students may supplement their white uniform with approved warm outerwear adhering to college decorum.',
    keyPoints: [
      'Sweater / Cardigan: Plain V-neck or front-buttoned sweater in black or dark emerald green.',
      'Blazer: Plain black or dark green single-breasted blazer.',
      'Shawl / Chador: Plain black, dark green, or plain white winter woolen shawl.',
      'Flashy multi-colored jackets, printed hoodies, or denim outerwear are not permitted on campus.',
    ],
  },
  {
    id: 'faq-uniform-id-card',
    category: 'uniform',
    categoryLabel: 'Uniform & Dress Code',
    question: 'Is wearing the College Digital Identity Card mandatory with the uniform?',
    answer:
      'Yes. For student security and campus discipline, every student must wear her official College Student Identity Card (affixed with lanyard) around her neck at all times on campus premises and at examination centres.',
    keyPoints: [
      'Issued by the college administration upon completion of document verification.',
      'Required for entering through the main campus gate, issuing library books, and sitting in board examinations.',
      'Digital student ID card can also be generated through the SECCAP portal.',
    ],
  },
  {
    id: 'faq-documents-intermediate',
    category: 'documents',
    categoryLabel: 'Documentation Checklist',
    question: 'What documents must I bring for final admission verification after SECCAP selection?',
    answer:
      'Once your name appears on the official SECCAP placement list for Govt Girls Zubaida College, you must visit the College Admission Desk with the following original documents and photocopies.',
    keyPoints: [
      'Original Matriculation (SSC) Marks Certificate and Provisional Certificate plus 3 attested photocopies.',
      'Original School Leaving Certificate (SLC) / Character Certificate from your previous school.',
      "Candidate's NADRA B-Form or CNIC photocopy (bring original for on-the-spot verification).",
      "Father's or Legal Guardian's CNIC photocopy.",
      '4 recent passport-size photographs (light blue or white background, with name written on back).',
      'Printout of the online SECCAP Application Form and Placement Slip.',
      'Affidavit of Good Conduct and Attendance Undertaking signed by parent/guardian.',
    ],
    importantNotice:
      'Original marksheets are inspected by the admission committee and returned immediately or kept securely as per Board registration rules.',
  },
  {
    id: 'faq-documents-migration',
    category: 'documents',
    categoryLabel: 'Documentation Checklist',
    question: 'Do I need a Board Migration Certificate (NOC) if I passed Matric from outside BISE Hyderabad?',
    answer:
      'Yes. Candidates who completed their Matriculation (SSC) from any Board other than the Board of Intermediate & Secondary Education (BISE) Hyderabad (such as BISE Karachi, Sukkur, Mirpurkhas, Larkana, Federal Board, or Aga Khan Board) must provide an official Migration Certificate.',
    keyPoints: [
      'Obtain an official NOC / Migration Certificate from your parent secondary education board.',
      'Submit the original NOC to the Zubaida College Admission Office within 30 days of admission confirmation.',
      'Students who passed their Matriculation within BISE Hyderabad jurisdiction do not require an NOC.',
    ],
  },
  {
    id: 'faq-documents-attestation',
    category: 'documents',
    categoryLabel: 'Documentation Checklist',
    question: 'Who can attest my application document photocopies?',
    answer:
      'All document photocopies (marksheets, CNIC, B-Form, certificates) must be attested by a gazetted government officer (Grade 17 or above), such as a government high school headmaster, college professor, or civil officer.',
    keyPoints: [
      "The attestation stamp must clearly show the officer's full name, designation, and official department seal.",
      'Keep at least 5 attested sets of all documents for future scholarship and board registration needs.',
    ],
  },
  {
    id: 'faq-campus-timings',
    category: 'campus',
    categoryLabel: 'Timings & Attendance',
    question: 'What are the daily class timings and attendance requirements?',
    answer:
      'The college academic day commences promptly at 8:00 AM with the morning assembly, national anthem, and recitation. Classes conclude at 2:00 PM Monday through Saturday (with Friday concluding earlier for Jummah prayers).',
    keyPoints: [
      'College Gates open at 7:30 AM and close promptly at 8:15 AM for morning assembly.',
      'Minimum 75% attendance in theory lectures and science laboratory practicals is strictly mandatory to be eligible for BISE Hyderabad board examinations.',
      'Shortage of attendance leads to detention from board examination roll number slips as per government regulations.',
    ],
  },
  {
    id: 'faq-campus-safety',
    category: 'campus',
    categoryLabel: 'Campus Safety & Environment',
    question: 'What safety, transport, and dignity measures are in place for female students?',
    answer:
      'Government Girls Zubaida College maintains an uncompromising commitment to female safety, dignity, and positive learning in the heart of Hyderabad.',
    keyPoints: [
      'Completely enclosed boundary walls with 24/7 security personnel and CCTV camera surveillance.',
      'Strict restriction on unauthorized male visitors during college operational hours.',
      'Dedicated college common room with female attendants, prayer area, and clean sanitized washrooms.',
      'Conveniently situated opposite Hyderabad Central Jail in Pathan Colony, Hirabad with frequent Suzuki, Qingqi rickshaws, and public transport routes connecting Latifabad, Qasimabad, and all parts of Hyderabad.',
    ],
  },
];

const URDU_FAQS: FAQItem[] = [
  {
    id: 'faq-seccap-process',
    category: 'admissions',
    categoryLabel: 'داخلے اور سی کیپ',
    question: 'گورنمنٹ گرلز زبیدہ کالج میں انٹرمیڈیٹ گیارہویں جماعت کے داخلے کے لیے درخواست کیسے دیں؟',
    answer:
      'تمام گروپس (پری میڈیکل، پری انجینئرنگ، کمپیوٹر سائنس، کامرس اور آرٹس) میں گیارہویں جماعت (فرسٹ ایئر) کے داخلے سندھ الیکٹرانک سینٹرلائزڈ کالج ایڈمیشن پروگرام (SECCAP) کے ذریعے آن لائن کیے جاتے ہیں۔',
    keyPoints: [
      'سرکاری ویب پورٹل seccap.dgcs.gos.pk پر جائیں۔',
      'New Application پر کلک کریں اور میٹرک رول نمبر اور نادرا ب فارم نمبر درج کریں۔',
      'اپنی اولین ترجیح میں گورنمنٹ گرلز زبیدہ کالج حیدرآباد منتخب کریں۔',
      'اپنا پسندیدہ تعلیمی گروپ (کمپیوٹر سائنس، پری میڈیکل وغیرہ) منتخب کریں۔',
      'جمع شدہ آن لائن فارم کا پرنٹ لیں اور سی کیپ میرٹ لسٹ کا انتظار کریں۔',
    ],
    importantNotice: 'گیارہویں جماعت میں داخلہ مکمل طور پر میٹرک بورڈ امتحانات کے نمبروں اور میرٹ کی بنیاد پر دیا جاتا ہے۔',
  },
  {
    id: 'faq-admission-fee',
    category: 'admissions',
    categoryLabel: 'داخلے اور سی کیپ',
    question: 'کیا انٹرمیڈیٹ طالبات کے لیے کوئی داخلہ یا ماہانہ ٹیوشن فیس ہے؟',
    answer:
      'نہیں۔ محکمہ کالج تعلیم حکومتِ سندھ کی پالیسی کے تحت سرکاری کالجز میں سی کیپ کے ذریعے داخل ہونے والی اہل طالبات کے لیے گیارہویں اور بارہویں جماعت کی تعلیم 100 فیصد مفت ہے۔',
    keyPoints: [
      'سی کیپ کے تحت داخل طالبات سے کوئی ٹیوشن فیس نہیں لی جاتی۔',
      'کالج سینٹرل لائبریری کے ذریعے درسی کتب کا مفت سیٹ فراہم کیا جاتا ہے۔',
      'صرف تعلیمی بورڈ حیدرآباد کی مقررہ امتحانی رجسٹریشن فیس بورڈ شیڈول کے مطابق واجب الادا ہوتی ہے۔',
    ],
  },
  {
    id: 'faq-degree-admissions',
    category: 'admissions',
    categoryLabel: 'داخلے اور یونیورسٹی پروگرامز',
    question: '4 سالہ بی ایس زولوجی ڈگری پروگرام میں داخلے کا طریقہ کار کیا ہے؟',
    answer: '4 سالہ بی ایس زولوجی ڈگری پروگرام میں داخلے جامعہ سندھ جامشورو کے الحاق کے تحت کیے جاتے ہیں۔',
    keyPoints: [
      'انٹرمیڈیٹ (HSC) پری میڈیکل یا مساوی بائیولوجی گروپ میں کم از کم 45 فیصد نمبر لازمی ہیں۔',
      'داخلہ فارم جامعہ سندھ کے شیڈول کے مطابق کالج ڈگری ایڈمیشن ڈیسک سے جاری کیے جاتے ہیں۔',
      'نصاب میں اینیمل ڈائیورسٹی، جینیات، فزیالوجی، اینٹومولوجی، فشریز اور جدید لیبارٹری تربیت شامل ہے۔',
    ],
  },
  {
    id: 'faq-ad-commerce-programs',
    category: 'admissions',
    categoryLabel: 'داخلے اور یونیورسٹی پروگرامز',
    question: 'ایسوسی ایٹ ڈگری پروگرامز (AD Commerce، AD Science، AD Arts) کیا ہیں؟',
    answer:
      'زبیدہ کالج جامعہ سندھ جامشورو سے الحاق شدہ 2 سالہ ایسوسی ایٹ ڈگری پروگرامز پیش کرتا ہے، جن میں مقبول AD Commerce (ADC) بھی شامل ہے۔',
    keyPoints: [
      'AD Commerce (2 سال / 4 سمسٹر) ایڈوانسڈ اکاؤنٹنگ، آڈیٹنگ، بزنس ٹیکسشن، کاسٹنگ اور بینکنگ کی عملی مہارت فراہم کرتا ہے۔',
      'اس ڈگری کے بعد جونیئر اکاؤنٹنٹ، آڈٹ اسسٹنٹ یا بی ایس کامرس / بی بی اے کے پانچویں سمسٹر میں براہِ راست داخلے کا موقع ملتا ہے۔',
      'پری میڈیکل، پری انجینئرنگ اور ہیومینیٹیز طالبات کے لیے AD Science اور AD Arts پروگرامز بھی دستیاب ہیں۔',
    ],
  },
  {
    id: 'faq-uniform-daily',
    category: 'uniform',
    categoryLabel: 'یونیفارم اور لباس',
    question: 'گورنمنٹ گرلز زبیدہ کالج کی طالبات کے لیے روزانہ کا لازمی یونیفارم کیا ہے؟',
    answer:
      'تمام طالبات کے لیے کالج کے پہلے دن سے سرکاری یونیفارم پہننا لازمی ہے۔ مقررہ یونیفارم سادگی، مساوات، نظم و ضبط اور وقار کی علامت ہے۔',
    keyPoints: [
      'قمیض: سادہ، باوقار سفید کاٹن یا لان کی قمیض مناسب گھٹنوں تک لمبائی اور پوری یا تین چوتھائی آستینوں کے ساتھ۔',
      'شلوار: سادہ سفید کاٹن شلوار (تنگ ٹراؤزر، ٹائٹس یا بیل باٹم سختی سے ممنوع ہیں)۔',
      'دوپٹہ / اسکارف: مقررہ سفید دوپٹہ یا سفید اسکارف/چادر سلیقے سے پن کی ہوئی۔',
      'کالج بیج: بائیں طرف سینے پر کالج کا سرکاری دھاتی بیج لگانا لازمی ہے۔',
      'جوتے: سادہ سیاہ یا گہرے رنگ کے بند جوتے یا فلیٹ سینڈل؛ اونچی ایڑی اور شوخ جوتے ممنوع ہیں۔',
    ],
    importantNotice: 'کیمپس میں داخلے، امتحانات اور دفتری کام کے لیے ہر طالبہ کا باقاعدہ کالج یونیفارم میں ہونا لازمی ہے۔',
  },
  {
    id: 'faq-uniform-winter',
    category: 'uniform',
    categoryLabel: 'یونیفارم اور لباس',
    question: 'سردیوں کے یونیفارم اور سویٹر کے کیا ضوابط ہیں؟',
    answer:
      'سردیوں کے مہینوں (نومبر تا فروری) میں طالبات اپنے سفید یونیفارم کے ساتھ کالج کے منظور شدہ گرم ملبوسات پہن سکتی ہیں۔',
    keyPoints: [
      'سویٹر / کارڈیگن: سیاہ یا گہرے زمردی سبز (Emerald Green) رنگ کا سادہ V-neck یا بٹن والا سویٹر۔',
      'بلیزر: سادہ سیاہ یا گہرے سبز رنگ کا بلیزر۔',
      'شال / چادر: سادہ سیاہ، گہری سبز یا سفید اونی شال۔',
      'چمکیلی یا کثیر رنگ جیکٹس، پرنٹڈ ہڈیز اور ڈینم جیکٹس کیمپس میں ممنوع ہیں۔',
    ],
  },
  {
    id: 'faq-uniform-id-card',
    category: 'uniform',
    categoryLabel: 'یونیفارم اور لباس',
    question: 'کیا یونیفارم کے ساتھ کالج ڈیجیٹل شناختی کارڈ پہننا ضروری ہے؟',
    answer:
      'جی ہاں۔ طالبات کی حفاظت اور کیمپس نظم و ضبط کے لیے ہر طالبہ کو کالج میں موجودگی اور امتحانی مراکز میں اپنا سرکاری کالج شناختی کارڈ گلے میں پہننا لازمی ہے۔',
    keyPoints: [
      'دستاویزات کی تصدیق مکمل ہونے پر کالج انتظامیہ کی جانب سے جاری کیا جاتا ہے۔',
      'مین گیٹ سے داخلے، لائبریری سے کتب لینے اور بورڈ امتحانات میں شرکت کے لیے ضروری ہے۔',
      'سی کیپ پورٹل سے ڈیجیٹل اسٹوڈنٹ آئی ڈی کارڈ بھی حاصل کیا جا سکتا ہے۔',
    ],
  },
  {
    id: 'faq-documents-intermediate',
    category: 'documents',
    categoryLabel: 'دستاویزات کی فہرست',
    question: 'سی کیپ سلیکشن کے بعد حتمی داخلہ تصدیق کے لیے کون سے دستاویزات لانا ضروری ہیں؟',
    answer:
      'سی کیپ لسٹ میں نام آنے کے بعد طالبات کو درج ذیل اصل دستاویزات اور تصدیق شدہ فوٹو کاپیاں کالج ایڈمیشن ڈیسک پر لانا ہوں گی۔',
    keyPoints: [
      'میٹرک (SSC) کی اصل مارک شیٹ اور پروویژنل سرٹیفکیٹ مع 3 تصدیق شدہ فوٹو کاپیاں۔',
      'پچھلے اسکول کا اصل اسکول لیونگ سرٹیفکیٹ (SLC) / کریکٹر سرٹیفکیٹ۔',
      'امیدوار کے نادرا ب فارم یا شناختی کارڈ کی کاپی (موقع پر تصدیق کے لیے اصل ساتھ لائیں)۔',
      'والد یا سرپرست کے شناختی کارڈ کی فوٹو کاپی۔',
      '4 عدد حالیہ پاسپورٹ سائز تصاویر (ہلکے نیلے یا سفید پس منظر کے ساتھ)۔',
      'آن لائن سی کیپ درخواست فارم اور پليسمينٹ سلپ کا پرنٹ آؤٹ۔',
      'والد/سرپرست کا دستخط شدہ حلف نامہ برائے حسنِ اخلاق و حاضری۔',
    ],
    importantNotice: 'داخلہ کمیٹی اصل مارک شیٹس کی جانچ کے بعد بورڈ رجسٹریشن قواعد کے مطابق محفوظ یا واپس کرتی ہے۔',
  },
  {
    id: 'faq-documents-migration',
    category: 'documents',
    categoryLabel: 'دستاویزات کی فہرست',
    question: 'اگر میں نے میٹرک حیدرآباد بورڈ کے علاوہ کسی اور بورڈ سے پاس کیا ہو تو کیا مائیگریشن سرٹیفکیٹ (NOC) درکار ہوگا؟',
    answer:
      'جی ہاں۔ تعلیمی بورڈ حیدرآباد کے علاوہ کسی بھی بورڈ (مثلاً کراچی، سکھر، میرپورخاص، لاڑکانہ، فیڈرل بورڈ یا آغا خان بورڈ) سے میٹرک کرنے والی طالبات کو سرکاری مائیگریشن سرٹیفکیٹ جمع کرانا ہوگا۔',
    keyPoints: [
      'اپنے متعلقہ تعلیمی بورڈ سے سرکاری NOC / مائیگریشن سرٹیفکیٹ حاصل کریں۔',
      'داخلے کی تصدیق کے 30 دن کے اندر اصل NOC کالج ایڈمیشن آفس میں جمع کرائیں۔',
      'حیدرآباد بورڈ سے میٹرک پاس کرنے والی طالبات کو NOC کی ضرورت نہیں ہے۔',
    ],
  },
  {
    id: 'faq-documents-attestation',
    category: 'documents',
    categoryLabel: 'دستاویزات کی فہرست',
    question: 'میرے دستاویزات کی فوٹو کاپیوں کی تصدیق (Attestation) کون کر سکتا ہے؟',
    answer:
      'تمام دستاویزات کی فوٹو کاپیاں (مارک شیٹ، ب فارم، شناختی کارڈ) کسی بھی گزٹڈ سرکاری افسر (گریڈ 17 یا اس سے بالا) جیسے گورنمنٹ ہائی اسکول ہیڈ ماسٹر، کالج پروفیسر یا سول افسر سے تصدیق شدہ ہونی چاہئیں۔',
    keyPoints: [
      'تصدیقی مہر پر افسر کا پورا نام، عہدہ اور سرکاری محکمے کی مہر واضح ہونی چاہیے۔',
      'مستقبل کے وظائف اور بورڈ رجسٹریشن کے لیے کم از کم 5 تصدیق شدہ سیٹ محفوظ رکھیں۔',
    ],
  },
  {
    id: 'faq-campus-timings',
    category: 'campus',
    categoryLabel: 'اوقات اور حاضری',
    question: 'کالج کے روزانہ اوقات اور حاضری کے کیا تقاضے ہیں؟',
    answer:
      'کالج کا تعلیمی دن صبح 8:00 بجے اسمبلی، تلاوت اور قومی ترانے سے شروع ہوتا ہے۔ کلاسز پیر تا ہفتہ دوپہر 2:00 بجے تک جاری رہتی ہیں (جمعہ کو نمازِ جمعہ کے باعث جلد چھٹی ہوتی ہے)۔',
    keyPoints: [
      'کالج گیٹ صبح 7:30 بجے کھلتا ہے اور اسمبلی کے لیے صبح 8:15 بجے بند ہو جاتا ہے۔',
      'تعلیمی بورڈ حیدرآباد کے امتحانات میں شرکت کے لیے تھیوری اور لیب پریکٹیکل میں کم از کم 75 فیصد حاضری لازمی ہے۔',
      'حاضری کم ہونے کی صورت میں سرکاری قواعد کے تحت بورڈ رول نمبر سلپ روکی جا سکتی ہے۔',
    ],
  },
  {
    id: 'faq-campus-safety',
    category: 'campus',
    categoryLabel: 'کیمپس تحفظ اور ماحول',
    question: 'طالبات کے لیے حفاظت، ٹرانسپورٹ اور باوقار ماحول کے کیا انتظامات ہیں؟',
    answer: 'گورنمنٹ گرلز زبیدہ کالج حیدرآباد کے وسط میں طالبات کے تحفظ، وقار اور مثبت تعلیمی ماحول پر مکمل توجہ دیتا ہے۔',
    keyPoints: [
      'مکمل چار دیواری کے ساتھ 24 گھنٹے سیکیورٹی عملہ اور سی سی ٹی وی کیمروں کی نگرانی۔',
      'کالج کے اوقات میں غیر متعلقہ مرد حضرات کے داخلے پر سخت پابندی۔',
      'طالبات کے لیے مخصوص کامن روم، نماز روم اور صاف ستھرے واش رومز کی سہولت۔',
      'سینٹرل جيل کے سامنے پٹھان کالونی، ہیرآباد میں واقع ہونے کی وجہ سے لطیف آباد، قاسم آباد اور پورے حیدرآباد سے ٹرانسپورٹ کی آسان دستیابی۔',
    ],
  },
];

const SINDHI_FAQS: FAQItem[] = [
  {
    id: 'faq-seccap-process',
    category: 'admissions',
    categoryLabel: 'داخلا ۽ سيڪيپ',
    question: 'گورنمينٽ گرلز زبيده ڪاليج ۾ انٽرميڊيٽ يارهين ڪلاس ۾ داخلا لاءِ اپلاءِ ڪيئن ڪجي؟',
    answer:
      'سڀني گروپن (پري ميڊيڪل، پري انجنيئرنگ، ڪمپيوٽر سائنس، ڪامرس ۽ آرٽس) ۾ يارهين ڪلاس (فرسٽ ايئر) جون داخلائون سنڌ اليڪٽرانڪ سينٽرلائزڊ ڪاليج ايڊميشن پروگرام (SECCAP) ذريعي آن لائن ٿين ٿيون.',
    keyPoints: [
      'سرڪاري ويب پورٽل seccap.dgcs.gos.pk تي وڃو.',
      'New Application تي ڪلڪ ڪري پنهنجو ميٽرڪ رول نمبر ۽ نادرا ب فارم نمبر داخل ڪريو.',
      'ترجيحي فهرست ۾ گورنمينٽ گرلز زبيده ڪاليج حيدرآباد چونڊيو.',
      'پنهنجو تعليمي گروپ (ڪمپيوٽر سائنس، پري ميڊيڪل وغيره) چونڊيو.',
      'آن لائن درخواست جو پرنٽ وٺو ۽ سرڪاري سيڪيپ ميرٽ لسٽ جو انتظار ڪريو.',
    ],
    importantNotice: 'يارهين ڪلاس ۾ داخلا مڪمل طور تي ميٽرڪ بورڊ امتحانن جي مارڪن ۽ ميرٽ جي بنياد تي ڏني وڃي ٿي.',
  },
  {
    id: 'faq-admission-fee',
    category: 'admissions',
    categoryLabel: 'داخلا ۽ سيڪيپ',
    question: 'ڇا انٽرميڊيٽ شاگردياڻين لاءِ ڪا داخلا يا مهانوار ٽيوشن فيس آهي؟',
    answer:
      'نه. سنڌ حڪومت جي ڪاليج ايجوڪيشن کاتي جي پاليسي تحت سيڪيپ ذريعي سرڪاري ڪاليجن ۾ داخلا وٺندڙ اهل شاگردياڻين لاءِ يارهين ۽ ٻارهين ڪلاس جي تعليم 100 سيڪڙو مفت آهي.',
    keyPoints: [
      'سيڪيپ ذريعي داخل شاگردياڻين کان ڪا به ٽيوشن فيس نٿي ورتي وڃي.',
      'ڪاليج سينٽرل لائبريري ذريعي درسي ڪتابن جو مفت سيٽ دستياب آهي.',
      'فقط تعليمي بورڊ حيدرآباد جي مقرر امتحاني رجسٽريشن فيس بورڊ شيڊول موجب جمع ڪرائڻي هوندي.',
    ],
  },
  {
    id: 'faq-degree-admissions',
    category: 'admissions',
    categoryLabel: 'داخلا ۽ يونيورسٽي پروگرام',
    question: '4 سالن واري BS زولوجي ڊگري پروگرام ۾ داخلا جو طريقيڪار ڇا آهي؟',
    answer: '4 سالن واري BS زولوجي ڊگري پروگرام ۾ داخلائون سنڌ يونيورسٽي ڄامشورو جي الحاق تحت ٿين ٿيون.',
    keyPoints: [
      'انٽرميڊيٽ (HSC) پري ميڊيڪل يا برابر بائيولاجي گروپ ۾ گهٽ ۾ گهٽ 45 سيڪڙو مارڪون لازمي آهن.',
      'داخلا فارم سنڌ يونيورسٽي جي شيڊول مطابق ڪاليج ڊگري ايڊميشن ڊيسڪ تان جاري ڪيا وڃن ٿا.',
      'نصاب ۾ اينيمل ڊائورسٽي، جينياٽڪس، فزيولاجي، اينٽومولوجي، فشريز ۽ جديد ليب ٽريننگ شامل آهي.',
    ],
  },
  {
    id: 'faq-ad-commerce-programs',
    category: 'admissions',
    categoryLabel: 'داخلا ۽ يونيورسٽي پروگرام',
    question: 'ايسوسيئيٽ ڊگري پروگرام (AD Commerce، AD Science، AD Arts) ڇا آهن؟',
    answer:
      'زبيده ڪاليج سنڌ يونيورسٽي ڄامشورو سان الحاق شده 2 سالا ايسوسيئيٽ ڊگري پروگرام (ADP) پيش ڪري ٿو، جنهن ۾ AD Commerce (ADC) پڻ شامل آهي.',
    keyPoints: [
      'AD Commerce (2 سال / 4 سيميسٽر) ايڊوانسڊ اڪائونٽنگ، آڊيٽنگ، بزنس ٽيڪسيشن، ڪاسٽنگ ۽ بينڪنگ جي عملي تربيت ڏئي ٿو.',
      'هن ڊگري کان پوءِ جونيئر اڪائونٽنٽ، آڊٽ اسسٽنٽ يا BS Commerce / BBA جي پنجين سيميسٽر ۾ سڌي داخلا ملي سگهي ٿي.',
      'پري ميڊيڪل، پري انجنيئرنگ ۽ آرٽس شاگردياڻين لاءِ AD Science ۽ AD Arts پڻ موجود آهن.',
    ],
  },
  {
    id: 'faq-uniform-daily',
    category: 'uniform',
    categoryLabel: 'يونيفارم ۽ لباس',
    question: 'گورنمينٽ گرلز زبيده ڪاليج جي شاگردياڻين لاءِ روزانو لازمي يونيفارم ڪهڙو آهي؟',
    answer:
      'سڀني شاگردياڻين لاءِ ڪاليج جي پهرين ڏينهن کان سرڪاري يونيفارم پائڻ لازمي آهي. مقرر يونيفارم سادگي، برابري، نظم و ضبط ۽ وقار جي علامت آهي.',
    keyPoints: [
      'قميض: سادي ۽ باوقار اڇي ڪاٽن يا لان جي قميض مناسب گوڏن تائين ڊيگهه ۽ پوري يا ٽي چوٿائي ٻانهن سان.',
      'شلوار: سادي اڇي ڪاٽن شلوار (تنگ پينٽ، ٽائيٽس يا بيل باٽم سختي سان منع آهن).',
      'دوپٽو / اسڪارف: مقرر اڇو دوپٽو يا اڇي چادر/حجاب سهڻي نموني پن ٿيل.',
      'ڪاليج بيج: کاٻي پاسي سيني تي ڪاليج جو سرڪاري ڌاتو وارو بيج لڳائڻ لازمي آهي.',
      'جوتا: سادا ڪارا يا گهري رنگ جا بند جوتا يا سادي سينڊل؛ اوچي هيل ۽ شوخ جوتا منع آهن.',
    ],
    importantNotice: 'ڪيمپس ۾ داخل ٿيڻ، امتحان ڏيڻ ۽ آفيسن ۾ اچڻ وقت هر شاگردياڻي لاءِ ڪاليج يونيفارم لازمي آهي.',
  },
  {
    id: 'faq-uniform-winter',
    category: 'uniform',
    categoryLabel: 'يونيفارم ۽ لباس',
    question: 'سياري جي يونيفارم ۽ سويٽر جا ڪهڙا ضابطا آهن؟',
    answer:
      'سياري جي مهينن (نومبر کان فيبروري) دوران شاگردياڻيون پنهنجي اڇي يونيفارم مٿان ڪاليج جي منظور شده گرم لباس پائي سگهن ٿيون.',
    keyPoints: [
      'سويٽر / ڪارڊيگن: سادو V-neck يا بٽڻ وارو ڪارو يا گهرو سائو (Emerald Green) سويٽر.',
      'بليزر: سادو ڪارو يا گهرو سائو بليزر.',
      'شال / چادر: سادي ڪاري، گهري سائي يا اڇي اوني شال.',
      'چمڪندڙ يا گهڻ رنگي جئڪٽون، پرنٽيڊ هڊيز ۽ ڊينم جئڪٽون ڪيمپس ۾ منع آهن.',
    ],
  },
  {
    id: 'faq-uniform-id-card',
    category: 'uniform',
    categoryLabel: 'يونيفارم ۽ لباس',
    question: 'ڇا يونيفارم سان ڪاليج ڊجيٽل شناختي ڪارڊ پائڻ لازمي آهي؟',
    answer:
      'ها. شاگردياڻين جي حفاظت ۽ ڪيمپس نظم و ضبط لاءِ هر شاگردياڻي کي پنهنجو سرڪاري ڪاليج ID ڪارڊ ڪيمپس ۽ امتحاني مرڪزن ۾ ڳچيءَ ۾ پائڻ لازمي آهي.',
    keyPoints: [
      'دستاويزن جي تصديق مڪمل ٿيڻ تي ڪاليج انتظاميه طرفان جاري ڪيو ويندو آهي.',
      'مين گيٽ تان داخلا، لائبريري مان ڪتاب وٺڻ ۽ بورڊ امتحانن ۾ ويهڻ لاءِ ضروري آهي.',
      'سيڪيپ پورٽل تان پڻ ڊجيٽل اسٽوڊنٽ آءِ ڊي ڪارڊ ڊائون لوڊ ڪري سگهجي ٿو.',
    ],
  },
  {
    id: 'faq-documents-intermediate',
    category: 'documents',
    categoryLabel: 'دستاويزن جي فهرست',
    question: 'سيڪيپ چونڊ کان پوءِ حتمي داخلا تصديق لاءِ ڪهڙا دستاويز گهربل آهن؟',
    answer:
      'سيڪيپ لسٽ ۾ نالو اچڻ کان پوءِ شاگردياڻي کي هيٺيان اصل دستاويز ۽ تصديق ٿيل فوٽو ڪاپيون ڪاليج ايڊميشن ڊيسڪ تي آڻڻيون پونديون.',
    keyPoints: [
      'ميٽرڪ (SSC) جي اصل مارڪ شيٽ ۽ پروويزنل سرٽيفڪيٽ سان گڏ 3 تصديق ٿيل فوٽو ڪاپيون.',
      'اڳئين اسڪول جو اصل اسڪول ليونگ سرٽيفڪيٽ (SLC) / ڪريڪٽر سرٽيفڪيٽ.',
      'اميدوار جو نادرا ب فارم يا شناختي ڪارڊ جي ڪاپي (تصديق لاءِ اصل گڏ آڻيو).',
      'والد يا سرپرست جي شناختي ڪارڊ جي فوٽو ڪاپي.',
      '4 عدد تازيون پاسپورٽ سائيز تصويرون (هلڪي نيري يا اڇي پس منظر سان).',
      'آن لائن سيڪيپ فارم ۽ پليسمينٽ سلپ جو پرنٽ آئوٽ.',
      'والد/سرپرست پاران صحيح ٿيل سٺي رويي ۽ حاضري جو حلفي بيان.',
    ],
    importantNotice: 'داخلا ڪميٽي اصل مارڪ شيٽن جي چڪاس کان پوءِ بورڊ رجسٽريشن قاعدن موجب محفوظ رکي يا واپس ڪري ٿي.',
  },
  {
    id: 'faq-documents-migration',
    category: 'documents',
    categoryLabel: 'دستاويزن جي فهرست',
    question: 'جيڪڏهن ميٽرڪ حيدرآباد بورڊ کان ٻاهر پاس ڪئي هجي ته ڇا مائيگريشن سرٽيفڪيٽ (NOC) گهربل هوندو؟',
    answer:
      'ها. تعليمي بورڊ حيدرآباد کان سواءِ ڪنهن به ٻئي بورڊ (جيئن ڪراچي، سکر، ميرپورخاص، لاڙڪاڻو، فيڊرل بورڊ يا آغا خان بورڊ) مان ميٽرڪ ڪندڙ شاگردياڻين کي سرڪاري مائيگريشن سرٽيفڪيٽ ڏيڻو پوندو.',
    keyPoints: [
      'پنهنجي لاڳاپيل تعليمي بورڊ مان سرڪاري NOC / مائيگريشن سرٽيفڪيٽ حاصل ڪريو.',
      'داخلا جي تصديق جي 30 ڏينهن اندر اصل NOC ڪاليج ايڊميشن آفيس ۾ جمع ڪرايو.',
      'حيدرآباد بورڊ مان ميٽرڪ پاس ڪندڙ شاگردياڻين کي NOC جي ضرورت ناهي.',
    ],
  },
  {
    id: 'faq-documents-attestation',
    category: 'documents',
    categoryLabel: 'دستاويزن جي فهرست',
    question: 'منهنجن دستاويزن جي فوٽو ڪاپين جي تصديق (Attestation) ڪير ڪري سگهي ٿو؟',
    answer:
      'سڀني دستاويزن جون فوٽو ڪاپيون (مارڪ شيٽ، ب فارم، شناختي ڪارڊ) ڪنهن به گزيٽيڊ سرڪاري آفيسر (گريڊ 17 يا ان کان مٿي) جهڙوڪ گورنمينٽ هاءِ اسڪول هيڊ ماسٽر، ڪاليج پروفيسر يا سول آفيسر کان تصديق ٿيل هجن.',
    keyPoints: [
      'تصديق واري مهر تي آفيسر جو مڪمل نالو، عهدو ۽ سرڪاري کاتي جي مهر واضح هجڻ گهرجي.',
      'مستقبل جي اسڪالرشپس ۽ بورڊ رجسٽريشن لاءِ گهٽ ۾ گهٽ 5 تصديق ٿيل سيٽ محفوظ رکو.',
    ],
  },
  {
    id: 'faq-campus-timings',
    category: 'campus',
    categoryLabel: 'وقت ۽ حاضري',
    question: 'ڪاليج جا روزانا وقت ۽ حاضري جا ڪهڙا شرط آهن؟',
    answer:
      'ڪاليج جو تعليمي ڏينهن صبح 8:00 وڳي اسيمبلي، تلاوت ۽ قومي تراني سان شروع ٿئي ٿو. ڪلاس سومر کان ڇنڇر منجهند 2:00 وڳي تائين هلندا آهن (جمعو نماز جمعي سبب جلد ختم ٿئي ٿو).',
    keyPoints: [
      'ڪاليج گيٽ صبح 7:30 وڳي کلي ٿو ۽ اسيمبلي لاءِ 8:15 وڳي بند ٿي وڃي ٿو.',
      'تعليمي بورڊ حيدرآباد جي امتحانن ۾ ويهڻ لاءِ ٿيوري ۽ سائنس ليب پريڪٽيڪل ۾ گهٽ ۾ گهٽ 75 سيڪڙو حاضري لازمي آهي.',
      'حاضري گهٽ هجڻ صورت ۾ سرڪاري ضابطن تحت بورڊ رول نمبر سلپ روڪي سگهجي ٿي.',
    ],
  },
  {
    id: 'faq-campus-safety',
    category: 'campus',
    categoryLabel: 'ڪيمپس تحفظ ۽ ماحول',
    question: 'شاگردياڻين لاءِ حفاظت، ٽرانسپورٽ ۽ باوقار ماحول جا ڪهڙا انتظام آهن؟',
    answer: 'گورنمينٽ گرلز زبيده ڪاليج حيدرآباد جي مرڪز ۾ شاگردياڻين جي حفاظت، عزت ۽ مثبت تعليمي ماحول لاءِ پرعزم آهي.',
    keyPoints: [
      'مڪمل چارديواري سان گڏ 24 ڪلاڪ سيڪيورٽي عملو ۽ CCTV ڪئميرائن جي نگراني.',
      'ڪاليج وقتن دوران غير لاڳاپيل مردن جي داخلا تي سخت پابندي.',
      'شاگردياڻين لاءِ مخصوص ڪامن روم، نماز روم ۽ صاف سٿرا واش روم.',
      'سينٽرل جيل سامهون پٺاڻ ڪالوني، هيرآباد ۾ هجڻ سبب لطيف آباد، قاسم آباد ۽ سڄي حيدرآباد مان ٽرانسپورٽ آساني سان ملي ٿي.',
    ],
  },
];

export function getLocalizedFaqs(lang: PortalLanguage): FAQItem[] {
  if (lang === 'ur') return URDU_FAQS;
  if (lang === 'sd') return SINDHI_FAQS;
  return DETAILED_FAQS;
}

