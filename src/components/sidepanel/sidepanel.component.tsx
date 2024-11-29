import { useRef } from 'react';
import { NavigationMenuComponent, RefType } from "./navigationmenu"
import { ProfileSectionComponent } from "./profilesection"

const SidePanelComponent = () => {
    const navMenuRef = useRef<RefType>(null)

    // See comment in NavigationComponent
    const toggleMobileNavBar = () => {
        navMenuRef.current?.toggleMobileNavBar()
    }

    return (
        <>
        <header onClick={toggleMobileNavBar} id="header">
            <div className="d-flex flex-column">
                <ProfileSectionComponent/>
                <NavigationMenuComponent ref={navMenuRef}/>
                <div style={{textAlign: 'center'}}>
                    <a href="https://www.datacamp.com/donates">
                        <img style={{maxWidth: '50%', paddingTop: '2vh'}} src="/assets/img/datacamp_donates.png" alt="DataCamp Donates"/>
                    </a>
                </div>
            </div>
        </header>
        </>
    );
}

export default SidePanelComponent;