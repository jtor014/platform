---
title: "Shared setup"
description: "Install the tools every category needs: VS Code, Git, GitHub CLI, Claude Code"
page_type: "guide"
section: "getting-started"
prev: "/getting-started"
next: "/web-dev/getting-started"
---
# Shared Setup

Four tools make the workflow possible: an editor to read what AI produces, version control to track every change, a platform to host your code and manage PRs, and an AI developer to do the building. Install these once — they work across all categories.

---

## 1. VS Code

**What it is:** A free code editor. You won't write code in it — you'll read what Claude creates and verify it.

**Install:**
1. Go to https://code.visualstudio.com
2. Download for your operating system (Mac, Windows, or Linux)
3. Install it

**Verify:**
```bash
code --version
```
You should see a version number.

---

## 2. Git

**What it is:** Version control. Every change to every file is tracked. You can always go back.

**Mac:**
```bash
git --version
```
If Git is installed, you'll see a version number. If not, macOS will prompt you to install Command Line Tools — click Install.

**Windows:**
1. Go to https://git-scm.com/download/win
2. Download and run the installer
3. Use all default settings

**Linux:**
```bash
sudo apt update && sudo apt install git -y
```

**Configure (all platforms):**
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```
Use the same email as your GitHub account.

**Verify:**
```bash
git --version
```

---

## 3. GitHub Account & CLI

**What it is:** GitHub stores your code online. The CLI lets you create repos, open PRs, and manage boards from the terminal.

**Create a GitHub account:** Go to https://github.com and sign up (free).

**Install GitHub CLI:**

**Mac:**
```bash
brew install gh
```
If you don't have Homebrew:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**Windows:**
```bash
winget install GitHub.cli
```

**Linux:**
```bash
sudo apt install gh -y
```

**Log in:**
```bash
gh auth login
```
Choose: GitHub.com → HTTPS → Login with a web browser.

**Verify:**
```bash
gh auth status
```
Should show "Logged in to github.com."

---

## 4. Claude Code

**What it is:** Your AI developer. You direct it from the terminal — it writes code, creates files, runs tests, and opens pull requests.

**You need:** A Claude Pro ($20/month) or Max subscription from https://claude.ai. This gives you access to Claude Code. Note: this is a subscription to claude.ai, not API credits — they're different products. You don't need an Anthropic API key.

**Install:**
```bash
npm install -g @anthropic-ai/claude-code
```

**Verify:**
```bash
claude --version
```

**First run:** When you run `claude` for the first time, it will ask you to authenticate through your browser. Log in with your Claude account.

---

## Accounts summary

| Account | Free? | Needed for |
|---|---|---|
| GitHub | Yes | Every category |
| Claude (Pro or Max) | No — subscription | Every category |

---

## Verify everything

Run these four commands. All should succeed:

```bash
code --version        # VS Code version number
git --version         # Git version number
gh auth status        # "Logged in to github.com"
claude --version      # Claude Code version number
```

If any command fails, check the troubleshooting section below.

---

## Troubleshooting

### "command not found: code"
Open VS Code → press Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows) → type "Shell Command" → click "Install 'code' command in PATH."

### "gh auth login" hangs or fails
Try: `gh auth login --web` to force browser-based authentication.

### "npm install -g" gives permission errors (Mac/Linux)
Run with sudo: `sudo npm install -g @anthropic-ai/claude-code`

### "I'm on Windows and the terminal looks different"
Use Windows Terminal or PowerShell, not Command Prompt (cmd.exe).

---

## Next

Install the tools specific to your category. For Web Development: Web Dev Setup.
