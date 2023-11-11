import { useState } from "react";
import "./App.css";
import ComicForm from "./components/ComicForm";
import Header from "./components/Header";
import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

function App() {
  const [imageData, setImageData] = useState([]);

  const handleImageDataChange = (data) => {
    setImageData(data);
  };

  const download = () => {
    const doc = new jsPDF({
      orientation: "square",
      unit: "mm",
      format: [210, 210],
    });

    // Function to add images to the PDF in a 2x2 grid
    const addImagesToPDF = (images) => {
      for (let i = 0; i < images.length; i += 4) {
        doc.setFillColor("black"); // Light gray background
        doc.rect(
          0,
          0,
          doc.internal.pageSize.width,
          doc.internal.pageSize.height,
          "F"
        );
        const pageImages = images.slice(i, i + 4);
        addImagesToPage(pageImages);
        if (i + 4 < images.length) {
          doc.addPage();
        }
      }
    };

    // Function to add images to a single page in a 2x2 grid
    const addImagesToPage = (images) => {
      const startX = 5;
      const startY = 5;
      const imageWidth = 98;
      const imageHeight = 98;
      const spacing = 100;

      images.forEach((image, index) => {
        const x = startX + (index % 2) * spacing;
        const y = startY + Math.floor(index / 2) * spacing;
        doc.addImage(image, "JPEG", x, y, imageWidth, imageHeight);
      });
    };

    // Extract image data URLs from the imageData array
    const imageUrls = imageData.map((item) => item.imageUrl).filter(Boolean);

    // Add images to the PDF
    addImagesToPDF(imageUrls);

    // Save the PDF
    doc.save("download.pdf");
  };

  return (
    <div className="App">
      <Header />
      <ComicForm onImageDataChange={handleImageDataChange} />

      <button className="btn btn-primary" onClick={download}>
        Download
      </button>
      <div className="container comics" id="page-to-print">
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
