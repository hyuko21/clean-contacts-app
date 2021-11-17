import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Container, Header } from './components'
import { ContactFormPage } from './pages/contacts'
import { ToastContainer } from 'react-toastify'

export function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Routes>
          <Route path='/contacts-form'  element={<ContactFormPage />} />
          <Route path='*' element={<Navigate to='/contacts-form' />} />
        </Routes>
      </Container>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        pauseOnFocusLoss={false}
        pauseOnHover
      />
    </BrowserRouter>
  )
}
