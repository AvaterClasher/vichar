export function Error({ message }: { message?: string }) {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen text-center">
			<div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-8 w-8 text-red-500"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M18.364 5.636a9 9 0 11-12.728 12.728 9 9 0 0112.728-12.728zM12 8v4m0 4h.01"
					/>
				</svg>
			</div>
			<p className="mt-4 text-lg font-semibold text-red-600">
				{message || "Something went wrong."}
			</p>
		</div>
	);
}
