export default function DonmixLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>{children}</main>
  )
}