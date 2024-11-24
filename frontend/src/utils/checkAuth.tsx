"use client"

import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

const withAuth = (WrappedComponent: any) => {
	return (props: any) => {
		const router = useRouter();
		const [isAuthorized, setIsAuthorized] = useState(false);

		useEffect(() => {
			const token = getCookie("__vichar_token");
			if (!token) {
				router.replace("/not-signed-up");
			} else {
				setIsAuthorized(true);
			}
		}, []);

		if (!isAuthorized) {
			return null;
		}

		return <WrappedComponent {...props} />;
	};
};

export default withAuth;