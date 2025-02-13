import { AuthProvider } from "@/contexts/AuthContext";
import type { AppProps } from "next/app";
import { Provider } from "@/components/ui/provider";
import { ToastContainer } from "react-toastify";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} theme="dark"  />
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  )
}
