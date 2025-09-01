# Toz En Güçlü — Production-Ready Static Website

[![Deploy to GitHub Pages](https://github.com/tozsolutions/tozenguclu/workflows/Deploy%20static%20site%20to%20GitHub%20Pages/badge.svg)](https://github.com/tozsolutions/tozenguclu/actions)

Modern, fast, and reliable web development company website built with performance and accessibility in mind.

🌐 **Live Site:** https://tozsolutions.github.io/tozenguclu/

## ✨ Features

- **Production Ready**: Complete deployment pipeline with GitHub Actions
- **PWA Support**: Service worker, manifest, offline functionality
- **SEO Optimized**: Structured data, meta tags, sitemap, robots.txt
- **Accessible**: WCAG compliant with proper ARIA labels
- **Responsive**: Mobile-first design with smooth interactions
- **Performance**: Optimized assets, caching, compression
- **Security**: CSP headers, security.txt, input validation
- **Modern Stack**: HTML5, CSS3, Vanilla JavaScript

## 🚀 Quick Start

### Local Development
```bash
# Clone the repository
git clone https://github.com/tozsolutions/tozenguclu.git
cd tozenguclu

# Install development dependencies
npm install

# Start local development server
npm run dev
# Visit: http://localhost:8080
```

### Production Deployment

**GitHub Pages (Automated):**
- Push to `main` branch triggers automatic deployment
- No additional configuration needed

**Docker Deployment:**
```bash
npm run docker:build
npm run docker:run
```

**Manual Deployment:**
- Upload all files to web server
- Ensure proper MIME types for `.svg` and `.json` files

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Run linting and validation
npm run lint         # Check HTML and CSS quality
npm run format       # Auto-format code
npm run test         # Run full test suite
npm run docker:build # Build Docker image
npm run docker:run   # Run Docker container
```

### Code Quality
- **HTML**: HTMLHint validation
- **CSS**: Stylelint with standard rules
- **JS**: ESLint-ready structure
- **Formatting**: Prettier configuration

## 📁 Project Structure

```
├── index.html              # Main page
├── 404.html               # Error page
├── css/
│   └── styles.css         # Minified styles
├── js/
│   └── main.js           # Enhanced interactions
├── assets/
│   ├── logo.svg          # Brand logo
│   ├── favicon.svg       # Favicon
│   └── og-cover.svg      # Social media image
├── manifest.json         # PWA manifest
├── sw.js                # Service worker
├── robots.txt           # SEO robots file
├── sitemap.xml          # SEO sitemap
├── humans.txt           # Credits
├── .well-known/
│   └── security.txt     # Security contact
├── Dockerfile           # Container config
├── nginx.conf           # Web server config
└── PRODUCTION_GUIDE.md  # Detailed deployment guide
```

## 🔧 Configuration

### Contact Form Setup
The contact form requires configuration for production use:

1. **Formspree (Recommended):**
   - Sign up at https://formspree.io
   - Replace simulation in `js/main.js` with actual endpoint

2. **Custom Backend:**
   - Implement form handler
   - Update submission logic in JavaScript

### Analytics (Optional)
Add Google Analytics by updating the HTML with your tracking ID.

### Environment Variables
Copy `.env.example` to `.env` and configure:
- `FORMSPREE_ENDPOINT`: Form submission endpoint
- `GOOGLE_ANALYTICS_ID`: Analytics tracking ID

## 🔒 Security Features

- Content Security Policy (CSP)
- Security headers via nginx
- Input validation and sanitization
- XSS protection
- CSRF protection ready

## 🎯 Performance

- **Lighthouse Score**: 95+ target
- **Core Web Vitals**: Optimized
- **Caching**: Static assets cached for 1 year
- **Compression**: Gzip enabled
- **PWA**: Offline functionality

## 🧪 Testing

```bash
npm test              # Run all tests
npm run validate      # HTML validation
npm run lint          # Code quality checks
```

## 📊 Monitoring

Recommended tools:
- Google PageSpeed Insights
- GTmetrix
- Lighthouse CI
- Uptime monitoring

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Run tests: `npm test`
4. Commit your changes
5. Push to the branch
6. Open a Pull Request

## 📝 License

© 2024 Toz Solutions. All rights reserved.

## 🆘 Support

- [Issues](https://github.com/tozsolutions/tozenguclu/issues)
- [Security](https://github.com/tozsolutions/tozenguclu/security)
- [Documentation](./PRODUCTION_GUIDE.md)

---

Built with ❤️ for the modern web.

