import { useEffect, useState, createElement, MouseEvent, useRef } from 'react';
import { getEvents, AllEventsType, EventType } from '../../services/events';
import Spinner from 'react-bootstrap/Spinner';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Isotope from 'isotope-layout';

const EventsComponent = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [allEvents, setAllEvents] = useState<AllEventsType>({} as AllEventsType);
    const isotope = useRef<Isotope | null>();
    const [filterKey, setFilterKey] = useState('*');

    useEffect(() => {
        const getData = async () => {
            try {
                var events = await getEvents()
                setAllEvents(events)
                setIsLoading(false)
            } catch (e) {
                console.log(e)
            }
        }
        getData();

        AOS.init();
        isotope.current = new Isotope('.portfolio-container', {
            itemSelector: '.portfolio-item',
        });
        setFilterKey("filter-upcoming");
        return () => isotope.current?.destroy();
    }, []);

    useEffect(() => {
        if (filterKey === "*") isotope.current?.arrange({ filter: `*` });
        else isotope.current?.arrange({ filter: `.${filterKey}` });
    }, [filterKey]);

    const handleFilterKeyChange = async (e: MouseEvent<HTMLElement>) => {
        const filters = document.getElementById('portfolio-filters')?.getElementsByTagName('li') as HTMLCollectionOf<HTMLLIElement>;
        for(let i = 0; i < filters.length; i++) {
            filters[i].classList.remove('filter-active');
        }
        e.currentTarget.classList.add('filter-active');
        
        const key = e.currentTarget.getAttribute('data-filter');
        if (key === null) {
            throw new Error(`Error: Expected data-filter attribute to be assigned on ${e.currentTarget.classList}`);
        }
        setFilterKey(key);
    }

    const renderEvent = (e: EventType, catagory: string) => {
        const pastelColour = getPastelColour();
        return (
            <div key={e.EventID + e.EventDetailsID} className={"col-lg-4 col-md-6 portfolio-item filter-" + catagory}>
                <div id="hero" className="portfolio-wrap">
                    <div style={{textAlign: "center"}}>
                        <div className="portfolio-item-caption border-yoke">{e.Title}</div>
                        <div className="portfolio-item-caption">{e.Location}</div>
                        <div className="portfolio-item-caption">{e.DatetimeFormatted}</div>
                    </div>
                    <div className="portfolio-links">
                        <a href={e.EventICalURL} className="portfolio-lightbox" title={e.Title}><i className="bx bx-plus"></i></a>
                        <a href={e.EventURL} title="More Details"><i className="bx bx-link"></i></a>
                    </div>
                </div>
            </div>
        )
    }           

    return (
        <section id="portfolio" className="portfolio section-bg">
            <div className="container">
                <div className="section-title">
                    <h2>Events</h2>
                    <p>The society for all things tech-related; gaming, programming, robotics, hacking and more!</p>
                </div>

                <div className="row" data-aos="fade-up">
                    <div className="col-lg-12 d-flex justify-content-center">
                        <ul id="portfolio-filters">
                            <li onClick={handleFilterKeyChange} data-filter="*">All</li>
                            <li onClick={handleFilterKeyChange} data-filter="filter-upcoming" className="filter-active">Upcoming</li>
                            <li onClick={handleFilterKeyChange} data-filter="filter-past">Past</li>
                        </ul>
                    </div>
                </div>

                <div className="row portfolio-container" data-aos="fade-up" data-aos-delay="100">
                    {
                        isLoading ? <Spinner animation="border" /> : (
                            <>
                            {
                                allEvents?.upcoming.map((e: EventType) => {
                                    return (renderEvent(e, 'upcoming'));
                                })
                            }
                            {
                                allEvents?.past.map((e: EventType) => {
                                    return (renderEvent(e, 'past'));
                                })
                            }
                            </>
                        )
                    }
                </div>

            </div>
        </section>
    );
}

export default EventsComponent;