import React from 'react';
import { Image } from 'semantic-ui-react';

import defaultIcon from './icons/default.ico';
import hkojIcon from './icons/hkoj.png';
import cfIcon from './icons/cf.ico';
import aojIcon from './icons/aoj.ico'
import csacademyIcon from './icons/csacademy.png';
import atcoderIcon from './icons/atcoder.png';

function JudgeIcon({ judge }) {
  const icon = 
    judge == 'HKOJ' ? hkojIcon :
    judge == 'CF' ? cfIcon :
    judge == 'AOJ' ? aojIcon :
    judge == 'CSAcademy' ? csacademyIcon :
    judge == 'AtCoder' ? atcoderIcon :
    defaultIcon;

    return (
      <Image inline src={icon} style={{height: "1em"}} />
    );
}

export default JudgeIcon;