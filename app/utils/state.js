import { Raven }        from '../utils/analytics';
import { localStorage } from '../utils/local-storage';

export function tokenToUser (token) {
  if (!token) {
    Raven.setUserContext();
    return null;
  }

  const user = JSON.parse(atob(token.split('.')[1]));

  Raven.setUserContext({ id: user.id, username: user.username });

  return user;
}

export function loadState () {
  const notif20190105 = localStorage.getItem('notif-2019.01.05') === 'true' || undefined;
  const token = localStorage.getItem('token');
  const session = tokenToUser(token);
  const showInfo = localStorage.getItem('showInfo') === 'true' || undefined;

  return { notification: notif20190105, token, session, showInfo };
}

export function saveState ({ notification, showInfo, token }) {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }

  localStorage.setItem('notif-2019.01.05', notification);
  localStorage.setItem('showInfo', showInfo);
}
