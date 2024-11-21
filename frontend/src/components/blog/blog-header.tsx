/** @format */

export function BlogHeader() {
	return (
		<div className="rounded-xl border border-gray-800/40 p-6 mb-8">
			<h1 className="text-3xl font-semibold tracking-tight mb-2">
				vi-char
			</h1>
			<p className="mb-4 text-sm text-muted-foreground">
				विचार · noun
			</p>

			<p className="mb-2 text-sm text-muted-foreground">
				<a
					href="https://www.shabdkosh.com/dictionary/hindi-english/विचर"
					className="inline-block transition-colors duration-300 ease-in-out underline decoration-muted-foreground underline-offset-[3px] hover:decoration-foreground text-foreground">
					vichar
				</a>{" "}
				is a modern blogging platform designed to empower your voice and
				connect your ideas with the world. Share personal stories,
				professional insights, or creative musings in a seamless and
				engaging space.
			</p>
			<p className="mb-2 text-sm text-muted-foreground">
				Built with{" "}
				<a
					href="https://nextjs.org/"
					className="inline-block transition-colors duration-300 ease-in-out underline decoration-muted-foreground underline-offset-[3px] hover:decoration-foreground text-foreground">
					Next.js
				</a>
				,{" "}
				<a
					href="https://tailwindcss.com/"
					className="inline-block transition-colors duration-300 ease-in-out underline decoration-muted-foreground underline-offset-[3px] hover:decoration-foreground text-foreground">
					Tailwind CSS
				</a>
				, and{" "}
				<a
					href="https://ui.shadcn.dev/"
					className="inline-block transition-colors duration-300 ease-in-out underline decoration-muted-foreground underline-offset-[3px] hover:decoration-foreground text-foreground">
					shadcn/ui
				</a>
				, Vichar offers a clean, opinionated design tailored for
				creators. Join a community of thinkers and let your thoughts
				inspire the world.
			</p>
		</div>
	);
}
