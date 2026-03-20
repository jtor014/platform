export interface PageEntry {
  route: string;
  title: string;
  description: string;
  section: string;
  navLabel: string;
  navParent?: string;
  order: number;
  contentFile: string;
  layout: 'landing' | 'docs';
  prev?: string;
  next?: string;
}

export const manifest: PageEntry[] = [
  // === Shared ===
  {
    route: '/',
    title: 'Home',
    description: 'Learn to deliver real projects by directing AI.',
    section: 'home',
    navLabel: 'Home',
    order: 0,
    contentFile: 'getting-started/homepage.md',
    layout: 'landing',
  },
  {
    route: '/templates',
    title: 'Templates',
    description: 'Copy-paste templates for PRDs, architecture docs, backlogs, and more.',
    section: 'templates',
    navLabel: 'Templates',
    order: 100,
    contentFile: 'templates/*.md',
    layout: 'docs',
  },

  // === Web Dev Category ===
  {
    route: '/web-dev',
    title: 'Web Development',
    description: 'Six projects from static site to live system. Build real web software with AI.',
    section: 'web-dev',
    navLabel: 'Web Development',
    navParent: 'Web Development',
    order: 10,
    contentFile: 'web-dev/category-landing.md',
    layout: 'docs',
  },
  {
    route: '/web-dev/getting-started',
    title: 'Getting started',
    description: 'How the methodology works and everything you need to install for Web Development.',
    section: 'web-dev',
    navLabel: 'Getting started',
    navParent: 'Web Development',
    order: 11,
    contentFile: 'getting-started/web-dev-setup.md',
    layout: 'docs',
    prev: '/web-dev',
    next: '/web-dev/projects',
  },

  // === Projects Landing ===
  {
    route: '/web-dev/projects',
    title: 'Projects',
    description: 'The process every project follows: Requirements → Design → Architecture → Implementation → Testing → Deployment → UAT → Monitoring.',
    section: 'web-dev',
    navLabel: 'Projects',
    navParent: 'Web Development',
    order: 19,
    contentFile: 'projects/project-1/landing.md',
    layout: 'docs',
    prev: '/web-dev/getting-started',
    next: '/web-dev/projects/1',
  },

  // === Project 1 ===
  {
    route: '/web-dev/projects/1',
    title: 'Project 1: The static site',
    description: 'Deploy a website to a real URL. Your first project.',
    section: 'web-dev',
    navLabel: 'Project 1',
    navParent: 'Projects',
    order: 20,
    contentFile: 'projects/project-1/landing.md',
    layout: 'docs',
    prev: '/web-dev/projects',
    next: '/web-dev/projects/1/requirements',
  },
  {
    route: '/web-dev/projects/1/requirements',
    title: 'Requirements: GreenScape',
    description: 'Requirements and product definition for the GreenScape static site project.',
    section: 'web-dev',
    navLabel: 'Requirements',
    navParent: 'Project 1',
    order: 21,
    contentFile: 'projects/project-1/prd-greenscape.md',
    layout: 'docs',
    prev: '/web-dev/projects/1',
    next: '/web-dev/projects/1/design',
  },
  {
    route: '/web-dev/projects/1/design',
    title: 'Design specification',
    description: 'Design spec for GreenScape: functionality, layouts, colours, typography, spacing.',
    section: 'web-dev',
    navLabel: 'Design spec',
    navParent: 'Project 1',
    order: 22,
    contentFile: 'projects/project-1/design-spec-greenscape.md',
    layout: 'docs',
    prev: '/web-dev/projects/1/requirements',
    next: '/web-dev/projects/1/architecture',
  },
  {
    route: '/web-dev/projects/1/architecture',
    title: 'Architecture: GreenScape',
    description: 'Technical architecture for GreenScape: tech stack, components, data flow.',
    section: 'web-dev',
    navLabel: 'Architecture',
    navParent: 'Project 1',
    order: 22.5,
    contentFile: 'projects/project-1/landing.md',
    layout: 'docs',
    prev: '/web-dev/projects/1/design',
    next: '/web-dev/projects/1/implementation',
  },
  {
    route: '/web-dev/projects/1/implementation',
    title: 'Implementation',
    description: 'How the implementation phase works: direct Claude through tickets, verify each one, and ship.',
    section: 'web-dev',
    navLabel: 'Implementation',
    navParent: 'Project 1',
    order: 24,
    contentFile: 'projects/project-1/step-by-step-guide.md',
    layout: 'docs',
    prev: '/web-dev/projects/1/architecture',
    next: '/web-dev/projects/1/implementation/backlog',
  },
  {
    route: '/web-dev/projects/1/implementation/backlog',
    title: 'BACKLOG: GreenScape',
    description: 'Ticket backlog for the GreenScape project.',
    section: 'web-dev',
    navLabel: 'Backlog',
    navParent: 'Implementation',
    order: 24.1,
    contentFile: 'projects/project-1/backlog-greenscape.md',
    layout: 'docs',
    prev: '/web-dev/projects/1/implementation',
    next: '/web-dev/projects/1/implementation/setup',
  },
  {
    route: '/web-dev/projects/1/implementation/setup',
    title: 'Setup',
    description: 'Create the project folder, open VS Code, launch Claude, and hand over the project files.',
    section: 'web-dev',
    navLabel: 'Setup',
    navParent: 'Implementation',
    order: 24.2,
    contentFile: 'projects/project-1/step-by-step-guide.md',
    layout: 'docs',
    prev: '/web-dev/projects/1/implementation/backlog',
    next: '/web-dev/projects/1/implementation/first-ticket',
  },
  {
    route: '/web-dev/projects/1/implementation/first-ticket',
    title: 'Your first ticket',
    description: 'Deep dive on the full ticket cycle: direct, verify, review, merge.',
    section: 'web-dev',
    navLabel: 'First ticket',
    navParent: 'Implementation',
    order: 24.3,
    contentFile: 'projects/project-1/step-by-step-guide.md',
    layout: 'docs',
    prev: '/web-dev/projects/1/implementation/setup',
    next: '/web-dev/projects/1/implementation/remaining-tickets',
  },
  {
    route: '/web-dev/projects/1/implementation/remaining-tickets',
    title: 'Remaining tickets',
    description: 'Work through the rest of the backlog independently.',
    section: 'web-dev',
    navLabel: 'Remaining tickets',
    navParent: 'Implementation',
    order: 24.4,
    contentFile: 'projects/project-1/step-by-step-guide.md',
    layout: 'docs',
    prev: '/web-dev/projects/1/implementation/first-ticket',
    next: '/web-dev/projects/1/testing',
  },
  {
    route: '/web-dev/projects/1/testing',
    title: 'Testing',
    description: 'Verify your static site with Lighthouse, DevTools, and real-device testing.',
    section: 'web-dev',
    navLabel: 'Testing',
    navParent: 'Project 1',
    order: 25,
    contentFile: 'projects/project-1/step-by-step-guide.md',
    layout: 'docs',
    prev: '/web-dev/projects/1/implementation/remaining-tickets',
    next: '/web-dev/projects/1/deployment',
  },
  {
    route: '/web-dev/projects/1/deployment',
    title: 'Deployment',
    description: 'Deploy to Netlify and verify the live staging site.',
    section: 'web-dev',
    navLabel: 'Deployment',
    navParent: 'Project 1',
    order: 26,
    contentFile: 'projects/project-1/step-by-step-guide.md',
    layout: 'docs',
    prev: '/web-dev/projects/1/testing',
    next: '/web-dev/projects/1/uat',
  },
  {
    route: '/web-dev/projects/1/uat',
    title: 'UAT (User Acceptance Testing)',
    description: 'Show the client the staging site, collect feedback, and iterate.',
    section: 'web-dev',
    navLabel: 'UAT',
    navParent: 'Project 1',
    order: 27,
    contentFile: 'projects/project-1/step-by-step-guide.md',
    layout: 'docs',
    prev: '/web-dev/projects/1/deployment',
    next: '/web-dev/projects/1/monitoring',
  },
  {
    route: '/web-dev/projects/1/monitoring',
    title: 'Monitoring & Iteration',
    description: 'Go live, monitor, iterate, and reflect on the full cycle.',
    section: 'web-dev',
    navLabel: 'Monitoring',
    navParent: 'Project 1',
    order: 28,
    contentFile: 'projects/project-1/step-by-step-guide.md',
    layout: 'docs',
    prev: '/web-dev/projects/1/uat',
    next: '/web-dev/checkpoints/after-project-1',
  },

  // === Checkpoint 1 ===
  {
    route: '/web-dev/checkpoints/after-project-1',
    title: 'Checkpoint: After Project 1',
    description: 'Self-assessment exercises after completing Project 1.',
    section: 'web-dev',
    navLabel: 'After Project 1',
    navParent: 'Checkpoints',
    order: 70,
    contentFile: 'checkpoints/checkpoint-after-project-1.md',
    layout: 'docs',
    prev: '/web-dev/projects/1/monitoring',
    next: '/web-dev/projects/2',
  },

  // === Project 2 ===
  {
    route: '/web-dev/projects/2',
    title: 'Project 2: The dynamic app',
    description: 'Build a dynamic web application with CI and code review.',
    section: 'web-dev',
    navLabel: 'Project 2',
    navParent: 'Projects',
    order: 30,
    contentFile: 'projects/project-2/landing.md',
    layout: 'docs',
    prev: '/web-dev/checkpoints/after-project-1',
    next: '/web-dev/projects/2/requirements',
  },
  {
    route: '/web-dev/projects/2/requirements',
    title: 'Requirements: FactFeed',
    description: 'Requirements and product definition for FactFeed.',
    section: 'web-dev',
    navLabel: 'Requirements',
    navParent: 'Project 2',
    order: 31,
    contentFile: 'projects/project-2/prd-factfeed.md',
    layout: 'docs',
    prev: '/web-dev/projects/2',
    next: '/web-dev/projects/2/design',
  },
  {
    route: '/web-dev/projects/2/design',
    title: 'Design specification',
    description: 'Design spec for FactFeed: colours, typography, component specs, states, and responsive behaviour.',
    section: 'web-dev',
    navLabel: 'Design spec',
    navParent: 'Project 2',
    order: 31.5,
    contentFile: 'projects/project-2/prd-factfeed.md',
    layout: 'docs',
    prev: '/web-dev/projects/2/requirements',
    next: '/web-dev/projects/2/architecture',
  },
  {
    route: '/web-dev/projects/2/architecture',
    title: 'Architecture: FactFeed',
    description: 'Technical architecture for FactFeed: Docker, services, data flow, and key decisions.',
    section: 'web-dev',
    navLabel: 'Architecture',
    navParent: 'Project 2',
    order: 31.7,
    contentFile: 'projects/project-2/prd-factfeed.md',
    layout: 'docs',
    prev: '/web-dev/projects/2/design',
    next: '/web-dev/projects/2/claude-md',
  },
  {
    route: '/web-dev/projects/2/implementation',
    title: 'Implementation',
    description: 'Direct Claude through 11 tickets in two phases to build FactFeed.',
    section: 'web-dev',
    navLabel: 'Implementation',
    navParent: 'Project 2',
    order: 32,
    contentFile: 'projects/project-2/step-by-step-guide.md',
    layout: 'docs',
    prev: '/web-dev/projects/2/claude-md',
    next: '/web-dev/projects/2/implementation/backlog',
  },
  {
    route: '/web-dev/projects/2/implementation/backlog',
    title: 'BACKLOG: FactFeed',
    description: 'Ticket backlog for FactFeed with Phase A and Phase B.',
    section: 'web-dev',
    navLabel: 'Backlog',
    navParent: 'Implementation',
    order: 32.1,
    contentFile: 'projects/project-2/backlog-factfeed.md',
    layout: 'docs',
    prev: '/web-dev/projects/2/implementation',
    next: '/web-dev/projects/2/implementation/phase-a',
  },
  {
    route: '/web-dev/projects/2/implementation/phase-a',
    title: 'Phase A: The Stack Appears',
    description: 'Tickets 1–5: Docker, containers, CI, Gemini, and the database.',
    section: 'web-dev',
    navLabel: 'Phase A',
    navParent: 'Implementation',
    order: 32.2,
    contentFile: 'projects/project-2/step-by-step-guide.md',
    layout: 'docs',
    prev: '/web-dev/projects/2/implementation/backlog',
    next: '/web-dev/projects/2/implementation/phase-b',
  },
  {
    route: '/web-dev/projects/2/implementation/phase-b',
    title: 'Phase B: The System Proves Itself',
    description: 'Tickets 6–11: worker, API, frontend, full request flow.',
    section: 'web-dev',
    navLabel: 'Phase B',
    navParent: 'Implementation',
    order: 32.3,
    contentFile: 'projects/project-2/step-by-step-guide.md',
    layout: 'docs',
    prev: '/web-dev/projects/2/implementation/phase-a',
    next: '/web-dev/projects/2/testing',
  },
  {
    route: '/web-dev/projects/2/testing',
    title: 'Testing',
    description: 'Verify FactFeed with pytest, API testing, error states, and CI results.',
    section: 'web-dev',
    navLabel: 'Testing',
    navParent: 'Project 2',
    order: 33,
    contentFile: 'projects/project-2/step-by-step-guide.md',
    layout: 'docs',
    prev: '/web-dev/projects/2/implementation/phase-b',
    next: '/web-dev/projects/2/deployment',
  },
  {
    route: '/web-dev/projects/2/deployment',
    title: 'Deployment',
    description: 'Deploy FactFeed full stack to a staging environment.',
    section: 'web-dev',
    navLabel: 'Deployment',
    navParent: 'Project 2',
    order: 34,
    contentFile: 'projects/project-2/step-by-step-guide.md',
    layout: 'docs',
    prev: '/web-dev/projects/2/testing',
    next: '/web-dev/projects/2/uat',
  },
  {
    route: '/web-dev/projects/2/uat',
    title: 'UAT (User Acceptance Testing)',
    description: 'Show the reviewer the staging app, collect feedback, and iterate.',
    section: 'web-dev',
    navLabel: 'UAT',
    navParent: 'Project 2',
    order: 35,
    contentFile: 'projects/project-2/step-by-step-guide.md',
    layout: 'docs',
    prev: '/web-dev/projects/2/deployment',
    next: '/web-dev/projects/2/monitoring',
  },
  {
    route: '/web-dev/projects/2/monitoring',
    title: 'Monitoring & Iteration',
    description: 'Final verification, monitoring, iteration, and what is next.',
    section: 'web-dev',
    navLabel: 'Monitoring',
    navParent: 'Project 2',
    order: 36,
    contentFile: 'projects/project-2/step-by-step-guide.md',
    layout: 'docs',
    prev: '/web-dev/projects/2/uat',
    next: '/web-dev/checkpoints/after-project-2',
  },
  {
    route: '/web-dev/projects/2/claude-md',
    title: 'CLAUDE.md',
    description: 'Pre-filled CLAUDE.md for the FactFeed project.',
    section: 'web-dev',
    navLabel: 'CLAUDE.md',
    navParent: 'Architecture',
    order: 31.8,
    contentFile: 'projects/project-2/claude-md-factfeed.md',
    layout: 'docs',
    prev: '/web-dev/projects/2/architecture',
    next: '/web-dev/projects/2/implementation',
  },

  // === Checkpoint 2 ===
  {
    route: '/web-dev/checkpoints/after-project-2',
    title: 'Checkpoint: After Project 2',
    description: 'Self-assessment exercises after completing Project 2.',
    section: 'web-dev',
    navLabel: 'After Project 2',
    navParent: 'Checkpoints',
    order: 71,
    contentFile: 'checkpoints/checkpoint-after-project-2.md',
    layout: 'docs',
    prev: '/web-dev/projects/2/monitoring',
    next: '/web-dev/projects/3',
  },

  // === Guides ===
  {
    route: '/web-dev/guides/ci-setup',
    title: 'CI pipeline setup',
    description: 'Set up GitHub Actions CI for your project.',
    section: 'web-dev',
    navLabel: 'CI setup',
    navParent: 'Guides',
    order: 90,
    contentFile: 'guides/ci-setup-guide.md',
    layout: 'docs',
  },
  {
    route: '/web-dev/guides/gemini-setup',
    title: 'Gemini reviewer setup',
    description: 'Set up Gemini as an automated PR reviewer.',
    section: 'web-dev',
    navLabel: 'Gemini setup',
    navParent: 'Guides',
    order: 91,
    contentFile: 'guides/gemini-setup-guide.md',
    layout: 'docs',
  },

  // === Project 3 (stub) ===
  {
    route: '/web-dev/projects/3',
    title: 'Project 3: The interactive app',
    description: 'Forms, validation, email. You plan it yourself from a client brief.',
    section: 'web-dev',
    navLabel: 'Project 3',
    navParent: 'Projects',
    order: 37,
    contentFile: 'projects/project-1/landing.md',
    layout: 'docs',
    prev: '/web-dev/checkpoints/after-project-2',
    next: '/web-dev/checkpoints/after-project-3',
  },

  // === Project 4 (stub) ===
  {
    route: '/web-dev/projects/4',
    title: 'Project 4: The integrated app',
    description: 'Third-party API integration (Stripe, Google Maps, or similar).',
    section: 'web-dev',
    navLabel: 'Project 4',
    navParent: 'Projects',
    order: 38,
    contentFile: 'projects/project-1/landing.md',
    layout: 'docs',
    prev: '/web-dev/checkpoints/after-project-3',
    next: '/web-dev/checkpoints/after-project-4',
  },

  // === Project 5 (stub) ===
  {
    route: '/web-dev/projects/5',
    title: 'Project 5: The multi-user app',
    description: 'Auth, roles, permissions. Different users see different things.',
    section: 'web-dev',
    navLabel: 'Project 5',
    navParent: 'Projects',
    order: 39,
    contentFile: 'projects/project-1/landing.md',
    layout: 'docs',
    prev: '/web-dev/checkpoints/after-project-4',
    next: '/web-dev/checkpoints/after-project-5',
  },

  // === Checkpoints 3-6 ===
  {
    route: '/web-dev/checkpoints/after-project-3',
    title: 'Checkpoint: After Project 3',
    description: 'Self-assessment exercises after completing Project 3.',
    section: 'web-dev',
    navLabel: 'After Project 3',
    navParent: 'Checkpoints',
    order: 75,
    contentFile: 'checkpoints/checkpoint-after-project-3.md',
    layout: 'docs',
  },
  {
    route: '/web-dev/checkpoints/after-project-4',
    title: 'Checkpoint: After Project 4',
    description: 'Self-assessment exercises after completing Project 4.',
    section: 'web-dev',
    navLabel: 'After Project 4',
    navParent: 'Checkpoints',
    order: 76,
    contentFile: 'checkpoints/checkpoint-after-project-4.md',
    layout: 'docs',
  },
  {
    route: '/web-dev/checkpoints/after-project-5',
    title: 'Checkpoint: After Project 5',
    description: 'Self-assessment exercises after completing Project 5.',
    section: 'web-dev',
    navLabel: 'After Project 5',
    navParent: 'Checkpoints',
    order: 77,
    contentFile: 'checkpoints/checkpoint-after-project-5.md',
    layout: 'docs',
    next: '/web-dev/projects/6',
  },

  // === Project 6 ===
  {
    route: '/web-dev/projects/6',
    title: 'Project 6: The live system',
    description: 'Operate a live system — monitoring, incidents, and handover.',
    section: 'web-dev',
    navLabel: 'Project 6',
    navParent: 'Projects',
    order: 35,
    contentFile: 'projects/project-6/project-6-universal.md',
    layout: 'docs',
    prev: '/web-dev/checkpoints/after-project-5',
    next: '/web-dev/checkpoints/after-project-6',
  },

  // === Checkpoint 6 ===
  {
    route: '/web-dev/checkpoints/after-project-6',
    title: 'Checkpoint: After Project 6',
    description: 'Final self-assessment after completing all six projects.',
    section: 'web-dev',
    navLabel: 'After Project 6',
    navParent: 'Checkpoints',
    order: 78,
    contentFile: 'checkpoints/checkpoint-after-project-6.md',
    layout: 'docs',
    prev: '/web-dev/projects/6',
    next: '/',
  },
];

