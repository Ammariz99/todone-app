'use client';
import React, { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { IoCheckmarkDone } from 'react-icons/io5';
import { FaUndo } from 'react-icons/fa';

/**
 * A React functional component that renders a to-do list application.
 * Users can add tasks, mark them as complete, undo completion, and delete tasks.
 *
 * @component
 * @returns {JSX.Element} The rendered to-do list application.
 */
const page = () => {
  // State management for task title
  const [title, setTitle] = useState('');
  // State management for task description
  const [description, setDescription] = useState('');
  // State management for the list of tasks
  const [mainTask, setMainTask] = useState([]);

  /**
   * Handles the form submission, adding a new task to the list of tasks.
   *
   * @param {React.FormEvent} e - The form event object.
   */
  const submitHandler = (e) => {
    e.preventDefault();
    const newTask = { title, description, isCompleted: false };
    setMainTask([...mainTask, newTask]);
    setTitle('');
    setDescription('');
    console.log(mainTask);
  };
  /**
   * Handles the deletion of a task from the list.
   *
   * @param {number} index - The index of the task to be deleted.
   */
  const deleteHandler = (index) => {
    let copyTask = [...mainTask];
    copyTask.splice(index, 1);
    setMainTask(copyTask);
  };
  /**
   * Toggles the completion status of a task.
   *
   * @param {number} index - The index of the task to be marked as completed or undone.
   */
  const completeTaskHandler = (index) => {
    const updatedTasks = mainTask.map((task, i) => {
      if (i === index) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setMainTask(updatedTasks);
  };
  // Variable to conditionally render tasks or a message when there are no tasks
  let renderTask = <h3>No Task Available</h3>;

  // Mapping over the tasks array to render each task
  if (mainTask.length > 0) {
    renderTask = mainTask.map((eachTask, index) => {
      return (
        <li className="flex justify-between items-center mb-8" key={index}>
          <div className="flex items-center justify-between w-2/3">
            <h3
              className={`text-2xl font-semibold ${eachTask.isCompleted ? 'line-through text-gray-500' : ''}`}
            >
              {eachTask.title}
            </h3>
            <p
              className={`text-2xl font-semibold  ${eachTask.isCompleted ? 'line-through text-gray-500' : ''}`}
            >
              {eachTask.description}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => completeTaskHandler(index)}
              className="text-green-400 text-2xl px-2 py-2 rounded mr-4"
            >
              {eachTask.isCompleted ? <FaUndo /> : <IoCheckmarkDone />}
            </button>
            <button
              onClick={() => {
                deleteHandler(index);
              }}
              className=" text-red-400 text-2xl"
            >
              <MdDeleteOutline />
            </button>
          </div>
        </li>
      );
    });
  }

  return (
    <>
      <h1 className="bg-black text-white font-bold text-5xl text-center p-5">
        Todone App
      </h1>
      <form onSubmit={submitHandler} className="text-center">
        <input
          type="text"
          placeholder="Enter Title here"
          className="text-2xl border-zinc-800 border-4 m-8 px-4 py-2"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Enter Description here"
          className="text-2xl border-zinc-800 border-4 m-8 px-4 py-2"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button className="bg-black text-white px-4 py-3 text-2xl font-bold rounded m-5">
          Add Task
        </button>
      </form>
      <hr />
      <div className="bg-slate-200 p-8">
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default page;
