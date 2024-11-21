/** @format */

"use client";

import { QueryClientProvider, QueryClient, Hydrate } from "react-query";
import { useState } from "react";

const ReactQueryProvider = ({
	children,
	dehydratedState,
}: {
	children: React.ReactNode;
	dehydratedState?: any;
}) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						refetchOnReconnect: false,
						staleTime: 1000 * 60,
					},
				},
			})
	);

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={dehydratedState}>{children}</Hydrate>
		</QueryClientProvider>
	);
};

export default ReactQueryProvider;
