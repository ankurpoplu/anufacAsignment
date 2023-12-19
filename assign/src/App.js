import './App.css';
import data from '../src/wineData.json'

function App() {
  const classes = new Map();
  
  const calGamma = (ash, hue, mag) => {
    const gamma = (ash * hue) / mag
    return gamma
  }

  for (const item of data) {
    if (!classes.has(item.Alcohol)) {
      classes.set(item.Alcohol, []);
    }

    classes.get(item.Alcohol).push(item);
  }

  const alcoholCategory = Array.from(classes.values());

  const alcoholFlavanoids = alcoholCategory.map(e=>e.map(f=>f.Flavanoids))

  const alcoholGamma = alcoholCategory.map(e=>e.map(f=>calGamma(f.Ash,f.Hue,f.Magnesium)))

  const mean = (arr) => {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
      total += Number(arr[i]);
    }
    return (total / arr.length).toFixed(3);
  }

  const median = arr => {
    const { length } = arr;
    arr.sort((a, b) => a - b);

    if (length % 2 === 0) {
      return (arr[length / 2 - 1] + arr[length / 2]) / 2;
    }

    return (arr[(length - 1) / 2]).toFixed(3);
  }

  const mode = arr => {
    const mode = {};
    let max = 0, count = 0;

    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];

      if (mode[item]) {
        mode[item]++;
      } else {
        mode[item] = 1;
      }

      if (count < mode[item]) {
        max = item;
        count = mode[item];
      }
    }

    return (max).toFixed(3)
  }
  return (
    <div className="app">
      <h1 className="heading">Alcohol Flavanoids with respect to classes</h1>
      <table>
        <thead>
          <tr>
            <th style={{ width: "100px" }}>Measure</th>
            {alcoholCategory.map((e,i)=>(<th style={{ width: "100px" }}>{`class ${i+1}`}</th>))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td ><strong>Flavanoids Mean</strong></td>
            {alcoholFlavanoids.map(e=>(<td>{mean(e)}</td>))}
          </tr>
          <tr>
            <td><strong>Flavanoids Median</strong></td>
            {alcoholFlavanoids.map(e=>(<td>{median(e)}</td>))}
          </tr>
          <tr>
            <td><strong>Flavanoids Mode</strong></td>
            {alcoholFlavanoids.map(e=>(<td>{mode(e)}</td>))}
          </tr>
        </tbody>
      </table>
      <h1 className="heading">Alcohol Gamma with respect to classes</h1>
      <table>
        <thead>
          <tr>
            <th style={{ width: "100px" }}>Measure</th>
            {alcoholCategory.map((e,i)=>(<th style={{ width: "100px" }}>{`class ${i+1}`}</th>))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td ><strong>Gamma Mean</strong></td>
            {alcoholGamma.map(e=>(<td>{mean(e)}</td>))}
          </tr>
          <tr>
            <td><strong>Gamma Median</strong></td>
            {alcoholGamma.map(e=>(<td>{median(e)}</td>))}
          </tr>
          <tr>
            <td><strong>Gamma Mode</strong></td>
            {alcoholGamma.map(e=>(<td>{mode(e)}</td>))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
