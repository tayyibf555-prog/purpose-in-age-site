/**
 * All site copy lives here.
 *
 * Strings that depend on facts the client has not yet confirmed are marked
 * with a PLACEHOLDER comment. Run `npm run placeholders` to list every one
 * of them before launch. Nothing in this file invents a testimonial, a
 * statistic, a press mention or a brand relationship.
 *
 * Voice rules (CLAUDE.md): no em dashes, sentence case, plain verbs,
 * first person for anything in Scott’s voice, US English.
 */

export const site = {
  name: "Purpose in Age",
  // PLACEHOLDER: confirm preferred byline, "Scott D Brown" vs "Scott Brown".
  author: "Scott D Brown",
  tagline: "Rebuilding identity after the career ends.",
  url: "https://purposeinage.com",
} as const;

export const nav = [
  { href: "/about", label: "About" },
  { href: "/book", label: "Book" },
  { href: "/club", label: "Club" },
  { href: "/journal", label: "Journal" },
  { href: "/speaking", label: "Speaking" },
  { href: "/contact", label: "Contact" },
] as const;

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

export const home = {
  hero: {
    eyebrow: "Purpose in Age",
    // Addressed to the reader, whose career has ended. Not a claim about
    // Scott, whose has not.
    headline: "Your career ended. You didn’t.",
    // Verified against his LinkedIn. The previous version said "retired at 61",
    // which is false: he founded SDB05 Digital Strategies in July 2026 and is
    // working now. It also contradicted his own book title.
    lead: "I’m Scott Brown. Thirty years in marketing and sales, then a stretch as a case manager working with veterans and people with nowhere to sleep. Purpose in Age came out of what I learned in between.",
    primary: { label: "Join the Club waitlist", href: "/club" },
    secondary: { label: "Read chapter one", href: "/book#chapter-one" },
    imageAlt:
      "Six men in their sixties and seventies around a long diner table, mid conversation over coffee.",
  },

  problem: {
    eyebrow: "What actually happens",
    headline: "Nobody warns you about the Monday after.",
    body: [
      "You spend forty years being introduced by your job title. Then it stops, and the introductions stop with it. The money can be fine, the marriage can be fine, the health can be fine, and it can still feel like the floor went out from under you.",
      "That is not decline and it is not depression. It is an identity question. Identity questions have answers, but you do not get to them by relaxing harder.",
    ],
  },

  table: {
    eyebrow: "Where this started",
    headline: "A table of retired men, no dues, no agenda.",
    body: [
      "I run the local chapter of ROMEO, Retired Old Men Eating Out. We meet for a meal. There is no program, no speaker and no fee. Men turn up, order, and talk about what they are actually doing with the week.",
      "It is the most useful thing I do, and it is the reason this exists. Everything on this site is an attempt to give that table a wider door.",
    ],
    imageAlt:
      "A worn diner table after a meal, cleared plates pushed aside, two men’s hands resting near heavy coffee mugs.",
  },

  credibility: {
    eyebrow: "Who is writing this",
    headline: "I’m a marketer, not a therapist.",
    body: [
      "Thirty years in marketing and sales, and a year as a case manager at US Vets when I was in my fifties. I have no clinical training, no gerontology degree and no financial license, and I am not going to pretend otherwise. If you need a doctor or an adviser, go and get one.",
      "What I have is the same question you have, worked on in public, in writing, week after week. I keep an office in San Francisco and another in Sonoma County, and I run a table of retired men who meet for a meal. That is the whole résumé for this particular job.",
    ],
    cta: { label: "Read the longer version", href: "/about" },
  },

  club: {
    eyebrow: "The Club",
    headline: "Purpose in Age Club",
    // PLACEHOLDER: the Club’s format, price, platform and launch date are all
    // unconfirmed. This copy is deliberately written so that none of it
    // depends on those answers. Do not add specifics until they are settled.
    body: [
      "A paid membership for men doing this work on purpose rather than by accident. It is not built yet. I am putting it together with the people who join the list, which is the only sensible way to build something like this.",
      "Join the waitlist and you will hear the format, the price and the start date before anyone else, and you will get asked what it should contain.",
    ],
    // Taken from the current site's own "Purpose in Age Club" section, so this
    // is Scott's stated intent rather than our invention. The current site also
    // floats a price by asking "What would you pay a month? $24.95?" which is a
    // question, not a decision, so no price is stated here.
    // PLACEHOLDER: confirm this list still reflects the plan.
    features: [
      "A room of men working on the same thing",
      "Meals and meet-ups, online and in person",
      "Short lessons, not a course you have to finish",
      "Direct access to me, while the room is small",
    ],
    capture: {
      label: "Get your email address on the list",
      button: "Join the waitlist",
      note: "No cost to join the list. Leave whenever you want.",
    },
  },

  book: {
    eyebrow: "The book",
    // PLACEHOLDER: the title appears inconsistently in Scott’s own materials,
    // sometimes "Never Retires", sometimes "Doesn’t Retire". Confirm before
    // this is set in type anywhere public.
    title: "A Man’s Purpose Never Retires. It Evolves.",
    body: [
      "The long form version of the argument, written for the man who has just finished and is quietly wondering what the next twenty years are for.",
      "Chapter one is yours for an email address. It is the chapter about the Monday after, which is the one most men tell me they recognized immediately.",
    ],
    capture: {
      label: "Where should I send chapter one?",
      button: "Send me chapter one",
      note: "One chapter, sent once. No series, no drip.",
    },
    cta: { label: "See the book", href: "/book" },
  },

  journal: {
    eyebrow: "Recent writing",
    headline: "What I’m working on lately.",
    cta: { label: "Read the journal", href: "/journal" },
  },

  closing: {
    eyebrow: "Two other ways in",
    headline: "Book me to speak, or just write to me.",
    body: "I speak to companies about the retirement cliff their long service employees are walking toward, and to groups of men about what to do once they have walked off it. If you would rather just ask a question, that address goes to me and I answer it myself.",
    primary: { label: "See speaking topics", href: "/speaking" },
    secondary: { label: "Write to me", href: "/contact" },
  },
} as const;

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  eyebrow: "About",
  headline: "My purpose did not retire.",
  cut: "It changed jobs.",
  /*
   * Drafted from the public record on Scott’s LinkedIn, not invented. Every
   * factual claim below maps to a dated role on that profile:
   *
   *   InfoSend, co-founder, 1996
   *   Medical Manager / WebMD & Emdeon / Sage, network services, 1998 to 2007
   *   Lutheran Social Services, assistant program manager, 2019
   *   US Vets, case manager II, 2019 to 2020
   *   Lift Up, housing for homeless, 2020 to 2022
   *   Harbor Interfaith Services, volunteer, 2019 to 2022
   *   XR Metaverse Studios, founder and CEO, 2024 to 2025
   *   Golden Gate Center for Spiritual Living, fractional CMO, pro bono
   *   Sonoma Community Action Network, board director, 2025 to 2026
   *   Sonoma County ROMEO Club, chapter founder, 2026
   *
   * PLACEHOLDER: this is a draft in Scott’s voice, not Scott’s words. The
   * facts are his; the sentences are ours. He must read and rewrite this
   * before launch. In particular the feelings attributed to him in
   * paragraphs three and four are inference and need his sign-off.
   */
  body: [
    "I have been in marketing and sales since 1996. I co-founded a company called InfoSend, spent the best part of a decade in network services at Medical Manager, WebMD and Sage, and then went out on my own as a consultant. That is the part of the résumé that makes sense on paper.",
    "In 2019 I did something that surprised most people who knew me. I took a job as an assistant program manager at Lutheran Social Services, and then as a case manager at US Vets. For about a year my working day was housing veterans and people who had nowhere to sleep. I kept the consultancy going quietly in the background, and for two years after that I did housing work with Lift Up and Harbor Interfaith as well.",
    "Nobody plans that in their fifties. It was not a career move and it did not pay like one.",
    "What it did was answer a question I had been circling for years without ever naming it. Not what do I do now. Who am I now, once the job title stops doing the work of explaining me to people.",
    "Since then I have built a metaverse studio and closed it, done marketing for a spiritual center in San Francisco for nothing, sat on a nonprofit board in Sonoma County, and started a ROMEO chapter, Retired Old Men Eating Out, which meets for a meal with no program, no speaker and no fee.",
    "I am not retired. That is rather the point. The book is called A Man’s Purpose Never Retires. It Evolves, and I wrote it because mine did, in a direction I would not have predicted and could not have planned.",
  ],
  disclaimer:
    "For the avoidance of doubt: I am a marketer by trade. I am not a doctor, a therapist, a gerontologist or a financial adviser, and nothing here is advice of that kind.",
} as const;

