import { BlogHeader } from "@/components/blog/blog-header";
import BlogPosts from "@/components/blog/blog-posts";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async () => {
	const { data } = await axios.get(
		"https://collective-violante-avater-dffc8fee.koyeb.app/api/posts"
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
		<div className="max-w-3xl mx-auto px-4">
			<HydrationBoundary state={dehydrate(queryClient)}>
				<BlogHeader />
				<BlogPosts />
			</HydrationBoundary>
		</div>
	);
}
