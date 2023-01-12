import { useEffect } from "react";
import { useLocation, useParams } from 'react-router-dom'

const EventDetailsComponent = () => {
    let { eventID } = useParams();
    const location = useLocation();
    let { e } = location.state;

    useEffect(() => {
        
    }, []);

    return (
        <></>
    )
}

export default EventDetailsComponent;