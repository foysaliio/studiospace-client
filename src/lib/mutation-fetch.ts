export async function mutationFetch(url: string, options: RequestInit) {
  const tokenResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mutation-token`,
    {
      method: "POST",
      credentials: "include",
      cache: "no-store",
    },
  );

  if (!tokenResponse.ok) {
    return tokenResponse;
  }

  return fetch(url, {
    ...options,
    credentials: "include",
  });
}
