import Link from "next/link"

import { Button } from "@/components/ui/button"
import { getServerAuthSession } from "@/server/auth"

import { GetAllPosts } from "./_components/get-all-posts"
import { PostForm } from "./_components/post-form"

export default async function Home() {
	const session = await getServerAuthSession()

	return (
		<>
			<Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
				<Button>{session ? "Sign out" : "Sign in"}</Button>
			</Link>
			{session && (
				<>
					<PostForm />
					<GetAllPosts />
				</>
			)}
		</>
	)
}
