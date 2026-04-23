import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "مجموعة كانغالا القابضة — استثمار سيادي",
  description: "ملف الاستثمار السيادي — مجموعة كانغالا القابضة",
};

export default function ArabicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
