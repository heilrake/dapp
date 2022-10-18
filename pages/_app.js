import '@styles/globals.css';
import { Toaster } from 'react-hot-toast';

const Noop = ({ children }) => <>{children}</>

function MyApp({ Component, pageProps }) {

  const Layout = Component.Layout ?? Noop

  return (
    <Layout>
      <Toaster />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
