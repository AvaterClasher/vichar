/** @format */

"use client";

import Link from "next/link";
import { ModeToggle } from "./dark-mode-toggle";
import { MobileNav } from "./mobile-nav";
import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";

export function Navbar() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		setIsLoggedIn(!!getCookie("__vichar_token"));
	}, []);

	const handleLogout = () => {
		deleteCookie("__vichar_token");
		deleteCookie("__vichar_id");
		setIsLoggedIn(false);
		window.location.href = "/";
	};

	return (
		<nav className="backdrop-blur-sm fixed w-full top-0 z-50">
			<div className="max-w-3xl mx-auto px-4 py-3">
				<div className="flex items-center justify-between">
					<Link href="/" className="flex items-center space-x-2">
						<span className="text-xl font-semibold">vichar</span>
					</Link>
					<div className="hidden text-sm md:flex items-center space-x-6">
						<Link
							href="/tags"
							className="inline-block duration-300 ease-in-out capitalize text-foreground/60 transition-colors hover:text-foreground/80">
							Tags
						</Link>
						{isLoggedIn ? (
							<>
								<Link
									href="/dashboard"
									className="inline-block duration-300 ease-in-out capitalize text-foreground/60 transition-colors hover:text-foreground/80">
									Dashboard
								</Link>
								<button
									onClick={handleLogout}
									className="inline-block duration-300 ease-in-out capitalize text-foreground/60 transition-colors hover:text-foreground/80">
									Sign Out
								</button>
							</>
						) : (
							<>
								<Link
									href="/login"
									className="inline-block duration-300 ease-in-out capitalize text-foreground/60 transition-colors hover:text-foreground/80">
									Login
								</Link>
								<Link
									href="/signup"
									className="inline-block duration-300 ease-in-out capitalize text-foreground/60 transition-colors hover:text-foreground/80">
									Sign Up
								</Link>
							</>
						)}
						<ModeToggle />
					</div>
					<div className="flex gap-2 md:hidden">
						<MobileNav
							isLoggedIn={isLoggedIn}
							onLogout={handleLogout}
						/>
						<ModeToggle />
					</div>
				</div>
			</div>
		</nav>
	);
}
