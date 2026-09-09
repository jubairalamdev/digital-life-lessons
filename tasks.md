# Digital Life Lessons — Development Tasks

Phase-based plan for the app. Updates as features ship.

---

## Phase 1: Dark/Light Theme Toggle ✅ DONE

Full-app dark mode toggle replacing hardcoded dark-only colors with light base + `dark:` variants.

**Commits:**
- `79942ef` feat: add dark/light theme toggle with hydration-safe init
- `533b4b1` style: theme-aware light/dark color variants across app
- `7a88811` fix: confine hover, border, and overlay effects to dark mode
- `623a779` fix: theme comment input background with transparent fallback

**Core toggle:**
- [x] `src/app/layout.js` — inline anti-flash script at `<body>` start; `<html>` defaults to `class="dark"` + `data-theme="dark"`
- [x] `src/components/common/navbar.jsx` — Sun/Moon toggle; persists to `localStorage('theme')`; syncs both `.dark` class and `data-theme` (HeroUI tokens)
- [x] Dark is the default; light becomes active only when toggled

**Bulk color conversion (~47 files):**
- [x] Pages: dashboard, admin, myLessons, myProfile, favorites, addLessons, pricing, payment-successful, lesson detail, profile, allLessons, auth (login/register), not-found, unauthorized
- [x] Components: homepage (Banner, Featured, TrendingLessons, Contributors, Benefits), dashboard (Sidebar, tables, rows), allLessons (AllLessonsCard), common (LessonCard, navbar, footer, Sidebar), lessonDetails (Comments, CommentForm, FavoriteButton, LikeButton, ReportButton, CommentCard)
- [x] `src/app/globals.css` — swiper arrows/bullets themed light vs dark

**Follow-up fixes:**
- [x] Hover/border/overlay effects (cards, table rows, sidebar, pricing, dropdowns, banner) confined to `dark:`
- [x] Colored buttons keep `text-white` (red/blue/emerald) in light mode
- [x] Comment input: white in light, transparent in dark (`CommentForm.jsx`)

---

## Phase 2: Share Buttons ✅ DONE

Social sharing on the lesson detail page.

**Commit:**
- `7f9e579` feat: add share buttons to lesson details page

**Delivered:**
- [x] `src/components/lessonDetails/ShareButtons.jsx` — client component with Copy Link (clipboard + toast), X/Twitter, Facebook, WhatsApp share actions
- [x] Wired into `src/app/(protected)/lesson/[id]/page.jsx` between favorites and ReportButton

---

## Phase 3: Newsletter Signup ⏳ PENDING

Backend-first feature. Needs SMTP credentials before shipping.

**Backend (`digital-life-lessons-server`):**
- [ ] `subscribers` collection in MongoDB
- [ ] Nodemailer route(s) in `index.js` — subscribe endpoint validates email, dedupes, sends welcome email
- [ ] Graceful error handling + response codes

**Frontend (this repo):**
- [ ] Newsletter form component (email input + submit)
- [ ] Wire to backend subscribe endpoint
- [ ] Toast on success/failure

**Blocked on:** SMTP credentials (env vars not yet configured).

---

## Phase 4: AI Chatbot ✅ IMPLEMENTED & LIVE via OpenRouter

Backend + frontend done, streaming included. Verified live against OpenRouter (JSON + SSE both 200).

**Backend (`digital-life-lessons-server`):**
- [x] AI chat route in `index.js` — `POST /api/ai/chat` proxies the chat completion request, keeps API key server-side
- [x] OpenRouter as primary provider — `OPEN_ROUTER_API_KEY` / `OPENROUTER_BASE_URL` (default `https://openrouter.ai/api/v1`), model via `OPENROUTER_MODEL` (default `openai/gpt-4o-mini`); sends `HTTP-Referer`/`X-Title` for attribution; falls back to a direct OpenAI key when no OpenRouter key is set
- [x] SSE streaming — `stream: true` streams token-by-token (`data: {delta}` + `[DONE]`), aborts upstream on client disconnect; JSON path unchanged
- [x] Rate limiting / abuse protection on the route (in-memory, 20 req/min per IP, returns 429 with `retryAfterSec`)
- [x] Validation: non-empty message array, only `user`/`assistant` roles, string content, last 10 messages; 503 when no provider key is configured
- [x] Optional per-lesson context injected into the system prompt via `lesson` body field

**Frontend (this repo):**
- [x] Chat widget component (client) — `src/components/common/ChatWidget.jsx`, floating button bottom-right on all pages (mounted in root layout)
- [x] Conversation UI — message list + input with loading state, quick-start prompts, network/error feedback
- [x] Per-lesson context — `ChatLessonContext` setter on the lesson detail page feeds the current lesson title into the API via `src/lib/chat-context.jsx` provider
- [x] Streaming responses — `stream: true` + SSE consumption with typing indicator and mid-stream connection-loss handling

**Env on the backend (`.env`, gitignored):** `OPEN_ROUTER_API_KEY` (live), `OPENAI_API_KEY` (old OpenAI key — no credits; can be removed).

---

## Notes
- `fix-dark-mode.js` at repo root was a one-off bulk-conversion script (already applied, kept for reference).
- Backend repo: `/home/jubair/Projects/digital-life-lessons-server` (Express/MongoDB).