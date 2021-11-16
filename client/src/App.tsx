import { Container, Header } from './components'
import { AddContactPage } from './pages/contacts'

export function App() {
  return (
    <>
      <Header />
      <Container>
        <AddContactPage />
      </Container>
    </>
  )
}
