import { NextResponse, type NextRequest } from "next/server";

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL("/login", request.url);
  const destination = request.nextUrl.pathname + request.nextUrl.search;

  loginUrl.searchParams.set("next", destination);

  return NextResponse.redirect(loginUrl);
}

function sessionUnavailable() {
  return new NextResponse(
    "Could not check your session. Please refresh to try again.",
    {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    },
  );
}

export async function proxy(request: NextRequest) {
  const cookie = request.headers.get("cookie");

  if (!cookie) {
    return redirectToLogin(request);
  }

  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/auth/get-session`,
      {
        headers: { cookie },
        cache: "no-store",
      },
    );

    if (response.status === 401) {
      return redirectToLogin(request);
    }

    if (!response.ok) {
      return sessionUnavailable();
    }

    const session = await response.json();

    if (!session?.user?.id || !session?.session?.id) {
      return redirectToLogin(request);
    }

    return NextResponse.next();
  } catch {
    return sessionUnavailable();
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/add-studio/:path*",
    "/my-listings/:path*",
    "/my-bookings/:path*",
    "/studios/edit/:path*",
  ],
};
