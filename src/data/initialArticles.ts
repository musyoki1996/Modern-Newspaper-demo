import { Article, Author, MultimediaItem, AdCampaign, LiveBlogEntry } from '../types';

export const INITIAL_AUTHORS: Author[] = [
  {
    id: 'auth-1',
    name: 'Wanjiru Kamau',
    role: 'Managing Editor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    bio: 'Award-winning investigative reporter and managing editor with 14 years covering governance, policy reform, and pan-African diplomacy across East Africa.',
    twitter: '@wanjirukamau_ke',
    articlesCount: 428,
  },
  {
    id: 'auth-2',
    name: 'David Ochieng',
    role: 'Journalist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    bio: 'Senior political analyst and parliamentary correspondent based in Nairobi, covering constitutional affairs, devolved governance, and elections.',
    twitter: '@ochieng_politics',
    articlesCount: 312,
  },
  {
    id: 'auth-3',
    name: 'Faith Mutua',
    role: 'Editor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    bio: 'Technology and venture editor tracking the Silicon Savannah, East African fintech unicorns, clean energy, and mobile digital public infrastructure.',
    twitter: '@faithmutua_tech',
    articlesCount: 265,
  },
  {
    id: 'auth-4',
    name: 'Brian Kiprop',
    role: 'Reporter',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    bio: 'Sports and culture journalist stationed in Eldoret and Nairobi, tracking athletics, marathon legends, Kenya Harlequin rugby, and Gor Mahia.',
    twitter: '@kiprop_sports',
    articlesCount: 194,
  },
  {
    id: 'auth-5',
    name: 'Amina Hassan',
    role: 'Editor',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=256&q=80',
    bio: 'Specialist in contemporary East African music, Nollywood-Riverwood crossovers, fashion weeks, culinary arts, and wellness movements.',
    twitter: '@aminahassan_ke',
    articlesCount: 180,
  }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-lead-1',
    slug: 'pan-african-economic-summit-nairobi-historic-cross-border-digital-currency-pact',
    title: 'Nairobi Summit Seals Historic $14B Pan-African Cross-Border Trade & Digital Settlement Pact',
    subtitle: 'Delegates from 28 African nations convene at KICC to launch frictionless interoperable settlement, cutting intra-continental transaction tariffs by 45%',
    summary: 'In an unprecedented economic breakthrough in Nairobi, African heads of state and central bank governors formalized a unified digital payment corridor designed to settle trade in local currencies, accelerating AfCFTA milestones.',
    content: `
      <p class="drop-cap">A historic Pan-African trade pact signed late Sunday afternoon in Nairobi will establish an interoperable cross-border digital payment corridor, allowing businesses across East, West, and Southern Africa to settle invoices in their local sovereign currencies without intermediary dollar clearing.</p>
      
      <p>The summit, hosted at the Kenyatta International Convention Centre (KICC), brought together over 1,200 senior policymakers, finance ministers, central bankers, and fintech innovators representing 28 sovereign nations. The $14 billion multi-year capitalization facility is backed by multilateral African development banks, regional economic blocs, and private institutional consortia.</p>
      
      <h2>Unlocking Frictionless Intra-African Commerce</h2>
      <p>Intra-African trade has historically suffered under prohibitive currency conversion frictional costs, where a trader in Nairobi buying agricultural inputs from Accra or Kigali often endured double conversion through US dollars, incurring 6% to 11% in exchange spreads and taking three to five business days to clear.</p>
      
      <blockquote>"Today we tear down the invisible monetary borders that have kept our economies isolated for sixty years. A manufacturer in Thika can now transact with an enterprise in Lusaka in real-time within five seconds," declared the summit communique.</blockquote>
      
      <h2>Impact on Kenyan Exporters and SMEs</h2>
      <p>For Kenyan tea, coffee, cut-flower, and light manufacturing exporters, the immediate implications are monumental. The Kenya Association of Manufacturers (KAM) projected that immediate transaction savings could boost Kenyan export volumes across COMESA and AfCFTA corridors by an estimated 24% over the coming 18 months.</p>
      
      <p>The framework also integrates sovereign digital identity protocols and instant mobile money settlement rails, including M-Pesa, Airtel Money, and regional RTGS platforms. Pilot testing between Kenya, Ghana, Rwanda, and Egypt is scheduled to commence on December 1st, 2026.</p>
    `,
    category: 'Business',
    tags: ['AfCFTA', 'Nairobi Summit', 'Digital Currency', 'Kenya Economy', 'Trade Pact', 'Fintech'],
    featuredImage: '/src/assets/images/hero_lead_summit_1793634830671.jpg',
    imageCaption: 'African heads of state, trade delegates, and central bank governors during the plenary signing session at the Nairobi Trade Summit.',
    imageCredit: 'The Kenya Chronicle / Press Photo Pool',
    author: INITIAL_AUTHORS[0],
    publishedAt: '2026-11-02T06:30:00Z',
    updatedAt: '2026-11-02T07:15:00Z',
    readTimeMinutes: 5,
    status: 'published',
    isBreaking: true,
    isLead: true,
    isTrending: true,
    views: 48920,
    shares: 3410,
    reactions: {
      love: 1240,
      applaud: 3120,
      insightful: 4580,
      surprised: 180,
    },
    seoTitle: 'Nairobi Summit: $14B Pan-African Cross-Border Currency Deal Sealed',
    seoDescription: '28 nations in Nairobi agree to direct local currency settlement under AfCFTA, slashing intra-Africa trade transaction fees by 45%.'
  },
  {
    id: 'art-politics-1',
    slug: 'parliament-passes-landmark-devolution-revenue-formula-counties-budget',
    title: 'Parliament Enacts Decisive County Revenue Allocation Formula Following Intense Bipartisan Consensus',
    subtitle: 'National Assembly and Senate iron out equitable share discrepancies, securing Ksh 420 Billion for all 47 counties ahead of budget deadline',
    summary: 'After marathon floor sessions, legislators concluded months of budgetary standoff, enacting an equitable formula weighted toward health infrastructure, rural access roads, and early childhood education grants.',
    content: `
      <p class="drop-cap">Following three days of marathon bipartisan negotiations that stretched past midnight, Kenya's National Assembly approved the compromise County Allocation of Revenue Bill, releasing Ksh 420.5 billion in unconditional exchequer transfers to the 47 county governments.</p>
      
      <p>The breakthrough came after the Parliamentary Mediation Committee resolved longstanding friction over the demographic-versus-landmass weighting index. The final formula assigns 45% weighting to baseline population, 26% to equal share, 18% to county land area, and dedicated incentives for local revenue collection efficiency.</p>
      
      <h2>Healthcare and Rural Feeder Roads Prioritized</h2>
      <p>Council of Governors chairperson applauded the legislative consensus, noting that county referral hospitals that faced medical supply freezes and delayed healthcare worker disbursements will receive immediate funding tranches by mid-week.</p>
      
      <blockquote>"Governance belongs to the grassroots. This bill guarantees that life-saving healthcare, clean piped water supplies, and rural farm-to-market corridors receive guaranteed funding without political conditionality."</blockquote>
    `,
    category: 'Politics',
    tags: ['Parliament', 'Devolution', 'County Revenue', 'National Assembly', 'Kenya Politics', 'Governors'],
    featuredImage: '/src/assets/images/politics_parliament_1793634831203.jpg',
    imageCaption: 'The National Assembly in session as members debate the final amendments to the County Revenue Allocation Formula in Nairobi.',
    imageCredit: 'The Kenya Chronicle / Parliament Hansard Unit',
    author: INITIAL_AUTHORS[1],
    publishedAt: '2026-11-02T05:45:00Z',
    updatedAt: '2026-11-02T06:50:00Z',
    readTimeMinutes: 4,
    status: 'published',
    isBreaking: false,
    isLead: false,
    isTrending: true,
    views: 34150,
    shares: 1890,
    reactions: {
      love: 890,
      applaud: 2150,
      insightful: 3200,
      surprised: 94,
    },
    seoTitle: 'Parliament Enacts Landmark County Revenue Formula: Ksh 420B for Counties',
    seoDescription: 'Kenya Parliament passes compromise devolution revenue sharing bill, averting county healthcare and infrastructure budget shutdown.'
  },
  {
    id: 'art-tech-1',
    slug: 'silicon-savannah-nairobi-ai-hardware-lab-launches-low-power-swahili-speech-chips',
    title: 'Silicon Savannah Breakthrough: Nairobi Hardware Lab Unveils Low-Power Edge AI Chips for African Languages',
    subtitle: 'Nairobi-based semiconductor startup taps local foundry partnerships to deploy edge speech models for Swahili, Sheng, and Amharic with zero cloud latency',
    summary: 'A team of young engineers from the University of Nairobi and Strathmore University incubated chip architecture capable of processing offline conversational Swahili for microfinance and agriculture handheld terminals.',
    content: `
      <p class="drop-cap">Inside an airy glass-walled research facility overlooking Westlands, Nairobi's Silicon Savannah added a crowning engineering milestone today with the demonstration of Africa's first custom ultra-low-power edge AI neural processor specifically optimized for indigenous African phonetics.</p>
      
      <p>The silicon chip, named 'Simba-1', operates on less than 0.8 watts of power—making it fully operable on solar-recharged handheld terminals used by rural cooperatives, agro-dealers, and community health volunteers.</p>
      
      <h2>Breaking Free from Cloud Latency and Bandwidth Constraints</h2>
      <p>While global conversational models have traditionally required massive server cluster roundtrips, Simba-1 executes natural language audio processing directly on-device. The model understands standard Swahili, Nairobi Sheng dialect variations, Luganda, and Amharic with 96.4% phonetic transcription accuracy.</p>
      
      <blockquote>"Digital inclusion cannot hinge on continuous 5G towers. When a smallholder farmer in Kitale wants agricultural insurance guidance in vernacular speech, the silicon in their hands must answer immediately," said lead architect Dr. Faith Mutua.</blockquote>
      
      <p>The startup announced an oversubscribed $18.5 million Series A funding round led by pan-African venture funds and international hardware investors.</p>
    `,
    category: 'Technology',
    tags: ['Silicon Savannah', 'Artificial Intelligence', 'Nairobi Startups', 'Semiconductors', 'Swahili Tech', 'Innovation'],
    featuredImage: '/src/assets/images/tech_silicon_savannah_1793634832657.jpg',
    imageCaption: 'The engineering and architecture team reviewing silicon board diagnostics at their Westlands Nairobi tech laboratory.',
    imageCredit: 'The Kenya Chronicle / Tech Desk',
    author: INITIAL_AUTHORS[2],
    publishedAt: '2026-11-02T04:15:00Z',
    updatedAt: '2026-11-02T05:00:00Z',
    readTimeMinutes: 4,
    status: 'published',
    isBreaking: false,
    isLead: false,
    isTrending: true,
    views: 41200,
    shares: 4210,
    reactions: {
      love: 2890,
      applaud: 4400,
      insightful: 3910,
      surprised: 310,
    },
    seoTitle: 'Nairobi Silicon Savannah Unveils African Language Edge AI Chip',
    seoDescription: 'Nairobi startup engineers breakthrough edge AI hardware chip processing offline Swahili and local dialects for agricultural and fintech devices.'
  },
  {
    id: 'art-sports-1',
    slug: 'iten-training-camps-kenya-marathoners-gear-up-valencia-tokyo-world-records',
    title: 'Inside the High-Altitude Sanctum of Iten: How Kenya’s Next Generation of Marathon Prodigies Are Rewriting Human Limits',
    subtitle: 'From the mist-shrouded escarpment trails at 2,400 meters, training squads blend biometric analytics with timeless endurance discipline',
    summary: 'At dawn along the red clay ridges of Elgeyo Marakwet, world-class Kenyan runners log 200 kilometers weekly in preparation for the winter marathon major titles.',
    content: `
      <p class="drop-cap">The morning air at 2,400 meters above sea level carries a bracing chill that bites through windbreakers. By 5:45 AM, as the first salmon-pink hues illuminate the crest of the Kerio Valley, forty runners gather in hushed focus at the foot of the Kamariny dirt track in Iten.</p>
      
      <p>There are no loud speakers or theatrical rituals. Only the synchronized cadence of rubber against damp red loam, breath vapor crystallizing in the morning breeze, and the rhythmic beeping of wrist chronometers.</p>
      
      <h2>Science Meets Tradition in the Home of Champions</h2>
      <p>In recent seasons, Iten's legendary coaching sanctums have embraced sports science with extraordinary precision. Heart-rate variability sensors, metabolic threshold mapping, and altitude-adjusted nutrition regimens now complement the relentless hill repetitions that made Kenyan athletics dominant across Olympic and World Marathon Major circuits.</p>
      
      <blockquote>"God gave us these mountains and this air, but gold is forged through unsparing patience. In Iten, nobody runs for vanity. We run for our families, our villages, and the flag," says coach Brother Colm O'Connell.</blockquote>
      
      <p>With the Valencia and Tokyo marathons approaching, three 21-year-old debutants from Kaptagat are currently pacing at sub-2:03 split benchmarks in simulated tempo runs.</p>
    `,
    category: 'Sports',
    tags: ['Athletics', 'Iten Kenya', 'Marathon', 'Rift Valley', 'Running', 'World Records'],
    featuredImage: '/src/assets/images/kenya_athletics_1793634832739.jpg',
    imageCaption: 'Kenyan elite distance squad powering through morning tempo training along the Iten escarpment trail overlooking the Rift Valley.',
    imageCredit: 'The Kenya Chronicle / Sports Bureau',
    author: INITIAL_AUTHORS[3],
    publishedAt: '2026-11-01T20:10:00Z',
    updatedAt: '2026-11-02T02:30:00Z',
    readTimeMinutes: 6,
    status: 'published',
    isBreaking: false,
    isLead: false,
    isTrending: false,
    views: 29800,
    shares: 2150,
    reactions: {
      love: 3410,
      applaud: 2980,
      insightful: 1420,
      surprised: 85,
    },
    seoTitle: 'Inside Iten Kenya: Elite Marathon Camps Prepare for World Records',
    seoDescription: 'A deep-dive photojournalism report from the high-altitude trails of Iten, Kenya where world-record marathon champions train.'
  },
  {
    id: 'art-lifestyle-1',
    slug: 'contemporary-nairobi-arts-renaissance-galleries-diaspora-collectors',
    title: 'The Contemporary Nairobi Arts Renaissance: How Modern Kenyan Canvas Masters Are Captivating Global Galleries',
    subtitle: 'From Industrial Area warehouse studios to international auction blocks in London and Paris, Kenya’s visual creators redefine African modernism',
    summary: 'A new wave of Nairobi visual artists, sculptors, and multimedia storytellers is commanding record international acclaim while anchoring vibrant cultural spaces in the capital.',
    content: `
      <p class="drop-cap">On any given Thursday night along Nairobi's vibrant creative corridor, former industrial warehouses, heritage bungalows, and minimalist pop-up galleries hum with an electric cultural resonance that rivals Berlin or Brooklyn.</p>
      
      <p>Young collectors, diaspora patrons, and university students mingle before expansive mixed-media canvasses that explore urban identity, Matatu visual culture, climate transitions, and ancestral mythologies reinterpreted through digital lenses.</p>
      
      <h2>From Grassroots Studios to International Salerooms</h2>
      <p>Art spaces like Circle Art Gallery, Kuona Collective, and Nairobi Contemporary Art Institute (NCAI) have anchored this renaissance. Works that five years ago traded locally for modest sums are now featured in permanent collections at the Tate Modern, Centre Pompidou, and the Smithsonian.</p>
      
      <blockquote>"Nairobi is not copying any Western playbook. We are telling our own unfiltered stories—our colors, our textures, our contradictions—with supreme creative confidence," says acclaimed visual artist Wambui Collymore.</blockquote>
    `,
    category: 'Lifestyle',
    tags: ['Nairobi Art', 'Contemporary African Art', 'Culture', 'Galleries', 'Lifestyle', 'Creatives'],
    featuredImage: '/src/assets/images/culture_lifestyle_1793634832802.jpg',
    imageCaption: 'Guests and collectors gathering at a contemporary gallery vernissage in Nairobi celebrating East African modernists.',
    imageCredit: 'The Kenya Chronicle / Culture Desk',
    author: INITIAL_AUTHORS[4],
    publishedAt: '2026-11-01T16:20:00Z',
    updatedAt: '2026-11-01T18:00:00Z',
    readTimeMinutes: 5,
    status: 'published',
    isBreaking: false,
    isLead: false,
    isTrending: false,
    views: 21400,
    shares: 1420,
    reactions: {
      love: 2100,
      applaud: 1450,
      insightful: 980,
      surprised: 40,
    },
    seoTitle: 'Nairobi Contemporary Arts Renaissance: Kenya’s Creative Explosion',
    seoDescription: 'How Nairobi’s painters, sculptors, and multimedia artists are dominating international exhibitions and redefining modern African aesthetic.'
  },
  {
    id: 'art-investigations-1',
    slug: 'investigation-green-energy-expansion-olkaria-geothermal-grid-resilience',
    title: 'Investigative Report: Inside Kenya’s Olkaria Expansion That Pushed Green Grid Generation to 93%',
    subtitle: 'A technical and investigative examination into East Africa’s volcanic energy heartland and the strategic battle for industrial manufacturing tariffs',
    summary: 'Kenya now generates over 90% of its electrical power from renewable geothermal, hydro, and wind resources. Our investigative team spent three weeks underground at the Olkaria steam fields.',
    content: `
      <p class="drop-cap">Deep beneath the Great Rift Valley floor, steam hiss reverberates through massive insulated pipes snaking across Hell's Gate National Park. Here, at Olkaria, superheated water reaching 300 degrees Celsius is tapped from three kilometers subterranean depth to spin mammoth turbine generators.</p>
      
      <p>Kenya stands today in the top seven global geothermal producers, but an investigative review of the newest Unit 6 expansion reveals both extraordinary engineering triumphs and lingering questions over industrial transmission tariffs.</p>
      
      <h2>The Tariff Paradox: Green Abundance vs Factory Bills</h2>
      <p>While the national grid now achieves an unprecedented 93% clean energy mix, manufacturers in Athi River and Mombasa still face power costs roughly 35% higher than their competitors in Egypt or South Africa. Our investigation examines the wheeling charges, long-term power purchase agreements (PPAs), and ongoing parliamentary tariff renegotiations.</p>
    `,
    category: 'Investigations',
    tags: ['Investigations', 'Geothermal', 'Olkaria', 'Clean Energy', 'Kenya Power', 'Rift Valley'],
    featuredImage: '/src/assets/images/hero_lead_summit_1793634830671.jpg',
    imageCaption: 'Geothermal steam wells and turbine manifold installations at the Olkaria green energy complex in Naivasha.',
    imageCredit: 'The Kenya Chronicle / Investigations Bureau',
    author: INITIAL_AUTHORS[0],
    publishedAt: '2026-10-31T14:00:00Z',
    updatedAt: '2026-11-01T09:10:00Z',
    readTimeMinutes: 7,
    status: 'published',
    isBreaking: false,
    isLead: false,
    isTrending: true,
    views: 52100,
    shares: 4180,
    reactions: {
      love: 1540,
      applaud: 3200,
      insightful: 6200,
      surprised: 510,
    },
    seoTitle: 'Inside Kenya’s Olkaria Geothermal Grid: 93% Clean Energy Investigation',
    seoDescription: 'An investigative deep-dive into Kenya’s Olkaria geothermal power expansion, industrial manufacturing tariffs, and grid resilience.'
  },
  {
    id: 'art-health-1',
    slug: 'kenya-universal-health-coverage-digital-taifa-care-rollout-reaches-millions',
    title: 'Social Health Authority Enrolls 12 Million Kenyans in Unified Taifa Care Digital Healthcare Platform',
    subtitle: 'Primary healthcare networks across 47 counties report streamlined outpatient access and electronic medical record integration',
    summary: 'The national rollout of digitized social health coverage marks a decisive transition from out-of-pocket medical emergencies to subsidized primary and chronic care for families.',
    content: `
      <p class="drop-cap">Kenya's transition to comprehensive universal health coverage achieved a milestone this month as the Social Health Authority (SHA) confirmed that verified biometric registrations surpassed 12 million citizens nationwide.</p>
      
      <p>Under the revitalized Taifa Care initiative, primary care clinics, Level 4 sub-county facilities, and national referral institutions are connected via a centralized digital claims portal, slashing pre-authorization delays for oncology, maternity, and emergency interventions.</p>
    `,
    category: 'Health',
    tags: ['Health', 'SHA', 'Taifa Care', 'Healthcare', 'Kenya News', 'Public Health'],
    featuredImage: '/src/assets/images/politics_parliament_1793634831203.jpg',
    imageCaption: 'Community healthcare workers and clinic officers demonstrating the digitized patient verification portal in Kiambu.',
    imageCredit: 'The Kenya Chronicle / Health Desk',
    author: INITIAL_AUTHORS[1],
    publishedAt: '2026-10-30T11:20:00Z',
    updatedAt: '2026-10-31T08:00:00Z',
    readTimeMinutes: 4,
    status: 'published',
    isBreaking: false,
    isLead: false,
    isTrending: false,
    views: 18200,
    shares: 1120,
    reactions: {
      love: 1800,
      applaud: 2400,
      insightful: 1300,
      surprised: 45,
    },
    seoTitle: 'Social Health Authority Enrolls 12M Kenyans in Taifa Care',
    seoDescription: 'Kenya reports rapid scaling of digital primary health coverage with 12 million citizens enrolled in the new Social Health Authority system.'
  },
  {
    id: 'art-opinion-1',
    slug: 'opinion-youth-dividend-or-unemployment-crisis-the-urgent-industrial-compact',
    title: 'Opinion: Africa’s Youth Dividend Will Either Industrialize Our Continent or Overwhelm Our Cities',
    subtitle: 'Why policymakers must pivot urgently from consumer-debt apps to vocational fabrication, agro-processing, and clean energy manufacturing',
    summary: 'East Africa has the youngest, most digitally connected demographic on Earth. But digital literacy without industrial jobs risks a generational disconnect.',
    content: `
      <p class="drop-cap">Every year, over one million bright, ambitious young Kenyans graduate from universities and technical colleges into a labor market that creates barely two hundred thousand formal sector employment opportunities.</p>
      
      <p>While venture capital celebrates quick-delivery applications and digital sports wagering platforms, true structural economic emancipation requires heavy manufacturing, localized fertilizer synthesis, textile mills, and engineering apprenticeships.</p>
    `,
    category: 'Opinion',
    tags: ['Opinion', 'Youth Dividend', 'Jobs', 'Industrialization', 'Economic Policy'],
    featuredImage: '/src/assets/images/tech_silicon_savannah_1793634832657.jpg',
    imageCaption: 'Young Kenyan tech apprentices working on automated manufacturing robotics in Athi River.',
    imageCredit: 'The Kenya Chronicle / Editorial Board',
    author: INITIAL_AUTHORS[0],
    publishedAt: '2026-10-29T09:00:00Z',
    updatedAt: '2026-10-29T10:00:00Z',
    readTimeMinutes: 5,
    status: 'published',
    isBreaking: false,
    isLead: false,
    isTrending: false,
    views: 24500,
    shares: 3100,
    reactions: {
      love: 1100,
      applaud: 1980,
      insightful: 4200,
      surprised: 110,
    },
    seoTitle: 'Opinion: Africa’s Youth Dividend and the Urgent Industrial Compact',
    seoDescription: 'An editorial analysis on why East Africa must shift from consumer digital apps to real industrial manufacturing and job creation.'
  }
];

