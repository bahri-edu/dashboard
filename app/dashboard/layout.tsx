import Navbar from "@/components/Navbar";
import "@/styles/remixicon.css";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full">
      {/* navbar */}

      <Navbar />
      {children}
    </div>
  );
}
