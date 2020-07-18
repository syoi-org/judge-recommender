import React from 'react';
import { Image } from 'semantic-ui-react';

import defaultIcon from '../icons/default.png';
import hkojIcon from '../icons/hkoj.png';
import cfIcon from '../icons/cf.png';
import aojIcon from '../icons/aoj.png';
import csaIcon from '../icons/csa.png';
import atcoderIcon from '../icons/atcoder.png';
import fbIcon from '../icons/fb.png';
import hackerrankIcon from '../icons/hackerrank.png';
import luoguIcon from '../icons/luogu.png';
import spojIcon from '../icons/spoj.png';
import syssIcon from '../icons/syss.png';
import kattisIcon from '../icons/kattis.png';

const icons: { [JudgeName: string]: string } = {
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

interface Props {
  judge: string;
}

export function JudgeIcon(props: Props) {
  const { judge } = props;
  const icon = judge in icons ? icons[judge] : defaultIcon;

  return (
    <Image inline src={icon} style={{ height: "1em" }} />
  );
}
