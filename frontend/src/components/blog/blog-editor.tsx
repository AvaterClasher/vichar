/** @format */

"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { X, Loader2, Eye, Edit } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import PostPreview from "./blog-preview";
import api from "@/utils/api";
import { getCookie } from "cookies-next";

export default function BlogEditor() {
	const router = useRouter();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [currentTag, setCurrentTag] = useState("");
	const [description, setDescription] = useState("");
	const [banner, setBanner] = useState("");
	const [tags, setTags] = useState<string[]>([]);
	const [error, setError] = useState("");
	const token = getCookie("__vichar_token");

	const createPost = async (postData: {
		title: string;
		content: string;
		tag: string;
		bannerImageLink: string;
		description: string;
	}) => {
		const { data } = await api.post("/posts", postData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return data;
	};

	const mutation = useMutation({
		mutationFn: createPost,
		onSuccess: () => {
			router.push("/dashboard");
		},
		onError: (error: any) => {
			setError(error.response?.data?.message || "Failed to create post");
		},
	});

	const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && currentTag.trim()) {
			e.preventDefault();
			if (!tags.includes(currentTag.trim())) {
				setTags([...tags, currentTag.trim()]);
			}
			setCurrentTag("");
		}
	};

	const removeTag = (tagToRemove: string) => {
		setTags(tags.filter((tag) => tag !== tagToRemove));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim() || !content.trim()) {
			setError("Title and content are required");
			return;
		}

		mutation.mutate({
			title: title.trim(),
			content: content.trim(),
			tag: tags.join(","),
			bannerImageLink: banner.trim(),
			description: description.trim(),
		});
	};

	return (
		<div className="max-w-3xl mt-20 mx-auto p-6">
			<h2 className="text-2xl font-bold mb-6">Write a New Post</h2>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="space-y-2">
					<Input
						placeholder="Post title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="text-lg font-semibold"
					/>
				</div>

				<div className="space-y-2">
					<Input
						placeholder="Link of the banner image"
						value={banner}
						onChange={(e) => setTitle(e.target.value)}
						className="text-sm"
					/>
				</div>

				<div className="space-y-2">
					<Input
						placeholder="Description"
						value={description}
						onChange={(e) => setTitle(e.target.value)}
						className="text-sm"
					/>
				</div>

				<div className="space-y-2">
					<div className="flex flex-wrap gap-2 mb-4">
						{tags.map((tag) => (
							<Badge
								key={tag}
								variant="secondary"
								className="px-3 py-1">
								{tag}
								<button
									type="button"
									onClick={() => removeTag(tag)}
									className="ml-2 hover:text-destructive">
									<X className="h-3 w-3" />
								</button>
							</Badge>
						))}
					</div>
					<Input
						placeholder="Add tags (press Enter)"
						value={currentTag}
						onChange={(e) => setCurrentTag(e.target.value)}
						onKeyDown={handleAddTag}
						className="text-sm"
					/>
				</div>

				<Tabs defaultValue="edit" className="w-full">
					<TabsList className="grid w-full grid-cols-2 mb-4">
						<TabsTrigger
							value="edit"
							className="flex items-center gap-2">
							<Edit className="h-4 w-4" />
							Edit
						</TabsTrigger>
						<TabsTrigger
							value="preview"
							className="flex items-center gap-2">
							<Eye className="h-4 w-4" />
							Preview
						</TabsTrigger>
					</TabsList>
					<TabsContent value="edit">
						<Textarea
							placeholder="Write your post content here... (Markdown supported)"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							className="min-h-[300px] font-mono"
						/>
					</TabsContent>
					<TabsContent value="preview">
						<PostPreview
							title={title}
							content={content}
							tags={tags}
						/>
					</TabsContent>
				</Tabs>

				{error && <p className="text-sm text-destructive">{error}</p>}

				<div className="flex justify-end space-x-4">
					<Button
						type="button"
						variant="outline"
						onClick={() => router.back()}>
						Cancel
					</Button>
					<Button
						type="submit"
						disabled={mutation.isPending}
						className="min-w-[100px]">
						{mutation.isPending ? (
							<Loader2 className="h-4 w-4 animate-spin" />
						) : (
							"Publish"
						)}
					</Button>
				</div>
			</form>
		</div>
	);
}
