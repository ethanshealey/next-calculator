import '@/styles/globals.scss'
import '@/styles/BasicCalculator.scss'
import '@/styles/Interest.scss'
import '@/styles/Loan.scss'

import Layout from '../components/Layout'

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
