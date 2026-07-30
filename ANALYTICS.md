# Analytics

Google Analytics 4 via `gtag.js`, measurement ID **G-M1V15MW8B4**.

- `src/lib/analytics.ts` — measurement ID, `trackEvent`, `gaAttrs`, `gaViewAttrs`
- `src/components/site/analytics.tsx` — loads the tag, sends everything derivable from the DOM
- `src/components/site/use-video-analytics.ts` — GA4 video events for `<video>`

The tag is configured with `send_page_view: false`; page views are sent
manually so App Router client-side navigations are counted exactly once.

Override the ID with `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Setting it to an empty
string disables analytics entirely (useful for preview deployments).

## How to add tracking

**Server components** — no client JS needed, `<Analytics />` picks up the click:

```tsx
<a href="#contact" {...gaAttrs("cta_click", { cta_location: "hero" })}>Get started</a>
<section {...gaViewAttrs("pricing")}>…</section>
```

`data-ga-cta-location="hero"` round-trips back to a `cta_location` parameter.

**Client components** — call `trackEvent` from the handler:

```tsx
trackEvent("form_submit", { form_name: "contact" });
```

## Events

GA4's recommended event names are reused where the interaction matches, so
they populate the built-in reports.

### Automatic — no per-component wiring

| Event | Fires when | Key parameters |
| --- | --- | --- |
| `page_view` | Initial load and every client-side navigation | `page_location`, `page_path`, `page_title` |
| `scroll_depth` | 25 / 50 / 75 / 90% of a page, once each per view | `percent_scrolled`, `page_path` |
| `view_section` | A `data-ga-view` section first becomes 35% visible | `section`, `page_path` |
| `click` | Outbound link to another domain | `outbound: true`, `link_url`, `link_domain`, `link_text` |
| `file_download` | Link to pdf/doc/xls/zip/media | `file_name`, `file_extension`, `link_url` |
| `contact_click` | `mailto:` or `tel:` link | `method` (`email`/`phone`), `contact_target` |

### Conversion funnel

| Event | Fires when | Key parameters |
| --- | --- | --- |
| `form_start` | First focus in the contact or quote form | `form_name` |
| `form_submit` | Submit pressed | `form_name`, `monthly_orders`, `sales_channels` |
| `generate_lead` | Server accepted the submission — **mark as a conversion in GA4** | `form_name`, `lead_type`, `monthly_orders` |
| `form_error` | Submission failed | `form_name`, `error_message` |
| `cta_click` | Any call-to-action button/link | `cta_location`, `cta_text`, `cta_destination`, `cta_type` |
| `select_plan` | A pricing plan CTA | `plan_name`, `plan_price`, `cta_text` |

`cta_location` values: `hero`, `navbar`, `navbar_sticky`, `mobile_nav`,
`head_office_drawer`, `services`, `about`, `why_choose_us`, `faq`,
`cta_banner`, `pricing`, `product_hero`, `industry_hero`,
`integration_detail`, `case_study_spotlight`, `coming_soon`, `video_section`.

Product, industry, and integration CTAs also carry `product_name` /
`industry_name` / `integration_name` so demand can be attributed per page.

**No PII is ever sent** — forms report the order-volume band and sales
channels only, never names, emails, phone numbers, or message text.

### Navigation

| Event | Fires when | Key parameters |
| --- | --- | --- |
| `nav_click` | Navbar, mobile nav, footer, or article sidebar link | `nav_location`, `nav_group`, `nav_item`, `link_url` |
| `logo_click` | Logo | `link_url` |
| `social_click` | Footer / drawer social icon | `social_network`, `nav_location` |
| `menu_open` / `menu_close` | Mobile nav or head-office drawer | `menu_name` |
| `nav_group_open` / `nav_group_close` | Mobile nav section expanded | `nav_group` |
| `search_open` | Navbar search opened | `nav_location`, `device` |
| `search` | Navbar query submitted, or blog search settles (800ms) | `search_term`, `search_location`, `result_count` |

### Content engagement

| Event | Fires when | Key parameters |
| --- | --- | --- |
| `select_content` | Blog post, case study, or doc/help article card clicked | `content_type`, `content_id`, `item_name`, `item_category` |
| `faq_open` / `faq_close` | FAQ question toggled (accordion and native `<details>`) | `faq_question`, `faq_index`, `faq_location` |
| `video_open` | Demo/testimonial lightbox opened | `video_title`, `cta_location` |
| `video_start` | Playback begins | `video_title`, `video_provider`, `video_duration` |
| `video_progress` | 10 / 25 / 50 / 75% watched | `video_percent`, `video_current_time` |
| `video_complete` | Video finished | `video_percent: 100` |
| `carousel_navigate` | Case-study prev/next/dot | `carousel_name`, `direction`, `slide_index` |
| `carousel_slide_view` | A different slide becomes active | `carousel_name`, `slide_index`, `case_study` |
| `tab_select` | Product solutions tab | `tab_group`, `tab_name`, `tab_index` |
| `filter_apply` / `filter_remove` / `filter_clear` | Blog category/author filters | `filter_type`, `filter_value`, `filter_location` |
| `theme_change` | Dark/light toggle | `theme` |

## GA4 setup checklist

1. Mark **`generate_lead`** as a key event (conversion).
2. Register custom dimensions for the parameters you want to segment by —
   GA4 only reports registered ones: `cta_location`, `cta_text`, `form_name`,
   `lead_type`, `monthly_orders`, `nav_location`, `nav_item`, `plan_name`,
   `faq_question`, `content_type`, `item_name`, `section`, `video_title`.
3. In *Enhanced measurement*, leave page views on but note that this site
   sends them manually — do **not** also enable "page changes based on
   browser history events", or navigations will be double counted.
