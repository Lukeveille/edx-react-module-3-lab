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
function Registrants(props) {
  const registrants = props.registrants.map((registrant, index) => {
    return <Registrant index={index} registrant={registrant} removeEntry={props.removeEntry}/>
  })
  return <table>
    <tr>
      <th>Remove</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Activity</th>
      <th>Restrictions</th>
    </tr>
    {registrants}
  </table>
}
function Registrant(props) {
  const style = {
    width: 20,
    height: 20,
  }
  return <tr>
    <td><button style={style} onClick={() => {props.removeEntry(props.index)}}>x</button></td>
    <td>{props.registrant.first}</td>
    <td>{props.registrant.last}</td>
    <td>{props.registrant.activity}</td>
    <td>{props.registrant.restrictions}</td>
  </tr>
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      first: '',
      last: '',
      activity: 'Science Lab',
      restrictions: {
        'Dietary Restrictions': false,
        'Physical Disabilities': false,
        'Medical Needs': false,
      },
      registrants: [
        {first: 'Luke', last: 'Leveille', activity: 'Science Lab', restrictions: 'abc'},
        {first: 'Matt', last: 'Betts', activity: 'Cooking', restrictions: 'a'},
      ],
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
  register() {
    let restrictions = this.state.restrictions['Dietary Restrictions']? 'a' : ''
    restrictions += this.state.restrictions['Physical Disabilities']? 'b' : ''
    restrictions += this.state.restrictions['Medical Needs']? 'c' : ''
    if (this.state.first === '' || this.state.last === '') {
      alert('Must enter a first and last name!')
    } else {
      this.setState(prevState => {
        prevState.registrants[prevState.registrants.length] = {first: prevState.first, last: prevState.last, activity: prevState.activity, restrictions: restrictions};
        return {
          registrants: prevState.registrants,
          first: '',
          last: '',
          restrictions: {
            'Dietary Restrictions': false,
            'Physical Disabilities': false,
            'Medical Needs': false,
          },
        }
      })
    }
  }
  removeEntry(i) {
    this.state.registrants.splice(i, 1)
    this.setState({registrants: this.state.registrants})
  }
  
  render() {
    return <div>
      <NameField name='First' nameValue={this.state.first} handleChange={this.changeFirst.bind(this)} />
      <NameField name='Last' nameValue={this.state.last} handleChange={this.changeLast.bind(this)} />
      <ActivitySelect activities={['Science Lab', 'Cooking', 'Painting', 'Swimming', 'Coding', 'Biking']} handleChange={this.changeActivity.bind(this)} />
      <Restrictions restrictions={this.state.restrictions} handleChange={this.changeRestrictions.bind(this)}/>
      <button onClick={this.register.bind(this)}>Submit</button>
      <Registrants registrants={this.state.registrants} removeEntry={this.removeEntry.bind(this)}/>
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('root'));