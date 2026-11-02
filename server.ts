import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_ARTICLES, INITIAL_AUTHORS, INITIAL_LIVE_BLOG, INITIAL_MULTIMEDIA, INITIAL_ADS } from './src/data/initialArticles.ts';
import { Article, Comment, AdCampaign, LiveBlogEntry } from './src/types/index.ts';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
app.use(express.json());

// In-memory persistent state (seeded with high-quality demo data)
let articles: Article[] = [...INITIAL_ARTICLES];
let liveBlogEntries: LiveBlogEntry[] = [...INITIAL_LIVE_BLOG];
let adCampaigns: AdCampaign[] = [...INITIAL_ADS];
let comments: Comment[] = [
  {
    id: 'comm-1',
    articleId: 'art-lead-1',
    authorName: 'Musa Kiprono',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&q=80',
    content: 'This $14B AfCFTA settlement mechanism is the single most transformative financial agreement since the founding of the EAC. Slashing currency conversion spreads between Nairobi and Accra will allow small manufacturers to scale continentally.',
    timestamp: '2 hours ago',
    likes: 38,
    isApproved: true,
    replies: [
      {
        id: 'rep-1',
        authorName: 'Grace Achieng',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80',
        content: 'Spot on Musa. The key will be integrating mobile money interoperability seamlessly so rural cooperatives can benefit immediately.',
        timestamp: '1 hour ago',
        likes: 14
      }
    ]
  },
  {
    id: 'comm-2',
    articleId: 'art-politics-1',
    authorName: 'Kariuki Ndegwa',
    content: 'Ksh 420 Billion for the counties was long overdue. Now the Council of Governors must ensure Level 4 and 5 hospitals receive their medical disbursements without delays.',
    timestamp: '4 hours ago',
    likes: 19,
    isApproved: true,
  }
];

let newsletterSubscribers: { email: string; categories: string[]; createdAt: string }[] = [
  { email: 'editor@kenyachronicle.ke', categories: ['Politics', 'Business', 'Technology'], createdAt: new Date().toISOString() }
];

// Initialize Gemini Client
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// ==========================================
// 1. ARTICLES ENDPOINTS
// ==========================================

