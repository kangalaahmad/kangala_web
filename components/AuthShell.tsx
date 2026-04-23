"use client";

/**
 * AuthShell — Client-side transition wrapper for the password gate.
 *
 * Why this exists:
 *   page.tsx is a Server Component and cannot use AnimatePresence.
 *   Without AnimatePresence, GateForm's `exit` prop is dead code —
 *   React unmounts it instantly with no animation.
 *
 * How it works:
 *   - `initial={false}` on AnimatePresence suppresses initial-mount
 *     animations (prevents opacity flash on SSR hydration when already authed).
 *   - `mode="wait"` ensures gate EXIT (1.2s) completes before content ENTERS (0.8s).
 *   - On successful login, server re-renders page.tsx → isAuthed flips true →
 *     React passes new prop → AnimatePresence triggers the transition.
 */

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import GateForm from "@/components/GateForm";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { Lang } from "@/lib/i18n";
import { EASE } from "@/lib/easing";

type Props = {
  isAuthed: boolean;
  lang?: Lang;
  children: ReactNode;
};

export default function AuthShell({ isAuthed, lang = "en", children }: Props) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {!isAuthed ? (
        // Key "gate" — AnimatePresence tracks removal and triggers
        // the exit animation on GateForm's root motion.div
        <GateForm key="gate" />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE.HOVER }}
        >
          <LanguageSwitcher current={lang} />
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
