import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NewHeader from '~/components/newHeader/NewHeader'
import { GetStaticPropsContext } from 'next/types'
import { Sport } from '~/config/types'
import { getAllSports } from '~/services/sportService'

type PropsType = {
  sports: Sport[]
}

export const getStaticProps = async ({ params }: GetStaticPropsContext): Promise<{ props: PropsType }> => {
  const sports = await getAllSports()

  return { props: { sports } }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NewHeader sports={pageProps.sports} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
