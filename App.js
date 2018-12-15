function NameField(props) {
  return <div>
    <p>{props.name} Name</p>
    <input value={props.nameValue} onChange={e => props.handleChange(e)} />
  </div>
}
function ActivitySelect(props) {
  const activities = props.activities.map((activity, index) => {
    return <option key={index} value={activity}>{activity}</option>
  })
  return <select onChange={e => props.handleChange(e)} >
  <p>Select Activity</p>
    {activities}
  </select>
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      first: 'Luke',
      last: 'Leveille',
      activity: 'Science Lab',
    }
  }
  changeFirst(e) {
    this.setState({first: e.target.value})
  }
  changeLast(e) {
    this.setState({last: e.target.value})
  }
  changeActivity(e) {
    this.setState({activity: e.target.value})
  }
  
  render() {
    return <div>
      <NameField name='First' nameValue={this.state.first} handleChange={this.changeFirst.bind(this)} />
      <NameField name='Last' nameValue={this.state.last} handleChange={this.changeLast.bind(this)} />
      <ActivitySelect activities={['Science Lab', 'Cooking', 'Painting', 'Swimming', 'Coding', 'Biking']} handleChange={this.changeActivity.bind(this)} />
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('root'));