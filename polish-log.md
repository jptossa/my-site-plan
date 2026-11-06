# Ground Up Polish Log

## Motion
- Animated: hover and focus states on links and menu cards, 0.2 seconds each (job: gives feedback)
- Scroll reveals: none, on purpose
- Reduced motion: one rule turns off every transition; smooth scrolling only for visitors who haven't asked for less

## Images
- Photos served as WebP with a JPEG fallback
- Hero: 375 KB as a JPEG, 167 KB as a WebP; sizes 1300 and 2600 px wide
- Feature photos: 390 and 780 px wide (barista: 57 KB JPEG, 21 KB WebP)
- Five images lazy-loaded; the hero is not, and is marked high priority
- Logos and decorative icons are SVG

## Favicon and share image
- Favicon: SVG, plus .ico and an Apple touch icon, each with ?v=5 to force a refresh
- Open Graph title, description and image on the home page
- BUG: og:image is the relative path images/header-1300.jpg, not a full address

## Accessibility
- Language set to English; a "Skip to content" link is the first Tab stop
- Visible focus: 3px blue outline (#40a2ce), about 2.9:1 against white
- Text: brown #6b350e on white is 9.81:1 (passes AAA)
- Decorative icons have empty alt text; photos have real descriptions

## Performance (Lighthouse, mobile)
- Run it yourself before class and write the scores here
- One small script, deferred, that only builds the email link