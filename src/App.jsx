import { useState } from "react";
import "./App.css";
import ComicForm from "./components/ComicForm";
import Header from "./components/Header";

function App() {
  const [imageData, setImageData] = useState([]);

  const handleImageDataChange = (data) => {
    setImageData(data);
  };
  return (
    <div className="App">
      <Header />
      <ComicForm onImageDataChange={handleImageDataChange} />

      <div className="container comics page-to-print">
        <div className="row">
          {imageData.map((item) => {
            return (
              item.imageUrl && (
                <div className="col-md-6" key={item.id}>
                  <img src={item.imageUrl} alt={item.text} />
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