export const INITIAL_LIVE_BLOG: LiveBlogEntry[] = [
  {
    id: 'live-1',
    timestamp: '10:42 AM EAT',
    title: 'Central Bank of Kenya Announces Monetary Policy Committee Resolution',
    content: 'CBK Governor Dr. Kamau Thugge announces benchmark lending rate held steady at 12.00%, citing stabilizing inflation within the 4.5% target corridor and strong foreign exchange reserves buoyed by agricultural remittances.',
    badge: 'OFFICIAL',
    author: 'Wanjiru Kamau'
  },
  {
    id: 'live-2',
    timestamp: '10:15 AM EAT',
    title: 'Nairobi Commuter Rail Expands Riruta-Ngong Dual-Track Corridor',
    content: 'Kenya Railways officially commissions the electric multiple unit (EMU) signaling tests along the Western commuter line, projected to transport 140,000 daily commuters between Ngong, Karen, and Nairobi Central Station.',
    badge: 'DEVELOPING',
    author: 'David Ochieng'
  },
  {
    id: 'live-3',
    timestamp: '09:30 AM EAT',
    title: 'East African Community Common Market Council Issues Cross-Border Roaming Mandate',
    content: 'All telecommunications providers in Kenya, Uganda, Tanzania, and Rwanda must eliminate roaming surcharge tariffs for voice and data calls by January 1, 2027.',
    badge: 'KEY TAKEAWAY',
    author: 'Faith Mutua'
  }
];

