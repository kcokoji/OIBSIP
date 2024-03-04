export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex justify-center items-center bg-[#f2eddc]">
      {children}
    </div>
  );
}
