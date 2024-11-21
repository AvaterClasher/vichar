/** @format */

import { formatDistance } from "date-fns";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Hash } from "lucide-react";
import { Separator } from "../ui/separator";
import crypto from "crypto";

// Demo data for rendering blog posts
const posts = [
	{
		id: 1,
		title: "Vichar",
        userEmail: "avater.clasher@gmail.com",
		excerpt:
			"विचार · noun\n\nविचार is a modern blogging platform designed to empower your voice and connect your ideas with the world. Share personal stories, professional insights, or creative musings in a seamless and engaging space.",
		author: {
			name: "Avater",
			avatar: "",
		},
		date: "2024-11-21",
		readTime: "3 min read",
		tags: ["vichar", "helo", "world"],
	},
];

export function BlogPosts() {
    const trimmedEmail = posts[0].userEmail.trim().toLowerCase();
    const hash = crypto.createHash('sha256').update(trimmedEmail).digest('hex');
    const getAvater = (hash:string, size: number) => {
        return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`
    }
	return (
		<div>
			<h2 className="text-2xl font-bold mb-6">Latest posts</h2>
			<div className="space-y-4">
				{posts.map((post) => (
					<Link
						key={post.id}
						href={`/blog/${post.id}`}
						className="block p-5 rounded-lg border transition-colors ">
						<div className="flex items-start justify-between mb-3">
							<h3 className="text-lg font-semibold">
								{post.title}
							</h3>
							<div className="flex items-center space-x-2 h-5">
								<img src={getAvater(hash, 20)} />
                                <Separator orientation="vertical"/>
								<span className="text-gray-400 text-sm">
									{formatDistance(
										new Date(post.date),
										new Date(),
										{ addSuffix: true }
									)}
								</span>
								<Separator orientation="vertical"/>
								<span className="text-gray-400 text-sm">
									{post.readTime}
								</span>
							</div>
						</div>
						<p className="text-muted-foreground mb-3 text-sm">
							{post.excerpt}
						</p>
						<div className="flex space-x-2">
							{post.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                    <Hash className="h-3 w-3"/> {tag}
                                </Badge>
							))}
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
