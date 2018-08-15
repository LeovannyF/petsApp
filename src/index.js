import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class Main extends React.Component {
  render() {
    return (
      <div>
      <AllDogs />
      <AllBreeds />
      </div>
    )
  }
}


class AllDogs extends React.Component {
  constructor() {
    super();
    this.state = {
      allDogs: []
    }
  }

  componentDidMount() {
  axios.get('/Dogs')
  .then((response)=>{
    this.setState({allDogs:response.data})
  })

  }
  render() {
    console.log(this.state.allDogs);
    return (
      <div>
      {this.state.allDogs.map(dog => {
        return <p key={dog.id}>{dog.name}</p>
      })}
      </div>
    )
  }
}

class AllBreeds extends React.Component {
  constructor() {
    super();
    this.state = {
      allBreeds: []
    }
  }

  componentDidMount(){ //axios retrieves what ever data your routes will query by putting in the direct route path
    axios.get('/Breeds')
    .then((response) => {
      this.setState({allBreeds:response.data})
    })
  }
  render() {
    return(
      <div>
      {this.state.allBreeds.map(breed => {
      return  <p key={breed.id}>{breed.name} </p>
      })}
      </div>
    )
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
)
