import "../public/globals.css";
import { lazy } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from "react";
import Loading from "./components/loading";
import Auth from "./components/auth";
const Nabvbar = lazy(() => import("./components/navbar"));
const StoreProvider = lazy(() => import('./storeProvider'));

export const metadata = {
  title: "songsara"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-zinc-800">
        <StoreProvider>
          <Suspense fallback={<Loading />}>
            <Auth>
              <Nabvbar />
              {children}
              <ToastContainer
                theme="dark"
                draggable="mouse"
              />
            </Auth>
          </Suspense>
        </StoreProvider>
      </body>
    </html>
  )
}