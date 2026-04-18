import { isAuthenticated } from "@/app/actions/auth";
import AuthShell from "@/components/AuthShell";
import Hero from "@/components/scenes/Hero";
import Chairman from "@/components/scenes/Chairman";
import MedalMali from "@/components/scenes/MedalMali";
import MedalBurkina from "@/components/scenes/MedalBurkina";
import AssetArchitecture from "@/components/scenes/AssetArchitecture";
import Logistics from "@/components/scenes/Logistics";
import TheLand from "@/components/scenes/TheLand";
import Discovery from "@/components/scenes/Discovery";
import Numbers from "@/components/scenes/Numbers";
import Investment from "@/components/scenes/Investment";
import Governance from "@/components/scenes/Governance";
import Invitation from "@/components/scenes/Invitation";

// Force dynamic rendering so cookies() is re-read on every request.
export const dynamic = "force-dynamic";

/**
 * French locale route — /fr
 *
 * Renders the full sovereign dossier with every scene receiving
 * `lang="fr"`. Each scene carries its own verbatim French copy
 * sourced from the official Sovereign_Final HTML masters.
 */
export default async function FrenchHomePage() {
  const authed = await isAuthenticated();

  return (
    <AuthShell isAuthed={authed} lang="fr">
      <main>
        <Hero lang="fr" />
        <Chairman lang="fr" />
        <MedalMali lang="fr" />
        <MedalBurkina lang="fr" />
        <AssetArchitecture lang="fr" />
        <Logistics lang="fr" />
        <TheLand lang="fr" />
        <Discovery lang="fr" />
        <Numbers lang="fr" />
        <Investment lang="fr" />
        <Governance lang="fr" />
        <Invitation lang="fr" />
      </main>
    </AuthShell>
  );
}
