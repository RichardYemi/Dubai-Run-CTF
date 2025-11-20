const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// JWT Secret (Change this in production!)
const JWT_SECRET = 'your-secret-key-change-this';

// Database setup
const db = new sqlite3.Database('./ctf.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  db.serialize(() => {
    // Teams table
    db.run(`CREATE TABLE IF NOT EXISTS teams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      team_name TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      score INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Challenges table
    db.run(`CREATE TABLE IF NOT EXISTS challenges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      category TEXT NOT NULL,
      points INTEGER NOT NULL,
      flag TEXT NOT NULL,
      difficulty TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Submissions table
    db.run(`CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      team_id INTEGER NOT NULL,
      challenge_id INTEGER NOT NULL,
      submitted_at TEXT NOT NULL,
      submission_time_ms INTEGER NOT NULL,
      FOREIGN KEY (team_id) REFERENCES teams(id),
      FOREIGN KEY (challenge_id) REFERENCES challenges(id),
      UNIQUE(team_id, challenge_id)
    )`);

    // Admin table
    db.run(`CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )`);

    // Create default admins
    const adminPassword1 = bcrypt.hashSync('admin', 10);
    const adminPassword2 = bcrypt.hashSync('admin123', 10);
    
    db.run(`INSERT OR IGNORE INTO admins (username, password) VALUES (?, ?)`, 
      ['Instructor', adminPassword1]);
    db.run(`INSERT OR IGNORE INTO admins (username, password) VALUES (?, ?)`, 
      ['Admin', adminPassword2]);
    
    // Create default teams
    const teamPassword = bcrypt.hashSync('student', 10);
    
    db.run(`INSERT OR IGNORE INTO teams (team_name, password) VALUES (?, ?)`, 
      ['Falcon_Hunt', teamPassword]);
    db.run(`INSERT OR IGNORE INTO teams (team_name, password) VALUES (?, ?)`, 
      ['Eagles_Eye', teamPassword]);
  });
}

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Middleware to verify admin
function authenticateAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

// ==================== AUTH ROUTES ====================

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM admins WHERE username = ?', [username], (err, admin) => {
    if (err || !admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (bcrypt.compareSync(password, admin.password)) {
      const token = jwt.sign({ id: admin.id, username: admin.username, isAdmin: true }, JWT_SECRET);
      res.json({ token, username: admin.username, isAdmin: true });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

// Team login
app.post('/api/team/login', (req, res) => {
  const { team_name, password } = req.body;

  db.get('SELECT * FROM teams WHERE team_name = ?', [team_name], (err, team) => {
    if (err || !team) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (bcrypt.compareSync(password, team.password)) {
      const token = jwt.sign({ id: team.id, team_name: team.team_name, isAdmin: false }, JWT_SECRET);
      res.json({ token, team_name: team.team_name, team_id: team.id, isAdmin: false });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

// ==================== TEAM ROUTES (Protected) ====================

// Create team (Admin only)
app.post('/api/admin/teams', authenticateToken, authenticateAdmin, (req, res) => {
  const { team_name, password } = req.body;

  if (!team_name || !password) {
    return res.status(400).json({ error: 'Team name and password required' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run('INSERT INTO teams (team_name, password) VALUES (?, ?)', 
    [team_name, hashedPassword], 
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.status(400).json({ error: 'Team name already exists' });
        }
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ 
        id: this.lastID, 
        team_name, 
        message: 'Team created successfully' 
      });
    }
  );
});

// Get all teams
app.get('/api/teams', authenticateToken, (req, res) => {
  db.all(`
    SELECT 
      t.id, 
      t.team_name, 
      t.score,
      COUNT(s.id) as solves,
      MAX(s.submitted_at) as last_solve
    FROM teams t
    LEFT JOIN submissions s ON t.id = s.team_id
    GROUP BY t.id
    ORDER BY t.score DESC, last_solve ASC
  `, (err, teams) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(teams);
  });
});

// Delete team (Admin only)
app.delete('/api/admin/teams/:id', authenticateToken, authenticateAdmin, (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM submissions WHERE team_id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    db.run('DELETE FROM teams WHERE id = ?', [id], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Team deleted successfully' });
    });
  });
});

// ==================== CHALLENGE ROUTES ====================

// Create challenge (Admin only)
app.post('/api/admin/challenges', authenticateToken, authenticateAdmin, (req, res) => {
  const { name, description, category, points, flag, difficulty } = req.body;

  if (!name || !category || !points || !flag) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.run(`INSERT INTO challenges (name, description, category, points, flag, difficulty) 
          VALUES (?, ?, ?, ?, ?, ?)`, 
    [name, description, category, points, flag, difficulty], 
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ 
        id: this.lastID, 
        name, 
        message: 'Challenge created successfully' 
      });
    }
  );
});

