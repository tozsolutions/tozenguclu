# Toz En Güçlü - Deployment & Production Guide

## 🚀 Production Deployment

### GitHub Pages (Current Setup)
The site is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the `main` branch.

**Live URL:** https://tozsolutions.github.io/tozenguclu/

### Docker Deployment
For self-hosted deployments:

```bash
# Build the Docker image
npm run docker:build

# Run the container
npm run docker:run

# Test the deployment
npm run docker:test
```

The site will be available at `http://localhost:8080`

## 🛠️ Development

### Prerequisites
- Node.js 18+ (for development tools)
- Python 3 (for local server)
- Docker (for containerized deployment)

### Local Development
```bash
# Install development dependencies
npm install

# Start local development server
npm run dev

# Run linting
npm run lint

# Format code
npm run format

# Run all tests
npm run test
```

### Build Process
```bash
# Run full build with validation
npm run build
```

## 📋 Production Checklist

### ✅ Completed
- [x] Removed duplicate configurations
- [x] Fixed file path references for GitHub Pages
- [x] Added proper favicon and social media images
- [x] Enhanced nginx configuration with security headers
- [x] Created PWA manifest and service worker
- [x] Improved contact form with validation
- [x] Added comprehensive linting setup
- [x] Created package.json for dependency management
- [x] Added proper error handling and user feedback

### 🔧 Configuration Required
- [ ] Configure contact form endpoint (see Form Configuration below)
- [ ] Set up analytics (optional)
- [ ] Configure monitoring (optional)

## 📧 Form Configuration

The contact form currently uses a simulation. To enable real form submissions:

1. **Using Formspree (Recommended):**
   ```javascript
   // In js/main.js, replace simulateFormSubmission with:
   async function submitToFormspree(formData) {
     const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
       method: 'POST',
       body: formData,
       headers: {
         'Accept': 'application/json'
       }
     });
     if (!response.ok) {
       throw new Error('Form submission failed');
     }
     return response.json();
   }
   ```

2. **Using Netlify Forms:**
   - Add `data-netlify="true"` to form element
   - Deploy to Netlify

3. **Custom Backend:**
   - Implement your own form handler
   - Update the form action and submission logic

## 🔒 Security

### Implemented Security Measures
- Content Security Policy (CSP)
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- Input validation and sanitization
- HTTPS enforcement (via platform)

### Additional Recommendations
- Regularly update dependencies
- Monitor for security vulnerabilities
- Implement rate limiting for form submissions
- Consider adding CAPTCHA for spam protection

## 📊 Performance

### Current Optimizations
- Gzip compression
- Static asset caching
- Image optimization (SVG assets)
- Minified CSS
- Service worker for offline functionality

### Monitoring
Use tools like:
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Lighthouse CI (can be integrated into CI/CD)

## 🔄 Maintenance

### Regular Tasks
- Update dependencies (`npm update`)
- Run security audits (`npm audit`)
- Monitor performance metrics
- Review analytics data
- Update content as needed

### Automated Tasks
- GitHub Actions handles deployment
- Linting runs on every build
- Dependencies can be auto-updated with Dependabot

## 🚨 Troubleshooting

### Common Issues

1. **Paths not working on GitHub Pages:**
   - Ensure all paths are relative (no leading slash)
   - Check if `base` tag is needed

2. **Service Worker not updating:**
   - Hard refresh (Ctrl+Shift+R)
   - Check browser dev tools → Application → Service Workers

3. **Form not submitting:**
   - Check browser console for errors
   - Verify form endpoint configuration
   - Test with network tab open

4. **Docker container not starting:**
   - Check if port 8080 is available
   - Verify nginx configuration syntax

### Support
For technical issues or questions:
- Check the repository issues
- Review browser console for errors
- Test with browser dev tools network tab

## 📈 Analytics Setup (Optional)

To add Google Analytics:

1. Get tracking ID from Google Analytics
2. Add to `.env` file: `GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX`
3. Add tracking script to HTML head:
   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

## 🌐 SEO Considerations

### Current SEO Features
- Semantic HTML structure
- Meta tags and Open Graph
- Sitemap.xml
- Robots.txt
- Structured data (JSON-LD)
- Fast loading times
- Mobile-responsive design

### Additional SEO Improvements
- Add more structured data
- Implement breadcrumbs
- Add meta descriptions for all pages
- Create blog/content sections
- Implement internal linking strategy

---

**Last Updated:** [Generated dynamically]
**Version:** 1.0.0