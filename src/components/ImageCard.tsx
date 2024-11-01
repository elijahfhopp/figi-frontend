function ImageCard() {
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

export default ImageCard