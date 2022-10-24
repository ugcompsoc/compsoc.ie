import { HeroComponent } from '../../components/splash';
import { AboutComponent } from '../../components/about';
import { ServicesComponent } from '../../components/services';
import { ContactComponent } from '../../components/contact';
import { EventsComponent } from '../../components/events';
import { InfographicComponent } from '../../components/infographic';

const HomeComponent = () => {
    return (
        <>
        <HeroComponent />
        <EventsComponent />
        <AboutComponent />
        <InfographicComponent />
        <ServicesComponent />
        <ContactComponent />
        </>
    );
}

export default HomeComponent;