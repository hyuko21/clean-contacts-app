import { Container, Header } from './components'
import { AddContactPage } from './pages/contacts'
import { ToastContainer } from 'react-toastify'

export function App() {
  return (
    <>
      <Header />
      <Container>
        <AddContactPage />
      </Container>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        pauseOnFocusLoss={false}
        pauseOnHover
      />
    </>
  )
}
