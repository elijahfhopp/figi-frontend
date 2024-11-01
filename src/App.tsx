import { Container } from 'react-bootstrap';
import './App.css';
import FooterInfo from './components/FooterInfo';
import TopBar from './components/TopBar';
import ImageTable from './components/image/ImageTable';

function App() {
  return (
    <>
      <div id="canvas-container" hidden></div>
      <Container className="d-flexmin-vh-100">
        <header>
          <TopBar></TopBar>
        </header>
        <main style={{minHeight: "100vh"}}>
          <ImageTable imageIds={[30, 40, 39, 60, 100, 230]}></ImageTable>
        </main>
        <footer className='footer mb-4'>
          <FooterInfo></FooterInfo>
        </footer>
      </Container>
    </>
  )
}

export default App
