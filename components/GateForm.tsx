"use client";

import { useFormState, useFormStatus } from "react-dom";
import { motion } from "framer-motion";
import { loginAction, type LoginState } from "@/app/actions/auth";
import { useEffect, useRef } from "react";

const initial: LoginState = { ok: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <motion.button
      type="submit"
      disabled={pending}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="
        mt-10 w-full py-3.5
        font-cinzel tracking-[0.4em] text-xs
        border border-gold/50
        text-gold
        hover:bg-gold hover:text-sovereign
        disabled:opacity-40 disabled:cursor-wait
        transition-all duration-500
      "
    >
      {pending ? "· · ·" : "ENTER"}
    </motion.button>
  );
}

export default function GateForm() {
  const [state, formAction] = useFormState(loginAction, initial);
  const inputRef = useRef<HTMLInputElement>(null);

  // Clear input after an error + refocus
  useEffect(() => {
    if (state.error && inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }, [state]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }}
      className="fixed inset-0 z-[100] bg-sovereign flex items-center justify-center px-6"
    >
      {/* Ambient gradient */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(184,149,74,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative w-full max-w-lg flex flex-col items-center">
        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex flex-col items-center"
        >
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60 mb-6" />

          <div className="font-cinzel text-gold tracking-[0.6em] text-[10px] mb-4 opacity-70">
            SOVEREIGN ACCESS
          </div>

          <h1 className="font-cinzel text-ivory text-4xl md:text-5xl font-light tracking-[0.2em]">
            KANGALA
          </h1>
          <div className="font-cinzel text-gold text-[10px] tracking-[0.5em] mt-3 opacity-80">
            HOLDING GROUP
          </div>

          <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60 mt-6" />
        </motion.div>

        {/* Invitation text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.0 }}
          className="font-cairo text-ivory/60 text-center text-sm md:text-base mb-10 tracking-wide"
        >
          الدخول يتطلب رمزاً مُعتمداً
          <span className="block text-xs text-ivory/40 mt-1 tracking-wider">
            Authorized Access Only
          </span>
        </motion.p>

        {/* Form */}
        <motion.form
          action={formAction}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.3 }}
          className="w-full max-w-sm"
        >
          <motion.div
            animate={state.error ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <input
              ref={inputRef}
              name="password"
              type="password"
              required
              autoFocus
              autoComplete="off"
              placeholder="•  •  •  •  •  •  •  •"
              className={`
                w-full bg-transparent text-center
                font-cinzel text-ivory tracking-[0.5em] text-lg
                py-4 px-6
                border-b ${state.error ? "border-red-400/60" : "border-gold/40"}
                focus:border-gold focus:outline-none
                transition-colors duration-500
                placeholder:text-ivory/20
              `}
              dir="ltr"
            />
          </motion.div>

          <SubmitButton />

          {state.error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-center text-red-400/70 text-xs tracking-wider font-cairo"
            >
              {state.error}
            </motion.p>
          )}
        </motion.form>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.8 }}
          className="absolute bottom-[-8rem] text-ivory/30 text-[10px] tracking-[0.3em] font-cinzel uppercase"
        >
          © Kangala Holding Group · Confidential
        </motion.div>
      </div>
    </motion.div>
  );
}
