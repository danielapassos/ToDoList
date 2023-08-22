const ToDoList = artifacts.require('./ToDoList.sol');

contract('ToDoList', (accounts) => {
  let toDoList = null;
  before(async () => {
    toDoList = await ToDoList.deployed();
  });

  it('Should create tasks', async () => {
    await toDoList.createTask('A new task');
    const taskCount = await toDoList.taskCount();
    assert(taskCount.toNumber() === 2);
  });

  it('Should update tasks', async () => {
    await toDoList.updateTask(1, 'Updated task');
    const task = await toDoList.tasks(1);
    assert(task.content === 'Updated task');
  });

  it('Should toggle task completion', async () => {
    await toDoList.toggleCompleted(1);
    const task = await toDoList.tasks(1);
    assert(task.completed === true);
  });
});
