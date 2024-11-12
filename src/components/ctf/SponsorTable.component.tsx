import React from 'react';
import './SponsorTable.css';

const SponsorTable = () => {
  return (
    <table>
      <tbody>
        <tr className="sponsor-level"><td>Platinum Sponsor</td></tr>
        <tr>
            <td className="centered"><br /><img src="/assets/img/ctf/evernorth/evn_logo_hs_r_cmyk_tempermint.png" alt="Evernorth Logo" style={{ width: '460px', height: 'auto' }}></img></td>
        </tr>
        <tr className="sponsor-level">
          <td>Gold Sponsors</td>
        </tr>
        <tr>
          <td className="centered">
            <img src="/assets/img/ctf/genesys/Genesys Logo_Digital Vector-Full Color.svg" alt="Genesys Logo" style={{ width: '270px', height: 'auto' }}></img>
            <span style={{ margin: '0 25px' }}></span>
            <img src="/assets/img/ctf/cisco/Cisco_idmG3-3gIB_1.svg" alt="Cisco Logo" style={{ width: '215px', height: 'auto' }}></img>
          </td>
        </tr>
        <tr className="sponsor-level">
          <td>Silver Sponsors</td>
        </tr>
        <tr>
            <td className="centered">
            <img src="/assets/img/ctf/siren/blue-trademarked-siren-powering-investigations-logo.png" alt="Siren Logo" style={{ width: '200px', height: 'auto' }}></img>
            <span style={{ margin: '25px 25px' }}></span>
            <img src="/assets/img/ctf/libertyIT/Liberty IT_idv6-YWeb1_1.svg" alt="LibertyIT Logo" style={{ width: '190px', height: 'auto' }}></img>
            <span style={{ margin: '0 25px' }}></span>
            <img src="/assets/img/ctf/centripetal/Centripetal_Blue (2).svg" alt="Centripetal Logo" style={{ width: '220px', height: 'auto' }}></img>
            </td>
        </tr>
      </tbody>
    </table>
  );
}

export default SponsorTable;