import '../styles/globals.css'
import { AppProps } from 'next/app'
import { ModalContext, ModalContextProvider } from './../contexts/modalContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ModalContextProvider>
      <Component {...pageProps} />
      <ModalContext.Consumer>
        {({ setModalRef }): JSX.Element => <div ref={setModalRef} />}
      </ModalContext.Consumer>
    </ModalContextProvider>
  )
}

export default MyApp
