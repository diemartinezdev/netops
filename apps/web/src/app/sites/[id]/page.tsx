import { SiteDetailView } from "@/features/sites/components/SiteDetailView";

export default async function SiteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SiteDetailView id={id} />;
}
