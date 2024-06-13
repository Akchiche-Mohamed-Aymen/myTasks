let Tasks = [];
function setTasksInLocalStorage(){
        localStorage.setItem("myTasks",  JSON.stringify(Tasks));
}
function getTasksFromLocalStorage(){
    Tasks = JSON.parse(localStorage.getItem("myTasks"));
    if(Tasks == null) return []
    return Tasks
}
Tasks = getTasksFromLocalStorage()
function createTask(){
    let content = prompt("Enter the task : ");
    if(content === '' || content === null) return ""
    let date = new Date();
    let taskObj = {
        taskName : content,
        taskDay : `${date.getDate()} | ${date.getMonth()+1} | ${date.getFullYear()}`,
        saved : false
    };
    return taskObj;
}

function createButton(content = '' , back ){
    let button = document.createElement("button");
    button.innerHTML = content;
    button.style.backgroundColor = back;
    return button;
}

let choices = (index , ...choicesList)=>{
    let div = document.createElement("div");
    div.className = "choices";

    let colors = [ "#2c3f50" , '#046262' , 'red'];
    if(Tasks[index].saved)
        colors[1]=`#e23d4d`
    let i = 0;
    for(ele of choicesList){
        div.appendChild(createButton(ele, colors[i]));
        i++
    }
    return div;
}

let Task = (i = 0)=>{
    let div = document.createElement("div");
    let div2 = document.createElement("div");
    div.className = "task";
    div2.className = "date";
    let val = 'V';
    div.style.backgroundColor ="white";
    if(Tasks[i].saved){
        val = "H";
        div.style.backgroundColor ="#50e3c2";
    }

    let choix = choices(i,"U", val , 'D');
    choix.children[0].setAttribute("onclick" , `update(${i})`)
    choix.children[1].setAttribute("onclick" , `select(${i})`)
    choix.children[2].setAttribute("onclick" , `removeTask(${i})`)
    div.appendChild(choix);
    let h2 = document.createElement("h2");
    let p = document.createElement("p");
    h2.innerHTML = Tasks[i].taskName;
    p.innerHTML = Tasks[i].taskDay;
    div2.appendChild(h2);
    div2.appendChild(p);
    div.appendChild(div2);
    return div;
}
function Read(){
    let page =  document.querySelector(".tasks");
    page.innerHTML = '';
    for(let i = 0 ; i < Tasks.length ; i++){
        page.appendChild(Task(i));
    }
    setTasksInLocalStorage();
}
function update(index){
    let newTask = prompt(`update the task ${Tasks[index].taskName}`, Tasks[index].taskName );
    if(newTask !== "" && newTask !== null){
        Tasks[index].taskName = newTask;
        Read();
    }

}
function select(index){
    Tasks[index].saved = !Tasks[index].saved;
    Read();
}
function removeTask(index){
    
    let isConfirmed = confirm(`Are you sure that you want to delete the task ${Tasks[index].taskName} ?`);
    if(isConfirmed){
        Tasks.splice(index, 1)
        Read();
    }
}
Read()
let btn = document.getElementById("add-Task");
btn.onclick = ()=>{
    let crTask = createTask();
        if(crTask != ''){
            Tasks.push(crTask);
            Read();
        }
}