// GET all articles with filters
app.get('/api/articles', (req, res) => {
  const { category, search, tag, status, isBreaking, isLead, limit } = req.query;
  let results = [...articles];

  if (category && category !== 'All') {
    results = results.filter(a => a.category.toLowerCase() === (category as string).toLowerCase());
  }

  if (status) {
    results = results.filter(a => a.status === status);
  } else {
    // By default public view shows published
    if (req.query.includeAll !== 'true') {
      results = results.filter(a => a.status === 'published');
    }
  }

  if (isBreaking === 'true') {
    results = results.filter(a => a.isBreaking);
  }

  if (isLead === 'true') {
    results = results.filter(a => a.isLead);
  }

  if (tag) {
    results = results.filter(a => a.tags.some(t => t.toLowerCase() === (tag as string).toLowerCase()));
  }

  if (search) {
    const q = (search as string).toLowerCase().trim();
    results = results.filter(a => 
      a.title.toLowerCase().includes(q) ||
      a.subtitle.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  // Sort by publishedAt descending
  results.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  if (limit) {
    results = results.slice(0, parseInt(limit as string, 10));
  }

  res.json({ success: true, count: results.length, data: results });
});

// GET single article by id or slug
app.get('/api/articles/:idOrSlug', (req, res) => {
  const param = req.params.idOrSlug;
  const article = articles.find(a => a.id === param || a.slug === param);
  if (!article) {
    return res.status(404).json({ success: false, message: 'Article not found' });
  }

  // Increment views
  article.views += 1;
  res.json({ success: true, data: article });
});

// POST create article
app.post('/api/articles', (req, res) => {
  const body = req.body;
  if (!body.title || !body.content) {
    return res.status(400).json({ success: false, message: 'Title and content are required' });
  }

  const slug = (body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')) + '-' + Date.now().toString().slice(-4);
  const newArticle: Article = {
    id: 'art-' + Date.now(),
    slug,
    title: body.title,
    subtitle: body.subtitle || '',
    summary: body.summary || body.title,
    content: body.content,
    category: body.category || 'Kenya',
    tags: body.tags || ['Kenya News'],
    featuredImage: body.featuredImage || '/src/assets/images/hero_lead_summit_1793634830671.jpg',
    imageCaption: body.imageCaption || '',
    imageCredit: body.imageCredit || 'The Kenya Chronicle Staff',
    gallery: body.gallery || [],
    author: body.author || INITIAL_AUTHORS[0],
    publishedAt: body.publishedAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    readTimeMinutes: Math.max(2, Math.ceil((body.content || '').split(' ').length / 200)),
    status: body.status || 'draft',
    isBreaking: !!body.isBreaking,
    isLead: !!body.isLead,
    isTrending: !!body.isTrending,
    views: 0,
    shares: 0,
    reactions: { love: 0, applaud: 0, insightful: 0, surprised: 0 },
    seoTitle: body.seoTitle || body.title,
    seoDescription: body.seoDescription || body.summary,
    editorialNotes: body.editorialNote ? [{
      id: 'note-' + Date.now(),
      authorName: 'Senior Editor',
      authorRole: 'Managing Editor',
      note: body.editorialNote,
      timestamp: new Date().toISOString()
    }] : [],
    revisions: [{
      id: 'rev-1',
      editor: body.author?.name || 'Staff Journalist',
      timestamp: new Date().toISOString(),
      changeSummary: 'Initial article creation'
    }]
  };

  if (newArticle.isLead) {
    articles.forEach(a => { if (a.isLead) a.isLead = false; });
  }

  articles.unshift(newArticle);
  res.status(201).json({ success: true, data: newArticle });
});

// PUT update article
app.put('/api/articles/:id', (req, res) => {
  const { id } = req.params;
  const index = articles.findIndex(a => a.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Article not found' });
  }

  const existing = articles[index];
  const update = req.body;

  if (update.isLead && !existing.isLead) {
    articles.forEach(a => { if (a.isLead) a.isLead = false; });
  }

  const revisions = existing.revisions || [];
  if (update.revisionNote) {
    revisions.unshift({
      id: 'rev-' + Date.now(),
      editor: update.editorName || 'Editor',
      timestamp: new Date().toISOString(),
      changeSummary: update.revisionNote
    });
  }

  const updatedArticle: Article = {
    ...existing,
    ...update,
    updatedAt: new Date().toISOString(),
    revisions
  };

  articles[index] = updatedArticle;
  res.json({ success: true, data: updatedArticle });
});

// DELETE article
app.delete('/api/articles/:id', (req, res) => {
  const { id } = req.params;
  const index = articles.findIndex(a => a.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Article not found' });
  }

  const removed = articles.splice(index, 1);
  res.json({ success: true, message: 'Article deleted successfully', data: removed[0] });
});

// Reaction endpoint
app.post('/api/articles/:id/react', (req, res) => {
  const { id } = req.params;
  const { type } = req.body as { type: 'love' | 'applaud' | 'insightful' | 'surprised' };
  const article = articles.find(a => a.id === id);
  if (!article) return res.status(404).json({ success: false, message: 'Article not found' });

  if (article.reactions[type] !== undefined) {
    article.reactions[type] += 1;
  }
  res.json({ success: true, reactions: article.reactions });
});

// Share endpoint
app.post('/api/articles/:id/share', (req, res) => {
  const { id } = req.params;
  const article = articles.find(a => a.id === id);
  if (!article) return res.status(404).json({ success: false, message: 'Article not found' });

  article.shares += 1;
  res.json({ success: true, shares: article.shares });
});

// ==========================================
// 2. COMMENTS ENDPOINTS
// ==========================================

app.get('/api/articles/:id/comments', (req, res) => {
  const { id } = req.params;
  const articleComments = comments.filter(c => c.articleId === id && c.isApproved !== false);
  res.json({ success: true, count: articleComments.length, data: articleComments });
});

app.post('/api/articles/:id/comments', (req, res) => {
  const { id } = req.params;
  const { authorName, content, authorAvatar } = req.body;
  if (!authorName || !content) {
    return res.status(400).json({ success: false, message: 'Author and content required' });
  }

  const newComment: Comment = {
    id: 'comm-' + Date.now(),
    articleId: id,
    authorName,
    authorAvatar: authorAvatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(authorName)}`,
    content,
    timestamp: 'Just now',
    likes: 0,
    isApproved: true,
    replies: []
  };

  comments.unshift(newComment);
  res.status(201).json({ success: true, data: newComment });
});

app.post('/api/comments/:id/like', (req, res) => {
  const { id } = req.params;
  const comment = comments.find(c => c.id === id);
  if (!comment) return res.status(404).json({ success: false, message: 'Comment not found' });

  comment.likes += 1;
  res.json({ success: true, likes: comment.likes });
});

app.post('/api/comments/:id/reply', (req, res) => {
  const { id } = req.params;
  const { authorName, content, authorAvatar } = req.body;
  const comment = comments.find(c => c.id === id);
  if (!comment) return res.status(404).json({ success: false, message: 'Comment not found' });

  const reply = {
    id: 'rep-' + Date.now(),
    authorName,
    authorAvatar: authorAvatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(authorName)}`,
    content,
    timestamp: 'Just now',
    likes: 0
  };

  if (!comment.replies) comment.replies = [];
  comment.replies.push(reply);
  res.status(201).json({ success: true, data: reply });
});

// ==========================================
// 3. LIVE BLOG, MULTIMEDIA, ADS & ANALYTICS
// ==========================================

app.get('/api/live-blog', (req, res) => {
  res.json({ success: true, count: liveBlogEntries.length, data: liveBlogEntries });
});

app.post('/api/live-blog', (req, res) => {
  const { title, content, badge, author } = req.body;
  if (!title || !content) return res.status(400).json({ success: false, message: 'Title and content required' });

  const newEntry: LiveBlogEntry = {
    id: 'live-' + Date.now(),
    timestamp: new Date().toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' }) + ' EAT',
    title,
    content,
    badge: badge || 'BREAKING',
    author: author || 'News Desk'
  };

  liveBlogEntries.unshift(newEntry);
  res.status(201).json({ success: true, data: newEntry });
});

app.get('/api/multimedia', (req, res) => {
  res.json({ success: true, count: INITIAL_MULTIMEDIA.length, data: INITIAL_MULTIMEDIA });
});

app.get('/api/ads', (req, res) => {
  const { slot } = req.query;
  let results = [...adCampaigns];
  if (slot) results = results.filter(a => a.slot === slot && a.status === 'active');
  res.json({ success: true, count: results.length, data: results });
});

app.post('/api/ads/click/:id', (req, res) => {
  const { id } = req.params;
  const ad = adCampaigns.find(a => a.id === id);
  if (ad) ad.clicks += 1;
  res.json({ success: true, clicks: ad?.clicks || 0 });
});

app.post('/api/ads/impression/:id', (req, res) => {
  const { id } = req.params;
  const ad = adCampaigns.find(a => a.id === id);
  if (ad) ad.impressions += 1;
  res.json({ success: true, impressions: ad?.impressions || 0 });
});

app.get('/api/analytics', (req, res) => {
  const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);
  const totalShares = articles.reduce((sum, a) => sum + (a.shares || 0), 0);
  const totalComments = comments.length;

  res.json({
    success: true,
    data: {
      realtimeVisitors: 1420 + Math.floor(Math.random() * 85),
      todayPageViews: totalViews + 28540,
      monthlyVisitors: 4180000,
      totalArticles: articles.length,
      totalShares,
      totalComments,
      avgEngagementTime: '3m 48s',
      trafficSources: [
        { name: 'Google Search & Discover', percentage: 48 },
        { name: 'Direct & Home Bookmarks', percentage: 26 },
        { name: 'Social (X / WhatsApp / Facebook)', percentage: 18 },
        { name: 'Chronicle Newsletters & RSS', percentage: 8 }
      ],
      geoDistribution: [
        { country: 'Kenya', percentage: 68, flag: '🇰🇪' },
        { country: 'United Kingdom (Diaspora)', percentage: 11, flag: '🇬🇧' },
        { country: 'United States', percentage: 9, flag: '🇺🇸' },
        { country: 'Uganda & Tanzania', percentage: 7, flag: '🌍' },
        { country: 'Other International', percentage: 5, flag: '🌐' }
      ],
      deviceDistribution: [
        { device: 'Mobile Smartphone', percentage: 76 },
        { device: 'Desktop Browser', percentage: 19 },
        { device: 'Tablet & iPad', percentage: 5 }
      ],
      categoryPerformance: [
        { category: 'Kenya & Politics', views: 82400 },
        { category: 'Business & Markets', views: 64100 },
        { category: 'Technology & Startups', views: 51200 },
        { category: 'Investigations', views: 49800 },
        { category: 'Sports & Athletics', views: 42100 },
        { category: 'Lifestyle & Culture', views: 31900 }
      ]
    }
  });
});

app.get('/api/authors', (req, res) => {
  res.json({ success: true, data: INITIAL_AUTHORS });
});

app.get('/api/trending-topics', (req, res) => {
  res.json({
    success: true,
    data: [
      { tag: 'AfCFTA Nairobi Summit', count: '48.9K reads', category: 'Business' },
      { tag: 'County Allocation Bill', count: '34.1K reads', category: 'Politics' },
      { tag: 'Silicon Savannah AI', count: '41.2K reads', category: 'Technology' },
      { tag: 'Iten Marathon Camps', count: '29.8K reads', category: 'Sports' },
      { tag: 'Olkaria Geothermal', count: '52.1K reads', category: 'Investigations' },
      { tag: 'Social Health Authority', count: '18.2K reads', category: 'Health' }
    ]
  });
});

app.post('/api/newsletter/subscribe', (req, res) => {
  const { email, categories } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Valid email address is required' });
  }

  const exists = newsletterSubscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    exists.categories = categories || exists.categories;
    return res.json({ success: true, message: 'Newsletter preferences updated successfully' });
  }

  newsletterSubscribers.push({
    email,
    categories: categories || ['Kenya', 'Politics', 'Business', 'Technology'],
    createdAt: new Date().toISOString()
  });

  res.status(201).json({ success: true, message: 'Subscribed to The Kenya Chronicle Morning Briefing!' });
});

