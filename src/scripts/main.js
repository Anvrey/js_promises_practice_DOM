'use strict';

const body = document.body;

const promise1 = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  body.addEventListener('click', () => {
    clearTimeout(timerId);
    resolve('First promise was resolved');
  });
});

const promise2 = new Promise((resolve) => {
  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });

  body.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve) => {
  let left = false;
  let right = false;

  const tryResolv = () => {
    if (left === true && right === true) {
      resolve('Third promise was resolved');
    }
  };

  body.addEventListener('click', (e) => {
    left = true;
    tryResolv();
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    right = true;
    tryResolv();
  });
});

function onSuccessFirst(message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.textContent = message;
  document.body.append(div);
}

function onErrorFirst(message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  div.textContent = message;
  document.body.append(div);
}

promise1.then(onSuccessFirst).catch(onErrorFirst);
promise2.then(onSuccessFirst);
promise3.then(onSuccessFirst);
