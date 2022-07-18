// 유저는 할 일을 추가할 수 있다
// + 버튼을 클릭하면, 할일이 추가된다
// delete 버튼을 누르면 할일이 끝나면서 밑줄이 간다
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 진행중 끝남 탭을 누르면 언더바가 이동한다
// 끝남탭은 끝난 아이템만, 진행중 탭은 진행중 아이템만
// 전체 탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("taskInput");
console.log(taskInput);

let addButton = document.getElementById("addButton");
console.log(addButton);
addButton.addEventListener("click", addTask);

let taskList = [];
let tabs = document.querySelectorAll(".taskTabs div");
console.log(tabs);

let mode = "all";
let filterList = [];

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  let task = {
    id: ranDomIdGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  let list = [];
  if (mode == "all") {
    list = taskList;
  } else if (mode == "notDone" || mode == "done") {
    list = filterList;
  }

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task">
      <div class="taskDone">${list[i].taskContent}</div>
      <div>
        <button onClick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-arrow-rotate-right"></i></button>
        <button onClick="deleteComplete('${list[i].id}')"><i class="fa-solid fa-minus"></i></button>
      </div>
    </div>`;
    } else {
      resultHTML += `<div class="task">
    <div>${list[i].taskContent}</div>
    <div>
      <button onClick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
      <button onClick="deleteComplete('${list[i].id}')"><i class="fa-solid fa-minus"></i></button>
    </div>
  </div>
`;
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

function deleteComplete(id) {
  console.log("삭제됨?", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = taskList.splice(i, 1);
      break;
    }
  }
  render();
  console.log(taskList);
}

function filter(event) {
  mode = event.target.id;
  filterList = [];
  if (mode == "all") {
    render();
  } else if (mode == "notDone") {
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

//어떤 아이템을 선택했는지 알려면 아이템마다 고유한 id가 있어야함.
//랜덤id 만들어주는 함수
function ranDomIdGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
