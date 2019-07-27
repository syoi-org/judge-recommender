import React from 'react';
import { Image } from 'semantic-ui-react';

import defaultIcon from '../icons/default.ico';
import hkojIcon from '../icons/hkoj.png';
import cfIcon from '../icons/cf.ico';
import aojIcon from '../icons/aoj.ico'
import csaIcon from '../icons/csa.png';
import atcoderIcon from '../icons/atcoder.png';
import fbIcon from '../icons/fb.png';
import hackerrankIcon from '../icons/hackerrank.png';
import luoguIcon from '../icons/luogu.ico';
import spojIcon from '../icons/spoj.png';
import syssIcon from '../icons/syss.png';
import kattisIcon from '../icons/kattis.png';

function JudgeIcon({ judge }) {
  const icons = {
    'HKOJ': hkojIcon,
    'CF': cfIcon,
    'AOJ': aojIcon,
    'CSA': csaIcon,
    'AtCoder': atcoderIcon,
    'FBHC': fbIcon,
    'HackerRank': hackerrankIcon,
    'Luogu': luoguIcon,
    'SPOJ': spojIcon,
    'SYSS': syssIcon,
    'Kattis': kattisIcon,
  };

  const icon = judge in icons ? icons[judge] : defaultIcon;

  return (
    <Image inline src={icon} style={{ height: "1em" }} />
  );
}

export default JudgeIcon;