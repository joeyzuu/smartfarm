fetch("https://joeyzuu.github.io/vegetable-prices/data.json")
  .then(res => res.json())
  .then(data => console.log(data.records[0].commodity));