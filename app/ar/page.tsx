import { isAuthenticated } from "@/app/actions/auth";
import AuthShell from "@/components/AuthShell";
import Hero from "@/components/scenes/Hero";
import Chairman from "@/components/scenes/Chairman";
import MedalMali from "@/components/scenes/MedalMali";
import MedalBurkina from "@/components/scenes/MedalBurkina";
import AssetArchitecture from "@/components/scenes/AssetArchitecture";
import Logistics from "@/components/scenes/Logistics";
import FleetConvoy from "@/components/scenes/FleetConvoy";
import TheLand from "@/components/scenes/TheLand";
import Discovery from "@/components/scenes/Discovery";
import Numbers from "@/components/scenes/Numbers";
import Investment from "@/components/scenes/Investment";
import Governance from "@/components/scenes/Governance";
import Invitation from "@/components/scenes/Invitation";
import SovereignHorizon from "@/components/SovereignHorizon";

export const dynamic = "force-dynamic";

/**
 * Arabic locale route — /ar
 *
 * All scenes receive `lang="ar"`. Scenes with full AR translations
 * (Hero, Chairman, FleetConvoy) render Arabic content directly.
 * Other scenes fall back to English via resolveLang().
 */
export default async function ArabicHomePage() {
  const authed = await isAuthenticated();

  return (
    <AuthShell isAuthed={authed} lang="ar">
      <main>
        <Hero lang="ar" />
        <Chairman lang="ar" />
        <MedalMali lang="ar" />
        <MedalBurkina lang="ar" />
        <SovereignHorizon />
        <AssetArchitecture lang="ar" />
        <SovereignHorizon />
        <FleetConvoy lang="ar" />
        <Logistics lang="ar" />
        <TheLand lang="ar" />
        <SovereignHorizon />
        <Discovery lang="ar" />
        <SovereignHorizon />
        <Numbers lang="ar" />
        <Investment lang="ar" />
        <SovereignHorizon />
        <Governance lang="ar" />
        <SovereignHorizon />
        <Invitation lang="ar" />
      </main>
    </AuthShell>
  );
}
