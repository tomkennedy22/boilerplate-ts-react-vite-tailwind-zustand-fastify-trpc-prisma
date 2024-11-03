import { useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { Button, Card, CardBody } from "@nextui-org/react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className=" min-w-full h-screen flex justify-center items-center">
      <div className="h-full py-12 flex flex-col justify-between items-center">
        <h1>Vite + React</h1>
        <Card className="card items-center">
          <CardBody>
            <Button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </Button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </CardBody>
        </Card>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  );
}

export default App;
