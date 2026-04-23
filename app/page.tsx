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

// Force dynamic rendering so cookies() is re-read on every request.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const authed = await isAuthenticated();

  return (
    <AuthShell isAuthed={authed} lang="en">
      <main>
        <Hero lang="en" />
        <Chairman lang="en" />
        <MedalMali lang="en" />
        <MedalBurkina lang="en" />
        {/* ─ Chapter break: Sovereign → Ivory (Architecture) ─ */}
        <SovereignHorizon />
        <AssetArchitecture lang="en" />
        {/* ─ Chapter break: Ivory → Sovereign (FleetConvoy) ─ */}
        <SovereignHorizon />
        <FleetConvoy lang="en" />
        <Logistics lang="en" />
        <TheLand lang="en" />
        {/* ─ Chapter break: Sovereign → Ivory (Discovery) ─ */}
        <SovereignHorizon />
        <Discovery lang="en" />
        {/* ─ Chapter break: Ivory → Sovereign (Numbers) ─ */}
        <SovereignHorizon />
        <Numbers lang="en" />
        <Investment lang="en" />
        {/* ─ Chapter break: Sovereign → Ivory (Governance) ─ */}
        <SovereignHorizon />
        <Governance lang="en" />
        {/* ─ Chapter break: Ivory → Sovereign (Invitation) ─ */}
        <SovereignHorizon />
        <Invitation lang="en" />
      </main>
    </AuthShell>
  );
}
