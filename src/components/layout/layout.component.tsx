import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { SidePanelComponent } from '../sidepanel';
import { FooterComponent } from "../footer";
import { HomePage } from '../../pages/home';
import { CommitteePage } from '../../pages/committee';
import { BackToTopComponent } from '../backtotop';
import ConstitutionPage from '../../pages/constitution/constitution.page';

const LayoutComponent = () => {
    return(
        <>
        <SidePanelComponent/>

        <main id="main">

            <Router> 
                <Routes> 
                    <Route path ="/" element={<HomePage />}></Route>
                    <Route path ="/committee" element={<CommitteePage />}></Route>
                    <Route path ="/constitution" element={<ConstitutionPage />}></Route>
                </Routes>
            </Router>

            <FooterComponent />
            <BackToTopComponent />

        </main>
        </>
    );
}

export default LayoutComponent;