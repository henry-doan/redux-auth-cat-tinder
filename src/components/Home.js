import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import axios from 'axios';
import '../index.css';
import Cards, { Card } from 'react-swipe-card';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Home extends Component {
  state = { cats: [] }

  componentDidMount() {
    axios.get('/api/cats')
      .then( res => {
        this.setState({ cats: res.data })
        this.props.dispatch({ type: 'HEADERS', headers: res.headers });
    });
  }
  
  swipeLeft = (id) => {
    let { cats } = this.state;
    this.setState({ cats: cats.filter( c => c.id !== id ) })
  }

  swipeRight = (id) => {
    let { cats } = this.state;
    axios.put(`/api/cats/${id}`)
      .then( res => {
        this.setState({ cats: cats.filter( c => c.id !== id ) })
        this.props.dispatch({ type: 'HEADERS', headers: res.headers });
      })
  }

  render() {
    return(
      <div>
        <Cards className="cards-root">
          { this.state.cats.map( cat =>
              <Card
                key={cat.id}
                onSwipeLeft={() => this.swipeLeft(cat.id) }
                onSwipeRight={() => this.swipeRight(cat.id) }
              >
                <h2>{cat.name}</h2>
                <Image src={cat.avatar} />
                <h3>{cat.breed}</h3>
                <h3>{cat.registry}</h3>
              </Card>
            )
          }
        </Cards>
        <Link to="/my_cats">My Cats</Link>
      </div>
    );
  }
}

export default connect()(Home);