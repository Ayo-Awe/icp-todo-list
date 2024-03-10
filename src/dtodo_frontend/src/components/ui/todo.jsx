import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "./card";

const Todo = ({ description }) => {
  return (
    <div className="my-2 flex justify-between items-center p-3 shadow rounded-md">
      <p>{description}</p>
      <Checkbox />
    </div>
  );
};

export default Todo;
