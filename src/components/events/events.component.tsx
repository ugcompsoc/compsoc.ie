import { useEffect, useState } from "react";
import { getEvents, AllEventsType, EventType } from "../../services/events";
import Spinner from "react-bootstrap/Spinner";

const EventsComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [allEvents, setAllEvents] = useState<AllEventsType>({ past: [], upcoming: [] });

  useEffect(() => {
    const controller = new AbortController();
    const getData = async () => {
      try {
        const events = await getEvents(controller.signal);
        setAllEvents(events);
      } catch (e) {
        if (!controller.signal.aborted) setError(true);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    getData();
    return () => controller.abort();
  }, []);

  const renderEvent = (e: EventType) => {
    // Decode HTML special characters (such as ' or &)
    const htmlDecode = (content: string) => {
      let e = document.createElement("textarea");
      e.innerHTML = content;
      e.innerHTML = e.value;
      return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    };

    // Using dangerouslySetInnerHTML as we know the data has been sanitised
    // Preparing to use Markdown instead of HTML
    return (
      <div key={`${e.EventID}:${e.EventDetailsID}`}>
        <h3>{htmlDecode(e.Title)}</h3>
        <p>{e.DatetimeFormatted}</p>

        <br></br>

        {
          <div
            dangerouslySetInnerHTML={{ __html: e.DangerousDescriptionHTML }}
          />
        }

        <div className="btn-toolbar">
          <a target="_blank" rel="noreferrer" href={e.EventURL}>
            <button type="button" className="btn btn-success">
              View / Join event
            </button>
          </a>
          &nbsp;
        </div>
      </div>
    );
  };

  return (
    <>
      <section id="about1" className="about section-bg">
        <div className="container">
          <div id="accordion">
            <h5 className="mb-0">
              <button
                className="btn btn-link"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <div className="section-title">
                  <h2>Upcoming events</h2>
                </div>
              </button>
            </h5>
            <div
              id="collapseOne"
              className="collapse show"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div className="card-body">
                {isLoading ? (
                  <Spinner animation="border" />
                ) : error ? (
                  <p role="alert">Events are unavailable right now. Please try again later.</p>
                ) : (
                  <>
                    {allEvents?.upcoming.map((e: EventType, i) => {
                      return renderEvent(e);
                    })}
                  </>
                )}
              </div>
            </div>

            <hr></hr>

            <h5 className="mb-0">
              <button
                className="btn btn-link"
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                <div className="section-title">
                  <h2>
                    Past events <i className="bx bx-chevron-down"></i>
                  </h2>
                </div>
              </button>
            </h5>

            <div
              id="collapseTwo"
              className="collapse"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div className="card-body">
                {isLoading ? (
                  <Spinner animation="border" />
                ) : error ? (
                  <p role="alert">Events are unavailable right now. Please try again later.</p>
                ) : (
                  <>
                    {allEvents?.past.map((e: EventType, i) => {
                      return renderEvent(e);
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventsComponent;
