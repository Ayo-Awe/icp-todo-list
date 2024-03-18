import { Checkbox } from "@/components/ui/checkbox";
import { TrashIcon } from "@radix-ui/react-icons";

const Todo = ({ description, done, onToggle, onDelete }) => {
  return (
    <div className="my-2 flex justify-between items-center p-3 shadow rounded-md outline outline-1">
      <p>{description}</p>

      <div className="flex items-center">
        <Checkbox checked={done} onCheckedChange={onToggle} />
        <TrashIcon className="ml-4 hover:cursor-pointer" onClick={onDelete} />
      </div>
    </div>
  );
};

export default Todo;
