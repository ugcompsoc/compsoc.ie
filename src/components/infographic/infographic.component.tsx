import { NumberOfCommitteeMembers } from "../../services/committee";

const InfographicComponent = () => {
    return (
        <>
        <hr></hr>

        <section id="facts" className="facts">
        <div className="container">

            <div className="row no-gutters">
                <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch" data-aos="fade-up">
                    <div className="count-box">
                        <i className="icofont-calendar"></i>
                        <span data-toggle="counter-up">{ new Date().getFullYear() - 1977 }</span>
                        <p><strong>years</strong> established</p>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch" data-aos="fade-up" data-aos-delay="100">
                    <div className="count-box">
                        <i className="icofont-document-folder"></i>
                        <span data-toggle="counter-up">1,388</span>
                        <p><strong>members</strong> and growing each year</p>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch" data-aos="fade-up" data-aos-delay="200">
                    <div className="count-box">
                        <i className="icofont-live-support"></i>
                        <span data-toggle="counter-up">{ NumberOfCommitteeMembers }</span>
                        <p><strong>committee members</strong> in 2022/23</p>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch" data-aos="fade-up" data-aos-delay="300">
                    <div className="count-box">
                        <i className="icofont-users-alt-5"></i>
                        <span data-toggle="counter-up">5</span>
                        <p><strong>GB </strong> free server space per member</p>
                    </div>
                </div>

            </div>

        </div>
    </section>
    </>
    );
}

export default InfographicComponent;
