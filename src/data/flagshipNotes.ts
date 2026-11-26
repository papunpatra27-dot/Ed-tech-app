import { ChapterStudyMaterial } from '../types';

export const FLAGSHIP_TEXTBOOK_NOTES: Record<string, ChapterStudyMaterial> = {
  'wb-rivers-geo': {
    chapterId: 'wb-rivers-geo',
    overview:
      'West Bengal’s drainage architecture is uniquely shaped by three physiographic domains: the Darjeeling-Sikkim Himalayas in the north, the lower Ganga-Padma-Bhagirathi deltaic plain in the centre and south, and the eastern fringe of the Chota Nagpur Plateau (Rarh region) in the west. In WBCS Prelims & Mains, questions regularly test exact tributary order, barrage/dam engineering, inter-state water projects, and river-bank district headquarters.',
    keyPoints: [
      {
        title: 'North Bengal Himalayan & Sub-Himalayan Rivers (Snow-fed & Flash-prone)',
        detail:
          'Originating in the Sikkim, Nepal, and Bhutan Himalayas, North Bengal rivers descend steeply onto the Terai-Dooars piedmont plains, causing frequent course shifts and braided channels.',
        subPoints: [
          'Teesta: Originates from Pahunri / Tso Lhamo Lake (and Zemu Glacier feed) in Sikkim; enters WB near Sevoke; major tributaries include Rangeet (right bank), Lish, Gish, and Chel. Known as "Sorrow of North Bengal"; Teesta Barrage at Gajoldoba (Jalpaiguri).',
          'Mahananda: Originates at Mahaldiram Hills (Dow Hill / Paglajhora near Kurseong, Darjeeling); tributaries Mechi (forms Indo-Nepal border), Balason, Kankai, Tangon, and Punarbhaba; drains Siliguri and Malda before joining Padma in Bangladesh.',
          'Torsa (Amo Chu in Bhutan/Tibet): Enters WB through Jaigaon/Alipurduar; bifurcates into Sil Torsa and Char Torsa; drains Jaldapara National Park.',
          'Jaldhaka (Di-Chu): Originates from Bidang Lake in Sikkim; flows through Kalimpong, Jalpaiguri, and Cooch Behar; Jaldhaka Hydel Project is one of India’s earliest run-of-the-river schemes.',
          'Sankosh & Raidak: Sankosh forms the natural boundary between West Bengal (Alipurduar) and Assam before entering the Brahmaputra (Jamuna) in Bangladesh.',
        ],
      },
      {
        title: 'The Ganga-Bhagirathi-Hooghly Distributary Axis',
        detail:
          'Entering West Bengal past the Rajmahal Hills in Malda/Murshidabad, the Ganga splits near Dhuliyan/Farakka into two major distributaries: the Padma (flowing southeast into Bangladesh) and the Bhagirathi-Hooghly (flowing south to the Bay of Bengal).',
        subPoints: [
          'Farakka Barrage (Murshidabad, commissioned 1975): Built to divert ~40,000 cusecs of water via a 38.38 km feeder canal into the Bhagirathi-Hooghly to flush silt and preserve navigability of Kolkata Port.',
          'Naming Transition: Called Bhagirathi from Farakka/Mithipur down to Nabadwip (confluence with Jalangi), and Hooghly (Hugli) from Nabadwip down past Kolkata, Diamond Harbour, and Sagar Island.',
          'Left-Bank Nadia Rivers (Moribund Delta): Bhairab, Jalangi, and Mathabhanga-Churni are sluggish offshoots of the Padma suffering severe siltation.',
          'Right-Bank Tributaries joining Bhagirathi-Hooghly: Bansloi, Pagla, Mayurakshi (via Dwarka/Babla), Ajay, Damodar, Rupnarayan, and Haldi.',
        ],
      },
      {
        title: 'Rarh & Chota Nagpur Plateau Rivers (Rain-fed Peninsular System)',
        detail:
          'Flowing east-southeast from Jharkhand across Purulia, Bankura, Birbhum, Paschim Bardhaman, and Medinipur, these rivers carry low dry-season discharge but surge violently during monsoon depressions.',
        subPoints: [
          'Damodar: Rises near Tori (Latehar, Chota Nagpur Plateau); joins Hooghly near Falta/Uluberia. Main tributaries: Barakar (largest, Maithon & Tilaiya dams), Konar, Bokaro. Damodar Valley Corporation (DVC, 7 July 1948) was modelled on USA’s Tennessee Valley Authority (TVA).',
          'Mayurakshi (Mor): Originates in Trikut Hills (Deoghar, Jharkhand); Massanjore / Canada Dam (Dumka) and Tilpara Barrage (Suri, Birbhum); tributaries Bakreshwar, Kopai, Dwarka.',
          'Kangsabati (Kasai) & Kumari: Rises in Jhalda/Chota Nagpur; Mukutmanipur Dam (Bankura, at Kangsabati-Kumari confluence) is a major earthen dam; merges with Keleghai to form the Haldi River.',
          'Rupnarayan: Formed by the confluence of Dwarkeswar and Shilabati (Silai) near Ghatal (Paschim Medinipur); drains into Hooghly near Geonkhali.',
          'Subarnarekha: Enters WB briefly through Jhargram (Gopiballavpur) before flowing into Odisha and the Bay of Bengal directly (does NOT join the Hooghly).',
        ],
      },
      {
        title: 'Sundarbans Tidal Estuaries & Moribund vs Active Delta',
        detail:
          'West Bengal’s deltaic plain is divided ecologically into three distinct zones—Moribund (Murshidabad-Nadia), Mature (Bardhaman-Hooghly-Howrah), and Active/Tidal (North & South 24 Parganas).',
        subPoints: [
          'Tidal Estuaries (Left-to-Right West to East): Hooghly, Muriganga, Saptamukhi, Thakuran, Matla, Gosaba, Bidyadhari, Ichamati-Raimangal-Harinbhanga.',
          'Ichamati: Distributary of Mathabhanga; forms a major segment of the India-Bangladesh border in North 24 Parganas.',
          'East Kolkata Wetlands (Ramsar Site 2002): Natural sewage-fed wetland system between Hooghly and Bidyadhari-Kultigong.',
        ],
      },
    ],
    referenceTable: {
      title: 'West Bengal Rivers, Origins, Projects & Confluence Matrix',
      columns: ['River', 'Origin & Key Tributaries', 'Barrage / Dam / Terminal Basin'],
      rows: [
        ['Teesta', 'Pahunri / Tso Lhamo (Sikkim); Rangeet, Lish, Gish', 'Gajoldoba Barrage; joins Brahmaputra (Jamuna)'],
        ['Mahananda', 'Mahaldiram Hills (Darjeeling); Mechi, Balason, Tangon', 'Fulbari Barrage; joins Padma in Bangladesh'],
        ['Damodar', 'Chota Nagpur (Latehar); Barakar, Konar, Bokaro', 'DVC (Panchet, Maithon, Durgapur Barrage); joins Hooghly'],
        ['Mayurakshi', 'Trikut Hills (Deoghar); Bakreshwar, Kopai, Dwarka', 'Massanjore Dam, Tilpara Barrage; joins Bhagirathi'],
        ['Kangsabati', 'Chota Nagpur (Jhalda); Kumari, Keleghai', 'Mukutmanipur Dam; joins Keleghai to form Haldi'],
        ['Rupnarayan', 'Confluence of Dwarkeswar & Shilabati at Ghatal', 'Tidal river joining Hooghly at Geonkhali'],
        ['Subarnarekha', 'Ranchi Plateau (Nagri); Kharkai, Dulung', 'Flows directly into Bay of Bengal via Balasore (Odisha)'],
      ],
    },
    workedExamples: [
      {
        prompt:
          'WBCS Prelims Trap: Arrange these North Bengal rivers strictly from WEST to EAST as they enter the Dooars/Terai plains: Teesta, Mahananda, Sankosh, Jaldhaka, Torsa.',
        solution:
          'Correct West-to-East sequence: Mahananda (Darjeeling-Siliguri) → Teesta (Jalpaiguri) → Jaldhaka (Kalimpong-Jalpaiguri) → Torsa (Alipurduar-Cooch Behar) → Sankosh (WB-Assam border). Remember the mnemonic: "M-T-J-T-S" (Mahananda, Teesta, Jaldhaka, Torsa, Sankosh).',
      },
      {
        prompt:
          'Analytical Scenario: Which major plateau river flowing through Jhargram district in West Bengal does NOT drain into the Bhagirathi-Hooghly system?',
        solution:
          'Subarnarekha. While Damodar, Ajay, Mayurakshi, Rupnarayan, and Haldi all empty into the Bhagirathi-Hooghly, the Subarnarekha cuts across Jhargram (Gopiballavpur) and exits into Odisha to empty independently into the Bay of Bengal.',
      },
    ],
    comparisonPairs: [
      {
        term: 'Bhagirathi vs Hooghly',
        distinction:
          'Both refer to the same western distributary of the Ganga: called Bhagirathi from Farakka to Nabadwip, and Hooghly from Nabadwip downstream to the Bay of Bengal.',
      },
      {
        term: 'Durgapur Barrage vs Farakka Barrage',
        distinction:
          'Durgapur Barrage (1955) is on the Damodar (Paschim Bardhaman-Bankura border) for irrigation/Durgapur industry; Farakka Barrage (1975) is on the Ganga (Murshidabad) to flush Kolkata Port.',
      },
      {
        term: 'Matla vs Damodar',
        distinction:
          'Damodar is a plateau-fed freshwater river from Jharkhand; Matla is a saline tidal estuary in the Sundarbans cut off from upper freshwater Ganga flows.',
      },
      {
        term: 'Mukutmanipur vs Massanjore',
        distinction:
          'Mukutmanipur Dam (Bankura, WB) is at the Kangsabati-Kumari confluence; Massanjore/Canada Dam is on the Mayurakshi in Dumka district (Jharkhand), operated by WB.',
      },
    ],
    commonTraps: [
      'Confusing Barakar (Damodar tributary) with Bakreshwar (Mayurakshi tributary).',
      'Assuming Subarnarekha or Matla drains into the Hooghly—Subarnarekha goes directly to Bay of Bengal via Odisha, and Matla is an independent Sundarbans estuary.',
      'Misidentifying Ajay as originating in West Bengal—it originates in Jamui/Munger hills of Bihar and enters WB near Chittaranjan.',
      'Confusing Tilaiya/Maithon dams (on Barakar) with Panchet Dam (on main Damodar).',
    ],
    mainsPerspective:
      'For WBCS Mains Paper III, link WB’s river regimes to geomorphological hazards: Teesta glacial-lake outburst & flash floods in the Darjeeling-Kalimpong foothills, river-bank erosion along the Ganga-Padma in Malda-Murshidabad (Diara tracts), and tidal salinity ingress in the Sundarbans due to declining headwater flow in the Bidyadhari-Matla system.',
    mustRememberFacts: [
      'Farakka Barrage Feeder Canal length = 38.38 km; joins Bhagirathi near Ahiron/Jangipur.',
      'DVC (1948) has 4 major dams: Tilaiya & Maithon (Barakar), Konar (Konar), Panchet (Damodar).',
      'Kangsabati + Keleghai = Haldi River (meets Hooghly near Haldia).',
      'Dwarkeswar + Shilabati = Rupnarayan River.',
      'Mahananda originates inside West Bengal (Darjeeling hills), unlike Teesta (Sikkim) or Torsa (Tibet).',
      'Sankosh is the easternmost major river marking the West Bengal–Assam boundary.',
      'Ichamati forms a natural international border between WB (North 24 Parganas) and Bangladesh.',
      'Mundeswari is an important spill channel / distributary of the Damodar in Hooghly-Howrah.',
    ],
    examTips:
      'Draw a quick West-to-East North Bengal river line and a North-to-South right-bank Hooghly tributary list (Pagla-Bansloi → Mayurakshi → Ajay → Damodar → Rupnarayan → Haldi) before attempting matching questions.',
    source: 'curated',
  },

  'wb-renaissance': {
    chapterId: 'wb-renaissance',
    overview:
      'The 19th-century Bengal Renaissance was an intellectual, social, educational, and vernacular literary awakening centered in Calcutta that laid the ideological foundation for modern Indian nationalism. WBCS Prelims and Mains test exact founding dates, splinter groups of the Brahmo Samaj, landmark journals, legislative Acts, and cross-connections among reform leaders.',
    keyPoints: [
      {
        title: 'Raja Rammohan Roy & Evolution of the Brahmo Movement',
        detail:
          'Rammohan Roy synthesized Vedantic monotheism with Western rationalism, advocating women’s property rights, press freedom, and English-scientific education while opposing idolatry and Sati.',
        subPoints: [
          'Organizations: Atmiya Sabha (1815), Calcutta Unitarian Committee (1821), Brahmo Sabha (20 Aug 1828, later Brahmo Samaj), Vedanta College (1825).',
          'Publications: Tuhfat-ul-Muwahhidin (1804, Persian), Sambad Kaumudi (1821, Bengali weekly), Mirat-ul-Akhbar (1822, Persian weekly).',
          'Sati Abolition: Bengal Sati Regulation XVII of 4 December 1829 enacted by Governor-General Lord William Bentinck.',
          'First Schism (1866): Keshab Chandra Sen formed Brahmo Samaj of India; Debendranath Tagore’s original faction became Adi Brahmo Samaj (Debendranath earlier founded Tattvabodhini Sabha in 1839 & Tattvabodhini Patrika in 1843 edited by Akshay Kumar Dutta).',
          'Second Schism (1878): Over Keshab’s daughter Suniti Devi’s underage Cooch Behar marriage (violating Brahmo Marriage Act 1872), Ananda Mohan Bose and Shibnath Shastri founded Sadharan Brahmo Samaj.',
        ],
      },
      {
        title: 'Ishwar Chandra Vidyasagar: Social Reform & Modern Bengali Prose',
        detail:
          'Principal of Sanskrit College (1851), Vidyasagar opened Sanskrit College to non-Brahmins, championed widow remarriage through scriptural reasoning, and standardized Bengali primer pedagogy.',
        subPoints: [
          'Hindu Widows’ Remarriage Act (Act XV of 1856): Drafted under Dalhousie and enacted under Lord Canning on 26 July 1856.',
          'Women’s Education: Collaborated with J.E.D. Bethune (Bethune School founded May 1849 as Hindu Female School) and personally established 35+ girls’ schools across rural Bengal.',
          'Literary Works: Betal Panchabingshati (1847), Borno Porichoy (1855), Bidhaba Bibaha Prachalito Haowa Uchit Kina (1855), Sitar Banabas.',
          'Journalism: Inspired and financially supported Dwarkanath Vidyabhusan’s Somprakash (1858)—the first political Bengali weekly targeted by the Vernacular Press Act (1878).',
        ],
      },
      {
        title: 'Young Bengal Movement & Henry Louis Vivian Derozio',
        detail:
          'Appointed at Hindu College in 1826, Derozio inspired radical rationalism, free speech, and rejection of orthodox caste and ritual taboos among students.',
        subPoints: [
          'Academic Association (1828): Debating society founded by Derozio; key Derozians included Krishnamohan Banerjee, Rasikkrishna Mallick, Ramgopal Ghosh, Peary Chand Mitra, and Dakshinaranjan Mukhopadhyay.',
          'Journals: Parthenon (1830), Jnananveshan (1831), Bengal Spectator (1842).',
          'Society for the Acquisition of General Knowledge (1838): Early forum for historical and political discourse in Calcutta.',
        ],
      },
      {
        title: 'Ramakrishna-Vivekananda Synthesis & Cultural Nationalism',
        detail:
          'Sri Ramakrishna Paramahamsa ("Jato mat tato path") and Swami Vivekananda bridged spiritual humanism with social service (Daridra Narayana Seva) and anti-colonial self-confidence.',
        subPoints: [
          'Chicago Parliament of Religions: 11 September 1893.',
          'Ramakrishna Mission: Founded 1 May 1897 (HQ Belur Math established 1898/99).',
          'Works by Vivekananda: Bartaman Bharat (1899 in Udbodhan), Prabuddha Bharata (English, 1896), Raja Yoga, Karma Yoga, Lectures from Colombo to Almora.',
        ],
      },
      {
        title: 'Education, Institutions & Literary Awakening in 19th-Century Bengal',
        detail:
          'The Anglicist-Orientalist debate (resolved by Macaulay’s Minute, 1835) and Wood’s Despatch (1854) catalyzed modern universities, vernacular drama, and social satire.',
        subPoints: [
          'Hindu College (20 Jan 1817): Co-founded by David Hare, Rammohan Roy, Radhakanta Deb, Edward Hyde East; renamed Presidency College in 1855.',
          'Serampore Trio (1800): William Carey, Joshua Marshman, William Ward—published Digdarshan (1818) and Samachar Darpan (23 May 1818, first Bengali newspaper).',
          'Social Drama & Literature: Michael Madhusudan Dutt (Meghnad Badh Kavya 1861, blank verse Amitrakshar Chhanda), Dinabandhu Mitra (Neel Darpan 1860, English translation by Madhusudan published by Rev. James Long), Bankim Chandra Chattopadhyay (Bangadarshan 1872, Anandamath 1882).',
        ],
      },
    ],
    referenceTable: {
      title: 'Chronology of Bengal Renaissance Organizations, Press & Acts',
      columns: ['Year', 'Institution / Journal / Act', 'Founder / Enacting Authority'],
      rows: [
        ['1815', 'Atmiya Sabha', 'Raja Rammohan Roy'],
        ['1817', 'Hindu College (later Presidency)', 'David Hare, Rammohan Roy, Radhakanta Deb'],
        ['1818', 'Samachar Darpan (1st Bengali weekly)', 'Serampore Missionaries (J.C. Marshman)'],
        ['1828', 'Brahmo Sabha & Academic Association', 'Rammohan Roy / H.L.V. Derozio'],
        ['1829', 'Bengal Sati Regulation XVII', 'Lord William Bentinck (backed by Rammohan)'],
        ['1839', 'Tattvabodhini Sabha', 'Debendranath Tagore'],
        ['1856', 'Hindu Widows’ Remarriage Act XV', 'Lord Canning (drafted under Dalhousie; Vidyasagar)'],
        ['1866', 'Brahmo Samaj of India (1st Split)', 'Keshab Chandra Sen'],
        ['1878', 'Sadharan Brahmo Samaj (2nd Split)', 'Ananda Mohan Bose & Shibnath Shastri'],
      ],
    },
    workedExamples: [
      {
        prompt:
          'WBCS Prelims Style Statement Question: Consider: (1) Tattvabodhini Sabha was founded by Keshab Chandra Sen. (2) Hindu Widows’ Remarriage Act 1856 was passed during the tenure of Lord Dalhousie. Which statement(s) is/are correct?',
        solution:
          'Neither (1) nor (2). Tattvabodhini Sabha (1839) was founded by Debendranath Tagore (not Keshab). While the Widow Remarriage Bill was drafted under Dalhousie, it received final assent and was enacted on 26 July 1856 under Lord Canning.',
      },
      {
        prompt:
          'Chronology Check: Arrange from earliest to latest: Sadharan Brahmo Samaj, Brahmo Sabha, Tattvabodhini Sabha, Brahmo Samaj of India.',
        solution:
          'Brahmo Sabha (1828) → Tattvabodhini Sabha (1839) → Brahmo Samaj of India (1866) → Sadharan Brahmo Samaj (1878).',
      },
    ],
    comparisonPairs: [
      {
        term: 'Dharma Sabha (1830) vs Brahmo Samaj (1828)',
        distinction:
          'Dharma Sabha was founded by orthodox leader Radhakanta Deb to defend traditional practices and oppose Sati abolition, whereas Brahmo Samaj opposed idolatry and Sati.',
      },
      {
        term: 'Native Marriage Act (1872) vs Age of Consent Act (1891)',
        distinction:
          'Native Marriage Act (1872, pushed by Keshab Chandra Sen) set marriage age at 14 (girls)/18 (boys) for non-Hindu/Brahmo civil marriages; Age of Consent Act (1891, Malabari & Lansdowne) raised marital consent age from 10 to 12 across British India (opposed by Tilak).',
      },
      {
        term: 'Digdarshan vs Samachar Darpan vs Sambad Kaumudi',
        distinction:
          'Digdarshan (April 1818, monthly) and Samachar Darpan (May 1818, weekly) were started by Serampore Missionaries; Sambad Kaumudi (1821) was started by Rammohan Roy.',
      },
    ],
    commonTraps: [
      'Crediting Dalhousie instead of Canning for the enactment of the 1856 Widow Remarriage Act (Dalhousie drafted the bill; Canning passed it).',
      'Confusing Tattvabodhini Sabha (Debendranath Tagore, 1839) with Tattvabodhini Patrika’s first editor (Akshay Kumar Dutta, 1843).',
      'Mixing up Atmiya Sabha (1815) with Landholders’ Society / Zamindari Association (1838, Dwarkanath Tagore).',
      'Assuming Rammohan Roy supported all Western reforms uncritically—he opposed the 1823 Adam’s Press Regulations and launched Mirat-ul-Akhbar protest shutdowns.',
    ],
    mainsPerspective:
      'In WBCS Mains Paper III essays/questions, evaluate the Bengal Renaissance critically: note both its transformative legacy (rationalism, women’s rights, modern Bengali prose, secular civil associations) and its historical limitations (urban bhadralok/upper-caste base, limited agrarian reach, and gradual communal polarization by the late 19th century).',
    mustRememberFacts: [
      'Rammohan Roy received the title "Raja" from Mughal Emperor Akbar II (1830) before travelling to England.',
      'Rammohan Roy died in Bristol, England on 27 September 1833.',
      'Bengal Gazette (1780) by J.A. Hicky was India’s first English newspaper; Bengal Gazette (1818, Gangadhar Bhattacharya) was the first Bengali-owned weekly.',
      'Calcutta Medical College was established in 1835 (Madhusudan Gupta performed the first dissection in 1836).',
      'University of Calcutta was founded on 24 January 1857 following Wood’s Despatch (1854).',
      'Radhakanta Deb compiled the monumental Sanskrit dictionary Sabdakalpadruma.',
      'Naba Bidhan (New Dispensation) was proclaimed by Keshab Chandra Sen in 1880.',
      'Hindu Mela (Chaitra Mela, 1867) was organized by Nabagopal Mitra and Rajnarayan Basu.',
    ],
    examTips:
      'Keep the 3 Brahmo splits (1828 Original → 1866 Adi vs Brahmo Samaj of India → 1878 Sadharan) and exact 1815–1882 publication dates on a single mental timeline.',
    source: 'curated',
  },

  'hist-inm': {
    chapterId: 'hist-inm',
    overview:
      'The Indian National Movement (1885–1947) consistently carries ~25 out of 200 marks in WBCS Prelims and forms the core of Mains Paper III. Questions demand exact INC session Presidents/locations (especially Calcutta sessions), constitutional Act clauses (1909, 1919, 1935), revolutionary networks, and Gandhian pact/mission chronology.',
    keyPoints: [
      {
        title: 'Pre-Congress Associations & Early INC Moderates (1876–1905)',
        detail:
          'Pre-INC political consciousness crystallized in Bengal before coalescing into the all-India platform in Bombay in December 1885.',
        subPoints: [
          'Indian Association (26 July 1876, Calcutta): Founded by Surendranath Banerjea and Ananda Mohan Bose; campaigned against ICS age reduction (21→19), Arms Act (1878), and Vernacular Press Act (1878).',
          'First INC Session (28 Dec 1885, Gokuldas Tejpal Sanskrit College, Bombay): 72 delegates; President W.C. Bonnerjee; Secretary A.O. Hume.',
          'Drain of Wealth Theory: Propounded by Dadabhai Naoroji (Poverty and Un-British Rule in India), R.C. Dutt (Economic History of India), and M.G. Ranade.',
          'Early Calcutta Sessions: 1886 (Dadabhai Naoroji), 1896 (Rahimatullah Sayani — Vande Mataram first sung by Rabindranath Tagore), 1906 (Dadabhai Naoroji — "Swaraj" declared goal).',
        ],
      },
      {
        title: 'Swadeshi Movement, Surat Split & Morley-Minto Reforms (1905–1916)',
        detail:
          'Lord Curzon’s Partition of Bengal (announced July 1905, effective 16 Oct 1905) unleashed mass boycotts, national education (Jadavpur/National Council of Education 1906), and the Moderate-Extremist rupture.',
        subPoints: [
          '16 Oct 1905: Observed as Rakhi Bandhan Day (Tagore) and Arandhan (Ramendrasundar Trivedi).',
          'Surat Split (1907, President Rashbehari Ghosh): Moderates and Extremists (Lal-Bal-Pal + Aurobindo) split over scope of Boycott & Swaraj.',
          'Morley-Minto Reforms / Indian Councils Act 1909: Introduced separate electorates for Muslims (Lord Minto = "Father of Communal Electorate"); Satyendra Prasanna Sinha became first Indian Law Member in Viceroy’s Executive Council.',
          'Annulment of Partition (Dec 1911 Delhi Durbar, Lord Hardinge II): Capital shifted from Calcutta to Delhi.',
          'Lucknow Pact (1916, A.C. Mazumdar): Reunited Moderates & Extremists AND forged INC–Muslim League agreement accepting separate electorates.',
        ],
      },
      {
        title: 'Gandhian Era: Rowlatt to Civil Disobedience (1917–1934)',
        detail:
          'Gandhi transitioned nationalism from elite petitioning to disciplined mass satyagraha across peasantry, labour, and women.',
        subPoints: [
          'Early Satyagrahas: Champaran (1917, Tinkathia indigo), Ahmedabad Mill Strike (1918, first hunger strike, 35% plague bonus), Kheda (1918, crop failure tax remission).',
          '1919 Watershed: Rowlatt Act (March 1919), Jallianwala Bagh (13 April 1919, General Dyer), Khilafat Movement, and Montagu-Chelmsford Act 1919 (Dyarchy in provinces; bicameralism at Centre).',
          'Non-Cooperation (1920–22): Approved at Calcutta Special Session (Sept 1920, Lala Lajpat Rai) and ratified at Nagpur (Dec 1920, C. Vijayaraghavachariar); suspended Feb 1922 after Chauri Chaura (Gorakhpur).',
          'Swaraj Party (1 Jan 1923): C.R. Das (President) & Motilal Nehru (Secretary) formed Congress-Khilafat Swarajya Party after Gaya Session (1922).',
          'Purna Swaraj & Dandi March: Simon Commission (1928), Nehru Report (1928), Lahore Session (Dec 1929, J.L. Nehru), Dandi Salt March (12 March–6 April 1930, 78 followers), Gandhi-Irwin Pact (5 March 1931), Poona Pact (24 Sept 1932, Gandhi & Ambedkar rejecting separate electorates for Depressed Classes).',
        ],
      },
      {
        title: 'Constitutional Endgame, Netaji, Quit India & Transfer of Power (1935–1947)',
        detail:
          'Between 1935 and 1947, mass revolt (1942), INA military pressure, and postwar negotiations compelled British withdrawal.',
        subPoints: [
          'Govt of India Act 1935: Abolished provincial dyarchy (introduced Provincial Autonomy), proposed All-India Federation (never implemented), introduced dyarchy at Centre, Federal Court (1937), and separated Burma.',
          'Subhas Chandra Bose & INA: Haripura (1938, National Planning Committee under Nehru), Tripuri (1939, defeated Pattabhi Sitaramayya → resigned → Forward Bloc May 1939); Azad Hind Government (21 Oct 1943, Singapore) & INA trials at Red Fort (1945: Sehgal, Dhillon, Shah Nawaz).',
          'Quit India (8 Aug 1942, Gowalia Tank Bombay): "Do or Die"; parallel governments at Tamluk (Tamralipta Jatiya Sarkar under Satish Chandra Samanta & Matangini Hazra), Satara (Prati Sarkar), and Ballia.',
          'Missions & Plans: August Offer (1940), Cripps Mission (1942), Wavell Plan/Shimla Conference (1945), Cabinet Mission (1946: Pethick-Lawrence, Cripps, A.V. Alexander), Mountbatten Plan (3 June 1947), Indian Independence Act (18 July 1947).',
        ],
      },
    ],
    referenceTable: {
      title: 'Landmark INC Sessions (Especially Calcutta & Turning Points)',
      columns: ['Year & Place', 'President', 'Landmark Decision / Historical Hook'],
      rows: [
        ['1885 Bombay', 'W.C. Bonnerjee', 'Founding session; 72 delegates'],
        ['1886 Calcutta', 'Dadabhai Naoroji', 'National Conference merged with INC (434 delegates)'],
        ['1896 Calcutta', 'Rahimatullah Sayani', 'Vande Mataram first sung publicly (Rabindranath)'],
        ['1906 Calcutta', 'Dadabhai Naoroji', '"Swaraj" adopted; Swadeshi, Boycott, National Education'],
        ['1907 Surat', 'Rashbehari Ghosh', 'Moderate–Extremist split'],
        ['1911 Calcutta', 'Bishan Narayan Dar', 'Jana Gana Mana first sung (27 Dec 1911)'],
        ['1917 Calcutta', 'Annie Besant', 'First woman President of INC'],
        ['1920 Calcutta (Spl)', 'Lala Lajpat Rai', 'Non-Cooperation resolution passed'],
        ['1924 Belgaum', 'Mahatma Gandhi', 'Only session presided over by Gandhi'],
        ['1929 Lahore', 'Jawaharlal Nehru', 'Purna Swaraj resolution; 26 Jan Independence pledge'],
      ],
    },
    workedExamples: [
      {
        prompt:
          'WBCS Prelims Standard: Arrange chronologically: (a) Poona Pact, (b) Gandhi-Irwin Pact, (c) Communal Award, (d) Second Round Table Conference.',
        solution:
          'Gandhi-Irwin Pact (5 March 1931) → Second Round Table Conference (Sept–Dec 1931, London) → Communal Award by Ramsay MacDonald (16 August 1932) → Poona Pact (24 September 1932).',
      },
      {
        prompt:
          'Act Analysis: Which Government of India Act introduced Provincial Autonomy while proposing Dyarchy at the Centre?',
        solution:
          'Government of India Act 1935. Do not confuse with the 1919 Act (Montagu-Chelmsford), which introduced Dyarchy in the PROVINCES and bicameralism at the Centre.',
      },
    ],
    comparisonPairs: [
      {
        term: 'Act of 1909 vs Act of 1919 vs Act of 1935',
        distinction:
          '1909 = Communal electorates (Muslims); 1919 = Dyarchy in provinces + Sikhs/Indian Christians electorates; 1935 = Provincial autonomy + Federal Court + proposed Centre dyarchy.',
      },
      {
        term: 'Annie Besant vs Sarojini Naidu vs Nellie Sengupta',
        distinction:
          'Annie Besant (Calcutta 1917) = 1st woman INC President; Sarojini Naidu (Kanpur 1925) = 1st Indian woman INC President; Nellie Sengupta (Calcutta 1933) = 3rd woman INC President.',
      },
      {
        term: 'Cripps Mission (1942) vs Cabinet Mission (1946)',
        distinction:
          'Cripps offered Dominion Status post-war with provincial opt-out (called "post-dated cheque"); Cabinet Mission rejected Pakistan, proposed a 3-tier Union with Group A/B/C provinces and a Constituent Assembly.',
      },
    ],
    commonTraps: [
      'Confusing 1920 Calcutta Special Session President (Lala Lajpat Rai) with 1920 Nagpur Regular Session President (C. Vijayaraghavachariar).',
      'Assuming Subhas Bose presided only at Tripuri—he was first elected at Haripura (1938), where he created the National Planning Committee.',
      'Mixing up Vande Mataram (1896 Calcutta) with Jana Gana Mana (1911 Calcutta).',
      'Attributing the Communal Award to the British Viceroy instead of British PM Ramsay MacDonald (Aug 1932).',
    ],
    mainsPerspective:
      'WBCS Mains often asks comparative assessments: why the 1946 Cabinet Mission failed (Congress vs League interpretation of compulsory grouping in Sections B & C, including Bengal & Assam in Group C) and how peasant, tribal, and INA/RIN Mutiny pressures converged between 1945–47.',
    mustRememberFacts: [
      'Tamralipta Jatiya Sarkar (17 Dec 1942 – Sept 1944) in Tamluk, Medinipur was led by Satish Chandra Samanta.',
      'Matangini Hazra ("Gandhi Buri", aged 73) was martyred in Tamluk on 29 September 1942.',
      'RIN Mutiny (18 Feb 1946) started on HMIS Talwar in Bombay.',
      'Direct Action Day was called by Muslim League on 16 August 1946.',
      'Rajendra Prasad replaced Subhas Bose as INC President after the Tripuri crisis (1939).',
      'C.R. Formula (1944) was drafted by C. Rajagopalachari to resolve the Congress–League deadlock.',
      'Bengal Pact (1923) for Hindu-Muslim unity in Bengal was engineered by C.R. Das.',
      'J.B. Kripalani was INC President at the time of Independence (1947).',
    ],
    examTips:
      'Keep a strict timeline from 1940–1947 (August Offer → Individual Satyagraha → Cripps → Quit India → CR Formula → Wavell → Cabinet Mission → Attlee Declaration → Mountbatten Plan); WBPSC loves 4-event ordering questions on this window.',
    source: 'curated',
  },

  'pol-preamble-fr': {
    chapterId: 'pol-preamble-fr',
    overview:
      'Constitutional Foundations, the Preamble, Fundamental Rights (Part III, Articles 12–35), and Judicial Review form the highest-scoring segment of Indian Polity in WBCS Prelims and Mains Paper V. Questions test exact Article clauses, reasonable restrictions under Art 19, writ distinctions between Art 32 & Art 226, and Supreme Court Basic Structure jurisprudence.',
    keyPoints: [
      {
        title: 'The Preamble: Text, Philosophy & Amendability',
        detail:
          'Based on Jawaharlal Nehru’s Objectives Resolution (13 Dec 1946, adopted 22 Jan 1947), the Preamble reveals the source of authority (People of India), nature of the State, objectives, and adoption date (26 Nov 1949).',
        subPoints: [
          '42nd Amendment Act (1976): Added three words—"Socialist", "Secular", and "Integrity" (used only once in the Preamble).',
          'Berubari Union Case (1960): SC held Preamble is NOT part of the Constitution (though key to minds of makers).',
          'Kesavananda Bharati Case (1973, 13-judge bench, 7:6): Overruled Berubari; held Preamble IS an integral part of the Constitution, can be amended under Art 368 WITHOUT destroying its Basic Structure.',
          'LIC of India Case (1995): Reaffirmed Preamble is an integral part, though not directly enforceable/justiciable by itself.',
        ],
      },
      {
        title: 'Right to Equality (Articles 14–18) & Article 13 Judicial Review',
        detail:
          'Article 13 declares pre- and post-constitutional laws inconsistent with Fundamental Rights void, establishing the express basis of Judicial Review.',
        subPoints: [
          'Art 13(4) (24th Amendment 1971): Stated Constitutional Amendments under Art 368 are not "law" under Art 13—checked by Basic Structure in Kesavananda Bharati (1973).',
          'Art 14: Equality before Law (British origin, negative concept) & Equal Protection of Laws (US origin, positive concept).',
          'Art 15 & 16: Non-discrimination & public employment; Indra Sawhney (1992) capped reservations at 50% (except extraordinary situations) and introduced Creamy Layer; 103rd Amendment (2019) added 10% EWS via 15(6) & 16(6).',
          'Art 17 (Abolition of Untouchability) & Art 18 (Abolition of Titles except military/academic; Padma/Bharat Ratna are awards, not titles—Balaji Raghavan case 1996).',
        ],
      },
      {
        title: 'Right to Freedom (Articles 19–22) & Article 21 Jurisprudence',
        detail:
          'Article 19 guarantees six freedoms to CITIZENS ONLY (not foreigners/legal persons), subject to specific reasonable restrictions (not general "due process").',
        subPoints: [
          'Art 19(1)(a)–(g): Speech & expression, assembly (peaceful, unarmed), associations/unions (co-op societies added by 97th Amend 2011), movement, residence, profession. Right to Property [19(1)(f) & Art 31] deleted by 44th Amendment (1978) → moved to Art 300A.',
          'Art 20 (Protection in conviction): Ex-post-facto criminal laws barred (not civil/tax), Double Jeopardy (only judicial courts), Self-incrimination.',
          'Art 21 (Life & Personal Liberty): Expanded in Maneka Gandhi (1978) from "procedure established by law" (Gopalan 1950) to fair, just, reasonable "due process"; includes Privacy (Puttaswamy 2017).',
          'Art 21A (86th Amendment 2002): Free & compulsory education (6–14 yrs) → RTE Act 2009.',
          'Art 22: Arrest safeguards (24-hour magistrate production) vs Preventive Detention (max 3 months without Advisory Board approval).',
        ],
      },
      {
        title: 'Articles 23–35, Writs (Art 32 vs 226) & Emergency Suspension',
        detail:
          'Part III balances individual liberty, minority protections, and constitutional enforcement through five prerogative writs.',
        subPoints: [
          'Rights available to Citizens ONLY: Articles 15, 16, 19, 29, 30. Available to BOTH Citizens & Foreigners (except enemy aliens): 14, 20, 21, 21A, 22, 23, 24, 25, 26, 27, 28.',
          '5 Writs: Habeas Corpus (produce body; lies against both public & private), Mandamus (command public duty; not against President/Governor), Prohibition (prevent lower court excess jurisdiction — preventive), Certiorari (quash lower court order — both preventive & curative), Quo Warranto (challenge illegal usurpation of public office).',
          'Emergency Rules (44th Amendment 1978): Under Art 358 (only war/external aggression, NOT armed rebellion), Art 19 suspends automatically. Under Art 359, Presidential Order can suspend enforcement of FRs EXCEPT Articles 20 and 21 (never suspended).',
        ],
      },
    ],
    referenceTable: {
      title: 'Fundamental Rights Quick-Reference Matrix (Articles 12–35)',
      columns: ['Article / Case', 'Core Provision', 'Exam / Amendment Nuance'],
      rows: [
        ['Art 12 & 13', 'Definition of State & Judicial Review', 'Covers Govt, Parliament, State Legs, Local Bodies & statutory authorities'],
        ['Art 15(6) & 16(6)', '10% EWS Reservation', '103rd Constitutional Amendment (2019); upheld in Janhit Abhiyan (2022)'],
        ['Art 19(1)(f) & 31', 'Right to Property (deleted)', 'Moved to Art 300A (Legal Right) by 44th Amendment Act, 1978'],
        ['Art 21 & Maneka Case', 'Right to Life & Personal Liberty', '1978: Brought American "Due Process" fairness into Art 21'],
        ['Art 21A', 'Right to Education (6–14 yrs)', '86th Amendment (2002); paired with Art 45 (DPSP) & Art 51A(k)'],
        ['Art 24', 'Prohibition of Child Labour (<14 yrs)', 'Child Labour Amendment Act 2016 bans all <14 work except family/entertainment'],
        ['Art 32 vs Art 226', 'Writ Jurisdiction (SC vs HC)', 'Art 32 is itself a FR (FRs only); Art 226 covers FRs + Ordinary Legal Rights'],
        ['Art 33, 34, 35', 'Armed Forces, Martial Law, Legislation', 'Only Parliament (never State Legislatures) can legislate under Art 35'],
      ],
    },
    workedExamples: [
      {
        prompt:
          'WBCS Prelims Style: Which set of Fundamental Rights is available exclusively to Indian citizens and NOT to foreigners?',
        solution:
          'Articles 15, 16, 19, 29, and 30. Memorize the exact 5 numbers: "15, 16, 19, 29, 30". If an option includes Art 14, 20, 21, 25, or 28, eliminate it immediately.',
      },
      {
        prompt:
          'Writ Application: A senior municipal official continues holding office after attaining statutory retirement age. Which writ can any citizen seek?',
        solution:
          'Quo Warranto ("By what authority?"). Uniquely among writs, Quo Warranto can be sought by ANY interested person (not just the aggrieved individual) to challenge unlawful occupation of a substantive public office.',
      },
    ],
    comparisonPairs: [
      {
        term: 'Article 32 (Supreme Court) vs Article 226 (High Court)',
        distinction:
          'Art 32 is itself a Fundamental Right (SC cannot refuse; covers FRs only). Art 226 is discretionary (HC can refuse if alternate remedy exists), covers BOTH FRs and ordinary legal rights, making HC writ jurisdiction WIDER than SC.',
      },
      {
        term: 'Article 358 vs Article 359 (Emergency)',
        distinction:
          'Art 358 automatically suspends Art 19 across India ONLY during External Emergency (war/external aggression). Art 359 requires a Presidential Order to suspend enforcement of specified FRs (even in Armed Rebellion), EXCEPT Art 20 & 21.',
      },
      {
        term: 'Prohibition vs Certiorari',
        distinction:
          'Prohibition is issued BEFORE a lower court/tribunal finishes proceedings ("stop exceeding jurisdiction"); Certiorari is issued AFTER an order is passed to quash it ("quash error of law/jurisdiction").',
      },
    ],
    commonTraps: [
      'Thinking SC writ jurisdiction (Art 32) is wider than HC (Art 226)—territorially SC is wider, but substantively HC (Art 226) is wider.',
      'Assuming Art 19 is suspended during "Armed Rebellion" Emergency—44th Amendment restricted Art 358 automatic suspension strictly to War / External Aggression.',
      'Confusing Art 23 (traffic in human beings & forced labour — all ages) with Art 24 (child labour below age 14).',
      'Thinking Art 30 defines "linguistic or religious minorities"—the Constitution NEVER defines the term "minority".',
    ],
    mainsPerspective:
      'For WBCS Mains Paper V, analyze the evolving harmony between Part III (Fundamental Rights) and Part IV (DPSP): from Champakam Dorairajan (1951, FRs supreme) → Golaknath (1967, FRs unamendable) → 25th Amendment Art 31C → Kesavananda Bharati (1973, Basic Structure) → Minerva Mills (1980, "harmony and balance between FRs and DPSP is Basic Structure").',
    mustRememberFacts: [
      'Dr. B.R. Ambedkar called Article 32 the "Heart and Soul of the Constitution".',
      'Total 9 Schedules originally; 1st Amendment (1951) added 9th Schedule (Art 31B) — subject to Basic Structure post-24 April 1973 (I.R. Coelho 2007).',
      'Writ of Habeas Corpus CANNOT be issued where detention is lawful or by a competent court for contempt.',
      'Parliament alone (Art 35), not State Legislatures, can prescribe punishments for Art 17 & Art 23.',
      'Right to Vote is a Constitutional/Statutory Right (Art 326), NOT a Fundamental Right.',
      'Right to Strike is NOT a Fundamental Right under Art 19(1)(c).',
      '42nd Amendment added Art 39A, 43A, 48A to DPSP and Part IVA (Art 51A).',
      'K.S. Puttaswamy judgment (2017, 9-judge bench) unanimously recognized Right to Privacy as intrinsic to Article 21.',
    ],
    examTips:
      'Always verify two things in Polity MCQs: (1) whether a right applies to Citizens Only (15, 16, 19, 29, 30), and (2) whether a change was made by the 42nd (1976) vs 44th (1978) Amendment.',
    source: 'curated',
  },

  'pol-economy': {
    chapterId: 'pol-economy',
    overview:
      'Monetary Policy, RBI’s liquidity tools, Inflation dynamics, and Banking Reforms constitute the core analytical section of Indian Economy in WBCS Prelims and Mains Paper V. Examiners test directional cause-and-effect (e.g., how SDF, CRR, and OMO change money multiplier M3) alongside exact institutional committees.',
    keyPoints: [
      {
        title: 'RBI Structure, Evolution & Monetary Policy Committee (MPC)',
        detail:
          'Established on 1 April 1935 under the RBI Act 1934 (Hilton Young Commission, 1926) and nationalized on 1 January 1949; shifted from Calcutta to Bombay in 1937.',
        subPoints: [
          'MPC (Section 45ZB, RBI Act, 2016): 6 members (3 from RBI including Governor as ex-officio Chairperson with casting vote + 3 Central Govt nominees serving 4-year non-renewable terms).',
          'Flexible Inflation Targeting (Urjit Patel Committee): Target CPI (Combined) = 4% ± 2% (tolerance band 2% to 6%). Failure occurs if average inflation stays outside 2–6% for 3 consecutive quarters.',
          'First Governor: Sir Osborne Smith; First Indian Governor: C.D. Deshmukh (1943).',
        ],
      },
      {
        title: 'Quantitative (General) Monetary Policy Instruments',
        detail:
          'Quantitative tools regulate the overall volume and cost of credit across the entire economy via base money (M0) and bank lending capacity.',
        subPoints: [
          'Repo Rate (Policy Rate): Rate at which RBI lends overnight/short-term funds to banks against G-Secs (above SLR quota) with repurchase agreement.',
          'Standing Deposit Facility (SDF, introduced April 2022): Collateral-free floor of the LAF corridor where banks park surplus cash with RBI (replaced Fixed Reverse Repo as the operational floor).',
          'Marginal Standing Facility (MSF): Penal overnight window (above Repo) where banks can dip up to 2% into their SLR securities during acute liquidity crunch.',
          'CRR (Section 42, RBI Act 1934): Fraction of NDTL banks must hold as CASH with RBI (earns ZERO interest).',
          'SLR (Section 24, Banking Regulation Act 1949): Fraction of NDTL banks must hold with THEMSELVES in cash, gold, or unencumbered approved securities (earns yield).',
          'OMO (Open Market Operations): Outright purchase (injects liquidity) or sale (absorbs liquidity) of G-Secs by RBI; Market Stabilisation Scheme (MSS) sterilizes excess forex inflows.',
        ],
      },
      {
        title: 'Money Supply Aggregates (M0–M4) & Money Multiplier',
        detail:
          'Reserve Money (M0 = Currency in circulation + Bankers’ deposits with RBI + Other deposits with RBI) expands into Broad Money (M3) through commercial credit creation.',
        subPoints: [
          'M1 (Narrow Money, most liquid) = Currency with Public (C) + Demand Deposits (DD) + Other deposits with RBI.',
          'M2 = M1 + Post Office Savings Bank deposits.',
          'M3 (Broad Money, aggregate monetary resource) = M1 + Time Deposits (TD) with commercial banks.',
          'M4 = M3 + Total Post Office deposits (excluding NSC).',
          'Money Multiplier (m) = M3 / M0. Higher CRR or higher Currency-to-Deposit ratio REDUCES the Money Multiplier.',
        ],
      },
      {
        title: 'Banking Reforms, Priority Sector & Basel / NPA Architecture',
        detail:
          'India’s banking framework balances financial stability (Basel norms, PCA) with directed credit (PSL) and stressed-asset resolution.',
        subPoints: [
          'Bank Nationalization: Imperial Bank → SBI (1 July 1955, Gorwala Committee); 14 major banks (19 July 1969, deposits ≥ ₹50 cr); 6 banks (15 April 1980, deposits ≥ ₹200 cr).',
          'Narasimham Committee I (1991) & II (1998): Phased reduction of CRR/SLR, Capital Adequacy (CRAR), Asset Reconstruction, and narrow banking.',
          'Priority Sector Lending (PSL): Domestic commercial banks & foreign banks (≥20 branches) must lend 40% of ANBC (18% Agriculture, 7.5% Micro Enterprises, 12% Weaker Sections); RRBs & Small Finance Banks = 75%.',
          'NPA & IBC 2016: Loan becomes NPA if principal/interest remains overdue > 90 days; Insolvency & Bankruptcy Code (IBCI/IBBI) provides time-bound 180 (+90, max 330) day resolution.',
        ],
      },
    ],
    referenceTable: {
      title: 'Monetary Policy Action → Liquidity & Inflation Impact Matrix',
      columns: ['RBI Action', 'Liquidity / Money Supply', 'Macro Objective'],
      rows: [
        ['Hike Repo / SDF / MSF', 'Tightens liquidity; raises borrowing cost', 'Hawkish / Contractionary (curbs CPI inflation)'],
        ['Cut Repo / SDF', 'Eases credit cost; stimulates investment', 'Accommodative / Expansionary (supports GDP growth)'],
        ['Raise CRR', 'Locks cash idle with RBI; cuts Money Multiplier', 'Absorbs excess banking liquidity immediately'],
        ['Lower SLR', 'Frees funds from G-Secs for commercial loans', 'Boosts private-sector credit availability'],
        ['OMO Purchase of G-Secs', 'RBI buys bonds → injects Reserve Money (M0)', 'Counters tight liquidity & cools bond yields'],
        ['OMO Sale of G-Secs', 'RBI sells bonds → drains cash from banks', 'Sterilizes surplus money / curbs inflation'],
      ],
    },
    workedExamples: [
      {
        prompt:
          'WBCS Conceptual Trap: Suppose RBI simultaneously raises the CRR from 4% to 5% and conducts an Open Market Purchase of ₹10,000 crore of Government Securities. What happens to commercial banks’ lending capacity?',
        solution:
          'Two opposing forces operate: raising CRR REDUCES the money multiplier (contractionary), whereas OMO purchase INJECTS ₹10,000 crore of Reserve Money M0 into the banking system (expansionary). The net impact depends on the relative magnitude—never assume a single direction when two opposing tools are combined.',
      },
      {
        prompt:
          'Deficit Distinction: If Fiscal Deficit = ₹15 lakh crore and Interest Payments = ₹9 lakh crore, compute Primary Deficit and explain its significance.',
        solution:
          'Primary Deficit = Fiscal Deficit − Interest Payments = ₹15L − ₹9L = ₹6 lakh crore. It reveals how much the government is borrowing solely for current-year spending excluding inherited debt-service obligations.',
      },
    ],
    comparisonPairs: [
      {
        term: 'CRR vs SLR',
        distinction:
          'CRR is held as CASH with RBI under RBI Act 1934 (earns 0% interest); SLR is held by the bank itself in Cash, Gold, or G-Secs under Banking Regulation Act 1949 (earns bond coupon yield).',
      },
      {
        term: 'SDF vs Reverse Repo',
        distinction:
          'Fixed Reverse Repo requires RBI to pledge G-Sec collateral to banks; SDF (2022) lets RBI absorb unlimited surplus liquidity WITHOUT offering any collateral.',
      },
      {
        term: 'Monetary Policy vs Fiscal Policy',
        distinction:
          'Monetary Policy (RBI/MPC) controls money supply & interest rates (Repo, CRR, OMO); Fiscal Policy (Finance Ministry) governs taxation, govt expenditure, subsidies, and sovereign borrowing.',
      },
    ],
    commonTraps: [
      'Confusing M1 and M3 liquidity vs breadth: M1 is MOST liquid, while M3 is the broadest standard gauge (M1 + Time Deposits).',
      'Thinking CRR is governed by the Banking Regulation Act 1949—CRR is under Section 42 of RBI Act 1934, whereas SLR is under Section 24 of Banking Regulation Act 1949.',
      'Assuming banks earn interest on CRR balances with RBI—since 2007, RBI pays ZERO interest on CRR.',
      'Confusing WPI (goods only, compiled by Office of Economic Adviser, DPIIT) with CPI Combined (goods + services, compiled by NSO, MoSPI—used by MPC).',
    ],
    mainsPerspective:
      'In WBCS Mains Paper V, examine the "Impossible Trinity" and monetary transmission lag: why Repo cuts do not instantly lower bank lending rates (fixed deposits repricing, high govt borrowing crowding out private credit, and transition from Base Rate → MCLR → External Benchmark Lending Rate EBLR).',
    mustRememberFacts: [
      'RBI’s accounting year was aligned from July–June to April–March from FY 2020–21 (Bimal Jalan Committee).',
      'Urjit Patel Committee recommended CPI-Combined (4% ± 2%) as the nominal anchor.',
      'Regional Rural Banks (RRBs) were set up on 2 Oct 1975 (Prathama Bank, Moradabad) on Narasimham Working Group advice; capital split 50% Centre : 15% State : 35% Sponsor Bank.',
      'NABARD was established on 12 July 1982 (Sivaraman Committee).',
      'Ways and Means Advances (WMA) replaced ad-hoc Treasury Bills in 1997 to curb automatic monetization of fiscal deficit.',
      'FRBM Act 2003 targeted Revenue Deficit = 0% and Fiscal Deficit = 3% of GDP (NK Singh panel 2017 used Debt-to-GDP 60% anchor).',
      'Headline Inflation includes volatile food & fuel; Core Inflation excludes food & fuel.',
      'Bank Rate is used for long-term lending / penalty calculations under Section 49 of RBI Act, aligned with MSF.',
    ],
    examTips:
      'Keep CRR (RBI Act 1934, cash, 0% interest) vs SLR (BR Act 1949, liquid assets with bank) and CPI (NSO, MPC anchor) vs WPI (DPIIT, goods only) crystal clear.',
    source: 'curated',
  },

  'geo-physiography': {
    chapterId: 'geo-physiography',
    overview:
      'Indian Physiography & Mountain Systems build the structural foundation for understanding drainage, monsoon distribution, and soil genesis across WBCS Prelims and Mains Paper III. Questions test geological origin (Tethys geosyncline vs Gondwana shield), North-to-South / West-to-East pass and range sequencing, and Peninsular plateau escarpments.',
    keyPoints: [
      {
        title: 'Structural Evolution & Longitudinal Divisions of the Himalayas',
        detail:
          'Formed by the Cenozoic collision of the Indian Plate with the Eurasian Plate compressing the Tethys geosyncline, the Himalayas span ~2,400 km with syntaxial bends at Nanga Parbat (west) and Namcha Barwa (east).',
        subPoints: [
          'Trans-Himalayas (Tibetan): Karakoram (K2/Godwin-Austen 8,611 m, Siachen Glacier), Ladakh, Zanskar, Kailash ranges.',
          'Greater Himalayas / Himadri (avg ~6,000 m, crystalline granite core): Nanga Parbat, Kamet, Nanda Devi, Dhaulagiri, Annapurna, Everest (8,848.86 m), Kangchenjunga (8,586 m, highest in India under direct admin), Namcha Barwa.',
          'Lesser / Himachal Himalayas (3,700–4,500 m): Pir Panjal (longest), Dhauladhar, Nag Tibba, Mahabharat; valleys include Kashmir, Kangra, Kullu; hill stations Shimla, Mussoorie, Nainital, Darjeeling.',
          'Outer Himalayas / Shiwaliks: Unconsolidated fluvial sediments; longitudinal valleys called Duns in west (Dehradun) and Duars/Dooars in east.',
          'Regional Divisions (Sidney Burrard, river-bounded): Punjab/Kashmir (Indus–Sutlej), Kumaon (Sutlej–Kali), Nepal (Kali–Teesta), Assam (Teesta–Dihang/Brahmaputra).',
        ],
      },
      {
        title: 'Major Himalayan Thrust Faults & Mountain Passes',
        detail:
          'Geological boundary thrusts separate each Himalayan belt from north to south and govern seismic hazard zones.',
        subPoints: [
          'North-to-South Fault Sequence: ITSZ (Indus-Tsangpo Suture Zone, separates Eurasian from Indian plate) → MCT (Main Central Thrust, separates Himadri from Himachal) → MBT (Main Boundary Thrust, separates Himachal from Shiwalik) → HFT (Himalayan Frontal Thrust, separates Shiwalik from Indo-Gangetic Plains).',
          'Ladakh & J&K Passes: Karakoram Pass, Aghil, Khardung La, Zoji La (Srinagar–Leh), Banihal (Jawahar Tunnel / Qazigund), Pir Panjal.',
          'Himachal & Uttarakhand Passes: Baralacha La (Manali–Leh), Rohtang (Atal Tunnel), Shipki La (Sutlej enters India), Mana, Niti, Lipulekh (tri-junction India-Nepal-Tibet).',
          'Sikkim & Arunachal Passes: Nathu La & Jelep La (Sikkim Chumbi Valley link), Bomdi La, Sela, Diphu (tri-junction India-China-Myanmar).',
        ],
      },
      {
        title: 'Indo-Gangetic-Brahmaputra Plains (Top-to-Bottom Zones)',
        detail:
          'Formed in the foredeep depression south of the Shiwaliks by Quaternary alluvium deposition (~1,000–2,000 m deep).',
        subPoints: [
          'Bhabar: Narrow 8–16 km porous pebble belt along Shiwalik foothills where streams disappear underground (unsuitable for agriculture).',
          'Terai: 15–30 km marshy, re-emergent belt south of Bhabar; dense forests & rich agriculture once drained.',
          'Bhangar: Older Pleistocene alluvium forming elevated terraces, rich in calcareous nodules ("Kankar").',
          'Khadar: Newer Holocene flood-plain alluvium replenished annually by floods; highest fertility (called "Bet" in Punjab).',
        ],
      },
      {
        title: 'Peninsular Plateau, Western vs Eastern Ghats & Island Groups',
        detail:
          'India’s oldest and most stable Precambrian Gondwana landmass, tilted gently eastward overall except along the Narmada-Tapi rift grabens.',
        subPoints: [
          'Aravallis: Oldest fold mountains (relict); Guru Shikhar (1,722 m, Mount Abu). Vindhyas & Satpuras (Block mountains flanking Narmada & Tapi rift valleys; Dhupgarh 1,350 m highest in Satpura).',
          'Western Ghats (Sahyadri): Continuous faulted scarp; passes Thal Ghat (Mumbai–Nashik), Bhor Ghat (Mumbai–Pune), Pal Ghat / Palakkad Gap (Nilgiris–Anamalai), Shencottah Gap. Highest peak Anamudi (2,695 m, Anamalai); Doddabetta (2,637 m, Nilgiris).',
          'Eastern Ghats: Discontinuous, eroded hills (Nallamala, Palkonda, Javadi, Shevaroy); meet Western Ghats at Nilgiri Knot. Highest peak Jindhagada (1,690 m, AP) / Arma Konda (older texts: Mahendragiri).',
          'Channels & Islands: 8° Channel (Minicoy–Maldives), 9° Channel (Minicoy–Lakshadweep), 10° Channel (Little Andaman–Car Nicobar), Duncan Passage (South Andaman–Little Andaman). Saddle Peak (732 m, North Andaman); Barren Island (only active volcano in India).',
        ],
      },
    ],
    referenceTable: {
      title: 'Physiographic Boundaries, Passes & Channels Matrix',
      columns: ['Feature / Pass / Channel', 'Location / Separation', 'Key Exam Fact'],
      rows: [
        ['MCT vs MBT', 'Himadri–Himachal vs Himachal–Shiwalik', 'North-to-South order: ITSZ → MCT → MBT → HFT'],
        ['Zoji La vs Banihal Pass', 'Srinagar–Leh vs Jammu–Srinagar', 'Zoji La crosses Greater Himalayas; Banihal crosses Pir Panjal'],
        ['Shipki La & Lipulekh', 'Himachal Pradesh & Uttarakhand', 'Sutlej enters India at Shipki La; Lipulekh is Kailash Mansarovar route'],
        ['Nathu La & Jelep La', 'Sikkim (Chumbi Valley border)', 'Key Indo-China trade & strategic passes near Kalimpong/Gangtok'],
        ['Pal Ghat (Palakkad Gap)', 'Between Nilgiris & Anamalai Hills', 'Connects Tamil Nadu (Coimbatore) with Kerala (Palakkad)'],
        ['8° / 9° / 10° Channels', 'Island separations in Indian Ocean', '8° Maldives-Minicoy; 9° Minicoy-Lakshadweep; 10° Little Andaman-Car Nicobar'],
      ],
    },
    workedExamples: [
      {
        prompt:
          'WBCS Prelims Standard: Arrange these mountain passes from NORTH to SOUTH along the Western Ghats: Pal Ghat, Bhor Ghat, Shencottah Gap, Thal Ghat.',
        solution:
          'North-to-South order: Thal Ghat (Maharashtra, Mumbai–Nashik) → Bhor Ghat (Maharashtra, Mumbai–Pune) → Pal Ghat (Kerala–TN border) → Shencottah Gap (southernmost, Cardamom Hills).',
      },
      {
        prompt:
          'Bhabar–Terai Concept: Why do Himalayan streams disappear in the Bhabar belt and re-emerge in the Terai belt?',
        solution:
          'Bhabar consists of coarse gravel and boulders deposited at steep piedmont slopes with very high porosity, allowing streams to percolate underground. Further south in the gentler, finer-sediment Terai belt, the water table rises to the surface, creating marshy re-emergent streams.',
      },
    ],
    comparisonPairs: [
      {
        term: 'Bhangar vs Khadar',
        distinction:
          'Bhangar is older, elevated terrace alluvium with Kankar nodules (less fertile); Khadar is younger, low-lying floodplain silt renewed every monsoon (highly fertile).',
      },
      {
        term: 'Western Ghats vs Eastern Ghats',
        distinction:
          'Western Ghats are continuous, higher (avg 900–1,600 m), crossed only via passes, and rise steeply from the Arabian Sea; Eastern Ghats are lower (avg ~600 m), discontinuous, and cut by Mahanadi–Godavari–Krishna–Kaveri deltas.',
      },
      {
        term: 'Lakshadweep vs Andaman & Nicobar',
        distinction:
          'Lakshadweep are coral atolls built on volcanic seamounts (Arabian Sea); Andaman & Nicobar are emergent peaks of the submerged Arakan Yoma tertiary fold range (Bay of Bengal).',
      },
    ],
    commonTraps: [
      'Confusing K2 (Karakoram, PoK) with Kangchenjunga (Sikkim–Nepal border, highest Indian-administered peak).',
      'Reversing 9° Channel and 10° Channel—9° is in Lakshadweep (Minicoy–main Lakshadweep); 10° is in Andaman & Nicobar.',
      'Thinking Vindhyas and Satpuras are Fold Mountains—they are Block/Horst mountains bordering rift grabens, while Aravallis are relict Fold Mountains.',
      'Confusing "Karewas" (lacustrine saffron-growing deposits of Kashmir Valley) with "Kankar" (calcareous nodules in Bhangar).',
    ],
    mainsPerspective:
      'In WBCS Mains Geography, connect physiography with resource distribution and hazards: why Peninsular India (Gondwana & Dharwar cratons) holds metallic minerals and 98% of India’s coal while the young fold Himalayas face tectonic instability, landslides, and hydropower/GLOF vulnerability.',
    mustRememberFacts: [
      'Indira Point (Great Nicobar, 6°45′ N) is India’s southernmost point; Indira Col (Siachen) is the northernmost.',
      'Kibithu (Arunachal Pradesh) is easternmost; Guhar Moti (Kutch, Gujarat) is westernmost.',
      'IST (82°30′ E) passes through 5 states: UP, MP, Chhattisgarh, Odisha, Andhra Pradesh.',
      'Tropic of Cancer (23°30′ N) passes through 8 states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, West Bengal (Purulia, Bankura, Purba/Paschim Bardhaman, Nadia), Tripura, Mizoram.',
      'Deccan Trap was formed by Cretaceous basaltic fissure eruptions over the Reunion hotspot.',
      'Meghalaya Plateau (Garo, Khasi, Jaintia) is geologically an extension of the Peninsular Plateau separated by the Malda Gap / Garo-Rajmahal Gap.',
      'Loktak Lake (Manipur) features floating phumdis (Keibul Lamjao, world’s only floating National Park).',
      'Kaveri and Mahanadi form fertile deltas, whereas Narmada and Tapi form estuaries.',
    ],
    examTips:
      'Memorize the 5 WB districts touched by the Tropic of Cancer (Purulia, Bankura, Paschim Bardhaman, Purba Bardhaman, Nadia) and the 8 states it crosses—WBCS tests this repeatedly.',
    source: 'curated',
  },

  'sci-biology': {
    chapterId: 'sci-biology',
    overview:
      'Human Physiology, Genetics, Immunology, Endocrine Regulation, and Plant Biology account for the largest share of General Science marks across WBCS Prelims, Mains Paper IV, Food SI, and Primary TET. Examiners test enzyme/hormone targets, cranial/cardiac physiology, pathogen-vector taxonomy, and biochemical vitamin cofactors.',
    keyPoints: [
      {
        title: 'Cellular Organelles & Nucleic Acids (DNA / RNA)',
        detail:
          'Eukaryotic compartmentalization divides oxidative phosphorylation, protein packaging, and genetic replication across specialized membranes.',
        subPoints: [
          'Double-Membrane Organelles (with own circular DNA & 70S ribosomes): Mitochondria (ATP synthesis via Krebs Cycle & Oxidative Phosphorylation) and Plastids/Chloroplasts (photosynthesis).',
          'Single-Membrane: ER (Rough = protein synthesis; Smooth = lipid synthesis & detoxification), Golgi Apparatus (glycosylation & packaging), Lysosome (acid hydrolases at pH ~5, "suicidal bag").',
          'DNA vs RNA: DNA has deoxyribose + A, T, G, C (Chargaff’s rule: A=T, G=C; double helix by Watson & Crick 1953); RNA has ribose + Uracil (U) instead of Thymine (T).',
          'Mitosis (somatic, 2 identical diploid daughter cells) vs Meiosis (gametes, 4 haploid cells, crossing over in Pachytene of Prophase I generates genetic variation).',
        ],
      },
      {
        title: 'Digestive Enzymes & Human Nutrition',
        detail:
          'Macromolecules undergo sequential enzymatic hydrolysis across pH-specific compartments along the alimentary canal.',
        subPoints: [
          'Mouth (pH 6.8): Salivary amylase (Ptyalin) converts Starch → Maltose; Lysozyme kills bacteria.',
          'Stomach (pH 1.5–2.0): HCl (Parietal/Oxyntic cells) activates Pepsinogen → Pepsin (proteins → peptones) & provides Castle’s Intrinsic Factor (needed for Vitamin B12 absorption).',
          'Liver & Pancreas into Duodenum (pH 7.8–8.4): Bile (no enzymes! bile salts emulsify fats); Pancreatic juice ("Complete digestive juice") has Trypsin, Amylase, and Lipase.',
          'Small Intestine (Succus entericus): Maltase, Lactase, Sucrase, Erepsin; maximum absorption occurs through villi & microvilli in Jejunum/Ileum.',
        ],
      },
      {
        title: 'Circulatory, Respiratory & Excretory Physiology',
        detail:
          'Double circulation keeps oxygenated and deoxygenated blood separated via the 4-chambered mammalian heart and nephron filtration regulates homeostasis.',
        subPoints: [
          'Heart Pacemaker & Valves: SA Node (right atrium wall) initiates impulse → AV Node → Bundle of His → Purkinje fibres. Bicuspid/Mitral valve (left atrium–ventricle); Tricuspid valve (right). Normal BP = 120/80 mmHg (Sphygmomanometer).',
          'Blood Components: Plasma (~55%, fibrinogen removed = Serum); RBCs (biconcave, enucleated in mammals except camel/llama, 120-day lifespan, spleen = graveyard); Platelets (thrombocytes → thromboplastin + Ca²⁺ + Vit K clotting); WBCs (Neutrophils most abundant; Lymphocytes T & B for immunity).',
          'ABO & Rh Inheritance: Antigens on RBC surface, Antibodies in plasma. O− = Universal Donor (no A, B, Rh antigens); AB+ = Universal Recipient (no anti-A, anti-B, anti-Rh antibodies).',
          'Kidney Nephron: Ultrafiltration at Glomerulus/Bowman’s Capsule; selective reabsorption at PCT; ADH (Vasopressin) regulates water reabsorption in DCT/Collecting Duct (deficiency → Diabetes Insipidus).',
        ],
      },
      {
        title: 'Endocrine System, Nervous Coordination & Diseases',
        detail:
          'Hormones act as ductless chemical messengers regulated mostly by negative feedback loops via the Hypothalamus–Pituitary axis.',
        subPoints: [
          'Pituitary (Master Gland, regulated by Hypothalamus): Anterior secretes GH (excess → Gigantism/Acromegaly), TSH, ACTH, FSH, LH, Prolactin; Posterior stores/releases Oxytocin (birth/milk ejection) & ADH.',
          'Thyroid (Thyroxine T4/T3 — needs Iodine; deficiency → Simple Goitre/Cretinism; Parathyroid → Parathormone raises blood Ca²⁺).',
          'Pancreas (Mixed/Heterocrine): Islets of Langerhans — Beta cells secrete Insulin (lowers blood glucose → deficiency = Diabetes Mellitus); Alpha cells secrete Glucagon (raises blood glucose).',
          'Adrenal: Cortex (Cortisol, Aldosterone); Medulla (Adrenaline/Epinephrine — "Fight or Flight" hormone).',
          'Pathogens: Viral (Dengue [Aedes aegypti], Polio, Rabies, HIV, Hepatitis B), Bacterial (TB [Mycobacterium, BCG], Typhoid [Salmonella, Widal test], Cholera), Protozoan (Malaria [Plasmodium, Anopheles], Kala-azar [Leishmania, Sandfly]).',
        ],
      },
    ],
    referenceTable: {
      title: 'Vitamins, Chemical Names, Deficiency Disorders & Sources',
      columns: ['Vitamin & Solubility', 'Chemical Name', 'Deficiency Disease & Exam Hook'],
      rows: [
        ['Vitamin A (Fat)', 'Retinol', 'Night blindness (Nyctalopia), Xerophthalmia; stored in Liver'],
        ['Vitamin B1 (Water)', 'Thiamine', 'Beriberi (nerve & cardiac weakness); lost in polished rice'],
        ['Vitamin B3 (Water)', 'Niacin', 'Pellagra (3Ds: Dermatitis, Diarrhoea, Dementia)'],
        ['Vitamin B12 (Water)', 'Cyanocobalamin', 'Pernicious anaemia; ONLY vitamin containing Cobalt (Co)'],
        ['Vitamin C (Water)', 'Ascorbic Acid', 'Scurvy (bleeding gums); heat-labile, aids Iron absorption'],
        ['Vitamin D (Fat)', 'Calciferol', 'Rickets (children), Osteomalacia (adults); synthesized via UV-B'],
        ['Vitamin E (Fat)', 'Tocopherol', 'Sterility / antioxidant deficiency'],
        ['Vitamin K (Fat)', 'Phylloquinone', 'Haemorrhage (delayed blood clotting / prothrombin synthesis)'],
      ],
    },
    workedExamples: [
      {
        prompt:
          'Genetics & Blood Group Application: If a father has blood group A (heterozygous I^A i) and a mother has blood group B (heterozygous I^B i), what blood groups are possible in their children?',
        solution:
          'Cross I^A i × I^B i gives four genotypes: I^A I^B (AB), I^A i (A), I^B i (B), and ii (O). Therefore ALL FOUR blood groups (A, B, AB, and O) are possible in their offspring.',
      },
      {
        prompt:
          'Physiology Distinction: How do Diabetes Mellitus and Diabetes Insipidus differ in hormone and pathophysiology?',
        solution:
          'Diabetes Mellitus is caused by hyposecretion of INSULIN (from Pancreatic Beta cells), causing hyperglycaemia and glucosuria. Diabetes Insipidus is caused by deficiency of ADH / Vasopressin (posterior pituitary), causing excessive dilute urine WITHOUT sugar.',
      },
    ],
    comparisonPairs: [
      {
        term: 'Xylem vs Phloem',
        distinction:
          'Xylem conducts water & minerals UNIDIRECTIONALLY upward (mostly dead cells except xylem parenchyma); Phloem translocates sucrose/food BIDIRECTIONALLY (living sieve tubes & companion cells).',
      },
      {
        term: 'Arteries vs Veins',
        distinction:
          'Arteries carry blood AWAY from the heart (high pressure, thick muscular walls, no valves); Veins carry blood TOWARD the heart (low pressure, valves prevent backflow). Exception: Pulmonary Artery carries deoxygenated blood; Pulmonary Vein carries oxygenated blood.',
      },
      {
        term: 'Active Immunity vs Passive Immunity',
        distinction:
          'Active immunity develops slowly when the host makes its own antibodies (infection or vaccines); Passive immunity provides immediate ready-made antibodies (mother’s colostrum IgA, antivenom, tetanus antitoxin).',
      },
    ],
    commonTraps: [
      'Calling Bile an enzyme—bile contains NO digestive enzymes; it only emulsifies fats and creates alkaline pH.',
      'Assuming Pulmonary Artery carries oxygenated blood—ONLY arteries going to systemic organs do; Pulmonary Artery carries deoxygenated blood from right ventricle to lungs.',
      'Confusing B12 (Cobalt, Pernicious anaemia) with Folic Acid / B9 (Megaloblastic anaemia) or Iron deficiency (Microcytic anaemia).',
      'Misidentifying Kala-azar vector as mosquito—it is transmitted by Sandfly (Phlebotomus), caused by protozoan Leishmania donovani.',
    ],
    mainsPerspective:
      'For WBCS Mains Paper IV (Science & Tech), link cellular/molecular concepts to contemporary public health & biotech: mRNA vs viral-vector vaccines, CRISPR-Cas9 gene editing, monoclonal antibodies, AMR (antimicrobial resistance), and Arsenicosis/Thalassemia public health burdens in West Bengal.',
    mustRememberFacts: [
      'Fat-soluble vitamins: A, D, E, K (stored in liver/adipose); Water-soluble: B-complex & C.',
      'Normal human somatic cell has 46 chromosomes (22 pairs autosomes + 1 pair sex chromosomes).',
      'Enzyme Pepsin works in acidic pH (~1.8), while Trypsin works in alkaline pH (~8.0).',
      'Nitrogenous waste in mammals/humans is Urea (Ureotelic, synthesized in Liver via Ornithine cycle); birds/reptiles = Uric acid; bony fish = Ammonia.',
      'Plants absorb Nitrogen mainly as Nitrate (NO₃⁻) and Ammonium (NH₄⁺); Rhizobium fixes atmospheric N₂ in legume root nodules using leghemoglobin.',
      'Auxin causes phototropism; Gibberellin breaks dormancy/bolting; Cytokinin delays senescence; Ethylene (gaseous) ripens fruit; Abscisic Acid (ABA) closes stomata.',
      'ELISA test screens HIV; Widal test detects Typhoid; Mantoux test screens Tuberculosis.',
      'Bhopal Gas Tragedy (1984) involved Methyl Isocyanate (MIC); Minamata = Mercury; Itai-Itai = Cadmium.',
    ],
    examTips:
      'In Science MCQs, double-check exceptions (Pulmonary Artery/Vein, Bile having no enzymes, Vitamin B12 having Cobalt, Ethylene being a gaseous plant hormone).',
    source: 'curated',
  },

  'qnt-percent-profit': {
    chapterId: 'qnt-percent-profit',
    overview:
      'Percentage, Profit & Loss, Marked Price Discounts, Dishonest Weight Traps, and Successive Change form the computational backbone of Arithmetic across WBCS Mains (Paper VI), Food SI (50 marks Maths), WBPSC Clerkship, and WB Police SI. Speed depends on converting percentages into exact fractions and solving CP:MP ratios in 15 seconds.',
    keyPoints: [
      {
        title: 'Fraction–Percentage Reciprocals & Base Shifts',
        detail:
          'Memorizing standard fraction equivalents eliminates long decimal multiplication and solves "A is x% more than B, then B is what % less than A" instantly.',
        subPoints: [
          'Core Table: 1/2 = 50%, 1/3 = 33⅓%, 1/4 = 25%, 1/5 = 20%, 1/6 = 16⅔%, 1/7 = 14²⁄₇%, 1/8 = 12.5%, 1/9 = 11⅑%, 1/11 = 9¹⁄₁₁%, 1/12 = 8⅓%, 1/15 = 6⅔%, 1/16 = 6.25%.',
          'Derived Fractions: 3/8 = 37.5%, 5/8 = 62.5%, 5/6 = 83⅓%, 4/7 = 57¹⁄₇%.',
          'AB = Constant Rule (Price × Consumption = Expenditure): If Price increases by x/y, Consumption must drop by x/(x + y) to keep Expenditure unchanged (e.g., Price +25% = +1/4 → Consumption −1/(4+1) = −20%).',
        ],
      },
      {
        title: 'Profit, Loss & Selling-Price Basis Traps',
        detail:
          'Standard Profit/Loss is ALWAYS computed on Cost Price (CP) unless explicitly stated on Selling Price (SP). Converting SP-based profit to CP-based profit uses the same x/(y−x) shift.',
        subPoints: [
          'CP × (100 + P%)/100 = SP; CP × (100 − L%)/100 = SP.',
          'Same SP Trap: If two articles are sold at the SAME SP, one at x% gain and the other at x% loss, there is ALWAYS an overall LOSS of (x² / 100)% (not no profit no loss!).',
          'Same CP Rule: If two articles have the SAME CP, one sold at x% gain and one at x% loss, net result is 0% (no profit, no loss).',
          'SP-to-CP Conversion: 20% profit on SP (= 1/5 of SP) → CP = 5 − 1 = 4 → Actual Profit% on CP = 1/4 = 25%.',
        ],
      },
      {
        title: 'Marked Price (MP), Discount & CP : MP Master Formula',
        detail:
          'Discount is always applied to Marked Price (MP), linking CP and MP directly through SP without needing intermediate numbers.',
        subPoints: [
          'Master Identity: CP / MP = (100 − Discount%) / (100 + Profit%).',
          'Successive Discounts d₁% and d₂%: Equivalent single discount = d₁ + d₂ − (d₁ × d₂)/100 (always LESS than d₁ + d₂).',
          '"Buy x, Get y Free": Effective Discount% = [y / (x + y)] × 100 (e.g., Buy 3 Get 1 Free → 1/4 = 25% discount).',
        ],
      },
      {
        title: 'Dishonest Shopkeeper & Multi-Stage Percentage Chains',
        detail:
          'False-weight problems combine a weight ratio (what the seller actually pays for vs what the customer pays for) with any stated markup or discount.',
        subPoints: [
          'Ratio Method (Foolproof): Multiply (CP factor) : (SP factor). If seller uses 800 g instead of 1000 g AND claims 10% loss: Weight ratio CP:SP = 800:1000 (4:5); Price ratio = 100:90 (10:9). Net CP:SP = (4×10) : (5×9) = 40:45 → Profit = 5/40 = 12.5%.',
          'Successive % Change: Net change = a + b + (ab/100), or multiply fraction ratios cleanly (e.g., +16⅔% then −14²⁄₇% → (7/6) × (6/7) = 1 → 0% net change!).',
        ],
      },
    ],
    referenceTable: {
      title: 'Arithmetic Profit, Discount & Percentage Shortcut Matrix',
      columns: ['Problem Pattern', 'Direct Formula / Ratio', 'Worked Example'],
      rows: [
        ['Price +x/y, keep Exp same', 'Consumption drop = x/(x+y)', 'Price +25% (+1/4) → Cut use by 1/5 = 20%'],
        ['Marked Price vs Cost Price', 'CP : MP = (100−D%) : (100+P%)', '20% discount & 20% profit → CP:MP = 80:120 = 2:3 (+50% markup)'],
        ['Same SP, +x% and −x%', 'Always Loss = (x²/100)%', 'Same SP, +20% and −20% → 400/100 = 4% net loss'],
        ['Buy X, Get Y Free', 'Discount% = Y / (X + Y) × 100', 'Buy 4 Get 1 Free → 1/5 = 20% discount'],
        ['Dishonest weight w for W', 'Profit% = (W − w)/w × 100', 'Gives 900g for 1kg at CP → 100/900 = 11.11% profit'],
        ['Successive Discounts a%, b%', 'Net D = a + b − (ab/100)', '20% then 10% → 20 + 10 − 2 = 28% single discount'],
      ],
    },
    workedExamples: [
      {
        prompt:
          'WBCS Mains / Food SI Level: A dishonest trader marks up goods by 40% above CP, allows a 20% discount to customers, and uses an 840 g weight instead of 1 kg. Find his overall net profit percentage.',
        solution:
          'Use ratio chaining (CP side vs SP side): (1) Markup +40% → 100 : 140 (5 : 7). (2) Discount −20% → 5 : 4. (3) Weight 840 g for 1000 g → trader pays for 840 while charging for 1000 → 840 : 1000 (21 : 25). Multiply columns: CP = 5 × 5 × 21 = 525; SP = 7 × 4 × 25 = 700. Net Profit = (700 − 525)/525 = 175/525 = 1/3 = 33.33%.',
      },
      {
        prompt:
          'Tricky SP Ratio Problem: By selling 33 metres of cloth, a merchant loses an amount equal to the Selling Price of 11 metres. Find his loss percentage.',
        solution:
          'Loss = CP − SP. Let SP of 1 m = ₹1 → Total SP(33) = ₹33; Loss = ₹11. Thus CP(33) = SP + Loss = 33 + 11 = ₹44. Loss% = (Loss / CP) × 100 = (11 / 44) × 100 = 25% loss.',
      },
    ],
    comparisonPairs: [
      {
        term: 'Same CP (+x% & −x%) vs Same SP (+x% & −x%)',
        distinction:
          'Same CP yields 0% net gain/loss; Same SP ALWAYS yields a net LOSS of (x²/100)%.',
      },
      {
        term: 'Profit% on CP vs Profit% on SP',
        distinction:
          '25% profit on CP (= 1/4) equals 20% on SP (= 1/5). Conversely, 20% profit on SP equals 25% on CP.',
      },
    ],
    commonTraps: [
      'Dividing by False Weight W (1000 g) instead of True Given Weight w (800 g)—the trader’s real investment is only on 800 g!',
      'Adding two successive discounts directly (e.g., 20% + 20% = 40% is WRONG; actual single discount is 36%).',
      'Forgetting whether a stated gain/loss in "selling N articles" is equated to CP or SP of M articles.',
    ],
    mainsPerspective:
      'In WBCS Mains Paper VI (100 Maths + 100 Reasoning MCQs in 3 hours), speed with ratio chaining (CP:MP:SP) and fraction equivalents saves 30–40 seconds per question, leaving buffer time for Data Interpretation and Mensuration.',
    mustRememberFacts: [
      'CP / MP = (100 − D%) / (100 + P%) handles almost all Marked Price questions in one line.',
      'Successive +x% and −x% ALWAYS results in a net decrease of (x²/100)%.',
      'If CP of A articles = SP of B articles → Profit/Loss% = [(A − B)/B] × 100.',
      'To turn a percentage increase x/y back to original, reduce by x/(x + y).',
      'To turn a percentage decrease x/y back to original, increase by x/(y − x).',
      'Population after n years at r%: P(1 + r/100)ⁿ; n years ago: P / (1 + r/100)ⁿ.',
    ],
    examTips:
      'Write the CP : MP : SP ratio columns for multi-condition discount/weight problems instead of letting CP = 100 and juggling messy decimals.',
    source: 'curated',
  },

  'rsn-syllogism-venn': {
    chapterId: 'rsn-syllogism-venn',
    overview:
      'Syllogism ("Only a few", "Only", "Possibility", "Either-Or") and Venn Diagrams test strict deductive validity in WBCS Mains Paper VI and WB Police SI. Candidates frequently lose marks by importing real-world assumptions or mishandling complementary "Either-Or" conditions.',
    keyPoints: [
      {
        title: 'Standard Categorical Statements & Minimum Venn Diagrams',
        detail:
          'Always draw the least-overlapping (minimal assumption) diagram to test Definite Conclusions, and test alternate valid diagrams only when evaluating Possibility conclusions.',
        subPoints: [
          'All A are B (Universal Positive): Circle A lies inside B. Definite: Some A are B, Some B are A. NOT definite: All B are A.',
          'Some A are B (Particular Positive): A intersects B. Definite: Some B are A. NOT definite: Some A are not B.',
          'No A is B (Universal Negative): Disjoint circles with cross-bar. Definite: No B is A, Some A are not B, Some B are not A.',
          'Some A are not B (Particular Negative): Definite arrow from shaded part of A outside B. Inverse ("Some B are not A") does NOT necessarily follow!',
        ],
      },
      {
        title: 'Modern WBPSC Traps: "Only", "Only a few", and Possibility',
        detail:
          'Recent competitive papers heavily test restricted quantifiers that encode two statements simultaneously.',
        subPoints: [
          '"Only A are B": Means "All B are A" WITH restriction that B cannot intersect any third element C unless C is inside A.',
          '"Only a few A are B": Means BOTH "Some A are B" AND "Some A are NOT B" simultaneously (All A can NEVER be B!).',
          'Possibility Rule: Any conclusion that does NOT violate the given statements in at least one valid Venn diagram is a TRUE possibility (if a relationship is already definitely true, its "possibility" is false!).',
        ],
      },
      {
        title: 'The 3 Mandatory Conditions for "Either I or II Follows"',
        detail:
          'Select "Either I or II" ONLY when all three structural conditions hold simultaneously.',
        subPoints: [
          'Condition 1: Both conclusions I and II must be INDIVIDUALLY FALSE (uncertain / "can’t say") in the minimal diagram.',
          'Condition 2: Both conclusions must share the SAME Subject and Predicate (order may flip for Some + No, or All + Some not carefully checked).',
          'Condition 3: They form a Complementary Pair: (a) "Some + No", (b) "All + Some not", or (c) "Some + Some not" (Note: "All + No" is NOT a complementary pair—neither may hold when "Some" is true!).',
        ],
      },
    ],
    referenceTable: {
      title: 'Syllogism Validity & Complementary Pair Reference',
      columns: ['Statement / Pair', 'Definite Implication', 'Common Trap to Avoid'],
      rows: [
        ['Only a few A are B', 'Some A are B + Some A are not B', 'Never mark "All A can be B" as a true possibility'],
        ['Only A are B', 'All B are A (B is exclusive to A)', 'B cannot form a "Some B are C" relation outside A'],
        ['Some A are B + No A is B', 'Valid Either-Or (if both uncertain)', 'Works even if terms flip in No (No B is A = No A is B)'],
        ['All A are B + No A is B', 'NEVER Either-Or!', 'If "Some A are B" is true, BOTH All and No fail!'],
        ['Already Definite Fact', 'Possibility statement = FALSE', 'If "Some A are B" is definitely true, "Some A being B is a possibility" is FALSE'],
      ],
    },
    workedExamples: [
      {
        prompt:
          'Statements: Only a few Rivers are Lakes. All Lakes are Ponds. Conclusions: (I) All Rivers being Ponds is a possibility. (II) Some Ponds are Rivers.',
        solution:
          'Conclusion I: "Only a few Rivers are Lakes" means some Rivers are NOT Lakes—Wait: can all Rivers still be inside Ponds even if some Rivers are outside Lakes? YES! Because Lakes are inside Ponds, the non-Lake Rivers can still sit inside the outer part of Ponds. So (I) IS a valid possibility. Conclusion II: Since Some Rivers are Lakes and All Lakes are Ponds, Some Ponds are definitely Rivers. Thus BOTH I and II follow!',
      },
      {
        prompt:
          'Statements: Some Papers are Pens. No Pen is a Book. Conclusions: (I) All Papers are Books. (II) No Paper is a Book.',
        solution:
          'Check Either-Or: Both I and II are individually false/uncertain, share the same terms (Paper, Book), and form the "All + No" pair. Wait: "All + No" is NOT complementary! Here some Papers are Pens (and no Pen is a Book), so those Papers can NEVER be Books—making (I) DEFINITELY FALSE, not uncertain. Neither follows!',
      },
    ],
    comparisonPairs: [
      {
        term: '"Some A are B" vs "Only a few A are B"',
        distinction:
          'Under "Some A are B", "All A being B" IS a valid possibility; under "Only a few A are B", "All A being B" is IMPOSSIBLE.',
      },
      {
        term: 'Either-Or: (Some + No) vs (All + No)',
        distinction:
          '(Some + No) is a valid Either-Or complementary pair; (All + No) is NEVER Either-Or.',
      },
    ],
    commonTraps: [
      'Selecting "Either I or II" for an "All + No" pair.',
      'Treating "Some A are not B" as reversible to "Some B are not A" (it is NOT reversible!).',
      'Assuming a definite truth makes its "possibility" true—in logic, certainty negates mere possibility.',
    ],
    mainsPerspective:
      'WBCS Mains Paper VI features 3–5 multi-statement Syllogisms and 3-set Venn numericals (e.g., candidates passing A, B, and C). Always use clean set-inclusion formulas: Total = n(A) + n(B) + n(C) − n(A∩B) − n(B∩C) − n(C∩A) + n(A∩B∩C) + None.',
    mustRememberFacts: [
      'Two Particular statements ("Some" + "Some") yield NO definite relation between extreme terms.',
      'Two Negative statements ("No" + "No") yield NO definite conclusion between extreme terms.',
      '"Few", "Mostly", "At least some", "99%", "Many" all mean SOME.',
      '"Each", "Every", "100%", "Any" all mean ALL.',
      '"None", "0%", "Never" all mean NO.',
    ],
    examTips:
      'Draw the minimal diagram first for definite conclusions; only check an alternate diagram if a "possibility" or "Some...not" conclusion is asked.',
    source: 'curated',
  },
  'lng-eng-grammar': {
    chapterId: 'lng-eng-grammar',
    overview:
      'English Grammar & Syntax (25 marks in WBCS Prelims + Compulsory Paper II in Mains + 30–50 marks in Clerkship/SI) relentlessly tests Fixed Prepositions, Subjunctive Conditionals, Subject-Verb Proximity Rules, Inversion, and Voice/Narration transformations rather than basic textbook definitions.',
    keyPoints: [
      {
        title: 'Subject–Verb Agreement: Proximity vs Additive Connectors',
        detail:
          'WBPSC error-spotting questions hinge on distinguishing true compound subjects ("and") from parenthetical prepositional phrases ("as well as") and correlative conjunctions.',
        subPoints: [
          'First-Subject Rule: When subjects join via "as well as, along with, together with, in addition to, besides, like, unlike, accompanied by", the verb agrees with the FIRST subject (e.g., "The captain, along with his sailors, WAS drowned").',
          'Proximity Rule: With "Neither...nor, Either...or, Not only...but also", the verb agrees with the NEARER subject ("Neither the officers nor the clerk WAS present"; "Neither the clerk nor the officers WERE present").',
          '"Many a + Singular Noun" takes a SINGULAR verb ("Many a soldier has died"); "A great many + Plural Noun" takes a PLURAL verb.',
          '"A number of + Plural Noun" = PLURAL verb; "The number of + Plural Noun" = SINGULAR verb.',
        ],
      },
      {
        title: 'Conditionals, Subjunctive Mood & Tense Inversion',
        detail:
          'Unfulfilled past regrets, hypothetical wishes, and negative adverbial openers require strict auxiliary-tense pairing.',
        subPoints: [
          'Type 2 (Unreal Present): If + Simple Past (always "were", even with I/he/she), Main Clause = would + V1 ("If I WERE you, I would resign").',
          'Type 3 (Unreal Past): If + Past Perfect (had + V3), Main Clause = would have + V3 — OR inverted "Had + Subject + V3, ... would have + V3" (NEVER "If I would have...").',
          'High-Frequency Past-Subjunctive Triggers: "It is high time / It is about time + Subject + V2 (Simple Past)" ("It is high time we STARTED preparing").',
          'Negative Inversion: Sentences opening with "Hardly/Scarcely, No sooner, Seldom, Never, Little, Not only" invert auxiliary before subject ("No sooner HAD the bell rung THAN..."; "Hardly HAD I left WHEN...").',
        ],
      },
      {
        title: 'Fixed & Confusing Prepositions (WBCS High-Frequency)',
        detail:
          'Direct translation from Bengali leads to systematic preposition errors with Latin comparatives, disease causes, and transitive verbs that forbid prepositions.',
        subPoints: [
          'Transitive Verbs Taking NO Preposition in Active Voice: Discuss, Describe, Order, Demand, Emphasize, Comprise (= consist of), Resemble, Enter (place), Attack, Marry (active), Await (= wait for).',
          'Die OF (disease/hunger/thirst) vs Die FROM (wound/overwork/food poisoning) vs Die FOR (country/cause) vs Die BY (violence/suicide).',
          'Latin Comparatives & Adjectives: Senior, Junior, Superior, Inferior, Prior, Posterior, Prefer, Preferable ALWAYS take "TO" (never "than").',
          'Differ WITH (person/opinion) vs Differ FROM (unlike); Part FROM (person) vs Part WITH (property/possession); Blind IN (one eye) vs Blind TO (faults).',
        ],
      },
    ],
    referenceTable: {
      title: 'High-Confusion Preposition, Connector & Mood Matrix',
      columns: ['Expression / Verb', 'Correct Preposition / Pairing', 'Classic Exam Trap'],
      rows: [
        ['Hardly / Scarcely', '... WHEN + Subject (with inversion)', 'Never pair with "than" (reserved for No sooner)'],
        ['No sooner', '... THAN + Subject (No sooner had he... than)', 'Never pair with "when" or "then"'],
        ['Lest', '... SHOULD + V1 (negative inherent)', 'Never use "not" or "will/may" after Lest'],
        ['Comprise vs Consist', 'Comprise (no "of" in active) vs Consist OF', 'Writing "The book comprises of 10 chapters" is WRONG'],
        ['Between vs Among', 'Between (2, OR >2 with mutual/reciprocal link)', '"Treaty between 4 nations" IS correct (reciprocal)'],
        ['Beside vs Besides', 'Beside (next to) vs Besides (in addition to)', 'Mixing spatial proximity with additive meaning'],
      ],
    },
    workedExamples: [
      {
        prompt:
          'Error Spotting (WBCS Standard): "Hardly had the Commissioner entered into the auditorium than the delegates stood up in protest." Identify both errors.',
        solution:
          'Error 1: "Enter" (physical movement into a space) is transitive and takes NO "into" (write "entered the auditorium"—note: "enter into" is only used for agreements/alliances/discussions). Error 2: "Hardly" must pair with "when" (not "than").',
      },
      {
        prompt:
          'Transformation: "No other freedom fighter in Bengal was as fearless as Khudiram." Convert to Superlative without changing meaning.',
        solution:
          '"Khudiram was the most fearless freedom fighter in Bengal." (Note: "No other..." maps to "the + superlative", whereas "Very few..." maps to "one of the + superlative + plural noun").',
      },
    ],
    comparisonPairs: [
      {
        term: 'Made OF vs Made FROM',
        distinction:
          'Made OF when original material remains physically intact/recognizable ("Chair made of wood"); Made FROM when chemical/physical transformation occurs ("Wine made from grapes", "Paper made from bamboo").',
      },
      {
        term: 'Who vs Whom',
        distinction:
          'Who = Subjective case (he/they); Whom = Objective case (him/them). Ignore parenthetical clauses like "I think / he believes" when testing.',
      },
    ],
    commonTraps: [
      'Putting "into" after "enter" for physical rooms, or "about" after "discuss", or "on" after "emphasize" (in verb form).',
      'Using "each other" for >2 items—use "each other" for 2, "one another" for >2.',
      'Using "myself" as a subject ("Myself Rahul" or "Riya and myself went")—reflexive pronouns cannot stand as bare subjects.',
    ],
    mainsPerspective:
      'In WBCS Mains Paper II (English Composition: Précis, Report, Editorial Letter, Translation), mastering inversion, participle clauses, and concise nominalization elevates prose precision and prevents deductive grammar penalties.',
    mustRememberFacts: [
      'Unanimous/Collective nouns ("jury, committee, council") take SINGULAR verb when acting as one body, PLURAL when divided in opinion.',
      '"Furniture, luggage, baggage, information, advice, scenery, poetry, machinery" are uncountable—never add "-s" or "a/an".',
      '"Unless" and "Until" already carry negative force—never place "not" in the same clause.',
      '"Supposing" and "If" are redundant together—never write "Supposing if".',
      'Question tag of "Let us..." is ALWAYS "shall we?"; Imperative positive tag is "will you? / won’t you?".',
    ],
    examTips:
      'In error-spotting questions, run a 4-point scan first: (1) Subject-Verb agreement across "as well as / neither-nor", (2) Conditional tense pairing, (3) Correlative pairs (No sooner...than / Hardly...when / Lest...should), and (4) Transitive verbs without stray prepositions.',
    source: 'curated',
  },
};

