export const site = {
  name: "Pathloom",
  description: "A living career skill-tree that turns your goal into a plan that moves with your work.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://pathloom.vercel.app"
};

export const publicNav = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Roadmaps", href: "/roadmaps" },
  { label: "FAQ", href: "/faq" }
];

export const legalLinks = [
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms-and-conditions" },
  { label: "Cookies", href: "/cookie-policy" },
  { label: "Acceptable use", href: "/acceptable-use" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Data deletion", href: "/data-deletion" }
];

export const roadmapPages = {
  "software-engineer-intern": {
    title: "Software engineer intern roadmap",
    shortTitle: "SWE intern",
    description: "A practical, deadline-aware path from fundamentals to a strong software engineering internship application.",
    intro: "Build the habits and evidence that make internship prep feel less scattered: solve the right problems, ship proof, and keep a steady pace.",
    weeks: "16–24 weeks",
    skills: [
      ["01", "Programming fluency", "Python or JavaScript, complexity, debugging"],
      ["02", "Core DSA", "Arrays, strings, hash maps, trees, graphs, dynamic programming"],
      ["03", "CS foundations", "SQL, networking, operating systems, object-oriented design"],
      ["04", "Proof of work", "Two deployed projects with clear READMEs and measurable choices"],
      ["05", "Application loop", "Resume, mock interviews, targeted applications, reflection"]
    ],
    resources: ["NeetCode 150", "CS50x", "The Missing Semester", "GitHub project README guide"]
  },
  apm: {
    title: "APM / PM intern roadmap",
    shortTitle: "APM / PM intern",
    description: "A clear APM and PM preparation path across product thinking, communication, analytics, and shipped work.",
    intro: "Good product preparation is a practice loop: notice a problem, make a trade-off, explain it simply, and learn from what happened.",
    weeks: "12–20 weeks",
    skills: [
      ["01", "Product sense", "User problems, journeys, prioritisation, product trade-offs"],
      ["02", "Analytical habits", "Metrics, funnels, experiments, SQL and spreadsheet fluency"],
      ["03", "Communication", "Structured writing, storytelling, product briefs, clear opinions"],
      ["04", "Product proof", "Teardowns, prototypes, launches, and a small portfolio of decisions"],
      ["05", "Interview loop", "Product cases, behavioural stories, company research, mock practice"]
    ],
    resources: ["Decode and Conquer", "Reforge essays", "Google UX course", "Product case practice"]
  }
} as const;

export const legalContent: Record<string, { title: string; description: string; sections: Array<{ heading: string; body: string[] }> }> = {
  "privacy-policy": {
    title: "Privacy policy",
    description: "How Pathloom collects, uses, stores, and protects personal data.",
    sections: [
      { heading: "Template notice", body: ["This document is a template for an individual student developer operating from India. Replace {{OWNER_NAME}}, {{CONTACT_EMAIL}}, {{CITY_STATE}}, and {{LAST_UPDATED}} after review. It is not legal advice."] },
      { heading: "Who we are", body: ["Pathloom is operated by {{OWNER_NAME}} from {{CITY_STATE}}, India. Questions, requests, or grievances can be sent to {{CONTACT_EMAIL}}."] },
      { heading: "What we collect", body: ["Depending on the features you use, Pathloom may collect an account identifier, display name, username, avatar, career goal, deadline, progress nodes, public profile choice, optional proof URLs, and connected public developer handles. OAuth tokens are used only for the requested integration and should be encrypted or kept only for the active session.", "We do not ask for or store passwords or third-party API keys. The service is intended for people aged 16 and over; do not use it to submit children’s data."] },
      { heading: "Why we use it", body: ["We use data to provide the skill tree, sync public activity, calculate progress and plans, show an opted-in public profile, keep the service secure, respond to requests, and improve reliability. The lawful basis may include performance of a requested service, consent, legitimate interests, and compliance with law, as applicable."] },
      { heading: "Processors and retention", body: ["Service providers may include Vercel for hosting, Supabase for database services, GitHub for OAuth and public activity, and an optional Gemini provider for a text rewrite when that feature is enabled. We retain information only for as long as needed for the stated purpose or a legal obligation, then delete or anonymise it."] },
      { heading: "Your choices", body: ["You may request access, export, correction, restriction, or deletion by writing to {{CONTACT_EMAIL}}. You can keep a profile private, disconnect integrations, and withdraw optional consent. We aim to respond within a reasonable period and will explain if a request cannot be fulfilled."] }
    ]
  },
  "terms-and-conditions": {
    title: "Terms and conditions",
    description: "The terms for using Pathloom and its career planning tools.",
    sections: [
      { heading: "Template notice", body: ["This template should be reviewed and completed by {{OWNER_NAME}} before launch. Last updated: {{LAST_UPDATED}}. Contact: {{CONTACT_EMAIL}}."] },
      { heading: "Using Pathloom", body: ["Pathloom helps you organise career preparation. You must provide information you are allowed to share, keep your account secure, and use the service lawfully. You are responsible for checking the accuracy of any imported public activity and for your own application decisions."] },
      { heading: "No promise of an outcome", body: ["Progress tracking, roadmaps, resources, and plans are informational. They do not guarantee an interview, job, placement, rating, or other result. External services can change, be unavailable, or report incomplete data."] },
      { heading: "Changes and termination", body: ["We may update features, suspend access for abuse, or retire integrations with reasonable notice where practical. You can stop using the service and request deletion through the data-deletion instructions."] }
    ]
  },
  "cookie-policy": {
    title: "Cookie policy",
    description: "The cookies and local storage choices Pathloom uses.",
    sections: [
      { heading: "Essential storage", body: ["Pathloom uses essential first-party storage for security, theme preference, and cookie-consent state. Essential storage is always on because the site cannot remember these choices without it."] },
      { heading: "Optional categories", body: ["Analytics and Preferences are optional. Analytics is not loaded until you choose it. Preferences may remember non-essential interface choices. You can change your choice any time from Cookie settings in the footer; we ask again after 12 months."] },
      { heading: "Your browser", body: ["You can also clear cookies or local storage through your browser settings. Some product features may not work as expected after blocking essential storage."] }
    ]
  },
  "acceptable-use": {
    title: "Acceptable use",
    description: "The ways Pathloom should and should not be used.",
    sections: [
      { heading: "Keep it constructive", body: ["Do not use Pathloom to break laws, harass others, upload malicious code, probe private systems, misrepresent someone’s progress, or interfere with the service. Do not attempt to access another person’s account or private profile."] },
      { heading: "Public data and integrations", body: ["Only connect accounts you control or are authorised to use. Respect the terms and rate limits of GitHub, Codeforces, LeetCode, and any other connected service. Pathloom is not affiliated with those services."] }
    ]
  },
  "disclaimer": {
    title: "Disclaimer",
    description: "Important limits and third-party notices for Pathloom.",
    sections: [
      { heading: "Informational service", body: ["Pathloom provides planning and progress information, not career, legal, financial, medical, or employment advice. Check important information independently and make your own decisions."] },
      { heading: "Third parties", body: ["Pathloom is not affiliated with, endorsed by, or sponsored by LeetCode, Codeforces, GitHub, X, or LinkedIn. Their names and trademarks belong to their respective owners. Integrations may break or return incomplete information."] },
      { heading: "No guarantee", body: ["A plan, completion percentage, or public progress card cannot guarantee a job, internship, interview, rating, or outcome."] }
    ]
  },
  "data-deletion": {
    title: "Data deletion",
    description: "How to export or delete your Pathloom data.",
    sections: [
      { heading: "Request deletion", body: ["Write to {{CONTACT_EMAIL}} from the account email or include enough information for us to verify the request. You can request deletion of your account and associated profile, nodes, connected account handles, snapshots, plans, and public profile data."] },
      { heading: "What happens next", body: ["We will disable the profile, disconnect integrations, remove account records and stored progress data, and ask processors to remove data where applicable. Limited records may remain where required for security, fraud prevention, or legal obligations, with access restricted."] },
      { heading: "Export first", body: ["Before deletion, you may request a JSON export of your account data. Deletion is intended to be permanent, so save anything you need before confirming the request."] }
    ]
  }
};
