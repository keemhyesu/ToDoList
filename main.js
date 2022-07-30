let taskInput = document.getElementById("taskInput");

let addButton = document.getElementById("addButton");
addButton.addEventListener("click", addTask);

let underline = document.getElementById("underline");

let tabs = document.querySelectorAll(".taskTabs div");

let taskList = [];
let mode = "all";
let filterList = [];

taskInput.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    addTask();
    event.preventDefault();
  }
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  let task = {
    id: randomIdGenerate(),
    isComplete: false,
    taskContent: taskInput.value,
  };
  taskList.push(task);
  taskInput.value = "";
  render();
}

function render() {
  let list = [];
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ongoing" || mode == "done") {
    list = filterList;
  }
  let resultHTMl = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTMl += `<div class="task">
      <div class="taskDone">${list[i].taskContent}</div>
      <div>
        <button onClick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-arrow-rotate-right"></i></button>
        <button onClick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    </div>`;
    } else {
      resultHTMl += `<div class="task">
    <div>${list[i].taskContent}</div>
    <div>
      <button onClick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
      <button onClick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
    </div>
  </div>
`;
    }
  }
  document.getElementById("taskBoard").innerHTML = resultHTMl;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}

function randomIdGenerate() {
  return (performance.now().toString(36) + Math.random().toString(36)).replace(
    /\./g,
    ""
  );
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filter();
}

function filter(event) {
  filterList = [];
  if (event) {
    mode = event.target.id;
    underline.style.width = event.target.offsetWidth + "px";
    underline.style.left = event.target.offsetLeft + "px";
    underline.style.top =
      event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
  }

  if (mode == "all") {
    render();
  } else if (mode == "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}
