<div align="center">

# StudioSpace

### Find your next creative workspace.

A photography shoot, a podcast recording and a band rehearsal each need a different kind of room. StudioSpace helps creators compare the space, equipment and cost before they book the hours they need.

[**Visit StudioSpace**](https://studiospace-client-web.vercel.app) · [**Explore Studios**](https://studiospace-client-web.vercel.app/studios) · [**Backend Repository**](https://github.com/foysaliio/studiospace-server)

![Next.js](https://img.shields.io/badge/Next.js_16-171717?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-164E63?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-171717?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## A first visit to StudioSpace

Imagine booking a room for a four-person podcast. The cover photo catches your eye, but the booking depends on three practical questions. Does everyone fit? Does the room have microphones and headphones? What will two hours cost?

Open **Explore Studios**, choose **Podcast Lounge** and open a listing. The studio page brings its capacity, equipment, hourly rate and security deposit together. Save the room with the heart button if you are still comparing spaces. When you are ready, select **Book Workspace Now** to choose your date, start time and duration.

After you request a session, **My bookings** becomes the place to check its status. A pending reservation offers cancellation. A confirmed booking gives you an invoice to download.

## Two ways to use the same account

| As a creator                                                                    | As a studio host                                                         |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Browse photo studios, film stages, podcast lounges, music suites and workshops. | Publish a space with a category, cover photo, location and description.  |
| Compare capacity, amenities, reviews, hourly rates and deposits.                | Set the hourly rate, security deposit and maximum capacity.              |
| Save promising rooms and revisit them from **Saved studios**.                   | Add a cover using an HTTPS image URL or upload a photo through ImgBB.    |
| Choose a session and track it from **My bookings**.                             | Open **My studio listings** to preview, edit or delete an owned listing. |
| Check the next session from the dashboard.                                      | Use the same dashboard to move between hosting and personal bookings.    |

## What you can explore

### Studio discovery

The homepage opens with a visual introduction to the spaces, followed by featured listings and studio categories. Each listing card shows the studio name, location, hourly rate and rating. A separate heart button lets a member save the listing while staying in the catalogue.

Category links lead directly to a filtered collection. The booking guide and host support links take visitors to the relevant homepage sections.

### The studio details page

A studio has its own page for the questions that matter before a reservation:

- **The room** — photos, category, location and the host’s description.
- **The practical details** — maximum capacity, hourly price, deposit and amenities.
- **The people** — host contact details, reviewer names, ratings and comments.
- **The booking** — a date selector, start time, duration and a fee summary.

### A personal booking workspace

The dashboard highlights the next session. **My bookings** shows reservation status, time, duration and studio fee. Times are displayed in **Dhaka time**, giving the date picker, reservation details and session list a common reference.

**Saved studios** keeps the shortlist separate from actual reservations. A creator can save several rooms while planning a project and book one when the schedule is settled.

### Accounts and access

Members can register with a name, email, profile photo URL and password, or sign in with Google. Password recovery uses an emailed reset link. Signed-out visitors can browse the catalogue and studio details, then sign in when they want to book or open their workspace.

## Interface details

| Detail                            | Where it helps                                                                                             |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Light and dark themes             | The catalogue, booking form and workspace follow the selected theme.                                       |
| Responsive workspace navigation   | Desktop uses a sidebar. Smaller screens use a compact page selector.                                       |
| Loading skeletons                 | Listings, reviews and workspace pages can show their structure while data loads.                           |
| Keyboard focus and reduced motion | Links and controls remain identifiable when navigating with a keyboard, with motion preferences respected. |
| Empty states                      | A new member gets a next action when their bookings or studio listings are empty.                          |
| Confirmation dialogs              | A host sees which studio will be removed before confirming deletion.                                       |

## Route guide

| Route                                      | Page                                                                   |
| ------------------------------------------ | ---------------------------------------------------------------------- |
| `/`                                        | Homepage, featured studios, categories, booking guide and host support |
| `/studios`                                 | Studio catalogue                                                       |
| `/studios/[id]`                            | Gallery, booking information, amenities, host and reviews              |
| `/login` · `/register` · `/reset-password` | Account access and recovery                                            |
| `/dashboard`                               | Next session and host workspace                                        |
| `/my-bookings`                             | Reservations, cancellation and invoices                                |
| `/saved-studios`                           | Personal studio shortlist                                              |
| `/my-listings`                             | Studios published by the signed-in host                                |
| `/add-studio`                              | New listing form                                                       |
| `/studios/edit/[id]`                       | Edit an existing listing                                               |

## Project structure

```text
src/
├── app/
│   ├── (workspace)/       Dashboard, bookings, saved studios and host tools
│   ├── api/studio-photo/  Authenticated photo upload handler
│   ├── studios/           Catalogue, studio details and booking interface
│   ├── login/             Sign-in page
│   ├── register/          Account registration
│   └── reset-password/    Password recovery
├── components/
│   ├── shared/            Navigation, footer, theme and workspace components
│   └── ui/                Reusable interface elements
├── features/home/         Homepage sections and studio cards
├── lib/                   Auth client and API request helpers
└── proxy.ts               Request handling for protected navigation
```

## Run the client locally

Start the [StudioSpace API](https://github.com/foysaliio/studiospace-server) on port `5000`. In a second terminal, clone and install the client:

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

`IMGBB_API_KEY` is used by the upload handler. For a quick local walkthrough, choose **Use image URL** when adding a studio. File uploads accept JPG, PNG or WebP images up to 3 MB.

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000).

| Command         | Purpose                         |
| --------------- | ------------------------------- |
| `npm run dev`   | Start local development         |
| `npm run lint`  | Run ESLint                      |
| `npm run build` | Build the client for production |
| `npm start`     | Serve the production build      |

## Production configuration

The frontend and Express API are deployed as separate Vercel projects. Browser requests use the frontend origin, and a Next.js fallback rewrite forwards API routes to Express. This keeps Google sign-in, its callback and browser session checks on the same public domain. Server-rendered pages fetch data directly from the API.

| Client variable            | Production value                              |
| -------------------------- | --------------------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | `https://studiospace-client-web.vercel.app`   |
| `API_BASE_URL`             | `https://studiospace-server-house.vercel.app` |
| `IMGBB_API_KEY`            | Private ImgBB upload key                      |

---

**Designed and built by Foysal** · [Portfolio](https://foysaliio.vercel.app/) · [GitHub](https://github.com/foysaliio)
