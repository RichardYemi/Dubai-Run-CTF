# 🌐 Deployment Guide - Host Your CTF Platform Online

## Making Your Platform Accessible to Students Anywhere

This guide shows you multiple ways to deploy your Dubai Run CTF platform so students can access it from anywhere with an internet connection.

---

## 🎯 Quick Recommendation

**Best Option for Students:** Option 3 (Railway) or Option 4 (Render)
- ✅ Free tier available
- ✅ Easy setup (10-15 minutes)
- ✅ No credit card required
- ✅ Auto-deploy from GitHub
- ✅ HTTPS included
- ✅ Perfect for educational use

---

## 📋 Deployment Options Overview

| Option | Cost | Difficulty | Time | Best For |
|--------|------|------------|------|----------|
| 1. Replit | Free | ⭐ Easy | 5 min | Quick testing |
| 2. Heroku | $5-7/mo | ⭐⭐ Medium | 15 min | Reliable hosting |
| 3. Railway | Free* | ⭐ Easy | 10 min | **Recommended** |
| 4. Render | Free* | ⭐ Easy | 10 min | **Recommended** |
| 5. DigitalOcean | $6/mo | ⭐⭐⭐ Hard | 30 min | Advanced users |
| 6. Vercel + Railway | Free* | ⭐⭐ Medium | 20 min | Best performance |

*Free tier has limitations but sufficient for class sizes

---

## 🚀 Option 1: Replit (Easiest - 5 Minutes)

### Perfect for: Quick demos, testing, small classes (<10 students)

### Steps:

1. **Create Replit Account**
   - Go to https://replit.com
   - Sign up (free)

2. **Import Project**
   - Click "Create Repl"
   - Choose "Import from GitHub" (or upload ZIP)
   - Upload your ctf-platform folder

3. **Configure**
   - Replit will auto-detect Node.js
   - Create `.replit` file:
   ```
   run = "npm start & cd frontend && npm run dev"
   ```

4. **Install Dependencies**
   ```bash
   npm install
   cd frontend && npm install
   ```

5. **Run**
   - Click "Run" button
   - Replit will give you a URL like: `https://your-project.your-username.repl.co`

6. **Share with Students**
   - Copy the URL
   - Share with students
   - They can access from anywhere!

### Pros:
- ✅ Extremely easy
- ✅ No configuration needed
- ✅ Instant deployment

### Cons:
- ❌ Goes to sleep after inactivity
- ❌ Limited resources on free tier
- ❌ Not ideal for >10 concurrent users

---

## 🚀 Option 2: Heroku (Reliable - 15 Minutes)

### Perfect for: Reliable hosting, medium classes (up to 50 students)

### Steps:

1. **Install Heroku CLI**
   ```bash
   # Download from: https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login**
   ```bash
   heroku login
   ```

3. **Create App**
   ```bash
   cd ctf-platform
   heroku create dubai-run-ctf
   ```

4. **Configure Environment**
   ```bash
   heroku config:set JWT_SECRET=your-super-secret-key-here
   heroku config:set NODE_ENV=production
   ```

5. **Create Procfile**
   Create file named `Procfile` in root:
   ```
   web: node server.js
   ```

6. **Modify for Production**
   Update `server.js` to serve frontend:
   ```javascript
   // Add before app.listen()
   app.use(express.static(path.join(__dirname, 'frontend/dist')));
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
   });
   ```

7. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   cd ..
   ```

8. **Deploy**
   ```bash
   git init
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

9. **Your URL**
   - `https://dubai-run-ctf.herokuapp.com`
   - Share this with students!

### Cost:
- **Eco Dynos**: $5/month
- **Basic**: $7/month (better for classes)

### Pros:
- ✅ Very reliable
- ✅ 24/7 uptime
- ✅ Auto-scaling
- ✅ Built-in SSL

### Cons:
- ❌ Not free anymore (as of 2022)
- ❌ Requires credit card

---

## 🚀 Option 3: Railway (RECOMMENDED - 10 Minutes)

### Perfect for: Free hosting, easy deployment, great for education

### Steps:

1. **Create GitHub Repository**
   - Go to https://github.com
   - Create new repository: `dubai-run-ctf`
   - Upload your code

2. **Sign Up Railway**
   - Go to https://railway.app
   - Sign up with GitHub (free)

3. **Deploy Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `dubai-run-ctf` repository
   - Railway auto-detects Node.js

