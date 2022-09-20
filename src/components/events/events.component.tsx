import { getEvents } from '../../services/events';

const EventsComponent = () => {
    return (
        <>
        <section id="about1" className="about section-bg">
            <div className="container">

                <div id="accordion">

                    <h5 className="mb-0">
                        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <div className="section-title"><h2>Upcoming events</h2></div>
                        </button>
                    </h5>
                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card-body">
                            
                        </div>
                    </div>

                    <hr></hr>

                    <h5 className="mb-0">
                        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                            <div className="section-title"><h2>Past events <i className="bx bx-chevron-down"></i></h2></div>
                        </button>
                    </h5>

                    <div id="collapseTwo" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card-body">
                                
                        </div>
                    </div>


                </div>

            </div>
        </section>
        </>
    );
}

export default EventsComponent;