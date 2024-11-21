"use client";

import { BlogPost } from "@/components/blog/blog-render";
import { Navbar } from "@/components/navbar";
import React from "react";

export default function Page() {
	return (
		<>
			<Navbar />
			<BlogPost />
		</>
	);
}
