import Link from "next/link"

import { Button } from "@/components/ui/button"
import { getServerAuthSession } from "@/server/auth"

import { CreatePost } from "./_components/create-post"
import { GetAllPosts } from "./_components/get-all-posts"

export default async function Home() {
	const session = await getServerAuthSession()

	return (
		<div>
			<Button>
				<Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
					{session ? "Sign out" : "Sign in"}
				</Link>
			</Button>
			{session && (
				<>
					<CreatePost />
					<GetAllPosts />
				</>
			)}
		</div>
	)
}
