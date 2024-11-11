import React from 'react';
import SponsorTable from './SponsorTable.component';
import ScheduleTable from './ScheduleTable.component';
import './ctf.css';

const CTFComponent = () => {
    return (
        <div className="container">

            <section className="section-bg">
                <div className="hero-container">
                    <h1>Intervarsity Capture the Flag 2025</h1>
                    <p>Put your hacking skills to the test!</p>
                    <img src="/assets/img/ctf_poster.png" alt="Italian Trulli"></img>
                </div>
            </section>

            <section className="section-bg">
                <div className="section-title">
                    <h2>About the Competition</h2>
                    <p>
                       Represent your university in our intervarsity capture the flag! With challenges for webhacking, cryptography, pwning, and more -
                       there's something for everyone!
                    </p>
                </div>
                <div className="content">
                    <h2>Event Details</h2>
                    <ul>
                        <li><strong>Date:</strong> February 1st, 2025</li>
                        <li><strong>Location:</strong> Bailey Allen Hall, University of Galway</li>
                        <li><strong>Teams:</strong> Up to 4 members per team</li>
                        <li><strong>Tickets:</strong> <a href="https://socs.universityofgalway.ie/shop/?id=NzM3">Here</a></li>
                    </ul>
                </div>

                <div className="section-title   ">
                    <h2>What's a Capture the Flag?</h2>
                    <p>
                        Capture the flags are events where teams race each other to solve puzzles and find hidden codes or ‘flags’. These puzzles can be technical (deciphering a password from a website, finding the GPS co-ordinates of where a .png photo was taken), but many are solvable without knowing a single thing about computers or programming (like deciphering morse code, solving a crossword, or answering movie trivia!)
                           
                        They’re a fantastic way to test what you already know, learn what you don’t, and meet other people with a passion for tech.
                    
                        Some great starter CTFs to get a feel for what they’re like are:
                        <ul>
                            <li><a href="https://picoctf.org/get_started.html">PicoCTF</a></li>
                            <li><a href="https://tryhackme.com/">TryHackMe</a></li>
                            <li><a href="https://www.hackthebox.com/hacker">HackTheBox</a></li>
                        </ul>
                    </p>
                </div>
            </section>

            <section className="section-bg">
                <div className="section-title">
                    <h2>What kind of challenges will there be?</h2>
                </div>
                <div className="content">
                    <p>
                    We plan to have a diverse range of challenges so that no matter what your skill set is, there will be something for you to tackle and keep you entertained. Challenges will cover:
                    </p>

                    <ul>
                        <li>Cryptography</li>
                        <li>Web-hacking</li>
                        <li>Reverse Engineering</li>
                        <li>System admin</li>
                        <li>Forensics</li>
                        <li>Word puzzles (like the type you can find at <a href="www.nytimes.com/games/">www.nytimes.com/games/</a>)</li>
                        <li>... and much much more!!</li>
                    </ul>
                </div>
            </section>

            <section>
                <div className="section-title">
                    <h2>What’s up for grabs?</h2>
                    <p>
                    This year’s event is sponsored by some of the biggest tech companies in Ireland, so we’re happy to announce this year’s prize pot is €1000. Prizes will be going to the top three teams, with additional spot prizes going on the day!!

                    And beyond just the prizes, there is the pride of representing your college and proving that yes, in fact you ARE the best at being a huge nerd.
                    </p>
                </div>
            </section>

            <section id="signup">
                <div className="section-title">
                    <h2>How do I sign up?</h2>
                    <p>
                    You can buy your tickets at our college's society store. 
                    Teams can be up to four members.
                    To qualify for the inter-varsity leaderboard and prizes your team must all be from the same college. Don’t worry though, there will also be a general board for other teams.
                    </p>
                </div>
            </section>

            <section id="schedule">
                <div className="section-title">
                    <h2>Schedule</h2>
                    <ScheduleTable />
                </div>
            </section>

            <section id="schedule">
                <div className="section-title">
                    <h2>Sponsors</h2>
                    <p>
                    We are very grateful to our sponsors for enabling this year's event:
                    </p>
                    <SponsorTable />
                    </div>
            </section>

            <section id="faq">
            <div className="section-title">
                <h2>FAQs</h2>

                <div className="faq-item">
                    <h4><strong>What can I do for food?</strong></h4>
                    <p>We’ll have a hot lunch, with both meat and vegetarian options available.
                    There is a Tesco and a Centra open nearby, alongside lots of other food outlets if something else takes your fancy.</p>
                </div>

                <div className="faq-item">
                    <h4><strong>What will be there on the day?</strong></h4>
                    <p>Each team will have a table allocated for them prior to the day. Accessible tables are available when purchasing your ticket.</p>
                </div>

                <div className="faq-item">
                    <h4><strong>I’ve no teammates, where can I find some?</strong></h4>
                    <p>We have a channel to find others in our Discord here: [Insert Discord link].</p>
                </div>

                <div className="faq-item">
                    <h4><strong>Where can I practise before the event?</strong></h4>
                    <p>A few good websites to practise capture the flag challenges are:</p>
                    <ul>
                        <li><a href="https://picoctf.org/get_started.html">PicoCTF</a></li>
                        <li><a href="https://tryhackme.com/">TryHackMe</a></li>
                        <li><a href="https://www.hackthebox.com/hacker">HackTheBox</a></li>
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
                    
                    <p>Ask in the event Discord <a href="discord.ctf.compsoc.ie">here</a>, or email us at <a href="mailto:compsoc@socs.universityofgalway.ie">compsoc@socs.universityofgalway.ie</a> with your queries!</p>
                </div>
            </div>
        </section>
        </div>
    );
};

export default CTFComponent;
