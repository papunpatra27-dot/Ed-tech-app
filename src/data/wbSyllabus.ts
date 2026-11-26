import { ExamTarget, Subject } from '../types';

export const EXAM_TARGETS: Array<{
  id: ExamTarget;
  label: string;
  shortLabel: string;
  authority: string;
}> = [
  {
    id: 'ALL',
    label: 'All West Bengal Exams',
    shortLabel: 'All WB Exams',
    authority: 'WBPSC · WBPRB · WBBPE',
  },
  {
    id: 'WBCS',
    label: 'WBCS (Exec.) Prelims & Mains',
    shortLabel: 'WBCS',
    authority: 'WBPSC',
  },
  {
    id: 'WBPSC_CLERKSHIP',
    label: 'WBPSC Clerkship & Misc.',
    shortLabel: 'Clerkship',
    authority: 'WBPSC',
  },
  {
    id: 'WB_POLICE',
    label: 'WB Police SI & Constable',
    shortLabel: 'WB Police',
    authority: 'WBPRB',
  },
  {
    id: 'PRIMARY_TET',
    label: 'WB Primary TET',
    shortLabel: 'Primary TET',
    authority: 'WBBPE',
  },
  {
    id: 'FOOD_SI',
    label: 'WBPSC Food Sub-Inspector',
    shortLabel: 'Food SI',
    authority: 'WBPSC',
  },
];

