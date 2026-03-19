# Getting Started: Setup Guide

Everything you need to install before starting Project 1. This takes 30-60 minutes depending on your internet connection. You only do this once — every project uses the same tools.

---

## What You're Installing

| Tool | What It Does | When You'll Use It |
|---|---|---|
| VS Code | Your code editor — where you see the files AI creates | Every project |
| Git | Tracks every change to every file. Nothing is ever lost | Every project |
| GitHub CLI | Talks to GitHub from your terminal — creates repos, PRs, boards | Every project |
| Node.js | Runs JavaScript. Required for React projects | Every project |
| Docker | Runs databases and servers in isolated containers | Project 2 onwards |
| Claude Code | Your AI developer. You direct it, it writes the code | Every project |

---

## Step 1: VS Code

**What it is:** A free code editor from Microsoft. You won't write code in it — you'll read what Claude creates and verify it.

**Install:**
1. Go to https://code.visualstudio.com
2. Download for your operating system (Mac, Windows, or Linux)
3. Install it (drag to Applications on Mac, run the installer on Windows)

**Verify it works:**
Open VS Code. You should see a welcome screen. That's it — you're done.

---

## Step 2: Git

**What it is:** Version control. Every change to every file is tracked. You can always go back.

**Mac:**
Open Terminal (Applications → Utilities → Terminal) and run:
```bash
git --version
```
If Git is installed, you'll see a version number. If not, macOS will prompt you to install Command Line Tools — click Install.

**Windows:**
1. Go to https://git-scm.com/download/win
2. Download and run the installer
3. Use all default settings
4. Open Windows Terminal or PowerShell and run:
```bash
git --version
```

**Linux:**
```bash
sudo apt update && sudo apt install git -y
git --version
```

**Configure Git (all platforms):**
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```
Use the same email as your GitHub account.

---

## Step 3: GitHub Account & CLI

**What it is:** GitHub stores your code online. The CLI lets you create repos, open PRs, and manage boards from the terminal.

**Create a GitHub account:**
Go to https://github.com and sign up (free).

**Install GitHub CLI:**

**Mac:**
```bash
brew install gh
```
If you don't have Homebrew, install it first:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**Windows:**
```bash
winget install GitHub.cli
```
Or download from https://cli.github.com

**Linux:**
```bash
sudo apt install gh -y
```

**Log in:**
```bash
gh auth login
```
Choose: GitHub.com → HTTPS → Login with a web browser. Follow the prompts.

**Verify:**
```bash
gh auth status
```
Should show "Logged in to github.com."

---

## Step 4: Node.js

**What it is:** Runs JavaScript. React (the frontend framework) needs it.

**Install:**
1. Go to https://nodejs.org
2. Download the LTS (Long Term Support) version — should be v20 or higher
3. Run the installer

**Verify:**
```bash
node --version
```
Should show v20.x.x or higher.

```bash
npm --version
```
Should show a version number. npm is the package manager that comes with Node.

---

## Step 5: Docker

**What it is:** Runs applications in isolated containers. From Project 2 onwards, your database, backend, and frontend all run in Docker.

**You don't need Docker for Project 1.** Install it before starting Project 2.

**Mac:**
1. Go to https://www.docker.com/products/docker-desktop/
2. Download Docker Desktop for Mac
3. Install (drag to Applications)
4. Open Docker Desktop — it runs in the background

**Windows:**
1. Go to https://www.docker.com/products/docker-desktop/
2. Download Docker Desktop for Windows
3. Install and restart your computer if prompted
4. Open Docker Desktop

**Linux:**
```bash
sudo apt update
sudo apt install docker.io docker-compose-v2 -y
sudo usermod -aG docker $USER
```
Log out and back in for the group change to take effect.

**Verify:**
```bash
docker --version
docker compose version
```
Both should show version numbers.

**Common issue:** Docker Desktop must be running before you use Docker commands. On Mac and Windows, look for the whale icon in your system tray.

---

## Step 6: Claude Code

**What it is:** Your AI developer. You tell it what to build, it writes the code, creates files, opens PRs, and reports back.

**You need:** A Claude Pro or Max subscription from https://claude.ai

**Install:**
```bash
npm install -g @anthropic-ai/claude-code
```

**Verify:**
```bash
claude --version
```

**Start Claude Code:**
Navigate to your project directory and run:
```bash
claude
```
Claude Code starts an interactive session. You type directions, it executes them.

---

## Step 7: Create Your Working Directory

All your buildwith.dev projects will live in one place:

```bash
mkdir -p ~/buildwith/projects
cd ~/buildwith/projects
```

---

## Accounts You'll Need

| Account | Free? | When |
|---|---|---|
| GitHub | Yes | Project 1 (already done in Step 3) |
| Claude (Pro or Max) | No — subscription required | Project 1 |
| Gemini API key | Yes — free tier | Project 2 |
| Netlify or Vercel | Yes — free tier | Project 1 (deploy) |
| Stripe (test mode) | Yes — free test account | Arc B Project 3 (payments) |

**Gemini API key (needed for Project 2):**
1. Go to https://aistudio.google.com/apikey
2. Sign in with a Google account
3. Click "Create API Key"
4. Copy and save the key somewhere safe — you'll add it to GitHub Secrets later

**Netlify account (needed for Project 1 deploy):**
1. Go to https://netlify.com
2. Sign up with your GitHub account
3. That's it — Claude will handle the deployment configuration

---

## Verify Everything Works

Run these commands. All should succeed:

```bash
git --version          # Shows version number
gh auth status         # Shows "Logged in to github.com"
node --version         # Shows v20.x.x or higher
npm --version          # Shows version number
code --version         # Shows VS Code version (may need to add to PATH)
claude --version       # Shows Claude Code version
```

For Docker (only needed from Project 2):
```bash
docker --version           # Shows version number
docker compose version     # Shows version number
```

---

## Troubleshooting

### "command not found: brew" (Mac)
Homebrew isn't installed. Run the install command from Step 3.

### "command not found: code"
VS Code isn't in your PATH. Open VS Code → press Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows) → type "Shell Command" → click "Install 'code' command in PATH."

### "docker: command not found"
Docker Desktop isn't installed or isn't running. Install it from Step 5 and make sure the Docker Desktop application is open.

### "gh auth login" hangs or fails
Try: `gh auth login --web` to force browser-based authentication.

### "npm install -g" gives permission errors (Mac/Linux)
Run with sudo: `sudo npm install -g @anthropic-ai/claude-code`
Or better, configure npm's global directory: https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally

### "I'm on Windows and the terminal looks different"
Use Windows Terminal or PowerShell, not Command Prompt (cmd.exe). Windows Terminal is pre-installed on Windows 11. On Windows 10, install it from the Microsoft Store.

---

## You're Ready

Once all verification commands pass, you're set up. These tools stay installed — you'll use them for every project.

**Next:** Start Project 1. Open the step-by-step guide and begin.
