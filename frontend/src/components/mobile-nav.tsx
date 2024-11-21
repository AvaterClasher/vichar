/** @format */

"use client";

import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Menu } from "lucide-react";

export function MobileNav({
	isLoggedIn,
	onLogout,
}: {
	isLoggedIn: boolean;
	onLogout: () => void;
}) {
	return (
		<div className="md:hidden">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="icon">
						<Menu />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<div>
						<DropdownMenuItem asChild>
							<a href="/authors">Authors</a>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<a href="/tags">Tags</a>
						</DropdownMenuItem>
						{isLoggedIn ? (
							<>
								<DropdownMenuItem asChild>
									<a href="/dashboard">Dashboard</a>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={onLogout}>
									Sign Out
								</DropdownMenuItem>
							</>
						) : (
							<>
								<DropdownMenuItem asChild>
									<a href="/login">Login</a>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<a href="/signup">Sign Up</a>
								</DropdownMenuItem>
							</>
						)}
					</div>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
