// import Dashboard from "@/components/dashboard";
import BlogEditor from "@/components/blog/blog-editor";
import { Navbar } from "@/components/navbar";

export default function Page() {
	return (
		<>
			<div className="">
				<Navbar />
                <BlogEditor/>
			</div>
		</>
	);
}

