# AR BI Consulting: Go-live and SEO guide

## 1. Upload
Upload everything in this folder to the `public_html` folder of your hosting (keep the `img` folder).

## 2. Set your domain (one step)
Every file currently uses the placeholder `https://YOUR-DOMAIN.com`. Run:

    sh set-domain.sh https://www.yourdomain.com

(Or open index.html, robots.txt, sitemap.xml and llms.txt and replace the placeholder by hand.)

## 3. What is already built in
**SEO:** optimized title and description, canonical URL, robots rules, XML sitemap, Open Graph and Twitter cards, 1200x630 share image, favicons, one H1 with logical H2/H3 headings, descriptive image alt text, lazy-loaded images, HTTPS redirect, compression and caching (.htaccess).
**AEO (answer engines, featured snippets, voice):** a visible FAQ with 11 short answer-first questions, matching FAQPage schema, speakable markup.
**GEO (AI search such as ChatGPT, Claude, Perplexity, Gemini):** llms.txt, robots.txt that allows AI crawlers, Organization/ProfessionalService schema with all 10 services, area served and contact details, and a no-JavaScript list of services.

## 4. After you go live (these decide ranking)
1. Add the site to **Google Search Console** and **Bing Webmaster Tools**, then submit `/sitemap.xml`.
2. Create a **Google Business Profile** (service-area business, Islamabad) and add the website.
3. Keep your **LinkedIn** profile and company page linked to the site, with the same name, email and phone.
4. Publish **blog posts** (Power BI tips, DAX examples, case-style explanations). Ranking for terms like "Power BI consultant" needs ongoing content and links.
5. Replace sample visuals with real project screenshots and add real client testimonials when you have them.
6. Check speed with PageSpeed Insights after upload.

## 5. Please note
- No one can guarantee a ranking position. This setup removes technical obstacles and gives search and AI systems clear, correct information.
- The contact form currently validates and shows a confirmation but does **not** send email yet. Until the backend is added, visitors can use the email, WhatsApp and LinkedIn links on the page.
- This is a one-page site. Separate pages per service and a blog (Phase 2) will let you rank for many more searches.

---
## Multi-page update (v5)
Pages: / , /about/ , /services/ , 10 service pages under /services/<name>/ , /portfolio/ , /why-choose-us/ , /faq/ , /automated-receptionist/ , /contact/ , 404.html.
1. Upload the whole folder contents to your web root (public_html), keeping the folder structure.
2. Run `sh set-domain.sh https://www.yourdomain.com` (or replace YOUR-DOMAIN.com in all .html/.xml/.txt files).
3. contact.php needs PHP with mail() enabled (standard on cPanel hosting). Set the recipient at the top of the file. If mail fails, visitors see an honest message with your email and WhatsApp.
4. Submit /sitemap.xml in Google Search Console and Bing Webmaster Tools.
