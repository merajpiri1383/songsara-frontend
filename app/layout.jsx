import "../public/globals.css";
import { lazy } from "react";
const Nabvbar = lazy(() => import("./components/navbar"));
 
export const metadata = {
  title : "songsara"
}
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nabvbar />
        {children}
      </body>
    </html>
  )
}