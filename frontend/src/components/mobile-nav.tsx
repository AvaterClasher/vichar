/** @format */

import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Menu } from "lucide-react";

export function MobileNav() {
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
							<a href="/blog">Blog</a>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<a href="/authors">Authors</a>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<a href="/about">About</a>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<a href="/tags">Tags</a>
						</DropdownMenuItem>
					</div>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
