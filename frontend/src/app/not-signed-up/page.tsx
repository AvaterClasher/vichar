import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotSignedUp() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1 className="text-2xl font-bold">
				You are not signed up or logged in!
			</h1>
			<p className="text-lg">
				Please log in or sign up to access this page.
			</p>
			<div className="flex mt-5 gap-3">
				<Button variant="secondary" className="px-6">
					<Link href="/login">Login</Link>
				</Button>
				<Button variant="secondary">
					<Link href="/signup">Sign-Up</Link>
				</Button>
			</div>
		</div>
	);
}
