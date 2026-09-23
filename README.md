# AI Business Platform

A security-first SaaS foundation for AI-powered business tools and automation.

## Stack
- Next.js + TypeScript
- Vercel
- Supabase Auth + Postgres + RLS
- n8n for automation
- AI provider APIs
- Stripe/payment integration later, only when the account and legal requirements are satisfied

## Security baseline
- Never commit secrets.
- Keep server-only keys out of browser code.
- Enable RLS on every exposed Supabase table.
- Use least-privilege database grants.
- Validate all user input server-side.
- Verify external webhooks.
- Add rate limiting and abuse protection before public launch.
- Keep production and development credentials separate.

Supabase specifically recommends RLS for exposed tables and says service-role/secret keys must remain server-side.

## MVP roadmap
1. Authentication
2. Business workspace
3. Dashboard
4. AI assistant
5. Content tools
6. Automation builder
7. Usage limits
8. Billing
9. Monitoring and security hardening