// Get all challenges (without flags for non-admin)
app.get('/api/challenges', authenticateToken, (req, res) => {
  const query = req.user.isAdmin 
    ? 'SELECT * FROM challenges ORDER BY points ASC'
    : 'SELECT id, name, description, category, points, difficulty, created_at FROM challenges ORDER BY points ASC';

  db.all(query, (err, challenges) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    // Add solve count to each challenge
    const challengesWithSolves = challenges.map(challenge => {
      return new Promise((resolve) => {
        db.get('SELECT COUNT(*) as solves FROM submissions WHERE challenge_id = ?', 
          [challenge.id], 
          (err, result) => {
            resolve({ ...challenge, solves: result ? result.solves : 0 });
          }
        );
      });
    });

    Promise.all(challengesWithSolves).then(results => {
      res.json(results);
    });
  });
});

// Update challenge (Admin only)
app.put('/api/admin/challenges/:id', authenticateToken, authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const { name, description, category, points, flag, difficulty } = req.body;

  db.run(`UPDATE challenges 
          SET name = ?, description = ?, category = ?, points = ?, flag = ?, difficulty = ?
          WHERE id = ?`, 
    [name, description, category, points, flag, difficulty, id], 
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Challenge updated successfully' });
    }
  );
});

// Delete challenge (Admin only)
app.delete('/api/admin/challenges/:id', authenticateToken, authenticateAdmin, (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM submissions WHERE challenge_id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    db.run('DELETE FROM challenges WHERE id = ?', [id], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Challenge deleted successfully' });
    });
  });
});

// ==================== SUBMISSION ROUTES ====================

// Submit flag
app.post('/api/submit', authenticateToken, (req, res) => {
  const { challenge_id, flag } = req.body;
  const team_id = req.user.id;

  if (!challenge_id || !flag) {
    return res.status(400).json({ error: 'Challenge ID and flag required' });
  }

  // Check if already solved
  db.get('SELECT * FROM submissions WHERE team_id = ? AND challenge_id = ?', 
    [team_id, challenge_id], 
    (err, submission) => {
      if (submission) {
        return res.status(400).json({ error: 'Challenge already solved by your team' });
      }

      // Verify flag
      db.get('SELECT * FROM challenges WHERE id = ?', [challenge_id], (err, challenge) => {
        if (err || !challenge) {
          return res.status(404).json({ error: 'Challenge not found' });
        }

        if (challenge.flag !== flag.trim()) {
          return res.status(400).json({ error: 'Incorrect flag' });
        }

        // Record submission
        const submissionTime = new Date().toISOString();
        const submissionTimeMs = Date.now();
        
        db.run('INSERT INTO submissions (team_id, challenge_id, submitted_at, submission_time_ms) VALUES (?, ?, ?, ?)', 
          [team_id, challenge_id, submissionTime, submissionTimeMs], 
          function(err) {
            if (err) {
              return res.status(500).json({ error: 'Database error' });
            }

            // Update team score
            db.run('UPDATE teams SET score = score + ? WHERE id = ?', 
              [challenge.points, team_id], 
              (err) => {
                if (err) {
                  return res.status(500).json({ error: 'Error updating score' });
                }

                res.json({ 
                  success: true, 
                  message: 'Correct flag!', 
                  points: challenge.points 
                });
              }
            );
          }
        );
      });
    }
  );
});

