import React, { useEffect, useState } from "react";
import "./ComicForm.css";
import axios from "axios";
import Button from "./Button";
import Loader from "./Loader";

const ComicForm = ({ onImageDataChange }) => {
  const initialData = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    text: "",
    imageUrl: "",
  }));

  const [data, setData] = useState(initialData);
  const [maxLimit, setMaxLimit] = useState(0);
  const [generatedImage, setGeneratedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [curr, setCurr] = useState(0);
  const [inputText, setInputText] = useState("");

  const handlePanelSelection = (id) => {
    if (id <= maxLimit) {
      setCurr(id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setData((prev) => {
      const update = [...prev];
      update[curr].text = inputText;
      return update;
    });

    // console.log("text: ", data);

    const apiUrl =
      "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud";
    const headers = {
      Accept: "image/png",
      "Content-Type": "application/json",
      Authorization:
        "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
    };

    const inputData = { inputs: data[curr].text };

    if (inputText !== "") {
      await axios
        .post(apiUrl, inputData, { headers, responseType: "blob" }) // Set responseType to 'blob' to handle binary response
        .then((response) => {
          const reader = new FileReader();
          reader.onload = () => {
            setGeneratedImage(reader.result);

            setData((prev) => {
              const update = [...prev];
              update[curr].imageUrl = reader.result;
              console.log("img: ", data);
              return update;
            });
          };
          reader.readAsDataURL(response.data);
          // console.log("res", response);
        })
        .catch((error) => {
          console.error("Error:", error);
          // alert.error(error);
          // modal for feedback input+btn+Error
        });

      if (curr < 9) {
        setMaxLimit(Math.max(maxLimit, curr + 1));
        setCurr(curr + 1);
      }
    }

    setInputText("");
    setLoading(false);
    console.log(data);
  };

  useEffect(() => {
    onImageDataChange(data);
  }, [data, onImageDataChange]);
  return (
    <div className="container comic-container">
      <div className="row">
        <div className="col-md-8 comic-form">
          <form action="" onSubmit={handleSubmit}>
            <div className="panel-toggle">
              {data.map((btn, ind) => {
                return (
                  <button
                    key={ind}
                    onClick={() => handlePanelSelection(btn.id)}
                    className={
                      ind > maxLimit
                        ? "disabled"
                        : ind === curr
                        ? "active"
                        : btn.imageUrl
                        ? "completed"
                        : ""
                    }
                    disabled={ind > maxLimit}
                  >
                    {ind + 1}
                  </button>
                );
              })}
            </div>

            <textarea
              className="form-control"
              placeholder="Enter text for the comic panels"
              name=""
              value={inputText}
              id="form-input"
              cols="50"
              rows="6"
              onChange={(e) => setInputText(e.target.value)}
            />

            <Button type="submit" text="Generate Comic" className="mt-4" />
          </form>
        </div>
        <div className="col-md-4 generated-image">
          {loading ? (
            <div className="loader-pos">
              <Loader />
            </div>
          ) : (
            <div>
              {generatedImage ? (
                <img src={generatedImage} alt="panel" />
              ) : (
                <div className="default-img">
                  <img src="./generate.svg" alt="generate" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComicForm;