export const INITIAL_MULTIMEDIA: MultimediaItem[] = [
  {
    id: 'media-1',
    type: 'video',
    title: 'The Great Rift Valley Geothermal Frontier: How Kenya Powers 93% Green Electricity',
    category: 'Investigations',
    duration: '14:20',
    mediaUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: '/src/assets/images/hero_lead_summit_1793634830671.jpg',
    publishedAt: '2026-11-01',
    description: 'An exclusive documentary inside the subterranean steam turbines of Olkaria and Hell’s Gate power stations.',
    author: 'Wanjiru Kamau',
    views: 89400
  },
  {
    id: 'media-2',
    type: 'podcast',
    title: 'The Nairobi Exchange Podcast #48: Silicon Savannah Unicorns & Pan-African Capital',
    category: 'Technology',
    duration: '42:15',
    mediaUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=news-intro-111197.mp3',
    thumbnailUrl: '/src/assets/images/tech_silicon_savannah_1793634832657.jpg',
    publishedAt: '2026-10-31',
    description: 'Host Faith Mutua sits with lead venture partners to examine why Nairobi captures 35% of all startup capital in Africa.',
    author: 'Faith Mutua',
    views: 34200
  },
  {
    id: 'media-3',
    type: 'video',
    title: 'Dawn in Iten: 24 Hours Inside the Elite Marathon Sanctuary of Champions',
    category: 'Sports',
    duration: '18:45',
    mediaUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: '/src/assets/images/kenya_athletics_1793634832739.jpg',
    publishedAt: '2026-10-30',
    description: 'Cinematic photojournalism following world record training squads on the high-altitude trails of Elgeyo Marakwet.',
    author: 'Brian Kiprop',
    views: 124000
  }
];

