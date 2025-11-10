import Link from "next/link";
import { navigation } from "@/config/navigation";
import { PageLayout } from "@/components/PageLayout";
import { DashboardSummary } from "@/components/dashboard/DashboardSummary";
import { PopulationStats } from "@/components/dashboard/PopulationStats";
import { CurrentNeedsCard } from "@/components/dashboard/CurrentNeedsCard";
import { BedAvailability } from "@/components/dashboard/BedAvailability";
import { SystemCoverage } from "@/components/dashboard/SystemCoverage";
import type { DashboardData } from "@/types/dashboard";

async function getDashboardData(): Promise<DashboardData | null> {
  try {
    // Use absolute URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/dashboard`, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!response.ok) {
      console.error("Failed to fetch dashboard data:", response.status);
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return null;
  }
}

export default async function Home() {
  const dashboardData = await getDashboardData();

  return (
    <PageLayout showHeader={false}>
      {/* Dashboard Summary Hero */}
      {dashboardData && (
        <section className="py-8">
          <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
            <div className="col-span-4 tablet-lg:col-span-12">
              <DashboardSummary
                currentlyUnhoused={dashboardData.population.currentlyUnhoused}
                totalBedsAvailable={dashboardData.totalBedsAvailable}
                seekingShelter={dashboardData.needs.seekingShelter}
                lastUpdated={dashboardData.lastUpdated}
              />
            </div>
          </div>
        </section>
      )}

      {/* Dashboard Stats Grid */}
      {dashboardData && (
        <section className="py-6">
          <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-6">
            <div className="col-span-4 tablet-lg:col-span-12">
              <PopulationStats stats={dashboardData.population} />
            </div>
            <div className="col-span-4 tablet-lg:col-span-12">
              <CurrentNeedsCard needs={dashboardData.needs} />
            </div>
            <div className="col-span-4 tablet-lg:col-span-12">
              <BedAvailability
                bedTypes={dashboardData.bedTypes}
                totalAvailable={dashboardData.totalBedsAvailable}
              />
            </div>
            <div className="col-span-4 tablet-lg:col-span-12">
              <SystemCoverage
                coverage={dashboardData.systemCoverage}
                totalPeople={dashboardData.population.totalPeople}
              />
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="py-12">
        <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
          <div className="desktop:block hidden col-span-4 tablet-lg:col-span-12 space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-6 pt-10">
              <h1 className="text-xl font-black text-gray-900 dark:text-white">
                The Many Paths Project{" "}
                <span className="pt-4 text-5xl font-black text-peach-800 dark:text-white block">
                  Santa Fe, New Mexico
                </span>
              </h1>
              <p className="text-2xl font-light text-gray-600 dark:text-gray-300 mx-auto">
                Coordinated care for people experiencing street homelessness
              </p>
              {/* Navigation buttons */}
              <div className="pt-4 flex justify-center gap-6 flex-wrap">
                {navigation.nav.map((doc) => (
                  <Link
                    key={doc.path}
                    href={doc.path}
                    className="text-lg font-semibold hover:underline underline-offset-4 text-teal-700 dark:text-teal-200"
                  >
                    {doc.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
          <div className="desktop:block hidden col-span-4 tablet-lg:col-span-12 space-y-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                The Many Paths Project fills the critical gap between the
                existing support systems for people experiencing street
                homelessness in Santa Fe.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Through collective care, we help the people in our community who
                are experiencing street homelessness get the medical help,
                supplies, shelter, and support they need to succeed on their
                path towards stable housing.
              </p>
              <Link
                href="/mission"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                Read our full mission
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            {/* Documents Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
                Documentation & Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {navigation.nav.map((doc) => (
                  <Link
                    key={doc.path}
                    href={doc.path}
                    className="block p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {doc.label}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {doc.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