/* ------------------------------------------------------------------ */
/* Book                                                                */
/* ------------------------------------------------------------------ */

export const book = {
  eyebrow: "The book",
  // PLACEHOLDER: confirm final title spelling before launch.
  title: "A Man’s Purpose Never Retires. It Evolves.",
  // PLACEHOLDER: publication date unconfirmed. No date is stated anywhere on
  // this page on purpose. Add one only once it is settled.
  publisher: "Leaders Press",
  lead: "A book for the man who has just finished, and is quietly working out what the next twenty years are for.",
  body: [
    "This is not a retirement book. Retirement books are about money, or they are about filling time. This one is about the specific problem of being introduced by a job title for forty years and then losing the introduction.",
    "It is short on theory and long on what men actually did about it, mine included.",
  ],
  chapters: [
    {
      n: "One",
      title: "The Monday after",
      blurb:
        "The gap between the last day, which everyone prepares you for, and the first ordinary Monday, which nobody does.",
    },
    {
      n: "Two",
      title: "The title problem",
      blurb:
        "Why the first question at every social event becomes the hardest one, and what to do about the answer.",
    },
    {
      n: "Three",
      title: "Rest is not a purpose",
      blurb:
        "Rest works until it is the only thing on the calendar. What replaces it, and what does not.",
    },
    {
      n: "Four",
      title: "The table",
      blurb:
        "Why a meal with other men beats almost every structured program aimed at us, and how to find or start one.",
    },
  ],
  capture: {
    label: "Where should I send chapter one?",
    button: "Send me chapter one",
    note: "One chapter, sent once. No series, no drip.",
  },
  // PLACEHOLDER: no retailer links until the publication date and listings
  // are confirmed. Do not add placeholder or dead buy buttons. The current
  // site’s dead CTAs are one of the specific problems being fixed here.
  buyNote:
    "Buy links go here once the publication date is confirmed with Leaders Press.",
} as const;

