import { Container } from 'react-bootstrap';
import './App.css';
import FooterInfo from './components/FooterInfo';
import TopBar from './components/TopBar';

function App() {
  return (
    <>
      <Container className="d-flexmin-vh-100">
        <header>
          <TopBar></TopBar>
        </header>
        <main>
          
        </main>
        <footer className='footer position-absolute bottom-0 mb-4'>
          <FooterInfo></FooterInfo>
        </footer>
      </Container>
    </>
  )
}

export default App