// Helper to find a page by route
export function getPage(route: string): PageEntry | undefined {
  return manifest.find((p) => p.route === route);
}

// Helper to get prev/next pages
export function getPageNav(route: string): { prev?: PageEntry; next?: PageEntry } {
  const page = getPage(route);
  return {
    prev: page?.prev ? getPage(page.prev) : undefined,
    next: page?.next ? getPage(page.next) : undefined,
  };
}

// Helper to get breadcrumb trail
export function getBreadcrumbs(route: string): { label: string; href: string }[] {
  const crumbs: { label: string; href: string }[] = [];
  if (route === '/') return crumbs;

  crumbs.push({ label: 'Home', href: '/' });

  const page = getPage(route);
  if (!page) return crumbs;

  // Build intermediate crumbs from navParent chain
  if (page.navParent) {
    const parentPage = manifest.find(
      (p) => p.navLabel === page.navParent || p.title === page.navParent
    );
    if (parentPage && parentPage.route !== route) {
      // Check if the parent itself has a parent
      if (parentPage.navParent) {
        const grandparent = manifest.find(
          (p) => p.navLabel === parentPage.navParent || p.title === parentPage.navParent
        );
        if (grandparent && grandparent.route !== parentPage.route) {
          crumbs.push({ label: grandparent.navLabel, href: grandparent.route });
        }
      }
      crumbs.push({ label: parentPage.navLabel, href: parentPage.route });
    }
  }

  crumbs.push({ label: page.navLabel, href: page.route });
  return crumbs;
}