/* ------------------------------------------------------------------ */
/* Club                                                                */
/* ------------------------------------------------------------------ */

export const club = {
  eyebrow: "The Club",
  headline: "Purpose in Age Club",
  lead: "A paid membership for men rebuilding an identity after the career, not a support group and not a course.",
  // PLACEHOLDER: everything about format, price, cadence, platform and
  // launch date is unconfirmed. This page is written to sell the waitlist,
  // not the product. Do not add specifics until the client confirms them.
  body: [
    "It does not exist yet, and I am not going to describe a thing I have not built. What I can tell you is the shape of it and who it is for.",
    "It is for men roughly 55 and up who are out of a long career, or close enough to see it, and who would rather work on this deliberately than wait for it to sort itself out. It will have other men in it, because that is the part that works. It will cost money, because free groups dissolve.",
  ],
  principles: [
    {
      title: "Men in the room",
      body: "The table is the mechanism. Anything that replaces other men with content is a worse version of this.",
    },
    {
      title: "Deliberate, not therapeutic",
      body: "This is not treatment and I am not qualified to provide it. It is a working group for a practical problem.",
    },
    {
      title: "Small enough to be answerable",
      body: "If I cannot keep up with the room, the room is too big. That constrains how many people join at the start.",
    },
  ],
  capture: {
    label: "Get your email address on the list",
    button: "Join the waitlist",
    note: "No cost to join the list. You will hear the format and price before anyone else. Leave whenever you want.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Speaking                                                            */
/* ------------------------------------------------------------------ */

export const speaking = {
  eyebrow: "Speaking",
  headline: "Talks about the cliff at the end of a long career.",
  lead: "Two audiences. Companies with long service employees walking toward an exit nobody has prepared them for, and groups of men who have already walked off it.",
  topics: [
    {
      title: "The Monday after",
      audience: "For groups of retired and near retired men",
      body: "What actually happens to identity when the job stops, why the first year is harder than expected, and the small number of things that reliably help. Told first person, no slides full of statistics.",
    },
    {
      title: "The retirement cliff nobody budgets for",
      audience: "For employers and HR teams",
      body: "Your long service people are handed a financial plan and a card. The identity side is left entirely to them, and it costs you in the eighteen months before they leave as much as it costs them after.",
    },
    {
      title: "Building the table",
      audience: "For community groups and member organizations",
      body: "How a dues free meal with no agenda outperforms most structured programming aimed at older men, and how to start one that survives past the third month.",
    },
  ],
  // The videos above are real. What is still missing is a cut-together
  // showreel and photography from live events.
  // PLACEHOLDER: add named past stages and audience sizes once Scott confirms
  // them. Nothing gets listed here until there is something behind it.
  proofNote:
    "A cut-together showreel and photographs from live events go here once Scott supplies them. Everything above is a full recording rather than a clip.",
  form: {
    heading: "Ask about a date",
    note: "This goes straight to me. Tell me the audience, the date and roughly how many people.",
  },
  imageAlt:
    "A man speaking to a seated audience in a plain conference room, photographed from the back of the room.",
} as const;

/* ------------------------------------------------------------------ */
/* Journal                                                             */
/* ------------------------------------------------------------------ */

export const journal = {
  eyebrow: "Journal",
  headline: "Writing about the second half, week by week.",
  lead: "Short pieces, mostly first person. This is where the LinkedIn writing lands so it stops disappearing into a feed.",
  // PLACEHOLDER: these are indicative posts written to demonstrate tone and
  // to exercise the layout. They are NOT Scott’s writing. Replace with real
  // posts from the Sanity pipeline before launch.
  posts: [
    {
      slug: "the-question-at-parties",
      title: "The question at parties",
      date: "2026-07-14",
      readingTime: "4 min",
      excerpt:
        "So what do you do. Four words, asked with no malice at all, and for about a year I had no sentence that did not sound like an apology.",
      body: [
        "So what do you do.",
        "Four words. Asked with no malice at all, usually by someone perfectly pleasant holding a drink. And for about a year after I moved from marketing into case work, I had no answer to it that did not sound like an apology.",
        "I tried a few. \"I’m between things\" ends the conversation, which I did not want. \"I’m taking some time\" implies I am going back, which I was not. \"I was in marketing\" is past tense about a person standing in front of you in the present tense, and everyone can hear it.",
        "What eventually worked was boring and I resisted it for months. I started answering with what I was actually doing that week. Not a title, an activity. I’m writing a book about men and retirement. I run a lunch for about a dozen retired guys. I’m learning to be useful to my daughter’s business without taking it over.",
        "None of those are jobs. All of them are answers. It turns out the question is not really asking for your employment status, it is asking for a way into a conversation with you. A title was just the fastest way to give one.",
        "The men I know who are doing well after the career have this in common. They can finish that sentence without flinching. Not with a grand purpose, usually. Just with something true they did this week.",
      ],
    },
    {
      slug: "rest-is-not-a-plan",
      title: "Rest is not a plan",
      date: "2026-06-30",
      readingTime: "3 min",
      excerpt:
        "The first three months are supposed to be the reward. For most of the men at my table they were. The trouble started when the reward kept going and nothing arrived to replace it.",
      body: [
        "The first three months are supposed to be the reward, and for most of the men at my table they were. They slept. They read. They did the jobs around the house that had been on a list since roughly 2009.",
        "The trouble started when the reward kept going and nothing arrived behind it.",
        "Rest is a recovery state. It is not a destination, and it does not scale. Two weeks of it repairs you. Two years of it hollows you out, quietly, while everyone around you keeps telling you how lucky you are.",
        "I am not saying go and get a job. Plenty of men rush into consulting work they do not want, purely so they have something to say at parties, and that is its own trap. I am saying that the thing which replaces work has to be something you would defend if challenged. Not something you fell into because the days were long.",
        "The test I use now: if a friend asked me to justify how I spent last week, would I be comfortable answering. Not proud. Just comfortable. That is a lower bar than purpose and a much more useful one.",
      ],
    },
    {
      slug: "why-a-diner",
      title: "Why it has to be a diner",
      date: "2026-06-16",
      readingTime: "5 min",
      excerpt:
        "People ask why the group meets over food instead of doing something structured. The food is the structure. That is the entire trick.",
      body: [
        "People ask why the group meets over a meal instead of doing something structured. A speaker, a topic, a format.",
        "The food is the structure. That is the whole trick and I did not invent it.",
        "Men our age are not, on the whole, going to sit in a circle and share. I am not either. But we will sit at a table facing roughly the same direction with something to do with our hands, and after about forty minutes somebody will say the real thing, and the table will absorb it without ceremony and keep eating.",
        "Nobody has to declare a topic. Nobody is put on the spot. If you have nothing to say you eat, and that is a complete and dignified way to attend.",
        "The other thing a meal does is give it a natural end. Ninety minutes, the check comes, everyone leaves. No one has to decide when it is over, which means no one has to be the person who leaves first.",
        "If you are thinking about starting one: pick a place with booths and bad acoustics, pick a fixed day of the month so nobody has to organize it again, and do not put a purpose on it. The purpose shows up on its own, usually around the third meeting, and it will not survive being announced in advance.",
      ],
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Media                                                               */
/*                                                                     */
/* Every one of these is REAL. Video IDs were pulled from the embeds on */
/* purposeinage.com and the titles resolved through the YouTube oEmbed  */
/* endpoint, so nothing here is invented.                              */
/*                                                                     */
/* The current site also embeds six videos that are not about Scott at  */
/* all: a GQ Kevin Costner interview, a MET museum audio tour, an ABC7  */
/* news segment about the Legion of Honor, a Spirit Halloween billboard */
/* reel, a Virtway metaverse how-to and a Sharon Burstein speaker promo. */
/* They are deliberately not carried over. They are a large part of why  */
/* the current site reads as incoherent.                               */
/* ------------------------------------------------------------------ */

export type Video = {
  id: string;
  title: string;
  channel: string;
  /** "purpose" reaches the audience this site is for. "career" backs up the
   *  claim that Scott spent thirty years as a working marketer. */
  strand: "purpose" | "career";
};

export const media = {
  eyebrow: "Watch and listen",
  headline: "Conversations I’ve already had",
  cut: "out loud.",
  lead: "Interviews, panels and podcasts. The first one is the closest to what this site is about.",
  channelUrl: "https://www.youtube.com/@scottdbrownllc",

  /** Featured on the homepage. The most on-topic thing Scott has recorded. */
  featured: {
    id: "fmnRViwP8GI",
    title: "Finding one's purpose in the golden years",
    channel: "TALRadio English",
    strand: "purpose",
    blurb:
      "The clearest version of the argument on record. Why purpose does not retire when the job does, and what men actually do about it.",
  },

  videos: [
    {
      id: "FZiDKHP3rn0",
      title: "World of Ability, with special guest Scott Brown",
      channel: "World of Ability Network",
      strand: "purpose",
    },
    {
      id: "pcahTEyIgdg",
      title: "Video podcast with Scott D Brown",
      channel: "Kevin Shortle",
      strand: "purpose",
    },
    {
      id: "P1UWYxmJGhI",
      title: "Outstanding Leadership Award, Las Vegas",
      channel: "Marketing 2.0 Conference",
      strand: "career",
    },
    {
      id: "i1zYzHoKJe0",
      title: "Disruptive marketing and the transition to Web3",
      channel: "Pivot & Prosper, episode 10",
      strand: "career",
    },
    {
      id: "NukNn-aajt0",
      title: "Media Champions, with Scott Brown from MOS",
      channel: "Daily Ad Brief",
      strand: "career",
    },
    {
      id: "imlNAt5sgXM",
      title: "An Apple Vision Pro tour",
      channel: "Scott D Brown LLC",
      strand: "career",
    },
    {
      id: "XMQOztkKlcc",
      title: "Next generation wine marketing",
      channel: "Scott D Brown LLC",
      strand: "career",
    },
    {
      id: "msMqlcfNtco",
      title: "Club Remora, an introduction",
      channel: "Scott D Brown LLC",
      strand: "career",
    },
  ] satisfies Video[],
} as const;

/* ------------------------------------------------------------------ */
/* Credentials                                                         */
/*                                                                     */
/* All verifiable from the current site or from the linked videos.     */
/* No invented numbers.                                                */
/* ------------------------------------------------------------------ */

export const credentials = [
  { figure: "Since 1996", label: "in marketing and sales" },
  { figure: "US Vets", label: "case manager, 2019 to 2020" },
  { figure: "Marketing 2.0", label: "Outstanding Business Leader, 2022" },
  { figure: "Not a doctor", label: "and not a financial adviser" },
] as const;

/* ------------------------------------------------------------------ */
/* Career, from his LinkedIn. Every entry has a role and dates behind   */
/* it. Used on /about as a factual spine under the narrative.          */
/* ------------------------------------------------------------------ */

export const timeline = [
  { years: "1996", what: "Co-founded InfoSend" },
  { years: "1998 to 2007", what: "Network services at Medical Manager, WebMD and Sage" },
  { years: "2007 to 2017", what: "Consulting, then out on his own" },
  { years: "2019", what: "Assistant program manager, Lutheran Social Services" },
  { years: "2019 to 2020", what: "Case manager, US Vets" },
  { years: "2020 to 2022", what: "Housing work with Lift Up and Harbor Interfaith" },
  { years: "2024 to 2025", what: "Founded and closed XR Metaverse Studios" },
  { years: "2023 to 2025", what: "Fractional CMO, pro bono, Golden Gate Center for Spiritual Living" },
  { years: "2025 to 2026", what: "Board director, Sonoma Community Action Network" },
  { years: "2026", what: "Founded the Sonoma County ROMEO chapter" },
  { years: "2026", what: "Writing A Man’s Purpose Never Retires. It Evolves." },
] as const;

/* ------------------------------------------------------------------ */
/* Real recommendations from his LinkedIn. Not invented.               */
/*                                                                     */
/* PLACEHOLDER: get written permission from both people before these    */
/* appear on a public page. A LinkedIn recommendation is public, but    */
/* lifting it onto a marketing site is a different use.                */
/* ------------------------------------------------------------------ */

export const recommendations = [
  {
    quote: "Scott Brown is a man who does exactly what he says he will do.",
    name: "Philip Gwartney",
    role: "Owner, Package Design Global",
    when: "2013",
  },
  {
    quote:
      "Scott volunteered his time and marvelous expertise to assist our spiritual center to increase our number of members, income, and participation. His vision exceeded my imagination.",
    name: "Mary Murray Shelton",
    role: "Senior Minister, Golden Gate Center for Spiritual Living",
    when: "2024",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contact = {
  eyebrow: "Contact",
  headline: "This goes to me, and I answer it myself.",
  lead: "Questions about the Club, the book, a speaking date, or the ROMEO table. All fine. I read everything, and I reply to most of it within a few days.",
  // PLACEHOLDER: the current site publishes no email address, only a form.
  // This one is assumed. Confirm before it ships.
  email: "scott@purposeinage.com",
  // Both taken from the current site's contact section.
  phone: "+1 415 617 5802",
  phoneHref: "tel:+14156175802",
  offices: [
    { label: "Head office", lines: ["77 Van Ness Ave", "San Francisco, CA 94102"] },
    { label: "Sonoma County", lines: ["Santa Rosa, California"] },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* The ROMEO chapters. Real, and running today.                        */
/* ------------------------------------------------------------------ */

export const romeo = {
  eyebrow: "The table",
  headline: "It already exists,",
  cut: "and it already meets.",
  body: "ROMEO stands for Retired Old Men Eating Out. I run the San Francisco Bay and Sonoma chapter. There is no program, no speaker and no fee. Men turn up, order, and talk about what they are actually doing with the week.",
  chapters: [
    {
      name: "SF Bay and Sonoma chapter",
      note: "The one I run. Meets for a meal, no dues.",
      href: "https://romeoclubsonoma.com/",
    },
    {
      name: "Romeos around the country",
      note: "The wider network, and how to find or start a table near you.",
      href: "https://romeoclub.com/",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* The people around this.                                             */
/*                                                                     */
/* The original brief said to cut the "Heavy Hitting Friends" wall.    */
/* The client asked for it back, so it ships. Names and links are taken */
/* verbatim from the current site. The current site labels them with   */
/* in-jokes ("mute me", "Titan Bro", "Run Esquire"), which read as      */
/* private rather than professional, so each has been given a plain     */
/* descriptor drawn from where the link actually points.               */
/*                                                                     */
/* PLACEHOLDER: confirm each person is happy to be listed, and confirm  */
/* the descriptors are accurate. These are relationships, not           */
/* endorsements, and the section is worded that way on purpose.         */
/* ------------------------------------------------------------------ */

export const network = {
  eyebrow: "The people around this",
  headline: "I did not get here",
  cut: "on my own.",
  lead: "Friends and collaborators whose work I rely on. Not sponsors, not affiliates, and nobody here is paying to be on this page.",
  people: [
    { name: "Steve Kidd", role: "Publishing", href: "https://thrivingbestsellers.com/about" },
    { name: "Tom Hazzard", role: "Podcasting, Podetize", href: "https://podetize.com" },
    { name: "Mike Allton", role: "AI and social", href: "https://www.youtube.com/@MikeAllton" },
    { name: "James “Jon” Keel", role: "Business development", href: "https://www.linkedin.com/in/jonkeel/" },
    { name: "Robert Kohler", role: "Law", href: "https://www.kohler-law.com/" },
    { name: "Gary Jinks", role: "GLJ Group", href: "https://gljgroup.com/about" },
    { name: "Jeff Valenson", role: "Design", href: "https://jeffvalensondesign.com/" },
    { name: "Willie J", role: "Pure Mission Entertainment", href: "https://www.puremissionent.com/" },
    { name: "Richie Kagan", role: "Last Minute Media", href: "https://lastminutemediadeals.com/" },
    { name: "Tim Taylor", role: "The Great Discovery", href: "https://thegreatdiscovery.com/" },
    { name: "Sharon Burstein", role: "Speaking", href: "https://www.sharonburstein.com/" },
    { name: "Frank Kuszpa", role: "ROMEO Club co-founder", href: "https://romeoclub.com/" },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Social. All live on the current site.                               */
/* ------------------------------------------------------------------ */

export const social = [
  { label: "YouTube", href: "https://www.youtube.com/@scottdbrownllc" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/purposeinage/" },
  { label: "Instagram", href: "https://www.instagram.com/scottbro05_/" },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61586849453362",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const footer = {
  capture: {
    heading: "Get the writing by email",
    note: "A short piece most weeks. Nothing else, and no forwarding of your address to anyone.",
    button: "Subscribe",
  },
  // A single quiet page for network reciprocity links, per CLAUDE.md, rather
  // than an endorsement wall. Not built until the client asks for it.
  legal: [
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy" },
  ],
  disclaimer:
    "Scott D Brown is a marketer and writer. He is not a doctor, therapist, gerontologist or financial adviser, and nothing on this site is medical, psychological or financial advice.",
} as const;
