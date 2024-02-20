import { useState, useEffect } from 'react';

const Results = () => {
  const [results, setResults] = useState([]);
  const [sortBy, setSortBy] = useState('race_place'); // Default sorting criteria
  const [sortOrder, setSortOrder] = useState('asc'); // Default sorting order

  useEffect(() => {
    // Fetch race results data from the server
    fetch('/api/results')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch race results');
        }
        return response.json();
      })
      .then(data => {
        setResults(data);
      })
      .catch(error => {
        console.error('Error fetching race results:', error);
      });
  }, []);
  
  // using axios
  // useEffect(() => {
  //   // Fetch race results data from the server
  //   fetch('/api/results')
  //     .then(response => {
  //       setResults(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching race results:', error);
  //     });
  // }, []);

  // Function to handle sorting based on a specific criteria
  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      // Toggle sorting order if same criteria is clicked again
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sorting criteria
      setSortBy(criteria);
      setSortOrder('asc');
    }
  };

  // Function to sort the results array based on the current sorting criteria and order
  const sortedResults = [...results].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });

  return (
    <div className="results-container">
      <h2>Race Results</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('race_place')}>Race Place</th>
            <th onClick={() => handleSort('bib_number')}>Bib Number</th>
            <th onClick={() => handleSort('full_name')}>Full Name</th>
            <th onClick={() => handleSort('gender')}>Gender</th>
            <th onClick={() => handleSort('age')}>Age</th>
            <th onClick={() => handleSort('city')}>City</th>
            <th onClick={() => handleSort('state')}>State</th>
            <th onClick={() => handleSort('run_time')}>Run Time</th>
            <th onClick={() => handleSort('gender_place')}>Gender Place</th>
            <th onClick={() => handleSort('age_group')}>Age Group</th>
            <th onClick={() => handleSort('age_place')}>Age Place</th>
            <th onClick={() => handleSort('overall_pace')}>Overall Pace</th>
          </tr>
        </thead>
        <tbody>
          {sortedResults.map(result => (
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
