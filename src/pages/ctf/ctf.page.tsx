const CTFPage = () => {
    return (
        <div className="event-container">
          <h1>🏴‍☠️ Capture the Flag Competition! 🏁</h1>
          <p>
            Get ready to put your skills to the test in our thrilling Capture the Flag competition!
          </p>
          <h2>Event Details:</h2>
          <ul>
            <li><strong>Date:</strong> [Insert Date]</li>
            <li><strong>Time:</strong> [Insert Time]</li>
            <li><strong>Location:</strong> [Insert Location]</li>
          </ul>
          <h2>What to Expect:</h2>
          <ul>
            <li>Team up with friends or join a new team!</li>
            <li>Navigate through challenges to capture the flag.</li>
            <li>Exciting prizes for the winners!</li>
          </ul>
          <p>
            <strong>Don’t miss out on the fun!</strong> 
            <a href="[RSVP Link]" className="rsvp-link"> RSVP here!</a>
          </p>
        </div>
      );
}

export default CTFPage;