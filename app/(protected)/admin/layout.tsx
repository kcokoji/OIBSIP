import { currentRole, currentUser } from "@/lib/auth";
import SideBar from "./components/side-navbar";
import { countProcessingOrders } from "@/data/admin";
import { UserRole } from "@prisma/client";
import NotFound from "@/app/not-found";
import Header from "./components/header";

export const metadata = {
  title: "Admin",
  description: "Created by Okoji Kelechi",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = (await currentUser()) || undefined;
  const userRole = await currentRole();
  const count = await countProcessingOrders();
  if (userRole !== UserRole.ADMIN) {
    return <NotFound />;
  }
  return (
    <>
      <div className="grid bg-[#f2eddc] h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
        {/* //@ts-ignore */}
        <SideBar user={user} count={count} />

        <section className=" overflow-y-auto">
          {" "}
          <Header />
          {children}
        </section>
      </div>
    </>
  );
}
