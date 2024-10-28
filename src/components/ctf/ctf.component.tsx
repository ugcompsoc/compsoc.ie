import React from 'react';

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
                    <h3>Event Details</h3>
                    <ul>
                        <li><strong>Date:</strong> February 1st, 2025</li>
                        <li><strong>Location:</strong> Bailey Allen Hall, University of Galway</li>
                        <li><strong>Teams:</strong> Up to 4 members per team</li>
                        <ul>
                            NOTE: There will be an intervarsity leaderboard for teams from only one university, but mixed teams will still score on the general leaderboard!
                        </ul>
                    </ul>
                </div>

                <div className="content">
                    <h3>What's a Capture the Flag?</h3>
                    <p>
                        Capture the flags are events where teams race each other to solve puzzles and find hidden codes or ‘flags’. These puzzles can be technical (deciphering a password from a website, finding the GPS co-ordinates of where a .png photo was taken), but many are solvable without knowing a single thing about computers or programming (like deciphering morse code, solving a crossword, or answering movie trivia!)
                           
                        They’re a fantastic way to test what you already know, learn what you don’t, and meet other people with a passion for tech.
                    </p>
                </div>
            </section>

            <section className="section-bg">
                <div className="section-title">
                    <h2>Prizes</h2>
                </div>
                <div className="content">
                    <p>
                        We’re happy to announce this year’s prize pot is [AMOUNT]. Prizes will be going to the top three inter-varsity teams, with additional spot prizes going on the day!!
                        And beyond just the prizes, there is the pride of representing your college and proving that yes, in fact you ARE the biggest nerds in the country. 
                    </p>
                </div>
            </section>

            <section>
                <div className="section-title">
                    <h2>How to Participate</h2>
                    <p>
                        You can buy your tickets at our college's society store [ADD LINK]. Teams can be up to four 
                        and your team must all be from the same university to qualify for the inter-varsity 
                        leaderboard (don’t worry though, there will also be a general board for other teams).
                    </p>
                </div>
            </section>

            <section id="sponsors">
                <div className="section-title">
                    <h2>Sponsors</h2>
                    <p>
                        A big thanks to all of our sponsors for making this event possible:
                        [ADD SPONSORS]
                    </p>
                </div>
            </section>
        </div>
    );
};

export default CTFComponent;
