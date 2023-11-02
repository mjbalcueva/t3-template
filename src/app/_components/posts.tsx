import { CreatePost } from "./create-post"
import { GetAllPosts } from "./get-all-posts"
import { GetLatestPost } from "./get-latest-post"

const Posts = () => {
	return (
		<div className="w-full max-w-xs">
			<GetLatestPost />
			<CreatePost />
			<div className="my-4" />
			<GetAllPosts />
		</div>
	)
}

export default Posts
