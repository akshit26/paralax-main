import type { Metadata } from "next";

import LegalDocument from "@/components/site/LegalDocument";
import SiteShell from "@/components/site/SiteShell";
import { LEGAL_DOCUMENTS } from "@/data/sitePages";

export const metadata: Metadata = {
  title: "Privacy Policy | ZYFLUS",
  description: "Privacy policy for ZYFLUS site inquiries, analytics, and communication handling.",
};

export default function PrivacyPolicyPage() {
  return (
    <SiteShell>
      <LegalDocument {...LEGAL_DOCUMENTS.privacy} />
    </SiteShell>
  );
}
