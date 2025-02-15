import React from 'react';
import SponsorTable from './SponsorTable.component';
import ScheduleTable from './ScheduleTable.component';
import './ctf.css';

const CTFComponent = () => {
    return (
        <div className="container">
            <section id="main-content" className="about">
                <div className="hero-container">
                    <h1>CompSoc Intervarsity Capture the Flag - 2025</h1>
                    <img src="/assets/img/ctf/Medium_Res_CompSoc_CTF_Poster.jpg" alt="Floor Debugging" style={{maxHeight: "80vh"}}></img>
                </div>

                <div className="section-title">
                    <h2>About the Competition</h2>
                    <p>
                        Represent your university in our intervarsity capture the flag! With challenges for webhacking, cryptography, pwning, and more -
                        there's something for everyone!
                    </p>
                </div>
                <div className="section-title">
                    <h2>Event Details</h2>
                    <ul>
                        <li><strong>Date:</strong> February 1st, 2025</li>
                        <li><strong>Location:</strong> <a href='https://maps.app.goo.gl/E5cNa39RbYFtHbZ7A' target="_blank" rel="noopener noreferrer">Bailey Allen Hall, University of Galway</a></li>
                        <li><strong>Teams:</strong> Up to 4 members per team</li>
                        <li><strong>Tickets:</strong> <a href="https://socs.universityofgalway.ie/shop/?id=NzM3" target="_blank" rel="noopener noreferrer">Available here</a></li>
                        <li><strong>Event Discord:</strong> <a href='https://ctf.compsoc.ie/discord' target="_blank" rel="noopener noreferrer">Join here!</a></li>
                    </ul>
                </div>

                <div className="section-title">
                    <h2>What's a Capture the Flag?</h2>
                    <p>
                        Capture the flags are events where teams race each other to solve puzzles and find hidden codes or ‘flags’. These puzzles can be technical (deciphering a password from a website, finding the GPS co-ordinates of where a .png photo was taken), but many are solvable without knowing a single thing about computers or programming (like deciphering morse code, solving a crossword, or answering movie trivia!)
                        They’re a fantastic way to test what you already know, learn what you don’t, and meet other people with a passion for tech.
                        Some great starter CTFs to get a feel for what they’re like are:
                    </p>
                    <ul>
                        <li><a href="https://picoctf.org/get_started.html" target="_blank" rel="noopener noreferrer">PicoCTF</a></li>
                        <li><a href="https://tryhackme.com/" target="_blank" rel="noopener noreferrer">TryHackMe</a></li>
                        <li><a href="https://www.hackthebox.com/hacker" target="_blank" rel="noopener noreferrer">HackTheBox</a></li>
                    </ul>
                </div>

                <div className="section-title">
                    <h2>What kind of challenges will there be?</h2>
                
                    <p>
                        We plan to have a diverse range of challenges so that no matter what your skill set is, there will be something for you to tackle and keep you entertained. Challenges will cover:
                    </p>
                    <ul className='normal_bullet_points'>
                        <li>Web exploiting</li>
                        <li>Reverse engineering</li>
                        <li>Binary exploitation</li>
                        <li>Forensics</li>
                        <li>Cryptography</li>
                        <li>OSINT</li>
                        <li>Network security</li>
                        <li>Word puzzles (like the type you can find at <a href="https://nytimes.com/games/" target="_blank" rel="noopener noreferrer">www.nytimes.com/games/</a>)</li>
                        <li>... and much much more!!</li>
                    </ul>
                </div>

                <div className="section-title">
                    <h2>What’s up for grabs?</h2>
                    <p>
                        This year’s event is sponsored by some of the biggest tech companies in Ireland, so we’re happy to announce a <strong>prize pot of over €1000.</strong> Prizes will be going to the top three teams, with additional spot prizes going on the day!!
                    </p>
                </div>

                <div className="section-title">
                    <h2>How do I sign up?</h2>
                    <p>
                        You can buy your tickets at our college's <a href="https://socs.universityofgalway.ie/shop/?id=NzM3" target="_blank" rel="noopener noreferrer">society store</a>.
                        <br />
                        Teams can be <em>up to four</em> members.<br />
                        To qualify for the inter-varsity leaderboard and prizes your team must all be from the same college.
                        Don’t worry though, there will also be an open category for other teams to compete in against one another, which is open to non-students too!
                    </p>
                </div>

                <div className="section-title">
                    <h2>Schedule</h2>
                    <ScheduleTable />
                </div>

                <div className="section-title">
                    <h2>Sponsors</h2>
                    <p>
                        We are very grateful to our following sponsors for enabling this year's event:
                    </p>
                    <SponsorTable />
                </div>
            </section>

            <section id="faq">
                <div className="section-title">
                    <h2>FAQs</h2>

                    <div className="faq-item">
                        <h4><strong>What can I do for food?</strong></h4>
                        <p>We’ll have a hot lunch from Gourmet Food Parlour (and some other treats!), with both meat, vegetarian and gluten free options available.<br />
                        <strong>Note: if you purchase your ticket after midnight, Wednesday the 29th, while we endeavour to have food, we cannot guarentee there is a sufficient surplus in the catering order for your ticket.</strong><br />
                        There is a Tesco and a Centra open nearby, alongside lots of other food outlets if something else takes your fancy.</p>
                    </div>

                    <div className="faq-item">
                        <h4><strong>What will be there on the day?</strong></h4>
                        <p>Each team will have a table allocated for them prior to the day. Accessible tables are available when purchasing your ticket.</p>
                    </div>

                    <div className="faq-item">
                        <h4><strong>I’ve no teammates, where can I find some?</strong></h4>
                        <p>We have a channel to find other teammates in the event Discord <a href="https://ctf.compsoc.ie/discord" target="_blank" rel="noopener noreferrer">here</a>.</p>
                    </div>

                    <div className="faq-item">
                        <h4><strong>Where can I practise before the event?</strong></h4>
                        <p>A few good websites to practise capture the flag challenges are:</p>
                        <ul>
                            <li><a href="https://picoctf.org/get_started.html" target="_blank" rel="noopener noreferrer">PicoCTF</a></li>
                            <li><a href="https://tryhackme.com/" target="_blank" rel="noopener noreferrer">TryHackMe</a></li>
                            <li><a href="https://www.hackthebox.com/hacker" target="_blank" rel="noopener noreferrer">HackTheBox</a></li>
                        </ul>
                    </div>

                    <div className="faq-item">
                        <h4><strong>How can I get there?</strong></h4>
                        <p>We’re only a 15-minute walk from Eyre Square where nearly all buses and trains terminate. The 402, 404, 405, 411, or 412 buses pass by, with our stop being the “NUIG Main Gate”.</p>
                        <p>If you are driving, there is free parking on the college campus on the weekends.</p>
                    </div>

                    <div className="faq-item">
                        <h4><strong>What do we need to bring on the day?</strong></h4>
                        <p>You need to bring your own laptops and extension cables. There is eduroam wifi available in the hall, but we always recommend having access to your own internet hotspot, through your phone or similar.</p>
                    </div>

                    <div className="faq-item">
                        <h4><strong>Can we share answers with other teams?</strong></h4>
                        <p>Absolutely not! Any sharing or trading of answers will disqualify all teams involved. Trading flags or asking other teams for help is completely against the nature of the event, and ruins the fun for everyone.</p>
                    </div>

                    <div className="faq-item">
                        <h4><strong>What if there is a complaint on the day?</strong></h4>
                        <p>The governing rules of all our events are: Play fair and have fun. Any decisions made by the organisers are final.</p>
                    </div>

                    <div className="faq-item">
                        <h4><strong>I have questions that aren’t answered by the above, where can I ask them?</strong></h4>
                        <p>Ask in the event Discord <a href="https://ctf.compsoc.ie/discord" target="_blank" rel="noopener noreferrer">here</a>, or email us at <a href="mailto:compsoc@socs.universityofgalway.ie">compsoc@socs.universityofgalway.ie</a> with your queries!</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CTFComponent;
