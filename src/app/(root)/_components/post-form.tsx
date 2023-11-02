"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { type Post } from "@prisma/client"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { api } from "@/trpc/react"

const formSchema = z.object({
	name: z.string().trim().min(1),
})

type formSchemaType = z.infer<typeof formSchema>

const PostForm = () => {
	const utils = api.useUtils()

	const form = useForm<formSchemaType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	})

	const { mutate: createPost } = api.post.create.useMutation({
		onMutate: async (newData) => {
			await utils.post.getAll.cancel()
			const previousPosts = utils.post.getAll.getData()

			utils.post.getAll.setData(undefined, (prev) => {
				const optimisticPost: Post = {
					id: Math.random(),
					name: newData.name.trim(),
					createdAt: new Date(),
					updatedAt: new Date(),
					createdById: "optimistic user id",
				}

				if (!prev) return [optimisticPost]
				return [optimisticPost, ...prev]
			})

			form.setValue("name", "")
			return { previousPosts }
		},
		onError: (error, oldData, context) => {
			toast.error(error.message)
			form.setValue("name", oldData.name)
			if (!context) return
			utils.post.getAll.setData(undefined, () => context.previousPosts)
		},
		onSettled: async () => {
			await utils.post.getAll.invalidate()
		},
	})

	const onSubmit = (data: formSchemaType) => {
		createPost(data)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-[400px]"
			>
				<FormField
					control={form.control}
					name={"name"}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Post Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	)
}

export { PostForm }
