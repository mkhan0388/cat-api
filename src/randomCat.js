import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RandomCat() {
  const [cats, setCats] = useState([]);
  const [breed, setBreed] = useState("");
  const [breedData, setBeedData] = useState([]);

  const getRandomCat = async () => {
    try {
      axios.defaults.headers.common["x-api-key"] =
        "550b82ed-5fe4-44b8-83a5-9b79efb1f1cc";
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search",
        { params: { limit: 1, size: "full" } }
      );
      if (!response.data[0].breeds.length === 0) {
        setBreed("Data");
      } else {
        setBeedData(response.data[0].breeds);
      }

      setCats(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRandomCat();
  }, []);

  return (
    <div className="container">
      <h3 className="title">Random Cat</h3>
      <article className="image_button">
        <p>Cat ID: {cats.id}</p>

        <img src={cats.url} alt="cat pic" />

        <button onClick={() => getRandomCat()}>Reload</button>
      </article>
      <section className="breed_data">
        <div className="breed_title">
          <h4>Breed data</h4>
          <p>{breed}</p>
          <ul className="ul">
            {breedData.map((data) => {
              return (
                <div className="list_data">
                  <li>
                    <b>Name:</b> <p>{data.name}</p>
                  </li>
                  <li>
                    <b>Description:</b>
                    <p> {data.description}</p>
                  </li>
                  <li>
                    <b>Temperament:</b>
                    <p> {data.temperament}</p>
                  </li>
                  <li>
                    <b>Origin:</b> <p>{data.origin}</p>
                  </li>
                  <li>
                    <b>Wikipedia</b>{" "}
                    <p>
                      <a href="{data.wikipedia_url}"> </a>
                    </p>{" "}
                    {data.wikipedia_url}
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
