import { cookies } from "next/headers"

import { GeistMono, GeistSans } from "geist/font"
import { Toaster as ToastProvider } from "sonner"

import "@/styles/globals.css"
import { TRPCReactProvider } from "@/trpc/react"

export const metadata = {
	title: "Template Title",
	description: "Template Description",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html
			lang="en"
			className={`${GeistSans.variable} ${GeistMono.variable}`}
		>
			<body>
				<TRPCReactProvider cookies={cookies().toString()}>
					<ToastProvider richColors />
					{children}
				</TRPCReactProvider>
			</body>
		</html>
	)
}
