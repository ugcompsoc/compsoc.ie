import { useEffect } from "react";

const ConstitutionComponent = () =>{
    return ( 
        <>
        <h3 id="article_1name_of_the_society" className="sectionedit2">Article 1: Name of the Society</h3>
        <div className="level3">
            <p>1.1 The name of the Society shall be Computer Society, NUI Galway, hereinafter referred to as &ldquo;the Society&rdquo;.</p>
            <p>1.2 The Society may be commonly known as: CompSoc.</p>
            <p>1.3 The Society exists as a constituent part of the University and is therefore subject to all relevant University and University Societies Coordination Group (USCG) policies and rules.</p>
        </div>

        <h3 id="article_2alliances_affiliations_with_external_bodies" className="sectionedit3">Article 2: Alliances/Affiliations with External bodies</h3>
        <div className="level3">
            <p>2.1 The Society is not aligned and/or affiliated with any external bodies.</p>
            <p>2.2 The Society is a constituent part of the University and where there are alliances and affiliations with external bodies the Society is subject to the USCG Society policy on external affiliation as may be updated from time to time.</p>
        </div>

        <h3 id="article_3aims_of_the_society" className="sectionedit4">Article 3: Aims of the Society</h3>
        <div className="level3">
            <p>The aims of the Society shall be:</p>
            <ul>
                <li>To promote and increase awareness of electronic communication and related computer systems.</li>
                <li>To provide a forum to discuss and gain experience in computer networking and systems.</li>
                <li>To help educate people in the usage of Internet utilities and resources.</li>
            </ul>
        </div>

        <h3 id="article_4membership" className="sectionedit5">Article 4: Membership</h3>
        <div className="level3">
            <p>4.1 All current students and current staff of the University shall be eligible to become full members of the Society.</p>
            <p>4.1.1 Students and Staff may be prohibited from being a member where they have been subject to a USCG or University sanction prohibiting them from such.</p>
            <p>4.2 Any eligible person shall become a member of the Society upon registering with the Society on any Societies&rsquo; Day, or using the official societies registration, and payment of appropriate fee if applicable.</p>
            <p>4.2.1 Should the Society charge a membership fee, full membership shall be granted upon payment of said fee. The fee shall be determined by the Committee annually, subject to the approval of the Societies Office. All such monies thus received must be lodged in full to the Society&rsquo;s bank account.</p>
            <p>4.2.2 Should the Society be affiliated with a body that charges a membership fee, members are not obliged to join the external body and therefore not obliged to pay the membership fee.</p>
            <p>4.3 The Society may, subject to approval of the USCG, elect any member or alumni who they deem to have done great service for the Society to be an Honorary Life Member (HLM) in perpetuity of the Society.</p>
            <p>4.3.1 An HLM is entitled to entry to Society events and speaking rights at regular meetings, but is not entitled to a vote at regular meetings or Annual General Meeting (AGM) / Extraordinary General Meeting (EGM), and is also not entitled to stand for a committee position or any other privileges open to full members.</p>
            <p>4.3.2 If an HLM becomes eligible for full membership as per article 4.1 he/she shall have the same privileges as a full member.</p>
        </div>

        <h3 id="article_5the_committee" className="sectionedit6">Article 5: The Committee</h3>
        <div className="level3">
            <p>5.1 A Committee shall conduct the business of the Society.</p>
            <p>5.2 All members of the Committee shall be required to be full members of the Society.</p>
            <p>5.3 All full members of the Society are eligible to be elected to the Committee except those explicitly disallowed hereinafter.</p>
            <p>5.3.1 Full members are ineligible to stand for election and/or act as a member of the Committee where they have been subject to a USCG or University sanction prohibiting them from doing so.</p>
            <p>5.4 The Committee shall consist of the core members specified in Article 5.5, additional specified committee members specified in Article 5.6.2, and ordinary Committee members as specified in article 5.7.</p>
            <p>5.5 Core Positions The core positions are Auditor, Vice-Auditor, Treasurer, Secretary. The Committee must consist of at least these four positions.</p>
            <p>5.5.1 Auditor</p>
            <p>The Auditor shall have overall responsibility for the affairs of the Society. The Auditor shall chair all meetings of the Society save where otherwise provided for in this Constitution. The Auditor has ultimate responsibility of ensuring that all Society requirements are fulfilled.</p>
            <p>5.5.1.1 The Auditor in the cases of all votes shall be eligible to vote. In the case of a tie, the Auditor may use his/her casting vote thereafter to decide the tie, except as provided for in Article 9.2. This may or may not be in accordance with his/her original vote.</p>
            <p>5.5.2 Vice-Auditor</p>
            <p>The Vice Auditor must assist the Auditor in the general running of the Society. The Vice-Auditor shall assume the duties of the Auditor should the Auditor be absent or unable to fulfil his/her duties. The Vice-Auditor may fulfil any general role as defined by the Committee.</p>
            <p>5.5.3 Treasurer</p>
            <p>The Treasurer will manage the financial affairs of the Society, in consultation with the Auditor &amp; the Committee. The Treasurer will maintain the financial records of the Society. He/She will prepare and present a Treasurer&rsquo;s Report to the Society at the AGM. The Treasurer must prepare and present the end of year financial report, and all accounts as required by the Societies Office, in accordance with the deadline stated by the Societies Office.</p>
            <p>5.5.4 Secretary</p>
            <p>The Secretary shall keep the non-financial records of the Society, and shall submit the end of year report. The Secretary is responsible for ensuring that all events are posted to the Societies Calendar. The Secretary shall manage the correspondence of the Society. The Secretary is also tasked with taking minutes of all Committee meetings, general meetings, AGM(s) &amp; EGM(s) during his/her term of office. Such minutes should be emailed to all committee members following each meeting.</p>
            <p>5.6 Additional Specified Committee Members</p>
            <p>The Society may create Additional Specified Committee Members (ASCMs). ASCMs of the Society are listed and described in article 5.6.2 and it&rsquo;s sub-articles respectively. Where the Society wishes to create, modify or remove an ASCM, it will be done by means of an Amendment to Article 5.6.2 which shall also create, modify or remove a sub-article respectively to effect this change.</p>
            <p>5.6.1 In cases hereinafter where it is explicitly stated that an ASCM may be co-opted, the Society may vote to allow the duties and title of an ASCM position may be co-opted by the Committee to a member of the Committee.</p>
            <p>5.6.2 The following ASCMs will be elected/appointed to the Committee; Public Relations Officer, Safety Officer, Webmaster, Senior System Administrator and System Administrator.</p>
            <p>5.6.2.1 Public Relations Officer (PRO)</p>
            <p>The PRO shall be responsible for publicising the meetings and events of the Society.</p>
            <p>5.6.2.2 Safety Officer (SO)</p>
            <p>The SO will have responsibility for ensuring compliance with Societies&rsquo; Safety Procedures and Policies. The Society may, decide to co-opt this position as per article 5.6.1.</p>
            <p>6.6.2.3 Webmaster</p>
            <p>The Webmaster shall be responsible for the design, implementation, and maintenance of the web site. They shall work in conjunction with other members of the committee in order to publicise society details via the web. The Society may, decide to co-opt this position as per article 5.6.1.</p>
            <p>6.6.2.4 Chief System Administrator (CSA)</p>
            <p>The Chief System Administrator shall be held ultimately responsible for the administration,security, and maintenance of the society's computer systems. They shall be responsible for the notification of the committee in regard to any breaches of the rules and regulations of the system. <br></br>They are hereby authorised to take any administrative action necessary to discharge their duties, so long as such actions are constitutional. Such actions are open to review by the committee. The Society may, decide to co-opt this position as per article 5.6.1.</p>
            <p>6.6.2.5 System Administrator</p>
            <p>The System Administrator(s) shall be held ultimately responsible for the administration, security, and maintenance of the society&rsquo;s computer systems. They are hereby authorised to take any administrative action necessary to discharge their duties, so long as such actions are constitutional. Such actions are open to review by the committee. The System Administrator(s) will work closely with the Senior System Administrator to fairly delegate tasks. The Society may, decide to co-opt this position as per article 5.6.1.</p>
            <p>5.6.2.6 Helpdesk</p>
            <p>The Helpdesk shall be the first port of call for all members using the society’s services. They shall be held ultimately responsible for monitoring/maintaining the ticketing queues and writing beneficial tutorials for the members on the society wiki. <br></br>Such actions are open to review by the committee. The Helpdesk will work closely with the Chief System Administrator to fairly delegate tasks. The Society may, decide to co-opt this position as per article 5.6.1.</p>
            <p>5.6.2.7 Data Protection Officer (DPO)</p>
            <p>5.6.2.7 The Data Protection Officer shall be held responsible for ensuring that the society processes the personal data of its members, providers or any other individuals (also referred to as data subjects) in compliance with the applicable data protection rules. <br></br>They shall train the committee on their data protection obligations, conduct audits to ensure data protection compliance, and serve as a point of contact for any data subject for any queries regarding data processing. They shall work independently within the society and report findings/concerns directly to the Auditor or Chief System Administrator. They shall not co-opt this position if they are already a controller of processing activities.</p>
            <p>5.7 Ordinary Committee Members</p>
            <p>Ordinary Committee Members (OCMs) shall be elected to a maximum of 4, at an AGM/EGM. They shall be full Committee members, and will contribute to the quorum and will have a vote on the Committee. OCM tasks may be allocated as required by the Committee.</p>
            <p>5.8 Committee Meetings</p>
            <p>5.8.1 Meetings of the Committee shall be held at least 3 during each academic term. All members of the Committee shall be entitled to attend and vote at such meetings.</p>
            <p>5.8.2 The quorum for a meeting of the Committee shall be at least 51% Committee members.</p>
            <p>5.8.3 Meetings of the Committee shall be convened (called) by the Auditor or by the Secretary; at least 3 days&rsquo; notice of a Committee meeting shall be given by the Auditor or Secretary to the members of the Committee.</p>
            <p>5.8.3.1 Should there be a major issue with the Society server and networking equipment or services, the Senior Server Administrator may convene an emergency meeting.</p>
            <p>5.8.4 Meetings may also be convened at the request of 3 or 50% of the Committee, whichever is the larger number, with at least the minimum notice period as per 5.8.3, except in the case of 5.8.3.1. Failure of the Auditor or Secretary to issue this notice within 5 days of receipt of the request by these members in writing shall entitle these members to issue said notice to the Committee.</p>
            <p>5.8.5 All Committee members must be notified by their chosen email and by other means as agreed.</p>
            <p>5.8.6 Committee members that fail to attend 3 consecutive Committee meetings, without apologies accepted by the Committee, shall be deemed to have resigned.</p>
            <p>5.9 Term of Office of the Committee</p>
            <p>The Committee shall hold office for a specific one year term to decided and published by USCG annually (Currently July 1st &ndash; June 30th of the following year).</p>
        </div>

        <h3 id="article_6standing_orders_of_the_society" className="sectionedit7">Article 6: Standing Orders of the Society.</h3>
        <div className="level3">
            <p>6.1 The Society does not have Standing Orders.</p>
            <p>6.2 Should the Society have Standing Orders, this Constitution supersedes any and all provisions in the Standing Orders and takes precedence, if there is conflict.</p>
            <p>6.3 Should the Society have Standing Orders, the Committee shall furnish a copy of the Standings Orders, and must continue to do so for any amendments or new articles, to the USCG for approval.</p>
            <p>6.4 Should the Society have Standing Orders, the Committee shall make available the Standing Orders along with its Constitution on its official Society profile, viewable to all.</p>
        </div>

        <h3 id="article_7annual_general_meetings" className="sectionedit8">Article 7: Annual General Meetings</h3>
        <div className="level3">
            <p>7.1.1 The Annual General Meeting of the Society shall take place in the second semester of the academic year, at a time to be determined by the Committee of the Society. The Annual General Meeting must be held before the second semester teaching term ends.</p>
            <p>7.1.2 No less than six days&rsquo; notice of the Annual General Meeting shall be given to the Society&rsquo;s members. The date and time of the AGM shall be notified to the Society&rsquo;s Members. This is done by, at a minimum, uploading the date to the Societies Calendar, emailing all members, and by other means as agreed.</p>
        </div>

        <h3 id="article_8extraordinary_general_meetings" className="sectionedit9">Article 8: Extraordinary General Meetings</h3>
        <div className="level3">
            <p>8.1 An Extraordinary General Meeting of the Society may be convened to:</p>
            <p>(i) Hold an election to fill a vacancy on the Committee, should one arise.</p>
            <p>(ii) Consider a proposal to amend this Constitution or any other governing instrument of the Society;</p>
            <p>(iii) Address any other circumstance not provided for in this Constitution.</p>
            <p>8.2 An Extraordinary General Meeting shall be convened:</p>
            <p>(i) By the Auditor or Secretary</p>
            <p>(ii) By majority (50% +1) decision of the Committee; or</p>
            <p>(iii) On foot of a submission to the Societies Office of a petition signed by not less than 75 Members of the Society or 33% of the membership, whichever is smaller. Only the signatures of Members who are eligible to a vote at General Meetings on the date of submission of the petition, as per Article 10.2, may be counted towards the quota of signatures.</p>
            <p>8.3 In the case of a resignation or dismissal, or removal as a result of a USCG or University sanction, from the Committee of a Committee member, the Committee shall have the power to co-opt any full member of the Society to the Committee until the next general meeting (be it an EGM or an AGM), at which a new officer will be appointed. This must be convened within 4 teaching term weeks from the resignation.</p>
            <p>8.4 No less than six days&rsquo; notice of the Extraordinary General Meeting shall be given to the Society&rsquo;s members. The date and time of the EGM shall be notified to the Society&rsquo;s Members. This is done by, at a minimum, uploading the date to the Societies Calendar, emailing all members, and by other means as agreed.</p>
        </div>

        <h3 id="article_9election_of_the_committee" className="sectionedit10">Article 9: Election of the Committee</h3>
        <div className="level3">
            <p>9.1 The Committee of the Society shall be elected at the Annual General Meeting, except where otherwise provided for in this Constitution.</p>
            <p>9.2 The Auditor shall appoint a Returning Officer for elections. The Auditor may appoint himself/herself as returning officer. The Returning Officer may not be a candidate in any of the elections. The Returning Officer must not vote, bar to cast a casting vote in the event of a tie. In the event of a tie, the Auditor, where he/she is the returning officer, receives a casting vote; in the event where the Auditor is not the returning officer, he/she receives no casting vote.</p>
            <p>9.3 All Members who are eligible to a vote at General Meetings on the date of an election, as per Article 10.2, shall be eligible for election to the Committee, except as provided for in Article 5.3.</p>
            <p>9.4 Candidates for each position on the Committee of the Society must be proposed and seconded by members of the Society at the AGM. The candidates may propose themselves.</p>
            <p>9.5 The election of members of the Committee shall take place by secret ballot at the AGM. This, at the discretion the Returning Officer with the agreement of two-thirds of the membership attending the AGM, may be changed to a show of hands. Should this be implemented it is considered to be a change confined to that specific AGM/EGM and not be deemed a change to the Constitution.</p>
        </div>

        <h3 id="article_10voting_at_general_meetings" className="sectionedit11">Article 10: Voting at General Meetings</h3>
        <div className="level3">
            <p>10.1 Voting shall be by show of hands, unless otherwise determined in a vote at any specific meeting.</p>
            <p>10.2 Full Members of at least 30 days standing of the Society shall be entitled to vote in motions at General Meetings. The Secretary must present the membership list of those eligible to vote at the election.</p>
            <p>10.3 Motions and resolutions must be passed by a simple majority of those Full Members present at the meeting, except where otherwise stipulated in this Constitution.</p>
        </div>

        <h3 id="article_11resignations_from_the_committee" className="sectionedit12">Article 11: Resignations from the Committee</h3>
        <div className="level3">
            <p>11.1 The resignation of any member of the Committee shall be instituted by a letter of resignation to the Secretary of the Society.</p>
            <p>11.1.1 In the case of the resignation of the Secretary, resignation may be instituted by a letter of resignation to the Auditor.</p>
            <p>11.2 In the case of resignation during term time, the resigning Committee member must handover all Society property, passwords and handover documents to the committee as per Article 12.1 and, where practical, assist with the induction of his/her replacement.</p>
        </div>

        <h3 id="article_12handover_documents" className="sectionedit13">Article 12: Handover Documents</h3>
        <div className="level3">
            <p>12.1 Each outgoing officer of the Committee must present Handover Documents at the end of his/her term detailing the specific roles and responsibilities of their office, and the person(s) with whom he/she conducted the business of the Society, in order to assist the incoming officer with his/her development of the Society.</p>
        </div>

        <h3 id="article_13instigation_of_disciplinary_action" className="sectionedit14">Article 13: Instigation of Disciplinary Action</h3>
        <div className="level3">
            <p>13.1 The Committee and all members of the Society shall comply with the disciplinary, grievance, bullying and harassment procedures, and all other procedures of the University and the USCG, as may be added to or amended from time to time, with reference to the Societies Complaints Procedure.</p>
            <p>13.1.1 Committee members that bring the Society into disrepute may be removed by the Committee, with reference to the Societies Complaints Procedure. This decision is subject to approval from the USCG before taking effect.</p>
            <p>13.1.2 Society members that bring the Society into disrepute may be removed from the membership list by a vote of the Committee, with reference to the Societies Complaints Procedure. This decision is subject to approval from USCG before taking effect.</p>
            <p>The following constitute some examples of breaches of discipline (but breaches are not limited to the following):</p>
            <p>(i) Serious or persistent breach of Health and Safety.</p>
            <p>(ii) Bringing the name of the Society into disrepute.</p>
            <p>(iii) Acting against the aims and/or objectives of the Society.</p>
            <p>(iv) Misappropriation of any funding relating to the Society.</p>
            <p>(v) Discrimination or Harassment.</p>
            <p>(vi) Gross misconduct as interpreted by USCG.</p>
            <p>(vii) Breaches of any USCG or University policies or procedures.</p>
        </div>

        <h3 id="article_14management_of_finance" className="sectionedit15">Article 14: Management of Finance</h3>
        <div className="level3">
            <p>14.1 The finances of the Society shall be managed by the Auditor and Treasurer of the Society.</p>
            <p>14.1.1 This Constitution also provides for the possibility of an Assistant Treasurer if the Society feels it is necessary.</p>
            <p>14.2 It is the responsibility of the Treasurer to ensure that all monies received from the University and sponsors are receipted through the Societies Office.</p>
            <p>14.3 No Society Member may use their membership for personal financial gain. Failure to adhere to this article shall result in NUI Galway disciplinary action.</p>
        </div>

        <h3 id="article_15amendments_to_the_constitution" className="sectionedit16">Article 15: Amendments to the Constitution</h3>
        <div className="level3">
            <p>15.1 Amendments to this Constitution may be passed at an Annual General Meeting or an Extraordinary General Meeting of the Society.</p>
            <p>15.1.1 The change to the Constitution must be proposed and seconded and put to the vote of the members. A proposed amendment is deemed to be passed by a two-thirds majority of full members present at the AGM/EGM.</p>
            <p>15.2 Such amendments to this Constitution shall require the formal ratification of the University Societies Coordination Group before taking effect.</p>
            <p>15.3 The Society must upload their current ratified Constitution to its official Society profile.</p>
        </div>

        <h3 id="article_16dissolution_of_the_society" className="sectionedit17">Article 16: Dissolution of the Society</h3>
        <div className="level3">
            <p>16.1 The Society may be dissolved by a two-thirds majority vote of its membership present at an AGM or EGM.</p>
            <p>16.2 The Society may fall into abeyance or be dissolved by decision of the USCG. The following constitute a non-exhaustive list of grounds for abeyance or dissolution.</p>
            <p>(i) Failure to submit a Treasurer&rsquo;s Report, submit receipts for all University grants and provide information for all transactions at the end of the Societies year.</p>
            <p>(ii) Failure to submit a Secretary&rsquo;s Report at the end of Societies year.</p>
            <p>(iii) Failure to have a table at Societies Day the following September.</p>
            <p>(iv) Failure to elect four core committee members by Society Training Weekend.</p>
            <p>(v) Failure of at least 2 committee members to attend Society Training without prior acceptance of apologies to the USCG.</p>
            <p>16.3 The Society shall fall into abeyance if general activity ceases.</p>
            <p>16.4 If the Society remains in abeyance for two consecutive years it will be deemed to be dissolved.</p>
            <p>16.5 On dissolution of the Society, all the Societies assets, including intellectual property and virtual rights, shall become the property of the University.</p>
        </div>
                </>
    );
}

export default ConstitutionComponent;