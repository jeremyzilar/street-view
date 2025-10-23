import { PeopleTable } from "@/components/PeopleTable";
import { PageLayout } from "@/components/PageLayout";

export default function PeoplePage() {
  return (
    <PageLayout>
      <div className="">
        <h1 className="text-2xl font-bold mb-6">All People</h1>
        <PeopleTable />
      </div>
    </PageLayout>
  );
}
