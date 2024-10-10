export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex items-center justify-center mt-8">
      <div>{children}</div>
    </section>
  );
}
