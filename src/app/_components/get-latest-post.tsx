"use client"

import { api } from "@/trpc/react"

const GetLatestPost = () => {
	const { data: latestPost, isLoading } = api.post.getAll.useQuery()

	if (isLoading) return <div>loading...</div>

	return (
		<>
			{latestPost ? (
				<p className="truncate">Your most recent post: {latestPost[0]!.name}</p>
			) : (
				<p>You have no posts yet.</p>
			)}
		</>
	)
}

export { GetLatestPost }
