import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
function App() {
  const [list, setList] = useState([]);
  const [todo, setTodo] = useState("");
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  useEffect(() => {
    let savedlist = JSON.parse(localStorage.getItem("list"));
    if (savedlist) {
      setList(savedlist);
    }
  }, []);

  const handleAdd = () => {
    if (todo != "") {
      setList([...list, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo("");
    }
  };

  function handleEdit(e, id) {
    let toEdit = list.filter((item) => {
      return item.id === id;
    });
    let edited = toEdit[0].todo;
    setTodo(edited);
    let newList = list.filter((item) => {
      return item.id !== id;
    });
    setList(newList);
  }

  const handleDelete = (e, id) => {
    let toDelete = confirm("Are you sure?");
    if (toDelete) {
      let newList = list.filter((item) => {
        return item.id !== id;
      });
      setList(newList);
    }
  };
  const handleKey = (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let newList = [...list];
    let index = list.findIndex((item) => {
      return item.id === id;
    });
    newList[index].isCompleted = !newList[index].isCompleted;
    setList(newList);
  };

  useEffect(() => {
    console.log("useeffect");
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto  bg-violet-200 rounded-2xl shadow-lg p-4 my-2 text-xl min-h-80">
        <div className="add">
          <h1>Add the tasks</h1>
          <input
            type="text "
            onChange={handleChange}
            value={todo}
            className="w-1/2 border-2 px-1"
            onKeyDown={handleKey}
          />
          <button
            onClick={handleAdd}
            className="bg-green-600 p-1 px-3 font-bold hover:bg-green-900 cursor-pointer text-white rounded-md m-2"
          >
            Add
          </button>
        </div>
        {list.length === 0 ? (
          <div>No todos yet.</div>
        ) : (
          <div className=" font-bold">Your Todos</div>
        )}
        <div className="todos">
          {list.map((items) => {
            return (
              <div key={items.id} className="todo px-2 rounded-xl my-2 justify-between flex bg-gray-300">
                <div className="wrapper">
                <input
                  onChange={handleCheckbox}
                  name={items.id}
                  type="checkbox"
                  value={items.isCompleted}
                />
                <span className={items.isCompleted ? "line-through" : ""}>
                  {" "}
                  {items.todo}
                </span>
                </div>
                <span className="buttons">
                  <button
                    onClick={(e) => {
                      handleEdit(e, items.id);
                    }}
                    className="bg-yellow-500 p-1 px-3 font-bold hover:bg-yellow-700 cursor-pointer text-white rounded-md m-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, items.id);
                    }}
                    className="bg-red-600 p-1 px-3 font-bold hover:bg-red-900 cursor-pointer text-white rounded-md m-2"
                  >
                    Delete
                  </button>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
