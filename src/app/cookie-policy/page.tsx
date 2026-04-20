import type { Metadata } from "next";

import LegalDocument from "@/components/site/LegalDocument";
import SiteShell from "@/components/site/SiteShell";
import { LEGAL_DOCUMENTS } from "@/data/sitePages";

export const metadata: Metadata = {
  title: "Cookie Policy | ZYFLUS",
  description: "Cookie policy for ZYFLUS site preferences, analytics, and browser storage.",
};

export default function CookiePolicyPage() {
  return (
    <SiteShell>
      <LegalDocument {...LEGAL_DOCUMENTS.cookies} />
    </SiteShell>
  );
}
