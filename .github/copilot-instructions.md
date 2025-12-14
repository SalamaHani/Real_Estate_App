# Copilot Instructions for Estate (Real Estate Platform)

## Project Overview
A full-stack real estate platform built with **Next.js 15**, **React 18**, **Prisma ORM**, and **MongoDB**. Features property listings, authentication (BetterAuth), real-time notifications (Pusher), Google Maps integration, and admin management.

## Architecture & Critical Patterns

### Core Tech Stack
- **Frontend**: Next.js 15.5.6, React 18, Tailwind CSS v4, shadcn/ui, Radix UI components
- **Backend**: Next.js API routes, Prisma ORM (MongoDB provider), BetterAuth
- **Real-time**: Pusher (pub/sub for notifications), Socket.io (custom server in `server.ts`)
- **Validation**: Zod schemas (all in `utils/schema.ts`)
- **Theme**: Dark mode with OKLch color system in `app/globals.css`

### Key Data Models (Prisma/MongoDB)
- **`listing`**: Core property model with embedded types (`ListingLocation`, `ListingAgents`, `ListingOffices`)
- **`user`**: BetterAuth-managed authentication (via `account`, `session`, `verification` models)
- **`favorite`**: User favorites with relation to `listing`
- **`Seavdsearchuser`**: Saved searches with JSON query field; triggers email notifications
- **`notification`**: Real-time alerts (type: NEW_LISTING, PRICE_CHANGE, REVIEW_REPLY, etc.)
- **`Areacuntry`**: Area/community metadata (demographics, schools, stores)

### Server Actions Pattern (`"use server"`)
All forms use Next.js Server Actions. Key examples:
- **`lib/listing-actions.ts`**: `createListingAction()`, `updateListingAction()`, `deleteListingAction()` — validate FormData with Zod, check session via `getSession()`, revalidate paths
- **`utils/actions.ts`**: `toggleFavoriteAction()`, `SendAgentListing()`, `SendSavedSearchForm()` — handle favorites, contacts, saved searches
- **Pattern**: Parse FormData → Zod validation → getSession() → DB mutation → revalidatePath()

### Authentication Flow (BetterAuth)
- **Config**: `lib/auth.ts` — Google OAuth + email/password, Prisma adapter for MongoDB
- **Session Retrieval**: `utils/users.ts` has `getSession()` function
- **Admin Access**: Middleware checks email === `salamhani697@gmail.com` (hard-coded in `middleware.ts`)
- **Protected Routes**: `/admin/*` (admin only), `/account/*` (logged-in users), `/login`, `/signup` handled in `middleware.ts`

### Real-time Notifications (Pusher)
- **Setup**: `lib/Pusher.ts` — PusherServer and PusherClient initialized with env vars
- **Provider**: `components/providers/PusherProvider` wraps app (in `Providers.tsx`)
- **Usage**: Subscribe to channels for listing updates, new notifications
- **API Route**: `/api/pusher/auth` handles channel authorization

### Form Validation Schemas (`utils/schema.ts`)
All Zod schemas in single file:
- `LoginFormSchema`, `SignupFormSchema` — email + strong password rules
- `AgentcontactSchema`, `SavedcontactSchema` — contact forms
- `CreateListingSchema` — comprehensive property validation with nested `LocationSchema`, `AgentSchema`, `OfficeSchema`
- **Pattern**: Import from `utils/schema.ts`, use `schema.safeParse(data)`, return validation errors in action responses

### Theme System
- **Dark Mode**: Hardcoded in `app/globals.css` (.dark class)
- **Colors**: OKLch format (e.g., `oklch(0.22 0.03 55)` for card color)
- **Footer Style**: Uses `bg-gradient-to-br from-card via-card to-muted` — warm amber tint
- **Dark Mode Background**: Updated to `oklch(0.18 0.025 55)` to match footer gradient for professional appearance

## Recommended Workflows

### Adding a New Listing Feature
1. Update Prisma schema if needed → run `prisma migrate dev "describe change"`
2. Create/update Zod schema in `utils/schema.ts`
3. Write server action in `lib/listing-actions.ts` or `utils/actions.ts`
4. Create client form component in `components/form/` or `components/listing/`
5. Use form's `action` prop to call server action
6. Call `revalidatePath()` to refresh cached pages

### Adding Real-time Notifications
1. Define notification type in Prisma `notification` model
2. Emit via Pusher in relevant server action:
   ```typescript
   await pusherServer.trigger(`notifications:${userId}`, 'new-listing', { ... })
   ```
3. Subscribe in component:
   ```typescript
   const channel = pusherClient.subscribe(`notifications:${userId}`)
   channel.bind('new-listing', handler)
   ```

### Admin Operations
- All admin routes guarded by `middleware.ts` (email check)
- Admin page: `app/admin/page.tsx` → `/admin/listings/` for CRUD
- Listings/users managed via `lib/listing-actions.ts` and `utils/admin-actions.ts`

## Developer Commands
```bash
# Development
npm run dev                  # Next.js dev server on :3000
npm run dev:socket         # Socket.io server on :3100 (nodemon + ts-node)
npm run build              # Production build
npm run lint               # ESLint check
npm start                  # Production server

# Database
npx prisma migrate dev "migration name"  # Create + apply migration
npx prisma studio                         # Visual DB editor
```

## File Organization
- **`app/`** — Next.js App Router (pages, layouts, API routes)
- **`components/`** — React components organized by domain (home, listing, agents, form, navbar, etc.)
- **`lib/`** — Core utilities (auth, Pusher, listing actions, validation schemas)
- **`utils/`** — DB client, schema validation, user helpers, type definitions
- **`prisma/`** — Schema, migrations, seed data
- **`public/`** — Static assets (images, videos)

## Conventions & Pitfalls
- **FormData parsing**: Always parse types explicitly (FormData returns strings) — see `createListingAction()`
- **Embedded types in MongoDB**: Use Prisma type definitions (ListingLocation, ListingAgents) for sub-documents
- **Session checking**: Always call `getSession()` before protected DB ops; redirect to `/login` if null
- **Revalidation**: After mutations, call `revalidatePath()` on affected routes to bust cache
- **BigInt fields**: Bedrooms, bathrooms, year_built are BigInt in Prisma — convert from number if needed
- **Currency**: Stored in cookie via `setCurrency()` action; currency codes from FreeAPI

## External Dependencies
- **Google Maps API**: Used in `components/listing/MapFiltring.tsx`
- **Cloudinary**: Image/video hosting (configured via env vars)
- **Google OAuth**: Social login via BetterAuth
- **FreeAPI**: Currency conversion (`@everapi/freecurrencyapi-js`)
