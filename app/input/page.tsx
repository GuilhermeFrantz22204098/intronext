"use client";

import React, { useState } from 'react';

interface Task {
  id: number;
  text: string;
}

export default function InputPage() {
    const [mirrorText, setMirrorText] = useState<string>('');

    const [selectedTech, setSelectedTech] = useState<string>('React');
    const techOptions = ['React', 'Angular', 'Vue', 'Svelte', 'Node.js'];

    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>('');
    
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState<string>('');

    const addTask = () => {
        if (!newTask) return;
        
        const item: Task = {
            id: Date.now(),
            text: newTask
        };

        setTasks([...tasks, item]);
        setNewTask('');
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(item => item.id !== id));
    };

    const startEditing = (item: Task) => {
        setEditingId(item.id);
        setEditingText(item.text);
    };

    const saveEdit = (id: number) => {
        setTasks(tasks.map(item => 
            item.id === id ? { ...item, text: editingText } : item
        ));
        setEditingId(null);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditingText('');
    };

    return (
        <div>
            <h1>Input</h1>

            <div>
                <input 
                    type="text" 
                    value={mirrorText} 
                    onChange={(e) => setMirrorText(e.target.value)} 
                    placeholder="Type something here"
                />
                <p>Result: {mirrorText}</p>
            </div>

            <div>
                <select 
                    value={selectedTech} 
                    onChange={(e) => setSelectedTech(e.target.value)}
                >
                    {techOptions.map(tech => (
                        <option key={tech} value={tech}>{tech}</option>
                    ))}
                </select>
            </div>

            <div>
                <h2>Tasks</h2>
                
                <div>
                    <input 
                        type="text" 
                        value={newTask} 
                        onChange={(e) => setNewTask(e.target.value)} 
                        placeholder="New task"
                    />
                    <button onClick={addTask}>Add</button>
                </div>

                <ul>
                    {tasks.map((item) => (
                        <li key={item.id}>
                            {editingId === item.id ? (
                                <>
                                    <input 
                                        type="text" 
                                        value={editingText} 
                                        onChange={(e) => setEditingText(e.target.value)} 
                                    />
                                    <button onClick={() => saveEdit(item.id)}>Save</button>
                                    <button onClick={cancelEdit}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <span>{item.text} </span>
                                    <button onClick={() => startEditing(item)}>Edit</button>
                                    <button onClick={() => deleteTask(item.id)}>Delete</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}