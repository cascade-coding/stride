import Sidebar from "./_components/Sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="min-h-dvh flex flex-col lg:flex-row 2xl:container 2xl:mx-auto">
        <Sidebar />
        {children}
      </div>
    </section>
  );
}