export const INITIAL_ADS: AdCampaign[] = [
  {
    id: 'ad-1',
    title: 'Safaricom 5G Business Solutions - High-Speed Enterprise Fiber',
    advertiser: 'Safaricom Enterprise',
    slot: 'header_leaderboard',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    targetUrl: 'https://www.safaricom.co.ke',
    impressions: 142050,
    clicks: 4890,
    startDate: '2026-11-01',
    endDate: '2026-11-30',
    budgetUsd: 4500
  },
  {
    id: 'ad-2',
    title: 'Equity Bank EazzyBiz Global Trade Financing & FX Remittance',
    advertiser: 'Equity Group Holdings',
    slot: 'sidebar_sticky',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
    targetUrl: 'https://equitygroupholdings.com',
    impressions: 89400,
    clicks: 2940,
    startDate: '2026-11-01',
    endDate: '2026-11-25',
    budgetUsd: 3200
  },
  {
    id: 'ad-3',
    title: 'Kenya Airways Non-Stop Flights Nairobi to New York JFK & London Heathrow',
    advertiser: 'Kenya Airways Pride of Africa',
    slot: 'in_article_mid',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1000&q=80',
    targetUrl: 'https://www.kenya-airways.com',
    impressions: 112000,
    clicks: 3420,
    startDate: '2026-11-01',
    endDate: '2026-12-15',
    budgetUsd: 5000
  }
];
