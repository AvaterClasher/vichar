/** @format */

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import api from "@/utils/api";
import { Separator } from "@/components/ui/separator";
import { Badge } from "../ui/badge";
import { Hash } from "lucide-react";
import { Loading } from "../loading";
import { Error } from "../error";
import { MarkdownRenderer } from "../codeBlock";

const fetchBlogPost = async (id: string) => {
	const { data } = await api.get(`/posts/${id}`);
	return data;
};

export const BlogPost: React.FC = () => {
	const pathname = usePathname();
	const id = pathname.split("/")[2];

	const {
		data: blogData,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["blogPost", id],
		queryFn: () => fetchBlogPost(id as string),
	});

	if (isLoading) return <Loading />;
	if (isError) return <Error message={error.message} />;

	const {
		title,
		content,
		tag,
		createdAt,
		User,
		bannerImageLink,
		description,
	} = blogData;

	return (
		<div className="max-w-3xl mx-auto mt-20">
			<img
				src={bannerImageLink}
				alt={title}
				className="my-6 w-full h-96 rounded-lg"
			/>
			<div className="flex flex-col items-center justify-center gap-y-3 text-center">
				<h1 className="text-4xl font-bold leading-tight sm:text-5xl">
					{title}
				</h1>
				<p className="text-muted-foreground">{description}</p>
				<div className="flex text-sm h-5 text-muted-foreground gap-5 items-center">
					<span>By {User.username}</span>
					<Separator orientation="vertical" />
					<span>{new Date(createdAt).toLocaleDateString()}</span>
					<Separator orientation="vertical" />
					{Math.ceil(content.split(" ").length / 200)} min read
				</div>
				<div className="flex gap-2 mt-2">
					{tag
						? tag.split(",").map((tag: string) => (
								<Badge key={tag} variant="secondary">
									<Hash className="h-3 w-3" /> {tag}
								</Badge>
						  ))
						: null}
				</div>
			</div>
			<div className="mt-8 mb-20 prose prose-neutral dark:prose-invert max-w-none">
				<MarkdownRenderer>{content}</MarkdownRenderer>
			</div>
		</div>
	);
};
