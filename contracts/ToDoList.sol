// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ToDoList {
    uint public taskCount = 0;

    struct Task {
        uint id;
        string content;
        bool completed;
    }

    mapping(uint => Task) public tasks;

    constructor() public {
        createTask("Check out the blockchain!");
    }

    function createTask(string memory _content) public {
        taskCount ++;
        tasks[taskCount] = Task(taskCount, _content, false);
    }

    function updateTask(uint _id, string memory _content) public {
        Task storage task = tasks[_id];
        task.content = _content;
    }

    function toggleCompleted(uint _id) public {
        Task storage task = tasks[_id];
        task.completed = !task.completed;
    }


}