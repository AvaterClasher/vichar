/** @format */

"use client";

import Link from "next/link";
import { ModeToggle } from "./dark-mode-toggle";
import { MobileNav } from "./mobile-nav";

export function Navbar() {
	return (
		<nav className="backdrop-blur-sm fixed w-full top-0 z-50">
			<div className="max-w-3xl mx-auto px-4 py-3">
				<div className="flex items-center justify-between">
					<Link href="/" className="flex items-center space-x-2">
						<span className="text-xl font-semibold">vichar</span>
					</Link>
					<div className="hidden text-sm md:flex items-center space-x-6">
						<Link
							href="/blog"
							className="inline-block duration-300 ease-in-out capitalize text-foreground/60 transition-colors hover:text-foreground/80">
							Blog
						</Link>
						<Link
							href="/authors"
							className="inline-block duration-300 ease-in-out capitalize text-foreground/60 transition-colors hover:text-foreground/80">
							Authors
						</Link>
						<Link
							href="/about"
							className="inline-block duration-300 ease-in-out capitalize text-foreground/60 transition-colors hover:text-foreground/80">
							About
						</Link>
						<Link
							href="/tags"
							className="inline-block duration-300 ease-in-out capitalize text-foreground/60 transition-colors hover:text-foreground/80">
							Tags
						</Link>
                        <ModeToggle />
					</div>
					<div className="flex gap-2 md:hidden">
						<MobileNav />
						<ModeToggle/>
					</div>
				</div>
			</div>
		</nav>
	);
}
