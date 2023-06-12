import express , {json}from 'express';

const app = express();
let arr = [];
let counter =0;
app.use(json());

function check(data){
    if(!typeof(data.name) === "string"){
        return "name should be string";
    }
    if(!Number.isInteger(data.priority)){
        return "priority should be Integer";
    }
    if(data.priority >=1 && data.priority <=5 ){
            return "true";
    }
    
    return "priority should be between 1 and 5";
    
}

function newTask(name,priority){
    return {
        id:counter++,name,priority, toString(){
            return `Name of the Task is ${this.name}, its Priority is ${this.priority}, its ID is ${this.id}.`
        }
    }
}

function updateTask(data){
    let value = arr.find((value)=>{
        if(value.id === data.id){
            return true;
        }
        return false;
    });
    if(!value)throw new Error("task does not exist");
    value.name = data.name;
    value.priority = data.priority;
}



app.get("/tasks",(req,res,next)=>{
    let str = arr.join("\n");
    res.end(str?str:"There is no Tasks");
})

app.get("/tasks/:id",(req,res,next)=>{
    let str = arr.find((value)=>{
        if(value.id == Number(req.params.id)){
            return true;
        }
        return false;
    })
    
    res.end(str?str.toString():"Task does not exist");
})

app.post("/tasks",(req,res,next)=>{
    let task = (req.body);
    let str = check(req.body);
    if(str !== "true"){
        res.end(str);
        return;
    }
    task = newTask(task.name,task.priority);
    arr.push(task);
    res.end("Task has been Added successfully");
})

app.put("/tasks/:id",(req,res,next)=>{
    let task = (req.body);
    task.id = Number(req.params.id)
    
    let str = check(task);
    if(str !== "true"){
            res.end(str);
            return;
        }
    try{
    task = updateTask(task);
    }
    catch(err){
        res.end("Task does not exist");
        return;
    }
    res.end("Task has been Updated successfully");
    })

    app.delete("/tasks/:id",(req,res,next)=>{
        let index = arr.findIndex((value)=>{
                if(value.id === Number(req.params.id)){
                    return true;
                }
                return false;
            });
            if(index == -1){
                res.end("Please provide a correct Id");
                return;
            }
            arr.splice(index,1);
            res.end("Task has been Deleted successfully");
    })
app.listen(3000,()=>{
    console.log("App is Running on Port 3000");
})