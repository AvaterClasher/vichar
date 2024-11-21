import { BlogHeader } from "@/components/blog/blog-header";
import BlogPosts from "@/components/blog/blog-posts";
import { Navbar } from "@/components/navbar";
import api from "@/utils/api";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";

const fetchPosts = async () => {
	const { data } = await api.get(
		"/posts"
	);
	return data;
};

export default async function Home() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["posts"],
		queryFn: fetchPosts,
	});

	return (
		<div className="mt-20">
			<Navbar />
			<div className="max-w-3xl mx-auto px-4">
				<BlogHeader />
				<HydrationBoundary state={dehydrate(queryClient)}>
					<BlogPosts />
				</HydrationBoundary>
			</div>
		</div>
	);
}
