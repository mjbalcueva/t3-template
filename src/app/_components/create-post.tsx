"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { type Post } from "@prisma/client"

import { api } from "@/trpc/react"

export function CreatePost() {
	const router = useRouter()
	const [name, setName] = useState("")

	const utils = api.useUtils()

	const { mutate: createPost, isLoading } = api.post.create.useMutation({
		onMutate: async (newTodo) => {
			await utils.post.getAll.cancel()

			const previousPosts = utils.post.getAll.getData()
			utils.post.getAll.setData(undefined, (prev) => {
				const optimisticPost: Post = {
					id: Math.random(),
					name: newTodo.name,
					createdAt: new Date(),
					updatedAt: new Date(),
					createdById: "optimistic user id",
				}
				if (!prev) return [optimisticPost]
				return [optimisticPost, ...prev]
			})

			setName("")
			return { previousPosts }
		},
		onError: (_err, newTodo, context) => {
			setName(newTodo.name)
			if (!context) return
			utils.post.getAll.setData(undefined, () => context.previousPosts)
		},
		onSuccess: () => {
			router.refresh()
		},
		onSettled: async () => {
			await utils.post.getAll.invalidate()
		},
	})

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				createPost({ name })
			}}
			className="flex flex-col gap-2"
		>
			<input
				type="text"
				placeholder="Title"
				value={name}
				onChange={(e) => setName(e.target.value)}
				className="w-full rounded-full px-4 py-2 text-black"
			/>
			<button
				type="submit"
				className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
				disabled={isLoading}
			>
				{isLoading ? "Submitting..." : "Submit"}
			</button>
		</form>
	)
}
