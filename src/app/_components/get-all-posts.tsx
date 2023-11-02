"use client"

import { api } from "@/trpc/react"

const GetAllPosts = () => {
	const { data: posts, isLoading } = api.post.getAll.useQuery()

	if (isLoading) return <div>loading...</div>

	return (
		<>
			{posts!.map((post) => (
				<div
					key={post.id}
					className="text-lg"
				>
					{post.name}
				</div>
			))}
		</>
	)
}

export { GetAllPosts }
