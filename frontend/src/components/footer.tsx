"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
	return (
		<footer className="w-full mt-auto bg-background py-4 pt-14">
			<div className="max-w-3xl mx-auto flex items-center justify-between px-4">
				<span className="text-sm text-foreground/60">
					© {new Date().getFullYear()} Vichar. All rights reserved.
				</span>
				<div className="flex space-x-6">
					<Link
						href="https://github.com/AvaterClasher"
						className="text-foreground/60 hover:text-foreground/80 transition-colors">
						<Github />
					</Link>
					<Link
						href="https://linkedin.com/in/soumyadip-moni"
						className="text-foreground/60 hover:text-foreground/80 transition-colors">
						<Linkedin />
					</Link>
				</div>
			</div>
		</footer>
	);
}
