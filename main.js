let writeArea = document.getElementById("writeArea");
let addButton = document.getElementById("addButton");
let underline = document.getElementById("underline");
let tabs = document.querySelectorAll(".taskTabs div");

console.log(underline);
console.log(tabs);

tabs.forEach((menu) =>
  menu.addEventListener("click", (e) => horizontalIndicator(e))
);

function horizontalIndicator(e) {
  underline.style.left = e.currentTarget.offsetLeft + "px";
  underline.style.width = e.currentTarget.offsetWidth + "px";
  underline.style.top =
    e.target.offsetTop + (e.currentTarget.offsetHeight - 5) + "px";
}

addButton.addEventListener("click", addTask);

let taskList = [];

let filterList = [];

let mode = "all";

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  let task = {
    id: randomIdGenerate(),
    taskContent: writeArea.value,
    isComplete: false,
  };
  taskList.push(task);
  render();
}

function render() {
  let list = [];
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ongoing" || mode == "done") {
    list = filterList;
  }
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="tasks">
      <div class="taskDone">${list[i].taskContent}</div>
      <div class="checkArea">
        <button onClick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-arrow-rotate-right"></i></button>
        <button onClick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    </div>`;
    } else {
      resultHTML += `<div class="tasks">
    <div>${list[i].taskContent}</div>
    <div class="checkArea">
      <button onClick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
      <button onClick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
    </div>
  </div>`;
    }
  }
  document.getElementById("taskBoard").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = taskList.splice(i, 1);
      break;
    }
  }
  render();
}

function randomIdGenerate() {
  return (performance.now().toString(36) + Math.random().toString(36)).replace(
    /\./g,
    ""
  );
}

function filter(event) {
  mode = event.target.id;

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
  console.log(filterList);
}
