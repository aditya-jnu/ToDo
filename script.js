let taskID=0;

const createTask=()=>{
    taskID++;
    const task=document.createElement("div");
    task.className="taskList"

    const taskInput=document.createElement("textarea");
    taskInput.className="taskClass"
    taskInput.id=`taskBox${taskID}`;
    taskInput.placeholder="type your task...."
    taskInput.rows="2"
    taskInput.style.padding="0.25em";

    const doneIcon =document.createElement("span");
    doneIcon.className="gree";
    doneIcon.style.margin="0.5em 0.25em 0.5em 0.25em"
    doneIcon.style.cursor = "pointer";
    doneIcon.innerHTML = '<i class="fa-solid fa-square-check"></i>';
    
    const deleteIcon = document.createElement("span");
    deleteIcon.style.margin="0.5em 0.25em 0.5em 0.25em"
    deleteIcon.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteIcon.style.cursor = "pointer";


    doneIcon.addEventListener('click', submitTask);
    deleteIcon.addEventListener('click', deleteTask);

    task.append(taskInput);
    task.appendChild(doneIcon);
    task.appendChild(deleteIcon);

    const container = document.getElementsByClassName("container")[0];
    container.appendChild(task);
}

//  The event parameter in this function represents the event object passed to the function when the event occurs. It contains information about the event itself, such as the target element that triggered the event. event.target refers to the element that triggered the event.

const submitTask = (event) => {
    const taskContent = event.target.parentElement.parentElement.querySelector("textarea").value;
    console.log("Task submitted:", taskContent);
    localStorage.setItem(`task${taskID}`, taskContent)
}

const deleteTask = (event) => {
    const task = event.target.parentElement.parentElement;
    const taskInputId = task.querySelector(".taskClass").id;
    const taskID = parseInt(taskInputId.match(/\d+/)[0]); // Extracting the numeric part from the taskInput ID
    const taskContent = localStorage.getItem(`task${taskID}`);
    
    localStorage.removeItem(`task${taskID}`, taskContent)
    event.target.parentElement.parentElement.remove();
    console.log("Task deleted");
}


const LoadStorage = () => {
    for (let i = 1; i <= localStorage.length; i++) {
        const key = localStorage.key(i - 1);
        if (key.startsWith('task')) {
            const taskID = key.slice(4); 
            const taskContent = localStorage.getItem(key);
            
            
            const task = document.createElement("div");
            task.className = "taskList";

            const taskInput = document.createElement("textarea");
            taskInput.className = "taskClass";
            taskInput.id = `taskBox${taskID}`;
            taskInput.placeholder = "Type your task....";
            taskInput.rows = "2";
            taskInput.style.padding = "0.25em";
            taskInput.value = taskContent; 

            const doneIcon = document.createElement("span");
            doneIcon.className = "doneIcon";
            doneIcon.style.margin = "0.5em 0.25em";
            doneIcon.style.cursor = "pointer";
            doneIcon.innerHTML = '<i class="fa-solid fa-square-check"></i>';

            const deleteIcon = document.createElement("span");
            deleteIcon.className = "deleteIcon";
            deleteIcon.style.margin = "0.5em 0.25em";
            deleteIcon.innerHTML = '<i class="fa-solid fa-trash"></i>';
            deleteIcon.style.cursor = "pointer";
            doneIcon.addEventListener('click', submitTask);
            deleteIcon.addEventListener('click', deleteTask);

            task.appendChild(taskInput);
            task.appendChild(doneIcon);
            task.appendChild(deleteIcon);

            const container = document.getElementsByClassName("container")[0];
            container.appendChild(task);
        }
    }
}
window.addEventListener('load', LoadStorage);