export const WB_SUBJECTS: Subject[] = [
  {
    id: 'wb-gk',
    name: 'West Bengal History, Geo & GK',
    bengaliName: 'পশ্চিমবঙ্গ ইতিহাস, ভূগোল ও সাধারণ জ্ঞান',
    description:
      'Complete state syllabus: WB physiography, river basins, Pala-Sena-Nawabs, Bengal Renaissance, revolutionary movement, economy, and welfare schemes.',
    examFocus: 'WBCS (Prelims & Mains) · WB Police SI · Clerkship',
    accentHex: '#1d4ed8',
    chapters: [
      {
        id: 'wb-physiography',
        subjectId: 'wb-gk',
        title: 'Physiography, Hills & Mountain Passes of WB',
        bengaliTitle: 'পশ্চিমবঙ্গের ভূপ্রকৃতি, পাহাড় ও গিরিপথ',
        topics:
          'Darjeeling Himalayas, Singalila & Darjeeling ridges, Sandakphu, Falut, Tiger Hill, Terai-Dooars, Rarh plain, Western Plateau (Ajodhya, Susunia, Biharinath), Sundarbans active delta',
        weightage: 'Very High',
      },
      {
        id: 'wb-rivers-geo',
        subjectId: 'wb-gk',
        title: 'River Systems, Multipurpose Projects & Flood Plains',
        bengaliTitle: 'পশ্চিমবঙ্গের নদনদী, বহুমুখী পরিকল্পনা ও প্লাবনভূমি',
        topics:
          'Bhagirathi-Hooghly, Farakka Barrage, Teesta-Torsa-Jaldhaka-Mahananda, Damodar (DVC, Panchet, Maithon), Mayurakshi (Massanjore), Kangsabati, Subarnarekha, Bidyadhari & Matla tidal rivers',
        weightage: 'Very High',
      },
      {
        id: 'wb-climate-soils',
        subjectId: 'wb-gk',
        title: 'Climate, Agro-Climatic Zones, Soils & Forests of WB',
        bengaliTitle: 'পশ্চিমবঙ্গের জলবায়ু, মৃত্তিকা ও স্বাভাবিক উদ্ভিদ',
        topics:
          'Kalbaishakhi (Nor’westers), Buxaduar vs Mayureswar rainfall extremes, Old & New Alluvium, Lateritic Rarh soils, Saline Sundarban soils, 6 National Parks & 15 Wildlife Sanctuaries',
        weightage: 'High Yield',
      },
      {
        id: 'wb-districts-borders',
        subjectId: 'wb-gk',
        title: 'Districts, Administrative Divisions & Border Geography',
        bengaliTitle: 'পশ্চিমবঙ্গের জেলা, প্রশাসনিক বিভাগ ও সীমানা',
        topics:
          '5 Administrative Divisions, 23 Districts (2014–2017 bifurcations: Alipurduar, Kalimpong, Jhargram, Paschim Bardhaman), Siliguri Corridor, 5 state borders & 3 international borders',
        weightage: 'High Yield',
      },
      {
        id: 'wb-ancient-medieval',
        subjectId: 'wb-gk',
        title: 'Ancient & Medieval Bengal (Gauda, Pala, Sena & Sultanate)',
        bengaliTitle: 'প্রাচীন ও মধ্যযুগের বাংলা (গৌড়, পাল, সেন ও সুলতানি)',
        topics:
          'Pundravardhana, Tamralipta, Shashanka of Gauda, Matsyanyaya, Gopala-Dharmapala-Devapala, Kaivarta Revolt, Vijayasena-Lakshmanasena, Ilyas Shah, Alauddin Hussain Shah, Murshid Quli Khan & Siraj-ud-Daulah',
        weightage: 'Very High',
      },
      {
        id: 'wb-renaissance',
        subjectId: 'wb-gk',
        title: 'Bengal Renaissance, Reformers & 19th-Century Press',
        bengaliTitle: 'বাংলার নবজাগরণ, সমাজ সংস্কার ও সংবাদপত্র',
        topics:
          'Atmiya Sabha (1815), Brahmo Samaj (1828), Sati Abolition (1829), Young Bengal & Derozio, Tattvabodhini Sabha, Vidyasagar & Widow Remarriage Act (1856), Ramakrishna-Vivekananda, Samachar Darpan & Sambad Kaumudi',
        weightage: 'Very High',
      },
      {
        id: 'wb-revolutionary',
        subjectId: 'wb-gk',
        title: 'Revolutionary Nationalism & Freedom Struggle in Bengal',
        bengaliTitle: 'বাংলায় বিপ্লবী আন্দোলন ও স্বাধীনতা সংগ্রাম',
        topics:
          'Partition of Bengal (1905), Swadeshi & Raksha Bandhan, Anushilan Samiti & Jugantar, Alipore Bomb Case (1908), Bagha Jatin, Surya Sen & Chittagong Armoury Raid (1930), Binoy-Badal-Dinesh, Pritilata, Netaji & Forward Bloc',
        weightage: 'Very High',
      },
      {
        id: 'wb-peasant-tribal',
        subjectId: 'wb-gk',
        title: 'Peasant, Tribal & Indigo Uprisings in Bengal',
        bengaliTitle: 'বাংলার কৃষক, উপজাতি ও নীল বিদ্রোহ',
        topics:
          'Sanyasi-Fakir Rebellion, Chuar & Bhumij Revolts, Pagal Panthi & Faraizi Movement, Titumir’s Barasat Revolt, Santhal Hul (1855–56), Indigo Revolt (1859–60) & Neel Darpan, Pabna League (1873), Tebhaga Movement (1946)',
        weightage: 'High Yield',
      },
      {
        id: 'wb-economy-industry',
        subjectId: 'wb-gk',
        title: 'West Bengal Economy, Industries, Minerals & GI Tags',
        bengaliTitle: 'পশ্চিমবঙ্গের অর্থনীতি, শিল্প, খনিজ ও জিআই ট্যাগ',
        topics:
          'Raniganj coalfield, Durgapur-Asansol-Burnpur steel belt, Haldia petrochemical & port, Chittaranjan Locomotive, Tea & Jute economy, IT hubs (Salt Lake/New Town), GI Tags (Darjeeling Tea, Rasogolla, Gobindobhog, Chhau Masks)',
        weightage: 'High Yield',
      },
      {
        id: 'wb-schemes-admin',
        subjectId: 'wb-gk',
        title: 'WB Welfare Schemes, Folk Culture & Heritage Sites',
        bengaliTitle: 'পশ্চিমবঙ্গের প্রকল্প, লোকসংস্কৃতি ও ঐতিহ্য',
        topics:
          'Kanyashree, Lakshmir Bhandar, Swasthya Sathi, Krishak Bandhu, Sabooj Sathi, Rupashree, Utkarsh Bangla, Student Credit Card, Chhau-Baul-Gambhira, UNESCO Sites (Sundarbans, Darjeeling Himalayan Railway, Santiniketan)',
        weightage: 'High Yield',
      },
    ],
  },
  {
    id: 'history',
    name: 'Indian History & National Movement',
    bengaliName: 'ভারতের ইতিহাস ও জাতীয় আন্দোলন',
    description:
      'Exhaustive Prelims & Mains syllabus from Harappan Civilization and Mauryan polity to Governor-Generals, Constitutional Acts, and Gandhian Movements.',
    examFocus: 'WBCS (50 Marks) · Clerkship · Police SI',
    accentHex: '#b45309',
    chapters: [
      {
        id: 'hist-ancient',
        subjectId: 'history',
        title: 'Prehistoric, Indus Valley & Vedic Civilization',
        bengaliTitle: 'প্রাগৈতিহাসিক, সিন্ধু সভ্যতা ও বৈদিক যুগ',
        topics:
          'Palaeolithic-Neolithic sites (Bhimbetka, Mehrgarh), Harappan town planning & script, Rigvedic vs Later Vedic polity, Sabha-Samiti, Upanishads & Vedangas',
        weightage: 'High Yield',
      },
      {
        id: 'hist-buddhism-jain',
        subjectId: 'history',
        title: 'Mahajanapadas, Buddhism, Jainism & Heterodox Sects',
        bengaliTitle: 'ষোড়শ মহাজনপদ, বৌদ্ধ ও জৈন ধর্ম',
        topics:
          '16 Mahajanapadas, Rise of Magadha (Haryanka, Shishunaga, Nanda), 4 Buddhist Councils, Hinayana vs Mahayana, Tripitakas, Jain Tirthankaras, Ajivikas & Syadvada',
        weightage: 'Very High',
      },
      {
        id: 'hist-maurya-sangam',
        subjectId: 'history',
        title: 'Mauryan Empire, Post-Mauryan & Sangam Age',
        bengaliTitle: 'মৌর্য সাম্রাজ্য, মৌর্য-পরবর্তী যুগ ও সঙ্গম সাহিত্য',
        topics:
          'Chandragupta & Arthashastra, Megasthenes Indica, Ashoka’s Major & Minor Rock Edicts, Indo-Greeks, Kushanas (Kanishka), Satavahanas, Chera-Chola-Pandya & Sangam texts',
        weightage: 'Very High',
      },
      {
        id: 'hist-gupta-earlymed',
        subjectId: 'history',
        title: 'Gupta Golden Age, Harshavardhana & Tripartite Struggle',
        bengaliTitle: 'গুপ্ত যুগ, হর্ষবর্ধন ও ত্রিশক্তি সংগ্রাম',
        topics:
          'Samudragupta Prayag Prashasti, Chandragupta II & Fa-Hien, Nalanda, Aryabhata-Varahamihira-Kalidasa, Harshavardhana & Xuanzang, Rashtrakuta-Pratihara-Pala struggle',
        weightage: 'High Yield',
      },
      {
        id: 'hist-medieval',
        subjectId: 'history',
        title: 'Delhi Sultanate: Polity, Administration & Architecture',
        bengaliTitle: 'দিল্লি সুলতানি: শাসনব্যবস্থা ও স্থাপত্য',
        topics:
          'Iqta system, Balban’s theory of kingship, Alauddin Khilji market & military reforms, Muhammad bin Tughlaq experiments, Firoz Shah Tughlaq, Amir Khusrau & Indo-Islamic architecture',
        weightage: 'High Yield',
      },
      {
        id: 'hist-mughal',
        subjectId: 'history',
        title: 'Mughal Empire: Mansabdari, Revenue & Culture',
        bengaliTitle: 'মুঘল সাম্রাজ্য: মনসবদারি, রাজস্ব ও সংস্কৃতি',
        topics:
          'Babur-Humayun-Sher Shah Suri (Rupiya & GT Road), Akbar’s Mansabdari, Todar Mal’s Dahsala, Sulh-i-Kul, Jahangir-Shah Jahan-Aurangzeb Deccan policy, Mughal painting & Persian chronicles',
        weightage: 'Very High',
      },
      {
        id: 'hist-bhakti-regional',
        subjectId: 'history',
        title: 'Bhakti, Sufi Movements & Regional Kingdoms',
        bengaliTitle: 'ভক্তি ও সুফি আন্দোলন এবং আঞ্চলিক রাজ্য',
        topics:
          'Nirguna vs Saguna Bhakti (Kabir, Nanak, Chaitanya, Mirabai, Tukaram), Chishti & Suhrawardi Silsilas, Vijayanagara (Krishnadevaraya), Bahmani Kingdom & Shivaji’s Ashtapradhan',
        weightage: 'High Yield',
      },
      {
        id: 'hist-british-acts',
        subjectId: 'history',
        title: 'British Expansion, Governor-Generals & Charter Acts (1757–1858)',
        bengaliTitle: 'ব্রিটিশ বিস্তার, গভর্নর-জেনারেল ও সনদ আইন',
        topics:
          'Plassey, Buxar, Dual Govt, Subsidiary Alliance (Wellesley), Doctrine of Lapse (Dalhousie), Permanent Settlement (1793), Ryotwari & Mahalwari, Regulating Act 1773, Pitt’s Act 1784, Charter Acts 1813/1833/1853',
        weightage: 'Very High',
      },
      {
        id: 'hist-1857-socio',
        subjectId: 'history',
        title: 'Revolt of 1857, Socio-Religious Reforms & Early Nationalism',
        bengaliTitle: '১৮৫৭ মহাবিদ্রোহ, সমাজ সংস্কার ও প্রাক-কংগ্রেস যুগ',
        topics:
          'Causes & centres of 1857 Revolt, Act of 1858, Arya Samaj, Prarthana Samaj, Satyashodhak Samaj, Aligarh & Theosophical Movements, Indian Association (1876), Ilbert Bill & INC Foundation (1885)',
        weightage: 'Very High',
      },
      {
        id: 'hist-inm',
        subjectId: 'history',
        title: 'Gandhian Era, Constitutional Deadlocks & Independence (1905–1947)',
        bengaliTitle: 'গান্ধী যুগ, সাংবিধানিক অচলাবস্থা ও স্বাধীনতা (১৯০৫-১৯৪৭)',
        topics:
          'Moderates vs Extremists, Surat Split (1907), Home Rule, Lucknow Pact (1916), Rowlatt-Khilafat-NCM, Swaraj Party, Simon-Nehru Report, CDM & Round Table Conferences, GOI Act 1935, Quit India, RIN Mutiny & Mountbatten Plan',
        weightage: 'Very High',
      },
    ],
  },
  {
    id: 'polity',
    name: 'Indian Polity & Governance',
    bengaliName: 'ভারতীয় সংবিধান ও শাসনব্যবস্থা',
    description:
      'Full Lakshmikant-grade coverage: Historical Acts, Preamble, Articles 1–395, Parliament, Judiciary, Federalism, Panchayati Raj, and Amendments.',
    examFocus: 'WBCS · WBPSC Misc · Police SI',
    accentHex: '#0f766e',
    chapters: [
      {
        id: 'pol-making',
        subjectId: 'polity',
        title: 'Historical Acts, Constituent Assembly & Salient Features',
        bengaliTitle: 'ঐতিহাসিক আইন, গণপরিষদ ও সংবিধানের বৈশিষ্ট্য',
        topics:
          '1909, 1919 & 1935 Acts, Cabinet Mission Plan, Constituent Assembly Committees, Borrowed Features (UK, USA, Ireland, Canada, Australia, Weimar, USSR), 12 Schedules',
        weightage: 'Very High',
      },
      {
        id: 'pol-preamble-cit',
        subjectId: 'polity',
        title: 'Preamble, Union & Territory, Citizenship (Arts 1–11)',
        bengaliTitle: 'প্রস্তাবনা, রাজ্য পুনর্গঠন ও নাগরিকত্ব (ধারা ১-১১)',
        topics:
          'Berubari vs Kesavananda Bharati cases, 42nd Amendment Preamble keywords, Articles 1–4, Fazl Ali Commission & Linguistic Reorganization, Citizenship Act 1955 & CAA provisions',
        weightage: 'High Yield',
      },
      {
        id: 'pol-preamble-fr',
        subjectId: 'polity',
        title: 'Fundamental Rights & Writ Jurisdiction (Arts 12–35)',
        bengaliTitle: 'মৌলিক অধিকার ও লেখ (রিট) জারি ক্ষমতা (ধারা ১২-৩৫)',
        topics:
          'Article 13 Judicial Review, Right to Equality (14–18), Freedom (19–22), Preventive Detention, Exploitation (23–24), Religion (25–28), Minorities (29–30), Art 32 vs 226 Writs, Martial Law & Art 33–35',
        weightage: 'Very High',
      },
      {
        id: 'pol-dpsp-fd',
        subjectId: 'polity',
        title: 'Directive Principles (DPSP) & Fundamental Duties (Arts 36–51A)',
        bengaliTitle: 'নির্দেশাত্মক নীতি ও মৌলিক কর্তব্য (ধারা ৩৬-৫১ক)',
        topics:
          'Socialistic, Gandhian & Liberal-Intellectual DPSPs, Art 39A, 40, 43A, 44 (UCC), 48A, 50, 51, Conflict between FR & DPSP (Minerva Mills), Swaran Singh Committee & 11 Fundamental Duties',
        weightage: 'High Yield',
      },
      {
        id: 'pol-union-exec',
        subjectId: 'polity',
        title: 'Union Executive: President, Vice-President, PM & Council',
        bengaliTitle: 'কেন্দ্রীয় শাসনবিভাগ: রাষ্ট্রপতি, উপরাষ্ট্রপতি ও প্রধানমন্ত্রী',
        topics:
          'Presidential Electoral College, Impeachment (Art 61), Veto powers, Pardoning power (Art 72), Ordinance (Art 123), Collective vs Individual Responsibility, Cabinet Committees',
        weightage: 'Very High',
      },
      {
        id: 'pol-parliament',
        subjectId: 'polity',
        title: 'Parliament: Lok Sabha, Rajya Sabha, Bills, Budget & Committees',
        bengaliTitle: 'সংসদ: লোকসভা, রাজ্যসভা, বিল ও সংসদীয় কমিটি',
        topics:
          'Anti-Defection (10th Schedule), Parliamentary Motions (Adjournment, No-Confidence, Cut Motions), Ordinary vs Money (Art 110) vs Financial Bills (Art 117), Joint Sitting (Art 108), PAC & Estimates Committee',
        weightage: 'Very High',
      },
      {
        id: 'pol-union-state',
        subjectId: 'polity',
        title: 'State Executive & Legislature: Governor, CM & WB Assembly',
        bengaliTitle: 'রাজ্য শাসনবিভাগ: রাজ্যপাল, মুখ্যমন্ত্রী ও বিধানসভা',
        topics:
          'Governor Appointment & Discretionary Powers (Art 163, 200, 213), Legislative Assembly vs Council (Art 169), State Money Bill (Art 199), Advocate General (Art 165)',
        weightage: 'High Yield',
      },
      {
        id: 'pol-judiciary',
        subjectId: 'polity',
        title: 'Judiciary: Supreme Court, High Courts, Collegium & PIL',
        bengaliTitle: 'বিচারবিভাগ: সুপ্রিম কোর্ট, হাইকোর্ট ও জনস্বার্থ মামলা',
        topics:
          'Original, Appellate & Advisory Jurisdiction (Art 143), Court of Record (Art 129), Calcutta High Court jurisdiction, NJAC vs Collegium, Judicial Activism, Lok Adalat & Gram Nyayalaya',
        weightage: 'High Yield',
      },
      {
        id: 'pol-federal-emerg',
        subjectId: 'polity',
        title: 'Centre-State Relations, Inter-State Councils & Emergency',
        bengaliTitle: 'কেন্দ্র-রাজ্য সম্পর্ক ও জরুরি অবস্থা',
        topics:
          '7th Schedule Lists (Union, State, Concurrent), Sarkaria & Punchhi Commissions, GST Council (Art 279A), National (Art 352), President’s Rule (Art 356) & Financial Emergency (Art 360)',
        weightage: 'Very High',
      },
      {
        id: 'pol-panchayat',
        subjectId: 'polity',
        title: 'Panchayati Raj, Constitutional Bodies & Major Amendments',
        bengaliTitle: 'পঞ্চায়েতি রাজ, সাংবিধানিক সংস্থা ও সংবিধান সংশোধনী',
        topics:
          'Balwant Rai & Ashok Mehta Committees, 73rd & 74th Amendments (PESA 1996), ECI (Art 324), UPSC, CAG (Art 148), Finance Commission (Art 280), NCSC/NCST/NCBC, 42nd/44th/86th/101st/106th Amendments',
        weightage: 'Very High',
      },
    ],
  },
  {
    id: 'economy',
    name: 'Indian Economy & Planning',
    bengaliName: 'ভারতীয় অর্থনীতি ও পরিকল্পনা',
    description:
      'Macroeconomics, RBI monetary policy, banking reforms, Union Budget, GST, Five-Year Plans, agriculture, BoP, and global financial bodies.',
    examFocus: 'WBCS Mains (100 Marks) · WBCS Prelims · Clerkship',
    accentHex: '#0e7490',
    chapters: [
      {
        id: 'eco-national-income',
        subjectId: 'economy',
        title: 'National Income (GDP, GNP, NNP) & Human Development Indices',
        bengaliTitle: 'জাতীয় আয় (GDP, GNP) ও মানব উন্নয়ন সূচক',
        topics:
          'Factor Cost vs Market Price, Nominal vs Real GDP, GDP Deflator, Green GDP, HDI (UNDP), MPI, Gini Coefficient & Lorenz Curve',
        weightage: 'High Yield',
      },
      {
        id: 'pol-economy',
        subjectId: 'economy',
        title: 'RBI, Monetary Policy, Inflation & Banking Reforms',
        bengaliTitle: 'রিজার্ভ ব্যাঙ্ক, মুদ্রানীতি, মুদ্রাস্ফীতি ও ব্যাঙ্কিং সংস্কার',
        topics:
          'MPC, Repo/SDF/MSF/Bank Rate, CRR & SLR, Open Market Operations, WPI vs CPI inflation, Narasimham Committees, NPA, Basel Norms & Insolvency Code (IBC)',
        weightage: 'Very High',
      },
      {
        id: 'eco-fiscal-gst',
        subjectId: 'economy',
        title: 'Fiscal Policy, Union Budget, FRBM & GST Architecture',
        bengaliTitle: 'রাজস্ব নীতি, বাজেট, FRBM ও জিএসটি কাঠামো',
        topics:
          'Revenue vs Capital Budget, Fiscal/Revenue/Primary Deficit, FRBM Act 2003, Direct vs Indirect Taxes, Progressive Taxation, 101st Amendment GST & Finance Commission grants',
        weightage: 'Very High',
      },
      {
        id: 'eco-planning-lpg',
        subjectId: 'economy',
        title: 'Five-Year Plans, NITI Aayog & 1991 Economic Reforms',
        bengaliTitle: 'পঞ্চবার্ষিকী পরিকল্পনা, নীতি আয়োগ ও ১৯৯১ সংস্কার',
        topics:
          'Harrod-Domar (1st), Mahalanobis (2nd), Plan Holidays, Rolling Plan, Garibi Hatao, 1991 LPG Reforms (Rao-Manmohan), NITI Aayog structure & Cooperative Federalism',
        weightage: 'Very High',
      },
      {
        id: 'eco-agriculture',
        subjectId: 'economy',
        title: 'Indian Agriculture, Green Revolution, MSP & Food Security',
        bengaliTitle: 'ভারতীয় কৃষি, সবুজ বিপ্লব, ন্যূনতম সহায়ক মূল্য ও খাদ্য সুরক্ষা',
        topics:
          'Green, White & Blue Revolutions, CACP & MSP formula, NABARD (1982, Shivaraman Committee), Kisan Credit Card, e-NAM, FCI & National Food Security Act 2013',
        weightage: 'High Yield',
      },
      {
        id: 'eco-industry-trade',
        subjectId: 'economy',
        title: 'Industrial Policy, MSMEs, Foreign Trade & Balance of Payments',
        bengaliTitle: 'শিল্পনীতি, ক্ষুদ্র শিল্প ও বৈদেশিক বাণিজ্য ভারসাম্য',
        topics:
          'Industrial Policy Resolutions (1948, 1956, 1991), Maharatna/Navratna PSUs, SEZs, BoP Current vs Capital Account, FDI vs FPI, Convertibility & Forex Reserves',
        weightage: 'High Yield',
      },
      {
        id: 'eco-poverty-schemes',
        subjectId: 'economy',
        title: 'Poverty, Unemployment, Demographics & Union Schemes',
        bengaliTitle: 'দারিদ্র্য, বেকারত্ব, জনসংখ্যা ও কেন্দ্রীয় প্রকল্প',
        topics:
          'Alagh, Lakdawala, Tendulkar & Rangarajan Committees, Disguised/Structural/Frictional unemployment, Demographic Dividend, MGNREGA, PM-KISAN, Jan Dhan & Mudra Yojana',
        weightage: 'Moderate',
      },
      {
        id: 'eco-global-bodies',
        subjectId: 'economy',
        title: 'International Financial Institutions & Trade Blocs',
        bengaliTitle: 'আন্তর্জাতিক আর্থিক সংস্থা ও বাণিজ্য জোট',
        topics:
          'IMF (SDR), World Bank Group (IBRD, IDA, IFC), WTO (Amber/Blue/Green Box subsidies, TRIPS), ADB, AIIB, New Development Bank (BRICS), G20 & ASEAN',
        weightage: 'Moderate',
      },
    ],
  },
  {
    id: 'geography',
    name: 'Geography of India & World',
    bengaliName: 'ভারত ও বিশ্বের ভূগোল',
    description:
      'Physical, Indian, and Economic Geography covering plate tectonics, climatology, Indian physiography, drainage, monsoon, minerals, and census data.',
    examFocus: 'WBCS · Clerkship · Primary TET',
    accentHex: '#0369a1',
    chapters: [
      {
        id: 'geo-universe-world',
        subjectId: 'geography',
        title: 'Geomorphology, Earth Motions, Latitudes & Plate Tectonics',
        bengaliTitle: 'ভূমিরূপবিদ্যা, পৃথিবীর গতি ও পাত সংস্থান তত্ত্ব',
        topics:
          'Solar system, Solstices & Equinoxes, IST & IDL time math, Interior of Earth (SIAL/SIMA/NIFE), Wegener Continental Drift, Plate Boundaries, Earthquake P/S/L waves & Volcanoes',
        weightage: 'High Yield',
      },
      {
        id: 'geo-climatology',
        subjectId: 'geography',
        title: 'Climatology: Atmospheric Layers, Winds, Cyclones & Biomes',
        bengaliTitle: 'জলবায়ুবিদ্যা: বায়ুমণ্ডল, নিয়ত বায়ু ও ঘূর্ণিঝড়',
        topics:
          'Troposphere to Exosphere, Pressure Belts, Trade/Westerlies/Polar winds, Coriolis force, Jet Streams, Tropical vs Temperate Cyclones, Koppen climate classification',
        weightage: 'High Yield',
      },
      {
        id: 'geo-oceanography',
        subjectId: 'geography',
        title: 'Oceanography: Currents, Tides, Salinity & Major Straits',
        bengaliTitle: 'সমুদ্রবিজ্ঞান: সমুদ্রস্রোত, জোয়ার-ভাটা ও প্রণালী',
        topics:
          'Ocean floor relief, Warm vs Cold currents (Gulf Stream, Kuroshio, Labrador, Humboldt), Spring & Neap tides, Coral bleaching, World straits, canals & major deserts',
        weightage: 'Moderate',
      },
      {
        id: 'geo-physiography',
        subjectId: 'geography',
        title: 'India: Geological Structure & Physiographic Divisions',
        bengaliTitle: 'ভারতের ভূতাত্ত্বিক গঠন ও ভূপ্রাকৃতিক বিভাগ',
        topics:
          'Archean to Quaternary rock systems, Himalayas (Syntaxial bends, Karewas, Passes), Northern Plains (Bhabar, Terai, Bhangar, Khadar), Peninsular Plateau, Western/Eastern Ghats & Island groups',
        weightage: 'Very High',
      },
      {
        id: 'geo-drainage-india',
        subjectId: 'geography',
        title: 'Drainage Systems of India (Himalayan vs Peninsular)',
        bengaliTitle: 'ভারতের নদনদী ব্যবস্থা (হিমালয় ও উপদ্বীপীয় নদী)',
        topics:
          'Indus Water Treaty & 5 tributaries, Ganga left/right bank tributaries, Brahmaputra system, Godavari-Krishna-Kaveri-Mahanadi, Rift-valley Narmada & Tapi, Lakes & Waterfalls',
        weightage: 'Very High',
      },
      {
        id: 'geo-climate-soil',
        subjectId: 'geography',
        title: 'Indian Monsoon, El Nino/IOD, Soils & Natural Vegetation',
        bengaliTitle: 'ভারতের মৌসুমি বায়ু, এল নিনো, মৃত্তিকা ও অরণ্য',
        topics:
          'ITCZ shift, Tibetan Plateau heating, Somali Jet, El Nino/La Nina & IOD, Western Disturbances, Retreating Monsoon, 8 ICAR Soil groups, Champion & Seth Forest types',
        weightage: 'Very High',
      },
      {
        id: 'geo-agriculture-india',
        subjectId: 'geography',
        title: 'Indian Agriculture, Irrigation & Multipurpose River Projects',
        bengaliTitle: 'ভারতীয় কৃষি, সেচ ও বহুমুখী নদী পরিকল্পনা',
        topics:
          'Kharif/Rabi/Zaid crop belts, Top producing states (rice, wheat, cotton, sugarcane, tea, coffee, spices), Bhakra-Nangal, Hirakud, Tehri, Sardar Sarovar & Polavaram projects',
        weightage: 'High Yield',
      },
      {
        id: 'geo-resources',
        subjectId: 'geography',
        title: 'Minerals, Energy Resources & Industrial Belts of India',
        bengaliTitle: 'খনিজ সম্পদ, শক্তি ও শিল্পাঞ্চল',
        topics:
          'Chota Nagpur mineral heartland, Coal (Gondwana vs Tertiary), Iron ore (Bailadila, Mayurbhanj), Petroleum (Bombay High, Digboi), Nuclear plants, Steel & Textile regions',
        weightage: 'High Yield',
      },
      {
        id: 'geo-transport-census',
        subjectId: 'geography',
        title: 'Transport Corridors, Major Ports, Census 2011 & Tribes',
        bengaliTitle: 'পরিবহণ, প্রধান বন্দর, আদমশুমারি ২০১১ ও উপজাতি',
        topics:
          '13 Major Ports, National Waterways (NW-1 to NW-5), Golden Quadrilateral & Dedicated Freight Corridors, Census 2011 (Density, Literacy, Sex Ratio in India & WB), PVTG Tribes',
        weightage: 'High Yield',
      },
    ],
  },
  {
    id: 'science',
    name: 'General Science, Tech & Environment',
    bengaliName: 'সাধারণ বিজ্ঞান, প্রযুক্তি ও পরিবেশ',
    description:
      'Physics, Chemistry, Human Biology, Environmental Studies (EVS), and ISRO/Biotech advancements calibrated for WBCS & TET.',
    examFocus: 'WBCS · Food SI · Police · Primary TET',
    accentHex: '#15803d',
    chapters: [
      {
        id: 'sci-mechanics',
        subjectId: 'science',
        title: 'Mechanics, Laws of Motion, Gravitation & Fluid Properties',
        bengaliTitle: 'বলবিদ্যা, গতিসূত্র, মহাকর্ষ ও প্রবাহী ধর্ম',
        topics:
          'SI units & dimensional analysis, Newton’s Laws & Momentum, Work-Energy-Power, Escape velocity & Kepler’s laws, Archimedes principle, Surface tension, Viscosity & Bernoulli’s theorem',
        weightage: 'High Yield',
      },
      {
        id: 'sci-physics',
        subjectId: 'science',
        title: 'Optics, Waves, Sound, Heat & Thermodynamics',
        bengaliTitle: 'আলোকবিজ্ঞান, শব্দ, তাপ ও তাপগতিবিদ্যা',
        topics:
          'Reflection & Refraction, Total Internal Reflection, Spherical Mirrors & Lenses, Eye defects, Scattering & Diffraction, Doppler effect, Ultrasound, Latent heat & Laws of Thermodynamics',
        weightage: 'Very High',
      },
      {
        id: 'sci-electricity',
        subjectId: 'science',
        title: 'Electricity, Magnetism, Semiconductors & Nuclear Physics',
        bengaliTitle: 'তড়িৎ, চুম্বকত্ব, অর্ধপরিবাহী ও নিউক্লীয় পদার্থবিদ্যা',
        topics:
          'Ohm’s Law, Series/Parallel circuits, Joule heating, Transformers & Electromagnetic induction, p-n junction diodes, Nuclear fission vs fusion, Radioactivity & Half-life',
        weightage: 'High Yield',
      },
      {
        id: 'sci-chem-atomic',
        subjectId: 'science',
        title: 'Atomic Structure, Bonding, Periodic Table & Gas Laws',
        bengaliTitle: 'পরমাণুর গঠন, রাসায়নিক বন্ধন ও পর্যায় সারণি',
        topics:
          'Quantum numbers, Isotopes-Isobars-Isotones, Ionic/Covalent/Hydrogen bonding, Periodic trends (electronegativity, ionization energy), Boyle’s/Charles’s laws & Oxidation-Reduction',
        weightage: 'Moderate',
      },
      {
        id: 'sci-chemistry',
        subjectId: 'science',
        title: 'Acids, Bases, Metallurgy, Alloys & Organic Polymers',
        bengaliTitle: 'অ্যাসিড, ক্ষার, ধাতুবিদ্যা, সংকর ধাতু ও পলিমার',
        topics:
          'Arrhenius/Bronsted-Lowry acids, pH buffer solutions, Important ores (Bauxite, Haematite, Galena, Pitchblende), Alloys, Common chemicals, Soaps vs Detergents, Plastics & Vulcanized rubber',
        weightage: 'High Yield',
      },
      {
        id: 'sci-cell-genetics',
        subjectId: 'science',
        title: 'Cell Biology, Genetics, Evolution & Plant Physiology',
        bengaliTitle: 'কোষবিদ্যা, জিনতত্ত্ব, বিবর্তন ও উদ্ভিদ শরীরবিদ্যা',
        topics:
          'Prokaryotic vs Eukaryotic organelles, Mitosis vs Meiosis, DNA/RNA structure, Mendel’s Laws, Sex-linked inheritance, Photosynthesis (Light/Calvin cycles), Transpiration & Plant Hormones',
        weightage: 'High Yield',
      },
      {
        id: 'sci-biology',
        subjectId: 'science',
        title: 'Human Physiology: Circulatory, Nervous & Endocrine Systems',
        bengaliTitle: 'মানব শরীরবিদ্যা: সংবহন, স্নায়ু ও অন্তঃক্ষরা তন্ত্র',
        topics:
          'Cardiac cycle, Blood groups (ABO & Rh), Clotting factors, Nephron & Urine formation, Brain regions (Cerebrum, Cerebellum, Medulla), Pituitary-Thyroid-Adrenal-Pancreas hormones',
        weightage: 'Very High',
      },
      {
        id: 'sci-nutrition-disease',
        subjectId: 'science',
        title: 'Nutrition, Vitamins, Immunity & Pathogenic Diseases',
        bengaliTitle: 'পুষ্টি, ভিটামিন, অনাক্রম্যতা ও রোগব্যাধি',
        topics:
          'Macromolecules, Vitamins A–K chemical names & deficiencies, B-cell vs T-cell immunity, Vaccines, Viral (Dengue, Hepatitis), Bacterial (TB, Cholera, Typhoid) & Protozoan (Malaria, Kala-azar) diseases',
        weightage: 'Very High',
      },
      {
        id: 'sci-evs',
        subjectId: 'science',
        title: 'Ecology, Biodiversity Hotspots, Ramsar Sites & Laws',
        bengaliTitle: 'বাস্তুতন্ত্র, জীববৈচিত্র্য, রামসার ও পরিবেশ আইন',
        topics:
          'Ecological pyramids & 10% Law, Nitrogen/Carbon cycles, India’s 4 Biodiversity Hotspots, IUCN Red List, Ramsar sites in WB & India, EIA, Montreal/Kyoto/Paris agreements, Pollutants',
        weightage: 'Very High',
      },
      {
        id: 'sci-space-tech',
        subjectId: 'science',
        title: 'Space (ISRO), Defence Tech, Biotechnology & Computing',
        bengaliTitle: 'মহাকাশ (ইসরো), প্রতিরক্ষা প্রযুক্তি ও বায়োটেকনোলজি',
        topics:
          'PSLV/GSLV/LVM3, Chandrayaan-3, Aditya-L1, Gaganyaan, DRDO missiles (IGMDP), CRISPR-Cas9 gene editing, Stem cells, AI/Quantum basics & Nanotechnology',
        weightage: 'High Yield',
      },
    ],
  },
  {
    id: 'quant',
    name: 'Quantitative Aptitude & Mensuration',
    bengaliName: 'পাটিগণিত, বীজগণিত ও পরিমিতি',
    description:
      'Complete WBCS Mains Paper VI, Food SI, Clerkship, and WB Police quantitative syllabus from Number System to Mensuration & Trigonometry.',
    examFocus: 'WBCS Mains (100 Marks) · Food SI (50 Marks) · Clerkship',
    accentHex: '#4338ca',
    chapters: [
      {
        id: 'qnt-number-system',
        subjectId: 'quant',
        title: 'Number System, Divisibility, Remainder Theorem & Surds',
        bengaliTitle: 'সংখ্যাতত্ত্ব, বিভাজ্যতা, ভাগশেষ উপপাদ্য ও করণী',
        topics:
          'Unit digit cyclicity, Trailing zeroes, Fermat/Euler/Wilson remainder shortcuts, Divisibility (7, 11, 13, 72, 88, 99), Factor count & sum, Surds & Indices',
        weightage: 'Very High',
      },
      {
        id: 'qnt-hcf-lcm-avg',
        subjectId: 'quant',
        title: 'HCF, LCM, Simplification, Fractions & Averages',
        bengaliTitle: 'গসাগু, লসাগু, সরলীকরণ, ভগ্নাংশ ও গড়',
        topics:
          'Bell/traffic light LCM cycles, Remainder-based HCF/LCM problems, BODMAS & algebraic identities simplification, Weighted average & age-replacement averages',
        weightage: 'High Yield',
      },
      {
        id: 'qnt-percent-profit',
        subjectId: 'quant',
        title: 'Percentage, Successive Change, Election & Venn Problems',
        bengaliTitle: 'শতকরা, ক্রমিক পরিবর্তন, নির্বাচন ও ভেন চিত্র সমস্যা',
        topics:
          'Fraction equivalents, Consumption-expenditure inverse ratio, Election valid/invalid votes, Income-tax & commission, Population growth/depreciation',
        weightage: 'Very High',
      },
      {
        id: 'qnt-profit-discount',
        subjectId: 'quant',
        title: 'Profit, Loss, Marked Price Discount & Dishonest Dealer',
        bengaliTitle: 'লাভ-ক্ষতি, ধার্যমূল্য ছাড় ও অসাধু ব্যবসায়ী',
        topics:
          'CP:MP ratio = (100−D):(100+P), Equal SP profit/loss rule, Successive discounts, False weight & cheating both while buying and selling',
        weightage: 'Very High',
      },
      {
        id: 'qnt-ratio-age',
        subjectId: 'quant',
        title: 'Ratio, Proportion, Partnership, Mixture & Alligation',
        bengaliTitle: 'অনুপাত, সমানুপাত, অংশীদারি ও মিশ্রণ',
        topics:
          'Compound ratio, Mean/Third/Fourth proportionals, Active vs Sleeping partner, Replacement of mixture formula, Cross-method & Alligation rule',
        weightage: 'High Yield',
      },
      {
        id: 'qnt-time-work-speed',
        subjectId: 'quant',
        title: 'Time & Work, Work-Wages, Pipes & Cisterns',
        bengaliTitle: 'সময় ও কার্য, মজুরি এবং নল ও চৌবাচ্চা',
        topics:
          'LCM efficiency method, Alternate day working, Leaving before completion, Man-days-hours chain rule, Efficiency ratio & Negative work leak pipes',
        weightage: 'Very High',
      },
      {
        id: 'qnt-tsd-trains',
        subjectId: 'quant',
        title: 'Time, Speed, Distance, Trains, Boats & Circular Races',
        bengaliTitle: 'সময়, গতিবেগ, দূরত্ব, ট্রেন ও নৌকা-স্রোত',
        topics:
          'Relative speed, Crossing poles vs platforms vs moving trains, Upstream/Downstream boats, Stoppage speed reduction, Linear & circular track races',
        weightage: 'Very High',
      },
      {
        id: 'qnt-si-ci-num',
        subjectId: 'quant',
        title: 'Simple Interest, Compound Interest & Instalments',
        bengaliTitle: 'সরল সুদ, চক্রবৃদ্ধি সুদ ও কিস্তি',
        topics:
          'Rate doubling/tripling years, 2-year & 3-year CI−SI differences, Half-yearly & quarterly compounding, Equal annual instalments in SI & CI',
        weightage: 'Very High',
      },
      {
        id: 'qnt-algebra-apgp',
        subjectId: 'quant',
        title: 'Algebra, Quadratic Equations, AP/GP & Logarithms',
        bengaliTitle: 'বীজগণিত, দ্বিঘাত সমীকরণ, প্রগতি (AP/GP) ও লগারিদম',
        topics:
          'Symmetric identities (x + 1/x forms), Roots & discriminant of quadratic equations, Arithmetic & Geometric Progressions, Linear equations & basic Logarithm rules',
        weightage: 'High Yield',
      },
      {
        id: 'qnt-mensuration-trig',
        subjectId: 'quant',
        title: 'Geometry, Mensuration (2D/3D), Trigonometry & Data Interpretation',
        bengaliTitle: 'জ্যামিতি, পরিমিতি (২ডি/৩ডি), ত্রিকোণমিতি ও ডিআই',
        topics:
          'Triangle centres & circle theorems, Area & perimeter (polygons, sectors), Surface area & volume (cylinder, cone, sphere, frustum), Heights & distances, Pie/Bar/Table DI',
        weightage: 'Very High',
      },
    ],
  },
  {
    id: 'reasoning',
    name: 'General Intelligence & Reasoning',
    bengaliName: 'সাধারণ বুদ্ধিমত্তা ও রিজনিং',
    description:
      'Analytical, verbal, and non-verbal reasoning for WBCS Prelims & Mains, WB Police SI, and SSC-pattern West Bengal exams.',
    examFocus: 'WBCS · WB Police SI · Primary TET',
    accentHex: '#be123c',
    chapters: [
      {
        id: 'rsn-series-coding',
        subjectId: 'reasoning',
        title: 'Number Series, Wrong-Term & Alpha-Numeric Patterns',
        bengaliTitle: 'সংখ্যা সিরিজ, ভুল পদ ও বর্ণমালা ধারা',
        topics:
          'Multi-level difference, Prime/Square/Cube patterns, Geometric & alternating series, Finding wrong number in series, Continuous letter pattern groups',
        weightage: 'Very High',
      },
      {
        id: 'rsn-coding-matrix',
        subjectId: 'reasoning',
        title: 'Coding-Decoding, Letter Shifting & Mathematical Operations',
        bengaliTitle: 'কোডিং-ডিকোডিং ও গাণিতিক চিহ্ন পরিবর্তন',
        topics:
          'Forward/Reverse positional coding, Opposite-letter pairs, Fictitious language sentence coding, Symbol-BODMAS interchange & Matrix word decoding',
        weightage: 'Very High',
      },
      {
        id: 'rsn-analogy-odd',
        subjectId: 'reasoning',
        title: 'Analogy, Odd-One-Out & Logical Sequence of Words',
        bengaliTitle: 'সাদৃশ্য, অমিল খোঁজা ও শব্দের যৌক্তিক ক্রম',
        topics:
          'GK/Vocabulary analogies, Triad number-set analogies, Semantic & numerical classification, Dictionary & hierarchical orderings',
        weightage: 'High Yield',
      },
      {
        id: 'rsn-blood-direction',
        subjectId: 'reasoning',
        title: 'Blood Relations & Coded Family Tree Puzzles',
        bengaliTitle: 'রক্তের সম্পর্ক ও সাংকেতিক বংশলতিকা',
        topics:
          'Pointing-to-photograph statements, Coded relation expressions (A+B means A is father of B), Multi-generation family tree deduction',
        weightage: 'High Yield',
      },
      {
        id: 'rsn-direction-shadow',
        subjectId: 'reasoning',
        title: 'Direction Sense, Angular Turns & Shadow Problems',
        bengaliTitle: 'দিক নির্ণয়, কৌণিক ঘূর্ণন ও ছায়া সংক্রান্ত সমস্যা',
        topics:
          'Clockwise/anti-clockwise degree rotations, Pythagoras shortest displacement, Sunrise/Sunset shadow puzzles, Coded direction paths',
        weightage: 'High Yield',
      },
      {
        id: 'rsn-seating-ranking',
        subjectId: 'reasoning',
        title: 'Ranking, Order, Linear/Circular Seating & Floor Puzzles',
        bengaliTitle: 'ক্রম, র‍্যাঙ্কিং ও আসন বিন্যাস পাজল',
        topics:
          'Overlapping vs Non-overlapping row ranking, Position interchange, Linear facing North/South, Circular inward/outward seating, Comparison & scheduling puzzles',
        weightage: 'Very High',
      },
      {
        id: 'rsn-syllogism-venn',
        subjectId: 'reasoning',
        title: 'Syllogism, Logical Venn Diagrams & Critical Reasoning',
        bengaliTitle: 'ন্যায় অনুমান, ভেন চিত্র ও যুক্তিবোধ',
        topics:
          '2/3-statement Syllogisms, "Only a few" & Possibility cases, Either-Or complementary pairs, 3-circle Venn intersections, Statement-Assumption & Course of Action',
        weightage: 'Very High',
      },
      {
        id: 'rsn-clock-calendar',
        subjectId: 'reasoning',
        title: 'Clocks, Calendars & Counting Geometric Figures',
        bengaliTitle: 'ঘড়ি, ক্যালেন্ডার ও জ্যামিতিক চিত্র গণনা',
        topics:
          'Clock hand angles, Coinciding/Opposite/Right-angle times, Faulty clocks, Odd days & leap-century rules, Repeating calendars, Counting triangles/squares',
        weightage: 'High Yield',
      },
      {
        id: 'rsn-dice-nonverbal',
        subjectId: 'reasoning',
        title: 'Cubes, Dice, Paper Folding & Data Sufficiency',
        bengaliTitle: 'ঘনক, ছক্কা, কাগজ ভাঁজ ও তথ্য পর্যাপ্ততা',
        topics:
          'Standard vs Open Dice unfolding, Painted cube cutting formulas (0/1/2/3 faces painted), Mirror & water images, Embedded figures & Data Sufficiency',
        weightage: 'Moderate',
      },
    ],
  },
  {
    id: 'lang-pedagogy',
    name: 'English, Bengali & Pedagogy',
    bengaliName: 'ইংরেজি, বাংলা ব্যাকরণ ও শিশু মনস্তত্ত্ব',
    description:
      'WBCS/Clerkship English composition & grammar, complete Bangla Byakaran & Sahitya, and WBBPE Primary TET Child Development & Pedagogy.',
    examFocus: 'WBCS · Clerkship · Primary TET',
    accentHex: '#7c2d12',
    chapters: [
      {
        id: 'lng-eng-vocab',
        subjectId: 'lang-pedagogy',
        title: 'English Vocabulary: Synonyms, Antonyms & Contextual Usage',
        bengaliTitle: 'ইংরেজি শব্দভাণ্ডার: প্রতিশব্দ, বিপরীত ও প্রয়োগ',
        topics:
          'WBCS high-frequency academic words, Latin/Greek root words, Contextual cloze usage, Confusing paronyms (affect/effect, elicit/illicit)',
        weightage: 'Very High',
      },
      {
        id: 'lng-eng-idioms',
        subjectId: 'lang-pedagogy',
        title: 'Idioms, Phrases, Phrasal Verbs & Prepositional Verbs',
        bengaliTitle: 'ইডিয়মস, ফ্রেজাল ভার্ব ও প্রিপোজিশনাল ব্যবহার',
        topics:
          'Group verbs (call, put, bear, bring, look, take, turn, set), Classical & modern idioms, Foreign phrases used in English (bona fide, status quo, prima facie)',
        weightage: 'Very High',
      },
      {
        id: 'lng-eng-oneword',
        subjectId: 'lang-pedagogy',
        title: 'One-Word Substitution, Phobias, Manias & Spelling Rules',
        bengaliTitle: 'এক কথায় প্রকাশ, ফোবিয়া ও বানান বিধি',
        topics:
          'Governance/Polity terms (-cracy, -archy), Killings (-cide), Studies (-logy), Phobias & Manias, Commonly misspelt competitive exam words',
        weightage: 'High Yield',
      },
      {
        id: 'lng-eng-grammar',
        subjectId: 'lang-pedagogy',
        title: 'Error Spotting: Tenses, Subject-Verb Agreement & Prepositions',
        bengaliTitle: 'ভুল সংশোধন: কাল, কর্তা-ক্রিয়া সঙ্গতি ও প্রিপোজিশন',
        topics:
          'Fixed prepositions, Conditional clauses (Zero/1st/2nd/3rd), Subjunctive mood, Inversion (No sooner/Hardly/Scarcely), Articles & Modifiers',
        weightage: 'Very High',
      },
      {
        id: 'lng-eng-voice-narration',
        subjectId: 'lang-pedagogy',
        title: 'Voice Change, Narration, Clauses & Sentence Transformation',
        bengaliTitle: 'ভয়েস, ন্যারেশন, ক্লজ ও বাক্য রূপান্তর',
        topics:
          'Active/Passive of imperative, interrogative & quasi-passive sentences, Direct/Indirect speech rules, Simple/Compound/Complex synthesis, Question tags',
        weightage: 'High Yield',
      },
      {
        id: 'lng-ben-dhwani-sandhi',
        subjectId: 'lang-pedagogy',
        title: 'বাংলা ব্যাকরণ: ধ্বনিতত্ত্ব, ধ্বনি পরিবর্তন, সন্ধি ও ণত্ব-ষত্ব',
        bengaliTitle: 'ধ্বনিতত্ত্ব, ধ্বনি পরিবর্তন, সন্ধি ও ণত্ব-ষত্ব বিধান',
        topics:
          'স্বরধ্বনি ও ব্যঞ্জনধ্বনির বর্গীয় বিশ্লেষণ, অপিনিহিতি, অভিশ্রুতি, স্বরভক্তি, স্বরসঙ্গতি, স্বর-ব্যঞ্জন-বিসর্গ সন্ধি ও নিপাতনে সিদ্ধ সন্ধি',
        weightage: 'Very High',
      },
      {
        id: 'lng-ben-samas-karak',
        subjectId: 'lang-pedagogy',
        title: 'বাংলা ব্যাকরণ: সমাস, কারক-বিভক্তি, উপসর্গ ও প্রত্যয়',
        bengaliTitle: 'সমাস, কারক-বিভক্তি, উপসর্গ ও প্রকৃতি-প্রত্যয়',
        topics:
          '৬ প্রকার সমাস ও ব্যাসবাক্য, ৬টি কারক ও শূন্য/অ-বিভক্তি নির্ণয়, কৃৎ ও তদ্ধিত প্রত্যয়, সংস্কৃত-বাংলা-বিদেশি উপসর্গ',
        weightage: 'Very High',
      },
      {
        id: 'lng-bengali',
        subjectId: 'lang-pedagogy',
        title: 'বাংলা ব্যাকরণ: পদ পরিবর্তন, বাচ্য, বাগধারা ও বানান শুদ্ধি',
        bengaliTitle: 'পদ পরিবর্তন, বাচ্য, এক কথায় প্রকাশ ও বানান শুদ্ধি',
        topics:
          'বিশেষ্য-বিশেষণ রূপান্তর, কর্তৃ-কর্ম-ভাববাচ্য, বাগধারা ও প্রবাদ-প্রবচন, সমার্থক ও বিপরীত শব্দ, বাংলা একাডেমি বানান বিধি',
        weightage: 'High Yield',
      },
      {
        id: 'lng-ben-sahitya',
        subjectId: 'lang-pedagogy',
        title: 'বাংলা সাহিত্যের ইতিহাস, যুগবিভাগ ও বিখ্যাত ছদ্মনাম',
        bengaliTitle: 'বাংলা সাহিত্যের ইতিহাস, প্রাচীন থেকে আধুনিক ও ছদ্মনাম',
        topics:
          'চর্যাপদ ও শ্রীকৃষ্ণকীর্তন, বৈষ্ণব পদাবলি ও মঙ্গলকাব্য, ফোর্ট উইলিয়াম কলেজ, মধুসূদন-বঙ্কিম-রবীন্দ্রনাথ-শরৎচন্দ্র-নজরুল-বিভূতিভূষণ-মানিক-তারাশঙ্কর ও ছদ্মনাম',
        weightage: 'High Yield',
      },
      {
        id: 'lng-tet-cdp',
        subjectId: 'lang-pedagogy',
        title: 'Child Development, Learning Theories & Inclusive Pedagogy (TET)',
        bengaliTitle: 'শিশু বিকাশ, শিখন তত্ত্ব ও অন্তর্ভুক্তিমূলক শিক্ষা (টেট)',
        topics:
          'Piaget, Vygotsky, Kohlberg, Erikson, Skinner, Pavlov, Bandura, Bloom’s Taxonomy, CCE, Learning Disabilities, NCF 2005, RTE 2009 & NEP 2020',
        weightage: 'TET Core',
      },
    ],
  },
];

export function getSubjectById(subjectId: string): Subject | undefined {
  return WB_SUBJECTS.find((s) => s.id === subjectId);
}

export function getChapterById(
  subjectId: string,
  chapterId: string
): { subject: Subject; chapter: Subject['chapters'][number] } | undefined {
  const subject = getSubjectById(subjectId);
  if (!subject) return undefined;
  const chapter = subject.chapters.find((c) => c.id === chapterId);
  if (!chapter) return undefined;
  return { subject, chapter };
}
