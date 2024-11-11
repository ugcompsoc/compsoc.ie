import './SponsorTable.css';

const ScheduleTable = () => {
    return (
        <table >
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Event</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>10:30</td>
                    <td>Doors open</td>
                </tr>
                <tr>
                    <td>11:00</td>
                    <td>Challenges start</td>
                </tr>
                <tr>
                    <td>13:30</td>
                    <td>Lunch</td>
                </tr>
                <tr>
                    <td>16:00</td>
                    <td>Challenges close and prize giving</td>
                </tr>
            </tbody>
        </table>
    );
}

export default ScheduleTable;