// 유저는 할 일을 추가할 수 있다
// + 버튼을 클릭하면, 할일이 추가된다
// delete 버튼을 누르면 할일이 끝나면서 밑줄이 쳐짐

// 1. check 버튼을 누르면 할일이 끝나면서 밑줄이 쳐짐(false->true)
// 2. true면 끝난걸로 간주하고 밑줄 쳐짐
// 3. false면 안 끝난걸로 간주하고 그대로 냅둠

// 진행중 끝남 탭을 누르면 언더바가 이동
// 끝남탭은 끝난 아이템만, 진행중 탭은 진행중 아이템만
// 전체 탭을 누르면 다시 전체아이템으로 돌아옴

let writeArea = document.getElementById("writeArea");

let addButton = document.getElementById("addButton");

addButton.addEventListener("click", addTask);

let taskList = [];

function addTask() {
  let task = {
    id: randomIdGenerate(),
    taskContent: writeArea.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      resultHTML += `<div class="tasks">
      <div class="taskDone">${taskList[i].taskContent}</div>
      <div class="checkArea">
        <button onClick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-arrow-rotate-right"></i></button>
        <button onClick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    </div>`;
    } else {
      resultHTML += `<div class="tasks">
    <div>${taskList[i].taskContent}</div>
    <div class="checkArea">
      <button onClick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-check"></i></button>
      <button onClick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
    </div>
  </div>`;
    }
  }

  document.getElementById("taskBoard").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete; //밑줄 여부
      break;
    }
  }
  render();
  console.log(taskList);
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = taskList.splice(i, 1);
    }
  }
  render();
  console.log(taskList);
}

function randomIdGenerate() {
  return (performance.now().toString(36) + Math.random().toString(36)).replace(
    /\./g,
    ""
  );
}
