import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Paper,
  Stack,
  Divider,
  Checkbox,
} from "@mui/material";
import { Add, WorkHistory } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion"; // ✨

const WorkLogGenerator = () => {
  const [stack, setStack] = useState("fullstack");
  const [date, setDate] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [projects, setProjects] = useState([]);
  const [output, setOutput] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");
    setDate(`EOD: ${formattedDate}`);
  }, []);

  const resetProjects = () => {
    setProjects([]);
  };

  const addProject = () => {
    setProjects((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        tasks: [],
        newTask: "",
        taskType: "Added",
        todos: [],
        newTodo: "",
      },
    ]);
  };

  const addTodo = (id) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id && p.newTodo.trim()
          ? {
              ...p,
              todos: [
                ...p.todos,
                { id: Date.now(), text: p.newTodo, done: false },
              ],
              newTodo: "",
            }
          : p
      )
    );
  };

  const toggleTodo = (projectId, todoId) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              todos: p.todos.map((t) =>
                t.id === todoId ? { ...t, done: !t.done } : t
              ),
            }
          : p
      )
    );
  };

  const updateProjectField = (id, field, value) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const addTask = (id) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id && p.newTask.trim()
          ? {
              ...p,
              tasks: [
                ...p.tasks,
                stack === "fullstack"
                  ? `${p.taskType} ${p.newTask}`
                  : p.newTask,
              ],
              newTask: "",
            }
          : p
      )
    );
  };

  const formatTime12hr = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    const h = parseInt(hour, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 === 0 ? 12 : h % 12;
    return `${formattedHour}:${minute} ${ampm}`;
  };

  const generateLog = () => {
    let log = `${date}\nCheck in ${formatTime12hr(
      checkIn
    )}\nCheck out ${formatTime12hr(checkOut)}\n\n`;

    projects.forEach((p) => {
      if (!p.name.trim()) return;
      log += `Project: ${p.name}\nTasks:\n`;

      p.tasks.forEach((t) => {
        log += `- ${t}\n`;
      });

      p.todos
        .filter((t) => t.done)
        .forEach((t) => {
          log += `- ${t.text}\n`;
        });

      log += `\n`;
    });

    setOutput(log);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" align="center" mb={4} gutterBottom>
            📝 Work Log Generator
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Stack</InputLabel>
                <Select
                  value={stack}
                  label="Stack"
                  onChange={(e) => {
                    setStack(e.target.value);
                    resetProjects();
                  }}
                >
                  <MenuItem value="fullstack">Full Stack Developer</MenuItem>
                  <MenuItem value="wordpress">WordPress Developer</MenuItem>
                  <MenuItem value="sales">Sales</MenuItem>
                  <MenuItem value="marketing">Marketing</MenuItem>
                  <MenuItem value="designing">Designing</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Date"
                value={date}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                type="time"
                label="Check In"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                type="time"
                label="Check Out"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <AnimatePresence>
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 4 }}>
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        Project
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Add your project details and tasks.
                      </Typography>
                      <TextField
                        fullWidth
                        label="Project Name"
                        value={project.name}
                        onChange={(e) =>
                          updateProjectField(project.id, "name", e.target.value)
                        }
                        sx={{ mb: 2, mt: 4 }}
                      />

                      <Grid container spacing={2} alignItems="center">
                        {stack === "fullstack" && (
                          <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                              <InputLabel>Task Type</InputLabel>
                              <Select
                                value={project.taskType}
                                label="Task Type"
                                onChange={(e) =>
                                  updateProjectField(
                                    project.id,
                                    "taskType",
                                    e.target.value
                                  )
                                }
                              >
                                <MenuItem value="Added">Added</MenuItem>
                                <MenuItem value="Updated">Updated</MenuItem>
                                <MenuItem value="Deleted">Deleted</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                        )}

                        <Grid item xs={12} sm={stack === "fullstack" ? 6 : 9}>
                          <TextField
                            fullWidth
                            placeholder="Enter task description"
                            value={project.newTask}
                            onChange={(e) =>
                              updateProjectField(
                                project.id,
                                "newTask",
                                e.target.value
                              )
                            }
                          />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                          <Button
                            fullWidth
                            variant="contained"
                            sx={{ py: 2 }}
                            startIcon={<Add />}
                            onClick={() => addTask(project.id)}
                          >
                            Add Task
                          </Button>
                        </Grid>
                      </Grid>

                      <List dense sx={{ mt: 2 }}>
                        {project.tasks.map((t, i) => (
                          <ListItem
                            key={i}
                            component={motion.li}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            • {t}
                          </ListItem>
                        ))}
                      </List>
                      <Divider sx={{ my: 2 }} />

                      <Typography variant="subtitle1" gutterBottom>
                        To-do List
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        To Add Your Assigned Tasks to Work logs, Use this one.
                      </Typography>

                      <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        sx={{ mt: 1 }}
                      >
                        <Grid item xs={9}>
                          <TextField
                            fullWidth
                            placeholder="Enter a to-do task"
                            value={project.newTodo}
                            onChange={(e) =>
                              updateProjectField(
                                project.id,
                                "newTodo",
                                e.target.value
                              )
                            }
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Button
                            fullWidth
                            variant="outlined"
                            sx={{ py: 1.5 }}
                            onClick={() => addTodo(project.id)}
                          >
                            Add
                          </Button>
                        </Grid>
                      </Grid>

                      <List dense sx={{ mt: 2 }}>
                        {project.todos.length === 0 ? (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontStyle: "italic", ml: 1 }}
                          >
                            No to-do items yet — add one above.
                          </Typography>
                        ) : (
                          <AnimatePresence>
                            {project.todos.map((todo) => (
                              <motion.div
                                key={todo.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ListItem
                                  secondaryAction={
                                    <Checkbox
                                      edge="end"
                                      checked={todo.done}
                                      onChange={() =>
                                        toggleTodo(project.id, todo.id)
                                      }
                                    />
                                  }
                                >
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      textDecoration: todo.done
                                        ? "line-through"
                                        : "none",
                                      color: todo.done
                                        ? "text.secondary"
                                        : "text.primary",
                                    }}
                                  >
                                    • {todo.text}
                                  </Typography>
                                </ListItem>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        )}
                      </List>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>

          <Stack spacing={2} mt={2}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Add />}
                onClick={addProject}
              >
                Add Project
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                startIcon={<WorkHistory />}
                onClick={generateLog}
              >
                Generate Work Log
              </Button>
            </motion.div>
          </Stack>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: output ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <TextField
              fullWidth
              multiline
              rows={8}
              value={output}
              InputProps={{ readOnly: true }}
              sx={{ mt: 3, backgroundColor: "#f9f9f9", borderRadius: 2 }}
            />
          </motion.div>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default WorkLogGenerator;
