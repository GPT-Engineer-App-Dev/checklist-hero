import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const handleAddTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  const handleToggleTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input placeholder="Add a new task" value={input} onChange={handleInput} onKeyPress={handleKeyPress} />
            <Button onClick={handleAddTask}>Add</Button>
          </div>
          <ul className="mt-4">
            {tasks.map((task) => (
              <li key={task.id} className="flex items-center justify-between">
                <Checkbox checked={task.completed} onChange={() => handleToggleTask(task.id)} />
                <span className={task.completed ? "line-through" : ""}>{task.text}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <div>{tasks.filter((task) => !task.completed).length} items left</div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
