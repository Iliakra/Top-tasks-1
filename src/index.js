/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-globals */
const data = [];
class Task {
  constructor(name, pinned) {
    this.name = name;
    this.pinned = pinned;
  }
}

const allTasksCont = document.getElementsByClassName('all-tasks-container')[0];
const pinnedCont = document.getElementsByClassName('pinned-container')[0];
const form = document.getElementById('insert-field');
const allTasks = document.getElementsByClassName('all-tasks');
const filterHint = document.getElementsByClassName('all-tasks-hint')[0];
const emptyHint = document.getElementsByClassName('empty-form')[0];


function removeHint() {
  const hint = document.getElementsByClassName('hint')[0];
  if (pinnedCont.childElementCount > 2) {
    hint.classList.add('hint-remove');
  } else if (pinnedCont.childElementCount === 2) {
    hint.classList.remove('hint-remove');
  }
}


function checked() {
  const activeEl = event.target;
  const moveLabel = activeEl.parentElement;
  const moveDiv = moveLabel.parentElement;
  if (activeEl.checked) {
    allTasksCont.removeChild(moveDiv);
    pinnedCont.appendChild(moveDiv);
    moveDiv.classList.remove('all-tasks');
    moveDiv.classList.add('pinned-tasks');
  } else if (!activeEl.checked) {
    pinnedCont.removeChild(moveDiv);
    allTasksCont.appendChild(moveDiv);
    moveDiv.classList.remove('pinned-tasks');
    moveDiv.classList.add('all-tasks');
  }
  removeHint();
}


const enterKey = (e) => {
  if (e.keyCode === 13) {
    event.preventDefault();
    const { value } = e.target;
    if (value === '') {
      emptyHint.classList.remove('empty');
    } else {
      filterHint.classList.add('hint-not-found');
      let taskNoDisplayed = document.getElementsByClassName('div-remove');
      taskNoDisplayed = [...taskNoDisplayed];
      for (let i = 0; i < taskNoDisplayed.length; i++) {
        allTasks[i].classList.remove('div-remove');
      }
      const task = new Task('', '');
      data.push(task);
      const taskDiv = document.createElement('div');
      const labelDiv = document.createElement('div');
      const taskPar = document.createElement('p');
      const taskInput = document.createElement('input');
      const labelEl = document.createElement('label');
      taskDiv.classList.add('all-tasks');
      taskDiv.classList.add('task-div');
      allTasksCont.appendChild(taskDiv);
      const newTask = allTasks[allTasks.length - 1];
      newTask.appendChild(taskPar);
      newTask.appendChild(taskPar);
      newTask.appendChild(labelEl);
      labelEl.appendChild(taskInput);
      labelEl.appendChild(labelDiv);
      labelDiv.classList.add('label-div');
      taskInput.type = 'checkbox';
      taskInput.classList.add('check-field');
      labelEl.classList.add('checkbox-label');
      taskInput.addEventListener('change', checked);
      taskPar.innerHTML = value;
      task.name = value;
      form.value = null;
    }
  }
};

const onInput = (e) => {
  event.preventDefault();
  emptyHint.classList.add('empty');
  if (allTasksCont.childElementCount > 1) {
    const taskAr = [...allTasks];
    for (let i = 0; i < taskAr.length; i++) {
      allTasks[i].classList.add('div-remove');
    }
    const symbol = e.target.value;
    const newAr = taskAr.filter((item) => {
      const test = item.getElementsByTagName('p')[0];
      const content = test.innerHTML;
      const contentArray = content.split('');
      const symbolArray = symbol.split('');
      for (let i = 0; i < symbolArray.length; i++) {
        return symbolArray[0].toLowerCase() === contentArray[0].toLowerCase();
      }
    });
    for (let i = 0; i < newAr.length; i++) {
      newAr[i].classList.remove('div-remove');
    }
    if (newAr.length === 0) {
      filterHint.classList.remove('hint-not-found');
    } else {
      filterHint.classList.add('hint-not-found');
    }
  }
};

// eslint-disable-next-line no-unused-vars
const outOfInput = (e) => {
  emptyHint.classList.add('empty');
  filterHint.classList.add('hint-not-found');
  let taskNoDisplayed = document.getElementsByClassName('div-remove');
  taskNoDisplayed = [...taskNoDisplayed];
  for (let i = 0; i < taskNoDisplayed.length; i++) {
    taskNoDisplayed[i].classList.remove('div-remove');
  }
};


form.addEventListener('input', onInput);

form.addEventListener('change', outOfInput);

form.addEventListener('blur', outOfInput);

form.addEventListener('keydown', enterKey);
