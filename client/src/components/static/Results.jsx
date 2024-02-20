import { useState, useEffect } from 'react';

const Results = () => {
  const [results, setResults] = useState([]);
  const [sortBy, setSortBy] = useState('race_place');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = () => {
    fetch('/api/results')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setResults(data);
      })
      .catch(error => {
        console.error('Error fetching race results:', error);
      });
  };

  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('asc');
    }
  };

  const sortedResults = [...results].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
  });

  return (
    <div className="results-container">
      <h2>Race Results</h2>
      <table>
        <thead>
          <tr>
          <th onClick={() => handleSort('race_place')}>Race Place</th>
            <th className="narrow-column" onClick={() => handleSort('bib_number')}>Bib Number</th>
            <th className="narrow-column"onClick={() => handleSort('full_name')}>Full Name</th>
            <th className="narrow-column" onClick={() => handleSort('gender')}>Gender</th>
            <th className="narrow-column" onClick={() => handleSort('age')}>Age</th>
            <th className="narrow-column" onClick={() => handleSort('city')}>City</th>
            <th className="narrow-column" onClick={() => handleSort('state')}>State</th>
            <th className="narrow-column" onClick={() => handleSort('run_time')}>Run Time</th>
            <th className="narrow-column" onClick={() => handleSort('gender_place')}>Gender Place</th>
            <th className="narrow-column" onClick={() => handleSort('age_group')}>Age Group</th>
            <th className="narrow-column" onClick={() => handleSort('age_place')}>Age Place</th>
            <th className="narrow-column" onClick={() => handleSort('overall_pace')}>Overall Pace</th>
          </tr>
        </thead>
        <tbody>
          {sortedResults.map((result, index) => (
            <tr key={result.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td className="narrow-column">{result.race_place}</td>
              <td className="narrow-column">{result.bib_number}</td>
              <td className="narrow-column">{result.full_name}</td>
              <td className="narrow-column">{result.gender}</td>
              <td className="narrow-column">{result.age}</td>
              <td className="narrow-column">{result.city}</td>
              <td className="narrow-column">{result.state}</td>
              <td className="narrow-column">{result.run_time}</td>
              <td className="narrow-column">{result.gender_place}</td>
              <td className="narrow-column">{result.age_group}</td>
              <td className="narrow-column">{result.age_place}</td>
              <td className="narrow-column">{result.overall_pace}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/api/download-results">Download Results</a>
    </div>
  );
};

export default Results;
