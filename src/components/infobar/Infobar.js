import React from 'react';

import './Infobar.css';
import closeIcon from '../../img/closeIcon.png';
import onlineIcon from '../../img/onlineIcon.png';

const Infobar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img src={onlineIcon} alt="online" className="onlineIcon"/>
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/"><img src={closeIcon} alt="close"/></a>
    </div>
  </div>
)


export default Infobar;