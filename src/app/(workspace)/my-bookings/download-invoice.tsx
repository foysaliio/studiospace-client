"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { toast } from "sonner";

type InvoiceProps = {
  bookingId: string;
  studioTitle: string;
  session: string;
  duration: string;
  studioFee: string;
};

/**
 * Browser fonts also support studio names written in Bengali.
 * The rest of the invoice stays selectable PDF text.
 */
function makeTitleImage(title: string) {
  const canvas = document.createElement("canvas");
  const width = 1600;
  const lineHeight = 90;
  const font = '66px Georgia, "Noto Serif Bengali", serif';

  canvas.width = width;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not prepare the invoice title.");

  ctx.font = font;
  const lines: string[] = [];
  let line = "";

  for (const word of title.trim().split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;

    if (line && ctx.measureText(next).width > width - 16) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }

  lines.push(line);
  canvas.height = lines.length * lineHeight + 14;

  ctx.font = font;
  ctx.fillStyle = "#24241f";
  ctx.textBaseline = "middle";

  lines.forEach((text, index) => {
    ctx.fillText(text, 2, 48 + index * lineHeight, width - 16);
  });

  return canvas;
}

export default function DownloadInvoice({
  bookingId,
  studioTitle,
  session,
  duration,
  studioFee,
}: InvoiceProps) {
  const [busy, setBusy] = useState(false);

  async function downloadInvoice() {
    if (busy) return;
    setBusy(true);

    try {
      const { jsPDF } = await import("jspdf");
      await document.fonts.ready;

      const pdf = new jsPDF({ unit: "mm", format: "a4", compress: true });
      const left = 22;
      const right = 188;
      const width = right - left;

      const ink = "#24241F";
      const subtle = "#626159";
      const rule = "#D8D5CA";
      const paperTint = "#F4F2EB";

      function label(text: string, x: number, y: number) {
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(8);
        pdf.setTextColor(subtle);
        pdf.text(text, x, y);
      }

      function divider(y: number) {
        pdf.setDrawColor(rule);
        pdf.setLineWidth(0.25);
        pdf.line(left, y, right, y);
      }

      pdf.setProperties({
        title: `StudioSpace booking invoice - ${bookingId}`,
        author: "StudioSpace",
      });

      // Letterhead
      pdf.setFont("times", "bold");
      pdf.setFontSize(24);
      pdf.setTextColor(ink);
      pdf.text("StudioSpace", left, 27);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(subtle);
      pdf.text("Booking invoice", right, 26, { align: "right" });
      divider(35);

      // Reservation title
      pdf.setFillColor("#52634D");
      pdf.circle(left + 1, 50, 1, "F");
      label("CONFIRMED RESERVATION", left + 5, 51);

      const titleImage = makeTitleImage(studioTitle);
      const imageWidth = Math.min(
        width,
        (38 * titleImage.width) / titleImage.height,
      );
      const imageHeight = (titleImage.height / titleImage.width) * imageWidth;

      pdf.addImage(titleImage, "PNG", left, 57, imageWidth, imageHeight);

      const referenceY = 57 + imageHeight + 9;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(subtle);
      pdf.text(`Booking reference  /  ${bookingId}`, left, referenceY);

      // Session information
      const bandY = referenceY + 13;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      const sessionLines: string[] = pdf.splitTextToSize(session, 90);
      const bandHeight = Math.max(30, 21 + sessionLines.length * 5);

      pdf.setFillColor(paperTint);
      pdf.roundedRect(left, bandY, width, bandHeight, 1.2, 1.2, "F");

      label("SESSION · DHAKA TIME", left + 7, bandY + 10);
      label("DURATION", left + 112, bandY + 10);

      pdf.setDrawColor(rule);
      pdf.line(left + 104, bandY + 6, left + 104, bandY + bandHeight - 6);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      pdf.setTextColor(ink);
      pdf.text(sessionLines, left + 7, bandY + 19);
      pdf.text(duration, left + 112, bandY + 19);

      // Fee breakdown
      const feesY = bandY + bandHeight + 23;
      pdf.setFont("times", "normal");
      pdf.setFontSize(22);
      pdf.text("Session charges", left, feesY);

      label("DESCRIPTION", left, feesY + 13);
      pdf.setFontSize(8);
      pdf.text("AMOUNT", right, feesY + 13, { align: "right" });
      divider(feesY + 17);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(11);
      pdf.setTextColor(ink);
      pdf.text("Studio reservation", left, feesY + 28);
      pdf.text(studioFee, right, feesY + 28, { align: "right" });
      divider(feesY + 35);

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      pdf.text("Total studio fee", left, feesY + 50);
      pdf.setFont("times", "bold");
      pdf.setFontSize(24);
      pdf.text(studioFee, right, feesY + 50, { align: "right" });

      divider(273);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(subtle);
      pdf.text("StudioSpace  /  My bookings", left, 280);
      pdf.text("1 / 1", right, 280, { align: "right" });

      pdf.save(`StudioSpace-invoice-${bookingId}.pdf`);
    } catch {
      toast.error("Could not download the invoice. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={downloadInvoice}
      disabled={busy}
      aria-busy={busy}
      aria-label={`Download invoice for ${studioTitle}`}
      className="group/invoice inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors duration-200 hover:border-foreground hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-wait disabled:opacity-60 motion-reduce:transition-none"
    >
      <Download
        size={15}
        strokeWidth={1.7}
        aria-hidden="true"
        className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover/invoice:translate-y-0.5"
      />
      {busy ? "Preparing…" : "Download invoice"}
    </button>
  );
}
