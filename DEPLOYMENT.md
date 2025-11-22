# MCL TRANS Website Deployment

This static website can be deployed to various free hosting platforms.

## Quick Deploy Options

### GitHub Pages (Recommended)
1. Push code to GitHub
2. Go to Settings → Pages
3. Select main branch
4. Your site will be live at `https://yourusername.github.io/mcltrans/`

### Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

**Via Drag & Drop:**
1. Go to [netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire project folder
3. Done!

**Via CLI:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/yourusername/mcltrans)

```bash
npm install -g vercel
vercel --prod
```

### Cloudflare Pages
1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub repository
3. Build settings: None needed (static HTML)
4. Deploy!

## Important Notes

### Before Deploying:

1. **Update Contact Form**
   - The form currently simulates submission
   - Set up a backend service like:
     - [Formspree](https://formspree.io) (free tier)
     - [FormSubmit](https://formsubmit.co) (100% free)
     - Netlify Forms (if using Netlify)

2. **Add Favicon**
   - Replace `favicon.ico` with your actual favicon
   - Generate at [favicon.io](https://favicon.io)

3. **Update URLs**
   - Change `https://mcltrans.be/` in sitemap.xml to your actual domain
   - Update canonical URLs in index.html

4. **Custom Domain (Optional)**
   - All platforms support custom domains
   - Point your DNS to the hosting provider
   - SSL certificate is automatic

### Environment-Specific Files:

**For Netlify** - Create `netlify.toml`:
```toml
[build]
  publish = "."

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

**For Vercel** - Create `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

## Post-Deployment Checklist

- [ ] Test all language switches
- [ ] Verify contact form works
- [ ] Check mobile responsiveness
- [ ] Test on different browsers
- [ ] Run Lighthouse audit in Chrome DevTools
- [ ] Submit sitemap to Google Search Console
- [ ] Set up analytics (Google Analytics, Plausible, etc.)

## Performance Tips

All these platforms offer:
- ✅ Automatic HTTPS/SSL
- ✅ Global CDN
- ✅ Automatic compression
- ✅ DDoS protection
- ✅ Zero configuration needed

Your site should score 95+ on Google Lighthouse! 🚀
