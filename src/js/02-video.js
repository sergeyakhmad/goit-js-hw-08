import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const LOCAL_KEY = 'videoplayer-current-time';

const localTime = localStorage.getItem(LOCAL_KEY);

if (localTime) {
  player
    .setCurrentTime(localTime)
    .then(seconds => {
      return localTime;
    })
    .catch(error => {
      switch (error.name) {
        case 'RangeError':
          console.log('Ошибка, время было меньше 0 или больше, чем продолжительность видео');
          break;
        default:
          console.log('Произошла ошибка');
          break;
      }
    });
}
player.on('timeupdate', throttle(timeUpdate, 1000));

function timeUpdate(evt) {
  const currentTime = evt.seconds;
  localStorage.setItem(LOCAL_KEY, currentTime);
}
