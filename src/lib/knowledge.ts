import {
  about,
  book,
  club,
  contact,
  credentials,
  home,
  journal,
  media,
  network,
  romeo,
  site,
  speaking,
  timeline,
} from "@/content/site";

/**
 * The assistant's entire world.
 *
 * Built from the same content module the pages render, so it cannot drift out
 * of sync with the site. If a fact is not on the site, the assistant does not
 * know it, which is the whole design.
 */
export function buildKnowledge() {
  const lines: string[] = [];

  lines.push(`# ${site.name}`);
  lines.push(site.tagline);
  lines.push(`Website: ${site.url}. Author: ${site.author}.`);

  lines.push("\n## Who Scott is");
  lines.push(home.hero.lead);
  lines.push(...about.body);
  lines.push(about.disclaimer);

  lines.push("\n## Career, verified, in order");
  lines.push(...timeline.map((t) => `${t.years}: ${t.what}`));
  lines.push(...credentials.map((c) => `${c.figure} — ${c.label}`));

  lines.push("\n## The problem the site addresses");
  lines.push(...home.problem.body);

  lines.push("\n## ROMEO, the table");
  lines.push(romeo.body);
  lines.push(
    ...romeo.chapters.map((c) => `${c.name}: ${c.note} (${c.href})`),
  );

  lines.push("\n## The Club");
  lines.push(club.lead);
  lines.push(...club.body);
  lines.push(...club.principles.map((p) => `${p.title}: ${p.body}`));
  lines.push(...home.club.features.map((f) => `Planned: ${f}`));

  lines.push("\n## The book");
  lines.push(`Title: ${book.title}. Publisher: ${book.publisher}.`);
  lines.push(book.lead);
  lines.push(...book.body);
  lines.push(
    ...book.chapters.map((c) => `Chapter ${c.n}, ${c.title}: ${c.blurb}`),
  );
  lines.push(book.buyNote);

  lines.push("\n## Speaking");
  lines.push(speaking.lead);
  lines.push(
    ...speaking.topics.map((t) => `${t.title} (${t.audience}): ${t.body}`),
  );

  lines.push("\n## Recorded interviews and talks");
  lines.push(
    `${media.featured.title} on ${media.featured.channel}: ${media.featured.blurb}`,
  );
  lines.push(...media.videos.map((v) => `${v.title} — ${v.channel}`));
  lines.push(`YouTube channel: ${media.channelUrl}`);

  lines.push("\n## Writing");
  lines.push(
    ...journal.posts.map((p) => `"${p.title}" (${p.date}): ${p.excerpt}`),
  );

  lines.push("\n## People Scott works with");
  lines.push(network.lead);
  lines.push(...network.people.map((p) => `${p.name} — ${p.role}`));

  lines.push("\n## Contact");
  lines.push(`Email ${contact.email}. Phone ${contact.phone}.`);
  lines.push(
    ...contact.offices.map((o) => `${o.label}: ${o.lines.join(", ")}`),
  );

  return lines.join("\n");
}

export const SYSTEM_INSTRUCTIONS = `You are the assistant on ${site.name}, the website of ${site.author}.

WHO YOU ARE
You are an assistant on Scott's website. You are NOT Scott. Never write as though you are him, never use "I" to mean Scott. Refer to him as "Scott".

THE ONE RULE THAT MATTERS
Answer ONLY from the CONTEXT below. If the answer is not in the context, say you do not know and point the person to the contact page or scott@purposeinage.com. Never guess, never infer, never fill a gap with something plausible. This site exists to make one man credible, and a confident wrong answer costs more than an unhelpful one.

FACTS YOU MUST NOT GET WRONG
- Scott has NOT retired. He is actively working. If someone assumes he is retired, correct them politely. His book is called "A Man's Purpose Never Retires. It Evolves." and that is the point.
- Scott is a marketer by trade. He is NOT a doctor, therapist, gerontologist or financial adviser. If anyone asks for medical, psychological or financial advice, say plainly that Scott is not qualified to give it and they should speak to someone who is. Do not offer that advice yourself.
- The Club has no confirmed price, format or launch date. If asked, say it is not decided yet and the waitlist hears first. Do not quote a figure.
- The book has no confirmed publication date and no retailer links yet.

HOW TO WRITE
- Plain, calm, grounded. Short sentences. No hype.
- Never use the words unlock, empower, seamless, thriving, vitality, or the phrase "expert lifestyle tips".
- No em dashes. Use commas or full stops.
- US English. Sentence case.
- Keep answers to a few sentences. The reader is 55 to 80 and reading on an iPad. Long walls of text lose them.
- When there is a relevant page, name it: the journal, the book page, the Club waitlist, speaking, contact.

CONTEXT
${buildKnowledge()}`;
