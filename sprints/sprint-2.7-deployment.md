# Sprint 2.7: Deployment and Final Checks

**ID:** 2.7  
**Time-box:** 30 minutes

## Title
Deploy to static hosting and verify production build

## LLM does
- Configure deployment to Cloudflare Pages or Vercel (whichever the Engineer prefers)
- Run `npm run build` to generate production static files
- Deploy the built files to the chosen platform
- Test the deployed URL on multiple devices (desktop, tablet if available)
- Verify all assets load correctly (no 404s, no CORS issues)
- Add deployment URL to README.md
- Create a final checklist in `docs/deployment_checklist.md` covering: build succeeds, all JSON files present, demo runs end-to-end, timing is 35-60s, P&IDs render correctly

## Engineer reviews
- Open the deployed URL and run the demo
- Verify it works identically to the local version
- Check that the URL is shareable (no authentication required)
- Test on a different device or browser if possible
- Review the deployment checklist and confirm all items are checked

## Output artifact
- Deployed static site (URL in README.md)
- `docs/deployment_checklist.md`

## Definition of done
Engineer opens the deployed URL on her phone, clicks "Run Agent," watches the full demo, and confirms "this is production-ready for the hackathon stage."

---

**END OF DAY 2** (Total: ~7.5 hours)

**TOTAL PROJECT TIME:** ~14 hours across 2 days