<div align="center">

# StudioSpace

### Find your next creative workspace.

Discover photography studios, film stages, podcast lounges, music suites and art workshops. Compare the room, equipment and hourly cost, then reserve the time your project needs.

[**Live Website**](https://studiospace-client-web.vercel.app) · [**Explore Studios**](https://studiospace-client-web.vercel.app/studios) · [**Server Repository**](https://github.com/foysaliio/studiospace-server)

![Next.js](https://img.shields.io/badge/Next.js_16-171717?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-164E63?style=flat-square&logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Vercel-171717?style=flat-square&logo=vercel&logoColor=white)

</div>

## Examiner demo account

Use **Email and Password** on the [StudioSpace login page](https://studiospace-client-web.vercel.app/login).

| Email                  | Password       |
| ---------------------- | -------------- |
| `examiner@example.com` | `StudioDemo47` |

**Quick walkthrough:** Open **Explore Studios**, save a room with the heart button, then open **Saved studios** from the account menu. To try a reservation, open that room, select **Book Workspace Now**, choose a session and check its status under **My bookings**.

## Features

- **Discover studios by category.** Explore five types of creative spaces, from photography studios to podcast lounges. Featured cards show the location, hourly rate and rating at a glance.
- **Inspect the room before booking.** Each studio page brings together photos, amenities, maximum capacity, host details and creator reviews.
- **Plan a session with clear pricing.** Choose a date, start time and duration, then review the studio fee and security deposit before requesting the booking.
- **Manage reservations.** See session times in Dhaka time, check booking status and cancel a pending request from **My bookings**.
- **Download a booking invoice.** Confirmed reservations offer a downloadable PDF invoice.
- **Build a personal shortlist.** Use the heart on a studio card to save it. Revisit saved rooms from the dashboard when the team is ready to book.
- **Publish and manage a space.** Hosts can create listings, update rates and amenities, and remove an owned studio through a confirmation dialog.
- **Choose how to add a cover.** Paste an HTTPS image URL or upload a JPG, PNG or WebP image up to 3 MB through ImgBB.

## Inside the workspace

| Page                 | What you can do                                                |
| -------------------- | -------------------------------------------------------------- |
| `/dashboard`         | See your next studio session and open the host tools           |
| `/my-bookings`       | Review reservation times, fees, statuses and available actions |
| `/saved-studios`     | Revisit the spaces you have shortlisted                        |
| `/my-listings`       | Preview, edit or delete a studio you host                      |
| `/add-studio`        | Publish a space with pricing, amenities and a cover photo      |
| `/studios/edit/[id]` | Update an existing listing using its pre-filled details        |

The workspace uses a sidebar on desktop and a compact page selector on mobile. Light and dark themes extend across the catalogue, booking forms and dashboard. Loading skeletons, empty states and toast notifications give feedback while browsing and managing bookings.

## Technology

| Layer                   | Tools                                              |
| ----------------------- | -------------------------------------------------- |
| Frontend                | Next.js App Router, React, TypeScript              |
| Interface               | Tailwind CSS, shadcn/ui, Lucide React              |
| Theme and notifications | next-themes, Sonner                                |
| Authentication          | Better Auth with email/password and Google sign-in |
| Backend                 | Express, MongoDB Atlas, session-bound JWT cookies  |
| Image uploads           | ImgBB through a server-side upload handler         |
| Deployment              | Separate Vercel projects for the client and API    |

## Run locally

Start the [StudioSpace API](https://github.com/foysaliio/studiospace-server) on port `5000`. In a second terminal, install the client:

```bash
git clone https://github.com/foysaliio/studiospace-client.git
cd studiospace-client
npm ci
```

Create `.env.local` beside `package.json`:

```dotenv
API_BASE_URL=http://localhost:5000
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
IMGBB_API_KEY=your_imgbb_api_key
```

The ImgBB key enables file uploads. To try the listing form without configuring uploads, choose **Use image URL** and provide an HTTPS cover image.

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000).

| Command         | Purpose                      |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run lint`  | Run ESLint                   |
| `npm run build` | Create a production build    |
| `npm start`     | Serve the production build   |

## Production setup

The browser uses the frontend domain for sign-in, Google callbacks and session checks. Next.js forwards API requests to Express through a fallback rewrite, while server-rendered pages fetch data directly from the backend.

| Client variable            | Production value                              |
| -------------------------- | --------------------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | `https://studiospace-client-web.vercel.app`   |
| `API_BASE_URL`             | `https://studiospace-server-house.vercel.app` |
| `IMGBB_API_KEY`            | Private ImgBB key used by the upload handler  |

---

**Designed and built by Foysal** · [Portfolio](https://foysaliio.vercel.app/) · [GitHub](https://github.com/foysaliio)
