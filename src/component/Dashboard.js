import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Todo from "./Todo";
import "./dashboard.css";
import LightModeIcon from "@mui/icons-material/LightMode";
import db from "../firebase";
import { serverTimestamp } from "firebase/firestore";
import useMounted from "../contexts/useMounted";
import ListAltIcon from '@mui/icons-material/ListAlt';



function Dashboard() {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState("");
    const mounted = useMounted();
    

	// Calling Firestore Database
	useEffect(() => {
		db.collection("todos")
			.orderBy("timeStamp", "desc")
			.onSnapshot((snapshot) => {
                // console.log(snapshot.docs.map((doc) => doc.data()));
				setTodos(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						todo: doc.data().todo,
						inprogress: doc.data().inprogress,
					}))
				);
			});
	}, []);
    // console.log(input);
	const addTodo = (e) => {
		e.preventDefault();
		db.collection("todos").add({
			todo: input,
			timeStamp: serverTimestamp(),
			inprogress: false,
		});
		setInput("");
	};

	return (
        
		<div className="dashboard" >
			<div className="dashboard_background">
				<div className="dashboard_container">
					<div className="dashboard_header">
						<div className="title">TODO</div>
						<ListAltIcon className="theme" />
					</div>
					<div className="todo_input">
						
							<TextField
								className="text_input"
								id="standard-basic"
								label="Add a todo"
								variant="standard"
								value={input}
								onChange={(e) => setInput(e.target.value)}
							/>
						
						<Button className="todo_btn" variant="contained" onClick={addTodo}>
							Add
						</Button>
					</div>
				</div>
			</div>

			<div className="todo_list">
				<ul>
					
						{todos.map((todo, index) => (
								<Todo
									todo={todo}
									inprogress={todo.inprogress}
									id={todo.id}
									key={index}
									timeStamp={todo.timeStamp}
								/>
						  ))
                        }
				</ul>
			</div>
		</div>
	);
}

export default Dashboard;
