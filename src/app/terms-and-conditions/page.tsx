import type { Metadata } from "next";

import LegalDocument from "@/components/site/LegalDocument";
import SiteShell from "@/components/site/SiteShell";
import { LEGAL_DOCUMENTS } from "@/data/sitePages";

export const metadata: Metadata = {
  title: "Terms & Conditions | ZYFLUS",
  description: "Terms and conditions for using the ZYFLUS site and engaging the studio.",
};

export default function TermsAndConditionsPage() {
  return (
    <SiteShell>
      <LegalDocument {...LEGAL_DOCUMENTS.terms} />
    </SiteShell>
  );
}
