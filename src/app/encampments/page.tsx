import { EncampmentsList } from "@/components/EncampmentsList";
import { PageLayout } from "@/components/PageLayout";

export default function EncampmentsPage() {
  return (
    <PageLayout>
      <div className="">
        <h1 className="text-2xl font-bold mb-6">Encampments</h1>
        <EncampmentsList />
      </div>
    </PageLayout>
  );
}
