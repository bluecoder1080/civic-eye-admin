# Deployment Guide - Jharkhand Municipal Portal

## 🚀 Quick Deploy Options

### Option 1: Docker Deployment (Recommended)

1. **Prerequisites**
   ```bash
   # Install Docker and Docker Compose
   # Windows: Download Docker Desktop
   # Linux: sudo apt install docker.io docker-compose
   ```

2. **Deploy with Docker Compose**
   ```bash
   # Clone and navigate to project
   git clone <your-repo-url>
   cd Admin-Portal-CivicIssue

   # Set environment variables
   cp .env.production .env

   # Build and start services
   docker-compose up -d
   ```

3. **Access Application**
   - Application: http://localhost:5000
   - MongoDB: localhost:27017

### Option 2: Cloud Deployment (Vercel + MongoDB Atlas)

1. **Setup MongoDB Atlas**
   - Create account at https://mongodb.com/atlas
   - Create cluster and get connection string
   - Update MONGO_URI in environment variables

2. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel --prod
   ```

3. **Environment Variables**
   Set in Vercel dashboard:
   ```
   NODE_ENV=production
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jharkhand_municipal_portal
   CORS_ORIGINS=https://your-vercel-app.vercel.app
   ```

### Option 3: Traditional Server Deployment

1. **Build Application**
   ```bash
   npm run install-all
   npm run build
   ```

2. **Start Production Server**
   ```bash
   NODE_ENV=production npm start
   ```

## 🔧 Environment Configuration

### Production Environment Variables (.env)
```bash
NODE_ENV=production
PORT=5000
MONGO_URI=your_mongodb_connection_string
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
SESSION_SECRET=your-super-secret-key-change-this
```

### Development Environment Variables
```bash
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/jharkhand_municipal_portal
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

## 📋 Pre-Deployment Checklist

- [ ] Update MONGO_URI with production database
- [ ] Set strong SESSION_SECRET
- [ ] Configure CORS_ORIGINS for your domain
- [ ] Test all API endpoints
- [ ] Verify file upload functionality
- [ ] Run database seed if needed: `npm run seed`
- [ ] Test admin login functionality
- [ ] Verify issue resolution workflow

## 🔒 Security Considerations

1. **Database Security**
   - Use MongoDB Atlas with IP whitelisting
   - Enable authentication
   - Use strong passwords

2. **Application Security**
   - Change default admin credentials
   - Use HTTPS in production
   - Set secure CORS origins
   - Use environment variables for secrets

3. **Server Security**
   - Keep dependencies updated
   - Use reverse proxy (nginx)
   - Enable rate limiting
   - Monitor logs

## 🏗️ Architecture

```
Frontend (React/Vite) → Backend (Express/Node.js) → Database (MongoDB)
```

### API Endpoints
- `GET /api/health` - Health check
- `GET /api/issues` - Get all issues
- `GET /api/issues/pending` - Get pending issues
- `GET /api/issues/resolved` - Get resolved issues
- `PATCH /api/issues/:id/resolve` - Resolve issue
- `GET /api/issues/stats` - Get statistics

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   - Server automatically tries next port (5001)
   - Or kill existing process: `lsof -ti:5000 | xargs kill -9`

2. **MongoDB Connection Failed**
   - Check MONGO_URI format
   - Verify network connectivity
   - Check MongoDB Atlas IP whitelist

3. **CORS Errors**
   - Update CORS_ORIGINS environment variable
   - Ensure frontend URL is included

4. **Build Failures**
   - Run `npm run install-all` first
   - Check Node.js version (requires 16+)
   - Clear node_modules and reinstall

## 📊 Monitoring

### Health Check
```bash
curl http://your-domain.com/api/health
```

### Logs
```bash
# Docker logs
docker-compose logs -f

# PM2 logs (if using PM2)
pm2 logs
```

## 🔄 Updates

### Update Application
```bash
git pull origin main
npm run build
docker-compose restart  # if using Docker
```

### Database Migration
```bash
# Backup first
mongodump --uri="your_mongo_uri"

# Run migrations if any
npm run migrate
```

## 📞 Support

For deployment issues:
1. Check logs for error messages
2. Verify environment variables
3. Test database connectivity
4. Check API endpoints with curl/Postman

---

**Note**: Replace placeholder values (your-domain.com, connection strings, etc.) with actual production values before deployment.