4. **Configure Environment Variables**
   - In Railway dashboard, go to Variables
   - Add:
     ```
     JWT_SECRET=your-super-secret-key
     PORT=5000
     NODE_ENV=production
     ```

5. **Deploy Frontend Separately**
   - Add another service for frontend
   - Or build frontend and serve from backend

6. **Generate Domain**
   - Click "Generate Domain"
   - Get URL like: `dubai-run-ctf.up.railway.app`

7. **Share with Students**
   - Copy the URL
   - Students access from anywhere!

### Free Tier:
- $5 credit per month (free)
- Sufficient for most classes
- 500 hours uptime

### Pros:
- ✅ Free tier available
- ✅ Very easy setup
- ✅ Auto-deploys from GitHub
- ✅ Built-in SSL
- ✅ Great for education

### Cons:
- ❌ Limited free hours
- ❌ Need to monitor usage

---

## 🚀 Option 4: Render (RECOMMENDED - 10 Minutes)

### Perfect for: Free hosting, zero configuration, students access 24/7

### Steps:

1. **Create GitHub Account & Upload Code**
   - Upload your project to GitHub

2. **Sign Up Render**
   - Go to https://render.com
   - Sign up (free)

3. **Create Web Service**
   - Click "New +"
   - Select "Web Service"
   - Connect GitHub repository

4. **Configure Backend**
   - **Name**: dubai-run-ctf-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: Free

5. **Environment Variables**
   ```
   JWT_SECRET=your-super-secret-key
   PORT=5000
   NODE_ENV=production
   ```

6. **Create Frontend Service**
   - New Web Service
   - **Name**: dubai-run-ctf-frontend
   - **Root Directory**: frontend
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run preview`

7. **Get Your URLs**
   - Backend: `https://dubai-run-ctf-backend.onrender.com`
   - Frontend: `https://dubai-run-ctf.onrender.com`

8. **Update Frontend API URL**
   In `frontend/src/App.jsx`, update:
   ```javascript
   const API_URL = 'https://dubai-run-ctf-backend.onrender.com/api';
   ```

### Free Tier:
- ✅ Completely free
- ✅ 750 hours/month
- ✅ Auto-sleep after 15min inactivity
- ✅ Wakes up on request

### Pros:
- ✅ Totally free
- ✅ No credit card needed
- ✅ Easy setup
- ✅ Auto-deploy from GitHub

### Cons:
- ❌ Sleeps after inactivity (30s wake-up time)
- ❌ Limited resources on free tier

---

## 🚀 Option 5: DigitalOcean Droplet (Advanced - 30 Minutes)

### Perfect for: Full control, larger classes, long-term use

### Steps:

1. **Create Droplet**
   - Go to https://www.digitalocean.com
   - Create account
   - Create Ubuntu 22.04 Droplet ($6/month)

2. **SSH into Server**
   ```bash
   ssh root@your-droplet-ip
   ```

3. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```

4. **Upload Your Code**
   ```bash
   # On your local machine:
   scp -r ctf-platform root@your-droplet-ip:/root/
   ```

5. **Install Dependencies**
   ```bash
   cd /root/ctf-platform
   npm install
   cd frontend && npm install && npm run build
   ```

6. **Start with PM2**
   ```bash
   cd /root/ctf-platform
   pm2 start server.js --name ctf-backend
   pm2 save
   pm2 startup
   ```

7. **Configure Nginx**
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/ctf
   ```

   Add:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   sudo ln -s /etc/nginx/sites-available/ctf /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

8. **Set Up Domain**
   - Buy domain (Namecheap, GoDaddy)
   - Point A record to your Droplet IP

9. **Enable HTTPS**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

### Cost:
- **Droplet**: $6/month
- **Domain**: ~$12/year (optional)

### Pros:
- ✅ Full control
- ✅ High performance
- ✅ Can handle many users
- ✅ Custom domain

### Cons:
- ❌ More complex setup
- ❌ Requires server management
- ❌ Monthly cost

---

## 🚀 Option 6: Vercel + Railway (Best Performance - 20 Minutes)

### Perfect for: Best user experience, separate frontend/backend

### Steps:

1. **Deploy Backend to Railway** (see Option 3)

2. **Deploy Frontend to Vercel**
   - Go to https://vercel.com
   - Import from GitHub
   - Select `frontend` folder
   - Auto-deploys!

3. **Update API URL**
   In `frontend/src/App.jsx`:
   ```javascript
   const API_URL = 'https://your-railway-backend.up.railway.app/api';
   ```

