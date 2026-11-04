import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { WorkspaceHeader } from "@/components/shared/workspace-ui";
import StudioForm, {
  type EditableStudio,
} from "../../../add-studio/studio-form";

export const metadata: Metadata = {
  title: "Edit studio",
  description: "Update your studio listing.",
};

type EditStudioPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditStudioPage({ params }: EditStudioPageProps) {
  const { id } = await params;
  const cookieStore = await cookies();

  const response = await fetch(`${process.env.API_BASE_URL}/api/studios/mine`, {
    headers: { Cookie: cookieStore.toString() },
    cache: "no-store",
  });

  if (response.status === 401) {
    const next = `/studios/edit/${encodeURIComponent(id)}`;
    redirect(`/login?next=${encodeURIComponent(next)}`);
  }

  if (!response.ok) {
    throw new Error("Could not load your studio.");
  }

  const studios: EditableStudio[] = await response.json();
  const studio = studios.find((item) => item._id === id);

  if (!studio) notFound();

  return (
    <>
      <WorkspaceHeader
        label="Host workspace"
        title="Edit studio"
        description={`Update the published details for ${studio.title}.`}
      />

      <StudioForm
        key={studio._id}
        studio={studio}
        ownerName={studio.ownerName}
        ownerEmail={studio.ownerEmail}
      />
    </>
  );
}
