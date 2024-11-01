import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import FooterInfo from './components/FooterInfo';
import TopBar from './components/TopBar';
import ImageCard from './components/ImageCard';

function App() {
  return (
    <>
      <Container className="d-flexmin-vh-100">
        <header>
          <TopBar></TopBar>
        </header>
        <main>
          <Row>
            <Col xs={6}>
              <ImageCard {...{ onClick: (e) => { console.log(e) }, imgPath: "hi", imageSrc: "/image/30", filetype: ".jpeg", size: 1000 }}></ImageCard>
            </Col>
          </Row>
        </main>
        <footer className='footer position-absolute bottom-0 mb-4'>
          <FooterInfo></FooterInfo>
        </footer>
      </Container>
    </>
  )
}

export default App
