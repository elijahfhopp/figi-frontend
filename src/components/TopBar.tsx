import "@fontsource/gaegu/latin-700.css"
import { Col, Row } from 'react-bootstrap'
import figiLogo from '../assets/figi_face.svg'
import ServerInfo from "./ServerInfo"
import './TopBar.css'


function LogoBar() {
    return (
        <>
            <Row className='border-bottom py-2 justify-content-ends align-content-center'>
                <Col className="d-flex align-items-center">
                    <img src={figiLogo} className="logo-img" alt="Figi logo" />
                    <span className='logo'>
                        FIGI
                    </span>
                </Col>
                <Col>
                    <ServerInfo></ServerInfo>
                </Col>
            </Row>
        </>
    )
}

export default LogoBar