const express = require("express");
const app = express();
const PORT = 3002;
const pgp = require("pg-promise")();

//database config start
const db = pgp("postgres://wrhdvgzw:9zv5TZH_fzUxFn-00uvuByZottjkjAEI@castor.db.elephantsql.com/wrhdvgzw");

//express code start
app.use(express.json());
// console.log(db); //to make sure to my localhost connected//
// database config end
// db.any("SELECT * from TASKS").then((tasks) => console.log(tasks));

// express code start
app.get("/", (req, res) => {
    res.send('HELLO WORLD!');
  });

  //Get all tasks
app.get("/tasks", (req, res) => {
    console.log("GET /tasks")
    db.any("SELECT * from TASKS")
    .then((tasks) => {
        res.send(tasks)
    })
  });


  //Creates a new task
app.post("/tasks", (req, res) => {
    console.log("POST /tasks");
    const newTaskTitle = req.body.title;
    console.log(req.body.title);
    db.any(`INSERT INTO tasks (title) VALUES ('${newTaskTitle}')`);
    // db.any("INSERT INTO tasks (title) VALUES ('Walk the dinosaur')");
    res.status(200)
    .send("New task created!" + newTaskTitle);
  });
  
  //updates if the task is completed
app.patch("/tasks/:id/is_completed", (req, res) => {
    console.log("PATCH /tasks/:id/is_completed");
    const taskID = req.params.id;
    console.log(taskID);
    db.none(`UPDATE tasks SET is_completed = true WHERE id = ${taskID};`) //where id = 4;
    res.send(`${taskID} has been completed`);//res.send(taskID);
});

// updates the tasks title
app.patch("/tasks/:id/title", (req, res) => {
    console.log("PATCH /tasks/:id/title");
    const taskID = req.params.id;//url mean
    const newTitle = req.body.title;
    console.log("task title id", taskID);
    console.log("newTitle" + newTitle)
    db.none(`UPDATE tasks SET title = '${newTitle}' WHERE id = ${taskID};`)
    res.send(taskID);
});

//delete the task
app.delete('/tasks/:id', (req, res) => {
    console.log("DELETE /tasks/:id");
    const deletedID = req.params.id;
    console.log("task ID deleted", deletedID);
    db.none(`DELETE FROM tasks WHERE id = ${deletedID};`)
    res.send(deletedID)
});
  
// server is listening//
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
  