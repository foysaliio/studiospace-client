<div align="center">

# StudioSpace

### Find your next creative workspace.

Book a room for a photo shoot, a film session, a podcast, a rehearsal, or a workshop. Compare the space, equipment, and hourly price before choosing your session.

[**Live website**](REPLACE_WITH_LIVE_SITE_URL) · [**Server repository**](https://github.com/foysaliio/studiospace-server) · [**Run locally**](#run-locally)

![Next.js](https://img.shields.io/badge/Next.js-16-191919?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-155E75?style=flat-square&logo=tailwindcss&logoColor=white)

</div>

---

## Try StudioSpace

| Examiner account | Credentials                  |
| ---------------- | ---------------------------- |
| Email            | `REPLACE_WITH_DEMO_EMAIL`    |
| Password         | `REPLACE_WITH_DEMO_PASSWORD` |

**A quick walkthrough:** Open **Explore Studios**, choose a category, and open a listing. Check its gallery, capacity, equipment, and security deposit. Select **Book Workspace Now**, choose a date, start time, and duration, then review the studio fee. After submitting, open **My bookings** to find the reservation. Confirmed reservations include a downloadable PDF invoice.

## What you can do

- **Discover a space.** Browse six featured studios on the homepage or filter the full catalogue by studio category.
- **See what is included.** Each listing brings together studio photos, amenities, capacity, host details, and reviews. The hourly rate and security deposit appear separately.
- **Plan a session.** Choose a booking date, start time, and duration. The studio fee updates with the number of hours.
- **Manage reservations.** See session times in Dhaka time, check booking status, cancel a pending request, or download an invoice for a confirmed booking.
- **Keep a shortlist.** Use the heart on a studio card to save it to your account. Revisit your shortlist from **Saved studios**.
- **Host your own space.** Publish a listing with an HTTPS image URL or upload a cover photo through ImgBB. Edit the listing or remove it from your workspace.
- **Review a studio.** Read feedback on the details page and submit a rating and comment through the review form.

## Inside the workspace

| Page                   | What you will find                                                               |
| ---------------------- | -------------------------------------------------------------------------------- |
| **Dashboard**          | Your next active session, its booking status, and shortcuts to host tools        |
| **My bookings**        | Reservations with dates, times, durations, fees, and available actions           |
| **Saved studios**      | The studios you have saved for a future session                                  |
| **My studio listings** | Your published spaces, hourly rates, and edit and delete controls                |
| **Add new studio**     | Listing details, cover photo, pricing, capacity, amenities, and host information |

The interface uses light and dark themes, loading skeletons, and confirmation dialogs. On a narrow screen, the booking summary places each label beside its value. On desktop, the same information sits alongside the booking button.

## Routes

| Route                         | Access        | Purpose                                                       |
| ----------------------------- | ------------- | ------------------------------------------------------------- |
| `/`                           | Public        | Studio discovery, categories, booking guide, and host support |
| `/studios`                    | Public        | Browse studios and filter by category                         |
| `/studios/[id]`               | Public        | View a studio, read reviews, and start a booking              |
| `/login`, `/register`         | Public        | Email and password or Google sign-in                          |
| `/dashboard`                  | Signed in     | Account overview                                              |
| `/my-bookings`                | Signed in     | Reservations and confirmed-booking invoices                   |
| `/saved-studios`              | Signed in     | Personal shortlist                                            |
| `/my-listings`, `/add-studio` | Signed in     | Manage or publish studio listings                             |
| `/studios/edit/[id]`          | Listing owner | Edit an existing studio                                       |

**How It Works** and **About Us** in the navigation scroll to their sections on the homepage.

## Tech stack

| Technology                            | Role                                                                   |
| ------------------------------------- | ---------------------------------------------------------------------- |
| Next.js App Router, React, TypeScript | Routing, server-rendered studio data, and interactive booking controls |
| Tailwind CSS, shadcn/ui, Lucide       | Layouts, interface components, and icons                               |
| Better Auth                           | Email/password and Google authentication                               |
| next-themes, Sonner                   | Theme switching and action feedback                                    |
| jsPDF                                 | Downloadable booking invoices                                          |
| ImgBB                                 | Hosting uploaded studio cover photos                                   |
| StudioSpace Express API               | Studios, bookings, reviews, and saved studios backed by MongoDB        |

## Run locally

Use Node.js 24 and npm. Start the [StudioSpace API](https://github.com/foysaliio/studiospace-server) on port `5000` first.

1. Clone the client and install dependencies.

   ```bash
   git clone https://github.com/foysaliio/studiospace-client.git
   cd studiospace-client
   npm install
   ```

2. Create `.env` in the client repository root.

   ```env
   API_BASE_URL=http://localhost:5000
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
   IMGBB_API_KEY=your_imgbb_api_key
   ```

   `API_BASE_URL` is used by server-side requests. `NEXT_PUBLIC_API_BASE_URL` is the API address available to browser code. The ImgBB key belongs on the server side of the Next.js app, in the photo upload route.

3. Start the client.

   ```bash
   npm run dev
   ```

4. Open **http://localhost:3000**.

## Project commands

| Command         | Purpose                      |
| --------------- | ---------------------------- |
| `npm run dev`   | Start local development      |
| `npm run lint`  | Check the source with ESLint |
| `npm run build` | Create a production build    |
| `npm run start` | Serve the production build   |

---

Built by [Foysal](https://github.com/foysaliio) · [Portfolio](https://foysaliio.vercel.app/)
