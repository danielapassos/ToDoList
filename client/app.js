window.addEventListener('load', async () => {
    try {
      document.getElementById('loading').style.display = 'block';
  
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } else {
        window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
      }
  
      const networkId = await web3.eth.net.getId();
      const networkData = ToDoList.networks[networkId];
      const todoList = new web3.eth.Contract(ToDoList.abi, networkData.address);
  
      const taskCount = await todoList.methods.taskCount().call();
      const taskList = document.getElementById('taskList');
      for (let i = 1; i <= taskCount; i++) {
        const task = await todoList.methods.tasks(i).call();
        const taskElement = document.createElement('div');
        taskElement.innerHTML = task.content + (task.completed ? ' (Completed)' : '');
        taskList.appendChild(taskElement);
      }
  
      document.getElementById('createTaskButton').addEventListener('click', async () => {
        const content = document.getElementById('newTask').value;
        const accounts = await web3.eth.getAccounts();
        await todoList.methods.createTask(content).send({ from: accounts[0] });
        window.location.reload();
      });
  
      document.getElementById('updateTaskButton').addEventListener('click', async () => {
        const content = document.getElementById('updateTaskContent').value;
        const taskId = document.getElementById('updateTaskId').value;
        const accounts = await web3.eth.getAccounts();
        await todoList.methods.updateTask(taskId, content).send({ from: accounts[0] });
        window.location.reload();
      });
  
      document.getElementById('completeTaskButton').addEventListener('click', async () => {
        const taskId = document.getElementById('completeTaskId').value;
        const accounts = await web3.eth.getAccounts();
        await todoList.methods.toggleCompleted(taskId).send({ from: accounts[0] });
        window.location.reload();
      });
    } catch (error) {
      console.error(error);
    } finally {
      document.getElementById('loading').style.display = 'none';
    }
  });
  