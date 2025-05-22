import { settings } from '@/config/settings';
import { tebexClient } from '@/lib/tebex';
import PackageCard from './PackageCard';

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
    params: {
        category: string;
    };
}

export default async function Page({ params }: PageProps) {
    const { category } = await params;

    const selectedCategory = [...settings.home_subcategories, ...settings.home_category_widgets].find(
        cat => cat.url.replace("/store/", "").toLowerCase() === category.toLowerCase()
    );

    let allPackages = [];
    if (selectedCategory) {
        allPackages = await tebexClient(`categories/${selectedCategory.tebex_category_id}?includePackages=1`);
    }

    if (selectedCategory) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-2">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow">All {selectedCategory.name}</h1>
                        <p className="text-lg text-gray-400">Browse all {selectedCategory.name} packages available for Scala.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allPackages?.data?.packages?.map((rank: any) => (
                        <PackageCard key={rank.id} rank={rank} />
                    ))}
                </div>
            </div>
        );
    }
}

export async function generateStaticParams() {
    return [...settings.home_subcategories, ...settings.home_category_widgets].map(
        widget => ({ category: widget.url.replace("/", "").toLowerCase() })
    );
}

export async function generateMetadata({ params }: PageProps) {
    const newParams = await params;
    const uppercaseCategory = newParams.category.charAt(0).toUpperCase() + newParams.category.slice(1);
    return {
        title: uppercaseCategory + " | Store | " + settings.server_name,
        description: "Buy " + uppercaseCategory + " from the " + settings.server_name + " store!",
        openGraph: {
            title: uppercaseCategory + " | Store | " + settings.server_name,
            description: "Buy " + uppercaseCategory + " from the " + settings.server_name + " store!",
        }
    }
} 