import { useEffect, useState } from "react";

type PostListProps = {
	searchText: string;
};

type Post = {
	id: number;
	title: string;
	body: string;
};

const PostList = ({ searchText }: PostListProps) => {
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		const controller = new AbortController();
		const fetchPosts = async () => {
			try {
				const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
					signal: controller.signal,
				});

				if (!res.ok) {
					throw new Error(`Request failed: ${res.status}`);
				}

				const data: Post[] = await res.json();
				console.log(data);
				setPosts(data);
			} catch (error) {
				if (error instanceof Error && error.name === "AbortError") {
					return;
				}

				console.error("Cound not fetch posts:", error);
			}
		};

		void fetchPosts();

		return () => {
			controller.abort();
		};
	}, []);

	const query = searchText.trim().toLowerCase();

	const filteredPosts = posts.filter((post) => {
		return post.title.toLowerCase().includes(query);
	});
	return (
		<ul className='list'>
			{filteredPosts.length > 0 ?
				filteredPosts.map((post) => (
					<li key={post.id}>
						<p>{post.title}</p>
						<p>{post.body}</p>
					</li>
				))
			:	<li>"No post found"</li>}
		</ul>
	);
};

export default PostList;