// Get team's solved challenges
app.get('/api/team/solved', authenticateToken, (req, res) => {
  const team_id = req.user.id;

  db.all(`
    SELECT c.id, c.name, c.category, c.points, s.submitted_at
    FROM submissions s
    JOIN challenges c ON s.challenge_id = c.id
    WHERE s.team_id = ?
    ORDER BY s.submitted_at DESC
  `, [team_id], (err, solves) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(solves);
  });
});

// ==================== STATISTICS ROUTES ====================

// Get leaderboard with solve history
app.get('/api/leaderboard', authenticateToken, (req, res) => {
  db.all(`
    SELECT 
      t.id, 
      t.team_name, 
      t.score,
      COUNT(s.id) as solves,
      MAX(s.submitted_at) as last_solve
    FROM teams t
    LEFT JOIN submissions s ON t.id = s.team_id
    GROUP BY t.id
    ORDER BY t.score DESC, last_solve ASC
  `, (err, teams) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(teams);
  });
});

// Get category statistics
app.get('/api/statistics/categories', authenticateToken, (req, res) => {
  db.all(`
    SELECT 
      category,
      COUNT(*) as total_challenges,
      SUM(points) as total_points,
      (SELECT COUNT(*) FROM submissions WHERE challenge_id IN 
        (SELECT id FROM challenges c2 WHERE c2.category = c.category)) as total_solves
    FROM challenges c
    GROUP BY category
  `, (err, stats) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(stats);
  });
});

// Get score history over time
app.get('/api/statistics/score-history', authenticateToken, (req, res) => {
  db.all(`
    SELECT 
      t.team_name,
      s.submitted_at,
      c.points,
      SUM(c.points) OVER (PARTITION BY t.id ORDER BY s.submitted_at) as cumulative_score
    FROM submissions s
    JOIN teams t ON s.team_id = t.id
    JOIN challenges c ON s.challenge_id = c.id
    ORDER BY s.submitted_at
  `, (err, history) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(history);
  });
});

// Get detailed submission statistics (Admin only)
app.get('/api/admin/submission-details', authenticateToken, authenticateAdmin, (req, res) => {
  db.all(`
    SELECT 
      s.id,
      t.team_name,
      c.name as challenge_name,
      c.category,
      c.points,
      c.difficulty,
      s.submitted_at,
      s.submission_time_ms,
      strftime('%Y-%m-%d %H:%M:%f', s.submitted_at) as formatted_time
    FROM submissions s
    JOIN teams t ON s.team_id = t.id
    JOIN challenges c ON s.challenge_id = c.id
    ORDER BY s.submitted_at ASC
  `, (err, submissions) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(submissions);
  });
});

// Get team-specific submission statistics
app.get('/api/statistics/team-submissions/:teamId', authenticateToken, (req, res) => {
  const { teamId } = req.params;
  
  db.all(`
    SELECT 
      s.id,
      t.team_name,
      c.name as challenge_name,
      c.category,
      c.points,
      c.difficulty,
      s.submitted_at,
      s.submission_time_ms,
      strftime('%Y-%m-%d %H:%M:%f', s.submitted_at) as formatted_time
    FROM submissions s
    JOIN teams t ON s.team_id = t.id
    JOIN challenges c ON s.challenge_id = c.id
    WHERE s.team_id = ?
    ORDER BY s.submitted_at ASC
  `, [teamId], (err, submissions) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(submissions);
  });
});

