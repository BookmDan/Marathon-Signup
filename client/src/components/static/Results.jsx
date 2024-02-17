import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Results = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Fetch race results data from the server
    axios.get('/api/results')
      .then(response => {
        setResults(response.data);
      })
      .catch(error => {
        console.error('Error fetching race results:', error);
      });
  }, []);

  return (
    <div className="results-container">
      <h2>Race Results</h2>
      <table>
        <thead>
          <tr>
            <th>Race Place</th>
            <th>Bib Number</th>
            <th>Full Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>City</th>
            <th>State</th>
            <th>Run Time</th>
            <th>Gender Place</th>
            <th>Age Group</th>
            <th>Age Place</th>
            <th>Overall Pace</th>
          </tr>
        </thead>
        <tbody>
          {results.map(result => (
            <tr key={result.bib_number}>
              <td>{result.race_place}</td>
              <td>{result.bib_number}</td>
              <td>{result.full_name}</td>
              <td>{result.gender}</td>
              <td>{result.age}</td>
              <td>{result.city}</td>
              <td>{result.state}</td>
              <td>{result.run_time}</td>
              <td>{result.gender_place}</td>
              <td>{result.age_group}</td>
              <td>{result.age_place}</td>
              <td>{result.overall_pace}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/api/download-results">Download Results</a>
    </div>
  );
};

export default Results;
