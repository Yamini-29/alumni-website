import LayoutWrapper from "@/components/public/LayoutWrapper";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutWrapper>
      <main>{children}</main>
    </LayoutWrapper>
  );
}