// Navigation structure for sidebar
export interface NavSection {
  label: string;
  href?: string;
  children: NavItem[];
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export function getNavSections(): NavSection[] {
  return [
    {
      label: 'Web Development',
      href: '/web-dev',
      children: [
        { label: 'Getting started', href: '/web-dev/getting-started' },
        {
          label: 'Projects',
          href: '/web-dev/projects',
          children: [
            {
              label: 'Project 1',
              href: '/web-dev/projects/1',
              children: [
                { label: 'Requirements', href: '/web-dev/projects/1/requirements' },
                { label: 'Design spec', href: '/web-dev/projects/1/design' },
                { label: 'Architecture', href: '/web-dev/projects/1/architecture' },
                {
                  label: 'Implementation',
                  href: '/web-dev/projects/1/implementation',
                  children: [
                    { label: 'Backlog', href: '/web-dev/projects/1/implementation/backlog' },
                    { label: 'Setup', href: '/web-dev/projects/1/implementation/setup' },
                    { label: 'First ticket', href: '/web-dev/projects/1/implementation/first-ticket' },
                    { label: 'Remaining tickets', href: '/web-dev/projects/1/implementation/remaining-tickets' },
                  ],
                },
                { label: 'Testing', href: '/web-dev/projects/1/testing' },
                { label: 'Deployment', href: '/web-dev/projects/1/deployment' },
                { label: 'UAT', href: '/web-dev/projects/1/uat' },
                { label: 'Monitoring', href: '/web-dev/projects/1/monitoring' },
              ],
            },
            {
              label: 'Project 2',
              href: '/web-dev/projects/2',
              children: [
                { label: 'Requirements', href: '/web-dev/projects/2/requirements' },
                { label: 'Design spec', href: '/web-dev/projects/2/design' },
                {
                  label: 'Architecture',
                  href: '/web-dev/projects/2/architecture',
                  children: [
                    { label: 'CLAUDE.md', href: '/web-dev/projects/2/claude-md' },
                  ],
                },
                {
                  label: 'Implementation',
                  href: '/web-dev/projects/2/implementation',
                  children: [
                    { label: 'Backlog', href: '/web-dev/projects/2/implementation/backlog' },
                    { label: 'Phase A', href: '/web-dev/projects/2/implementation/phase-a' },
                    { label: 'Phase B', href: '/web-dev/projects/2/implementation/phase-b' },
                  ],
                },
                { label: 'Testing', href: '/web-dev/projects/2/testing' },
                { label: 'Deployment', href: '/web-dev/projects/2/deployment' },
                { label: 'UAT', href: '/web-dev/projects/2/uat' },
                { label: 'Monitoring', href: '/web-dev/projects/2/monitoring' },
              ],
            },
            { label: 'Project 3', href: '/web-dev/projects/3' },
            { label: 'Project 4', href: '/web-dev/projects/4' },
            { label: 'Project 5', href: '/web-dev/projects/5' },
            { label: 'Project 6', href: '/web-dev/projects/6' },
          ],
        },
        {
          label: 'Checkpoints',
          href: '/web-dev/checkpoints/after-project-1',
          children: [
            { label: 'After Project 1', href: '/web-dev/checkpoints/after-project-1' },
            { label: 'After Project 2', href: '/web-dev/checkpoints/after-project-2' },
            { label: 'After Project 3', href: '/web-dev/checkpoints/after-project-3' },
            { label: 'After Project 4', href: '/web-dev/checkpoints/after-project-4' },
            { label: 'After Project 5', href: '/web-dev/checkpoints/after-project-5' },
            { label: 'After Project 6', href: '/web-dev/checkpoints/after-project-6' },
          ],
        },
        {
          label: 'Guides',
          href: '/web-dev/guides/ci-setup',
          children: [
            { label: 'CI setup', href: '/web-dev/guides/ci-setup' },
            { label: 'Gemini setup', href: '/web-dev/guides/gemini-setup' },
          ],
        },
      ],
    },
    {
      label: 'Templates',
      children: [{ label: 'All templates', href: '/templates' }],
    },
  ];
}
