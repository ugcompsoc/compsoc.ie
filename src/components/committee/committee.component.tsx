import { CommitteeYear, Person, DefaultBio, DefaultPhoto, CommitteeYears } from '../../services/committee';

const renderCommittee = () => {
    return (
        <>
        <section className="breadcrumbs">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <h2>Meet the Committee </h2>
                    <ol>
                        2025/26
                    </ol>
                </div>
            </div>
        </section>

        { CommitteeYears.map((committeeYear: CommitteeYear, committeeYearIndex: number) => {
            return (
                <>
                <div id="accordion">
                    <h5 className="mb-0">
                        <button className="btn btn-link" data-toggle="collapse" data-target={ "collapsable-" + committeeYear.year } aria-expanded="true"
                            aria-controls={ "collapsable-" + committeeYear.year }>

                            {(() => {
                                if (committeeYearIndex == 0)
                                    return (<div className="section-title"><h2>Current Committee</h2></div>);
                                else
                                    return (<div className="section-title"><h2>Committee {committeeYear.year}</h2></div>);
                            })()}

                        </button>
                    </h5>
                </div>

                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                    <div className="py-5 team4">
                        <div className="container">
                            <div className="row">

                                {
                                    committeeYear.committee?.map((person) => {
                                        return ( renderPerson(person) );
                                    })
                                }
                            
                            </div>
                        </div>
                    </div>
                </div>
                </>
            );
        }) }
        </>
    );
}

const renderPerson = (person: Person) => {
    return (
        <div className="col-lg-3 mb-4">
            <div className="row">
                <div className="col-md-12 text-center">
                    <img src={ person.photo.length == 0 ? DefaultPhoto : person.photo } alt="wrapkit"
                        className="img-fluid rounded-circle"/>
                </div>
                <div className="col-md-12 text-center">
                    <div className="pt-2">
                        <h5 className="mt-4 font-weight-medium mb-0">{ person.name }</h5>
                        <h6 className="subtitle mb-3">{ person.position }</h6>
                        <p><div className="text-left">{ person.bio.length == 0 ? DefaultBio : person.bio }</div></p>
                        <ul className="list-inline">

                            {
                                person.social_links?.map((socialLink) => {
                                    // TODO Probably not the best solution
                                    const key = Object.keys(socialLink)[0];
                                    return (
                                        <li className="list-inline-item">
                                            <a href={ socialLink[key].valueOf() } className="text-decoration-none d-block px-1">
                                                <i className={ key }></i>
                                            </a>
                                        </li>
                                    );
                                })
                            }

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

const CommitteeComponent = () => {
    return (
        <>
        <div className="container">
            { renderCommittee() }
        </div>
        </> 
    );
}

export default CommitteeComponent;
