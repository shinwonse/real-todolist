import {Todo} from '../entities/todo.entity';
import {HttpException} from '../exceptions/HttpException';
import {TodoDto} from '../dtos/todo.dto';
import {User} from "../entities/user.entity";

class TodosService {
    public async findAllTodo(): Promise<Todo[]> {
        const todos: Todo[] = await Todo.find();

        return todos;
    }

    public async findTodo(todoId: number): Promise<Todo> {
        const todo: Todo = await Todo.findOne({where: {todo_id: todoId}});
        if (!todo) throw new HttpException(409, 'Todo doesn\'t exist');

        return todo;
    }

    public async createTodo(userId, todoData: TodoDto): Promise<Todo> {
        const findUser: User = await User.findOne({where: {user_id: userId}});
        if (!findUser) throw new HttpException(409, "User doesn't exist");

        const createTodoData: Todo = await Todo.create({...todoData, user_id: findUser.user_id}).save();

        return createTodoData;
    }

    public async updateTodo(todoId: number, todoData: TodoDto): Promise<Todo> {
        const findTodo: Todo = await Todo.findOne({where: {todo_id: todoId}});
        if (!findTodo) throw new HttpException(409, 'Todo doesn\'t exist');

        await Todo.update(todoId, {...todoData});

        const updateTodoData: Todo = await Todo.findOne({where: {todo_id: todoId}});

        return updateTodoData;
    }

    public async deleteTodo(todoId: number): Promise<Todo> {
        const findTodo: Todo = await Todo.findOne({where: {todo_id: todoId}});
        if (!findTodo) throw new HttpException(409, 'Todo doesn\'t exist');

        await Todo.delete(todoId);

        return findTodo;
    }
}

export default TodosService;