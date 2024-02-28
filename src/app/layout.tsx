import { UserProvider } from "../hooks/contexts"
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {children}
          <Toaster position="top-center"
            reverseOrder={false} />
        </UserProvider>
      </body>
    </html>
  )
}