4. **Custom Domain (Optional)**
   - Add domain in Vercel settings
   - Point DNS to Vercel

### Pros:
- ✅ Ultra-fast frontend (Vercel CDN)
- ✅ Separate services
- ✅ Easy to scale
- ✅ Free tier available

---

## 🔐 Security Checklist

Before deploying to students:

- [ ] Change default admin passwords
- [ ] Update JWT_SECRET to strong random value
- [ ] Enable HTTPS (most platforms do this automatically)
- [ ] Set NODE_ENV=production
- [ ] Test all features in production
- [ ] Create team accounts beforehand
- [ ] Add challenges and test flags
- [ ] Backup database regularly

---

## 📱 Sharing with Students

### After Deployment:

1. **Send Email/Announcement**
   ```
   Subject: Dubai Run CTF 2024 - Access Information

   Dear Students,

   Welcome to the Dubai Run CTF Competition!

   🌐 Platform URL: https://your-platform-url.com
   📚 Course: SEC 432 - Cybersecurity
   🏛️ Zayed University - CTI

   Team Login Credentials:
   - Your team name will be provided separately
   - Use the password: student

   Competition starts: [Date/Time]
   Competition ends: [Date/Time]

   Good luck! 🏆
   ```

2. **Create Quick Access**
   - Share URL in Blackboard/Moodle
   - Post in WhatsApp/Discord group
   - Create QR code for easy mobile access

3. **Test Before Competition**
   - Have 1-2 students test login
   - Verify flag submission works
   - Check leaderboard updates

---

## 🆘 Troubleshooting

### Students Can't Access?
- ✅ Check if platform is running
- ✅ Verify URL is correct
- ✅ Check if using HTTPS (not HTTP)
- ✅ Ensure firewall allows connections

### Platform is Slow?
- ✅ Upgrade hosting plan
- ✅ Optimize database queries
- ✅ Enable caching
- ✅ Use CDN for frontend

### Database Issues?
- ✅ Backup regularly
- ✅ Use persistent storage (not temp)
- ✅ Monitor disk space

---

## 💡 Pro Tips

1. **Use Custom Domain** (optional but professional)
   - Buy: `dubairunctf.com` or similar
   - Makes URL memorable
   - More professional

2. **Monitor Usage**
   - Check logs regularly
   - Monitor server resources
   - Watch for errors

3. **Backup Database**
   - Before competition
   - During competition (every few hours)
   - After competition

4. **Have Backup Plan**
   - Deploy to 2 platforms
   - Have local version ready
   - Export data regularly

5. **Test Everything**
   - Test week before competition
   - Have students do dry run
   - Verify all features work

---

## 📊 Recommended Setup for Your Class

### For Zayed University SEC 432:

**Best Option: Railway (Backend) + Vercel (Frontend)**

**Why:**
- ✅ Free for educational use
- ✅ Easy deployment
- ✅ Fast performance
- ✅ Auto-deploys from GitHub
- ✅ HTTPS included
- ✅ Can handle 50+ students

**Estimated Time:** 20 minutes
**Cost:** $0
**Difficulty:** Easy

---

## 🎯 Quick Start Commands

### Option 3 (Railway) - Quick Deploy:

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/dubai-run-ctf.git
git push -u origin main

# 2. Deploy on Railway
# - Go to railway.app
# - New Project → Deploy from GitHub
# - Select your repository
# - Add environment variables
# - Generate domain
# - Done! Share URL with students
```

---

## 📞 Support Resources

If you need help:
- Railway Discord: https://discord.gg/railway
- Render Community: https://render.com/community
- DigitalOcean Tutorials: https://www.digitalocean.com/community/tutorials

---

## ✅ Final Checklist

Before students access:

- [ ] Platform deployed and accessible
- [ ] HTTPS enabled
- [ ] Default credentials changed
- [ ] Teams created
- [ ] Challenges added with correct flags
- [ ] Tested flag submission
- [ ] Tested leaderboard updates
- [ ] Backup plan ready
- [ ] URL shared with students
- [ ] Support contact provided

---

**Platform:** Dubai Run CTF 2024  
**Institution:** Zayed University  
**Course:** SEC 432 - College of Technological Innovation

Your students will be able to access from:
- 💻 Laptops
- 📱 Mobile phones
- 🖥️ Lab computers
- 🏠 Home
- ☕ Anywhere with internet!
