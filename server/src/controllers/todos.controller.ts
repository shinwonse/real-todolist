import TodosService from '../services/todos.service';
import { NextFunction, Request, Response } from 'express';
import { Todo } from '../entities/todo.entity';
import { TodoDto } from '../dtos/todo.dto';
import { plainToInstance } from 'class-transformer';
import { RequestWithUser } from '../interfaces/auth.interface';

class TodosController {
  private todoService = new TodosService();

  public getAllTodos = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const findAllTodosData: Todo[] = await this.todoService.findAllTodo();

      res.status(200).json({ data: findAllTodosData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getTodosByUserId = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Please Login First' });
        return;
      }
      const userId = req.user.user_id;
      const findTodosByUserId: Todo[] =
        await this.todoService.findTodosByUserId(userId);

      res.status(200).json({ data: findTodosByUserId, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createTodo = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Please Login First' });
        next();
      }
      const userId = req.user.user_id;
      const todoData: TodoDto = plainToInstance(TodoDto, req.body);
      const createTodoData: Todo = await this.todoService.createTodo(
        userId,
        todoData,
      );

      res.status(201).json({ data: createTodoData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateTodo = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const postId = Number(req.params.id);
      const userId = req.user.user_id;
      const todoData: TodoDto = plainToInstance(TodoDto, req.body);
      const updateTodoData: Todo = await this.todoService.updateTodo(
        userId,
        postId,
        todoData,
      );

      res.status(200).json({ data: updateTodoData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTodo = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const postId = Number(req.params.id);
      const deleteTodoData: Todo = await this.todoService.deleteTodo(postId);

      res.status(200).json({ data: deleteTodoData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default TodosController;