// Get comparative statistics for all teams by challenge
app.get('/api/statistics/challenge-comparison', authenticateToken, (req, res) => {
  db.all(`
    SELECT 
      c.id as challenge_id,
      c.name as challenge_name,
      c.category,
      c.points,
      t.team_name,
      s.submitted_at,
      s.submission_time_ms,
      strftime('%Y-%m-%d %H:%M:%f', s.submitted_at) as formatted_time,
      ROW_NUMBER() OVER (PARTITION BY c.id ORDER BY s.submitted_at) as solve_rank
    FROM challenges c
    LEFT JOIN submissions s ON c.id = s.challenge_id
    LEFT JOIN teams t ON s.team_id = t.id
    ORDER BY c.id, s.submitted_at ASC
  `, (err, comparisons) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(comparisons);
  });
});

// Export all statistics as CSV (Admin only)
app.get('/api/admin/export-csv', authenticateToken, authenticateAdmin, (req, res) => {
  db.all(`
    SELECT 
      s.id as submission_id,
      t.team_name,
      c.name as challenge_name,
      c.category,
      c.points,
      c.difficulty,
      s.submitted_at,
      s.submission_time_ms,
      strftime('%Y-%m-%d %H:%M:%f', s.submitted_at) as formatted_time
    FROM submissions s
    JOIN teams t ON s.team_id = t.id
    JOIN challenges c ON s.challenge_id = c.id
    ORDER BY s.submitted_at ASC
  `, (err, submissions) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    // Create CSV content
    let csv = 'Submission ID,Team Name,Challenge Name,Category,Points,Difficulty,Submission Date/Time,Timestamp (ms),Formatted Time\n';
    submissions.forEach(row => {
      csv += `${row.submission_id},${row.team_name},${row.challenge_name},${row.category},${row.points},${row.difficulty},${row.submitted_at},${row.submission_time_ms},${row.formatted_time}\n`;
    });
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=ctf-submissions.csv');
    res.send(csv);
  });
});

// Export leaderboard as CSV (Admin only)
app.get('/api/admin/export-leaderboard-csv', authenticateToken, authenticateAdmin, (req, res) => {
  db.all(`
    SELECT 
      t.id,
      t.team_name,
      t.score,
      COUNT(s.id) as solves,
      MAX(s.submitted_at) as last_solve,
      t.created_at
    FROM teams t
    LEFT JOIN submissions s ON t.id = s.team_id
    GROUP BY t.id
    ORDER BY t.score DESC, last_solve ASC
  `, (err, teams) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    // Create CSV content
    let csv = 'Rank,Team ID,Team Name,Score,Solves,Last Solve,Created At\n';
    teams.forEach((team, index) => {
      csv += `${index + 1},${team.id},${team.team_name},${team.score},${team.solves},${team.last_solve || 'N/A'},${team.created_at}\n`;
    });
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=ctf-leaderboard.csv');
    res.send(csv);
  });
});

// Export JSON statistics (Admin only)
app.get('/api/admin/export-json', authenticateToken, authenticateAdmin, (req, res) => {
  const statistics = {};
  
  // Get all data
  db.all('SELECT * FROM teams', (err, teams) => {
    statistics.teams = teams;
    
    db.all('SELECT * FROM challenges', (err, challenges) => {
      statistics.challenges = challenges;
      
      db.all(`
        SELECT 
          s.*,
          t.team_name,
          c.name as challenge_name,
          c.category,
          c.points
        FROM submissions s
        JOIN teams t ON s.team_id = t.id
        JOIN challenges c ON s.challenge_id = c.id
        ORDER BY s.submitted_at
      `, (err, submissions) => {
        statistics.submissions = submissions;
        statistics.exported_at = new Date().toISOString();
        
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename=ctf-statistics.json');
        res.json(statistics);
      });
    });
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Default admin credentials:`);
  console.log(`  1. Username: Instructor, Password: admin`);
  console.log(`  2. Username: Admin, Password: admin123`);
  console.log(`Default team credentials:`);
  console.log(`  1. Team: Falcon_Hunt, Password: student`);
  console.log(`  2. Team: Eagles_Eye, Password: student`);
});
