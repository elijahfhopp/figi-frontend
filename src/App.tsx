import { useState } from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import FooterInfo from './components/FooterInfo';
import TopBar from './components/TopBar';
import ImageTable from './components/image/ImageTable';
import SearchBar from './components/search/SearchBar';

function App() {
    let [searchResultIds, setSearchResultIds] = useState([] as number[])

    return (
        <>
            <canvas id="invisible-canvas" hidden></canvas>
            <Container className="d-flexmin-vh-100">
                <header>
                    <TopBar></TopBar>
                </header>
                <main style={{ minHeight: "80vh" }}>
                    <div className='px-3 pt-3'>
                        <SearchBar searchResultIds={searchResultIds} setSearchResultIds={setSearchResultIds}></SearchBar>
                    </div>
                    <div className='pt-4 border-top d-flex justify-content-center'>
                        <ImageTable imageIds={searchResultIds}></ImageTable>
                    </div>
                </main>
                <footer className='footer mb-4'>
                    <FooterInfo></FooterInfo>
                </footer>
            </Container>
        </>
    )
}

export default App