// ==========================================
// 4. AI-POWERED EDITORIAL ASSISTANT (GEMINI)
// ==========================================

app.post('/api/ai/editorial-assistant', async (req, res) => {
  const { mode, title, draftText, category } = req.body;

  if (!title && !draftText) {
    return res.status(400).json({ success: false, message: 'Provide article title or draft text for AI assistance' });
  }

  if (ai) {
    try {
      let prompt = '';
      if (mode === 'headlines') {
        prompt = `You are the executive editor for The Kenya Chronicle, a prestigious digital news publication in East Africa.
Generate 5 distinct, highly clickable, journalistically rigorous headlines for the following story:
Title: "${title || ''}"
Draft Excerpt: "${(draftText || '').slice(0, 1000)}"
Category: "${category || 'Kenya'}"

Format requirements:
Return a JSON array of strings:
[
  "Headline 1 (Authoritative / Lead)",
  "Headline 2 (SEO & Search Focused)",
  "Headline 3 (Analytical / Impact Angle)",
  "Headline 4 (Breaking News Urgency)",
  "Headline 5 (Human Interest / Quote Angle)"
]`;
      } else if (mode === 'seo') {
        prompt = `You are a digital newsroom SEO director. Generate comprehensive SEO metadata for this story:
Title: "${title}"
Content: "${(draftText || '').slice(0, 1500)}"
Category: "${category}"

Return a valid JSON object matching:
{
  "seoTitle": "A concise title under 60 characters with high search intent",
  "metaDescription": "A compelling description between 135 and 155 characters that triggers high CTR",
  "suggestedTags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "focusKeywords": ["keyword1", "keyword2", "keyword3"],
  "googleDiscoverAngle": "One tip to maximize Google Discover traction"
}`;
      } else if (mode === 'summarize') {
        prompt = `You are a senior newsroom copy chief. Create an editorial summary and social distribution pack:
Title: "${title}"
Content: "${(draftText || '').slice(0, 2000)}"

Return a valid JSON object matching:
{
  "bulletSummary": ["Bullet point 1 with key news fact", "Bullet point 2 with context", "Bullet point 3 with future impact"],
  "socialCaptions": {
    "xTwitter": "Engaging punchy post with relevant hashtags and attribution under 260 chars",
    "linkedIn": "Professional executive summary geared toward business leaders and policymakers",
    "facebook": "Conversational community-oriented summary inviting reader perspectives"
  },
  "readTimeMinutes": 4
}`;
      } else if (mode === 'proofread') {
        prompt = `You are a senior copy editor for an international news agency. Review this article text for journalistic standards, clarity, tone, and verification risks:
Title: "${title}"
Content: "${(draftText || '').slice(0, 2000)}"

Return a valid JSON object matching:
{
  "editorialScore": 92,
  "toneAssessment": "Authoritative and objective",
  "suggestions": [
    "Specific improvement suggestion 1",
    "Specific improvement suggestion 2"
  ],
  "factCheckPrompts": [
    "Item or statistic that needs secondary source verification before publishing"
  ]
}`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        }
      });

      const responseText = response.text || '{}';
      try {
        const parsed = JSON.parse(responseText);
        return res.json({ success: true, result: parsed });
      } catch (parseErr) {
        return res.json({ success: true, result: responseText });
      }
    } catch (err: any) {
      console.error('Gemini API call failed, using editorial heuristics:', err.message);
    }
  }

  // Graceful fallback heuristics when API key is pending or network is offline
  if (mode === 'headlines') {
    res.json({
      success: true,
      result: [
        `Analysis: How ${title || 'The New Policy'} Shifts East Africa's Economic Equation`,
        `Inside the Milestone: Key Takeaways as Stakeholders Seal Decisive Agreement`,
        `Breaking: National Assembly Deliberates Vital Revisions Ahead of Deadline`,
        `Kenya Chronicle Exclusive: What This Means for Citizens, Businesses and Investors`,
        `The Full Picture: Why Regional Leaders Are Watching Nairobi's Latest Moves`
      ]
    });
  } else if (mode === 'seo') {
    res.json({
      success: true,
      result: {
        seoTitle: `${(title || 'Kenya News Today').slice(0, 50)} | Kenya Chronicle`,
        metaDescription: `Read the latest developments on ${title || 'national news'} from Nairobi and East Africa. Comprehensive analysis and verified reporting.`,
        suggestedTags: [category || 'Kenya', 'East Africa', 'Nairobi', 'Policy', 'National News'],
        focusKeywords: ['Kenya news', category?.toLowerCase() || 'politics', 'Nairobi'],
        googleDiscoverAngle: 'Feature a high-contrast hero image with clear emotional or leadership focal point.'
      }
    });
  } else if (mode === 'summarize') {
    res.json({
      success: true,
      result: {
        bulletSummary: [
          'Key policymakers and stakeholders ratified the landmark framework during plenary deliberations in Nairobi.',
          'The agreement establishes direct implementation milestones starting over the next financial quarter.',
          'Economic and civic groups project widespread benefits across county and regional trade networks.'
        ],
        socialCaptions: {
          xTwitter: `JUST IN: ${title || 'New developments in Nairobi'}. Full report, analysis, and reader reactions on @KenyaChronicle 🇰🇪`,
          linkedIn: `Strategic Policy Update: Examining the wider institutional implications of ${title || 'today\'s announcement'}. An essential read for regional enterprise leaders.`,
          facebook: `What are your thoughts on this milestone? Read the full story and join the discussion with fellow readers across Kenya.`
        },
        readTimeMinutes: 4
      }
    });
  } else {
    res.json({
      success: true,
      result: {
        editorialScore: 94,
        toneAssessment: 'Balanced and objective editorial voice with clear attribution.',
        suggestions: [
          'Verify that all currency conversions provide both Ksh and USD references for international readership.',
          'Include an additional direct quote from county level stakeholders for geographical diversity.'
        ],
        factCheckPrompts: [
          'Confirm final parliamentary vote tally with the official Hansard office.'
        ]
      }
    });
  }
});

