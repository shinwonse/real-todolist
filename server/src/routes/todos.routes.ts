import { Router } from 'express';
import TodosController from '../controllers/todos.controller';
import { TodoDto } from '../dtos/todo.dto';
import validationMiddleware from '../middlewares/validation.middleware';
import authMiddleware from '../middlewares/auth.middleware';

class TodosRoutes {
  public path = '/todos';
  public router = Router();
  public todosController = new TodosController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/all`, this.todosController.getAllTodos);
    this.router.get(
      `${this.path}`,
      authMiddleware,
      this.todosController.getTodosByUserId,
    );
    this.router.post(
      `${this.path}`,
      authMiddleware,
      validationMiddleware(TodoDto, 'body'),
      this.todosController.createTodo,
    );
    this.router.put(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      validationMiddleware(TodoDto, 'body'),
      this.todosController.updateTodo,
    );
    this.router.delete(
      `${this.path}/:id(\\d+)`,
      this.todosController.deleteTodo,
    );
  }
}

export default TodosRoutes;
