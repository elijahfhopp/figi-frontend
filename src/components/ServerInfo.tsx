import { gql, useQuery } from "@apollo/client"
import { Col, Stack } from "react-bootstrap"

function ServerInfoBar() {
    let content = undefined
    const { loading, error, data } = useQuery(gql`
        {
            serverInfo {
                imageEntries
                faceEntries
            }
        }
    `)


    if (error) {
        content = (<Col><span className="text-danger">{`${error}`}</span></Col>)
    }
    else if (loading) {
        content = (<Col xs={2}><span>Loading...</span></Col>)
    }
    else {
        let db = data.serverInfo
        content = (<>
            <Col>
                <span>{`${db.imageEntries} indexed photos.`}</span>
            </Col>
            <Col>
                <span>{`${db.faceEntries} faces.`}</span>
            </Col>
            <Col>
                <span style={{
                    rotate: "7deg",
                    display: "block",
                    fontFamily: "serif"
                }}>-32,768 issues</span>
            </Col>
        </>)
    }

    return (
        <Stack className="text-muted px-3 d-flex align-items-end">
            {content}
        </Stack>
    )
}

export default ServerInfoBar