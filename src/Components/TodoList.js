import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";

export default function TodoListApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, newTask]);
    setNewTask("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditText(tasks[index]);
  };

  const updateTask = (index) => {
    if (!editText.trim()) return;
    const updatedTasks = [...tasks];
    updatedTasks[index] = editText;
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditText("");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h3 className="mb-4 text-center">Todo List</h3>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              addTask();
            }}
          >
            <Form.Group className="d-flex">
              <Form.Control
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter a new task"
              />
              <Button variant="primary" onClick={addTask} className="ms-2">
                Add
              </Button>
            </Form.Group>
          </Form>

          <ListGroup className="mt-4">
            {tasks.map((task, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex justify-content-between align-items-center"
              >
                <div className="flex-grow-1">
                  {editingIndex === index ? (
                    <Form.Control
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && updateTask(index)}
                    />
                  ) : (
                    <span>{task}</span>
                  )}
                </div>
                <div className="ms-2">
                  {editingIndex === index ? (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => updateTask(index)}
                      className="me-1"
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => startEditing(index)}
                      className="me-1"
                    >
                      Update
                    </Button>
                  )}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteTask(index)}
                  >
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
