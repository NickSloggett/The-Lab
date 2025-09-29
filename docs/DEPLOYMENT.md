# 🚢 Deployment Guide

> Deploy The Lab to production in minutes

This guide covers deploying all parts of The Lab to various platforms.

---

## 🌐 Web App Deployment

### Vercel (Recommended)

**Why Vercel?**
- Zero config deployment
- Automatic HTTPS
- Global CDN
- Automatic previews for PRs
- Built by Next.js creators

**Steps:**

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
cd web
vercel --prod
```

**Environment Variables:**

Add these in Vercel Dashboard → Settings → Environment Variables:

```bash
DATABASE_URL=your_production_db_url
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your_secret_key
OPENAI_API_KEY=your_key
# Add all other required env vars
```

**Custom Domain:**

1. Go to Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as shown

---

### Netlify

```bash
# 1. Install Netlify CLI
npm i -g netlify-cli

# 2. Login
netlify login

# 3. Deploy
cd web
netlify deploy --prod
```

---

### Docker

```bash
# Build image
docker build -t thelab-web ./web

# Run
docker run -p 3000:3000 \
  -e DATABASE_URL=your_db_url \
  -e OPENAI_API_KEY=your_key \
  thelab-web
```

---

## 🤖 AI Backend Deployment

### Railway

**Steps:**

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Select The-Lab repository
5. Set root directory to `ai-automation-boilerplate`
6. Add environment variables
7. Deploy!

**Cost:** ~$5-20/month depending on usage

---

### Render

```bash
# Create render.yaml in ai-automation-boilerplate/
services:
  - type: web
    name: thelab-ai
    env: python
    buildCommand: poetry install
    startCommand: poetry run uvicorn src.api:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: OPENAI_API_KEY
        sync: false
```

Deploy via Render Dashboard or CLI.

---

### Fly.io

```bash
# 1. Install Fly CLI
curl -L https://fly.io/install.sh | sh

# 2. Login
fly auth login

# 3. Launch
cd ai-automation-boilerplate
fly launch

# 4. Deploy
fly deploy
```

---

## 📱 iOS App Deployment

### TestFlight (Beta Testing)

1. **Archive the App**
   - Open Xcode
   - Product → Archive
   - Wait for archive to complete

2. **Upload to App Store Connect**
   - Window → Organizer
   - Select your archive
   - Click "Distribute App"
   - Choose "App Store Connect"
   - Follow prompts

3. **Set Up TestFlight**
   - Go to App Store Connect
   - Select your app
   - Go to TestFlight tab
   - Add internal testers (team)
   - Add external testers (beta users)
   - Submit for beta review

**Beta users can install via:**
- TestFlight app on iOS
- Invitation link

---

### App Store (Production)

1. **Prepare App Store Listing**
   - App name and description
   - Screenshots (required sizes)
   - App icon
   - Privacy policy URL
   - Support URL

2. **Submit for Review**
   - Go to App Store Connect
   - Select your app
   - Create new version
   - Fill in all required info
   - Submit for review

3. **Review Process**
   - Usually 1-3 days
   - May request changes
   - Approve release after approval

**Requirements:**
- Developer account ($99/year)
- All required metadata
- App must follow guidelines

---

## 🤖 Android App Deployment

### Google Play Store

1. **Create App Bundle**
   ```bash
   cd web/apps/android
   cd android
   ./gradlew bundleRelease
   ```

2. **Sign the Bundle**
   - Generate keystore
   - Configure signing in `android/app/build.gradle`

3. **Upload to Play Console**
   - Go to [play.google.com/console](https://play.google.com/console)
   - Create new app
   - Upload AAB file
   - Fill in store listing
   - Submit for review

---

### Internal Testing

1. **Create Internal Test Track**
   - Go to Play Console
   - Select Testing → Internal testing
   - Upload your APK/AAB
   - Add testers via email

2. **Share Test Link**
   - Testers receive email
   - Install from Play Store (test version)

---

## 🐳 Docker Deployment (All Services)

### Docker Compose (Single Server)

```bash
# Build and start all services
docker-compose -f docker-compose.prod.yml up -d

# Check logs
docker-compose logs -f

# Stop
docker-compose down
```

**`docker-compose.prod.yml`:**

```yaml
version: '3.8'

services:
  web:
    build: ./web
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
    restart: always

  ai-backend:
    build: ./ai-automation-boilerplate
    ports:
      - "8000:8000"
    environment:
      - ENVIRONMENT=production
    restart: always

  postgres:
    image: postgres:16-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always

  redis:
    image: redis:7-alpine
    restart: always
```

---

## ☸️ Kubernetes Deployment

### 1. Create Kubernetes Manifests

**`k8s/web-deployment.yaml`:**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: web
        image: your-registry/thelab-web:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-url
```

### 2. Deploy

```bash
# Apply configurations
kubectl apply -f k8s/

# Check status
kubectl get pods
kubectl get services

# View logs
kubectl logs -f deployment/web
```

---

## 🌍 CDN Setup

### Cloudflare

1. Sign up at [cloudflare.com](https://cloudflare.com)
2. Add your domain
3. Update nameservers
4. Configure:
   - Auto HTTPS
   - CDN caching
   - Firewall rules
   - Rate limiting

---

## 📊 Monitoring Setup

### Sentry (Error Tracking)

```bash
# Add to environment variables
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

```typescript
// web/src/app/layout.tsx
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
})
```

---

### Analytics

**Vercel Analytics:**

```typescript
// web/src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

---

## 🔒 Security Checklist

Before deploying to production:

- [ ] All secrets in environment variables
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] Database backups configured
- [ ] Error logging set up
- [ ] Security headers configured
- [ ] Dependencies updated
- [ ] Code reviewed

---

## 💰 Cost Estimates

### Minimum Viable Deployment

- **Web**: Vercel Free ($0)
- **Database**: Supabase Free ($0)
- **AI Backend**: Railway Hobby ($5)
- **AI API**: OpenAI ($10-50)
- **Total**: ~$15-55/month

### Startup Deployment (1k-10k users)

- **Web**: Vercel Pro ($20)
- **Database**: Managed PostgreSQL ($25)
- **AI Backend**: Railway Pro ($20)
- **CDN**: Cloudflare Pro ($20)
- **AI API**: OpenAI ($100-500)
- **Total**: ~$185-585/month

### Scale Deployment (10k-100k users)

- **Web**: Vercel Enterprise ($150+)
- **Database**: Managed PostgreSQL ($100+)
- **AI Backend**: Multiple instances ($100+)
- **CDN**: Cloudflare Business ($200+)
- **AI API**: OpenAI ($1000+)
- **Monitoring**: Datadog ($100+)
- **Total**: ~$1650+/month

---

## 🚨 Troubleshooting

### Build Failures

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working

- Check spelling and format
- Restart server after changes
- Verify in deployment platform

### Database Connection Issues

- Check DATABASE_URL format
- Verify database is accessible
- Check firewall rules
- Test connection locally

---

## 📚 Platform-Specific Guides

- **[Vercel Documentation](https://vercel.com/docs)**
- **[Railway Documentation](https://docs.railway.app)**
- **[Render Documentation](https://render.com/docs)**
- **[App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)**
- **[Play Store Guidelines](https://play.google.com/console/about/guides/)**

---

<div align="center">

**🎉 Your app is now live!**

[← Back to README](../README.md) | [Troubleshooting](../docs/TROUBLESHOOTING.md)

</div>

