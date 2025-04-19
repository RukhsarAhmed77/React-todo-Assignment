import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Card,
} from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import gsap from "gsap";

export default function TodoListApp({ darkMode, setDarkMode }) {
  const [tasks, setTasks] = useState(["Task 01", "Task 02"]);
  const [input, setInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const listRefs = useRef({});

  const addOrUpdateTask = () => {
    if (!input.trim()) return;

    if (editingIndex !== null) {
      const updated = [...tasks];
      updated[editingIndex] = input;
      setTasks(updated);
      setEditingIndex(null);
    } else {
      setTasks((prev) => [...prev, input]);
    }

    setInput("");
  };

  const deleteTask = (index) => {
    const task = tasks[index];
    const target = listRefs.current[task];
    if (target) {
      gsap.to(target, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setTasks(tasks.filter((_, i) => i !== index));
        },
      });
    } else {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };
  

  const startEditing = (index) => {
    setEditingIndex(index);
    setInput(tasks[index]);
  };

  // Animate new item
  useEffect(() => {
    const lastTask = tasks[tasks.length - 1];
    const el = listRefs.current[lastTask];
    if (el) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [tasks]);
  
  

  return (
    <Container fluid className="pt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className={`shadow-sm border-0 ${darkMode ? "bg-secondary text-light" : ""}`}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="fw-bold mb-0">Todo List</h3>
                <Form.Check
                  type="switch"
                  id="dark-mode-switch"
                  label="Dark Mode"
                  checked={darkMode}
                  onChange={() => setDarkMode((prev) => !prev)}
                />
              </div>

              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  addOrUpdateTask();
                }}
              >
                <div className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    value={input}
                    placeholder="Enter a task"
                    onChange={(e) => setInput(e.target.value)}
                    autoFocus
                    className={darkMode ? "bg-dark text-light border-secondary" : ""}
                  />
                  <Button
                    variant={editingIndex !== null ? "success" : "primary"}
                    onClick={addOrUpdateTask}
                    className="flex-shrink-0"
                  >
                    {editingIndex !== null ? "Update" : "Add"}
                  </Button>
                </div>
              </Form>

              <ListGroup className="mt-4">
                {tasks.map((task, index) => (
                  <ListGroup.Item
                    key={index}
                    ref={(el) => {
                      if (el) listRefs.current[tasks[index]] = el;
                    }}
                    className={`d-flex justify-content-between align-items-center ${
                      darkMode ? "bg-dark text-light border-secondary" : ""
                    }`}
                    onMouseEnter={() =>
                      gsap.to(listRefs.current[index], { scale: 1.02, duration: 0.2 })
                    }
                    onMouseLeave={() =>
                      gsap.to(listRefs.current[index], { scale: 1, duration: 0.2 })
                    }
                  >
                    <span className="me-2 flex-grow-1">{task}</span>
                    <div className="d-flex gap-2">
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => startEditing(index)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteTask(index)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
