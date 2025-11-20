# 🚀 Quick Start Guide - Dubai Run CTF 2024

## Zayed University - SEC 432 Cybersecurity Competition
**College of Technological Innovation**

---

## What You Get

This is a complete Dubai Run themed CTF (Capture The Flag) platform with:
- **Admin Panel**: Create teams and challenges manually
- **Student Portal**: Login and submit flags
- **Real-time Leaderboard**: Automatic score updates
- **Beautiful Visualizations**: Charts and graphs

---

## ⚡ Quick Setup (5 minutes)

### Step 1: Install Backend
```bash
cd ctf-platform
npm install
npm start
```
✅ Backend runs on `http://localhost:5000`

### Step 2: Install Frontend
```bash
cd frontend
npm install
npm run dev
```
✅ Frontend runs on `http://localhost:3000`

### Step 3: Open Browser
Go to: `http://localhost:3000`

---

## 🎯 Quick Walkthrough

### As Admin (First Time)

1. **Login**
   - Click "Admin" button
   - Username: `Instructor` / Password: `admin` OR
   - Username: `Admin` / Password: `admin123`

2. **Create Teams** (Admin Tab)
   - **Default teams already created:**
     - Team: `Falcon_Hunt` / Password: `student`
     - Team: `Eagles_Eye` / Password: `student`
   - **To add more teams:**
   - Team Name: `Team Alpha`
   - Password: `password123`
   - Click "Create Team"
   
3. **Add Challenges** (Admin Tab)
   - Name: `Easy Web Challenge`
   - Category: `Web`
   - Points: `100`
   - Flag: `CTF{welcome_to_ctf}`
   - Difficulty: `Easy`
   - Click "Create Challenge"

### As Student

1. **Login**
   - Click "Team" button
   - Team Name: `Falcon_Hunt` (or `Eagles_Eye`)
   - Password: `student`

2. **Submit Flag** (Submit Flag Tab)
   - Select challenge
   - Enter flag: `CTF{welcome_to_ctf}`
   - Watch your score increase! 🎉

---

## 🔑 Key Features

### Admin Can:
- ✅ Create teams with passwords
- ✅ Add challenges with flags to database
- ✅ Delete teams/challenges
- ✅ View all flags
- ✅ Monitor real-time statistics

**Default Admin Accounts:**
- `Instructor` / `admin`
- `Admin` / `admin123`

### Students Can:
- ✅ Login with team credentials
- ✅ View all challenges (without flags)
- ✅ Submit flags for points
- ✅ See real-time leaderboard
- ✅ Track solved challenges

**Default Team Accounts:**
- `Falcon_Hunt` / `student`
- `Eagles_Eye` / `student`

### Real-time Features:
- ✅ Automatic leaderboard updates every 10 seconds
- ✅ Live score tracking
- ✅ Charts and analytics
- ✅ Category statistics

---

## 📊 Database Structure

All data stored in `ctf.db` (SQLite):
- **Teams**: ID, Name, Password (hashed), Score
- **Challenges**: ID, Name, Description, Category, Points, Flag, Difficulty
- **Submissions**: Team-Challenge pairs with timestamps
- **Admins**: Username, Password (hashed)

---

## 🎨 Screenshots Overview

### Login Screen
- Switch between Team/Admin
- Secure authentication

### Leaderboard
- Real-time rankings
- Team scores and solve counts
- Last solve timestamps

### Challenges
- Category badges (Web, Crypto, Pwn, etc.)
- Difficulty indicators
- Solve counts
- Solved challenges marked with ✓

### Submit Flag
- Challenge dropdown
- Flag input field
- Instant feedback

### Admin Panel
- Create teams form
- Create challenges form
- Delete teams/challenges
- Quick statistics

### Analytics
- Category statistics bar chart
- Quick stats cards
- Total teams, challenges, solves

---

## 🛡️ Security Features

- Passwords hashed with bcrypt
- JWT authentication
- Protected API routes
- SQL injection prevention
- No flags visible to students

---

## 💡 Pro Tips

1. **Create Multiple Teams**: Test with different team accounts
2. **Vary Point Values**: 100 (Easy), 300 (Medium), 500 (Hard)
3. **Use Flag Format**: Always use `CTF{...}` format
4. **Monitor Leaderboard**: Watch real-time updates as teams submit
5. **Reset Database**: Delete `ctf.db` to start fresh

---

## 🐛 Common Issues

**Q: Backend won't start?**
A: Make sure port 5000 is free

**Q: Frontend won't connect?**
A: Ensure backend is running first

**Q: Login doesn't work?**
A: Check backend console for errors

**Q: Want to reset?**
A: Delete `ctf.db` and restart backend

---

## 📱 Workflow Example

```
Day 1: Admin Setup
↓
Admin creates 10 teams
Admin adds 20 challenges
Shares credentials with students

Day 2: Competition
↓
Students login with team credentials
Students solve challenges
Students submit flags
Leaderboard updates in real-time

Day 3: Results
↓
View final leaderboard
Export statistics
Announce winners 🏆
```

---

## 🔄 Need to Change Something?

### Change Admin Password
Edit `server.js` line with default admin creation

### Add More Categories
Add to category dropdown in frontend `App.jsx`

### Change Port
Backend: Edit `PORT` in `server.js`
Frontend: Edit `server.port` in `vite.config.js`

### Change JWT Secret
Edit `JWT_SECRET` in `server.js`

---

## ✨ That's It!

You now have a fully functional CTF platform where:
- **You manually create teams and challenges**
- **Students login and submit flags**
- **Leaderboard updates automatically**
- **Everything is tracked in the database**

**Enjoy your CTF competition! 🎯🚩**
