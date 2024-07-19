import "../public/globals.css";
import { lazy } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Nabvbar = lazy(() => import("./components/navbar"));
const StoreProvider = lazy(() => import('./storeProvider'));

export const metadata = {
  title: "songsara"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-zinc-900">
        <StoreProvider>
          <Nabvbar />
          {children}
          <ToastContainer
            theme="dark"
            draggable="mouse"
          />
        </StoreProvider>
      </body>
    </html>
  )
}