// 유저는 할 일을 추가할 수 있다
// + 버튼을 클릭하면, 할일이 추가된다
// delete 버튼을 누르면 할일이 끝나면서 밑줄이 쳐짐
// check 버튼을 누르면 할일이 끝나면서 밑줄이 쳐짐
// 진행중 끝남 탭을 누르면 언더바가 이동
// 끝남탭은 끝난 아이템만, 진행중 탭은 진행중 아이템만
// 전체 탭을 누르면 다시 전체아이템으로 돌아옴

let writeArea = document.getElementById("writeArea");
console.log(writeArea);

let addButton = document.getElementById("addButton");
console.log("찍힘??", addButton);

addButton.addEventListener("click", addTask);

let taskList = [];

function addTask() {
  let taskContent = writeArea.value;
  taskList.push(taskContent);
  console.log(taskList);
  render();
}

function render() {
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    resultHTML += `<div class="tasks">
    <div>${taskList[i]}</div>
    <div class="checkArea">
      <button><i class="fa-solid fa-check"></i></button>
      <button><i class="fa-solid fa-trash-can"></i></button>
    </div>
  </div>
`;
  }

  document.getElementById("taskBoard").innerHTML = resultHTML;
}
