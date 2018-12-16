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
function Restrictions(props) {
  let restrictions = Object.keys(props.restrictions)
  let restrictionList = restrictions.map((restriction, index) => {
    console.log(restriction)
    console.log(index)

    return <Restriction key={index}
      letter={String.fromCharCode(index+97)}
      restriction={restriction}
      handleChange={props.handleChange}
      checked={props.restrictions[restriction]}
    />
  })
  return <div>
    <p>Check all that apply</p>
    {restrictionList}
  </div>
}
function Restriction(props) {
  return <div>
    <input type="checkbox" checked={props.checked} value={props.restriction} onChange={e => props.handleChange(e)} /> {props.letter}) {props.restriction}
  </div>
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      first: '',
      last: '',
      activity: 'Science Lab',
      restrictions: {
        'Dietary Restrictions': true,
        'Physical Disabilities': false,
        'Medical Needs': false,
      }
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
  changeRestrictions(e) {
    let restrictions = this.state.restrictions
    restrictions[e.target.value] = !this.state.restrictions[e.target.value]
    this.setState({restrictions})
  }
  
  render() {
    return <div>
      <NameField name='First' nameValue={this.state.first} handleChange={this.changeFirst.bind(this)} />
      <NameField name='Last' nameValue={this.state.last} handleChange={this.changeLast.bind(this)} />
      <ActivitySelect activities={['Science Lab', 'Cooking', 'Painting', 'Swimming', 'Coding', 'Biking']} handleChange={this.changeActivity.bind(this)} />
      <Restrictions restrictions={this.state.restrictions} handleChange={this.changeRestrictions.bind(this)}/>
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('root'));