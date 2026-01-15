import React from 'react';
import './SponsorTable.css';

const SponsorTable = () => {
  return (
    <table>
      <tbody>
        <tr className="sponsor-level"><td>Platinum Sponsor</td></tr>
        <tr>
            <td className="centered"><br /><img src="/assets/img/ctf/evernorth/evn_logo_hs_r_cmyk_tempermint.png" alt="Evernorth Logo" style={{ maxWidth: '460px' }}></img></td>
        </tr>
        <tr className="sponsor-level">
          <td>Gold Sponsors</td>
        </tr>
        <tr>
            <td className="centered">
                <img src="/assets/img/ctf/centripetal/Centripetal_Blue (2).svg" alt="Centripetal Logo" style={{ maxWidth: '220px' }}></img>
                <img src="/assets/img/ctf/libertyIT/Liberty IT_idv6-YWeb1_1.svg" alt="LibertyIT Logo" style={{ maxWidth: '190px' }}></img>
                <img src="/assets/img/ctf/siren/blue-trademarked-siren-powering-investigations-logo.png" alt="Siren Logo" style={{ maxWidth: '200px' }}></img>
            </td>
        </tr>
      </tbody>
    </table>
  );
}

export default SponsorTable;