import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

interface Song {
  id: number;
  Song_Name: string;
  Band: string;
  year: number;
}

function App() {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    axios
      .get<Song[]>("http://127.0.0.1:3001/songs/import") // Replace with the actual API endpoint
      .then((response) => {
        const sortedSongs = response.data.sort((a, b) =>
          a.Band.localeCompare(b.Band)
        ); // Sort songs alphabetically by band name
        setSongs(sortedSongs);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Songs</h1>
      <table className="song-table">
        <thead>
          <tr>
            <th>Song Name</th>
            <th>Band</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.id}>
              <td>{song.Song_Name}</td>
              <td>{song.Band}</td>
              <td>{song.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