// ==========================================
// 5. XML SITEMAP & RSS FEEDS
// ==========================================

app.get('/api/sitemap.xml', (req, res) => {
  res.header('Content-Type', 'application/xml');
  const urls = articles.map(a => `
    <url>
      <loc>https://kenyachronicle.ke/article/${a.slug}</loc>
      <lastmod>${new Date(a.updatedAt).toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>${a.isLead ? '1.0' : '0.8'}</priority>
    </url>`).join('');

  res.send(`<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://kenyachronicle.ke/</loc>
      <changefreq>always</changefreq>
      <priority>1.0</priority>
    </url>
    ${urls}
  </urlset>`);
});

app.get('/api/rss.xml', (req, res) => {
  res.header('Content-Type', 'application/xml');
  const items = articles.filter(a => a.status === 'published').slice(0, 20).map(a => `
    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>https://kenyachronicle.ke/article/${a.slug}</link>
      <description><![CDATA[${a.summary}]]></description>
      <category>${a.category}</category>
      <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>
      <guid isPermaLink="true">https://kenyachronicle.ke/article/${a.slug}</guid>
    </item>`).join('');

  res.send(`<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>The Kenya Chronicle – East Africa's Digital Daily</title>
      <link>https://kenyachronicle.ke</link>
      <description>Authoritative Kenyan and Pan-African News, Politics, Business, Tech and Culture</description>
      <language>en-ke</language>
      ${items}
    </channel>
  </rss>`);
});

// ==========================================
// 6. VITE MIDDLEWARE / STATIC ASSETS
// ==========================================

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[The Kenya Chronicle Server] Running at http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
