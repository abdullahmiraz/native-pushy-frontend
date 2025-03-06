// /* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from "@/lib/mongodb";
// import { notFound } from "next/navigation";
import NameView from "../../../components/NameView";

export default async function NamePage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = await params;

  await connectDB();

  return (
    <main style={{ textAlign: "center", padding: 20 }}>
      <NameView name={name || ""} />
    </main>
  );
}
