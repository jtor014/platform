---
title: "Web dev setup"
description: "Install Web Development tools: Node.js, Docker, Gemini API key, Netlify"
page_type: "guide"
section: "web-dev"
prev: "/getting-started/setup"
next: "/web-dev/projects/1"
prerequisites: "Shared setup complete"
---
# Web Dev Setup

You've installed the shared tools. Now install what's needed for Web Development.

---

## 5. Node.js

**What it is:** The JavaScript runtime. The project tooling, build system, and web stack all depend on it.

**Target version:** Node.js 20 LTS. This is a deliberate choice — it's the current Long Term Support release with the widest compatibility. Don't install a newer version unless you have a reason.

**Install:**
1. Go to https://nodejs.org
2. Download the **LTS** version (should show v20.x.x)
3. Run the installer

**Verify:**
```bash
node --version
```
Should show v20.x.x.

```bash
npm --version
```
Should show a version number. npm is the package manager that comes with Node.

---

## 6. Docker

**What it is:** Runs applications in isolated containers. From Project 2 onwards, your database, backend, and frontend all run in Docker.

**You don't need Docker for Project 1.** Install it now so it's ready for Project 2.

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

**Windows note:** Docker Desktop for Windows works best with WSL 2 (Windows Subsystem for Linux). The Docker installer will prompt you to enable it. If you're comfortable with Linux, you can run all your development inside WSL Ubuntu — this gives you the same experience as Mac and Linux students.

---

## Accounts you'll need later

These aren't part of the base toolchain — you'll set them up when the projects need them. Create the accounts now so they're ready.

| Account | Free? | When you need it |
|---|---|---|
| Netlify | Yes — free tier | Project 1 (deployment) |
| Gemini API key | Yes — free tier | Project 2 (AI code reviewer) |

**Netlify account:**
1. Go to https://netlify.com
2. Sign up with your GitHub account
3. You'll connect it to your project repo in Project 1

**Gemini API key:**
1. Go to https://aistudio.google.com/apikey
2. Sign in with a Google account
3. Click "Create API Key"
4. Copy and save the key somewhere safe — you'll add it to GitHub Secrets in Project 2

---

## Verify everything

Run these commands. All should succeed:

```bash
node --version         # v20.x.x or higher
npm --version          # Version number
docker --version       # Version number
docker compose version # Version number
```

---

## Troubleshooting

### "docker: command not found"
Docker Desktop isn't installed or isn't running. Install it and make sure the Docker Desktop application is open.

### Docker permission denied on Linux
Run `sudo usermod -aG docker $USER` then log out and back in.

### Node.js version too old
Uninstall and reinstall from https://nodejs.org — get the LTS version.

---

## You're ready

All tools installed. Start Project 1.
