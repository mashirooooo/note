import Store from '@/renderer/store';
import { domCreateElement } from '@/renderer/common/dom';
import { getGlobal } from '@/renderer/common';
import { windowClose, windowMaxMin, windowMin } from '@/renderer/common/window';
import styles from './scss/index.lazy.scss';

const args = Store.get<Customize>('customize');
const info = domCreateElement('div', 'head-info drag');
const content = domCreateElement('div', 'content');

function events(is: boolean) {
  const events = domCreateElement('div', 'events');
  const min = domCreateElement('div', 'event min no-drag');
  const maxMin = domCreateElement('div', 'event max-min no-drag');
  const close = domCreateElement('div', 'event close no-drag');
  min.addEventListener('click', () => windowMin(args.id));
  maxMin.addEventListener('click', () => windowMaxMin(args.id));
  close.addEventListener('click', () => windowClose(args.id));
  events.appendChild(min);
  events.appendChild(maxMin);
  events.appendChild(close);
  if (is) content.appendChild(events);
  Store.proxy<boolean>('head-events', is, (value) => {
    if (value) content.appendChild(events);
    else content.removeChild(events);
  });
}

export default function (): Component {
  Store.removeProxy('head-events');
  const title = domCreateElement('div', 'title', args.title || getGlobal<string>('app.name'));
  if (getGlobal('system.platform') === 'darwin') {
    content.appendChild(document.createElement('div'));
    content.appendChild(title);
  } else {
    content.appendChild(title);
    events(true);
  }
  info.appendChild(content);
  return {
    name: 'Head',
    global: true,
    dom: info,
    css: {
      use: styles.use,
      unuse: styles.unuse
    }
  };
}
