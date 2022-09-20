import { ConstitutionComponent } from '../../components/constitution';

const ConstitutionPage = () => {
    return (
        <>
        <section className="breadcrumbs">
            <div className="container">

                <div className="d-flex justify-content-between align-items-center">
                    <h2>Constitution </h2>
                    <ol>
                        Formally ratified by the USCG on the 27th May, 2022
                    </ol>
                </div>

            </div>
        </section>

        <section className="inner-page">
            <div className="container">
                <ConstitutionComponent />
            </div>
        </section>
        </>
    );
}

export default ConstitutionPage;