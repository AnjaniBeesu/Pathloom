# Pathloom SEO launch checklist

These steps require the owner to act after the production URL is confirmed.

## Search engines

1. Open Google Search Console and verify the site using the recommended DNS or HTML method.
2. Submit `https://YOUR_DOMAIN/sitemap.xml`.
3. Request indexing for `/`, `/how-it-works`, `/roadmaps`, `/roadmaps/software-engineer-intern`, `/roadmaps/apm`, and `/faq`.
4. Open Bing Webmaster Tools, import the verified Search Console property when possible, and submit the same sitemap.
5. Check that `robots.txt`, canonical tags, Open Graph metadata, and the public roadmap pages render correctly without JavaScript.

## Backlinks and launch notes

- Publish a transparent launch post on Product Hunt.
- Share the project in `r/developersIndia` and `r/cscareerquestionsIN`, following each community’s rules and adding useful context rather than spam.
- Write a build note for dev.to and Hashnode with the problem, architecture, and what is genuinely live.
- Add a short product update on LinkedIn.
- Add the production URL to the owner’s GitHub profile, repository About section, README, and pinned project.
- Link the public roadmap pages from relevant documentation and project pages.

Do not promise search ranking or job outcomes. Measure indexing, useful visits, and feedback instead.


## Phase 5 release checks

Before submitting the sitemap, set `NEXT_PUBLIC_SITE_URL` to the real production origin and redeploy. Then inspect raw HTTP responses—not only a browser render—for:

- `200` meaningful HTML on `/`, `/how-it-works`, `/roadmaps`, and both role roadmaps.
- Route-specific `<title>`, description, Open Graph, Twitter card, and canonical metadata using the production origin.
- `200` for `/robots.txt` and `/sitemap.xml`, with only public routes listed and `/api`, `/app`, and `/onboarding` disallowed.
- A real `404` for an unknown profile or a profile URL without a valid `share` token.
- A successful `image/png` response for a valid profile OG image route.
- Security headers present on public HTML and JSON responses without `X-Frame-Options` blocking managed Preview embedding.
