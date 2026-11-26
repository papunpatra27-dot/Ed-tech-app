import { MCQQuestion } from '../types';

export const STARTER_QUESTIONS: MCQQuestion[] = [
  {
    id: 'cur-wb-1',
    subjectId: 'wb-gk',
    chapterId: 'wb-rivers-geo',
    question:
      'Consider the following statements regarding the Damodar River system:\n1. It originates from the Khamarpat Hill on the Chota Nagpur Plateau in Jharkhand.\n2. Its principal tributary, the Barakar, joins it near Dishergarh in Paschim Bardhaman.\n3. Before joining the Hooghly below Kolkata, its lower course bifurcates into channels including the Mundeswari.\nWhich of the statements given above are correct?',
    options: ['1 and 2 only', '2 and 3 only', '1 and 3 only', '1, 2 and 3'],
    correctIndex: 3,
    explanation:
      'All three statements are accurate. The Damodar originates in Palamu/Latehar (Khamarpat Hill) on the Chota Nagpur Plateau, receives the Barakar near Dishergarh, and splits into the Amta channel and Mundeswari in its lower deltaic stretch before joining the Hooghly.',
    examHook:
      'DVC (1948) constructed 4 major dams: Tilaiya & Maithon (on Barakar), Konar (on Konar), and Panchet (on Damodar).',
    examTag: 'WBCS Prelims',
    difficulty: 'Hard',
    source: 'curated',
  },
  {
    id: 'cur-wb-2',
    subjectId: 'wb-gk',
    chapterId: 'wb-physiography',
    question:
      'Arrange the following hills/peaks of West Bengal from North to South:\n1. Tiger Hill\n2. Sandakphu\n3. Biharinath\n4. Ajodhya Hill',
    options: [
      '2 - 1 - 3 - 4',
      '1 - 2 - 3 - 4',
      '2 - 1 - 4 - 3',
      '1 - 2 - 4 - 3',
    ],
    correctIndex: 0,
    explanation:
      'Sandakphu (27°06′N, Singalila Ridge) lies north of Tiger Hill (26°59′N, Darjeeling). Further south in the Western Plateau fringe, Biharinath (23°34′N, Bankura) lies slightly north of Ajodhya Hill (23°12′N, Purulia).',
    examHook:
      'Gorgaburu (677 m) is the highest peak of Ajodhya Hill in Purulia, whereas Sandakphu (3,636 m) is the highest peak of West Bengal.',
    examTag: 'WBCS Mains',
    difficulty: 'Hard',
    source: 'curated',
  },
  {
    id: 'cur-wb-3',
    subjectId: 'wb-gk',
    chapterId: 'wb-districts-borders',
    question:
      'Which sequence correctly represents the chronological order of creation of the newest districts of West Bengal between 2014 and 2017?',
    options: [
      'Alipurduar → Kalimpong → Jhargram → Paschim Bardhaman',
      'Kalimpong → Alipurduar → Paschim Bardhaman → Jhargram',
      'Alipurduar → Jhargram → Kalimpong → Paschim Bardhaman',
      'Jhargram → Alipurduar → Kalimpong → Paschim Bardhaman',
    ],
    correctIndex: 0,
    explanation:
      'Alipurduar (20th) was carved out of Jalpaiguri on 25 June 2014. In 2017, Kalimpong (21st) was formed on 14 Feb 2017, Jhargram (22nd) on 4 April 2017, and Paschim Bardhaman (23rd) on 7 April 2017.',
    examHook:
      'West Bengal currently has 23 districts grouped under 5 Administrative Divisions.',
    examTag: 'WBCS Prelims',
    difficulty: 'Moderate',
    source: 'curated',
  },
  {
    id: 'cur-wb-4',
    subjectId: 'wb-gk',
    chapterId: 'wb-ancient-medieval',
    question:
      'Which Pala ruler suppressed the Kaivarta Rebellion led by Bhima in Varendra (North Bengal) and was celebrated in Sandhyakar Nandi’s Sanskrit dvayashraya kavya "Ramacharitam"?',
    options: ['Mahipala I', 'Ramapala', 'Nayapala', 'Madanapala'],
    correctIndex: 1,
    explanation:
      'Divya (a Kaivarta chieftain) seized Varendra during Mahipala II’s reign, and his nephew Bhima ruled it until Ramapala mobilized a confederacy of feudatories (samantas) to recover Varendra—chronicled by Sandhyakar Nandi in Ramacharitam.',
    examHook:
      'Ramacharitam uses double-entendre (shlesha) to simultaneously narrate Rama’s story and Ramapala’s recovery of Varendra.',
    examTag: 'WBCS Mains',
    difficulty: 'Hard',
    source: 'curated',
  },
  {
    id: 'cur-wb-5',
    subjectId: 'wb-gk',
    chapterId: 'wb-renaissance',
    question:
      'Which of the following pairs of 19th-century Bengal associations and their founders is INCORRECTLY matched?',
    options: [
      'Atmiya Sabha (1815) — Raja Rammohan Roy',
      'Tattvabodhini Sabha (1839) — Debendranath Tagore',
      'Academic Association (1828) — Henry Louis Vivian Derozio',
      'Sadharan Brahmo Samaj (1878) — Keshab Chandra Sen',
    ],
    correctIndex: 3,
    explanation:
      'Sadharan Brahmo Samaj (1878) was founded by Ananda Mohan Bose, Shibnath Shastri, and Umesh Chandra Dutta after breaking away from Keshab Chandra Sen’s Brahmo Samaj of India (following the Cooch Behar marriage controversy).',
    examHook:
      '1866 split: Adi Brahmo Samaj (Debendranath Tagore) vs Brahmo Samaj of India (Keshab Chandra Sen); 1878 split produced Sadharan Brahmo Samaj.',
    examTag: 'WBCS Prelims',
    difficulty: 'Hard',
    source: 'curated',
  },
  {
    id: 'cur-wb-6',
    subjectId: 'wb-gk',
    chapterId: 'wb-revolutionary',
    question:
      'In the Alipore Conspiracy Case (1908–09), who served as the chief defence counsel whose brilliant legal arguments secured Aurobindo Ghosh’s acquittal?',
    options: [
      'Rashbehari Ghosh',
      'Chittaranjan Das',
      'Motilal Nehru',
      'Bhulabhai Desai',
    ],
    correctIndex: 1,
    explanation:
      'Deshbandhu Chittaranjan Das defended Aurobindo Ghosh for over a year in Judge Beachcroft’s court, delivering a historic closing address that resulted in Aurobindo’s acquittal in May 1909.',
    examHook:
      'Bhulabhai Desai later led the defence in the INA Red Fort Trials (1945); C.R. Das defended Aurobindo in Alipore (1908–09).',
    examTag: 'WBCS Prelims',
    difficulty: 'Moderate',
    source: 'curated',
  },
  {
    id: 'cur-wb-7',
    subjectId: 'wb-gk',
    chapterId: 'wb-peasant-tribal',
    question:
      'Who among the following led the Barasat Peasant Uprising (1831) against oppressive zamindars and European indigo planters, constructing a bamboo fort (Bansher Kella) at Narkelberia?',
    options: [
      'Dudu Miyan',
      'Mir Nisar Ali (Titumir)',
      'Karam Shah',
      'Digambar Biswas',
    ],
    correctIndex: 1,
    explanation:
      'Syed Mir Nisar Ali, popularly known as Titumir, led the Tariqah-i-Muhammadiya inspired Barasat uprising in 1831 and built a bamboo fortress at Narkelberia (North 24 Parganas) before falling to British artillery.',
    examHook:
      'Haji Shariatullah & Dudu Miyan led the Faraizi Movement in East Bengal; Karam Shah & Tipu led the Pagal Panthi revolt in Sherpur.',
    examTag: 'WBCS Prelims',
    difficulty: 'Moderate',
    source: 'curated',
  },
  {
    id: 'cur-wb-8',
    subjectId: 'wb-gk',
    chapterId: 'wb-schemes-admin',
    question:
      'Under West Bengal’s Kanyashree Prakalpa, which of the following eligibility conditions apply to the K2 one-time grant of ₹25,000?',
    options: [
      'Girl aged 13–18 enrolled in Class VIII–XII regardless of marital status',
      'Unmarried girl who attains age 18 and is enrolled in an educational/vocational institution',
      'Any female college graduate under age 25 from BPL households',
      'Unmarried girl at the time of marriage aged 18–21 only',
    ],
    correctIndex: 1,
    explanation:
      'K1 provides an annual scholarship (₹1,000) for unmarried girls aged 13–18 in Classes VIII–XII, while K2 is a one-time grant of ₹25,000 awarded when the girl turns 18 provided she remains unmarried and enrolled in education/vocational training. (Rupashree provides ₹25,000 at marriage).',
    examHook:
      'Kanyashree (2013) won the UN Public Service Award (1st place) in June 2017 at The Hague.',
    examTag: 'WBPSC Clerkship',
    difficulty: 'Moderate',
    source: 'curated',
  },
  {
    id: 'cur-hist-1',
    subjectId: 'history',
    chapterId: 'hist-british-acts',
    question:
      'Which provision was introduced for the first time by the Charter Act of 1833?',
    options: [
      'Creation of a separate Governor-General’s Legislative Council with 6 new members',
      'Abolition of East India Company’s trade monopoly except in tea and trade with China',
      'Elevation of the Governor-General of Bengal as the Governor-General of India with centralized legislative power',
      'Introduction of open competitive examination for the Indian Civil Service',
    ],
    correctIndex: 2,
    explanation:
      'The Charter Act of 1833 made Lord William Bentinck the first Governor-General of India, ended all commercial activities of the EIC, and deprived Bombay and Madras Presidencies of legislative powers. (Tea/China exception was ended in 1833; introduced in 1813; open ICS competition & separate Legislative Council came in 1853).',
    examHook:
      '1773 = GG of Bengal (Warren Hastings); 1833 = GG of India (Bentinck); 1858 = Viceroy of India (Canning).',
    examTag: 'WBCS Prelims',
    difficulty: 'Hard',
    source: 'curated',
  },
  {
    id: 'cur-hist-2',
    subjectId: 'history',
    chapterId: 'hist-inm',
    question:
      'Arrange the following events of the Indian National Movement in chronological order:\n1. Gandhi-Irwin Pact\n2. Poona Pact\n3. Communal Award by Ramsay MacDonald\n4. Karachi Session of INC',
    options: [
      '1 - 4 - 3 - 2',
      '4 - 1 - 3 - 2',
      '1 - 3 - 4 - 2',
      '3 - 1 - 2 - 4',
    ],
    correctIndex: 0,
    explanation:
      'Gandhi-Irwin Pact was signed on 5 March 1931; Karachi Session (endorsing the Pact & Fundamental Rights resolution) took place in late March 1931; Communal Award was announced on 16 August 1932; Poona Pact was signed on 24 September 1932.',
    examHook:
      'At the 1931 Karachi Session presided over by Vallabhbhai Patel, INC passed its landmark resolution on Fundamental Rights & National Economic Programme.',
    examTag: 'WBCS Mains',
    difficulty: 'Hard',
    source: 'curated',
  },
  {
    id: 'cur-pol-1',
    subjectId: 'polity',
    chapterId: 'pol-preamble-fr',
    question:
      'Regarding Writ Jurisdiction under the Indian Constitution, which of the following statements is INCORRECT?',
    options: [
      'Supreme Court under Article 32 can issue writs only for the enforcement of Fundamental Rights.',
      'High Courts under Article 226 can issue writs for both Fundamental Rights and ordinary legal rights.',
      'Certiorari can be issued against legislative bodies and private individuals as well as judicial tribunals.',
      'Quo Warranto can be sought by any interested person and not necessarily the aggrieved person.',
    ],
    correctIndex: 2,
    explanation:
      'Certiorari is issued by a higher court to a lower court, tribunal, or quasi-judicial/administrative authority to quash an order for excess of jurisdiction or error of law—it is NOT available against legislative bodies or private individuals. (Habeas Corpus lies against both public authorities and private individuals).',
    examHook:
      'Prohibition = prevents excess jurisdiction before judgement ("to forbid"); Certiorari = quashes order after judgement ("to be certified").',
    examTag: 'WBCS Mains',
    difficulty: 'Hard',
    source: 'curated',
  },
  {
    id: 'cur-pol-2',
    subjectId: 'polity',
    chapterId: 'pol-parliament',
    question:
      'Which of the following Parliamentary Committees consists exclusively of members drawn from the Lok Sabha, with zero representation from the Rajya Sabha?',
    options: [
      'Public Accounts Committee (PAC)',
      'Committee on Public Undertakings (COPU)',
      'Estimates Committee',
      'Business Advisory Committee',
    ],
    correctIndex: 2,
    explanation:
      'The Estimates Committee has 30 members, all elected exclusively from the Lok Sabha every year by proportional representation. In contrast, PAC (22 members = 15 LS + 7 RS) and COPU (22 members = 15 LS + 7 RS) are joint financial committees.',
    examHook:
      'Estimates Committee (30 LS members) is called the "Continuous Economy Committee"; a Minister cannot be a member of any of the three financial committees.',
    examTag: 'WBCS Prelims',
    difficulty: 'Moderate',
    source: 'curated',
  },
  {
    id: 'cur-eco-1',
    subjectId: 'economy',
    chapterId: 'pol-economy',
    question:
      'If the Reserve Bank of India reduces the Cash Reserve Ratio (CRR) and simultaneously conducts Open Market Operation (OMO) purchases of government securities, what is the combined impact on commercial banks?',
    options: [
      'Bank lending capacity contracts sharply and call money rates spike',
      'Excess reserves with commercial banks rise, expanding credit creation capacity',
      'Statutory Liquidity Ratio (SLR) automatically increases by the same percentage',
      'Fiscal deficit of the Union Government gets monetized without affecting liquidity',
    ],
    correctIndex: 1,
    explanation:
      'Lowering CRR frees up cash banks must keep idle with the RBI, while OMO purchases inject fresh high-powered money into the banking system—both are expansionary (dovish) tools that raise bank liquidity and credit creation capacity.',
    examHook:
      'Quantitative RBI tools: Repo, SDF, MSF, Bank Rate, CRR, SLR, and OMO.',
    examTag: 'WBCS Mains',
    difficulty: 'Hard',
    source: 'curated',
  },
  {
    id: 'cur-geo-1',
    subjectId: 'geography',
    chapterId: 'geo-drainage-india',
    question:
      'Which set correctly identifies ONLY the left-bank tributaries of the Ganga River?',
    options: [
      'Yamuna, Son, Punpun',
      'Ramganga, Gomti, Ghaghara, Gandak, Kosi',
      'Chambal, Betwa, Ken, Tons',
      'Kosi, Damodar, Son, Mahananda',
    ],
    correctIndex: 1,
    explanation:
      'Standing facing downstream (eastward), the left-bank (northern/Himalayan) tributaries of the Ganga are Ramganga, Gomti, Ghaghara, Gandak, Burhi Gandak, Kosi, and Mahananda. Yamuna, Tons, Son, and Punpun join from the right bank.',
    examHook:
      'Left-bank sequence West to East: Ramganga → Gomti → Ghaghara → Gandak → Kosi → Mahananda.',
    examTag: 'WBCS Prelims',
    difficulty: 'Moderate',
    source: 'curated',
  },
  {
    id: 'cur-sci-1',
    subjectId: 'science',
    chapterId: 'sci-physics',
    question:
      'A ray of light travels from glass (refractive index 1.5) into water (refractive index 1.33). Which phenomenon can occur if the angle of incidence exceeds the critical angle?',
    options: [
      'Chromatic dispersion into seven colours inside water',
      'Total Internal Reflection back into the glass medium',
      'Complete polarization by transmission into water',
      'Zero refraction because glass is rarer than water',
    ],
    correctIndex: 1,
    explanation:
      'Total Internal Reflection (TIR) occurs when light travels from an optically denser medium (glass, n=1.5) toward a rarer medium (water, n=1.33) and the angle of incidence exceeds the critical angle (sin θc = n₂/n₁ = 1.33/1.5).',
    examHook:
      'Two mandatory conditions for TIR: (1) Denser → Rarer medium, (2) Angle of incidence > Critical angle.',
    examTag: 'WB Police SI',
    difficulty: 'Moderate',
    source: 'curated',
  },
  {
    id: 'cur-qnt-1',
    subjectId: 'quant',
    chapterId: 'qnt-profit-discount',
    question:
      'A trader marks his goods 40% above the cost price and allows a discount of 20% on the marked price. Furthermore, he uses a faulty weight of 800 g instead of 1 kg while selling. What is his actual overall profit percentage?',
    options: ['20%', '35%', '40%', '50%'],
    correctIndex: 2,
    explanation:
      'Let CP of 1000 g = ₹100 (so 1 g = ₹0.10). Marked Price = ₹140. After 20% discount, Selling Price charged = 140 × 0.8 = ₹112. However, he actually gives only 800 g whose true cost = ₹80. Actual Profit% = [(112 − 80) / 80] × 100 = (32/80) × 100 = 40%.',
    examHook:
      'Multiplicative factor method: (140/100) × (80/100) × (1000/800) = 1.40 → 40% net profit.',
    examTag: 'WBCS Mains',
    difficulty: 'Hard',
    source: 'curated',
  },
  {
    id: 'cur-qnt-2',
    subjectId: 'quant',
    chapterId: 'qnt-si-ci-num',
    question:
      'The difference between Compound Interest (compounded annually) and Simple Interest on a certain sum at 10% per annum for 3 years is ₹930. What is the principal sum?',
    options: ['₹25,000', '₹30,000', '₹31,000', '₹28,000'],
    correctIndex: 1,
    explanation:
      'For 3 years, CI − SI = P × (R/100)² × (3 + R/100). Substituting R = 10: 930 = P × (0.01) × (3.1) = P × 0.031 → P = 930 / 0.031 = ₹30,000.',
    examHook:
      'At 10% p.a.: 3-yr SI = 30%, 3-yr CI = 33.1%, so difference = 3.1% of P = 930 → P = ₹30,000.',
    examTag: 'Food SI',
    difficulty: 'Moderate',
    source: 'curated',
  },
  {
    id: 'cur-rsn-1',
    subjectId: 'reasoning',
    chapterId: 'rsn-syllogism-venn',
    question:
      'Statements:\nAll Rivers are Mountains.\nSome Mountains are Forests.\nNo Forest is a Desert.\n\nConclusions:\nI. Some Rivers are Forests.\nII. Some Mountains are not Deserts.\nIII. No River is a Forest.',
    options: [
      'Only II follows',
      'Only II and either I or III follow',
      'Only I and II follow',
      'Either I or III follows only',
    ],
    correctIndex: 1,
    explanation:
      'Since Some Mountains are Forests and No Forest is a Desert, those Mountains which are Forests are definitely not Deserts (Conclusion II follows). Between River and Forest there is no direct relation, so I ("Some") and III ("No") form a complementary Either-Or pair.',
    examHook:
      'Complementary Either-Or pairs: (Some + No) and (All + Some not) with identical subject & predicate when both are individually uncertain.',
    examTag: 'WBCS Mains',
    difficulty: 'Hard',
    source: 'curated',
  },
  {
    id: 'cur-lng-1',
    subjectId: 'lang-pedagogy',
    chapterId: 'lng-eng-grammar',
    question:
      'Identify the grammatically correct sentence regarding inversion and correlative conjunctions:',
    options: [
      'No sooner did the chief guest arrived than the programme began.',
      'No sooner had the chief guest arrived when the programme began.',
      'No sooner had the chief guest arrived than the programme began.',
      'Hardly had the chief guest arrived than the programme began.',
    ],
    correctIndex: 2,
    explanation:
      '"No sooner" is always paired with "than" (not "when") and triggers subject-auxiliary inversion ("had the chief guest arrived" or "did the chief guest arrive" with V1). "Hardly/Scarcely" pairs with "when/before".',
    examHook:
      'No sooner... than; Hardly/Scarcely... when; Both... and; Lest... should.',
    examTag: 'WBCS Prelims',
    difficulty: 'Moderate',
    source: 'curated',
  },
  {
    id: 'cur-lng-2',
    subjectId: 'lang-pedagogy',
    chapterId: 'lng-ben-samas-karak',
    question:
      '"জীবে দয়া করে যে জন, সে জন সেবিছে ঈশ্বর" — বাক্যে "জীবে" পদটির কারক ও বিভক্তি কী?',
    options: [
      'কর্ম কারকে এ-বিভক্তি',
      'নিমিত্ত বা সম্প্রদান কারকে এ-বিভক্তি',
      'অধিকরণ কারকে এ-বিভক্তি',
      'করণ কারকে এ-বিভক্তি',
    ],
    correctIndex: 2,
    explanation:
      '"জীবে দয়া" অর্থাৎ জীবের প্রতি (বিষয়ে) দয়া—বাংলা ব্যাকরণ অনুযায়ী বিষয় বা আধার বোঝালে বিষয়াধিকরণ (অধিকরণ কারক) হয় এবং এখানে "এ" বিভক্তি যুক্ত হয়েছে।',
    examHook:
      'বিষয়াধিকরণ: "অঙ্কে কাঁচা", "জীবে দয়া", "ধর্মে মতি"—সকল ক্ষেত্রেই বিষয় বোঝালে অধিকরণ কারক হয়।',
    examTag: 'Primary TET',
    difficulty: 'Hard',
    source: 'curated',
  },
];
